import {Doc} from 'yjs'
const ydoc = new Doc()
const yarray = ydoc.getArray('test')
yarray.push(["testsize"])
console.log('size!', JSON.stringify(yarray.toJSON()))