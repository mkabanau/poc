# connectivity tests

## webrtc with simple peer
```

npx jest -t "webrtc via contacts collection" 
```

## webrtc with websocket server as bootstrap

https://www.npmjs.com/package/simple-peer

https://github.com/yjs/y-webrtc

```
PORT=3003 node ./node_modules/y-webrtc/bin/server.js


node ./src/client1.js
node ./src/client2.js

```
start client2 with nodejs debugger

old
```

npx jest -t "webrtc with wepsocket bootstrap" --testTimeout=5000
```

## contacts