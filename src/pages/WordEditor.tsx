import { Box, Center, Container } from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";
import Editor from "../components/LexicalEditor";

export default function WordEditor() {
  return (
    <Center bg="grey" w="100%" p={4} color="white" >
      <Editor />
    </Center>
  );
}
