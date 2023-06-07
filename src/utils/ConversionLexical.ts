import { ContentBlock } from "draft-js";
import { Paragraph, TextRun } from "docx";
import { LexicalNode, ParagraphNode, TextNode } from "lexical";

interface Styles {
  [key: string]: string;
}

export function handleConversionLex(lexNode: LexicalNode): Paragraph {
  console.log(lexNode.getType());

  if (lexNode.getType() === "paragraph") {
    return convertParagraph(lexNode as ParagraphNode);
  }

  // const type = textNode.getType();
  // switch (type) {
  //   case "text":
  //     console.log("text");
  //     return null;
  // case "header-one":
  //   return convertHeaderOne(block);
  // case "header-two":
  //   return convertHeaderTwo(block);
  // case "header-three":
  //   return convertHeaderThree(block);
  // case "header-four":
  //   return convertHeaderFour(block);
  // case "header-five":
  //   return convertHeaderFive(block);
  // case "header-six":
  //   return convertHeaderSix(block);
  // case "unstyled":
  //   return convertParagraph(block);
  // case "blockquote":
  //   return convertBlockquote(block);
  // case "code-block":
  //   return convertCodeBlock(block);
  // case "atomic":
  //   return convertAtomic(block);
  // case "ordered-list-item":
  //   return convertOrderedList(block);
  // case "unordered-list-item":
  //   return convertUnorderedList(block);
  //   default:
  //     return null;
  // }
  return new Paragraph({
    children: [],
  });
}

function convertParagraph(paragraphNode: ParagraphNode) {
  const textRuns: TextRun[] = paragraphNode
    .getChildren()
    .map((child) => createTextRun(child as TextNode));
  console.log(textRuns);

  const paragraph = new Paragraph({
    children: textRuns,
  });
  return paragraph;
}
// Get the font size from the styles
function getFontSize(styles: string[]) {
  const fontSize = styles.filter((s) => s.includes("fontsize-"));
  return fontSize.length === 0 ? 16 : parseInt(fontSize[0].split("-")[1]);
}

// Get the font family from the styles
function getFontFamily(styles: string[]) {
  const fontFamily = styles.filter((s) => s.includes("fontfamily-"));
  return fontFamily.length === 0 ? "Arial" : fontFamily[0].split("-")[1];
}

// Create a text run from the text and styles
function createTextRun(textNode: TextNode) {
  const styles = cssToJson(textNode.getStyle());
  console.log(styles);
  return new TextRun({
    text: textNode.getTextContent(),
    bold: textNode.hasFormat("bold"),
    italics: textNode.hasFormat("italic"),
    underline: textNode.hasFormat("underline") ? {} : undefined,

    size: styles["font-size"] ? parseInt(styles["font-size"]) * 2 : 30,
    font: styles["font-family"] ? styles["font-family"] : "Arial",
  });
}

export function cssToJson(css: string): Styles {
  const json: { [key: string]: string } = {};
  const properties = css.split(";").filter(Boolean);

  properties.forEach((property) => {
    let [key, value] = property.split(":").map((s) => s.trim());
    json[key] = value;
  });

  return json;
}
