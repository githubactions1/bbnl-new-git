// Standard Inclusions
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var redis = require("redis");
var client = redis.createClient({ host: as.redis.kx_pages.host
                                 ,port: as.redis.kx_pages.port
                                 //,password:as.redis.kx_pages.password
                                 ,retry_strategy: function (options) {
                                                if (options.error && options.error.code === 'ECONNREFUSED') {
                                                    // End reconnecting on a specific error and flush all commands with
                                                    // a individual error
                                                    return new Error('The server refused the connection');
                                                }
                                                if (options.total_retry_time > 1000 * 60 * 60) {
                                                    // End reconnecting after a specific timeout and flush all commands
                                                    // with a individual error
                                                    return new Error('Retry time exhausted');
                                                }
                                                if (options.attempt > 10) {
                                                    // End reconnecting with built in error
                                                    return undefined;
                                                }
                                                // reconnect after
                                                return Math.min(options.attempt * 100, 3000);
                                            }});

if(as.redis.kx_pages.enable){
    log.info("Redis Connections started at ::"+JSON.stringify(as.redis.kx_pages.host)+":"+JSON.stringify(as.redis.kx_pages.port),0, cntxtDtls)

}

/**************************************************************************************
* Controller     : getValue
* Parameters     : None
* Description    : Get Value from redis based on key
* Change History :
* 07/11/2019    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.getValue = function (key, callback) {
    client.on('connect', function () {
        console.log('connected.............');
    });
    client.get(key, (err, res) => {
        callback(err, res);
    });
};

/**************************************************************************************
* Controller     : setValue
* Parameters     : None
* Description    : Set Value in redis based on key
* Change History :
* 07/11/2019    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.setValue = function (key, val, callback) {

    client.on('connect', function () {
        console.log('connected.............');
    });

    client.set(key, val, (err, res) => {
        callback(err, res);
    });
    log.info("Redis Connection", 0, cntxtDtls)

};