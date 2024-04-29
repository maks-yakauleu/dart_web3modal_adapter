import { createWeb3Modal } from "@web3modal/solana";
import { solanaDevnet, solana, solanaTestnet } from "@web3modal/solana/chains";
import type { Provider } from "@web3modal/solana/dist/types/src/utils/scaffold";
import type { Transaction } from "@solana/web3.js";


const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com",
    icons: ["https://avatars.mywebsite.com/"],
};

const chains = [solana, solanaTestnet, solanaDevnet];

// 96fa9cbf333cf05f246ae5cb5afd7239
const projectId = "d23bfefd133ecce1f6d2ed7b52bbd5b4";

export const modal = createWeb3Modal({
    chains: chains,
    projectId: projectId,
    solanaConfig: { metadata: metadata },
    themeMode: "dark",
});


export function openModal() {
    return modal.open();
}

export function closeModal() {
    return modal.close();
}

export function disconnect() {
    return modal.getWalletProvider().disconnect();
}

export function signMessage(message: Uint8Array) {
    const provider = modal.getWalletProvider() as Provider;
    return provider.signMessage(message);
}

// signTransaction: (transaction: SolanaWeb3Transaction | VersionedTransaction) => Promise<{
//     signatures: {
//         signature: Uint8Array;
//     }[];
// }>;
// https://github.com/WalletConnect/web3modal/blob/41e1ab9c33e5506b86de950d16797aa6b3e64b6f/packages/solana/src/connectors/walletConnectConnector.ts#L115
// seems like 
// signature just Uint8Array type, and signatures just one object not a list of objects
// they just serialize this transaction before returning 
export function signTransaction(transaction: Transaction){
    const provider = modal.getWalletProvider() as Provider;
    return provider.signTransaction(transaction);
}

// these are undefined
// export function isConnected() {
//     const provider = modal.getWalletProvider() as Provider;
//     console.log(provider.isConnected);
// }

// export function getWalletName() {
//     return modal.getWalletInfo().name; 
// }

// export function getWalletIcon() {
//     return modal.getWalletInfo().icon; 
// }