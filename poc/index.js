const Y = require('yjs')
//import { WebrtcProvider } from 'y-webrtc'
const WebsocketProvider = require('y-websocket').WebsocketProvider

let main = async () => {
    const ydoc = new Y.Doc()

    // this allows you to instantly get the (cached) documents data
    const websocketProvider = new WebsocketProvider(
        'ws://localhost:1234', 'count-demo', ydoc, { params:{sig:"test"}, WebSocketPolyfill: require('ws') }
    )

    let rootmap = ydoc.getMap("root")


    rootmap.observe(ymapEvent => {
        ymapEvent.target === rootmap // => true
    
        // Find out what changed: 
        // Option 1: A set of keys that changed
        ymapEvent.keysChanged // => Set<strings>
        // Option 2: Compute the differences
        ymapEvent.changes.keys // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

        // sample code.
        ymapEvent.changes.keys.forEach((change, key) => {
            if (change.action === 'add') {
                console.log(`Property "${key}" was added. Initial value: "${rootmap.get(key)}".`)
            } else if (change.action === 'update') {
                console.log(`Property "${key}" was updated. New value: "${rootmap.get(key)}". Previous value: "${change.oldValue}".`)
            } else if (change.action === 'delete') {
                console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
            }
        })
    })

    rootmap.set('key', 'value') // => Property "key" was added. Initial value: "value".
    rootmap.set('key', 'new') // => Property "key" was updated. New value: "new". Previous value: "value".
    rootmap.delete('key') // => Property "key" was deleted. New value: undefined. Previous Value: "new".

    rootmap.set(Date.now().toString(), "testme")


    const nestedMap = new Y.Map()
    nestedMap.set("test", "test")
    rootmap.set("nestedmap", nestedMap)


    const subDoc = new Y.Doc()
    const yarray = subDoc.getArray("testarray")
    yarray.insert(0,["create Document-"+Date.now().toString()])
    rootmap.set("actions", subDoc)
    await timer(500)

    // console.log("full doc", r)


    

    process.exit(1);
}
const timer = ms => new Promise(res => setTimeout(res, ms));
main()