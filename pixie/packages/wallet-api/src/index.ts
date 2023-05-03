export type RequestType = "Add" | "Query" | "Remove"
// export interface Request {
//     type: RequestType
//     msg: Message
// }

// export interface Response {
//     msg: Message
// }

export interface WalletAPI extends CollectionManager, CredenentialManager, Lockable, Exportable{
}

export interface Lockable {
    Lock(): void
    Unlock(pwd: string): void
}

export interface Exportable {
    Import(blob: string): WalletAPI
    Export(): string
}

export interface StorageProvider {
    Set():void
    Get():void
}

export interface Message {
    id: string // uuid
    type: string // https://pixie.io/doppler-clone
    sender?: string
    reciver?: string
    payload: string
    reqType?: RequestType
}

export type ConnectionType = "WebRTC" | "BrodcastChannelAPI" | "MessageChannel" | "WebSocket"

export interface ConnectionOptions {
    connectionType: ConnectionType
    target: string
    channelName: string
    discoveryService?: string
    initiator?: boolean
}

export interface ConnectivityProvider {
    Connect(opts:ConnectionOptions): Connection
}

export type CallbackFunction = (event:any) => void

export interface Connection {
    Publish(message: Message):void
    Subscribe(cb:CallbackFunction): string
    Unsubscribe(token:string):void
    Close():void
}

export interface CollectionManager {
    Add(req: Message): void
    Query(req: Message): Message
    Remove(req: Message): Message
}

export interface CredenentialManager {
    Verify():void
    Issue():void 
    Proof(): void
    Derive(): void
}

export interface KeyManager {
    SignRaw():void
    VerifyRaw():void
}

export class Wallet implements WalletAPI {
    public storageProviders: StorageProvider[] = []
    public connectivityProviders: ConnectivityProvider[] = []
    public collectionManagers: CollectionManager[] = []
    public keyManagers: KeyManager[] = []
    constructor() { }

    public Unlock(pwd: string) {

    }
    public Lock() {

    }
    public Connect(){

    }
    public Import(blob: string): WalletAPI {
        let walletObj = JSON.parse(blob)
        return Object.assign(new Wallet(), walletObj)
    }

    public Export(): string {
        return JSON.stringify(this)
    }

    public Add(req: Message): void {
        
    }

    public Query(req: Message): Message {
        return {id:"", payload:"", type:""}
    }

    public Remove(req: Message): Message {
        return {id:"", payload:"", type:""}
    }

    Verify():void {

    }
    Issue():void {

    }
    Proof(): void {

    }
    Derive(): void {

    }

}