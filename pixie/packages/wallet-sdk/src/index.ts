import {WalletAPI, ConnectivityProvider, Message, Wallet, Connection} from "wallet-api"
import {v4} from 'uuid'
export class WalletSDK implements WalletAPI {
    private id: string
    public conectivityProvider: ConnectivityProvider
    private connection: Connection
    constructor(){
        this.id = v4()
    }

    public Unlock(pwd: string) {
    }
    public Lock() {
    }
    public Connect(){
        this.connection.Subscribe(this.process)
    }
    public Import(blob: string): WalletAPI {
        let walletObj = JSON.parse(blob)
        return Object.assign(new Wallet(), walletObj)
    }

    public Export(): string {
        return JSON.stringify(this)
    }

    public Add(req: Message): void {
        req.reciver = "wallet"
        req.sender = this.id
        this.connection.Publish(req)
    }

    public Query(req: Message): Message {
        req.reciver = "wallet"
        req.sender = this.id
        this.connection.Publish(req)
        return req
    }

    public Remove(req: Message): Message {
        return req
    }

    Verify():void {

    }
    Issue():void {

    }
    Proof(): void {

    }
    Derive(): void {

    }

    async process(msg:any) {
        let req = JSON.parse(msg.data) as Message
        console.log("wallet-sdk")
    }   
}

