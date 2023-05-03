"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSDK = void 0;
const wallet_api_1 = require("wallet-api");
const uuid_1 = require("uuid");
class WalletSDK {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    Unlock(pwd) {
    }
    Lock() {
    }
    Connect() {
        this.connection.Subscribe(this.process);
    }
    Import(blob) {
        let walletObj = JSON.parse(blob);
        return Object.assign(new wallet_api_1.Wallet(), walletObj);
    }
    Export() {
        return JSON.stringify(this);
    }
    Add(req) {
        req.reciver = "wallet";
        req.sender = this.id;
        this.connection.Publish(req);
    }
    Query(req) {
        req.reciver = "wallet";
        req.sender = this.id;
        this.connection.Publish(req);
        return req;
    }
    Remove(req) {
        return req;
    }
    Verify() {
    }
    Issue() {
    }
    Proof() {
    }
    Derive() {
    }
    process(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = JSON.parse(msg.data);
            console.log("wallet-sdk");
        });
    }
}
exports.WalletSDK = WalletSDK;
