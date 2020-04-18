const app = require('./app')
const numWorkers = require('os').cpus().length - 1;


const { Worker, isMainThread } = require('worker_threads');

if (isMainThread) {

    for (let index = 0; index < numWorkers; index++) {
        const worker = new Worker(__filename);

    }
} else {
    app()
}
