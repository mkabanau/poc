"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Director = void 0;
class Director {
    setBuilder(builder) {
        this.builder = builder;
    }
    buildDopplerCloneWebWallet() {
        // keyManager to hold private keys for current wallet instance in indexeddb
        this.builder.setKeyManager();
        // setCollectionManager for Doppler types
        this.builder.setCollectionManager();
        // set WebRTC to sync messages accross devices. i would call it even SyncProvider
        this.builder.setConnectivityProvider();
        // how exactly 
        this.builder.setStorageProvider();
    }
    buildDopplerCloneServerWallet() {
        // local file as .pixie-wallet folder with credentials
        this.builder.setKeyManager();
        // setCollectionManager for Doppler types
        this.builder.setCollectionManager();
        // set WebRTC
        this.builder.setConnectivityProvider();
    }
}
exports.Director = Director;
