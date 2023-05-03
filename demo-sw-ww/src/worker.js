import * as Y from 'yjs'
// import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
const ydoc = new Y.Doc()
const yarray = ydoc.getArray('test')

const broadcast = new BroadcastChannel('channel-123');
broadcast.postMessage({ type: 'MSG_ID', msg: "worker" });
broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'MSG_ID') {
        console.log(event.data.msg)
    }
  };
// const provider = new IndexeddbPersistence("docName4", ydoc)

// provider.on('synced', () => {
//     console.log('content from the database is loaded')
//     // self.postMessage({
//     //     answer: JSON.stringify(yarray.toJSON()),
//     // });
// })

const provider2 = new WebrtcProvider('wallet-worker-webrtc-maksim-34', ydoc, { password: 'UberNotSecureContactServer' })
provider2.on('synced', synced => {
    // NOTE: This is only called when a different browser connects to this client
    // Windows of the same browser communicate directly with each other
    // Although this behavior might be subject to change.
    // It is better not to expect a synced event when using y-webrtc
    yarray.push([navigator.userAgent])
    console.log('someboy synced!', synced, JSON.stringify(yarray.toJSON()))
})
// yarray.observe((yarrayEvent)=>{
//     yarrayEvent.target === yarray 
//     console.log(yarrayEvent.changes.delta)
// })


self.onmessage = ({ data: { question } }) => {
    console.log("test")
    if (!yarray) {
        console.log("yarrayEvent is empty", yarrayEvent)
        return
    }
    yarray.push([{ "content": question }])
    console.log(JSON.stringify(yarray.toJSON()))
    self.postMessage({
        answer: JSON.stringify(yarray.toJSON()),
    });
};