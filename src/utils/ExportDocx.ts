import { Document, Packer, Paragraph } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import { handleConversion } from "./Conversion";

export const downloadDocx = (blockArray: ContentBlock[]) => {
  const docxChildren: FileChild[] = blockArray.map((block) => {
    return handleConversion(block);
  });

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
    element.download = "doc-" + Date.now() + ".docx";
    document.body.appendChild(element);
    element.click();
  });
};
