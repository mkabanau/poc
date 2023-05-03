var Y = require('yjs')
var WebrtcProvider1 = require('y-webrtc').WebrtcProvider
var WebrtcProvider2 = require('y-webrtc').WebrtcProvider
Object.assign(global, { WebSocket: require('ws') });

import { v4 as uuidv4 } from 'uuid';


describe("webrtc with wepsocket bootstrap", () => {

    test("webrtc provider connect", async () => {

        let roomName = uuidv4()
        const ydoc1 = new Y.Doc()

        const ydoc2 = new Y.Doc()
        let contacts1 = ydoc1.getArray("contacts")
        contacts1.push([{ sender: "peer1", payload: "test" }])
        let contacts2 = ydoc2.getArray("contacts")
        contacts2.push([{ sender: "peer2", payload: "test" }])
        console.log("start")
        const provider1 = new WebrtcProvider1(roomName, ydoc1, { signaling: ['ws://localhost:3003'] } as any)
  
        provider1.on('status', event => {       
            console.log("synced 1 ")
            console.log(event.status) // logs "connected" or "disconnected"
        
        })


        await new Promise((resolve) => setTimeout(resolve, 2000))
               
        const provider2 = new WebrtcProvider2(roomName, ydoc2, { signaling: ['ws://localhost:3003'] } as any)
  
        provider2.on('status', event => {
            console.log("synced 2")
            console.log(event.status) // logs "connected" or "disconnected"  
        })

        await new Promise((resolve) => setTimeout(resolve, 1000))
    })
})