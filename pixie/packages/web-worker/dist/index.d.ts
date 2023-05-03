export interface WebWorkerOptions {
    scriptURL: string;
    scope?: string;
}
export interface Worker {
    worker: globalThis.Worker;
}
export declare function CreateWebWorker(opts: WebWorkerOptions): Worker;
declare type CallbackFunction = (event: any) => void;
export declare function HandleWebWorkerMessages(worker: Worker, callback: CallbackFunction): void;
export {};
