import { desk } from "@flight-digital/sanity-plugin-flightdeck";
import { ComponentIcon } from "@sanity/icons";
import { MdOutlineArticle } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { StructureToolOptions } from "sanity/structure";
import settings from "./settings";

const baseStructure: StructureToolOptions = {
  name: "desk",
  title: "Desk",
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        desk.multipleListDocuments(S, "Pages", "page"),
        S.divider(),
        desk.multipleListDocuments(S, "Articles", "article", MdOutlineArticle),
        desk.multipleListDocuments(S, "Tags", "tag", FaTag),
        desk.multipleListDocuments(S, "Authors", "author", IoMdPeople),
        S.divider(),
        desk.multipleListDocuments(S, "Components", "componentBlueprint", ComponentIcon),
        settings(S),
      ]),
};

export default baseStructure;
