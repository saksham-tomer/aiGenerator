import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export const CreateCandyMachine = async (
  nftName: string,
  metadataUrl: string,
  symbol: string,
  wallet: Wallet
) => {
  if (!wallet.connected) {
    throw new Error("Please connect your wallet first.");
  }
  try {
    // Initialize umi
    const connection = new Connection(clusterApiUrl("devnet"));
    const umi = createUmi(connection)
      .use(mplCandyMachine())
      .use(walletAdapterIdentity(wallet));

    // Create Candy Machine
    const { candyMachine } = await mplCandyMachine.createCandyMachine(umi, {
      itemsAvailable: 100, // Adjust as needed
      sellerFeeBasisPoints: 500, // 5%
      symbol: symbol,
      maxEditionSupply: 0,
      isMutable: true,
      creators: [{ address: umi.identity.publicKey, share: 100 }],
      configLineSettings: {
        prefixName: "",
        nameLength: 32,
        prefixUri: "",
        uriLength: 200,
        isSequential: false,
      },
      hiddenSettings: null,
      guards: {},
    });

    console.log("Candy Machine created:", candyMachine.toString());

    // Add item to Candy Machine
    await mplCandyMachine.addConfigLines(umi, {
      candyMachine: candyMachine,
      index: 0,
      configLines: [{ name: nftName, uri: metadataUrl }],
    });

    console.log(
      `Candy Machine created and item added. Candy Machine ID: ${candyMachine.toString()}`
    );

    return candyMachine.toString();
  } catch (error) {
    console.error("Error creating Candy Machine:", error);
    throw error;
  }
};
