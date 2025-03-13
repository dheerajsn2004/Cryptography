import React, { useState } from "react";
import Sidebar from "./Sidebar";

const DraftsPage = () => {
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
                <h1 className="text-2xl font-bold mb-4">Drafts</h1>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Game Clue 2</h2>
                    <p className="text-gray-600">
                        The second clue is hidden in the draft email titled "Follow-Up Email".
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DraftsPage;