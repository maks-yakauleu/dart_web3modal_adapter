import { createWeb3Modal } from "@web3modal/solana";
import { solanaDevnet, solana, solanaTestnet } from "@web3modal/solana/chains";
//import { Provider } from "@web3modal/solana/dist/types/src/utils/scaffold";
//import type { UniversalProvider } from "@walletconnect/universal-provider"; // doesn't work???


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

export function isConnected() {
    let provider = modal.getWalletProvider();
     // without type casting we don't have what we need, but it doesn't compile due to the import???
    console.log(provider);
    const textEncoder = new TextEncoder();
    // @ts-ignore
    provider.signMessage(textEncoder.encode("Hello, World!"));
}

export function signMessage(message) {
    let provider = modal.getWalletProvider();
    // @ts-ignore
    return provider.signMessage(message);
}

export function getWalletProviderType(){
    console.log(modal.getWalletProviderType());
}



