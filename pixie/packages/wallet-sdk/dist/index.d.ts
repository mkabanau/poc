import { WalletAPI, ConnectivityProvider, Message } from "wallet-api";
export declare class WalletSDK implements WalletAPI {
    private id;
    conectivityProvider: ConnectivityProvider;
    private connection;
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
    process(msg: any): Promise<void>;
}
