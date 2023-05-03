var Peer = require("simple-peer")
var wrtc = require("wrtc")
var Y = require('yjs')
var WebrtcProvider = require('y-webrtc').WebrtcProvider
Object.assign(global, { WebSocket: require('ws') });

describe("test webrtc", () => {

    test("webrtc connect", (done) => {


        const ydoc1 = new Y.Doc()
        //const provider1 = new WebrtcProvider('your-room-name-too-long-to-be-real4', ydoc1, { signaling: ['wss://signaling.yjs.dev'] } as any)
        //const ydoc2 = new Y.Doc()
        //const provider2 = new WebrtcProvider('your-room-name-too-long-to-be-real4', ydoc2, { signaling: ['wss://signaling.yjs.dev'] } as any)
        let contacts1 = ydoc1.getArray("contacts")
        //let contacts2 = ydoc2.getArray("contacts")

        new Promise((resolve) => setTimeout(resolve, 1000))

        var peer1 = new Peer({ initiator: true, wrtc: wrtc, config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] }, channelName: "uber-secure-test" })
        var peer2 = new Peer({ wrtc: wrtc, config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] }, channelName: "uber-secure-test" })
        let peer1SDPisUsed = false
        let peer2SDPisUsed = false
        contacts1.observe((event) => {
            //console.log(JSON.stringify(event.changes.delta))
            let msg
            if (event.changes.delta.length === 1) {
                msg = event.changes.delta[0].insert[0]
            } else {
                msg = event.changes.delta[1].insert[0]
            }
            if (msg.sender === "peer1") {
                if (!peer1SDPisUsed) {
                    peer2.signal(msg.payload)
                    peer1SDPisUsed = true
                }
            } else {
                if (!peer2SDPisUsed) {
                    peer1.signal(msg.payload)
                    peer2SDPisUsed = true
                }
            }
            console.log("contacts", JSON.stringify(contacts1.toJSON()))

        })
        // contacts1.observe((event) => {
        //     console.log(JSON.stringify(event.changes.delta))
        //     let msg
        //     if (event.changes.delta.length === 1) {
        //          msg = event.changes.delta[0]
        //     }else {
        //         msg = event.changes.delta[1]
        //     }
        //     if (msg.sender === "peer2"){
        //          return
        //     }
        //     peer2.signal(msg.payload)           
        // })
        let con1 = false
        let con2 = false
        peer1.on('signal', data => {
            // when peer1 has signaling data, give it to peer2 somehow
            console.log("signal from peer1 to peer2", JSON.stringify(data))
            if (!con1) {
                contacts1.push([{ sender: "peer1", payload: data }])
                con1 = true
            }
            //peer2.signal(data)
        })

        peer2.on('signal', data => {
            // when peer2 has signaling data, give it to peer1 somehow

            console.log("signal from peer2 to peer1", JSON.stringify(data))
            if (!con2) {
                contacts1.push([{ sender: "peer2", payload: data }])
                con2 = true
            }
        })

        peer1.on('connect', () => {
            // wait for 'connect' event before using the data channel
            peer1.send('hey peer2, how is it going?')
        })
        peer2.on('connect', () => {
            console.log("Ready")
        })
        peer2.on('data', data => {
            // got a data channel message
            console.log('got a message from peer1: ' + data)
            peer2.send("i got your message.")
        })

        peer1.on('data', data => {
            console.log('got a message from peer2: ' + data)


            peer1.destroy()
            peer2.destroy()
            done()
        })

    })
})