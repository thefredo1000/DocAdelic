import { Container } from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";

export default function WordEditor() {
  return (
    <Container minW="3xl" centerContent>
      Editor:
      <TextEditor />
    </Container>
  );
}
