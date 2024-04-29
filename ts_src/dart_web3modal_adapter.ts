import { createWeb3Modal } from "@web3modal/solana";
import { solanaDevnet, solana, solanaTestnet } from "@web3modal/solana/chains";
import type { Provider } from "@web3modal/solana/dist/types/src/utils/scaffold";


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
    const provider = modal.getWalletProvider() as Provider;
    console.log(provider.isConnected);
}

export function signMessage(message) {
    const provider = modal.getWalletProvider() as Provider;
    return provider.signMessage(message);
}

export function getWalletName() {
    return modal.getWalletInfo().name; //undefined
}

export function getWalletIcon() {
    return modal.getWalletInfo().icon; //undefined
}