import { createWeb3Modal } from "@web3modal/solana";
import { solanaDevnet, solana, solanaTestnet } from "@web3modal/solana/chains";
import type { Provider } from "@web3modal/solana/dist/types/src/utils/scaffold";
import type { PublicKey, Transaction } from "@solana/web3.js";


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

export function openModal() : Promise<void>{
    return modal.open();
}

export function closeModal() : Promise<void> {
    return modal.close();
}

export function disconnect() : Promise<unknown> {
    return modal.getWalletProvider().disconnect();
}

export function signMessage(message: Uint8Array) : Promise<Uint8Array> | Promise<{
    signature: Uint8Array;
}> {
    const provider = modal.getWalletProvider() as Provider;
    return provider.signMessage(message);
}

export function getPublicKey() : PublicKey {
    const provider = modal.getWalletProvider() as Provider;
    return provider.publicKey;
}

export function getName() : string {
    const provider = modal.getWalletProvider() as Provider;
    return provider.name;
}

export function signTransaction(transaction: Transaction) : Promise<Uint8Array>{
    const provider = modal.getWalletProvider() as Provider;
    let signaturePromise = provider.signTransaction(transaction).then((res)=>{
        return res.signatures[0].signature;
    });
    return signaturePromise;
}

export async function signAllTransactions(transactions: Transaction[]) : Promise<Transaction[]> {
    const provider = modal.getWalletProvider() as Provider;
    const signed = await provider.signAllTransactions(transactions);
    return signed;
}