import { Box, Center } from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";
import Editor from "../components/LexicalEditor";
import { useOutletContext } from "react-router-dom";
import { useEthereum } from "../components/Root";

export default function WordEditor() {
  const { walletAddress, provider } = useEthereum();
  return (
    <Center bg="grey" w="100%" p={4} color="white">
      {walletAddress ? (
        <Editor walletAddress={walletAddress} provider={provider} />
      ) : (
        <Center minH="800px">Connect wallet pls</Center>
      )}
    </Center>
  );
}
