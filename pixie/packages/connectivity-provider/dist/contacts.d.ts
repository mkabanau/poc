import { CallbackFunction, Connection, Message } from 'wallet-api';
interface Invite {
    sender: string;
    payload: any;
}
export declare class WebRTCConnection implements Connection {
    private id;
    private ydoc;
    private syncer;
    private contacts;
    private peer;
    private ready;
    constructor(docName: string, initiator: boolean);
    onConnect(): void;
    createInvite(invite: any): Invite;
    sendInvite(invite: any): void;
    filter(invite: any): boolean;
    listenForInvites(ev: any): void;
    pack(message: Message): string;
    Publish(message: Message): void;
    Subscribe(cb: CallbackFunction): string;
    Unsubscribe(token: string): void;
    Close(): void;
}
export {};
