import * as Y from 'yjs'
// import { IndexeddbPersistence } from 'y-indexeddb'
import { ApolloServerBase,gql } from 'apollo-server-core'
import { WebrtcProvider } from 'y-webrtc'
const ydoc = new Y.Doc()
const yarray = ydoc.getArray('test')
const provider2 = new WebrtcProvider('wallet-worker-webrtc-maksim2', ydoc, { password: 'UberNotSecureContactServer' })

const broadcast = new BroadcastChannel('channel-123');
broadcast.postMessage({ type: 'MSG_ID',msg: "service worker" });
broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'MSG_ID') {
      console.log(event.data.msg)
  }
};
const typeDefs = gql`
type Query {
  "Query to get tracks array for the homepage grid"
  tracksForHome: [Track!]!
}
type History {
  id: ID!
  request: String
}
"A track is a group of Modules that teaches about a specific topic"
type Track {
  id: ID!
  "The track's title"
  title: String!
  "The track's main Author"
  author: Author!
  "The track's illustration to display in track card or track page detail"
  thumbnail: String
  "The track's approximate length to complete, in minutes"
  length: Int
  "The number of modules this track contains"
  modulesCount: Int
}

"Author of a complete Track or a Module"
type Author {
  id: ID!
  "Author's first and last name"
  name: String!
  "Author's profile picture"
  photo: String
}
`;

const TRACKS = gql`
query getTracks {
  tracksForHome  {
    id
    title
    length
    modulesCount
    author {
      name
      photo
    }
  }
}
`;


var resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: () => {
      console.log("is triggered")
      return [{id:"testme1", title:"hello", authorId:"maksim1", thimbnail:"yeap",length:101, modulesCount:1}];
    },
  }, 
  Track: {
    author: () => {
      console.log("aurhor is triggered")
      return {
        id: "maksim1",
        name: "maksim",
        photo: "test"
      }
    },
  },
};
const server = new ApolloServerBase({
  typeDefs,
  resolvers,
  cache: "bounded"
})

provider2.on('synced', async (synced) => {
    // NOTE: This is only called when a different browser connects to this client
    // Windows of the same browser communicate directly with each other
    // Although this behavior might be subject to change.
    // It is better not to expect a synced event when using y-webrtc

const resp = await server.executeOperation({query:TRACKS})
console.log("graphql resp", resp)
    let userAgent = navigator.userAgent;
let browserName;


if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
  }else if(userAgent.match(/firefox|fxios/i)){
    browserName = "firefox";
  }  else if(userAgent.match(/safari/i)){
    browserName = "safari";
  }else if(userAgent.match(/opr\//i)){
    browserName = "opera";
  } else if(userAgent.match(/edg/i)){
    browserName = "edge";
  }else{
    browserName="No browser detection";
  }
    yarray.push([browserName])
    console.log('someboy synced!', synced, JSON.stringify(yarray.toJSON()))
})

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/index.js",
        ])
    );
});

const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
}

const cacheFirst = async ({ request }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    // Next try to get the resource from the network
    try {
      const responseFromNetwork = await fetch(request);
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    } catch (error) {
      // when even the fallback response is not available,
      // there is nothing we can do, but we must always
      // return a Response object
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  };
  
self.addEventListener('fetch', (event) => {
    yarray.push([{ "content": event.request }])
    event.respondWith(
        cacheFirst(event.request)
    );
});