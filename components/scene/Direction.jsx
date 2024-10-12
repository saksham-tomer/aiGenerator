import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Direction(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/direction.glb");
  const [modelLoaded, setModelLoaded] = useState(true);
  const canvasTexture = useRef();
  const planeRef = useRef();
  const [hoveredKey, setHoveredKey] = useState(null);

  useEffect(() => {
    if (
      nodes &&
      nodes.Object_4 &&
      nodes.Object_4.geometry &&
      materials.Sign_3_post_Baked
    ) {
      setModelLoaded(true);
    }
  }, [nodes, materials]);

  useEffect(() => {
    if (modelLoaded) {
      renderCanvas();
    }
  }, [modelLoaded, hoveredKey]);

  const renderCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");

    // Medieval parchment background with rounded corners
    context.fillStyle = "#d2b48c";
    roundRect(context, 0, 0, canvas.width, canvas.height, 50);
    context.fill();

    const gradient = context.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, "rgba(210, 180, 140, 0)");
    gradient.addColorStop(1, "rgba(139, 69, 19, 0.5)");
    context.fillStyle = gradient;
    roundRect(context, 0, 0, canvas.width, canvas.height, 50);
    context.fill();

    // Add a parchment texture
    context.globalAlpha = 0.1;
    for (let i = 0; i < 20000; i++) {
      context.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
      context.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        1
      );
    }
    context.globalAlpha = 1;

    // Draw movement keys
    const keySize = 120;
    const keySpacing = 30;
    const startX = canvas.width / 2 - 1.5 * keySize - keySpacing;
    const startY = canvas.height / 2 - 1.5 * keySize - keySpacing;

    // Function to draw a medieval-style key
    const drawKey = (x, y, text, isHovered) => {
      context.save();
      context.translate(x + keySize / 2, y + keySize / 2);
      context.rotate((Math.PI / 60) * (Math.random() - 0.5)); // Slight random rotation

      // Key background
      context.fillStyle = isHovered ? "#8B4513" : "#A0522D";
      roundRect(context, -keySize / 2, -keySize / 2, keySize, keySize, 10);
      context.fill();

      // Key border
      context.strokeStyle = "#4B3621";
      context.lineWidth = 4;
      context.stroke();

      // Key text
      context.fillStyle = "#FFD700";
      context.font = "bold 48px 'MedievalSharp', cursive";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, 0, 0);

      context.restore();
    };

    // Draw arrow keys
    drawKey(startX + keySize + keySpacing, startY, "↑", hoveredKey === "up");
    drawKey(startX, startY + keySize + keySpacing, "←", hoveredKey === "left");
    drawKey(
      startX + keySize + keySpacing,
      startY + keySize + keySpacing,
      "↓",
      hoveredKey === "down"
    );
    drawKey(
      startX + 2 * (keySize + keySpacing),
      startY + keySize + keySpacing,
      "→",
      hoveredKey === "right"
    );

    // Add instruction text
    context.fillStyle = "#4B3621";
    context.font = "60px 'MedievalSharp', cursive";
    context.textAlign = "center";
    context.fillText(
      "Use arrow keys to move",
      canvas.width / 2,
      startY + 3 * (keySize + keySpacing)
    );

    // Create texture from canvas
    canvasTexture.current = new THREE.CanvasTexture(canvas);
    canvasTexture.current.needsUpdate = true;
  };

  // Helper function to draw rounded rectangles
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  useFrame(() => {
    if (canvasTexture.current) {
      canvasTexture.current.needsUpdate = true;
    }
  });

  const handlePointerMove = (event) => {
    event.stopPropagation();
    const { uv } = event;
    if (!uv) return;

    const x = uv.x * 1024;
    const y = (1 - uv.y) * 1024;

    const keySize = 120;
    const keySpacing = 30;
    const startX = 512 - 1.5 * keySize - keySpacing;
    const startY = 512 - 1.5 * keySize - keySpacing;

    if (
      x > startX + keySize + keySpacing &&
      x < startX + 2 * keySize + keySpacing &&
      y > startY &&
      y < startY + keySize
    ) {
      setHoveredKey("up");
    } else if (
      x > startX &&
      x < startX + keySize &&
      y > startY + keySize + keySpacing &&
      y < startY + 2 * keySize + keySpacing
    ) {
      setHoveredKey("left");
    } else if (
      x > startX + keySize + keySpacing &&
      x < startX + 2 * keySize + keySpacing &&
      y > startY + keySize + keySpacing &&
      y < startY + 2 * keySize + keySpacing
    ) {
      setHoveredKey("down");
    } else if (
      x > startX + 2 * (keySize + keySpacing) &&
      x < startX + 3 * keySize + 2 * keySpacing &&
      y > startY + keySize + keySpacing &&
      y < startY + 2 * keySize + keySpacing
    ) {
      setHoveredKey("right");
    } else {
      setHoveredKey(null);
    }
  };

  const handlePointerOut = () => {
    setHoveredKey(null);
  };

  if (!modelLoaded || !canvasTexture.current) {
    return null;
  }

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.Sign_3_post_Baked}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          ref={planeRef}
          rotation={[1.8, Math.PI / -4, 0]}
          position={[1, -6, 0.2]}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[2.5, 2.5]} />
          <meshBasicMaterial
            map={canvasTexture.current}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/direction.glb");
