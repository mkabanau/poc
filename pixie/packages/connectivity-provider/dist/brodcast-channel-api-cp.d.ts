import { Message, Connection } from 'wallet-api';
export declare class BCConnection implements Connection {
    private cancelSubscribeMap;
    private brodcastChannel;
    constructor(channelName: string);
    private pack;
    Publish(message: Message): void;
    Subscribe(cb: (event: any) => void): string;
    Unsubscribe(token: string): void;
    Close(): void;
}
