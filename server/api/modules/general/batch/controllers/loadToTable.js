var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");


var loadToTableMdl = require('../models/apiProcessMdl');

/**************************************************************************************
* Controller     : insertDataToTable
* Parameters     : data,Load_to_table_id
* Description    : SQL Job Executor
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
exports.apiExecutor = function (task, prevTaskRes, callback) {

}