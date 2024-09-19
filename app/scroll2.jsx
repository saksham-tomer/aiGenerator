import React, { useState, useEffect } from "react";
import { Feather, Shield } from "lucide-react";
import Image from "next/image";

const MedievalNFTScroll2 = ({ nftData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12">
      <div
        className={`
          bg-scroll bg-no-repeat bg-cover bg-center p-12
          transition-all duration-1000 ease-in-out
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }
        `}
        style={{
          backgroundImage: "url('/ogs.png')", // Replace with actual scroll background image
          minHeight: "800px",
        }}
      >
        <div className="relative z-10 font-medieval text-black ">
          <h2 className="text-4xl font-bold text-center mb-6 mt-8 text-amber-950">
            Proclamation of NFT
          </h2>

          <div className="mb-6 text-center mt-20">
            <Image
              width={1920}
              height={1080}
              src={nftData.imageUrl || "/api/placeholder/300/300"}
              alt="NFT Image"
              className="w-64 h-64 mx-auto rounded-lg border-4 border-amber-900 shadow-lg"
            />
          </div>

          <div className="space-y-4 text-xl right-auto md:ml-16 lg:ml-24">
            <p className="flex items-center ">
              <Feather className="mr-2 text-amber-700" size={24} />
              <span className="font-bold mr-2">Name:</span>{" "}
              {nftData.name || "Unnamed Treasure"}
            </p>
            <p className="flex items-start">
              <Feather className="mr-2 mt-1 text-amber-700" size={24} />
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

          <div className="mt-8 text-right md:mr-12 lg:mr-16">
            <p className="font-bold md:text-lg">Sealed by the NFT Council</p>
            <p className="md:text-base">
              In the year of our Lord {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: "Medieval";
          src: url("/path-to-your-handwritten-font.woff2") format("woff2");
          /* Make sure to include the actual font file in your project */
        }
        .font-medieval {
          font-family: "Medieval", "Brush Script MT", "Segoe Script",
            "Bradley Hand", cursive;
        }
        .bg-scroll {
          background-image: url("/path-to-your-scroll-background.png");
          /* Replace with the actual path to your scroll background image */
        }
      `}</style>
    </div>
  );
};

export default MedievalNFTScroll2;
