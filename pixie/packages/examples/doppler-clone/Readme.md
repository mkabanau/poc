# Doppler clone
This app is based on doppler app but uses wallet api and collection manager components to implement local first solution

## MVP 
Next components should be designed to implement doppler api and data model

1. Web client with wallet-sdk and wallet implementation and collection manager web worker
2. Cli client with waller-sdk and connectivity provider
3. Sync Server (Optional) for offline usage storage-provider + syncer

## Data Model 

Workspace -> Projects -> Env

Activity  - all activity in current workspace if allowed to view 
Capabilities - issued capabilities for current workspace by workspace controller part of wallet api

## Methods

* Query
    - workspace
    - project
    - env
    - activity
* Mutation
    - createWorkspace
    - addProject
    - deleteProject
    - addEnv
    - branchEnv
    - deleteEnv
    - editEnvs
* Subscription
    - getActivity