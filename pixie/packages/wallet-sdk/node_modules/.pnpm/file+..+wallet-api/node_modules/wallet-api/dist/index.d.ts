export declare type RequestType = "Add" | "Query" | "Remove";
export interface WalletAPI extends CollectionManager, CredenentialManager, Lockable, Exportable {
}
export interface Lockable {
    Lock(): void;
    Unlock(pwd: string): void;
}
export interface Exportable {
    Import(blob: string): WalletAPI;
    Export(): string;
}
export interface StorageProvider {
    Set(): void;
    Get(): void;
}
export interface Message {
    id: string;
    type: string;
    sender?: string;
    reciver?: string;
    payload: string;
    reqType?: RequestType;
}
export declare type ConnectionType = "WebRTC" | "BrodcastChannelAPI" | "MessageChannel" | "WebSocket";
export interface ConnectionOptions {
    connectionType: ConnectionType;
    target: string;
    channelName: string;
    discoveryService?: string;
    initiator?: boolean;
}
export interface ConnectivityProvider {
    Connect(opts: ConnectionOptions): Connection;
}
export declare type CallbackFunction = (event: any) => void;
export interface Connection {
    Publish(message: Message): void;
    Subscribe(cb: CallbackFunction): string;
    Unsubscribe(token: string): void;
    Close(): void;
}
export interface CollectionManager {
    Add(req: Message): void;
    Query(req: Message): Message;
    Remove(req: Message): Message;
}
export interface CredenentialManager {
    Verify(): void;
    Issue(): void;
    Proof(): void;
    Derive(): void;
}
export interface KeyManager {
    SignRaw(): void;
    VerifyRaw(): void;
}
export declare class Wallet implements WalletAPI {
    storageProviders: StorageProvider[];
    connectivityProviders: ConnectivityProvider[];
    collectionManagers: CollectionManager[];
    keyManagers: KeyManager[];
    constructor();
    Unlock(pwd: string): void;
    Lock(): void;
    Connect(): void;
    Import(blob: string): WalletAPI;
    Export(): string;
    Add(req: Message): void;
    Query(req: Message): Message;
    Remove(req: Message): Message;
    Verify(): void;
    Issue(): void;
    Proof(): void;
    Derive(): void;
}
