import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import FirstPage from './components/FirstPage.js';
import MainPage from './components/MainPage.js';
import EmailPage from './components/EmailPage.js';
import './App.css';
import SentPage from './components/SentPage.js';
import DraftsPage from './components/DraftsPage.js';
function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<FirstPage/>} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/sent" element={<SentPage />} />
            <Route path="/drafts" element={<DraftsPage />} />

    </Routes>
    </BrowserRouter>
);
}

export default App;