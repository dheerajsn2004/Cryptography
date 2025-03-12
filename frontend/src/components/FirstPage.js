import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const FirstPage = () => {
    const navigate = useNavigate();
    
    // Sample message text
    const sampleText = "Welcome to the Cryptography Challenge! Test your skills by decrypting messages and solving puzzles. Are you ready to begin?";
    
    const handleStart = () => {
        navigate("/main");
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-opacity-60 p-10 bg-gray-800 text-white">
                <div className="radius-10">
                    <img src="" alt="NISB" />
                </div>
                <div>
                    {"Event"}
                </div>
                <div className="radius-10">
                    <img src="" alt="WIE" />
                </div>
            </header>
            
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-2xl p-12 bg-white rounded-lg shadow-lg text-center">
                    <div className="mb-8 text-lg">
                        {sampleText}
                    </div>
                    <div className="flex justify-center">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            onClick={handleStart}
                        >
                            Let's Play
                        </button>
                    </div>
                </div>
            </main>
            
            <Outlet />
        </div>
    );
}

export default FirstPage;