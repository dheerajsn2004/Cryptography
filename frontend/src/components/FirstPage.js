import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both username and password!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/teams/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert("Login successful!");
                navigate("/main", { state: { username } });
            } else {
                alert(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setLoading(false);
            alert("Error connecting to the server. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200">
            {/* Header */}
            <header className="flex items-center justify-between w-full max-w-4xl px-6 md:px-12 py-4 bg-purple-200 bg-opacity-90 shadow-lg rounded-b-lg">
                <img src="./images/nisb-logo.png" alt="NISB" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 tracking-widest">CRYPTOQUEST</h1>
                <img src="./images/wie-logo.jpg" alt="WIE" className="w-12 h-12 md:w-16 md:h-16" />
            </header>

            {/* Login Form */}
            <main className="flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-lg p-8 md:p-12 bg-purple-100 bg-opacity-90 border border-gray-300 rounded-2xl shadow-xl text-center">
                    <p className="mb-6 text-lg md:text-xl text-gray-700 font-medium">
                        Welcome to the Cryptography Challenge! Please log in to continue.
                    </p>

                    {/* Username Input */}
                    <div className="mb-4 text-left">
                        <label htmlFor="username" className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 text-left">
                        <label htmlFor="password" className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95"
                        } focus:outline-none focus:ring-4 focus:ring-indigo-300`}
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FirstPage;
