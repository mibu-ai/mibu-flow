import { FileUploader } from "react-drag-drop-files";
import { useFileUpload } from "../FileUploadContext"; // path may vary

const fileTypes = ["PDF"];

function FileUpload() {
  const { setFile } = useFileUpload();

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default FileUpload;
