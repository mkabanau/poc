"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBuilder = void 0;
const wallet_api_1 = require("wallet-api");
class DefaultBuilder {
    constructor() {
        this.reset();
    }
    reset() {
        this.wallet = new wallet_api_1.Wallet();
    }
    setCollectionManager() {
    }
    setConnectivityProvider() {
    }
    setStorageProvider() {
    }
    setCredentialManager() {
    }
    setKeyManager() {
    }
    build() {
        return this.wallet;
    }
}
exports.DefaultBuilder = DefaultBuilder;
