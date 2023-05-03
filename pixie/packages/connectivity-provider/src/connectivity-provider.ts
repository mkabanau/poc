import {ConnectivityProvider, Connection, ConnectionOptions} from 'wallet-api'
import { BCConnection } from './brodcast-channel-api-cp'
import {WebRTCConnection} from './contacts'
export class ConnectivityProviderImpl implements ConnectivityProvider {
    // private brodcastChannel: globalThis.BroadcastChannel
    constructor(){
    }

    Connect(opts:ConnectionOptions): Connection {
        switch (opts.connectionType) {
            case "BrodcastChannelAPI":
                return new BCConnection(opts.channelName)
            case "WebRTC":
                //throw Error(`${opts.connectionType} is not supported`)
                return new WebRTCConnection(opts.channelName, opts?.initiator)
            default:
                throw Error(`${opts.connectionType} is not supported`)
        }
    }
}