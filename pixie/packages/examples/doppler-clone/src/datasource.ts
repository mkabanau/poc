
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import {log} from 'logger'
import {WebrtcProvider} from 'y-webrtc'

interface Msg {
    payload?: any
    err?: string
}
const DefaultWorkspace:string = "defaultWorkspace"
const Projects:string = "projects"
const Environments:string = "envs"
const Activity:string = "activity"
export class DopplerAPI{
    private ydoc:Y.Doc
    private indexeddbProvider: any
    private ready: boolean = false
    private collectionName: string
    private webrtcProvider: any
    constructor(collectionName:string){
        this.collectionName = collectionName
        this.ydoc = new Y.Doc()
        this.indexeddbProvider = new IndexeddbPersistence(collectionName, this.ydoc)
        this.indexeddbProvider.on('synced', () => {
                log('content from the database is loaded')
                this.ready = true
            })
        this.webrtcProvider = new WebrtcProvider(collectionName, this.ydoc, {signaling:["wss://signaling.yjs.dev"]} as any)
        
    }
    getWorkspace():any{
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        return workspacemap.toJSON()
    }
    getProject(name:string):any{
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        if (name.length === 0){
            throw Error("name should be set")
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        let projects = workspacemap.get(Projects) as Y.Array<unknown>
        let projectToReturn:any
        projects.forEach((project)=>{
            if ((project as Y.Map<unknown>).get("name") === name){
                // console.log("project name is found", name)
                projectToReturn = project
            }
        })
        return projectToReturn.toJSON()
    }
    getEnv(projectName:string, envName:string):any{
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        if (projectName.length === 0){
            throw Error("name should be set")
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        let projects = workspacemap.get(Projects) as Y.Array<unknown>
        
        let envToReturn:any 
        projects.forEach((project)=>{
            if ((project as Y.Map<unknown>).get("name") === projectName){
                // console.log("project name is found", project)
                let envs = (project as Y.Map<unknown>).get("envs") as Y.Array<unknown>
                envs.forEach(env =>{
                    if ((env as Y.Map<unknown>).get("name") === envName) {
                        envToReturn = env
                    }
                })
            }
        })
        if (!envToReturn) {
            throw Error(`env ${envName} for project ${projectName} is not found`)
        }
        return envToReturn.toJSON()
    }
    // creates Workspace if does not exists
    createWorkspace(name:string):any{
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        if (workspacemap.get("name")){
            // TODO: think about errors
            return workspacemap.toJSON()
        }
        workspacemap.set("id", "uuid")
        workspacemap.set("name", name)
        workspacemap.set(Projects, new Y.Array())
        return workspacemap.toJSON()
    }
    addProject(name:string):any {
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        let projects = workspacemap.get(Projects) as Y.Array<unknown>
        let project = createProject(name)
        projects?.insert(0, [project])
        // console.log(projects.toJSON())
        return project.toJSON()
    }
    addSecret(projectName:string, envName: string, key:string, value:string):any {
        if (!this.ready) {
            return { err: "Database is not synced"} as Msg
        }
        if (projectName.length === 0){
            throw Error("name should be set")
        }
        let workspacemap = this.ydoc.getMap(DefaultWorkspace)
        let projects = workspacemap.get(Projects) as Y.Array<unknown>
        
        let envToReturn:any 
        projects.forEach((project)=>{
            if ((project as Y.Map<unknown>).get("name") === projectName){
                // console.log("project name is found", project)
                let envs = (project as Y.Map<unknown>).get("envs") as Y.Array<unknown>
                envs.forEach(env =>{
                    if ((env as Y.Map<unknown>).get("name") === envName) {
                        envToReturn = env
                    }
                })
            }
        })
        if (!envToReturn) {
            throw Error(`env ${envName} for project ${projectName} is not found`)
        }
        let config = envToReturn.get("config") as Y.Array<unknown>
        config.insert(0, [{key, value}])
        return envToReturn.toJSON()
    }
}

const DevEnv = "dev"
const StgEnv = "staging"
const ProdEnv = "prod"

function createProject(name:string):any {
    let envs = new Y.Array()
    envs.insert(0, [createEnv(DevEnv), createEnv(StgEnv), createEnv(ProdEnv)])
    let pmap = new Y.Map()
    pmap.set("id", "uuid")
    pmap.set("name", name)
    pmap.set("envs", envs)
    return pmap
}

function createEnv(name:string):any {
    let envMap = new Y.Map()
    envMap.set("name", name)
    let config = new Y.Array()
    envMap.set("config", config)
    return envMap  
}

