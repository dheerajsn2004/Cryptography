import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
 const [teamName] =useState(useLocation().state.teamName);
    // Fixed secret password (displayed as a hint)
    const secretPassword = "Hello";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields!");
            return;
        }

        // Validate the password
        if (formData.password === secretPassword) {
            console.log("Password is correct!");
            console.log("Form Data:", formData);
            alert("Login successful! Redirecting...");

            // Redirect to another page after login
            navigate("/email", { state: { email: formData.email } });
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-opacity-60 p-10 bg-gray-800 text-white">
                <div className="radius-10">
                    <img src="path-to-nisb-logo.png" alt="NISB" />
                </div>
                <div>{teamName}</div>
                <div className="radius-10">
                    <img src="path-to-wie-logo.png" alt="WIE" />
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-2xl p-12 bg-white rounded-lg shadow-lg text-center">
                    <div className="mb-8 text-lg">{"Secret"}</div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password:
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter the secret password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Hint: The secret password is: <strong>{secretPassword}</strong>
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;