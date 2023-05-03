import {WalletAPI, Wallet} from './wallet'
export interface Builder {
    setLockable(): void
    setCollectionManager(): void
    setConnectivityProvider(): void
    setStorageProvider(): void
    setCredentialManager(): void
    setKeyManager(): void
    build(): WalletAPI
}

export class DefaultBuilder implements Builder {
    private wallet: Wallet
    constructor() {
        this.reset()
    }
    public reset() {
        this.wallet = new Wallet()
    }
    setLockable(): void {
        
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
