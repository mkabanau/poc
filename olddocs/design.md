# Desing choices of wallet

Diffrent apps and platforms have their own requiremens and business use cases,
so pixi project provides simple libs and opinionated components to build custom wallet implementation. 

## All components are defined build time

simplest implementation when all things are known in advance for such cases
builder pattern with dependency injection can be used to configure wallet. 

example:

wallet should run in browser. 
1. crypthography can use remote webkms service, cryptojs lib or web crypto api.
2. storage can be indexeddb or localstorage or other.
3. authentication for wallet can be WebAuthn, password or metamask or another device.

wallet should run on android device
1. cryptograpthy is android crypto api
2. storage any native lib
3. authentication android login api 

Not always all methods are supported by platform so hybrid approches should be used.

example:
1. method implemented by native platform
2. some methods is executed remotly

it introduces challenges with how granular method registration should be.
that is why some components are opionionated. 

example of code 

```js
import {WalletFactory} from "3dlink-wallet-poc"
import {storage} from "@pixi-wallet/wallet-storage"
import {webkms} from "@pixi-wallet/webkms"
wallet.
```

