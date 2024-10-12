"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  KeyboardControls,
  useProgress,
  Text,
  PositionalAudio,
  OrbitControls,
} from "@react-three/drei";
import { Model } from "./Scene";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { Market } from "./Market";
import { Tent } from "./Tent";
import MedievalMenu from "./MedievalMenu";
import { useRouter } from "next/navigation";
import MedievalLoadingComponent from "./Loader";
import { Portal } from "./Portal";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

const QuestOverlay = ({ questProgress, nftsFound }) => (
  <div
    style={{
      position: "absolute",
      top: 80,
      left: 20,
      fontFamily: "'MedievalSharp', cursive",
      color: "#FFD700",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
    }}
  >
    <h1 style={{ fontSize: "48px", margin: "0 0 10px 0" }}>
      Medieval NFT Quest
    </h1>
    <p style={{ fontSize: "24px", margin: "0" }}>Progress: {questProgress}%</p>
    <p style={{ fontSize: "24px", margin: "0" }}>NFTs Found: {nftsFound}/5</p>
  </div>
);

const Minimap = () => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      width: "150px",
      height: "150px",
      background: "rgba(0,0,0,0.5)",
      border: "2px solid #FFD700",
      borderRadius: "10px",
    }}
  >
    <div
      style={{
        padding: "10px",
        color: "#FFD700",
        fontFamily: "'MedievalSharp', cursive",
      }}
    >
      Mini-map
    </div>
  </div>
);

const QuestHint = ({ hint }) => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      left: 20,
      maxWidth: "300px",
      background: "rgba(0,0,0,0.7)",
      color: "#FFD700",
      padding: "10px",
      borderRadius: "10px",
      fontFamily: "'MedievalSharp', cursive",
      fontSize: "18px",
    }}
  >
    <strong>Hint:</strong> {hint}
  </div>
);

const FloatingMarker = ({ position, label }) => (
  <Html position={position}>
    <div
      style={{
        transform: "translate3d(-50%, -50%, 0)",
        background: "rgba(0,0,0,0.8)",
        color: "#FFD700",
        padding: "5px 10px",
        borderRadius: "20px",
        fontFamily: "'MedievalSharp', cursive",
        fontSize: "14px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  </Html>
);
const PortalModal = ({ position }) => (
  <Html occlude distanceFactor={8} position={position}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        width: "16rem",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.4rem",
          color: "#FFD700",
          textAlign: "center",
          fontFamily: "'MedievalSharp', cursive",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Explore The NFT World
      </h3>
      <p
        style={{
          color: "#FFD700",
          textAlign: "center",
          fontFamily: "'MedievalSharp', cursive",
          fontSize: "1rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        Press Ctrl + Enter to enter the NFT world.
      </p>
    </div>
  </Html>
);

const MedievalNFTQuestExperience = () => {
  const [questProgress, setQuestProgress] = useState(0);
  const [nftsFound, setNftsFound] = useState(0);
  const [currentHint, setCurrentHint] = useState(
    "Search the ancient ruins for hidden treasures."
  );
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { progress, loaded, total } = useProgress();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        router.push("/exploreNft");
      }
      return () => {
        window.removeEventListener("keydown");
      };
    });
  }, []);

  useEffect(() => {
    if (loaded === total && progress === 100) {
      // Add a small delay to ensure everything is ready
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, loaded, total]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {isLoading && <MedievalLoadingComponent progress={progress} />}
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <PositionalAudio
            distance={3}
            loop={true}
            url="/ontop.mp3"
            volume={0.5}
            autoplay={true}
          />
          <fog attach="fog" args={["#2a2a2a", 0, 20]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
            <Environment preset="night" background attach="background" />
            <Physics>
              <CharacterController />
              <Html position={[0, 2, 0]} distanceFactor={8} occlude>
                <MedievalMenu router={router} />
              </Html>
              <Market />
              <Tent
                rotation={[0, Math.PI / 4, 0]}
                scale={0.8}
                position={[8, 0, -10]}
              />
              <Portal
                animation="Scene"
                position={[-13, 0, -2]}
                scale={0.002}
                rotation={[0, Math.PI / 18, 0]}
              />
              <OrbitControls />
              <Text
                rotation={[0, Math.PI / 1, 0]}
                outlineColor="black"
                fontSize={0.35}
                strokeColor="black"
                strokeWidth={0.006}
                anchorX="center"
                anchorY="middle"
                color="yellow"
                outlineOpacity={0.5}
                outlineOffsetX={0.002}
                characters="Quest Begins"
                position={[10, 2, -12]}
              >
                Quest Begins
              </Text>
              <Model />
            </Physics>
            <FloatingMarker position={[5, 2, -5]} label="Ancient Ruins" />
            <FloatingMarker position={[-5, 2, 5]} label="Mystical Grove" />
            <FloatingMarker position={[0, 2, 10]} label="Dragon's Lair" />
            <PortalModal position={[-13, 2, -2]} />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Overlay UI Elements */}
      <QuestOverlay questProgress={questProgress} nftsFound={nftsFound} />
      <Minimap />
      <QuestHint hint={currentHint} />

      <button
        onClick={() => {
          setNftsFound((prev) => Math.min(prev + 1, 5));
          setQuestProgress((prev) => Math.min(prev + 20, 100));
          setCurrentHint("Follow the path of the music.");
        }}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          fontSize: "18px",
          fontFamily: "'MedievalSharp', cursive",
          background: "#4a0e0e",
          color: "#FFD700",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Find NFT (Demo)
      </button>
    </div>
  );
};

export default MedievalNFTQuestExperience;
