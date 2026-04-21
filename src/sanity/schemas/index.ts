// -------------- Pages --------------- //
import article from "./pages/article";
import page from "./pages/page";

// -------------- Documents --------------- //
// import exampleDocument from "./documents/exampleDocument";
import tag from "./documents/tag";
import author from "./documents/author";
// -------------- Navigation --------------- //
import footer from "./navigation/footer/footer";
import navList from "./navigation/footer/navMenu";
import header from "./navigation/header/header";
import navMenu from "./navigation/header/navMenu";

// -------------- Objects --------------- //
// import exampleObject from "./objects/exampleObject";
import code from "./objects/code";

// -------------- Blocks --------------- //
import blockArticlesList from "./blocks/articlesList";

const schemas = [
  // Pages
  page,
  article,
  // Documents
  tag,
  author,
  // exampleDocument,

  // Navigation
  header,
  footer,
  navList,
  navMenu,

  // Objects
  // exampleObject,
  code,
  // Blocks
  blockArticlesList,
];

export default schemas;
