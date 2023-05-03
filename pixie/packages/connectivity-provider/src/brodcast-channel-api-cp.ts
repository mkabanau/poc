import { Message, Connection} from 'wallet-api'
import {v4} from "uuid"
// add notice https://github.com/pubkey/broadcast-channel/blob/master/

export class BCConnection implements Connection {
    //map<cancelToken, abortcontroller>
    private cancelSubscribeMap: Map<string,globalThis.AbortController> = new Map<string, globalThis.AbortController>()
    private brodcastChannel: globalThis.BroadcastChannel
    constructor(channelName:string){
        this.brodcastChannel = new BroadcastChannel(channelName);
    }
    private pack(message:Message):string {
        return JSON.stringify(message)
    }
    Publish(message: Message): void {
        this.brodcastChannel.postMessage(this.pack(message))
    }
    Subscribe(cb: (event: any) => void): string {
        const controller = new AbortController();
        this.brodcastChannel.addEventListener("message", cb, {signal:controller.signal})
        let token = v4() //globalThis.crypto.randomUUID()
        this.cancelSubscribeMap.set(token, controller)
        return token
    }
    Unsubscribe(token: string): void {
        let controller = this.cancelSubscribeMap.get(token)
        if (controller){
            controller.abort()
        }
    }
    Close(): void {
        this.cancelSubscribeMap.forEach((contoller)=>{
            contoller.abort()
        })
        this.brodcastChannel.close()
    }
}

