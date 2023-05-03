import { WalletBuilder } from "./builder";

export class Director {
    private builder:WalletBuilder

    public setBuilder(builder:WalletBuilder){
        this.builder = builder;
    }

    public buildDopplerCloneWebWallet(){
        // keyManager to hold private keys for current wallet instance in indexeddb
        this.builder.setKeyManager()
        // setCollectionManager for Doppler types
        this.builder.setCollectionManager()
        // set WebRTC to sync messages accross devices. i would call it even SyncProvider
        this.builder.setConnectivityProvider()
        // how exactly 
        this.builder.setStorageProvider()
    }

    public buildDopplerCloneServerWallet(){
        // local file as .pixie-wallet folder with credentials
        this.builder.setKeyManager()
        // setCollectionManager for Doppler types
        this.builder.setCollectionManager()
        // set WebRTC
        this.builder.setConnectivityProvider()
    }
}