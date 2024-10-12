"use client";
import { WalletName } from "@solana/wallet-adapter-base";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuWallet } from "react-icons/lu";

const WalletConnection = () => {
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const [open, setOpen] = useState<boolean>(false);

  const handleWalletSelect = async (walletName: WalletName) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("Wallet connection error:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div className="text-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {!publicKey ? (
            <DialogTrigger asChild>
              <div
                className="bg-gradient-to-tr from-yellow-500 to-orange-500 border border-amber-300 text-center text-white px-6 cursor-pointer hover:bg-gradient-to-tr hover:from-yellow-600 hover:to-orange-600 py-1 rounded-md text-base font-mono font-medium transition-colors"
                aria-label="Connect Wallet"
              >
                {connecting ? (
                  <span className="bg-gradient-to-tr from-purple-500 to-blue-500"></span>
                ) : (
                  <LuWallet className="min-w-6 min-h-6" />
                )}
              </div>
            </DialogTrigger>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-tr from-yellow-500 to-orange-500  text-center text-white px-4 py-2 rounded-md text-base font-mono font-medium transition-colors">
                  <span className="text-sm">{`${publicKey
                    .toBase58()
                    .slice(0, 4)}...${publicKey.toBase58().slice(-4)}`}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex items-center bg-gradient-to-tr from-yellow-500 to-orange-500 justify-center w-full h-full  transition duration-150 ease-in-out hover:bg-gradient-to-tr hover:from-yellow-600 hover:to-orange-700 ">
                <DropdownMenuItem>
                  <section
                    onClick={handleDisconnect}
                    className="text-white bg-gradient-to-tr hover:bg-gradient-to-tr  from-yellow-500 to-orange-500 border border-amber-300  hover:from-yellow-500 hover:to-orange-500  font-semibold font-mono rounded-2xl"
                  >
                    Disconnect
                  </section>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <DialogContent className="bg-neutral-900 border-none backdrop-blur-sm bg-opacity-90 rounded-xl shadow-2xl max-w-md">
            <DialogTitle className="text-2xl font-bold text-center mb-6 text-white">
              Select a Wallet
            </DialogTitle>
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  className="w-full flex items-center space-x-3 hover:bg-gray-600 text-white rounded-lg p-3 transition duration-150 ease-in-out"
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <span className="font-medium">{wallet.adapter.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
