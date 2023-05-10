import { Document, Packer } from "docx";
import { FileChild } from "docx/build/file/file-child";
import { ContentBlock } from "draft-js";
import { handleConversion } from "./Conversion";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
  console.log(cookies.get('hash'));
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
    sendFileToIPFS(blob)
  });
};

const sendFileToIPFS = async (fileBlob : any) => {
  if (fileBlob) {
      try {

        const formData = new FormData();
        formData.append("file", fileBlob);

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                "Content-Type": "multipart/form-data"
            },
        });
        const FileHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(FileHash); 
        cookies.set('hash', FileHash, { path: '/' });
      } catch (error) {
          console.log("Error sending File to IPFS: ")
          console.log(error)
      }
  }
}