import React, { Component, useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@chakra-ui/react";
import { downloadDocx } from "../utils/ExportDocx";
import "./styles/TextEditor.css";

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const DownloadButton = () => (
    <Button
      id="downloadBtn"
      onClick={() =>
        downloadDocx(editorState.getCurrentContent().getBlocksAsArray())
      }
      value="download"
      size="sm"
      variant="ghost"
      colorScheme="yellow"
    >
      Export
    </Button>
  );

  const BoldButton = () => (
    <Button size="sm" variant="ghost" colorScheme="yellow">
      B
    </Button>
  );
  return (
    <>
      <Editor
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarCustomButtons={[<DownloadButton />]}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "fontFamily"],
          blockType: {
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
            className: "bordered-dropdown-classname",
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
            className: "bordered-dropdown-classname",
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: "bordered-dropdown-classname",
          },
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
            bold: { className: "bordered-option-classname" },
            italic: { className: "bordered-option-classname" },
            underline: { className: "bordered-option-classname" },
            strikethrough: { className: "bordered-option-classname" },
            monospace: { className: "bordered-option-classname" },
          },
        }}
      />
    </>
  );
}
