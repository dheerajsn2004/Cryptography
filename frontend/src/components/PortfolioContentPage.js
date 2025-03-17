import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioContentPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative" // Added relative for pseudo-element
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')", // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay to reduce background image opacity */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50" // Adjust opacity here (e.g., bg-opacity-50 for 50% opacity)
            ></div>

            {/* Constrain the width of this div and center-align it */}
            <div className="relative max-w-4xl w-full mx-auto z-10"> {/* Added z-10 to bring content above the overlay */}
                {/* Image for Portfolio Title */}
                <img
                    src="/images/portfolio-content.png" // Replace with your image path
                    alt="Portfolio Title"
                    className="w-full h-auto mb-8 rounded-lg shadow-lg"
                />

                {/* Adjusted size and position for the project-numbers image */}
                <div className="ml-3"> {/* Move the image to the left */}
                    <img
                        src="/images/project-numbers.png" // Replace with your image path
                        alt="Portfolio Project"
                        className="w-1/6 h-auto rounded-lg shadow-lg" // Adjusted width
                    />
                </div>

                {/* Position project-name-1, project-name-2, and project-name-3 using percentages */}
                <div className="absolute top-[72%] left-[12%] cursor-pointer" onClick={() => navigate("/portfolio/project-a")}>
                    <img
                        src="/images/project-name-1.png" // Replace with your image path
                        alt="Portfolio Project"
                        className="w-3/3 h-auto rounded-lg shadow-lg" // Adjusted width
                    />
                </div>
                <div className="absolute top-[80%] left-[12%] cursor-pointer" onClick={() => navigate("/portfolio/project-b")}>
                    <img
                        src="/images/project-name-2.png" // Replace with your image path
                        alt="Portfolio Project"
                        className="w-2/7 h-auto rounded-lg shadow-lg" // Adjusted width
                    />
                </div>

                <div className="absolute top-[87%] left-[12%] cursor-pointer" onClick={() => navigate("/portfolio/project-c")}>
                    <img
                        src="/images/project-name-3.png" // Replace with your image path
                        alt="Portfolio Project"
                        className="w-3/3 h-auto rounded-lg shadow-lg" // Adjusted width
                    />
                </div>

                {/* Button to navigate to Project A */}
                <div className="flex justify-center mt-8 ml-12"> {/* Adjusted margin-top and margin-left */}
                    <button
                        onClick={() => navigate("/portfolio/project-a")}
                        className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                    >
                        Know My Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioContentPage;