import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";

const fileTypes = ["PDF"];

function DragDrop() {

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };

    useEffect(() => {
        if (file) {
            // Perform any action with the file if needed
            console.log(file);
        }
    }, [file]);
    
    return (
        <>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <h2>hello</h2>
        </>

    );
  }
  
  export default DragDrop;