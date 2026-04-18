import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Environment } from '@react-three/drei';
import ProcessCore from './ProcessCore';
import { 
  TheForge, 
  MemoryGrid, 
  CPUCore, 
  IODocks, 
  ColdStorage, 
  Quarantine, 
  Archive 
} from './Districts';

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-supa-bg">
      <Canvas>
        <color attach="background" args={['#0f0f0f']} />
        
        <OrthographicCamera 
          makeDefault 
          position={[20, 20, 20]} 
          zoom={40} 
          near={-100} 
          far={100} 
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 4}
        />
        
        <ambientLight intensity={0.2} color="#ffffff" />
        <Environment preset="city" />

        {/* Global base grid */}
        <gridHelper args={[40, 40, '#242424', '#1c1c1c']} position={[0, -6, 0]} />

        <group position={[0, -2, 0]}>
          {/* The Process */}
          <ProcessCore />

          {/* The 7 Districts */}
          <TheForge />
          <MemoryGrid />
          <CPUCore />
          <IODocks />
          <ColdStorage />
          <Quarantine />
          <Archive />
        </group>
      </Canvas>
    </div>
  );
}
