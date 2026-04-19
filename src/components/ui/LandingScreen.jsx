import React from 'react';

const LandingScreen = ({ onSelectView }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle ambient blobs to match the 2-D view theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-700/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-700/20 rounded-full blur-[100px] pointer-events-none"></div>

      <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent relative z-10">
        7-State Process Simulation
      </h1>
      
      <div className="flex space-x-8 relative z-10">
        <button
          onClick={() => onSelectView('2d')}
          className="px-10 py-5 bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-400/50 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-sm text-white"
        >
          2-D View
        </button>
        <button
          onClick={() => onSelectView('3d')}
          className="px-10 py-5 bg-orange-600/80 hover:bg-orange-500 border border-orange-400/50 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(249,115,22,0.4)] backdrop-blur-sm text-white"
        >
          3-D View
        </button>
      </div>
    </div>
  );
};

export default LandingScreen;