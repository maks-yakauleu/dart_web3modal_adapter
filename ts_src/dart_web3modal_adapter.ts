import { createWeb3Modal } from "@web3modal/solana";

const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com",
    icons: ["https://avatars.mywebsite.com/"],
};

const solanaDevnet = {
    chainId: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    name: "Solana Devnet",
    currency: "SOL",
    explorerUrl: "https://explorer.solana.com/?cluster=devnet",
    rpcUrl: "https://api.devnet.solana.com",
};

const chains = [solanaDevnet];

// 96fa9cbf333cf05f246ae5cb5afd7239
const projectId = "d23bfefd133ecce1f6d2ed7b52bbd5b4";

const modal = createWeb3Modal({
    chains: chains,
    projectId: projectId,
    solanaConfig: { metadata: metadata },
});

export function openModal() {
    modal.open();
}

export function printInfo(){
    console.log(modal.getWalletProvider());
}
