import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader.jsx";

const ComputerModel = ({ isMobile }) => {
  // Use error handling for GLTF loading
  const [error, setError] = useState(false);
  
  let computer;
  try {
    computer = useGLTF("./desktop_pc/scene.gltf");
  } catch (err) {
    console.error("Error loading 3D model:", err);
    setError(true);
  }
  
  if (error) {
    return (
      <mesh>
        <ambientLight intensity={0.5} />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.85} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} position={[0, 0, -1]} />
      <pointLight intensity={0.5} position={[0, -2, 2]} />
      <pointLight intensity={0.5} position={[-2, -1, 0]} />
      <ambientLight intensity={0.3} />
      
      {computer && computer.scene && (
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      )}
    </mesh>
  );
};

// Fallback simple 3D content if the main component fails
const FallbackComputer = () => {
  return (
    <mesh>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    try {
      // Add a listener for changes to the screen size
      const mediaQuery = window.matchMedia("(max-width: 500px)");

      // Set the initial value of the `isMobile` state variable
      setIsMobile(mediaQuery.matches);

      // Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      };

      // Add the callback function as a listener for changes to the media query
      mediaQuery.addEventListener("change", handleMediaQueryChange);

      // Remove the listener when the component is unmounted
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    } catch (err) {
      console.error("Error in ComputersCanvas setup:", err);
      setRenderError(true);
    }
  }, []);

  // Fallback UI if we can't render the 3D canvas
  if (renderError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">3D View Unavailable</h2>
          <p>We're having trouble loading the 3D view.</p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
      }}
      onError={(err) => {
        console.error("Canvas render error:", err);
        setRenderError(true);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Suspense fallback={<FallbackComputer />}>
          <ComputerModel isMobile={isMobile} />
        </Suspense>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
