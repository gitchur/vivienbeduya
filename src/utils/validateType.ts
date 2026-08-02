import { assertType, defaultValidatedTypes } from "@flight-digital/flightdeck/validateType";

const validateType = {
  ...(defaultValidatedTypes || {}),
  isArticle: assertType<Sanity.Article>("article"),
  isPage: assertType<Sanity.Page>("page"),
  isAuthor: assertType<AuthorPageData>("author"),
  isComponentBlueprint: assertType<Sanity.ComponentBlueprint>("componentBlueprint"),
  isCodeBlock: assertType<Sanity.CodeBlock>("codeBlock"),
  // Create your custom validation types here
  // isMyCustomSchema: assertType<Sanity.MyCustomSchema>("myCustomSchema"),
};

export default validateType;
