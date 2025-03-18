import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateCipher } from "../api/cipherApi";

const MainPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: "" });
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    // Fetch username from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem("username") || "Team";
        setUsername(storedUsername);
    }, []);

    const handleChange = (e) => {
        setFormData({ password: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password) {
            setError("Please enter the secret code!");
            return;
        }

        try {
            const questionId = "q1";
            const data = { username, questionId, password: formData.password };
            
            console.log("Submitting Data:", data);
            
            const response = await validateCipher(data);
            
            if (response?.success) { // Ensure proper response handling
                setMessage("Password verified! Redirecting...");
                setIsSubmitted(true);
                setTimeout(() => navigate("/email"), 1500);
            } else {
                setError(response?.message || "Incorrect password. Try again.");
            }
        } catch (error) {
            console.error(error);
            setError("Error connecting to the server. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username"); // Clear username on logout
        navigate("/");
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/Landing.jpg')` }}>

            <header className="relative z-10 flex items-center justify-between w-full px-6 md:px-12 py-4 bg-blue-900 bg-opacity-0 shadow-lg">
                <img src="./images/nisb-logo.png" alt="NISB" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-xl md:text-2xl font-bold text-white">{username}</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                    Logout
                </button>
            </header>

            <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-6xl p-12 md:p-16 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center">
                    <h2 className="mb-6 text-2xl md:text-3xl font-bold text-white">Enter the Secret Code</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Fixed Email Input */}
                        <div className="mb-6">
                            <label className="block text-white text-lg md:text-xl font-semibold mb-2">Email:</label>
                            <input
                                type="email"
                                value={"Anonymous@gmail.com"}
                                readOnly
                                className="w-full px-4 py-3 text-gray-900 bg-gray-300 border border-gray-400 rounded-lg shadow-md cursor-not-allowed"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block text-white text-lg md:text-xl font-semibold mb-2">Secret Code:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter the secret code"
                                className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all ${
                                isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? "Submitted" : "Submit"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
