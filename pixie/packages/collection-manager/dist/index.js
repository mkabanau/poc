"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewResponseMessage = exports.NewRequestMessage = exports.CollectionManagerImpl = void 0;
const graphql_1 = require("graphql");
const uuid_1 = require("uuid");
class CollectionManagerImpl {
    // private connection: Connection
    constructor(scheme, resolver, context) {
        this.schema = (0, graphql_1.buildSchema)(scheme);
        this.rootValue = resolver;
        this.contextValue = context;
    }
    Add(req) {
        let { source, variableValues } = JSON.parse(req.payload);
        (0, graphql_1.graphql)({ schema: this.schema, source, rootValue: this.rootValue, contextValue: this.contextValue, variableValues });
    }
    Query(req) {
        let { source, variableValues } = JSON.parse(req.payload);
        let response = (0, graphql_1.graphqlSync)({ schema: this.schema, source, rootValue: this.rootValue, contextValue: this.contextValue, variableValues });
        if (response === null || response === void 0 ? void 0 : response.data) {
            return NewResponseMessage(response.data);
        }
        return NewResponseMessage(response === null || response === void 0 ? void 0 : response.errors);
    }
    Remove(req) {
        return NewResponseMessage("not implemented");
    }
}
exports.CollectionManagerImpl = CollectionManagerImpl;
function NewRequestMessage(reqType, source, variableValues) {
    return {
        id: (0, uuid_1.v4)(),
        type: "https://pixie.io/msg/request",
        payload: JSON.stringify({
            source,
            variableValues
        }),
        reqType: reqType
    };
}
exports.NewRequestMessage = NewRequestMessage;
function NewResponseMessage(payload) {
    return {
        id: (0, uuid_1.v4)(),
        type: "https://pixie.io/msg/response",
        payload: payload
    };
}
exports.NewResponseMessage = NewResponseMessage;
