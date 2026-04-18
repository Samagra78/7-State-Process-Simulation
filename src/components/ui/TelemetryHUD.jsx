import { useProcessStore } from '../../store/useProcessStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function TelemetryHUD() {
  const { currentState, history, simulationTime } = useProcessStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="absolute top-6 right-6 w-80 glass-panel p-6 flex flex-col gap-4 z-10 text-supa-text">
      <div>
        <h2 className="text-xl font-medium mb-1 truncate">Telemetry</h2>
        <p className="text-xs text-supa-text-muted mono-label">System Memory Core 0x{simulationTime.toString(16).padStart(4, '0').toUpperCase()}</p>
      </div>
      
      <div className="h-px w-full bg-supa-border-light my-2"></div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-supa-text-light">Current State</span>
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={currentState}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mono-label font-bold text-supa-green-light"
            >
              {currentState}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-supa-text-light">Execution Ticks</span>
          <span className="font-mono text-sm">{simulationTime}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-supa-text-light">PID</span>
          <span className="font-mono text-sm">98942</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-supa-border">
        <p className="text-xs text-supa-text-muted mb-2">Transition History</p>
        <div className="h-32 overflow-y-auto flex flex-col pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#363636 transparent' }}>
          <div className="flex flex-col gap-1 w-full relative">
            {history.map((state, index) => (
              <motion.div 
                key={`${state}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono text-supa-text-light border-l border-supa-border-light pl-2 py-0.5"
              >
                &gt; {state}
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
