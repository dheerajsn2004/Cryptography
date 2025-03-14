import React from "react";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between bg-opacity-60 p-10 bg-gray-800 text-white">
                <div className="radius-10">
                    <img src="" alt="NISB" />
                </div>
                <div>{"Event"}</div>
                <div className="radius-10">
                    <img src="" alt="WIE" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-2xl p-12 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Report Page</h2>
                    <p className="text-gray-700">
                        This is the report page. You can add detailed reports, analytics, or any other relevant information here.
                    </p>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Back to Project
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;