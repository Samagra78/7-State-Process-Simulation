import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 px-4 py-2 bg-supa-bg/80 backdrop-blur-md border border-supa-border hover:border-supa-border-light text-supa-text rounded-full transition-all text-sm font-medium cursor-pointer shadow-lg"
        >
          <ArrowLeft size={16} />
          <span className='text-sm font-semibold text-supa-text'>Back to Menu</span>
        </button>
      </div>
      <LayoutOverlay />
    </main>
  );
}

export default App;
