import {log} from 'logger'
import {ConnectivityProviderImpl} from "connectivity-provider"
import {ConnectionOptions, Connection,Message} from "wallet-api"
import { CollectionManagerImpl } from 'collection-manager'
import {resolver,rawScheme} from './resolver'
import {v4} from "uuid"

log("start web worker for doppler-clone collection manager")

let cp = new ConnectivityProviderImpl()
let opts:ConnectionOptions = {
    connectionType: "BrodcastChannelAPI",
    channelName:"doppler-clone",
    target:"webworker",
    discoveryService:""
}
let connection:Connection = cp.Connect(opts)
// register web worker
// import resolver
// init storage provider
// import syncer




self.postMessage({
    answer: "webworker first message",
});


import { DopplerAPI } from "./datasource"




let datasource = new DopplerAPI("doppler-clone-collection-8")


let cm = new CollectionManagerImpl(rawScheme, resolver, {datasource})

// let init = ()=>{
//     log("init datasource")
//     datasource.createWorkspace("test2")
//     datasource.addProject("paylink2")
// }

// setTimeout(init, 1000)


async function process(msg:any) {
    let req = JSON.parse(msg.data) as Message

    let response:any  
    switch (req.reqType) {
        case "Add":
            response =  cm.Add(req)
            break
        case "Query": 
            response =  cm.Query(req)
            break
        default:
            throw Error(`such method ${req.type} is not supported`)
    }
    connection.Publish(response)
}   

connection.Subscribe(process)
