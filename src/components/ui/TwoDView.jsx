import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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
  "New": { x: 150, y: 50, memory: "Sec. Memory" },
  "Ready": { x: 450, y: 50, memory: "Main Memory" },
  "Running": { x: 850, y: 50, memory: "Main Memory" },
  "Blocked": { x: 650, y: 270, memory: "Main Memory" },
  "Exit": { x: 1100, y: 50, memory: "None" },
  "Suspended Ready": { x: 450, y: 500, memory: "Sec. Memory" },
  "Suspended Blocked": { x: 650, y: 500, memory: "Sec. Memory" },
};

const transitionsRender = [
  { from: 'New', to: 'Ready', action: 'Admit', path: 'M 214 60 L 376 60', textX: 295, textY: 40 },
  { from: 'Ready', to: 'Running', action: 'Dispatch', path: 'M 514 40 L 776 40', textX: 645, textY: 20 },
  { from: 'Running', to: 'Ready', action: 'Timeout', path: 'M 776 80 L 514 80', textX: 645, textY: 108 },
  { from: 'Running', to: 'Blocked', action: 'Event wait', path: 'M 820 100 L 700 240', textX: 770, textY: 160 },
  { from: 'Running', to: 'Exit', action: 'Release', path: 'M 914 60 L 1026 60', textX: 970, textY: 40 },
  { from: 'Blocked', to: 'Ready', action: 'Event occur', path: 'M 600 240 L 500 100', textX: 530, textY: 160 },
  { from: 'Blocked', to: 'Suspended Blocked', action: 'Suspend', path: 'M 670 320 L 670 460', textX: 720, textY: 380 },
  { from: 'Suspended Blocked', to: 'Blocked', action: 'Activate', path: 'M 630 460 L 630 320', textX: 580, textY: 380 },
  { from: 'Suspended Blocked', to: 'Suspended Ready', action: 'Event occur', path: 'M 586 510 L 524 510', textX: 555, textY: 450 },
  { from: 'Suspended Ready', to: 'Ready', action: 'Activate', path: 'M 430 460 L 430 100', textX: 380, textY: 270 },
  { from: 'Ready', to: 'Suspended Ready', action: 'Suspend', path: 'M 470 100 L 470 460', textX: 520, textY: 270 },
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
        {isActive && (
           <div className="absolute -inset-1 rounded-lg border border-supa-green-border bg-[rgba(62,207,142,0.05)] animate-pulse z-0 pointer-events-none"></div>
        )}
        <div 
          className={`p-4 rounded-lg text-center backdrop-blur-md transition-all duration-300 w-32 relative z-10 
            ${isActive 
              ? 'bg-supa-bg border border-supa-green text-supa-text font-medium' 
              : 'bg-[#1c1c1cd0] border border-supa-border text-supa-text-muted hover:border-supa-border-light'}`}
        >
          <div className={`mono-label border-b pb-1 mb-2 ${isActive ? 'border-supa-green-border text-supa-green-light' : 'border-supa-border'}`}>
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
    <div className="flex flex-col h-screen w-screen bg-supa-bg text-supa-text relative overflow-hidden font-sans">

      {/* Header */}
      <div className="p-4 px-6 flex justify-between items-center bg-supa-bg border-b border-supa-border z-10">
        <h2 className="text-xl font-medium tracking-tight text-supa-text flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-supa-green shadow-[0_0_8px_rgba(62,207,142,0.6)]"></div>
          2-D Process Lifecycle
        </h2>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-1.5 bg-transparent border border-supa-border hover:border-supa-border-light text-supa-text rounded-full transition-all text-sm font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </button>
      </div>

      <div className="flex-1 flex flex-col p-8 items-center overflow-auto relative z-10 w-full">
        <div className="w-full max-w-[1300px] flex flex-col items-center">
           
          {/* Diagram Layout */}
          <div className="relative w-[1250px] h-[570px] mb-8 overflow-hidden">
            
            {/* SVG for lines and arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L6,3 z" fill="#363636" />
                </marker>
              </defs>
              
              {transitionsRender.map((t, idx) => (
                <g key={idx}>
                  <path 
                    d={t.path} 
                    stroke="#363636" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 4"
                    markerEnd="url(#arrow)" 
                  />
                  <rect 
                    x={t.textX - 45} 
                    y={t.textY - 14} 
                    width="90" 
                    height="20" 
                    fill="#171717" 
                    rx="4" 
                    stroke="#2e2e2e"
                  />
                  <text 
                    x={t.textX} 
                    y={t.textY} 
                    fill="#b4b4b4" 
                    fontSize="10" 
                    textAnchor="middle" 
                    fontFamily='"Source Code Pro", monospace'
                    letterSpacing="1px"
                    textTransform="uppercase"
                  >
                    {t.action}
                  </text>
                </g>
              ))}
            </svg>

            {/* State Nodes */}
            {Object.keys(nodes).map(renderStateBox)}
          </div>
          
          {/* Telemetry and Action Controls */}
          <div className="w-full flex gap-6 max-w-5xl self-center">
            <div className="flex-1 glass-panel p-6 border border-supa-border">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="mono-label text-supa-green-light">CURRENT STATE:</h3>
                <span className="text-sm font-bold text-supa-text uppercase tracking-widest">{currentState}</span>
              </div>
              <p className="text-supa-text-muted text-sm leading-relaxed">
                {currentStateInfo.info}
              </p>
            </div>

            <div className="flex-[2] glass-panel p-6 border border-supa-border">
              {currentStateInfo.available_transitions.length > 0 ? (
                <>
                  <h4 className="mono-label mb-4 pb-2 text-supa-text-muted tracking-[1px]">Dispatch System Action</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentStateInfo.available_transitions.map((transition, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTransition(transition.target_state)}
                        className="px-5 py-2.5 bg-supa-bg hover:bg-[#1c1c1c] border border-supa-border hover:border-supa-border-light rounded-md text-sm font-medium transition-all flex items-center space-x-2 text-supa-text cursor-pointer"
                      >
                        <span>{transition.action}</span>
                        <span className="text-supa-text-muted font-mono text-xs ml-1">→ {transition.target_state}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center py-2">
                  <p className="text-supa-text-muted text-sm font-medium mb-4">Process Execution Complete.</p>
                  <button 
                    onClick={() => setCurrentState('New')}
                    className="btn-secondary rounded-md"
                  >
                   Restart Simulation
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