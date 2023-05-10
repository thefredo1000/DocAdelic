import { useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@chakra-ui/react";
import { downloadDocx, uploadDocx } from "../utils/ExportDocx";
import "./styles/TextEditor.css";

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const Buttons = () => (
    <>
      <Button
        id="downloadBtn"
        onClick={() =>
          downloadDocx(editorState.getCurrentContent().getBlocksAsArray())
        }
        value="download"
        size="sm"
        variant="ghost"
        colorScheme="red"
      >
        Import
      </Button>
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
        Download
      </Button>
      <Button
        id="downloadBtn"
        onClick={() =>
          uploadDocx(editorState.getCurrentContent().getBlocksAsArray())
        }
        value="download"
        size="sm"
        variant="ghost"
        colorScheme="green"
      >
        Upload
      </Button>
    </>
  );
  return (
    <Editor
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbarCustomButtons={[<Buttons />]}
      handleKeyCommand={(command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          setEditorState(newState);
          return "handled";
        }
        return "not-handled";
      }}
      onTab={(e) => {
        const maxDepth = 4;
        setEditorState(RichUtils.onTab(e, editorState, maxDepth));
      }}
      toolbar={{
        options: ["inline", "blockType", "fontSize", "fontFamily"],
        blockType: {
          options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
          className: "bordered-dropdown-classname",
        },
        fontFamily: {
          options: [
            "Segoe UI",
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
  );
}
