// import * as Y from 'yjs'
// //import { WebrtcProvider } from 'y-webrtc'
// import { WebsocketProvider } from 'y-websocket'
// import { IndexeddbPersistence } from 'y-indexeddb'

// require("fake-indexeddb/auto");
// // Object.assign(global, { WebSocket: require('ws') });

// test('connect to websocket server', (done) => {

  
//   const ydoc = new Y.Doc()
  
//   // this allows you to instantly get the (cached) documents data
//   const indexeddbProvider = new IndexeddbPersistence('count-demo', ydoc)
//   const websocketProvider = new WebsocketProvider(
//     'ws://localhost:1234', 'count-demo', ydoc, { WebSocketPolyfill: require('ws') }
//   )
  
//   indexeddbProvider.whenSynced.then(() => {
//     console.log('loaded data from indexed db')
    
//       // Sync clients with the y-websocket provider

//     const yarray = ydoc.getArray('count')
  
//     // observe changes of the sum
//     yarray.observe(event => {
//       // print updates when the data changes
//       console.log('new sum: ' + yarray.toArray().reduce((a,b) => a + b))
//       // websocketProvider.disconnect()
//       // indexeddbProvider.clearData()
//       // websocketProvider.once('connection-close',()=>{
//       //   console.log("closed")
//       //   done()
//       // })
//       done()
//     })
    
//     // add 1 to the sum
//   yarray.push([1]) // => "new sum: 1"
//   })
  
//   // Sync clients with the y-webrtc provider.
//   //const webrtcProvider = new WebrtcProvider('count-demo', ydoc)
  

  
//   // array of numbers which produce a sum
// });