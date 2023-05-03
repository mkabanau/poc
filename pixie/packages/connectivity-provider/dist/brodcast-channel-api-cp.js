"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCConnection = void 0;
const uuid_1 = require("uuid");
// add notice https://github.com/pubkey/broadcast-channel/blob/master/
class BCConnection {
    constructor(channelName) {
        //map<cancelToken, abortcontroller>
        this.cancelSubscribeMap = new Map();
        this.brodcastChannel = new BroadcastChannel(channelName);
    }
    pack(message) {
        return JSON.stringify(message);
    }
    Publish(message) {
        this.brodcastChannel.postMessage(this.pack(message));
    }
    Subscribe(cb) {
        const controller = new AbortController();
        this.brodcastChannel.addEventListener("message", cb, { signal: controller.signal });
        let token = (0, uuid_1.v4)(); //globalThis.crypto.randomUUID()
        this.cancelSubscribeMap.set(token, controller);
        return token;
    }
    Unsubscribe(token) {
        let controller = this.cancelSubscribeMap.get(token);
        if (controller) {
            controller.abort();
        }
    }
    Close() {
        this.cancelSubscribeMap.forEach((contoller) => {
            contoller.abort();
        });
        this.brodcastChannel.close();
    }
}
exports.BCConnection = BCConnection;
