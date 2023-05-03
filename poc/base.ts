

export namespace did {
    export const Wallet:string = "Wallet"
    export const VerificationMethod:string = "VerififcationMethod"
    export const Authentication:string = "Authentication"
    
    export interface Document {
        "@context": string
        id: string
        verificationMethod?: VerificationMethod[]
        athentication?: Authentication[]
    }
    
    export interface VerificationMethod {
        id: string
        type: string
        controller: string
        publicKeyBase58: string
    }
    
    export interface Authentication {
        id: string
        type?: string
        controller?: string
        publicKeyBase58?: string
    }
    
}

