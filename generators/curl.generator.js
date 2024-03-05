//Imports
var fs = require('fs');
const prog = require('caporal');
let ejs = require('ejs');
var fs = require('fs');
moment = require('moment');
path = require('path');
var prompt = require('prompt-sync')();
appRoot = __dirname;
var dblib = require('./lib/db.utils');
var genlib = require('./lib/gen.utils');
var apilib = require('./lib/api.utils');
var clientlib = require('./lib/client.utils');
req_id = process.argv.slice(2)
req_typ = process.argv.slice(3)
dblib.conn_execSQL(`SELECT * FROM api_rqst_cl_dtl_t where api_rqst_id = ${req_id[0]}  ORDER BY cre_srvce_id,sqnce_nu asc;`, function (err, results) {
    var reqData = results;
    console.log(reqData)
    if (req_typ == 1)
        create_module_processed_files(reqData)
    else if (req_typ == 2)
        create_curl_pon_reqs(reqData)
    else if(req_typ == 3)
    create_curl_pon_voip_reqs(reqData)
})

var create_module_processed_files = function (rtrDta) {

    ejs.renderFile('./client/templates/curl.prov.ejs', { reqData: rtrDta }, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating router file")
            genlib.writeFile(appRoot + "/api/output/" + "curlReq.json", str)
        }
    });

    process.exit(22);
}
var create_curl_pon_reqs = function (rtrDta) {

    ejs.renderFile('./client/templates/curl.pon.ejs', { reqData: rtrDta }, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating router file")
            genlib.writeFile(appRoot + "/api/output/" + "curlPonReq.json", str)
        }
    });

    process.exit(22);
}
var create_curl_pon_voip_reqs = function (rtrDta) {

    ejs.renderFile('./client/templates/curl.pon.voip.ejs', { reqData: rtrDta }, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating router file")
            genlib.writeFile(appRoot + "/api/output/" + "curlPonReq.json", str)
        }
    });

    process.exit(22);
}