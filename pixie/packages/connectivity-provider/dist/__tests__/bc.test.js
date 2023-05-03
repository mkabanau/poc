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
const connectivity_provider_1 = require("../connectivity-provider");
const uuid_1 = require("uuid");
// import * as Peer from 'simple-peer'
// var wrtc = require('wrtc')
describe(("brodcast channel api connectivity provider"), () => {
    function NewMessage(payload) {
        return {
            id: (0, uuid_1.v4)(),
            type: "https://pixie.io/msg",
            payload: payload
        };
    }
    test("bc api connect", () => __awaiter(void 0, void 0, void 0, function* () {
        let cp = new connectivity_provider_1.ConnectivityProviderImpl();
        let conOpts1 = { connectionType: "BrodcastChannelAPI", channelName: "test1", target: "local" };
        let conn1 = cp.Connect(conOpts1);
        let conn2 = cp.Connect(conOpts1);
        let cb1 = (event) => { console.log(`client1 ${event === null || event === void 0 ? void 0 : event.data}`); };
        let cb2 = (event) => { console.log(`client2 ${event === null || event === void 0 ? void 0 : event.data}`); };
        let token1 = conn1.Subscribe(cb1);
        let token2 = conn2.Subscribe(cb2);
        let cb3 = (event) => { console.log(`should be canceled ${event === null || event === void 0 ? void 0 : event.data}`); };
        let token3 = conn2.Subscribe(cb3);
        conn1.Publish(NewMessage("test"));
        yield new Promise((resolve) => { setTimeout(resolve, 500); });
        conn2.Unsubscribe(token3);
        conn1.Publish(NewMessage("test2"));
        yield new Promise((resolve) => { setTimeout(resolve, 500); });
        conn1.Close();
        conn2.Close();
    }));
});
