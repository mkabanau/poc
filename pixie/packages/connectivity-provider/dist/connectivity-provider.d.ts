import { ConnectivityProvider, Connection, ConnectionOptions } from 'wallet-api';
export declare class ConnectivityProviderImpl implements ConnectivityProvider {
    constructor();
    Connect(opts: ConnectionOptions): Connection;
}
