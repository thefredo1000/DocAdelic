import { Paragraph, TextRun } from "docx";
import { LexicalNode, ParagraphNode, TextNode } from "lexical";

interface Styles {
  [key: string]: string;
}

export function handleConversion(lexNode: LexicalNode): Paragraph {
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

  const paragraph = new Paragraph({
    children: textRuns,
  });
  return paragraph;
}

// Create a text run from the text and styles
function createTextRun(textNode: TextNode) {
  const styles = cssToJson(textNode.getStyle());
  return new TextRun({
    text: textNode.getTextContent(),
    bold: textNode.hasFormat("bold"),
    italics: textNode.hasFormat("italic"),
    underline: textNode.hasFormat("underline") ? {} : undefined,
    size: styles["font-size"]
      ? `${parseInt(styles["font-size"]) * (3 / 4)}pt`
      : `${(15 * 3) / 4}pt`,
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
