# PIXIE
for js/ts packages @pixie prefix should be used

## Components
- @pixie/wallet-api
    * proxy for all requests/responses spec universal wallet 2020
- @pixie/wallet-sdk
    * remote light client
- @pixie/web-worker
    * runs job in web-worker scope
- @pixie/service-worker
    * runs wallet-api inside service worker
- @pixie/collection-manager
    * graphql layer
- @pixie/credential-manager
    * Verifaible Credentials + Issuers reference + Microfrontends
- @pixie/connectivity-provider
    * establish connection to other network participants (browsers, devices, services)
- @pixie/key-manager
    * implements web-kms spec 
- @pixie/storage-provider 
    * persist data and makes accessable for a wallet components (yjs,coudchdb,firebase)
- @pixie/syncer 
    * syncs data across devices. It could be part of storage provider (y-webrtc, couchdb replication, @firebase/database)
- @pixie/notifier
    * subscribe for notifications
- @pixie/workflow
    * multistage actions like issueing Verifable Credentials or async steps which should be executed over some time
- @pixie/did
    * did document spec
- @pixie/capabilities
    * capabilities spec
- @pixie/tests
    * unit tests
    * integration tests
    * cucumber tests
    * k6
- @pixie/utils
    * shared functions
- @pixie/builder
    * allows to construct wallet implementation for target platform
    * ios builder
- @pixie/examples
    * doppler-clone 
    * chat-clone
- @pixie/bus-net
    * allows to connect several processes to one communication channel
    * pubsub
    * Brodcast Channel API
- @pixie/packer
    * pack/unpack messages
    * encryption/decryption
- @pixie/logger
    * local logs
    * push logs to remote server
- @pixie/tracing
    * push to server
    * store locally tracing info
    * format in proper format
- @pixie/monitoring
    * specific metrics about app usage
    * use metrics about memory, cpu, power 
- @pixie/analitics
    * reports to users to whom their data are sharing




TODO:
    datasources: YJS
    subscriber: sets observer on datasource and publishes to subscribers 
    scheme: GraphQL Scheme

Try:
https://typedoc.org/guides/overview/