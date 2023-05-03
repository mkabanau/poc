
Object.assign(global, { WebSocket: require('ws') });
Object.assign(global, {crypto: require("crypto").webcrypto})
console.log(this.crypto)

var Y = require('yjs')
var WebrtcProvider = require('y-webrtc').WebrtcProvider

var wrtc = require('wrtc')
// require("crypto")
let roomName = "test"

async function main(){
    const ydoc1 = new Y.Doc()
    let contacts1 = ydoc1.getArray("contacts")
    contacts1.push([{ sender: "peer1", payload: "test" }])
    
    console.log("start")
    const provider1 = new WebrtcProvider(roomName, ydoc1, { signaling: ['ws://localhost:3003'], peerOpts: {wrtc: wrtc ,sdpTransform: function (sdp) { console.log(sdp); return sdp },}, password: 'optional-room-password' })
    
    provider1.on('status', event => {       
        console.log("synced 1 ")
        console.log(event.status) // logs "connected" or "disconnected"
    
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("client 1")
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 10000))
        contacts1.push([{ sender: "peer1", payload: "ping" }])
        console.log(contacts1.toJSON())
    }
}

main()
console.log("finish")