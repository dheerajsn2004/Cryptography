import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectA = () => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [decryptedText, setDecryptedText] = useState(""); // State for decrypted text input
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleNextProject = () => {
        setShowModal(true); // Show the modal for decrypted text input
    };

    const handleDecryptedTextSubmit = (e) => {
        e.preventDefault();

        // Hardcoded decrypted text for Project A
        if (decryptedText === "decryptA") {
            navigate("/portfolio/project-b"); // Navigate to Project B
        } else {
            setError("Incorrect decrypted text. Please try again.");
        }
    };

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')", // Replace with your image path
            }}
        >
            <button
                onClick={() => navigate("/portfolio")}
                className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
                &larr; Back to Portfolio
            </button>
            <div className="bg-white bg-opacity-90 rounded-lg shadow p-6">
                {/* Hide project description when modal is open */}
                {!showModal && (
                    <div className="text-center my-8 p-6 bg-gray-100 rounded-lg shadow-inner border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Project A: E-Commerce Platform</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Developed a fully functional e-commerce platform with user authentication, product management, and payment integration.
                        </p>
                    </div>
                )}

                {/* Next Button */}
                <button
                    onClick={handleNextProject}
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Next Project
                </button>

                {/* Modal for Decrypted Text */}
                {showModal && (
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

export default ProjectA;