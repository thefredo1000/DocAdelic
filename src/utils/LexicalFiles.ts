import lexical, { LexicalEditor } from "lexical";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

var version = "0.11.1";

function exportBlob(data: any, fileName: string) {
  const a = document.createElement("a");
  const body = document.body;

  if (body === null) {
    return;
  }

  body.appendChild(a);
  a.style.display = "none";
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: "octet/stream",
  });
  return sendFileToIPFS(blob);
}

const sendFileToIPFS = async (fileBlob: any) => {
  if (fileBlob) {
    try {
      console.log({
        pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data",
      });
      const formData = new FormData();
      formData.append("file", fileBlob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const FileHash = `${resFile.data.IpfsHash}`;
      cookies.set("hash", FileHash, { path: "/" });
      return FileHash;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
/**
 * Generates a .lexical file to be downloaded by the browser containing the current editor state.
 * @param editor - The lexical editor.
 * @param config - An object that optionally contains fileName and source. fileName defaults to
 * the current date (as a string) and source defaults to lexical.
 */
export function exportFile(
  editor: LexicalEditor,
  config: Readonly<{ fileName?: string; source?: string }> = Object.freeze({})
) {
  const now = new Date();
  const editorState = editor.getEditorState();
  const documentJSON = {
    editorState: editorState,
    lastSaved: now.getTime(),
    source: config.source || "Lexical",
    version,
  };
  const fileName = config.fileName || now.toISOString();
  return exportBlob(documentJSON, `${fileName}.lexical`);
} // Adapted from https://stackoverflow.com/a/19328891/2013580

export function importFileTest(editor: LexicalEditor, file: any) {
  const editorState = editor.parseEditorState(JSON.stringify(file.editorState));
  editor.setEditorState(editorState);
  editor.dispatchCommand(lexical.CLEAR_HISTORY_COMMAND, undefined);
}

export function importFile(editor: LexicalEditor) {
  readTextFileFromSystem((text: string) => {
    const json = JSON.parse(text);
    const editorState = editor.parseEditorState(
      JSON.stringify(json.editorState)
    );
    editor.setEditorState(editorState);
    editor.dispatchCommand(lexical.CLEAR_HISTORY_COMMAND, undefined);
  });
}

function readTextFileFromSystem(callback: any) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".lexical";
  input.addEventListener("change", (event: any) => {
    const target = event.target;

    if (target && target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = (readerEvent) => {
        if (readerEvent.target) {
          const content = readerEvent.target.result;
          callback(content);
        }
      };
    }
  });
  input.click();
}
