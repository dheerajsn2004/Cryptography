import React, { useState } from "react";
import Sidebar from "./Sidebar";

const EmailPage = () => {
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
                <h1 className="text-2xl font-bold mb-4">Gmail-like Interface</h1>
                <p>This is the main Gmail-like interface.</p>
            </div>
        </div>
    );
};

export default EmailPage;