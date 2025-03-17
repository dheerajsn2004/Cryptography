import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const [answers, setAnswers] = useState(Array(6).fill("")); // State to store answers for 6 questions
    const navigate = useNavigate();

    // List of questions
    const questions = [
        "Question 1: What is the capital of France?",
        "Question 2: Who wrote 'To Kill a Mockingbird'?",
        "Question 3: What is the chemical symbol for water?",
        "Question 4: What is the largest planet in our solar system?",
        "Question 5: Who painted the Mona Lisa?",
        "Question 6: What is the square root of 64?"
    ];

    // Handle input change for each question
    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Answers:", answers); // Log answers to the console (or send to backend)
        navigate('/thank-you'); // Redirect to the thank you page
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/Landing.jpg')", // Replace with your image path
            }}
        >
            {/* Header */}
            <header className="flex items-center justify-between bg-opacity-60 p-4 bg-gray-800 text-white">
                <div className="w-16 h-16">
                    <img src="/images/nisb-logo.png" alt="NISB" className="w-full h-full object-contain" />
                </div>
                <div className="text-lg font-semibold">{"Silent Cipher"}</div>
                <div className="w-16 h-16">
                    <img src="/images/wie-logo.png" alt="WIE" className="w-full h-full object-contain" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div 
                    className="max-w-2xl w-full p-8 rounded-lg shadow-lg"
                    style={{
                        background: "rgba(173, 216, 230, 0.1)", // Light blue with transparency
                        backdropFilter: "blur(10px)", // Glassmorphism effect
                        border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle white border
                    }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center text-white">Report Page</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Render questions and textboxes */}
                        {questions.map((question, index) => (
                            <div key={index} className="mb-6">
                                <label className="block text-white text-sm font-semibold mb-2">
                                    {question}
                                </label>
                                <input
                                    type="text"
                                    value={answers[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your answer"
                                    required
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Submit Answers
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
