import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { uploadFile } from "../fetch/EditorFetch";

const fileTypes = ["PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    async function parseFile() {
      if (file) {
        const res = await uploadFile(file);
        console.log(res);
      }
    }

    parseFile();
  }, [file]);

  return (
    <>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <h2>hello</h2>
    </>
  );
}

export default DragDrop;
