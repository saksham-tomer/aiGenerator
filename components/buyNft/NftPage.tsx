"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import {
  Shield,
  Sword,
  Scroll,
  Feather,
  Coins,
  Image as ImageIcon,
  Loader,
} from "lucide-react";
import MedievalNFTScroll2 from "./scroll2";
import { v4 as uuidv4 } from "uuid";
import { CreateCandyMachine } from "@/lib/createCandyMachine";

const MedievalNFTForge = () => {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftAttributes, setNftAttributes] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  /**
   * @error @note the error was that i was sending  the stringified image bufffer which is no longer buffer so have to convert it into image buffer on the backend
   */

  const createMachine = async () => {
    const { base64Image, type } = await createBuffer(generatedImage);
    console.log(":The image type:", type);
    try {
      const data = await fetch("http://localhost:3000/api/uploadToS3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: base64Image,
          imageKey: `images/${nftName}-${uuidv4()}.png`,
          contentType: type,
        }),
      });
      const response = await data.json();
      console.log(":The creation response:", response.imageUrl);
      setImageUrl(response.imageUrl);
    } catch (error) {
      console.error(error);
    }
    const ImageKey = `metadata/${nftName}-${uuidv4()}.json`;
    console.log("Starting the metadata upload");
    try {
      const metadata = await fetch("http://localhost:3000/api/uploadToS3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: JSON.stringify({
            name: nftName,
            symbol: "SOX",
            description: nftDescription,
            image: imageUrl,
            attributes: nftAttributes,
            properties: {
              files: [{ uri: imageUrl, type: "image/png" }],
              category: "image",
            },
          }),
          imageKey: ImageKey,
        }),
      });
      const response = await metadata.json();
      console.log("the metadat ====>", response);

      const metadataUrl = response.imageUrl;
      const candyAddress = await CreateCandyMachine(
        nftName,
        metadataUrl,
        "SOX",
        wallet
      );
      console.log("Candy Machine created:", candyAddress);
      console.log(metadataUrl);
    } catch (error) {
      console.error("Error uploading metadata to S3:", error);
    }
  };

  const createBuffer = async (image: any) => {
    const type = getContentTypeFromBase64(image);
    const base64Image = image.split(";base64,").pop();

    if (!base64Image) {
      throw new Error("Invalid base64 string");
    }

    return { base64Image, type };
  };

  function getContentTypeFromBase64(base64Data: string): string {
    const match = base64Data.match(/^data:([A-Za-z-+\/]+);base64,/);
    if (match && match[1]) {
      return match[1];
    }
    return "image/png";
  }

  const forgeImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/stable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedImage(data.image);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addAttribute = () => {
    setNftAttributes([...nftAttributes, { trait_type: "", value: "" }]);
  };

  const updateAttribute = (index, field, value) => {
    const newAttributes = [...nftAttributes];
    newAttributes[index][field] = value;
    setNftAttributes(newAttributes);
  };

  const wallet = useWallet();
  return (
    <div
      className="min-h-screen bg-cover bg-center mt-20"
      style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-70 p-4 md:p-8 font-serif text-amber-100">
        <div className="max-w-6xl mx-auto flex flex-col">
          <h1 className="text-4xl md:text-6xl mb-8 md:mb-12 text-center text-amber-500 font-bold relative">
            <span className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 text-6xl md:text-8xl text-amber-700 opacity-20">
              ⚔
            </span>
            Saksham&apos;s NFT Forge
            <span className="absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2 text-6xl md:text-8xl text-amber-700 opacity-20">
              🛡
            </span>
          </h1>

          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 bg-gradient-to-br from-stone-800 to-stone-900 p-6 md:p-8 rounded-lg shadow-2xl border-4 border-amber-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>

              <h2 className="text-3xl mb-6 flex items-center text-amber-400">
                <Shield className="mr-3" size={32} /> Forge Thine Image Asset
              </h2>
              <div className="relative mb-4">
                <ImageIcon
                  className="absolute top-3 left-3 text-amber-700"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Describe thy desired image"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 pl-12 bg-stone-700 rounded-lg border-2 border-amber-600 text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={forgeImage}
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full mb-8 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-3 animate-spin" size={24} />{" "}
                    Forging...
                  </>
                ) : (
                  <>
                    <Sword className="mr-3" size={24} /> Summon Thy Image
                  </>
                )}
              </button>

              <h2 className="text-3xl mt-12 mb-6 flex items-center text-amber-400">
                <Scroll className="mr-3" size={32} /> Inscribe Thy Metadata
              </h2>
              <div className="space-y-6">
                <div className="relative">
                  <Feather
                    className="absolute top-3 left-3 text-amber-700"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Name of thy NFT"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="w-full p-3 pl-12 bg-stone-700 rounded-lg border-2 border-amber-600 text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Scroll
                    className="absolute top-3 left-3 text-amber-700"
                    size={20}
                  />
                  <textarea
                    placeholder="Description of thy NFT"
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    className="w-full p-3 pl-12 bg-stone-700 rounded-lg border-2 border-amber-600 text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32"
                  />
                </div>

                <div className="bg-stone-800 p-6 rounded-lg border-2 border-amber-600">
                  <h3 className="text-2xl mb-4 text-amber-400 flex items-center">
                    <Coins className="mr-2" size={24} /> Attributes of Power
                  </h3>
                  {nftAttributes.map((attr, index) => (
                    <div key={index} className="flex space-x-4 mb-4">
                      <input
                        type="text"
                        placeholder="Trait"
                        value={attr.trait_type}
                        onChange={(e) =>
                          updateAttribute(index, "trait_type", e.target.value)
                        }
                        className="w-1/2 p-2 bg-stone-700 rounded-lg border-2 border-amber-600 text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) =>
                          updateAttribute(index, "value", e.target.value)
                        }
                        className="w-1/2 p-2 bg-stone-700 rounded-lg border-2 border-amber-600 text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addAttribute}
                    className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105"
                  >
                    Add Magical Attribute
                  </button>
                </div>
              </div>
              <button
                // onClick={() =>
                //   createCandyMachine(
                //     nftName,
                //     nftDescription,
                //     nftAttributes,
                //     "SOX",
                //     wallet,
                //     generatedImage
                //       ? `data:image/png;base64,${generatedImage}`
                //       : ""
                //   )
                // }

                onClick={() => {
                  createMachine(
                    `data:image/png;base64,${generatedImage}`,
                    `images/${nftName}-saksham.png`
                  );
                }}
                className="mt-8 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-bold py-4 px-8 rounded-lg w-full text-xl transition duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Enchant Thy NFT</span>
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></span>
              </button>
            </div>

            <div className="flex-1 space-y-8">
              {isLoading && (
                <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-lg shadow-2xl border-4 border-amber-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>
                  <h2 className="text-3xl mb-6 flex items-center text-amber-400">
                    <Loader className="mr-3 animate-spin" size={32} /> Forging
                    Thy Image
                  </h2>
                  <div className="text-center text-amber-200 text-lg">
                    <p>The ancient forge blazes with magic...</p>
                    <p>
                      Thy image is being woven from the very fabric of dreams...
                    </p>
                    <p>Patience, brave creator, for great art takes time...</p>
                  </div>
                </div>
              )}

              {generatedImage && !isLoading && (
                <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-lg shadow-2xl border-4 border-amber-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500"></div>
                  <h2 className="text-3xl mb-6 flex items-center text-amber-400">
                    <ImageIcon className="mr-3" size={32} /> Thine Forged Image
                  </h2>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 p-2 rounded-lg">
                      <img
                        src={`data:image/png;base64,${generatedImage}`}
                        alt="Generated NFT"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
              <MedievalNFTScroll2
                nftData={{
                  name: nftName,
                  description: nftDescription,
                  attributes: nftAttributes,
                  imageUrl: generatedImage
                    ? `data:image/png;base64,${generatedImage}`
                    : null,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedievalNFTForge;
