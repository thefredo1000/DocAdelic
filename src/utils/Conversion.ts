import { ContentBlock } from "draft-js";
import { Paragraph, TextRun } from "docx";

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
function createTextRun(text: string, styles: string[]) {
  return new TextRun({
    text,
    bold: styles.includes("BOLD"),
    italics: styles.includes("ITALIC"),
    underline: styles.includes("UNDERLINE") ? {} : undefined,
    size: getFontSize(styles) * 2,
    font: getFontFamily(styles),
  });
}

function convertParagraph(block: ContentBlock) {
  // Get the text and character list from the block
  const text = block.getText();
  const charList = block.getCharacterList();
  const charArray = charList.toJS();

  // Keep track of the last text run
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
      getFontSize(lastStyles);
      textRuns.push(createTextRun(lastText, lastStyles));
      lastText = char;
      lastStyles = charStyles;
    }
  }

  // Add the last text run
  getFontSize(lastStyles);
  textRuns.push(createTextRun(lastText, lastStyles));

  // Create the paragraph
  const paragraph = new Paragraph({
    children: textRuns,
  });
  return paragraph;
}
