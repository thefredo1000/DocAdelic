import { Document, Packer } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import { handleConversion } from "./Conversion";
import { RootNode } from "lexical";
import { handleConversionLex } from "./ConversionLexical";

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

export const uploadDocx = (blockArray: ContentBlock[]) => {
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

export const downloadDocxLexical = (root: RootNode) => {
  console.table({ length: root.getChildren().length });
  

  const docxChildren: FileChild[] = root.getChildren().map((child) => 
    handleConversionLex(child)
  );
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
