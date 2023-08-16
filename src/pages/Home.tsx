import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import FileTable from "../components/FileTable";
import {
  docadelicSmartContractAbi,
  docadelicSmartContractAddress,
} from "../utils/SmartContractFunctions";
import { Contract, ethers } from "ethers";
import { useEthereum } from "../components/Root";

export default function Home() {
  const { walletAddress, provider } = useEthereum();
  const [fileData, setFileData] = React.useState<any[]>([]);

  function getFileData(fileHashes: string[]) {
    fileHashes.forEach((fileHash) => {
      fetch(`https://ipfs.io/ipfs/${fileHash}`)
        .then((res) => res.json())
        .then((data) => {
          setFileData((oldData) => [...oldData, data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    async function getFiles() {
      const iface = new ethers.Interface(docadelicSmartContractAbi);
      const docadelicSmartContractInstance = new Contract(
        docadelicSmartContractAddress,
        iface as any,
        await provider.getSigner()
      );
      const totalFiles = await docadelicSmartContractInstance.getUserTotalFiles(
        walletAddress
      );
      console.log(totalFiles);

      const files = [];
      for (let i = 0; i < totalFiles; i++) {
        const file = await docadelicSmartContractInstance.getFileLastVersion(
          walletAddress,
          i
        );
        files.push(file);
      }

      console.log(files);
      getFileData(files);
    }
    getFiles();
  }, [walletAddress, provider]);

  return (
    <Container maxW="1200px" p={4}>
      <FileTable files={fileData} />
    </Container>
  );
}
