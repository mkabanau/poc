import { ConnectionOptions, Message } from "wallet-api"
import {ConnectivityProviderImpl} from "../connectivity-provider"
import {v4} from "uuid"
// import * as Peer from 'simple-peer'
// var wrtc = require('wrtc')

describe(("brodcast channel api connectivity provider"), ()=>{
 
    function NewMessage(payload:string):Message {
      return {
        id: v4(),
        type: "https://pixie.io/msg",
        payload: payload
      }
    }

    test("bc api connect", async ()=>{
        let cp = new ConnectivityProviderImpl()
        let conOpts1 = {connectionType:"BrodcastChannelAPI", channelName:"test1", target:"local"} as ConnectionOptions
        let conn1 = cp.Connect(conOpts1)
        let conn2 = cp.Connect(conOpts1)

        let cb1 = (event) => {console.log(`client1 ${event?.data}`)}
        let cb2 = (event) => {console.log(`client2 ${event?.data}`)}
        let token1 = conn1.Subscribe(cb1)
        let token2 = conn2.Subscribe(cb2)
        let cb3 = (event) => {console.log(`should be canceled ${event?.data}`)}
        let token3 = conn2.Subscribe(cb3)

        conn1.Publish(NewMessage("test"))
        await new Promise((resolve)=>{setTimeout(resolve, 500)})
        conn2.Unsubscribe(token3)
        conn1.Publish(NewMessage("test2"))
        await new Promise((resolve)=>{setTimeout(resolve, 500)})
        conn1.Close()
        conn2.Close()
    })
})