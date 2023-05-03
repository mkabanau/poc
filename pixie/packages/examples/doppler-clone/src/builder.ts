
import {WalletBuilder,WalletSDKBuilder} from "builder"
import { Wallet, WalletAPI } from "wallet-api"
import { ConnectivityProviderImpl } from "connectivity-provider"
import {WalletSDK} from "wallet-sdk"

// WebWalletSDKBuilder
// 0. establish channel for same origin communication
// 1. installs service worker wallet implementation
// 2. installs web worker collection manager
export class WebWalletSDKBuilder implements WalletSDKBuilder {
    public walletSDK: WalletSDK
    constructor() {
        this.reset()
        // ignore error
        this.walletSDK = new WalletSDK()
    }
    public reset() {
        this.walletSDK = new WalletSDK()
    }
    setConnectivityProvider(): void {
        this.walletSDK.conectivityProvider = new ConnectivityProviderImpl()
    }
    build(): WalletAPI {
        return this.walletSDK
    }
}

// export class CLIWalletSDKBuilder implements Builder {
//     constructor(){}
// }

export class ServiceWorkerWalletBuilder implements WalletBuilder {
    public wallet: Wallet
    constructor() {
        this.reset()
        // ignore error
        this.wallet = new Wallet()
    }
    
    public reset() {
        this.wallet = new Wallet()
    }
    setCollectionManager(): void {
        
    }
    setConnectivityProvider(): void {
        this.wallet.connectivityProviders.push(new ConnectivityProviderImpl())
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
