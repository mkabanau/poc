import { DopplerAPI } from "../datasource"
import "fake-indexeddb/auto";
import { graphql, buildSchema } from 'graphql'

const rawScheme = `
type Query {
    workspace: Workspace
    project(name:String): Project
    env(project:String, env:String): Environment
    activity: [Action]!
}
type Mutation {
    createWorkspace(name:String): Workspace
    addProject(name:String): Project
    addSecret(projectName:String, envName:String, key:String, value:String): Environment
}
type Subscription {
    activity: Action
}

type Action {
    id: ID!
    action: String
}
type Workspace {
    id: ID!
    name: String!
    projects:[Project]!
}
type Project {
    id: ID!
    name: String!
    envs:[Environment]!
}

type KeyValue {
    key: String
    value: String
    name: String
    description: String
}
type Environment {
    id: ID!
    parent: ID
    name: String!
    description: String
    config: [KeyValue]!
}
`

var schema = buildSchema(rawScheme);

describe("doppler clone", () => {
    test("datasource api", async () => {
        let datasource = new DopplerAPI("collectionName")
        await new Promise((resolve) => { setTimeout(resolve, 1000) })
        datasource.createWorkspace("test")
        let workspace = datasource.getWorkspace()
        console.log("workspace", workspace)
        expect(workspace.name).toBe("test")
        expect(workspace.projects.length).toBe(0)
        let project = datasource.addProject("paylink")
        expect(project.name).toBe("paylink")
        expect(project.envs.length).toBe(3)
        let workspace2 = datasource.getWorkspace()
        expect(workspace2.projects.length).toBe(1)
        console.log("workspace2", JSON.stringify(workspace2))
        datasource.addSecret("paylink", "dev", "TEST_ME", "TEST_VALUE")
        let env = datasource.getEnv("paylink", "dev")
        expect(env.config[0].key).toBe("TEST_ME")
    })

    test("resolver query", async () => {
        let resolver = {

            workspace: (args: any, context: any) => {
                console.log("resolver triggered")
                return context.datasource2.getWorkspace()
            },
            addSecret:(args:any, context:any) => {
                return context.datasource2.addSecret(args.projectName, args.envName, args.key,args.value)
            }

        }
        let source = `query Workspace2 {
            workspace {
                id
                name
                projects {
                  id
                  name
                  envs {
                    name
                    config {
                        key
                        value
                    }
                  }
                }
            }
        }`

        let datasource2 = new DopplerAPI("collectionName2")
        await new Promise((resolve) => { setTimeout(resolve, 1000) })
        datasource2.createWorkspace("test2")
        datasource2.addProject("paylink2")
        datasource2.addProject("paylink3")
        let response = await graphql({ schema, source, rootValue: resolver, contextValue: { datasource2 } })
        console.log(response)
        console.log(JSON.stringify(response?.data?.workspace))
    })

    test("resolver mutation", async () => {
        let resolver = {

            workspace: (args: any, context: any) => {
                console.log("resolver triggered")
                return context.datasource2.getWorkspace()
            },
            addSecret:(args:any, context:any) => {
                return context.datasource2.addSecret(args.projectName, args.envName, args.key,args.value)
            }

        }
      
        let datasource2 = new DopplerAPI("collectionName3")
        await new Promise((resolve) => { setTimeout(resolve, 1000) })
        datasource2.createWorkspace("test3")
        datasource2.addProject("paylink2")
        datasource2.addProject("paylink3")
       
        let source2 = `
            mutation AddSecret($projectName:String, $envName:String, $key:String, $value:String) {
                addSecret(projectName:$projectName, envName:$envName, key:$key, value:$value) {
                    name
                    config {
                        key
                        value
                    }
                }
            }
        `
        let variableValues:any = {
            projectName: "paylink2",
            envName: "dev",
            key: "TEST_KEY",
            value: "TEST_VALUE"
        }
        let response2 = await graphql({ schema, source:source2, rootValue: resolver, contextValue: { datasource2 },variableValues })
        console.log(response2)
        console.log(JSON.stringify(response2?.data?.addSecret))
    })
})