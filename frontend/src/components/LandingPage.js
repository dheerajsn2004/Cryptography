import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [teamName, setTeamName] = useState('');

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teams/add', { name: teamName });
      alert(`Team ${response.data.name} added successfully!`);
      setTeamName('');
    } catch (error) {
      alert('Error adding team');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-8">
        <img src="" alt="Logo" className="h-20 w-20" />
      </div>
      <h1 className="text-5xl font-bold mb-8">Welcome to Our Website</h1>
      {/* Team Name Input */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <input
          type="text"
          value={teamName}
          onChange={handleInputChange}
          placeholder="Enter Team Name"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Play
        </button>
      </form>
    </div>
  );
};

export default LandingPage;