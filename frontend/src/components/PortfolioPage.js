import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        // Hardcoded password (replace with your logic)
        if (password === "secret123") {
            setIsAuthenticated(true); // Allow access to the portfolio
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    // If not authenticated, show the password input form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Portfolio Access</h1>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Password to Access Portfolio:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // If authenticated, show the portfolio content
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to My Portfolio</h2>
                <p className="text-gray-700">
                    Here are some of my recent projects and achievements:
                </p>
                <ul className="mt-4 list-disc list-inside">
                    <li>Project A: Completed in Q1 2023</li>
                    <li>Project B: Ongoing, expected completion in Q4 2023</li>
                    <li>Project C: Awarded Best Innovation 2023</li>
                </ul>
            </div>
        </div>
    );
};

export default PortfolioPage;