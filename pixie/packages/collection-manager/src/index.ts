import { CollectionManager, Message, RequestType } from "wallet-api"
import { graphql, graphqlSync, buildSchema, GraphQLSchema } from 'graphql'
import { v4 } from "uuid"
export class CollectionManagerImpl implements CollectionManager {
    private schema: GraphQLSchema
    private rootValue: any
    private contextValue: any
    // private connection: Connection
    constructor(scheme: string, resolver: any, context: any) {
        this.schema = buildSchema(scheme)
        this.rootValue = resolver
        this.contextValue = context
    }
    Add(req: Message): void {
        let { source, variableValues } = JSON.parse(req.payload)
        graphql({ schema: this.schema, source, rootValue: this.rootValue, contextValue: this.contextValue, variableValues })

    }
    Query(req: Message): Message {
        let { source, variableValues } = JSON.parse(req.payload)
        let response = graphqlSync({ schema: this.schema, source, rootValue: this.rootValue, contextValue: this.contextValue, variableValues })
        if (response?.data) {
            return NewResponseMessage(response.data)
        }
        return NewResponseMessage(response?.errors)
    }

    Remove(req: Message): Message {
        return NewResponseMessage("not implemented")
    }
}


export function NewRequestMessage(reqType: RequestType, source: string, variableValues?: any): Message {
    return {
        id: v4(),
        type: "https://pixie.io/msg/request",
        payload: JSON.stringify({
            source,
            variableValues
        }),
        reqType: reqType
    }

}
export function NewResponseMessage(payload: any): Message {
    return {
        id: v4(),
        type: "https://pixie.io/msg/response",
        payload: payload

    }
}

