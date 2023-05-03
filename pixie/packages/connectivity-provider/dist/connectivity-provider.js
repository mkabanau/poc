"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectivityProviderImpl = void 0;
const brodcast_channel_api_cp_1 = require("./brodcast-channel-api-cp");
const contacts_1 = require("./contacts");
class ConnectivityProviderImpl {
    // private brodcastChannel: globalThis.BroadcastChannel
    constructor() {
    }
    Connect(opts) {
        switch (opts.connectionType) {
            case "BrodcastChannelAPI":
                return new brodcast_channel_api_cp_1.BCConnection(opts.channelName);
            case "WebRTC":
                //throw Error(`${opts.connectionType} is not supported`)
                return new contacts_1.WebRTCConnection(opts.channelName, opts === null || opts === void 0 ? void 0 : opts.initiator);
            default:
                throw Error(`${opts.connectionType} is not supported`);
        }
    }
}
exports.ConnectivityProviderImpl = ConnectivityProviderImpl;
