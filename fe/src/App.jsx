import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Editor from './pages/Editor';
import Test from './pages/Test';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="edit" element={<Editor />} />
                <Route path="*" element={<Home />} />
                <Route path="test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
