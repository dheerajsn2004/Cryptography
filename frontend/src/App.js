import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import FirstPage from './components/FirstPage';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<FirstPage/>} />
            <Route path="/main" element={<MainPage />} />
    </Routes>
    </BrowserRouter>
);
}

export default App;
=======
