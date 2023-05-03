import { graphql, buildSchema } from 'graphql'

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    users: [User]!
    user(id:ID!):User
  }
  type Mutation {
      addUser(id:ID, name:String):User
  }
  type User {
      id: ID!
      name: String
  }
  type Subscription {
      subUsers: User
  }
`);

var fakeDatabase = {usersData:[]};
var usersDataWrong = [{id:"1", name:"n1"}, {id:"3", name:"n3"}]
var usersData = [{id:"1", name:"n1"}, {id:"2", name:"n2"}]

function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return 'Hello world!';
  },
  users: ()=>{
      return usersData
  },
  user: ({id})=>{
      return fakeDatabase.usersData.find(user=> user.id == id)
  },
  addUser: ({id, name}) =>{
      let user = {id,name}
      fakeDatabase.usersData.push(user)
      return user
  },
  subUsers: async function* fiveToOne() {
    for (const number of [5, 4, 3, 2, 1]) {
      await sleep(100); // slow down a bit so user can see the count down on GraphiQL
      yield { id: `id-${number}`, name:`test-${number}`};
    }
  },

};

// Run the GraphQL query '{ hello }' and print out the response


describe("subs", ()=>{
    it("query", ()=>{
        let source = '{ hello }'
        graphql({
            schema,
            source,
            rootValue
          }).then((response) => {
            console.log(response);
            expect(response.data.hello).toEqual("Hello world!")
          });
    })

    it("query users", ()=>{
        let source = '{ users {id name} }'
        graphql({
            schema,
            source,
            rootValue
          }).then((response) => {
            console.log(response);
            expect(response.data.users).toEqual(usersData)
            expect(response.data.users).not.toEqual(usersDataWrong)
          });
    })

    it("mutate state", ()=>{
        let source = `mutation AddUser($id:ID, $name:String){
            addUser(id:$id, name:$name){
                id
            }
        }`
        let variables = {
            id: "1",
            name: "test"
        }
        graphql({
            schema,
            source,
            rootValue,
            variableValues: variables
          }).then((response) => {
            console.log(JSON.stringify(response));
            let addedUser = response.data.addUser as User
            expect(addedUser.id).toEqual(variables.id)

            let source2 = `query GetUser($id:ID!){
              user(id:$id){
                id
                name
              }
            }` 
            graphql({
              schema,
              source: source2,
              rootValue,
              variableValues: {id:addedUser.id}
            }).then((response) => {
              console.log(JSON.stringify(response));
              let addedUser2 = response.data.user as User
              expect(addedUser2.name).toEqual(variables.name)
            });
          });
    })

    it("subs", ()=>{
      let source = `subscription SubUsers{
        subUsers {
          id
          name
        }
      }`
      graphql({
          schema,
          source,
          rootValue
        }).then((response) => {
          console.log(typeof response )
          console.log(JSON.stringify(response));
          expect(response.data.users).toEqual(usersData)
        });
    })
    
})

interface User {
   id: String 
   name?: String
}