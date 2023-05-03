// CreateWebWorker return instance of web worker and returns reference to it
export function CreateWebWorker(opts) {
    //const worker = new Worker(new URL(opts.scriptURL, import.meta.url));
    const worker = new Worker(opts.scriptURL);
    return { worker: worker };
}
// Handle Worker Messages
export function HandleWebWorkerMessages(worker, callback) {
    worker.worker.onmessage = callback;
}
