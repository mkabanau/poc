import { CallbackFunction, Connection, Message } from 'wallet-api';
import * as Y from 'yjs'
import {WebrtcProvider} from "y-webrtc"
// import Peer =  require("simple-peer")
var Peer = require('simple-peer')
// Peer from 'simple-peer'
import {v4} from 'uuid'

interface Invite {
    sender: string,
    payload: any
}

export class WebRTCConnection implements Connection {
    private id: string
    private ydoc: Y.Doc
    private syncer: WebrtcProvider
    private contacts: Y.Array<unknown>
    private peer:any
    private ready: boolean
    constructor(docName: string, initiator:boolean){    
        this.id = v4()
        this.ydoc = new Y.Doc()
        this.syncer = new WebrtcProvider(docName,this.ydoc, {signaling:["wss://signaling.yjs.dev"]} as any)
        this.contacts = this.ydoc.getArray("contacts")
        this.peer = new Peer({initiator:initiator})
        if (!initiator){
            this.contacts.observe(this.listenForInvites)
        }else{
            this.peer.on("signal", this.sendInvite)
        }
        this.peer.on("connect", this.onConnect)
    }
    onConnect(){
        this.ready = true
    }
    createInvite(invite:any):Invite{
        return {sender:this.id, payload:invite}
    }
    sendInvite(invite) {
        this.contacts.push([this.createInvite(invite)])
    }
    filter(invite):boolean {
        if (invite.sender === this.id){
            return true
        }
        return false
    }
    listenForInvites(ev){
        let msg:Invite
        if (ev.changes.delta.length === 1){
            msg = ev.changes.delta[0].insert[0]
        }else {
            msg = ev.changes.delta[1].insert[0]
        }
        if (this.filter(msg)){
            return
        }
        this.peer.signal(msg.payload)
    }
    pack(message:Message):string {
        return JSON.stringify(message)
    }
    Publish(message: Message): void {
        this.peer.send(this.pack(message))
    }
    Subscribe(cb: CallbackFunction): string {
        this.peer.on("data", cb)
        return ""
    }
    Unsubscribe(token: string): void {
        
    }
    Close(): void {
        this.syncer.destroy()
        this.peer.destroy()
    }
}