"use client";
import React, { useState, useEffect } from "react";
import { Feather, Shield, Scroll } from "lucide-react";

const MedievalNFTScroll = ({ nftData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12">
      <div
        className={`
          bg-amber-100 rounded-lg shadow-2xl p-8 transform rotate-1
          transition-all duration-1000 ease-in-out
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }
          before:content-[''] before:absolute before:-top-4 before:-left-4 before:right-4 before:bottom-4 
          before:border-4 before:border-amber-800 before:rounded-lg before:z-0
        `}
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-6 font-medieval text-amber-900">
            Proclamation of NFT
          </h2>

          <div className="mb-6 text-center">
            <img
              src={nftData.imageUrl || "/api/placeholder/300/300"}
              alt="NFT Image"
              className="w-64 h-64 mx-auto rounded-lg border-4 border-amber-800 shadow-lg"
            />
          </div>

          <div className="space-y-4 font-handwritten text-xl text-amber-900">
            <p className="flex items-center">
              <Feather className="mr-2 text-amber-700" size={24} />
              <span className="font-bold mr-2">Name:</span>{" "}
              {nftData.name || "Unnamed Treasure"}
            </p>
            <p className="flex items-start">
              <Scroll className="mr-2 mt-1 text-amber-700" size={24} />
              <span>
                <span className="font-bold">Description:</span>{" "}
                {nftData.description || "A mystery yet to be unraveled"}
              </span>
            </p>
            <div>
              <h3 className="font-bold mb-2 flex items-center">
                <Shield className="mr-2 text-amber-700" size={24} /> Attributes
                of Power:
              </h3>
              <ul className="list-disc list-inside pl-6 space-y-2">
                {nftData.attributes &&
                  nftData.attributes.map((attr, index) => (
                    <li key={index}>
                      <span className="font-bold">{attr.trait_type}:</span>{" "}
                      {attr.value}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-800 rounded-full flex items-center justify-center transform rotate-12">
            <div className="text-amber-100 font-medieval text-xs text-center">
              Official Seal of the NFT Realm
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flutter {
          0%,
          100% {
            transform: rotate(1deg);
          }
          50% {
            transform: rotate(-1deg);
          }
        }
        .font-medieval {
          font-family: "Luminari", "Blackadder ITC", "Edwardian Script ITC",
            "Palatino Linotype", serif;
        }
        .font-handwritten {
          font-family: "Brush Script MT", "Segoe Script", "Bradley Hand",
            cursive;
        }
        .bg-amber-100 {
          animation: flutter 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MedievalNFTScroll;
