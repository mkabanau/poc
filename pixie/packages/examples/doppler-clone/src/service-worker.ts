import {log} from 'logger'
log("start service worker for implementation of wallet API")
// imports wallet builder

import {ServiceWorkerWalletBuilder} from './builder'

let builder = new ServiceWorkerWalletBuilder()
builder.setConnectivityProvider()
builder.setCollectionManager()
let wallet = builder.build()
wallet.Unlock("UberSecureAsAlways")
