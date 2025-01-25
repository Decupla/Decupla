import { activeTextEditors } from "./data";

const toolbarOptions = [
  // font options
  [{ font: [] }],

  //   header options
  [{ header: [1, 2, 3] }],

  // text utilities
  ["bold", "italic", "underline", "strike"],

  // text colors and bg colors
  [{ color: [] }, { background: [] }],

  // lists
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

  // block quotes and code blocks
  ["blockquote", "code-block"],

  // media
  ["link", "image", "video"],

  // alignment
  [{ align: [] }],
];

export const createEditor = (container,name,value="") => {
  console.log("name",name);

  const quill = new Quill(container, {
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
  });

  if (value!=="") {
    const delta = quill.clipboard.convert(value);
    quill.setContents(delta);
  }

  activeTextEditors.push({
    name,
    editor: quill
  });
}

export const getEditorData = () => {
  const editorData = activeTextEditors.map((quillInstance) => ({
    name: quillInstance.name,
    content: quillInstance.editor.root.innerHTML
  }));
  return editorData;
};