import type { PublicKey, Transaction } from "@solana/web3.js";
export declare const modal: import("@web3modal/solana").Web3Modal;
export declare function openModal(): Promise<void>;
export declare function closeModal(): Promise<void>;
export declare function disconnect(): Promise<unknown>;
export declare function signMessage(message: Uint8Array): Promise<Uint8Array> | Promise<{
    signature: Uint8Array;
}>;
export declare function getPublicKey(): PublicKey;
export declare function getName(): string;
export declare function signTransaction(transaction: Transaction): Promise<Uint8Array>;
export declare function signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
export declare function getBalance(): Promise<number>;
export declare function isConnected(): void;
