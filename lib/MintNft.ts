import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export const mintNFT = async (wallet: Wallet, candyMachineId: string) => {
  if (!wallet.connected) {
    throw new Error("Please connect your wallet first.");
  }

  if (!candyMachineId) {
    throw new Error("Please provide a valid Candy Machine ID.");
  }

  console.log("Minting NFT...");

  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const umi = createUmi(connection)
      .use(mplCandyMachine())
      .use(walletAdapterIdentity(wallet));

    const candyMachine = new PublicKey(candyMachineId);

    const { nft } = await mplCandyMachine.mint(umi, {
      candyMachine,
      collectionUpdateAuthority: umi.identity.publicKey,
    });

    console.log(`NFT minted successfully! Mint address: ${nft.toString()}`);

    return nft.toString();
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};
