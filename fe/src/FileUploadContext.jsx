import { createContext, useContext, useState, useCallback } from "react";
import { uploadFile } from "./fetch/EditorFetch";

const FileUploadContext = createContext();

export function FileUploadProvider({ children }) {
  const [file, setFile] = useState(null);

  const parseFile = useCallback(async () => {
    if (file) {
      const res = await uploadFile(file);
      console.log(res);
    }
  }, [file]);

  return (
    <FileUploadContext.Provider value={{ setFile, parseFile }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  return useContext(FileUploadContext);
}
