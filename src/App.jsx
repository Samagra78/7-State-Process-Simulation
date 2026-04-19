import React, { useState } from 'react';
import Scene from './components/diorama/Scene';
import LayoutOverlay from './components/ui/LayoutOverlay';
import LandingScreen from './components/ui/LandingScreen';
import TwoDView from './components/ui/TwoDView';

function App() {
  const [view, setView] = useState('landing'); // 'landing', '2d', '3d'

  if (view === 'landing') {
    return <LandingScreen onSelectView={setView} />;
  }

  if (view === '2d') {
    return <TwoDView onBack={() => setView('landing')} />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-supa-bg">
      <Scene />
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => setView('landing')}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition shadow cursor-pointer border border-gray-600 font-semibold text-sm"
        >
          ← Back to Menu
        </button>
      </div>
      <LayoutOverlay />
    </main>
  );
}

export default App;
