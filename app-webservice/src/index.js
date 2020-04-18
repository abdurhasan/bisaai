const server = require('./server')
const cluster = require('cluster');
const numWorkers = require('os').cpus().length;


if (cluster.isMaster) {
    for (let i = 1; i < numWorkers -1; i++) {
        cluster.fork();
    }

    

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    server()
}

