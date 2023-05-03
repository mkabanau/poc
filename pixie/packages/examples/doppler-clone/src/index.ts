import { log } from "logger"
import { registerServiceWorker } from "service-worker"
import { CreateWebWorker, HandleWebWorkerMessages } from "web-worker"
import { Message, Connection, ConnectionOptions } from 'wallet-api'
import { ConnectivityProviderImpl } from "connectivity-provider"
import { NewRequestMessage } from "collection-manager"
import { v4 } from 'uuid'
// let isWalletSDKInstalled = false
// let isWalletInstalled = false
// let isWalletUnlocked = false
// let isWorkerLoaded = false
log("start shell app for doppler-clone demo")
// log("is wallet-sdk inited?", yes(isWalletSDKInstalled))
// log("is wallet installed?", yes(isWalletInstalled))
// log("is wallet unlocked?", yes(isWalletUnlocked))
// log("is worker loaded?", yes(isWorkerLoaded))
// import Peer from 'simple-peer'

// new Peer()

function yes(enabled: boolean): string {
    return enabled ? "yes" : "no"
}

let cp = new ConnectivityProviderImpl()
let opts: ConnectionOptions = {
    connectionType: "BrodcastChannelAPI",
    channelName: "doppler-clone",
    target: "webworker",
    discoveryService: ""
}
let connection: Connection = cp.Connect(opts)

let opts2: ConnectionOptions = {
    connectionType: "WebRTC",
    channelName: "contactsToEstablish",
    target: "peers",
    discoveryService: "y-webrtc",
    initiator: false
}

connection.Subscribe((ev) => { log("message from web-worker via ConnectivityProvider", ev.data) })

let connection2: Connection = cp.Connect(opts2)
connection2.Subscribe((ev) => { log("message from another peer via ConnectivityProvider Contacts", JSON.stringify(ev)) })

let source0 = `
mutation CreateWorkspace($name:String) {
    createWorkspace(name:$name) {
        name
    }
}
`
let variableValues0:any = {
    name: "demo-from-browser-client"
}

let source1 = `query Workspace2 {
    workspace {
        id
        name
        projects {
          id
          name
          envs {
            name
            config {
                key
                value
            }
          }
        }
    }
}`

let source2 = `
mutation AddSecret($projectName:String, $envName:String, $key:String, $value:String) {
    addSecret(projectName:$projectName, envName:$envName, key:$key, value:$value) {
        name
        config {
            key
            value
        }
    }
}
`

let variableValues2: any = {
    projectName: "paylink",
    envName: "dev",
    key: "TEST_KEY",
    value: v4()
}

let source3 = `
mutation AddProject($name:String) {
    addProject(name:$name) {
        name
    }
}
`
let variableValues3:any = {
    name: "paylink"
}

async function main() {

    await registerServiceWorker("./sw.js", "/")
    let worker = CreateWebWorker({ scriptURL: "./worker.js" })
    HandleWebWorkerMessages(worker, (ev) => { log("message from web-worker via postMessage", JSON.stringify(ev.data)) })
    await new Promise((resolve) => { setTimeout(resolve, 3000) })

    log("create workspace")
    connection.Publish(NewRequestMessage("Add", source0, variableValues0))
    await new Promise((resolve) => { setTimeout(resolve, 1000) })
    log("create project")
    connection.Publish(NewRequestMessage("Add", source3, variableValues3 ))
    await new Promise((resolve) => { setTimeout(resolve, 1000) })
    log("query workspace")
    connection.Publish(NewRequestMessage("Query", source1))

    await new Promise((resolve) => { setTimeout(resolve, 1000) })
    log("add secret")
    connection.Publish(NewRequestMessage("Add", source2, variableValues2))
    await new Promise((resolve) => { setTimeout(resolve, 1000) })
    log("query workspace again")
    connection.Publish(NewRequestMessage("Query", source1))

}

main()
// import  builder
// build wallet-sdk
// wallet-sdk connect
// wallet-sdk load collection manager