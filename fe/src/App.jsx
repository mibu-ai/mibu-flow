import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Editor from './pages/Editor';
import Test from './pages/Test';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { FileUploadProvider } from "./FileUploadContext"; // Adjust path as necessary

function App() {
  return (
    <FileUploadProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="edit" element={<Editor />} />
          <Route path="*" element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </FileUploadProvider>
  );
}

export default App;
