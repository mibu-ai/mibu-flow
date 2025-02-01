import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Editor from './pages/Editor';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="edit" element={<Editor />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
