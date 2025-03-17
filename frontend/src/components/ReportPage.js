import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const [answers, setAnswers] = useState(Array(5).fill("")); // State to store answers for 5 questions
    const navigate = useNavigate();

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
            className="flex flex-col min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/images/Landing.jpg')", // Replace with your image path
            }}
        >
            {/* Overlay with reduced opacity */}
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between bg-opacity-60 px-4 py-3 bg-gray-800 text-white">
                <div className="w-16 h-16">
                    <img src="/images/nisb-logo.png" alt="NISB" className="w-full h-full object-contain" />
                </div>
                {/* Replace "Silent Cipher" text with an image */}
                <div className="w-32 h-16"> {/* Adjust width and height as needed */}
                    <img src="/images/report.png" alt="Silent Cipher" className="w-full h-full object-contain" />
                </div>
                <div className="w-16 h-16">
                    <img src="/images/wie-logo.png" alt="WIE" className="w-full h-full object-contain" />
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center p-6">
                {/* Container for the image and input fields */}
                <div className="relative max-w-4xl w-full">
                    {/* Image with questions */}
                    <img
                        src="/images/report-questions.png" // Replace with your image path
                        alt="Report Page"
                        className="w-full h-auto rounded-lg shadow-lg" // Constrain width and add styling
                    />

                    {/* Overlay for input fields */}
                    <div className="absolute inset-0">
                        {/* Input field for Question 1 */}
                        <div className="absolute top-[17%] left-[75%]">
                            <input
                                type="text"
                                value={answers[0]}
                                onChange={(e) => handleAnswerChange(0, e.target.value)}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                placeholder="Answer for Q1"
                                required
                            />
                        </div>

                        {/* Input field for Question 2 */}
                        <div className="absolute top-[35%] left-[75%]">
                            <input
                                type="text"
                                value={answers[1]}
                                onChange={(e) => handleAnswerChange(1, e.target.value)}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                placeholder="Answer for Q2"
                                required
                            />
                        </div>

                        {/* Input field for Question 3 */}
                        <div className="absolute top-[55%] left-[75%]">
                            <input
                                type="text"
                                value={answers[2]}
                                onChange={(e) => handleAnswerChange(2, e.target.value)}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                placeholder="Answer for Q3"
                                required
                            />
                        </div>

                        {/* Input field for Question 4 */}
                        <div className="absolute top-[71%] left-[75%]">
                            <input
                                type="text"
                                value={answers[3]}
                                onChange={(e) => handleAnswerChange(3, e.target.value)}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                placeholder="Answer for Q4"
                                required
                            />
                        </div>

                        {/* Input field for Question 5 */}
                        <div className="absolute top-[87%] left-[75%]">
                            <input
                                type="text"
                                value={answers[4]}
                                onChange={(e) => handleAnswerChange(4, e.target.value)}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                placeholder="Answer for Q5"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="absolute bottom-[-8%] left-[77%]">
                        <button
                            type="button" // Use type="button" to prevent form submission
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Submit Answers
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;