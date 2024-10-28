// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import TextColor from "editorjs-text-color-plugin";
import SimpleImage from "./SimpleImage";
import { fetchImages } from "@/utils/api/images"

export const editorTools = {
  embed: Embed,
  table: Table,
  list: {
    class: List,
    inlineToolbar: ["bold", "italic", "link"],
  },
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: {
    class: Header,
    inlineToolbar: ["bold", "italic", "link"],
  },
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  imageSelection: {
    class: SimpleImage,
    inlineToolbar: true,
    config: {
      fetchImages
    },
  },
  textColor: TextColor,
};
