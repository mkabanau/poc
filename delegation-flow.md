# Delegation flow 

## Actors 
- metamask-wallet
- pixi-wallet
- 3-link-app
- domain-activator
- kms 

## Actions 
- buy domain
- delegate domain updates

## flow1

3-link-app instruct metamask-wallet to buy domain test-1.link from 3link smart contract with eth address metamask-1

3-link-app request matamask-wallet to delegate domaint updates to pixi-wallet with pixi-wallet-key-1
ucan{iss:metamsk-1, aud: pixi-wallet-key-1, att:{with:"did:dns:test-1.link", can:"*"}}

3-link-app request domain-activator to give accesess on test1.link domain updates for pixi-wallet-key-1 audience with proof 
ucan{iss:metamsk-1, aud: pixi-wallet-key-1, att:{with:"did:dns:test-1.link", can:"kms/*"}}


## flow2

3-link-app instruct metamask-wallet to buy domain test-1.link from 3link smart contract with eth address metamask-1 and delegation to pixi-wallet-key-1

3-link-app request domain-activator to give accesess on test1.link domain updates for pixi-wallet-key-1 audience 
{aud:pixi-wallet-key-1, iss: domain-activator, att:{with:"did:dns:test-1.link", can:"kms/*"}}


