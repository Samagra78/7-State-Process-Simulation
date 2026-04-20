import { useProcessStore, STATES } from '../../store/useProcessStore';
import { Play, Pause, ChevronRight, HardDriveDownload, HardDriveUpload, Disc, PowerOff } from 'lucide-react';

export default function SidebarControls() {
  const { 
    currentState, 
    dispatch, 
    schedule, 
    preempt, 
    requestIO, 
    ioComplete, 
    swapOut, 
    swapIn,
    terminate,
    resetProcess
  } = useProcessStore();

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-80 glass-panel p-6 flex flex-col gap-6 z-10 text-supa-text">
      <div>
        <h2 className="text-xl font-medium mb-1 truncate">Process Control</h2>
        <p className="text-xs text-supa-text-muted mono-label">System Interrupts</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* NEW to READY */}
        <button 
          onClick={dispatch}
          disabled={currentState !== STATES.NEW}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            currentState === STATES.NEW 
              ? 'bg-supa-bg border-supa-green-border text-supa-green-light hover:bg-supa-bg-dark' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Admit</span>
          <ChevronRight size={16} />
        </button>

        {/* READY to RUNNING */}
        <button 
          onClick={schedule}
          disabled={currentState !== STATES.READY}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            currentState === STATES.READY 
              ? 'bg-supa-bg border-supa-green-border text-supa-green hover:bg-supa-bg-dark' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Dispatch</span>
          <Play size={16} />
        </button>

        {/* RUNNING to READY */}
        <button 
          onClick={preempt}
          disabled={currentState !== STATES.RUNNING}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            currentState === STATES.RUNNING 
              ? 'bg-supa-bg border-supa-border text-supa-text hover:border-supa-border-light' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Timeout</span>
          <Pause size={16} />
        </button>

        {/* RUNNING to BLOCKED */}
        <button 
          onClick={requestIO}
          disabled={currentState !== STATES.RUNNING}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            currentState === STATES.RUNNING 
              ? 'bg-[#eab308]/10 border-[#eab308]/30 text-[#eab308] hover:bg-[#eab308]/20' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Event wait</span>
          <Disc size={16} />
        </button>

        {/* BLOCKED / SUSPEND_BLOCKED to READY / SUSPEND_READY */}
        <button 
          onClick={ioComplete}
          disabled={currentState !== STATES.BLOCKED && currentState !== STATES.SUSPEND_BLOCKED}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            (currentState === STATES.BLOCKED || currentState === STATES.SUSPEND_BLOCKED)
              ? 'bg-supa-bg border-supa-border text-supa-text hover:border-supa-border-light' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Event occur</span>
          <ChevronRight size={16} />
        </button>

        {/* Swap Out */}
        <button 
          onClick={swapOut}
          disabled={currentState !== STATES.READY && currentState !== STATES.BLOCKED}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            (currentState === STATES.READY || currentState === STATES.BLOCKED)
              ? 'bg-[#60a5fa]/10 border-[#60a5fa]/30 text-[#60a5fa] hover:bg-[#60a5fa]/20' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Suspend</span>
          <HardDriveUpload size={16} />
        </button>

        {/* Swap In */}
        <button 
          onClick={swapIn}
          disabled={currentState !== STATES.SUSPEND_READY && currentState !== STATES.SUSPEND_BLOCKED}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            (currentState === STATES.SUSPEND_READY || currentState === STATES.SUSPEND_BLOCKED)
              ? 'bg-supa-bg border-supa-green-border text-supa-green-light hover:bg-supa-bg-dark' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Activate</span>
          <HardDriveDownload size={16} />
        </button>

        {/* Terminate */}
        <button 
          onClick={terminate}
          disabled={currentState !== STATES.RUNNING}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
            currentState === STATES.RUNNING 
              ? 'bg-supa-bg border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10' 
              : 'border-supa-border-subtle opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-medium">Release</span>
          <PowerOff size={16} />
        </button>
      </div>

      {currentState === STATES.TERMINATED && (
        <button 
          onClick={resetProcess}
          className="btn-primary w-full mt-2"
        >
          Restart Simulation
        </button>
      )}
    </div>
  );
}
