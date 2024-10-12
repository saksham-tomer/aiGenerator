import React from "react";
import { Html } from "@react-three/drei";
import {
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Help: React.FC = () => {
  return (
    <mesh position={[8.6, 0, -12]}>
      <Html
        as="div"
        wrapperClass="fixed-html-overlay"
        prepend
        center
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 bg-gradient-to-br from-yellow-300/20 to-transparent rounded-md shadow-[0_0_15px_5px_rgba(255,215,0,0.5)] animate-pulse">
          <div className="flex flex-row items-center gap-2">
            <div className="bg-yellow-400/30 mt-auto mb-0 p-2 rounded-md cursor-pointer hover:bg-yellow-400/50 transition-all duration-300 border border-yellow-400/30 pointer-events-auto shadow-[0_0_10px_2px_rgba(255,215,0,0.3)]">
              <ChevronLeft className="text-yellow-200" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-yellow-400/30 p-2 rounded-md cursor-pointer hover:bg-yellow-400/50 transition-all duration-300 border border-yellow-400/30 pointer-events-auto shadow-[0_0_10px_2px_rgba(255,215,0,0.3)]">
                <ChevronUp className="text-yellow-200" />
              </div>
              <div className="bg-yellow-400/30 p-2 rounded-md cursor-pointer hover:bg-yellow-400/50 transition-all duration-300 border border-yellow-400/30 pointer-events-auto shadow-[0_0_10px_2px_rgba(255,215,0,0.3)]">
                <ChevronDown className="text-yellow-200" />
              </div>
            </div>
            <div className="bg-yellow-400/30 mt-auto mb-0 p-2 rounded-md cursor-pointer hover:bg-yellow-400/50 transition-all duration-300 border border-yellow-400/30 pointer-events-auto shadow-[0_0_10px_2px_rgba(255,215,0,0.3)]">
              <ChevronRight className="text-yellow-200" />
            </div>
          </div>
          <div className="text-xs text-center mt-2 text-yellow-200 font-semibold">
            Use Arrow or WASD to move
          </div>
        </div>
      </Html>
    </mesh>
  );
};

export default Help;
