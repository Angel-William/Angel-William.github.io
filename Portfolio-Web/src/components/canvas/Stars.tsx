import React, { useRef, useState, Suspense } from "react"; // Import Suspense here
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

// Styled wrapper for the canvas
const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed; // Fixed positioning to cover the entire viewport
  inset: 0;
  z-index: 0; // Ensure it is behind other content
`;

interface StarsProps {
  [key: string]: any;
}

const Stars: React.FC<StarsProps> = (props) => {
  const ref = useRef<THREE.Points | null>(null);

  // Generate random points inside a sphere
  const [sphere] = useState(() => {
    const generated = random.inSphere(new Float32Array(5000), { radius: 1.2 });

    // Validate and clean up invalid vertices
    for (let i = 0; i < generated.length; i += 3) {
      if (
        isNaN(generated[i]) || // x
        isNaN(generated[i + 1]) || // y
        isNaN(generated[i + 2]) // z
      ) {
        console.warn("Invalid vertex found at index", i);
        generated[i] = 0; // Replace NaN with a default value (e.g., 0)
        generated[i + 1] = 0;
        generated[i + 2] = 0;
      }
    }

    return generated;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={new Float32Array(sphere)} // Ensure positions is a Float32Array
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StyledStarsCanvas: React.FC = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}> {/* Use Suspense here */}
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;