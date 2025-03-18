import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateReport } from "../api/reportApi";

const ReportPage = () => {
    const [answers, setAnswers] = useState(Array(5).fill(""));
    const [error, setError] = useState(""); // Added error handling
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    // Handle input change
    const handleAnswerChange = (index, value) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        console.log("Answers:", answers);

        try {
            const responses = await Promise.all(
                answers.map(async (answer, index) => {
                    const questionId = `r${index + 1}`;
                    const trimmedAnswer = answer.trim().toLowerCase();
                    const data = { username, questionId, answer: trimmedAnswer };

                    console.log("Submitting Data:", data);
                    return validateReport(data);
                })
            );

            if (responses.every((res) => res)) {
                setTimeout(() => navigate("/portfolio/project-b"), 1500);
            } else {
                setError("Some answers are incorrect. Try again.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again.");
        }

        navigate("/thank-you"); // Redirect to thank-you page
    };

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('/images/Landing.jpg')" }}>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between bg-gray-800 text-white px-4 py-3">
                <img src="/images/nisb-logo.png" alt="NISB" className="w-16 h-16 object-contain" />
                <img src="/images/report.png" alt="Silent Cipher" className="w-32 h-16 object-contain" />
                <img src="/images/wie-logo.png" alt="WIE" className="w-16 h-16 object-contain" />
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center p-6">
                <div className="relative max-w-4xl w-full">
                    <img src="/images/report-questions.png" alt="Report Page" className="w-full h-auto rounded-lg shadow-lg" />

                    {/* Input Fields */}
                    <div className="absolute inset-0">
                        {answers.map((answer, index) => (
                            <div key={index} className={`absolute left-[75%] top-[${17 + index * 18}%]`}>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                    placeholder={`Answer for Q${index + 1}`}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="absolute bottom-[-8%] left-[77%]">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Submit Answers
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
