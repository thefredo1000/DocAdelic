import { Document, Packer } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import { handleConversion } from "./ConversionLexical";

async function downloadDocxTemp(blockArray: ContentBlock[]) {
  // const docxChildren: FileChild[] = blockArray.map((block) => {
  //   return handleConversion(block);
  // });

  // const doc = new Document({
  //   sections: [
  //     {
  //       children: docxChildren,
  //     },
  //   ],
  // });

  // const element = document.createElement("a");
  // return await Packer.toBlob(doc);
}