import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Editor from './pages/Editor';
import Test from './pages/Test';
import SignIn from "./pages/SignIn";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="edit" element={<Editor />} />
                <Route path="*" element={<Home />} />
                <Route path="test" element={<Test />} />
                <Route path="/signin" element={<SignIn />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
