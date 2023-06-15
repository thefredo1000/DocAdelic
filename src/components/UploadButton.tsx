import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Center,
  Tag,
  Stack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Interface, Contract } from "ethers";
import { BrowserProvider } from "ethers/lib.commonjs/providers";
import { LexicalEditor } from "lexical";
import { useState } from "react";
import { exportFile } from "../utils/LexicalFiles";
import {
  docadelicSmartContractAbi,
  docadelicSmartContractAddress,
} from "../utils/SmartContractFunctions";

enum uploadStatus {
  NOT_STARTED,
  UPLOADING_FILE,
  MINTING_FILE,
  SUCCESS,
  ERROR,
}

export default function UploadButton(props: { provider: BrowserProvider }) {
  const [editor] = useLexicalComposerContext();
  const [status, setStatus] = useState(uploadStatus.NOT_STARTED);
  const [txHash, setTxHash] = useState<string>("");

  const { provider } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iface = new Interface(docadelicSmartContractAbi);

  const uploadToIPFS = async () => {
    setStatus(uploadStatus.UPLOADING_FILE);
    const docadelicSmartContractInstance = new Contract(
      docadelicSmartContractAddress,
      iface as any,
      await provider.getSigner()
    );

    const data = await exportFile(editor, {
      fileName: Date.now().toString(),
      source: "",
    });
    if (!data) {
        setStatus(uploadStatus.ERROR);
        return;
    }

    await docadelicSmartContractInstance
      .createNewFile(data)
      .then((res) => {
        console.log(res);
        setStatus(uploadStatus.MINTING_FILE);
        provider.waitForTransaction(res.hash, 1).then((tx) => {
          setStatus(uploadStatus.SUCCESS);
          setTxHash(res.hash);
        });
      })
      .catch((err) => {
        setStatus(uploadStatus.ERROR);
        console.log(err);
      });
  };

  const CurrentComponent = (status: uploadStatus) => {
    switch (status) {
      case uploadStatus.NOT_STARTED:
        return (
          <Stack>
            <Text>
              Upload the following file to IPFS and then mint the IPFS hash to
              the blockchain.
            </Text>
            <Button
              id="downloadBtn"
              onClick={uploadToIPFS}
              value="download"
              size="md"
              colorScheme="green"
            >
              Upload
            </Button>
          </Stack>
        );
      case uploadStatus.UPLOADING_FILE:
        return (
          <Tag size="lg" variant="solid" colorScheme="blue">
            Uploading file...
          </Tag>
        );
      case uploadStatus.MINTING_FILE:
        return (
          <Tag size="lg" variant="solid" colorScheme="orange">
            Minting file...
          </Tag>
        );
      case uploadStatus.SUCCESS:
        return (
          <Stack>
            <Tag size="lg" variant="solid" colorScheme="green">
              Success!
            </Tag>
            <Link href={`https://goerli.etherscan.io/tx/${txHash}`} isExternal>
              <Button colorScheme="teal" size="xs" variant="outline">
                Transaction Hash
              </Button>
            </Link>
          </Stack>
        );
      case uploadStatus.ERROR:
        return (
          <Tag size="lg" variant="solid" colorScheme="red">
            Error!
          </Tag>
        );
    }
  };
  return (
    <>
      <Button
        id="downloadBtn"
        onClick={onOpen}
        value="download"
        size="md"
        variant="ghost"
        colorScheme="green"
      >
        Upload
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center minH="150px">{CurrentComponent(status)}</Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
