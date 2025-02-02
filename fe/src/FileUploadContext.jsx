import { createContext, useContext, useState, useCallback } from "react";
import { uploadFile } from "./fetch/EditorFetch";

const FileUploadContext = createContext();

export function FileUploadProvider({ children }) {
  const [file, setFile] = useState(null);

  const parseFile = useCallback(async () => {
    if (file) {
      const res = await uploadFile(file);
      downloadTxtFile(res);
    }
  }, [file]);

  const downloadTxtFile = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "response.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <FileUploadContext.Provider value={{ setFile, parseFile }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  return useContext(FileUploadContext);
}
