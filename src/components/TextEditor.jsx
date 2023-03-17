import React, { Component, useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    console.log(editorState.getCurrentContent().getPlainText())
  }
  return <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />;
}
