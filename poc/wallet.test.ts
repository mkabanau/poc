import * as Y from 'yjs'
// import {did} from './base'

import * as nacl from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from "tweetnacl-util";

import multibase  from 'multibase'
const Wallet = "Wallet"
const VerificationMethod = "VerififcationMethod"
const Authentication = "Authentication"
const CollectionManager = "CollectionManager"

const RemoteConfigCollectionName = "RemoteConfigCollection"
const Workspace = "workspace"
const Members = "members"
const Projects = "projects"
const Environments = "evnironments"
const LocalContext = "localContext"

describe("wallet", ()=>{

    let walletdid = "did:pixie:0"
    it("root", ()=>{

        const root = new Y.Doc()
        let wallet = root.getMap(Wallet)
        let auth = new Y.Array()
        auth.insert(0, [{id:"#key-1"}])
        let verMethod = new Y.Array();
        let collectionManager = new Y.Map()

        let keyPair = GenerateKey()
        verMethod.insert(0,[{
            id: walletdid + "#key-1",
            type: "Ed25519VerificationKey2018",
            controller: walletdid,
            publicKeyMultibase: new TextDecoder().decode(multibase.encode( multibase.names.base64.name, keyPair.publicKey))
      }])
        //console.log(wallet)

        wallet.set("id", walletdid)
        wallet.set(Authentication, auth)
        wallet.set(VerificationMethod, verMethod)
        wallet.set(CollectionManager, collectionManager)

        let dopplerDoc = new Y.Doc()
        let dopplerWorkspace = dopplerDoc.getMap(Workspace)
        let members = new Y.Array()
        let projects = new Y.Array()
        let envs = new Y.Array()
        envs.insert(0,["dev", "stage", "prod"])
        projects.insert(0, [{Environments:envs}])
        dopplerWorkspace.set(Members, members)
        dopplerWorkspace.set(Projects, projects)
        collectionManager.set(RemoteConfigCollectionName, dopplerDoc)

        console.log(root)
        console.log(wallet.toJSON())
        console.log(dopplerWorkspace.toJSON())
    })
})

function GenerateKey(){
    let keyPair = nacl.sign.keyPair()
    // console.log(keyPair.publicKey)
    // console.log("base64",encodeBase64(keyPair.publicKey))
    let multibasePK = new TextDecoder().decode(multibase.encode( multibase.names.base64.name, keyPair.publicKey))
    // console.log("multibase base64", multibasePK)
    let decodedPK = multibase.decode(multibasePK)
    // console.log(decodedPK)
    if (decodedPK.toString() == keyPair.publicKey.toString()){
        console.log("public key is restored")
    }
    let message = new TextEncoder().encode("message to sign")
    let signedMessage = nacl.sign(message, keyPair.secretKey )

    let verifiedMessage = nacl.sign.open(signedMessage, decodedPK)
    if (verifiedMessage?.toString() === message.toString()) {
        console.log("message verified=>", new TextDecoder().decode(verifiedMessage))
    }
    // console.log("multibase",new TextDecoder().decode(multibase.encode(multibase.names.base58btc.name, keyPair.publicKey)))
    return keyPair
}