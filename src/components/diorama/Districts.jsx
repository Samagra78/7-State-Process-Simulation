import { Grid, Sparkles, Box, Cylinder, MeshDistortMaterial, Html } from '@react-three/drei';
import { useState } from 'react';

function DistrictTooltip({ title, desc, position = [0, 2, 0], visible }) {
  return (
    <Html position={position} center style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}>
      <div 
        className="glass-panel text-supa-text px-4 py-2 rounded-lg border border-supa-border whitespace-nowrap min-w-[200px]"
        style={{  backgroundColor: 'rgba(28, 28, 28, 0.9)', backdropFilter: 'blur(8px)' }}
      >
        <p className="font-mono text-xs text-supa-green-light mb-1">{title}</p>
        <p className="text-sm text-supa-text-light">{desc}</p>
      </div>
    </Html>
  );
}

export function TheForge() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[-6, -1, -6]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Box args={[3, 0.5, 3]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color={hovered ? "#393939" : "#2e2e2e"} wireframe />
      </Box>
      <pointLight position={[0, 2, 0]} color="#fafafa" intensity={0.5} distance={5} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: New" desc="The Forge / Ingestion Node" position={[0, 1.5, 0]} />}
    </group>
  );
}

export function MemoryGrid() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[0, 2, -3]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Grid position={[0, -1, 0]} args={[4, 4]} cellSize={0.5} cellThickness={0.5} cellColor={hovered ? "#00c573" : "#3ecf8e"} sectionSize={2} sectionThickness={1} sectionColor="#00c573" fadeDistance={10} fadeStrength={1} />
      <pointLight position={[0, 1, 0]} color="#3ecf8e" intensity={1} distance={5} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Ready" desc="Memory Grid / RAM Buffer" position={[0, 1.5, 0]} />}
    </group>
  );
}

export function CPUCore() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[0, 0, 0]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Cylinder args={[1.5, 2, 8, 32]} position={[0, -4, 0]}>
        <meshStandardMaterial color={hovered ? "#242424" : "#171717"} roughness={0.1} metalness={0.9} />
      </Cylinder>
      <Cylinder args={[1.8, 1.8, 0.2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00c573" emissive="#00c573" emissiveIntensity={0.5} />
      </Cylinder>
      <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#00c573" />
      <pointLight position={[0, 2, 0]} color="#00c573" intensity={2} distance={10} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Running" desc="CPU Core / The Monolith" position={[0, 3, 0]} />}
    </group>
  );
}

export function IODocks() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[6, -1, 3]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Box args={[4, 0.5, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color={hovered ? "#363636" : "#242424"} />
      </Box>
      <Box args={[0.2, 2, 0.2]} position={[-1.8, 1, -1.8]}>
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1} />
      </Box>
      <Box args={[0.2, 2, 0.2]} position={[1.8, 1, 1.8]}>
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1} />
      </Box>
      <pointLight position={[0, 2, 0]} color="#eab308" intensity={1.5} distance={6} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Blocked" desc="I/O Docks / Waiting" position={[0, 2.5, 0]} />}
    </group>
  );
}

export function ColdStorage() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[-3, -5, 5]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Box args={[4, 1, 4]}>
        <MeshDistortMaterial color="#60a5fa" transparent opacity={hovered ? 0.5 : 0.3} distort={0.2} speed={1} />
      </Box>
      <pointLight position={[0, 1, 0]} color="#60a5fa" intensity={1} distance={5} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Suspended Ready" desc="Cold Storage / Disk Swap" position={[0, 1.5, 0]} />}
    </group>
  );
}

export function Quarantine() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[3, -5, 6]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Box args={[3, 2, 3]}>
        <meshStandardMaterial color={hovered ? "#2e2e2e" : "#1c1c1c"} transparent opacity={0.8} />
      </Box>
      <Grid position={[0, 1, 0]} args={[3, 3]} cellSize={0.2} cellThickness={1} cellColor="#a855f7" sectionSize={0} fadeDistance={4} />
      <pointLight position={[0, 0, 0]} color="#a855f7" intensity={2} distance={4} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Suspended Blocked" desc="The Quarantine / Deep Wait" position={[0, 2.5, 0]} />}
    </group>
  );
}

export function Archive() {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={[0, 5, 0]}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <Cylinder args={[2, 0.5, 2, 16]} position={[0, 1, 0]}>
        <meshStandardMaterial color={hovered ? "#363636" : "#171717"} wireframe />
      </Cylinder>
      <Sparkles count={100} scale={3} size={1} speed={1} opacity={0.2} color="#a1a1aa" position={[0, 2, 0]} />
      {hovered && <DistrictTooltip visible={hovered} title="STATE: Exit" desc="The Archive / Dissolution" position={[0, 3, 0]} />}
    </group>
  );
}
