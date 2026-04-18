import { Grid, Sparkles, Box, Cylinder, MeshDistortMaterial } from '@react-three/drei';

export function TheForge() {
  return (
    <group position={[-6, -1, -6]}>
      <Box args={[3, 0.5, 3]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#2e2e2e" wireframe />
      </Box>
      <pointLight position={[0, 2, 0]} color="#fafafa" intensity={0.5} distance={5} />
    </group>
  );
}

export function MemoryGrid() {
  return (
    <group position={[0, 2, -3]}>
      <Grid position={[0, -1, 0]} args={[4, 4]} cellSize={0.5} cellThickness={0.5} cellColor="#3ecf8e" sectionSize={2} sectionThickness={1} sectionColor="#00c573" fadeDistance={10} fadeStrength={1} />
      <pointLight position={[0, 1, 0]} color="#3ecf8e" intensity={1} distance={5} />
    </group>
  );
}

export function CPUCore() {
  return (
    <group position={[0, 0, 0]}>
      <Cylinder args={[1.5, 2, 8, 32]} position={[0, -4, 0]}>
        <meshStandardMaterial color="#171717" roughness={0.1} metalness={0.9} />
      </Cylinder>
      <Cylinder args={[1.8, 1.8, 0.2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00c573" emissive="#00c573" emissiveIntensity={0.5} />
      </Cylinder>
      <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#00c573" />
      <pointLight position={[0, 2, 0]} color="#00c573" intensity={2} distance={10} />
    </group>
  );
}

export function IODocks() {
  return (
    <group position={[6, -1, 3]}>
      <Box args={[4, 0.5, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#242424" />
      </Box>
      {/* Amber warning lights */}
      <Box args={[0.2, 2, 0.2]} position={[-1.8, 1, -1.8]}>
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1} />
      </Box>
      <Box args={[0.2, 2, 0.2]} position={[1.8, 1, 1.8]}>
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1} />
      </Box>
      <pointLight position={[0, 2, 0]} color="#eab308" intensity={1.5} distance={6} />
    </group>
  );
}

export function ColdStorage() {
  return (
    <group position={[-3, -5, 5]}>
      <Box args={[4, 1, 4]}>
        <MeshDistortMaterial color="#60a5fa" transparent opacity={0.3} distort={0.2} speed={1} />
      </Box>
      <pointLight position={[0, 1, 0]} color="#60a5fa" intensity={1} distance={5} />
    </group>
  );
}

export function Quarantine() {
  return (
    <group position={[3, -5, 6]}>
      <Box args={[3, 2, 3]}>
        <meshStandardMaterial color="#1c1c1c" transparent opacity={0.8} />
      </Box>
      {/* Laser barriers */}
      <Grid position={[0, 1, 0]} args={[3, 3]} cellSize={0.2} cellThickness={1} cellColor="#a855f7" sectionSize={0} fadeDistance={4} />
      <pointLight position={[0, 0, 0]} color="#a855f7" intensity={2} distance={4} />
    </group>
  );
}

export function Archive() {
  return (
    <group position={[0, 5, 0]}>
      <Cylinder args={[2, 0.5, 2, 16]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#171717" wireframe />
      </Cylinder>
      <Sparkles count={100} scale={3} size={1} speed={1} opacity={0.2} color="#a1a1aa" position={[0, 2, 0]} />
    </group>
  );
}
