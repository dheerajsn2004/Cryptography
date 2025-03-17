import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateCipher } from "../api/cipherApi";

const PortfolioPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username") || "Team";
        setUsername(storedUsername);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError("Please enter the access code!");
            return;
        }

        try {
            const questionId = "d1";
            const data = { username, questionId, answer: password };

            console.log("Submitting Data:", data);

            const response = await validateCipher("/your-endpoint", data);

            if (response.data.success) {
                setIsAuthenticated(true);
                setTimeout(() => navigate("/email"), 1500);
            } else {
                setError(response.data.message || "Incorrect password. Try again.");
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/portfolio8.jpg')" }}
            >
                <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 shadow-2xl p-8 w-full max-w-md rounded-3xl">
                    <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
                        Enter Access Code
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl bg-white bg-opacity-60 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all font-sans"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center font-semibold font-sans">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 font-serif"
                        >
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center flex flex-col items-center justify-center" // Center-align everything
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')", // Replace with your image path
            }}
        >
            {/* Constrain the width of this div and center-align it */}
            <div className="max-w-4xl w-full mx-auto"> {/* Center the container */}
                {/* Image for Portfolio Title */}
                <img
                    src="/images/portfolio-content.png" // Replace with your image path
                    alt="Portfolio Title"
                    className="w-full h-auto mb-8 rounded-lg shadow-lg"
                />

                {/* Reduced size for the project image */}
                <div className="flex justify-center"> {/* Center-align the project image */}
                    <img
                        src="/images/portfolio-project.png" // Replace with your image path
                        alt="Portfolio Project"
                        className="max-w-20 w-full h-auto rounded-lg shadow-lg" // Reduced width using max-w-md
                    />
                </div>

                {/* Button to navigate to Project A */}
                <div className="flex justify-center"> {/* Center-align the button */}
                    <button
                        onClick={() => navigate("/portfolio/project-a")}
                        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                    >
                        Know My Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
