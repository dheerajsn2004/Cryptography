import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmailContext from "../context/EmailContext";

const EmailDetailPage = () => {
    const { id } = useParams(); // Get the email ID from the URL
    const navigate = useNavigate();
    const emails = useContext(EmailContext); // Access the emails data from context
    const [showDetails, setShowDetails] = useState(false); // State to toggle details
    const [showDecryptModal, setShowDecryptModal] = useState(false); // State to toggle decrypt modal
    const [decryptedText, setDecryptedText] = useState(""); // State for decrypted text input
    const [error, setError] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    // Find the email by ID
    const email = emails.find((email) => email.id === parseInt(id));

    if (!email) {
        return <div className="p-4 text-red-500">Email not found.</div>;
    }

    const handleDecrypt = () => {
        setShowDecryptModal(true); // Show the decrypt modal
    };

    const handleDecryptedTextSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/teams/verify-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: decryptedText,
                    emailId: email.id, // Send the email ID to the backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Correct answer! You can now decrypt the next email."); // Set success message
                setShowDecryptModal(false); // Close the modal
                setDecryptedText(""); // Reset the input field
                setError(""); // Clear any previous error
                setTimeout(() => {
                    setSuccessMessage(""); // Clear success message after 3 seconds
                    navigate("/sent"); // Redirect to the Sent page
                }, 3000); // Wait 3 seconds before redirecting
            } else {
                setError(data.message || "Incorrect decrypted text. Please try again.");
            }
        } catch (error) {
            setError("Error connecting to the server. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={() => navigate("/sent")}
                className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
                &larr; Back to Sent
            </button>
            <div className="bg-white rounded-lg shadow p-6">
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}

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

                {/* Decrypt Button */}
                <button
                    onClick={handleDecrypt}
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Decrypt
                </button>

                {/* Decrypt Modal */}
                {showDecryptModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Enter Decrypted Text</h2>
                            <form onSubmit={handleDecryptedTextSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={decryptedText}
                                    onChange={(e) => setDecryptedText(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter decrypted text"
                                    required
                                />
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailDetailPage;