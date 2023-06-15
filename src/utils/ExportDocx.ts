import { Document, Packer } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import axios from "axios";
import Cookies from "universal-cookie";

import { RootNode } from "lexical";
import { handleConversion } from "./ConversionLexical";

const cookies = new Cookies();

export const uploadDocx = (root: RootNode) => {
  const docxChildren: FileChild[] = root
    .getChildren()
    .map((child) => handleConversion(child));
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
  const docxChildren: FileChild[] = root
    .getChildren()
    .map((child) => handleConversion(child));
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

const sendFileToIPFS = async (fileBlob: any) => {
  if (fileBlob) {
    try {
      const formData = new FormData();
      formData.append("file", fileBlob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const FileHash = `ipfs://${resFile.data.IpfsHash}`;
      cookies.set("hash", FileHash, { path: "/" });
    } catch (error) {
      console.error(error);
    }
  }
};
