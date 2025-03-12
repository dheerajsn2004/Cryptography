import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");

    // Sample message text
    const sampleText = "Welcome to the Cryptography Challenge! Test your skills by decrypting messages and solving puzzles. Are you ready to begin?";

    const handleStart = () => {
        if (teamName.trim() === "") {
            alert("Please enter a team name!");
            return;
        }
        // Pass the team name to the next page via state
        navigate("/main", { state: { teamName } });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-opacity-60 p-10 bg-gray-800 text-white">
                <div className="radius-10">
                    <img src="" alt="NISB" />
                </div>
                <div>{"Event"}</div>
                <div className="radius-10">
                    <img src="" alt="WIE" />
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-2xl p-12 bg-white rounded-lg shadow-lg text-center">
                    <div className="mb-8 text-lg">{sampleText}</div>
                    <div className="mb-8">
                        <label htmlFor="teamName" className="block text-gray-700 text-sm font-bold mb-2">
                            Enter Team Name:
                        </label>
                        <input
                            id="teamName"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Team Name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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

        </div>
    );
};
export default FirstPage;