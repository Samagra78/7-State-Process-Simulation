import React from 'react';

const LandingScreen = ({ onSelectView }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-supa-bg text-supa-text relative overflow-hidden font-sans">

      <div className="flex flex-col items-center z-10 w-full max-w-4xl px-6">
        <p className="mono-label tracking-[1.2px] text-supa-text-muted mb-4 uppercase">
          Interactive Architecture
        </p>

        <h1 className="text-6xl sm:text-7xl font-sans tracking-tight leading-none mb-10 text-center text-supa-text">
          Simulate <span className="text-supa-green-light font-medium">Process Lifecycle</span>
        </h1>

        <p className="text-supa-text-muted tracking-tight text-lg mb-12 text-center max-w-2xl leading-relaxed">
          Explore the 7-state OS transition model through interactive telemetry mapping. Choose between a sequential 2D flowchart or an isometric 3D WebGL diorama.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 w-full sm:w-auto mt-4">
          <button
            onClick={() => onSelectView('3d')}
            className="w-full sm:w-auto btn-secondary cursor-pointer hover:bg-supa-green hover:text-[#171717] hover:border-supa-green hover:shadow-[0_0_20px_rgba(62,207,142,0.4)] transition-all duration-300"
          >
            Launch 3D Engine
          </button>

          <button
            onClick={() => onSelectView('2d')}
            className="w-full sm:w-auto btn-secondary cursor-pointer hover:bg-supa-green hover:text-[#171717] hover:border-supa-green hover:shadow-[0_0_20px_rgba(62,207,142,0.4)] transition-all duration-300"
          >
            Launch 2D Flowchart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;