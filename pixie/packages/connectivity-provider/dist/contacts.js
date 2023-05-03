"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRTCConnection = void 0;
const Y = require("yjs");
const y_webrtc_1 = require("y-webrtc");
// import Peer =  require("simple-peer")
var Peer = require('simple-peer');
// Peer from 'simple-peer'
const uuid_1 = require("uuid");
class WebRTCConnection {
    constructor(docName, initiator) {
        this.id = (0, uuid_1.v4)();
        this.ydoc = new Y.Doc();
        this.syncer = new y_webrtc_1.WebrtcProvider(docName, this.ydoc, { signaling: ["wss://signaling.yjs.dev"] });
        this.contacts = this.ydoc.getArray("contacts");
        this.peer = new Peer({ initiator: initiator });
        if (!initiator) {
            this.contacts.observe(this.listenForInvites);
        }
        else {
            this.peer.on("signal", this.sendInvite);
        }
        this.peer.on("connect", this.onConnect);
    }
    onConnect() {
        this.ready = true;
    }
    createInvite(invite) {
        return { sender: this.id, payload: invite };
    }
    sendInvite(invite) {
        this.contacts.push([this.createInvite(invite)]);
    }
    filter(invite) {
        if (invite.sender === this.id) {
            return true;
        }
        return false;
    }
    listenForInvites(ev) {
        let msg;
        if (ev.changes.delta.length === 1) {
            msg = ev.changes.delta[0].insert[0];
        }
        else {
            msg = ev.changes.delta[1].insert[0];
        }
        if (this.filter(msg)) {
            return;
        }
        this.peer.signal(msg.payload);
    }
    pack(message) {
        return JSON.stringify(message);
    }
    Publish(message) {
        this.peer.send(this.pack(message));
    }
    Subscribe(cb) {
        this.peer.on("data", cb);
        return "";
    }
    Unsubscribe(token) {
    }
    Close() {
        this.syncer.destroy();
        this.peer.destroy();
    }
}
exports.WebRTCConnection = WebRTCConnection;
