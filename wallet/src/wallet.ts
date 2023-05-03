



interface Request {

}
interface Response {

}


export interface WalletAPI extends ConnectivityProvider, CollectionManager, CredenentialManager, Lockable{
}

export interface Lockable {
    Lock(): void
    Unlock(pwd: string): void
}
export interface StorageProvider {
    Set():void
    Get():void
}
export interface ConnectivityProvider {
    Connect():void
    Import(blob: string): WalletAPI
    Export(): string
}
export interface CollectionManager {
    Add(req: Request): void
    Query(req: Request): Response
    Remove(req: Request): Response
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

    public Add(req: Request): void {

    }

    public Query(req: Request): Response {
        return {}
    }

    public Remove(req: Request): Response {
        return {}
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