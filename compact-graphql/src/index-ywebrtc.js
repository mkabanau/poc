import {Doc} from 'yjs'
const ydoc = new Doc()
const yarray = ydoc.getArray('test')
yarray.push(["testsize2"])
console.log('size!', JSON.stringify(yarray.toJSON()))

const provider2 = new WebrtcProvider('wallet-worker-webrtc-maksim2', ydoc, { password: 'UberNotSecureContactServer' })

provider2.on('synced', async (synced) => {
    console.log("synced", synced)
})