import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");

    const handleStart = () => {
        if (teamName.trim() === "") {
            alert("Please enter a team name!");
            return;
        }
        navigate("/main", { state: { teamName } });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-36 h-36 bg-blue-300 rounded-full opacity-30 blur-xl animate-float -top-10 -left-10"></div>
                <div className="absolute w-28 h-28 bg-purple-300 rounded-full opacity-30 blur-xl animate-float-reverse -bottom-10 right-10"></div>
                <div className="absolute w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-xl animate-float top-1/3 left-1/4"></div>
                <div className="absolute w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-xl animate-float-reverse bottom-1/4 right-1/3"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between w-full max-w-4xl px-6 md:px-12 py-4 bg-purple-200 bg-opacity-90 backdrop-blur-lg shadow-lg rounded-b-lg">
                <img src="./images/nisb-logo.png" alt="NISB" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 tracking-widest">CRYPTOQUEST</h1>
                <img src="./images/wie-logo.jpg" alt="WIE" className="w-12 h-12 md:w-16 md:h-16" />
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-lg p-8 md:p-12 bg-purple-100 bg-opacity-90 backdrop-blur-xl border border-gray-300 rounded-2xl shadow-xl text-center">
                    <p className="mb-6 text-lg md:text-xl text-gray-700 font-medium">
                        Welcome to the Cryptography Challenge! Decode the encrypted messages and solve mind-bending puzzles. Are you ready to begin?
                    </p>

                    {/* Input Field */}
                    <div className="mb-6">
                        <label htmlFor="teamName" className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                            Enter Team Name:
                        </label>
                        <input
                            id="teamName"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Your Team Name"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    {/* Start Button */}
                    <button
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                        onClick={handleStart}
                    >
                        Start Challenge
                    </button>
                </div>
            </main>

            {/* Floating Animations */}
            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-10px) scale(1.05); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(10px) scale(1.05); }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite alternate;
                }

                .animate-float-reverse {
                    animation: float-reverse 6s ease-in-out infinite alternate;
                }
                `}
            </style>
        </div>
    );
};

export default FirstPage;
