// do mapping between grapthql and datasource

export const rawScheme = `
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
export const resolver = {

    createWorkspace:(args:any, context:any)=>{
        console.log("resolver triggered createWorkspace")
        return context.datasource.createWorkspace(args.name)
    },
    addProject: (args:any, context:any) =>{
        console.log("resolver triggered addProject")
        return context.datasource.addProject(args.name)
    },
    workspace: (args: any, context: any) => {
        console.log("resolver triggered workspace")
        return context.datasource.getWorkspace()
    },
    addSecret:(args:any, context:any) => {
        console.log("resolver triggered addSecret")
        return context.datasource.addSecret(args.projectName, args.envName, args.key,args.value)
    }

}

