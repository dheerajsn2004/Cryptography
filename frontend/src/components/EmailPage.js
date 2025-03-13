import React, { useState } from "react";
import Sidebar from "./Sidebar";

const EmailPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Sample email data
    const emails = [
        {
            id: 1,
            sender: "John Doe",
            subject: "Meeting Reminder",
            timestamp: "2 hours ago",
            preview: "Don't forget about the meeting tomorrow at 10 AM.",
        },
        {
            id: 2,
            sender: "Jane Smith",
            subject: "Project Update",
            timestamp: "5 hours ago",
            preview: "Here's the latest update on the project.",
        },
        {
            id: 3,
            sender: "Alice Johnson",
            subject: "Important Announcement",
            timestamp: "1 day ago",
            preview: "Please review the attached document.",
        },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Inbox</h1>
                <div className="bg-white rounded-lg shadow">
                    {emails.map((email) => (
                        <div key={email.id} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-semibold">{email.sender}</p>
                                        <p className="text-sm text-gray-600">{email.subject}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{email.timestamp}</p>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{email.preview}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailPage;