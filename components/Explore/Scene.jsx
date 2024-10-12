"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Environment,
  KeyboardControls,
  PositionalAudio,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "@/components/scene/CharacterController";
import MedievalMenu from "../scene/MedievalMenu";
import { Model } from "./Park";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

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

export default function ExploreNft() {
  const router = useRouter();
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <OrbitControls />
          <PositionalAudio
            distance={3}
            loop={true}
            url="/medieval.mp3"
            volume={0.5}
            autoplay={true}
          />
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
            <Environment preset="park" background />
            <Physics>
              {/* <Html position={[0, 2, 0]} distanceFactor={8} occlude>
                <MedievalMenu router={router} />
              </Html> */}
              <CharacterController />

              <Model scale={0.28} position={[4, -6, -60]} />
            </Physics>
            <Html position={[12, -4, -5]} occlude>
              <div className="rounded-xl flex items-center min-h-48 transition-colors transform animate-in duration-75 justify-center flex-col shadow-xl p-4 border border-pink-500 bg-gradient-to-tr from-pink-400 to-purple-400">
                <h1 className="text-4xl min-w-full text-transparent bg-clip-text bg-gradient-to-tr from-purple-300 transition-colors duration-75 to-pink-300 px-40 text-nowrap font-bold font-text">
                  Explore Your Collection
                </h1>
                <p className="font-medium">Roam around and explore the city</p>
                <div className="flex flex-row min-w-full">
                  <Avatar className="mr-auto border border-purple-500 shadow-lg w-1/4 max-w-20 min-h-20 bg-cover mt-auto">
                    <AvatarImage
                      src="/avatar.png"
                      alt=""
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <Image
                        src={"/avatar.png"}
                        alt=""
                        width={1920}
                        height={1080}
                        className=""
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2 w-2/4 mr-auto px-12 mt-6 flex-row items-center">
                    <ArrowLeft
                      size={44}
                      className="p-2 rounded-lg border border-white bg-white/25"
                    />
                    <div className="flex gap-4 flex-col items-center justify-center">
                      <ArrowUp
                        className="p-2 rounded-lg border  border-white bg-white/25"
                        size={44}
                      />
                      <ArrowDown
                        className="p-2  transition-transform animate-bounce rounded-lg border border-white bg-white/25"
                        size={44}
                      />
                    </div>
                    <ArrowRight
                      className="p-2 rounded-lg border border-white bg-white/25"
                      size={44}
                    />
                  </div>
                </div>
              </div>
            </Html>
            <FloatingMarker position={[5, 2, -5]} label="" />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      ;
    </div>
  );
}
