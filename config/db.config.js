

var mysql = require('mysql');

var MySQLConPool = {};

//var USER = 'WEBAPPPROD';
//var PWD = 'w4b@pp!_';
//var DATABASE = 'BSS_ONLINE_U';
//var DB_HOST_NAME = '172.16.0.128';
//var DB_PORT = '3307';

//var USER = 'WEBAPPPROD';

var USER = 'bbnlmysql';
var PWD = 'MysQl#123';
//var PWD = 'w4b@pp!0D';
var DATABASE = 'BSS_ONLINE_U';
var DB_HOST_NAME = '172.17.4.182';
var DB_PORT = '3306';

var MAX_POOL_SIZE = 800;
var MIN_POOL_SIZE = 200;

var MySQLConPool = mysql.createPool({
       host: DB_HOST_NAME,
       user: USER,
       password: PWD,
       port: DB_PORT,
       database: DATABASE,
       acquireTimeout: 5000,
       connectionLimit: MAX_POOL_SIZE,
       debug: false,
       multipleStatements: false,
       supportBigNumbers: true
});


MySQLConPool.on('acquire', function (connection) {
       // log.info('Database Connection Acquired', connection.threadId);
});
MySQLConPool.on('release', function (connection) {
       // log.info('Database Connection Released', connection.threadId);
});
MySQLConPool.on('enqueue', function () {
       //  log.info('Waiting for available connection slot');
});

exports.MySQLConPool = MySQLConPool;

var BSSBatchConPool = {};
//var USER = 'WEBAPPPROD';
//var PWD = 'w4b@pp!_';
//var DATABASE = 'BSS_BATCH';
//var DB_HOST_NAME = '172.16.0.128';
//var DB_PORT = '3307';

var USER = 'bbnlmysql';
var PWD = 'MysQl#123';
var DATABASE = 'BSS_BATCH';
var DB_HOST_NAME = '172.17.4.182';
var DB_PORT = '3306';

var MAX_POOL_SIZE = 200;
var MIN_POOL_SIZE = 100;

var BSSBatchConPool = mysql.createPool({
       host: DB_HOST_NAME,
       user: USER,
       password: PWD,
       port: DB_PORT,
       database: DATABASE,
       acquireTimeout: 5000,
       connectionLimit: MAX_POOL_SIZE,
       debug: false,
       multipleStatements: false,
       supportBigNumbers: true
});

BSSBatchConPool.on('acquire', function (connection) {
       // log.info('Database Connection Acquired', connection.threadId);
});
BSSBatchConPool.on('release', function (connection) {
       // log.info('Database Connection Released', connection.threadId);
});
BSSBatchConPool.on('enqueue', function () {
       //  log.info('Waiting for available connection slot');
});

exports.BSSBatchConPool = BSSBatchConPool;

