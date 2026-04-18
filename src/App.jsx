import Scene from './components/diorama/Scene';
import LayoutOverlay from './components/ui/LayoutOverlay';

function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-supa-bg">
      <Scene />
      <LayoutOverlay />
    </main>
  );
}

export default App;
