'use strict';

/**
 * A single instance of Node runs in a single thread.
 * To take advantage of multi - core systems the user will 
 * sometimes want to launch a cluster of Node
 * processes to handle the load. The cluster module allows you to easily create
 * child processes that all share server ports.
 * 
 * Reference: http://nodejs.org/api/cluster.html
 * 
 */

var cluster = require('cluster');
var os = require('os');
var server = require('./server');
var logger = require('../corelibs').logger;

if (cluster.isMaster) {
    var idx = 0;
	var numWorkers = os.cpus().length;
    for (idx; idx < numWorkers; idx++) {
        cluster.fork();
    }
    cluster.on('fork', function(worker) {
        logger.debug('forking worker: #' + worker.id + ' (' +
                worker.process.pid + ')');
    });
    cluster.on('online', function(worker) {
        logger.debug('worker #' + worker.id + ' is online');
    });
    cluster.on('listening', function(worker, address) {
        logger.info('worker #' + worker.id + ' is connected to ' +
                address.address + ':' + address.port);
    });
    cluster.on('disconnect', function(worker) {
        logger.error('worker #' + worker.id + ' has dis-connected');
    });
    cluster.on('exit', function(worker) {
        logger.debug('worker #' + worker.id + ' has exited with code: ' +
                worker.process.exitCode);
        // if server down, it needs to up automatically(required for Release)
        cluster.fork();
    });
} else {
    server();
	
}
