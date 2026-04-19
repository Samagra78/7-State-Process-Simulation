import React, { useState } from 'react';

const stateMachineLogic = {
  "New": {
    info: "The process is being created and is currently residing in Secondary Memory.",
    available_transitions: [{ action: "Admit", target_state: "Ready" }]
  },
  "Ready": {
    info: "The process is in Main Memory, waiting to be assigned to a processor.",
    available_transitions: [
      { action: "Dispatch", target_state: "Running" },
      { action: "Suspend", target_state: "Suspended Ready" }
    ]
  },
  "Running": {
    info: "Instructions are being executed by the CPU. The process is in Main Memory.",
    available_transitions: [
      { action: "Timeout", target_state: "Ready" },
      { action: "Event wait", target_state: "Blocked" },
      { action: "Release", target_state: "Exit" }
    ]
  },
  "Blocked": {
    info: "The process is in Main Memory but is waiting for some event to occur (like I/O completion).",
    available_transitions: [
      { action: "Event occur", target_state: "Ready" },
      { action: "Suspend", target_state: "Suspended Blocked" }
    ]
  },
  "Suspended Blocked": {
    info: "The process is blocked and has been swapped out to Secondary Memory to free up Main Memory.",
    available_transitions: [
      { action: "Activate", target_state: "Blocked" },
      { action: "Event occur", target_state: "Suspended Ready" }
    ]
  },
  "Suspended Ready": {
    info: "The process is ready to execute but is currently swapped out to Secondary Memory.",
    available_transitions: [
      { action: "Activate", target_state: "Ready" }
    ]
  },
  "Exit": {
    info: "The process has finished execution and its resources are released.",
    available_transitions: []
  }
};

const nodes = {
  "New": { x: 150, y: 200, memory: "Sec. Memory" },
  "Ready": { x: 450, y: 200, memory: "Main Memory" },
  "Running": { x: 850, y: 200, memory: "Main Memory" },
  "Blocked": { x: 650, y: 420, memory: "Main Memory" },
  "Exit": { x: 1100, y: 200, memory: "None" },
  "Suspended Ready": { x: 450, y: 650, memory: "Sec. Memory" },
  "Suspended Blocked": { x: 650, y: 650, memory: "Sec. Memory" },
};

const transitionsRender = [
  { from: 'New', to: 'Ready', action: 'Admit', path: 'M 214 200 L 376 200', textX: 295, textY: 190 },
  { from: 'Ready', to: 'Running', action: 'Dispatch', path: 'M 514 180 L 776 180', textX: 645, textY: 170 },
  { from: 'Running', to: 'Ready', action: 'Timeout', path: 'M 776 220 L 514 220', textX: 645, textY: 235 },
  { from: 'Running', to: 'Blocked', action: 'Event wait', path: 'M 820 240 L 700 380', textX: 770, textY: 310 },
  { from: 'Running', to: 'Exit', action: 'Release', path: 'M 914 200 L 1026 200', textX: 970, textY: 190 },
  { from: 'Blocked', to: 'Ready', action: 'Event occur', path: 'M 600 380 L 500 240', textX: 530, textY: 310 },
  { from: 'Blocked', to: 'Suspended Blocked', action: 'Suspend', path: 'M 670 460 L 670 600', textX: 720, textY: 530 },
  { from: 'Suspended Blocked', to: 'Blocked', action: 'Activate', path: 'M 630 600 L 630 460', textX: 580, textY: 530 },
  { from: 'Suspended Blocked', to: 'Suspended Ready', action: 'Event occur', path: 'M 586 650 L 524 650', textX: 555, textY: 640 },
  { from: 'Suspended Ready', to: 'Ready', action: 'Activate', path: 'M 430 600 L 430 240', textX: 380, textY: 420 },
  { from: 'Ready', to: 'Suspended Ready', action: 'Suspend', path: 'M 470 240 L 470 600', textX: 520, textY: 420 },
];

const TwoDView = ({ onBack }) => {
  const [currentState, setCurrentState] = useState('New');

  const handleTransition = (targetState) => {
    setCurrentState(targetState);
  };

  const renderStateBox = (stateName) => {
    const isActive = currentState === stateName;
    const node = nodes[stateName];
    
    // Center the 128px (w-32) x ~80px box around node.x and node.y
    const style = {
      position: 'absolute',
      left: `${node.x - 64}px`,
      top: `${node.y - 40}px`,
    };

    return (
      <div className="relative" style={style} key={stateName}>
        <div 
          className={`p-4 rounded-lg text-center backdrop-blur-[20px] transition-all duration-300 w-32 relative z-10 
            ${isActive 
              ? 'bg-cyan-500/20 border border-cyan-300/30 text-cyan-50 font-bold shadow-[0_8px_32px_0_rgba(6,182,212,0.27)]' 
              : 'bg-white/5 border border-white/20 text-gray-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.27)] hover:bg-white/10'}`}
        >
          <div className="text-sm border-b border-white/20 mb-2 pb-1 opacity-80">
            {node.memory}
          </div>
          {stateName}
        </div>
      </div>
    );
  };

  const currentStateInfo = stateMachineLogic[currentState];
  const pointerNode = nodes[currentState];

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white relative overflow-hidden">
      
      {/* Decorative background blobs to enhance glass refraction */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-700/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-700/30 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-white/5 backdrop-blur-[20px] shadow-lg border-b border-white/10 z-10 text-white relative">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
          2-D Process Lifecycle
        </h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded backdrop-blur-[10px] transition-colors"
        >
          Back to Menu
        </button>
      </div>

      <div className="flex-1 flex flex-col p-8 items-center overflow-auto relative z-10">
        <div className="w-full max-w-[1300px] bg-white/5 backdrop-blur-[20px] rounded-xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center">
           
          {/* Diagram Layout */}
          <div className="relative w-[1250px] h-[750px] mb-8 rounded-lg overflow-hidden">
            
            {/* SVG for lines and arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#9CA3AF" />
                </marker>
              </defs>
              
              {transitionsRender.map((t, idx) => (
                <g key={idx}>
                  <path 
                    d={t.path} 
                    stroke="#9CA3AF" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="4 2"
                    markerEnd="url(#arrow)" 
                  />
                  <rect 
                    x={t.textX - 45} 
                    y={t.textY - 10} 
                    width="90" 
                    height="20" 
                    fill="rgba(0, 0, 0, 0.4)" 
                    rx="4" 
                  />
                  <text 
                    x={t.textX} 
                    y={t.textY + 4} 
                    fill="#D1D5DB" 
                    fontSize="12" 
                    textAnchor="middle" 
                    className="font-medium"
                  >
                    {t.action}
                  </text>
                </g>
              ))}
            </svg>

            {/* Active State Pointer (Animated) */}
            <div 
              className="absolute z-20 transition-all duration-500 ease-in-out transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${pointerNode.x}px`, top: `${pointerNode.y - 80}px` }}
            >
              <div className="absolute top-0 flex flex-col items-center animate-bounce">
                <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)] border-2 border-yellow-200"></div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-400 mt-1"></div>
              </div>
            </div>

            {/* State Nodes */}
            {Object.keys(nodes).map(renderStateBox)}
          </div>
          
          <div className="w-full">
            <div className="mb-6 bg-white/5 backdrop-blur-[10px] p-6 rounded-xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">Current State: {currentState}</h3>
              <p className="text-gray-200 text-lg">
                {currentStateInfo.info}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-[10px] p-6 rounded-xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]">
              {currentStateInfo.available_transitions.length > 0 ? (
                <>
                  <h4 className="text-lg font-medium mb-4 text-orange-200">Choose the next action to move the process forward:</h4>
                  <div className="flex flex-wrap gap-4">
                    {currentStateInfo.available_transitions.map((transition, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTransition(transition.target_state)}
                        className="px-6 py-3 bg-cyan-600/30 hover:bg-cyan-500/50 border border-cyan-400/50 rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-[0_4px_15px_0_rgba(6,182,212,0.2)] text-cyan-50 backdrop-blur-[5px]"
                      >
                        <span>{transition.action}</span>
                        <span className="text-cyan-200 opacity-70">→ {transition.target_state}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-900/30 border border-green-500/50 backdrop-blur-[10px] rounded-lg text-green-300 font-semibold text-center shadow-[0_4px_15px_0_rgba(34,197,94,0.1)]">
                  Process Execution Complete.
                  <button 
                  onClick={() => setCurrentState('New')}
                  className="mt-4 block mx-auto px-6 py-2 bg-green-600/40 hover:bg-green-500/60 border border-green-400/50 rounded-lg text-white transition-all backdrop-blur-[5px]"
                  >
                   Restart Process
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TwoDView;