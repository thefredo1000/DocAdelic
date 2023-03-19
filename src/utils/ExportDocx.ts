import { Document, Packer, Paragraph } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import * as fs from "fs";
import { handleConversion } from "./Conversion";

export const downloadDocx = (blockArray: ContentBlock[]) => {
  console.log("downloadDocx", blockArray);

  const docxChildren: FileChild[] = blockArray.map((block) => {
    return handleConversion(block);
  });

  const paragraph = new Paragraph("Hello World");
  const doc = new Document({
    sections: [
      {
        children: docxChildren,
      },
    ],
  });

  const element = document.createElement("a");
  Packer.toBlob(doc).then((blob) => {
    element.href = URL.createObjectURL(blob);
    element.download = "100ideas-" + Date.now() + ".docx";
    document.body.appendChild(element);
    element.click();
  });
};
