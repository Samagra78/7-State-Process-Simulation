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
          className={`p-4 rounded-lg text-center border-2 w-32 relative z-10 ${isActive ? 'bg-blue-600 border-blue-400 font-bold shadow-lg shadow-blue-500/50 text-white' : 'bg-gray-800 border-gray-600 text-gray-300'}`}
        >
          <div className="text-sm border-b border-gray-600 mb-2 pb-1 opacity-70">
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
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-800 shadow-md z-10 text-white">
        <h2 className="text-2xl font-bold text-blue-400">2-D Process Lifecycle</h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        >
          Back to Menu
        </button>
      </div>

      <div className="flex-1 flex flex-col p-8 items-center overflow-auto">
        <div className="w-full max-w-[1300px] bg-gray-800 rounded-xl p-8 shadow-xl flex flex-col items-center">
           
          {/* Diagram Layout */}
          <div className="relative w-[1250px] h-[750px] bg-gray-800 border-b border-gray-700 mb-8 rounded-lg">
            
            {/* SVG for lines and arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#6B7280" />
                </marker>
              </defs>
              
              {transitionsRender.map((t, idx) => (
                <g key={idx}>
                  <path 
                    d={t.path} 
                    stroke="#6B7280" 
                    strokeWidth="2" 
                    fill="none" 
                    markerEnd="url(#arrow)" 
                  />
                  <text 
                    x={t.textX} 
                    y={t.textY} 
                    fill="#9CA3AF" 
                    fontSize="12" 
                    textAnchor="middle" 
                    className="font-medium bg-gray-800"
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
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Current State: {currentState}</h3>
              <p className="text-gray-300 bg-gray-900 p-4 rounded-lg text-lg border border-gray-700">
                {currentStateInfo.info}
              </p>
            </div>

            <div>
              {currentStateInfo.available_transitions.length > 0 ? (
                <>
                  <h4 className="text-lg font-medium mb-3">Choose the next action to move the process forward:</h4>
                  <div className="flex flex-wrap gap-4">
                    {currentStateInfo.available_transitions.map((transition, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTransition(transition.target_state)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors flex items-center space-x-2 shadow-lg shadow-blue-500/20"
                      >
                        <span>{transition.action}</span>
                        <span className="text-blue-200">→ {transition.target_state}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-8 p-4 bg-green-900/40 border border-green-700 rounded-lg text-green-300 font-semibold text-center">
                  Process Execution Complete.
                  <button 
                  onClick={() => setCurrentState('New')}
                  className="mt-4 block mx-auto px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-white transition-colors"
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