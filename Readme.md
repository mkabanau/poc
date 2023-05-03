# Demo

Run websocket server with leveldb

```
HOST=localhost PORT=1234 YPERSISTENCE=./dbDir node ./node_modules/y-websocket/bin/server.js
```

Run web app
```
```

Run server app
```

```

## Development 
Dev flag should be added to simplify development 
Data viewer should be provided to compare snapshots 
Configured profiles for several wallets implementations
UseCase based test framework cucumber/godog
Debounced callback

## Architecture

Backend Webscoket Server with leveldb persistance and custom Authorizer
Backend WebRTC Server just for discovery

YDoc are persisted by rooms and synced by rooms. So every rooms has some subscribers which will recieve updates.
Every room has restrictions to join it. 


Lets assume next parties. 
WebUI to see all documents. View
CLITool which allows to modify docs. ViewWrite
Server to permission. OnlyForStorageNoView

Next structure

WalletRootYDoc{guid:"did:pixie:0", collectionId:"TODO"}
WalletRootYDocYMap.Authentication[]
WalletRootYDocYMap.VerificationMethod[]

WallerRootYDOC.CollectionManagerYMAP{}
WallerRootYDOC.CollectionManagerYMAP.DopplerCloneYMAP{}

WallerRootYDOC.CollectionManagerYMAP.DopplerCloneYMAP
WallerRootYDOC.CollectionManagerYMAP.DopplerCloneYMAP.Workspaces[
    Workspace{
        WorkspaceName:string
        Members[
            Member{
                Authentication:[]
            }
        ]
        Projects[
            Project{
                Members:[
                    Member{
                        Authentication:[]
                    }
                ],
                Envs:[
                    Config{}
                ],
                Capabilities:[
                    Capability:{
                        Token:string,
                        Env: envs[],
                        Caveat: Read
                    }
                ]
            }
        ]
    }
]


Reference:
https://github.com/multiformats/js-multibase
https://github.com/dchest/tweetnacl-js