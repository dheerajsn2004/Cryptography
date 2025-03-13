import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmailContext from "../context/EmailContext";

const EmailDetailPage = () => {
    const { id } = useParams(); // Get the email ID from the URL
    const navigate = useNavigate();
    const emails = useContext(EmailContext); // Access the emails data from context
    const [showDetails, setShowDetails] = useState(false); // State to toggle details

    // Find the email by ID
    const email = emails.find((email) => email.id === parseInt(id));

    if (!email) {
        return <div className="p-4 text-red-500">Email not found.</div>;
    }

    return (
        <div className="p-4">
            <button
                onClick={() => navigate("/sent")}
                className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
                &larr; Back to Sent
            </button>
            <div className="bg-white rounded-lg shadow p-6">
                {/* Email Header */}
                <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold mb-2">{email.subject}</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {email.sender.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold">{email.sender}</p>
                            <p className="text-sm text-gray-600">
                                to <span className="text-gray-800">{email.recipient}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Show Details Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-4 text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
                >
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>

                {/* Email Details */}
                {showDetails && (
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                            <span className="w-24 text-sm text-gray-600">From:</span>
                            <span className="text-gray-800">{email.sender}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 text-sm text-gray-600">To:</span>
                            <span className="text-gray-800">{email.recipient}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 text-sm text-gray-600">CC:</span>
                            <span className="text-gray-800">{email.cc.join(", ")}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 text-sm text-gray-600">Date:</span>
                            <span className="text-gray-800">{email.timestamp}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 text-sm text-gray-600">Subject:</span>
                            <span className="text-gray-800">{email.subject}</span>
                        </div>
                    </div>
                )}

                {/* Email Body */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{email.body}</p>
                </div>
            </div>
        </div>
    );
};

export default EmailDetailPage;