import { create } from 'zustand';

export const STATES = {
  NEW: 'New',
  READY: 'Ready',
  RUNNING: 'Running',
  BLOCKED: 'Blocked',
  SUSPEND_READY: 'Suspended Ready',
  SUSPEND_BLOCKED: 'Suspended Blocked',
  TERMINATED: 'Exit'
};

const VALID_TRANSITIONS = {
  [STATES.NEW]: [STATES.READY],
  [STATES.READY]: [STATES.RUNNING, STATES.SUSPEND_READY],
  [STATES.RUNNING]: [STATES.READY, STATES.BLOCKED, STATES.TERMINATED],
  [STATES.BLOCKED]: [STATES.READY, STATES.SUSPEND_BLOCKED],
  [STATES.SUSPEND_READY]: [STATES.READY],
  [STATES.SUSPEND_BLOCKED]: [STATES.BLOCKED, STATES.SUSPEND_READY],
  [STATES.TERMINATED]: [] // Terminal state, no transitions out
};

export const useProcessStore = create((set, get) => ({
  currentState: STATES.NEW,
  history: [STATES.NEW],
  simulationTime: 0,
  
  // Transition function
  transitionTo: (newState) => {
    const { currentState, history } = get();
    
    // Check if transition is valid
    if (VALID_TRANSITIONS[currentState].includes(newState)) {
      set({ 
        currentState: newState,
        history: [...history, newState],
        simulationTime: get().simulationTime + 1
      });
      return true;
    }
    
    console.warn(`Invalid transition attempted: ${currentState} -> ${newState}`);
    return false;
  },
  
  // Explicit actions for the sidebar buttons
  dispatch: () => get().transitionTo(STATES.READY), // New -> Ready || SuspendReady -> Ready (Swap In)
  schedule: () => get().transitionTo(STATES.RUNNING), // Ready -> Running
  preempt: () => get().transitionTo(STATES.READY), // Running -> Ready (Timeout)
  requestIO: () => get().transitionTo(STATES.BLOCKED), // Running -> Blocked
  ioComplete: () => {
    // Both Blocked and SuspendBlocked can receive I/O completion
    if (get().currentState === STATES.BLOCKED) return get().transitionTo(STATES.READY);
    if (get().currentState === STATES.SUSPEND_BLOCKED) return get().transitionTo(STATES.SUSPEND_READY);
    return false;
  },
  swapOut: () => {
    if (get().currentState === STATES.READY) return get().transitionTo(STATES.SUSPEND_READY);
    if (get().currentState === STATES.BLOCKED) return get().transitionTo(STATES.SUSPEND_BLOCKED);
    return false;
  },
  swapIn: () => {
    if (get().currentState === STATES.SUSPEND_READY) return get().transitionTo(STATES.READY);
    if (get().currentState === STATES.SUSPEND_BLOCKED) return get().transitionTo(STATES.BLOCKED);
    return false;
  },
  terminate: () => get().transitionTo(STATES.TERMINATED),
  
  // Reset the process cycle
  resetProcess: () => set({ currentState: STATES.NEW, history: [STATES.NEW], simulationTime: 0 })
}));
