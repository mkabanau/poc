import { ApolloServerBase,gql } from 'apollo-server-core'


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

console.log(server)