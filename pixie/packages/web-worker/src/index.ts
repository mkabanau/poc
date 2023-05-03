export interface WebWorkerOptions {
    scriptURL: string
    scope?: string
}

export interface Worker {
    worker: globalThis.Worker
}
// CreateWebWorker return instance of web worker and returns reference to it
export function CreateWebWorker(opts:WebWorkerOptions):Worker{
    //const worker = new Worker(new URL(opts.scriptURL, import.meta.url));
    const worker = new Worker(opts.scriptURL);
    return {worker:worker}
}

type CallbackFunction = (event:any) => void
// Handle Worker Messages
export function HandleWebWorkerMessages(worker:Worker, callback: CallbackFunction ): void {
    worker.worker.onmessage = callback
}