import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3, Color } from 'three';
import { useProcessStore, STATES } from '../../store/useProcessStore';
import { Icosahedron, Trail, Float } from '@react-three/drei';

const STATE_CONFIG = {
  [STATES.NEW]: { pos: new Vector3(-6, 0, -6), color: '#fafafa', speed: 1, scale: 0.5, wireframe: true },
  [STATES.READY]: { pos: new Vector3(0, 3, -3), color: '#3ecf8e', speed: 2, scale: 0.8, wireframe: false },
  [STATES.RUNNING]: { pos: new Vector3(0, 0, 0), color: '#00c573', speed: 15, scale: 1.2, wireframe: false },
  [STATES.BLOCKED]: { pos: new Vector3(6, 0, 3), color: '#eab308', speed: 0.5, scale: 0.9, wireframe: false },
  [STATES.SUSPEND_READY]: { pos: new Vector3(-3, -4, 5), color: '#60a5fa', speed: 0.1, scale: 0.7, wireframe: false, opacity: 0.6 },
  [STATES.SUSPEND_BLOCKED]: { pos: new Vector3(3, -4, 6), color: '#a855f7', speed: 0.05, scale: 0.7, wireframe: false, opacity: 0.4 },
  [STATES.TERMINATED]: { pos: new Vector3(0, 6, 0), color: '#a1a1aa', speed: 0, scale: 0.1, wireframe: true, opacity: 0 }
};

export default function ProcessCore() {
  const currentState = useProcessStore((state) => state.currentState);
  const groupRef = useRef();
  const meshRef = useRef();
  const materialRef = useRef();

  const targetColor = new Color();

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current || !materialRef.current) return;

    const config = STATE_CONFIG[currentState];

    // Lerp Position on root group
    groupRef.current.position.lerp(config.pos, delta * 3);
    groupRef.current.scale.lerp(new Vector3(config.scale, config.scale, config.scale), delta * 4);

    // Rotation Speed on inner mesh to avoid conflicting with Float
    meshRef.current.rotation.x += delta * config.speed;
    meshRef.current.rotation.y += delta * config.speed;

    // Lerp Color
    targetColor.set(config.color);
    materialRef.current.color.lerp(targetColor, delta * 5);
    
    // Lerp Opacity for suspended states
    const targetOpacity = config.opacity !== undefined ? config.opacity : 1;
    materialRef.current.opacity = MathUtils.lerp(materialRef.current.opacity, targetOpacity, delta * 3);
  });

  return (
    <group ref={groupRef}>
      <Float floatIntensity={2} speed={2}>
        <Icosahedron ref={meshRef} args={[1, 1]}>
          <meshPhysicalMaterial
            ref={materialRef}
            wireframe={STATE_CONFIG[currentState].wireframe}
            transparent
            roughness={0.2}
            metalness={0.8}
            emissive={new Color(STATE_CONFIG[currentState].color)}
            emissiveIntensity={currentState === STATES.RUNNING ? 2 : 0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}
