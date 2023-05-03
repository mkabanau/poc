import {WalletAPI, Wallet} from 'wallet-api'

export interface WalletBuilder {
    setCollectionManager(): void
    setConnectivityProvider(): void
    setStorageProvider(): void
    setCredentialManager(): void
    setKeyManager(): void
    build(): WalletAPI
}
export interface WalletSDKBuilder {
    setConnectivityProvider():void
    build(): WalletAPI
}

export class DefaultBuilder implements WalletBuilder {
    private wallet: Wallet
    constructor() {
        this.reset()
    }
    public reset() {
        this.wallet = new Wallet()
    }
    setCollectionManager(): void {

    }
    setConnectivityProvider(): void {

    }
    setStorageProvider(): void {

    }
    setCredentialManager(): void {

    }
    setKeyManager(): void {

    }
    build(): Wallet {
        return this.wallet
    }
}
