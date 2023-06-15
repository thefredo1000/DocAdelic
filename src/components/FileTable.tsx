import React from "react";
import {
  Box,
  GridItem,
  Grid,
  Stack,
  Heading,
  Center,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import docIcon from "./styles/images/icons/doc-icon.svg";
import newDocIcon from "./styles/images/icons/new-doc-icon.svg";
import { useNavigate } from "react-router-dom";

function NewDocCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/editor", { state: {} });
  };

  return (
    <GridItem colSpan={1}>
      <Stack onClick={handleClick} role="button">
        <AspectRatio
          bg="#F7F9F9"
          w="100%"
          color="white"
          border="1px"
          borderColor="gray.200"
          borderRadius={5}
          ratio={1}
        >
          <Center p={4}>
            <Image src={newDocIcon} />
          </Center>
        </AspectRatio>
        <Center>
          <Heading size="sm">New Document</Heading>
        </Center>
      </Stack>
    </GridItem>
  );
}

function FileCard(props: {
  file?: any;
  date_added?: number;
  date_modified?: number;
}) {
  const navigate = useNavigate();
  const { file } = props;
  const { lastSaved: name } = file;
  const handleClick = () => {
    navigate("/editor", { state: file });
  };


  return (
    <GridItem colSpan={1}>
      <Stack onClick={handleClick} role="button">
        <AspectRatio
          bg="#F7F9F9"
          w="100%"
          color="white"
          border="1px"
          borderColor="gray.200"
          borderRadius={5}
          ratio={1}
        >
          <Center p={4}>
            <Image src={docIcon} alt={name} />
          </Center>
        </AspectRatio>
        <Center>
          <Heading size="sm">{name}</Heading>
        </Center>
      </Stack>
    </GridItem>
  );
}

export default function FileTable(props: { files: any[] }) {
  const { files } = props;
  console.log(files)
  return (
    <Grid templateColumns="repeat(5, 3fr)" gap={6} my={5} mx={20}>
      <NewDocCard />
      {files.map((file) => (
        <FileCard key={file.lastSaved} file={file} />
      ))}
    </Grid>
  );
}
