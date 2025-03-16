import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password === "secret123") {
            setIsAuthenticated(true);
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/portfolio8.jpg')", // Replace with your image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Password Entry Box with Glassmorphism */}
                <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 shadow-2xl p-8 w-full max-w-md rounded-3xl">
                    <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 font-serif">
                        Enter Access Code
                    </h1>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
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
            className="p-4 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')", // Replace with your image path
            }}
        >
            <h1 className="text-4xl font-extrabold mb-4 text-white font-serif">Portfolio</h1>
            {/* Updated div with the same styling as ProjectA */}
            <div className="bg-blue-100 bg-opacity-50 rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white font-serif">Welcome to My Portfolio</h2>
                <p className="text-white leading-relaxed font-sans">
                    Here are some of my recent projects and achievements:
                </p>
                <ul className="text-white mt-4 list-disc list-inside text-lg font-sans">
                    <li>Project A: Completed in Q1 2023</li>
                    <li>Project B: Ongoing, expected completion in Q4 2023</li>
                    <li>Project C: Awarded Best Innovation 2023</li>
                </ul>
            </div>
            <div>
                <button
                    onClick={() => navigate("/portfolio/project-a")}
                    className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                >
                    Know My Journey
                </button>
            </div>
        </div>
    );
};

export default PortfolioPage;