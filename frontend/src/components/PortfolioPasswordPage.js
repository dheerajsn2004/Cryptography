import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password === "secret123") {
            navigate("/portfolio-content"); // Redirect to the portfolio content page
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

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
            {/* Overlay to reduce background image opacity */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Adjust opacity here */}

            {/* Password Entry Box with Glassmorphism */}
            <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 shadow-2xl p-8 w-full max-w-md rounded-3xl">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
                    Enter Access Code
                </h1>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
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
                        className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 font-serif"
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PortfolioPasswordPage;