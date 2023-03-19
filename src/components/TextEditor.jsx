import React, { Component, useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@chakra-ui/react";
import { downloadDocx } from "../utils/ExportDocx";

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState.getCurrentContent().getBlocksAsArray());
    console.log(editorState.getCurrentContent().getFirstBlock());
    console.log(editorState.getCurrentContent().getBlockMap().get("text"));
  };
  return (
    <>
      <Button
        id="downloadBtn"
        onClick={() =>
          downloadDocx(editorState.getCurrentContent().getBlocksAsArray())
        }
        value="download"
      >
        Export
      </Button>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
}
