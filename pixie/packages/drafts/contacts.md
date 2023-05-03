# Contacts 
Parties should be able to discover and comunitcate with other parties.
For this reason thy should maintain contacts endpoint. 

Examples from real life are
1. phone numbers 
2. emails
3. nicknames
4. websites 
5. business cards
6. messangers

So just to simlify thought process lest split this task to several simple

1. known contacts
2. unknown contacts
3. lookup for contacts 
4. online contacts
5. capabilities or access controll
6. verified contacts

There are several comunications patterns avialable
1. sync -> 2 or more parties are online at the same time
2. async -> 2 or more parties can be online at the same time but not required as soon as they eventually connected.

Terminology is used from tinode chat api

1. a topic is table with sequenced messages
2. a message is text with metainfo
3. a subscription connects to topic and keeps last seen sequence of message for specific topic

so converting this to did space terminology 
1. A collection is a named bucket for grouping wallet content.
we have typed and named collection

this collection descibes that app is installed
```json
{
  "@context": ["https://w3id.org/wallet/v1", "https://pixie.link/chat/v1"],
  "id": "did:pixie:cri:c1",
  "type": "Messanger",
  "name": "pixi-chat",
  "image": "https://via.placeholder.com/150",
  "description" : "tinode clone messanger to communicate with other parties p2p",
  "tags": ["tag1", "tag2"],
  "correlation": ["1", "2"]
}
```

convert to verifieable credentials profiles
```json
{
  "@context": ["https://w3id.org/wallet/v1", "https://pixie.link/messanger/v1"],
  "id": "did:pixie:cri:c2",
  "type": "Party",
  "name": "@maksim",
  "image": "https://via.placeholder.com/150",
  "description" : "for personal usage outside of work",
  "tags": ["tag1"],
  "correlation": ["1"]
}
```

```json
{
  "@context": ["https://w3id.org/wallet/v1", "https://pixie.link/messanger/v1"],
  "id": "did:pixie:cri:c3",
  "type": "Party",
  "name": "@mkabanau",
  "image": "https://via.placeholder.com/150",
  "description" : "for professional usage on work",
  "tags": ["tag2"],
  "correlation": ["2"]
}
```

```json
{
  "@context": ["https://w3id.org/wallet/v1", "https://pixie.link/messanger/v1"],
  "id": "did:pixie:cri:c3",
  "type": "Topic",
  "name": "#wallet_work",
  "controller":"did:pixie:1#key1",
  "image": "https://via.placeholder.com/150",
  "description" : "wallet work releated stuf",
  "tags": ["professional"],
  "correlation": ["1"]
}
```

```json
{
  "@context": ["https://w3id.org/wallet/v1"],
  "id": "urn:uuid:c410e44a-9525-11ea-bb37-0242ac130006",
  "name": "My Health Record Certifier",
  "image": "https://via.placeholder.com/150",
  "description" : "The identifier that issues health record credentials.",
  "tags": ["professional"],
  "correlation": ["4058a72a-9523-11ea-bb37-0242ac130002"],
  "type": "Connection",
  "connection": {
    "created_at": "2020-06-01 14:05:54.150111Z",
    "their_did": "SkL2sdiv3RrPk3QtjT3Mjs",
    "routing_state": "none",
    "invitation_key": "EGsWeE95ANRp9GRNR3fjaWyB1tRqhaBuc69iMg7zBFij",
    "accept": "auto",
    "their_label": "Alice.Agent",
    "my_did": "4zRzv8DtEaZqSreoNb2dpJ",
    "state": "active",
    "initiator": "self",
    "connection_id": "3b6e568d-1cee-4327-915c-0e9d39ef2e88",
    "invitation_mode": "once",
    "updated_at": "2020-06-01 14:06:58.610756Z"
  },
}
```

Now we have party, topic and connection

contact1 -> device1 -> topic1 -> did-resolver
contact1 -> device1 -> connection1 -> capability1 -> topic1
contact2 -> device2 -> connection2 -> capability2 -> topic1
contact1 -> device3 -> connection3 -> capability1 -> topic1

so we have a concept of devices. common entity here is the topic1. but do we care about topic in contacts.
contacts allow to find parties. but how?  party should brodcast intention to create connection to topic.

things above moves us to next design

party creates connection to topic1

this connection intention is syncronyzed across devices.
when device is online it broadcasts its status.

from tinode me->subs->topics return all topics this party subscribed for. then it should find all currenly devices online in order to syncronize latest state. In this case topics should return all parties with find request.

me -> subs -> topics -> devices -> p2p -> capability -> y-webrtc-sync -> yjs 

which means that messages can be lost with devices.

fnd -> query tags -> topics | contacts


After call with Mark next things where proposed

Add Conntact endpoint to exchange sdp packages for currently active devices

contact1.link -> (sdp1, sdp4)
contact2.link -> (sdp2)
contact3.link -> (sdp3)

topic1 -> contacts(c1,c2,c3) -> resolve online?

structure of topic 
id
name
contacts => stateless, resolveable by participants, resolvable by owner

1. stateless - is an array of contacts []Contact, where every contacts personal endpoint like mkabanau.link

So there is a topic owner which required for bootstaping.
As there is sesveral ways to join topic if it with defauls access mode.
Issue wuth approch where owner approves everyone is easier to resolve.

