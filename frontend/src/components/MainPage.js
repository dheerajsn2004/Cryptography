import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // Fixed email
    const [formData, setFormData] = useState({ password: "" });
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch username from local storage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);

            // Fetch email and submission status through cipher API
            fetch("http://localhost:5000/api/cipher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: storedUsername })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.email) setEmail(data.email); // Set email
                    if (data.hasSubmittedPassword) setIsSubmitted(true); // Check if password was already submitted
                })
                .catch(() => setError("Error fetching user details."));
        } else {
            setError("Username not found. Please log in again.");
        }
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
            // Verify password through cipher API
            const response = await fetch("http://localhost:5000/api/cipher/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password: formData.password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password verified! Redirecting...");
                setIsSubmitted(true);
                setTimeout(() => navigate("/email", { state: { email } }), 1500);
            } else {
                setError(data.message || "Incorrect password. Try again.");
            }
        } catch {
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
                <h1 className="text-xl md:text-2xl font-bold text-white">{username || "Team"}</h1>
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
                                value={email}
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
