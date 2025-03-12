import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import FirstPage from './components/FirstPage.js';
import MainPage from './components/MainPage.js';
import EmailPage from './components/EmailPage.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<FirstPage/>} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/email" element={<EmailPage />} />
    </Routes>
    </BrowserRouter>
);
}

export default App;
=======
