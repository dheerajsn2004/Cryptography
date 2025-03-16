import React from 'react';

const ThankYouPage = () => {
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
                <div className="text-lg font-semibold">{"CryptoQuest"}</div>
                <div className="w-16 h-16">
                    <img src="/images/wie-logo.jpg" alt="WIE" className="w-full h-full object-contain" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-2xl w-full p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Thank You for Attending the Event!</h2>
                    <p className="text-gray-600">We appreciate your participation.</p>
                </div>
            </main>
        </div>
    );
};

export default ThankYouPage;