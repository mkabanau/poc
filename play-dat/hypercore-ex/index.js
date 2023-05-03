import Hypercore from 'hypercore'
import cenc from "compact-encoding"
const core = new Hypercore('./directory') // store data in ./directory
await core.ready()

let writefile = {
    "cid": "0x00001",
    "filename": "chatimage.jpg",
    "content": "01011001101",
    "timestamp": new Date()
}

let buf = cenc.encode(cenc.json, writefile)
await core.append(buf)

const block = await core.get(0)
console.log(block)
let readfile = cenc.decode(cenc.json, block)
console.log(readfile)

const info = await core.info()


const fullStream = core.createReadStream()

for await (const data of fullStream) {
  console.log('data:', cenc.decode(cenc.json, data))
}
const hash = await core.treeHash()
console.log("hash:", hash)
await core.close()
console.log(info)