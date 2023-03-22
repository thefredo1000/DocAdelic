import { ContentBlock, DraftBlockType, DraftInlineStyle } from "draft-js";
import { Document, Packer, Paragraph, TextRun, UnderlineType } from "docx";

export function handleConversion(block: ContentBlock) {
  const type = block.getType();
  switch (type) {
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
    case "unstyled":
      return convertParagraph(block);
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
    default:
      return convertParagraph(block);
  }
}

function convertParagraph(block: ContentBlock) {
  const text = block.getText();
  const charList = block.getCharacterList();
  const charArray = charList.toJS();

  let lastText: string = "";
  let lastStyles: string[] = [];

  let textRuns: TextRun[] = [];

  // Iterate through the text and character list
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charStyles = charArray[i]?.style;

    // If the styles are the same, add the character to the last text run
    if (JSON.stringify(charStyles) === JSON.stringify(lastStyles)) {
      lastText += char;
    }
    // If the styles are different, create a new text run
    else {
      const run = new TextRun({
        text: lastText,
        bold: lastStyles.includes("BOLD"),
        italics: lastStyles.includes("ITALIC"),
        underline: lastStyles.includes("UNDERLINE") ? {} : undefined,
      });
      textRuns.push(run);
      lastText = char;
      lastStyles = charStyles;
    }
  }

  // Add the last text run
  const run = new TextRun({
    text: lastText,
    bold: lastStyles.includes("BOLD"),
    italics: lastStyles.includes("ITALIC"),
    underline: lastStyles.includes("UNDERLINE") ? {} : undefined,
  });
  textRuns.push(run);

  const paragraph = new Paragraph({
    children: textRuns,
  });
  return paragraph;
}

function convertHeaderOne(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertHeaderTwo(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertHeaderThree(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertHeaderFour(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertHeaderFive(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertHeaderSix(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertBlockquote(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertCodeBlock(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertAtomic(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertOrderedList(block: ContentBlock) {
  throw new Error("Function not implemented.");
}

function convertUnorderedList(block: ContentBlock) {
  throw new Error("Function not implemented.");
}
