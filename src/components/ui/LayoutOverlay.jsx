import SidebarControls from './SidebarControls';
import TelemetryHUD from './TelemetryHUD';

export default function LayoutOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-10 p-6 flex justify-between">
      {/* Enable pointer events on children */}
      <div className="pointer-events-auto">
        <SidebarControls />
        <TelemetryHUD />
      </div>
      {/* Logo/Branding on the bottom left overlaying the canvas */}
      {/* <div className="absolute bottom-6 left-6 text-supa-text z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-supa-green shadow-[0_0_10px_rgba(62,207,142,0.5)] flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-supa-bg"></div>
          </div>
          <span className="font-medium text-lg tracking-tight">Silicon Metropolis</span>
        </div>
        <p className="text-supa-text-muted text-xs mono-label mt-1">7-State Process Architecture</p>
      </div> */}
    </div>
  );
}
