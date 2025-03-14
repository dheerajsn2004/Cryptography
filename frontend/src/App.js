import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import FirstPage from './components/FirstPage.js';
import MainPage from './components/MainPage.js';
import EmailPage from './components/EmailPage.js';
import SentPage from './components/SentPage.js';
import DraftsPage from './components/DraftsPage.js';
import EmailDetailPage from './components/EmailDetailPage.js';
import EmailContext from "./context/EmailContext";
import PortfolioPage from './components/PortfolioPage.js';
import ProjectA from './components/ProjectA.js';
import ProjectB from './components/ProjectB.js';
import ProjectC from './components/ProjectC.js';
import TemplatePage from './components/TempltePage.js';
import ReportPage from './components/ReportPage.js';
import './App.css';
function App() {
  const emails = [
    {
        id: 1,
        sender: "John Doe",
        recipient: "Jane Smith",
        subject: "Meeting Reminder",
        timestamp: "2 hours ago",
        preview: "Don't forget about the meeting tomorrow at 10 AM.",
        cc: ["alice@example.com", "bob@example.com"],
        body: "Hi Jane, just a reminder about our meeting tomorrow at 10 AM. Please ensure you have the project updates ready. Best, John",
    },
    {
        id: 2,
        sender: "Jane Smith",
        recipient: "John Doe",
        subject: "Project Update",
        timestamp: "5 hours ago",
        preview: "Here's the latest update on the project.",
        cc: ["charlie@example.com"],
        body: "Hi John, here's the latest update on the project. Let me know if you have any questions. Best, Jane",
    },
];
  return (
    <EmailContext.Provider value={emails}>
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<FirstPage/>} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/sent" element={<SentPage />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/sent/:id" element={<EmailDetailPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/project-a" element={<ProjectA />} />
                <Route path="/portfolio/project-b" element={<ProjectB />} />
                <Route path="/portfolio/project-c" element={<ProjectC />} />
                <Route path="/template-page" element={<TemplatePage />} />
                <Route path="/report-page" element={<ReportPage />} />
    </Routes>
    </BrowserRouter>
    </EmailContext.Provider>
);
}

export default App;