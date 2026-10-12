import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader.jsx";
import CanvasErrorBoundary from "./CanvasErrorBoundary.jsx";

export const BallModel = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.2}
          metalness={0.1}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
          transparent
          opacity={0.8}
          depthTest={true}
          depthWrite={true}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <CanvasErrorBoundary
      fallback={
        <div className='w-full h-full flex items-center justify-center'>
          <img
            src={icon}
            alt='tech'
            className='w-2/3 h-2/3 object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.45)]'
          />
        </div>
      }
    >
      <Canvas
        frameloop='demand'
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          <BallModel imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default BallCanvas;
