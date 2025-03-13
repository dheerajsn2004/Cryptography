import React, { useState } from "react";
import { FiSearch, FiSettings, FiHelpCircle,FiMenu } from "react-icons/fi";
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
            <div className="flex-1">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
                            <FiMenu size={24} />
                        </button>
                        <div className="ml-4 relative">
                            <input
                                type="text"
                                placeholder="Search mail"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 focus:outline-none">
                            <FiSettings size={24} />
                        </button>
                        <button className="text-gray-600 focus:outline-none">
                            <FiHelpCircle size={24} />
                        </button>
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                </header>

                {/* Email List */}
                <div className="p-4">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-semibold">John Doe</p>
                                        <p className="text-sm text-gray-600">Meeting Reminder</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">2 hours ago</p>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                Don't forget about the meeting tomorrow at 10 AM.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPage;