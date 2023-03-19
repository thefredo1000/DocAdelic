import { ContentBlock, DraftBlockType } from "draft-js";
import { Document, Packer, Paragraph } from "docx";

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
    const paragraph = new Paragraph(text);
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

