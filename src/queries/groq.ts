/**
 * Shared GROQ projections, declared once per query as custom functions.
 *
 * Inlined projections were being copied into every block, rich text field, and
 * link, so the page query grew to ~70KB. Sanity parses the whole query before
 * executing it, so that string — not the dataset — was the slow part.
 *
 * `withProjections` prepends only the functions a query actually calls.
 * Flightdeck preview injects a projection inside `{ ... }`, where function
 * declarations are invalid, so preview uses `expandProjections` instead.
 *
 * Custom functions need an API version other than `v1`, one parameter, and a
 * projection body. They cannot recurse or read the parent scope.
 */

type ProjectionKind = "object" | "array" | "reference" | "referenceArray";

type RegisteredProjection = {
  name: string;
  kind: ProjectionKind;
  body: string;
};

export type GroqProjection = {
  /** `fd::name(expr)`. Defaults to the current scope (`@`). */
  call: (expr?: string) => string;
  /** `"field": fd::name(field)` */
  field: (fieldName: string) => string;
};

const registry = new Map<string, RegisteredProjection>();
const identifier = /^[A-Za-z_][A-Za-z0-9_]*$/;

const wrap = (kind: ProjectionKind, body: string): string => {
  if (kind === "object") return `$it{${body}}`;
  if (kind === "array") return `$it[]{${body}}`;
  if (kind === "reference") return `$it->{${body}}`;
  return `$it[]->{${body}}`;
};

export const defineProjection = (
  name: string,
  kind: ProjectionKind,
  body: string,
): GroqProjection => {
  if (!identifier.test(name)) throw new Error(`Invalid GROQ projection name: ${name}`);

  const existing = registry.get(name);
  if (!existing || existing.body !== body || existing.kind !== kind) {
    registry.set(name, { name, kind, body });
  }

  return {
    call: (expr = "@") => `fd::${name}(${expr})`,
    field: (fieldName: string) => {
      if (!identifier.test(fieldName)) throw new Error(`Invalid GROQ field name: ${fieldName}`);
      return `"${fieldName}": fd::${name}(${fieldName})`;
    },
  };
};

const functionNamesIn = (value: string): string[] =>
  [...value.matchAll(/fd::([A-Za-z0-9_]+)/g)].map((match) => match[1]);

const requireProjection = (name: string): RegisteredProjection => {
  const projection = registry.get(name);
  if (!projection) throw new Error(`Unknown GROQ projection fd::${name}`);
  return projection;
};

const collectDependencies = (names: string[]): string[] => {
  const ordered: string[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const visit = (name: string): void => {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new Error(`Cyclic GROQ projection: ${name}`);
    visiting.add(name);
    const projection = requireProjection(name);
    for (const dependency of functionNamesIn(projection.body)) visit(dependency);
    visiting.delete(name);
    visited.add(name);
    ordered.push(name);
  };

  for (const name of names) visit(name);
  return ordered;
};

const declare = (name: string): string => {
  const projection = requireProjection(name);
  return `fn fd::${name}($it) = ${wrap(projection.kind, projection.body)};`;
};

/**
 * Collapse insignificant whitespace so the encoded query stays under the
 * client's 11,264 character GET limit. String literals are left untouched.
 */
const minifyGroq = (query: string): string => {
  let out = "";
  let quote: "'" | '"' | null = null;
  let pendingSpace = false;

  for (let i = 0; i < query.length; i++) {
    const char = query[i];
    if (quote) {
      out += char;
      if (char === "\\") {
        out += query[++i] ?? "";
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      if (pendingSpace && !out.endsWith(".")) out += " ";
      pendingSpace = false;
      quote = char;
      out += char;
      continue;
    }
    if (char === "/" && query[i + 1] === "/") {
      while (i < query.length && query[i] !== "\n") i++;
      pendingSpace = out.length > 0;
      continue;
    }
    if (/\s/.test(char)) {
      pendingSpace = out.length > 0;
      continue;
    }
    if (pendingSpace && !out.endsWith(".") && char !== ".") out += " ";
    pendingSpace = false;
    out += char;
  }

  return out.trim();
};

/** Prepend function declarations required by `query`. */
export const withProjections = (query: string): string => {
  const names = collectDependencies(functionNamesIn(query));
  const compiled = names.length
    ? `${names.map(declare).join("\n")}\n${query.trim()}`
    : query.trim();
  return minifyGroq(compiled);
};

/**
 * Inline function calls for projections that are interpolated inside another
 * query, such as Flightdeck's preview fetch.
 */
export const expandProjections = (query: string): string => {
  let current = query;
  for (let depth = 0; depth < 30; depth++) {
    const next = current
      .replace(/\.\.\.\s*fd::([A-Za-z0-9_]+)\(@\)/g, (_, name: string) => {
        const projection = requireProjection(name);
        if (projection.kind !== "object") {
          throw new Error(`Only object projections can be spread (fd::${name})`);
        }
        return projection.body;
      })
      .replace(
        /fd::([A-Za-z0-9_]+)\((@|[A-Za-z_][A-Za-z0-9_.]*)\)/g,
        (_, name: string, expr: string) => {
          const projection = requireProjection(name);
          const body = projection.body;
          if (projection.kind === "object" && expr === "@") return `{${body}}`;
          if (projection.kind === "object") return `${expr}{${body}}`;
          if (projection.kind === "array") return `${expr}[]{${body}}`;
          if (projection.kind === "reference") return `${expr}->{${body}}`;
          return `${expr}[]->{${body}}`;
        },
      );
    if (next === current) return current.trim();
    current = next;
  }
  throw new Error("GROQ projection expansion is too deep");
};
