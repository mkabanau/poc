import { CollectionManager, Message, RequestType } from "wallet-api";
export declare class CollectionManagerImpl implements CollectionManager {
    private schema;
    private rootValue;
    private contextValue;
    constructor(scheme: string, resolver: any, context: any);
    Add(req: Message): void;
    Query(req: Message): Message;
    Remove(req: Message): Message;
}
export declare function NewRequestMessage(reqType: RequestType, source: string, variableValues?: any): Message;
export declare function NewResponseMessage(payload: any): Message;
