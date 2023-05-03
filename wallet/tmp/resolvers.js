const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: () => {
      console.log("is triggered")
      return [{id:"testme1", title:"hello", authorId:"maksim1",thimbnail:"yeap",length:101, modulesCount:1}];
    },
  }, 
  Track: {
    author: ({ authorId }) => {
      console.log("aurhor is triggered")
      return {
        id: authorId,
        name: "maksim",
        photo: "test"
      }
    },
  },
};

module.exports = resolvers;
