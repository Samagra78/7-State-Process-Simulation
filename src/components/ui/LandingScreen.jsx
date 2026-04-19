import React from 'react';

const LandingScreen = ({ onSelectView }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">7-State Process Simulation</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => onSelectView('2d')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-xl font-semibold transition-colors shadow-lg shadow-blue-500/30"
        >
          2-D View
        </button>
        <button
          onClick={() => onSelectView('3d')}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-xl font-semibold transition-colors shadow-lg shadow-purple-500/30"
        >
          3-D View
        </button>
      </div>
    </div>
  );
};

export default LandingScreen;