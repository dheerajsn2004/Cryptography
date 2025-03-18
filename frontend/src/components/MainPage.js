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
        const trimmedPassword = formData.password.toLowerCase().trim(); // ✅ Convert to lowercase & trim spaces

        if (!trimmedPassword) {
            setError("Please enter the secret code!");
            return;
        }

        try {
            const questionId = "q1";
            const data = { username, questionId, password: trimmedPassword };

            console.log("Submitting Data:", data);

            const response = await validateCipher(data);

            if (response?.success) {
                setMessage("✅ Password verified! Redirecting...");
                setIsSubmitted(true);
                setTimeout(() => navigate("/email"), 1500);
            } else {
                setError(response?.message || "❌ Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("⚠️ Error connecting to the server. Please try again.");
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

<<<<<<< HEAD
            <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-6xl p-12 md:p-16 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center">
                    <h2 className="mb-6 text-2xl md:text-3xl font-bold text-white">Enter the Secret Code</h2>
=======
            {/* Main Content */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-10 -mt-8"> {/* Added -mt-8 to move the div up */}
    {/* Text or Image Outside the Div */}
    <div className="mb-8 mt-10 text-center">
        {/* Replace "Enter the Secret Code" text with an image */}
        <img
            src="/images/text.png" // Replace with the path to your image
            alt="Enter the Secret Code"
            className="w-full max-w-lg mx-auto" // Adjust size as needed
        />
    </div>
>>>>>>> e84c54629ca05832b4da9a89ac800418794a4214

    {/* Form Container */}
    <div className="w-full max-w-6xl p-12 md:p-16 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

<<<<<<< HEAD
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
                            {isSubmitted ? "✔ Submitted" : "Submit"}
                        </button>
                    </form>
                </div>
            </main>
=======
        <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
                <label htmlFor="email" className="block text-white text-lg md:text-xl font-semibold mb-2">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={formData.email} // Pre-fill the email
                    readOnly // Make the email field read-only
                    className="w-full px-4 py-3 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all cursor-not-allowed" // Gray background and cursor-not-allowed
                />
            </div>

            {/* Password Input */}
            <div className="mb-6">
                <label htmlFor="password" className="block text-white text-lg md:text-xl font-semibold mb-2">
                    Secret Code:
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter the secret code"
                    className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform ${
                    isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-500 hover:scale-105 active:scale-95"
                } focus:outline-none focus:ring-4 focus:ring-indigo-300`}
                disabled={isSubmitted}
            >
                {isSubmitted ? "Submitted" : "Enter"}
            </button>
        </form>
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
>>>>>>> e84c54629ca05832b4da9a89ac800418794a4214
        </div>
    );
};

export default MainPage;
