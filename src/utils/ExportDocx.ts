import { Document, Packer } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import { RootNode } from "lexical";
import { handleConversionLex } from "./ConversionLexical";


export const uploadDocx = (root: RootNode) => {
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

export const downloadDocx = (root: RootNode) => {
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
