import { createWeb3Modal } from "@web3modal/solana";
import { solanaDevnet, solanaTestnet } from "@web3modal/solana/chains";
import type { Provider, SolStoreUtilState } from "@web3modal/solana/dist/types/src/utils/scaffold";
import { PublicKey, Transaction } from "@solana/web3.js";


const metadata = {
    name: "Devol Network",
    description: "Complete Crypto Options Solutions",
    //url: "https://dev-app-05.devol.dev/",
    url: "http://localhost:4000/",
    icons: ["https://avatars.mywebsite.com/"],
};

// const solanaDevnet = {
//     chainId: '8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
//     name: 'Solana Devnet',
//     currency: 'SOL',
//     explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
//     rpcUrl: 'https://api.devnet.solana.com'
// }

const chains = [solanaDevnet, solanaTestnet];

// 901b42e19e921a3965f7f1e89a287d90
// 96fa9cbf333cf05f246ae5cb5afd7239
const projectId = "901b42e19e921a3965f7f1e89a287d90";

export const modal = createWeb3Modal({
    chains: chains,
    // defaultChain: solanaDevnet,
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

export async function signTransaction(transaction: Transaction) : Promise<Transaction>{
    const provider = modal.getWalletProvider() as Provider;
    const signature = await provider.signTransaction(transaction);
    const serializedTransaction = signature.signatures[0].signature;
    const resultTransaction = Transaction.from(serializedTransaction);
    // let signaturePromise = provider.signTransaction(transaction).then((res)=>{
    //     return res.signatures[0].signature;
    // });
    return resultTransaction;
}

export function signAllTransactions(transactions: Transaction[]) : Promise<Transaction[]> {
    const provider = modal.getWalletProvider() as Provider;
    return provider.signAllTransactions(transactions);
}

export function getBalance() : Promise<number> {
    const walletConnection = modal.getWalletConnection();
    return walletConnection.getBalance(getPublicKey());
}

export function isConnected() {
    const provider = modal.getWalletProvider();
    return !(provider === undefined);
}

export function listenIsConnected(listen: (connected: boolean) => void) : void {
    modal.subscribeProvider((state : SolStoreUtilState) => {
        listen(state.isConnected);
    });
}

export function handleError(onError: (error) => void) : void{
    modal.subscribeProvider((state : SolStoreUtilState) => {
        onError(state.error);
    });
}

// provider is undefined when not connected so need to figure out how to call this methods
// export function setupWalletOnConnectEvent(onConnect) : void {
//     const provider = modal.getWalletProvider() as Provider;
//     provider?.on('connect', onConnect);
// }

// export function setupWalletOnDisconnectEvent(onDisconnect) : void {
//     const provider = modal.getWalletProvider() as Provider;
//     provider?.on('disconnect', onDisconnect);
// }

// export function removeWalletOnConnectEvent(onConnect) : void {
//     const provider = modal.getWalletProvider() as Provider;
//     provider.removeListener('connect', onConnect);
// }

// export function removeWalletOnDisconnectEvent(onDisconnect) : void {
//     const provider = modal.getWalletProvider() as Provider;
//     provider.removeListener('disconnect', onDisconnect);
// }