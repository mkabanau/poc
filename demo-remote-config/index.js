#! /usr/bin/env node

const { program } = require('commander')
const create = require("./commands/workspace")
const Y = require("yjs")
const { resolve } = require('path')

const nacl = require("tweetnacl")
const multibase = require("multibase")
const WebsocketProvider = require('y-websocket').WebsocketProvider

// const { uuid } = require('uuidv4')
// const chalk = require('chalk').Chalk

var ydoc = new Y.Doc()

var docName = "localdocument"

const wsProvider = new WebsocketProvider('ws://localhost:1234', docName, ydoc, { WebSocketPolyfill: require('ws') })
let waitSyncToComplete = new Promise((resolve, reject) => {

    wsProvider.on('status', event => {
        console.log(event.status) // logs "connected" or "disconnected"
        resolve()
    })
})
var walletdid = "did:pixie:1"

var walletdoc = new Y.Doc()


const wsProvider2 = new WebsocketProvider('ws://localhost:1234', walletdid, walletdoc, { WebSocketPolyfill: require('ws') })
let waitSyncToComplete2 = new Promise((resolve, reject) => {

    wsProvider2.on('status', event => {
        console.log(event.status) // logs "connected" or "disconnected"
        resolve()
    })
})
// const LeveldbPersistence = require('y-leveldb').LeveldbPersistence



// const persistenceDir = './storage-location'
// // persistence.on("synced", ()=>{
// //     console.log("content from database is loaded")
// // })

// var persistence = null
// if (typeof persistenceDir === 'string') {
//     console.info('Persisting documents to "' + persistenceDir + '"')
//     // @ts-ignore
//     const LeveldbPersistence = require('y-leveldb').LeveldbPersistence
//     const ldb = new LeveldbPersistence(persistenceDir)
//     persistence = {
//         provider: ldb,
//         bindState: async (docName, ydoc) => {
//             const persistedYdoc = await ldb.getYDoc(docName)
//             const newUpdates = Y.encodeStateAsUpdate(ydoc)
//             ldb.storeUpdate(docName, newUpdates)
//             Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
//             ydoc.on('update', update => {
//                 ldb.storeUpdate(docName, update)
//             })
//         },
//         writeState: async (docName, ydoc) => { }
//     }
// }

// const getYDoc = (docname) => {
//     const doc = new Y.Doc()
//     if (persistence !== null) {
//         persistence.bindState(docname, doc)
//     }
//     return doc
// }


let init = async () => {
    await waitSyncToComplete
    await waitSyncToComplete2
    await timer(1000)
    //ydoc = await getYDoc(docName)
    // await ydoc.whenLoaded
}
let finish = async () => {
    // const newUpdates = Y.encodeStateAsUpdate(ydoc)
    // await persistence.storeUpdate(docName, newUpdates)
    // Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
    wsProvider.disconnect()
    ydoc.destroy()
    await timer(1000)
    process.exit(0)
}
const timer = ms => new Promise(res => setTimeout(res, ms));


const Workspaces = "workspaces"
const Projects = "projects"
const Enviroments = "envs"
const Configs = "configs"
const Secrets = "secrets"
const Scope = "scope"
const setup = "setup"
const Members = "members"
const Id = "id"
const Name = "name"
const CurrentWorkspace = "CurrentWorkspace"

program.name('doppler-clone').version('0.1.0').option('-d, --debug', 'display some debugging')

const walletCmd = program.command("wallet")
walletCmd.command("create <name>").action(async (name)=>{
    await init()
    let wallet = walletdoc.getMap(Wallet)
    let auth = new Y.Array()
    // auth.insert(0, [{ id: "#key-1" }])
    let verMethod = new Y.Array();
    let keyPair = GenerateKey()
    let keyId = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, keyPair.publicKey))
    let authMethod = {
        id: walletdid + "#" +keyId,
        type: "Ed25519VerificationKey2018",
        controller: walletdid,
        publicKeyMultibase: keyId
    }
    verMethod.insert(0, [authMethod])
    auth.insert(0, [authMethod.id])
    wallet.set("id", walletdid)
    wallet.set("name", name)
    wallet.set(Authentication, auth)
    wallet.set(VerificationMethod, verMethod)
    let keys = new Y.Array();
    authMethod.secretKey = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, keyPair.secretKey))
    keys.insert(0, [authMethod])
    wallet.set(Keys,keys)
    
    console.log("wallet", wallet.toJSON())
    await finish()
})

walletCmd.command("list").action(async ()=>{
    await init()
    let wallet = walletdoc.getMap(Wallet)
    console.log("wallet", wallet.toJSON())
    await finish()
})

const workspacesCmd = program.command(Workspaces)

workspacesCmd.command("create <name>").description("register new workspace with name").action(async (name) => {
    await init()
    let wallet = walletdoc.getMap(Wallet)
    let verMethod = wallet.get(VerificationMethod).get(0)
    console.log(verMethod)
 
    let workspaceMap = ydoc.getMap(name)
    //workspaceMap.set(Id, uuid())
    workspaceMap.set(Name, name)
    workspaceMap.set("dashboard", "http://localhost:3000")
    ydoc.getMap().set(CurrentWorkspace, name)
    let members = new Y.Array()
    members.insert(0, [verMethod.id])
    let projects = new Y.Array()
    //projects.insert(0, ["test"])projects
    let scope = new Y.Map()
    workspaceMap.set(Members, members)
    workspaceMap.set(Projects, )
    workspaceMap.set(Scope, scope)
    console.log(workspaceMap.toJSON())
    console.log(`workspace with ${name} is created`)
    await finish()
})

function CreateWorkspace(name) {
    let workspace = new Y.Map()
    workspace.set(Id, uuid())
    workspace.set("name", name)
    workspace.set(Members, new Y.Array())
    workspace.set(Projects, new Y.Array())
    return workspace
}

workspacesCmd.command("list [name]").action(async (name) => {
    await init()
    console.log(name)
    let workspaceName = name
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    console.log("json", workspacesMap.toJSON())
    await finish()
})



const projectsCmd = program.command(Projects)
projectsCmd.command("describe [name]").action(async (name) => {
    await init()
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let projects = workspacesMap.get(Projects)
    //console.log("json",  projects.toJSON())
    if (name) {
        projects.forEach((project, index) => {
            //   console.log(project)
            //   console.log("project name", project.get("name"))
            if (project.get("name") === name) {
                console.log("project name", project.get("name"))
                //let envs = Object.assign(new Y.Map(), project.envs)
                project.get("envs").forEach((env, index) => {
                    console.log(env.toJSON())
                })
            }
        })
    }
    await finish()
})

projectsCmd.command("create <name>").action(async (name) => {
    await init()
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let projects = workspacesMap.get(Projects)

    projects.insert(0, [createProject(name)])
    console.log("all projects", projects.toJSON())
    projects.get(0).get("envs").forEach(env=>{
        console.log("current project config", env.toJSON())
    })
    await finish()
})

const DevEnv = "dev"
const StgEnv = "staging"
const ProdEnv = "prod"

function createProject(name) {
    let envs = new Y.Array()
    envs.insert(0, [createEnv(DevEnv), createEnv(StgEnv), createEnv(ProdEnv)])
    let pmap = new Y.Map()
    pmap.set("name", name)
    pmap.set("envs", envs)
    return pmap
}

function createEnv(name) {
    let envMap = new Y.Map()
    envMap.set("name", name)
    let config = new Y.Map()
    envMap.set("config", config)
    return envMap  
}


const Wallet = "Wallet"
const VerificationMethod = "VerififcationMethod"
const Authentication = "Authentication"
const CollectionManager = "CollectionManager"
const Keys = "keys"

const open = require('open');

const membersCmd = program.command(Members)
membersCmd.command("add <name>").action(async (name) => {
    await init()

    let wallet = walletdoc.getMap(Wallet)

    let keyPair = GenerateKey()
    let keyId = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, keyPair.publicKey))
    let authMethod = {
        id: walletdid + "#" +keyId,
        type: "Ed25519VerificationKey2018",
        controller: walletdid,
        publicKeyMultibase: keyId
    }

    wallet.get(Authentication).insert(0, [authMethod])
    authMethod.secretKey = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, keyPair.secretKey))
    wallet.get(Keys).insert(0, [authMethod])

    console.log(wallet.toJSON)

    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)

    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let members = workspacesMap.get(Members)
    members.insert(0, [authMethod.id])
    console.log("json", members.toJSON())

    let msg = {
        workspace: workspaceName
    }
    let message = new TextEncoder().encode(JSON.stringify(msg))
    let signedMessage = nacl.sign(message, keyPair.secretKey)
    let sig = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, signedMessage))
    console.log("invite", "http://localhost:3000/" + "?sig=" + sig )
    open("http://localhost:3000/" + "?sig=" + sig )
    // await finish()
})

membersCmd.command("remove <name>").action(async (name) => {
    await init()

    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)

    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let members = workspacesMap.get(Members)secrets
    console.log("json", members.toJSON())
    await finish()
})

membersCmd.command("list").action(async () => {
    await init()
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let members = workspacesMap.get(Members)
    console.log("json", members.toJSON())
    await finish()
})

const setupCmd = program.command("setup <project> <env>").description("configure project and env context").action(async (project, env) => {
    await init()
    let path = process.env.PWD
    console.log(path)
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let scopeMap = workspacesMap.get(Scope)
    let scope = new Y.Map()
    scope.set("path", path)
    scope.set("project", project)
    scope.set("env", env)
    scopeMap.set(path, scope)
    await finish()
})

const secretsCmd = program.command(Secrets)
secretsCmd.command("set <values...>").action(async (values) => {
    await init()
    let path = process.env.PWD
    console.log(path)
    console.log(values)
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let scopeMap = workspacesMap.get(Scope)
    let scope = scopeMap.get(path)
    console.log("context", scope.toJSON())
    let projects = workspacesMap.get(Projects)
    projects.forEach((project, index) => {
        //   console.log(project)
        //   console.log("project name", project.get("name"))
        if (project.get("name") === scope.get("project")) {
            console.log("project name", project.get("name"))
            //let envs = Object.assign(new Y.Map(), project.envs)
            project.get("envs").forEach((env, index) => {
                if (env.get("name") === scope.get("env")) {
                    console.log(env.toJSON())
                    let config = env.get("config")
                    values.forEach((value) => {
                        let params = value.split("=")
                        config.set(params[0], params[1])

                    })
                }
            })
        }
    })
    await finish()
})

const { spawn, exec, fork } = require('child_process');

program.command("run").action(async () => {
    await init()
    let args = program.rawArgs
    let index = args.indexOf("--");
    let command = args.slice(index + 1, args.length)
    console.log(command)
    let envs = process.env

    let path = process.env.PWD
    console.log(path)
    let workspaceName
    if (!workspaceName) {
        workspaceName = ydoc.getMap().get(CurrentWorkspace)
    }
    let workspacesMap = ydoc.getMap(workspaceName)
    if (program.opts().debug) {
        debugMap(workspacesMap)
    }
    let scopeMap = workspacesMap.get(Scope)
    let scope = scopeMap.get(path)
    console.log("context", scope.toJSON())
    let projects = workspacesMap.get(Projects)
    projects.forEach((project, index) => {
        //   console.log(project)
        //   console.log("project name", project.get("name"))
        if (project.get("name") === scope.get("project")) {
            console.log("project name", project.get("name"))
            //let envs = Object.assign(new Y.Map(), project.envs)
            project.get("envs").forEach((env, index) => {
                if (env.get("name") === scope.get("env")) {
                    console.log(env.toJSON())
                    let config = env.get("config")
                    for (const [key, value] of config) {
                        envs[key] = value
                    }
                }
            })
        }
    })
    //https://stackoverflow.com/questions/21326429/how-to-replace-node-js-process-with-spawned-child
    // https://nodejs.org/api/child_process.html#optionsstdio
    // exec(command.join(" "), {env:envs})
    let output
    if (command.length === 1) {
        output = spawn(command[0], {
            detached: true,
            env: envs,
            stdio: 'inherit'//['inherit', null, null, null, 'inherit']//['ignore', 'inherit', "inherit" ] //'inherit' 
        })
    } else {
        output = spawn(command[0], command.slice(1), {
            detached: true,
            env: envs,
            stdio: 'inherit'//['inherit', null, null, null, 'inherit'] // ['ignore', 'pipe', '&1'] 
        })
    }

    output.stdout.pipe(process.stdout)
    output.unref()
    // output.stdout.on(
    //     "data",(data) => {
    //         console.log(`stdout: ${data}`)publicKey
    // output.stderr.on(
    //     "data",(data) => {
    //         console.log(`stderr: ${data}`)
    //     }
    // )

    await finish()
})


function debugMap(map) {
    console.log("debub map")
    map.observeDeep((events) => {
        events.forEach((event) => {
            console.log(event)
        })
    })
    // map.observe(ymapEvent => {
    //     //ymapEvent.target === ymap // => true

    //     // Find out what changed: 
    //     // Option 1: A set of keys that changed
    //     ymapEvent.keysChanged // => Set<strings>
    //     // Option 2: Compute the differences
    //     ymapEvent.changes.keys // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

    //     // sample code.
    //     ymapEvent.changes.keys.forEach((change, key) => {
    //         if (change.action === 'add') {
    //             console.log(`Property "${key}" was added. Initial value: "${map.get(key)}".`)
    //         } else if (change.action === 'update') {
    //             console.log(`Pr/ecosystem/connection-provideroperty "${key}" was updated. New value: "${map.get(key)}". Previous value: "${change.oldValue}".`)
    //         } else if (change.action === 'delete') {
    //             console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    //         }
    //     })
    // })
}

program.showHelpAfterError();

async function main() {

    await program.parseAsync(process.argv)
}

// GenerateKey()
main()

function GenerateKey() {
    let keyPair = nacl.sign.keyPair()
    // console.log(keyPair.publicKey)
    // console.log("base64",encodeBase64(keyPair.publicKey))
    let multibasePK = new TextDecoder().decode(multibase.encode(multibase.names.base64.name, keyPair.publicKey))
    //  console.log("multibase base64", multibasePK)
    let decodedPK = multibase.decode(multibasePK)
    console.log(decodedPK)
    if (decodedPK.toString() == keyPair.publicKey.toString()) {
        console.log("public key is restored")
    }
    let message = new TextEncoder().encode("message to sign")
    let signedMessage = nacl.sign(message, keyPair.secretKey)

    let verifiedMessage = nacl.sign.open(signedMessage, decodedPK)
    if (verifiedMessage?.toString() === message.toString()) {
        console.log("message verified=>", new TextDecoder().decode(verifiedMessage))
    }
    // console.log("multibase",new TextDecoder().decode(multibase.encode(multibase.names.base58btc.name, keyPair.publicKey)))
    return keyPair
}