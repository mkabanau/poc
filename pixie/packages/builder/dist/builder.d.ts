import { WalletAPI, Wallet } from 'wallet-api';
export interface WalletBuilder {
    setCollectionManager(): void;
    setConnectivityProvider(): void;
    setStorageProvider(): void;
    setCredentialManager(): void;
    setKeyManager(): void;
    build(): WalletAPI;
}
export interface WalletSDKBuilder {
    setConnectivityProvider(): void;
    build(): WalletAPI;
}
export declare class DefaultBuilder implements WalletBuilder {
    private wallet;
    constructor();
    reset(): void;
    setCollectionManager(): void;
    setConnectivityProvider(): void;
    setStorageProvider(): void;
    setCredentialManager(): void;
    setKeyManager(): void;
    build(): Wallet;
}
