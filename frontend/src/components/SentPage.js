import React, { useState } from "react";
import Sidebar from "./Sidebar";

const SentPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Sent</h1>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Game Clue 1</h2>
                    <p className="text-gray-600">
                        The first clue is hidden in the subject line of the email titled "Project Update".
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SentPage;