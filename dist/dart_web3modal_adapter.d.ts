export declare const modal: import("@web3modal/solana").Web3Modal;
export declare function openModal(): Promise<void>;
export declare function closeModal(): Promise<void>;
export declare function disconnect(): Promise<unknown>;
export declare function signMessage(message: any): Promise<Uint8Array> | Promise<{
    signature: Uint8Array;
}>;
