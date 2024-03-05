/********************************************************************************************
---------------------------------------------------------------------------------------------
File              : logmessages.js
Description       : All the utility functions related to log files
---------------------------------------------------------------------------------------------
********************************************************************************************/
var moment = require('moment');
var fs = require('fs');
var DEBUG_MODE = true;
var DEBUG_LEVEL = (typeof (as.app.debug_level) != 'undefined') ? as.app.debug_level : "INFO";
var chalk = require('chalk');

let header = chalk.bold.blue;
let warn = chalk.bold.green;
let info = chalk.bold.yellow
let err = chalk.bold.red


/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.message = function (category, moduleDtl, id, message, jb_id) {
    var showLog = false;
    if (DEBUG_MODE == true) {
        if (DEBUG_LEVEL == "INFO") { showLog = true; }
        else if (DEBUG_LEVEL == "WARN" && (category == "info" || category == "err")) { showLog = true; }
        else if (DEBUG_LEVEL == "ERR" || category == "ERROR") { showLog = true; }
    }
    if (showLog == true) {
        let printMsg = info;
        if (category == "WARN") printMsg = warn;
        else if (category == "ERR" || category == "ERROR") printMsg = err;
        else printMsg = info;
        var contect = "";
        if (typeof (moduleDtl) != 'undefined') {
            context = moduleDtl.mod_name + "|" + moduleDtl.scriptName + "|" + moduleDtl.fcd
        }

        if (jb_id) {
            fs.appendFile(appRoot + "/log/" + jb_id + '.txt', "\n[" + category + ":" + context + ":" + id + ":" + moment().format('MM-DD-YYYY h:mm:ss') + "] " + message, function (err) {
                if (err) throw err;
                console.log("[" + printMsg(category) + ":" + context + ":" + id + ":" + moment().format('MM-DD-YYYY h:mm:ss') + "] " + message);
            });
        } else {
            console.log("[" + printMsg(category) + ":" + context + ":" + id + ":" + moment().format('MM-DD-YYYY h:mm:ss') + "] " + message);
        }

    }
}