"use client";

import { PageLoadingSkeleton } from "@/components/molecules/pageLoadingSkeleton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * Shows the page skeleton immediately on internal link click, before the route
 * segment loading UI is available. Clears when the pathname or page content updates.
 */
export const NavigationPending = ({ children }: Props): React.JSX.Element => {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [pathname, children]);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const nextPath = url.pathname.replace(/\/$/, "") || "/";
        const currentPath = pathname.replace(/\/$/, "") || "/";
        if (nextPath === currentPath && url.search === window.location.search) return;

        setPending(true);
      } catch {
        return;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  if (pending) {
    return <PageLoadingSkeleton />;
  }

  return <>{children}</>;
};
