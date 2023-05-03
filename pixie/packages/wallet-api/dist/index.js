"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
class Wallet {
    constructor() {
        this.storageProviders = [];
        this.connectivityProviders = [];
        this.collectionManagers = [];
        this.keyManagers = [];
    }
    Unlock(pwd) {
    }
    Lock() {
    }
    Connect() {
    }
    Import(blob) {
        let walletObj = JSON.parse(blob);
        return Object.assign(new Wallet(), walletObj);
    }
    Export() {
        return JSON.stringify(this);
    }
    Add(req) {
    }
    Query(req) {
        return { id: "", payload: "", type: "" };
    }
    Remove(req) {
        return { id: "", payload: "", type: "" };
    }
    Verify() {
    }
    Issue() {
    }
    Proof() {
    }
    Derive() {
    }
}
exports.Wallet = Wallet;
