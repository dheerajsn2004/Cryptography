import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
    const [message, setMessage] = useState(""); // State for success/error messages
    const username = location.state?.username || "Team"; // Retrieve the username from the state

    // Fetch team's submission status when the page loads
    useEffect(() => {
        const fetchTeamStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/teams/team-status?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setIsSubmitted(data.hasSubmittedPassword); // Set submission status
                } else {
                    setError(data.message || "Failed to fetch team status");
                }
            } catch (error) {
                setError("Error connecting to the server. Please try again.");
            }
        };

        fetchTeamStatus();
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields!");
            return;
        }

        try {
            // Verify the password with the backend
            const response = await fetch("http://localhost:5000/api/teams/verify-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password: formData.password }),
            });

            const data = await response.json();

            if (response.ok) {
                // If password is correct, update the email and navigate to EmailPage
                const updateEmailResponse = await fetch("http://localhost:5000/api/teams/update-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email: formData.email }),
                });

                const updateEmailData = await updateEmailResponse.json();

                if (updateEmailResponse.ok) {
                    setMessage("Password verified! Redirecting...");
                    setIsSubmitted(true); // Disable the submit button
                    setTimeout(() => {
                        navigate("/email", { state: { email: formData.email } });
                    }, 1500); // Redirect after 1.5 seconds
                } else {
                    setError(updateEmailData.message || "Failed to update email.");
                }
            } else {
                setError(data.message || "Incorrect password. Please try again.");
            }
        } catch (error) {
            setError("Error connecting to the server. Please try again.");
        }
    };

    // Logout Function
    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/Landing.jpg')` }}
        >
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-36 h-36 bg-blue-300 rounded-full opacity-30 blur-xl animate-float -top-10 -left-10"></div>
                <div className="absolute w-28 h-28 bg-purple-300 rounded-full opacity-30 blur-xl animate-float-reverse -bottom-10 right-10"></div>
                <div className="absolute w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-xl animate-float top-1/3 left-1/4"></div>
                <div className="absolute w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-xl animate-float-reverse bottom-1/4 right-1/3"></div>
            </div>

            {/* Header with Logout Button */}
            <header className="relative z-10 flex items-center justify-between w-full px-6 md:px-12 py-4 bg-blue-900 bg-opacity-0 shadow-lg">
                <img src="./images/nisb-logo.png" alt="NISB" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-xl md:text-2xl font-bold text-white">{username}</h1>
                <div className="flex items-center space-x-4">
                    <img src="./images/wie-logo.jpg" alt="WIE" className="w-12 h-12 md:w-16 md:h-16" />
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-10">
                {/* Increased size of the inner div */}
                <div className="w-full max-w-6xl p-12 md:p-16 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center">
                    <h2 className="mb-6 text-2xl md:text-3xl font-bold text-white">Enter the Secret Code</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}

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
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
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
                                isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95"
                            } focus:outline-none focus:ring-4 focus:ring-indigo-300`}
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? "Submitted" : "Submit"}
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
        </div>
    );
};

export default MainPage;