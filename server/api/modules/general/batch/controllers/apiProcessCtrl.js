var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");


var apiProcessMdl = require('../models/apiProcessMdl');

/**************************************************************************************
* Controller     : apiExecutor
* Parameters     : None
* Description    : SQL Job Executor
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
exports.apiExecutor = function (task, prevTaskRes, callback) {
   

    //Get API Definition
    apiProcessMdl.getApiDefinition(task)
        .then((apiDefRes) => {
            if (apiDefRes && apiDefRes.length > 0) {
                var apiDef = apiDefRes[0];
                //Case 1 -- Normal API CAll 
                if (apiDef.prvs_tsk_inpt_in == 0 && apiDef.rqrce_in == 0 && apiDef.rqrce_api_id == 0) {
                    executeApiCall(apiDef, {}, function (error, apiCallRes) {
                        if (error) { log.message("ERROR", cntxtDtls, 100, error); callback(error, null); return; }
                        callback(false, apiCallRes);
                    });
                }

                //Case 2 -- API Call with paramenters got from Previous Task data
                if (apiDef.prvs_tsk_inpt_in == 1 && apiDef.rqrce_in == 0 && apiDef.rqrce_api_id == 0) {

                    var  tmp = [];
                    tmp.push(prevTaskRes[0]); tmp.push(prevTaskRes[1]); tmp.push(prevTaskRes[3]);
                    prevTaskRes=[];
                    prevTaskRes=tmp;

                    var la_ct = 0;
                    var responseData=[];
                    function loopApiCall(data) {
                        
                        executeApiCall(apiDef, data, function (error, apiCallRes) {                            
                            if (error) { log.message("ERROR", cntxtDtls, 100, error); }
                            responseData.push(apiCallRes);
                            la_ct++;
                            if (la_ct >= prevTaskRes.length) { callback(false, responseData); } else { loopApiCall(prevTaskRes[la_ct]); }

                        });
                    }
                    loopApiCall(prevTaskRes[la_ct]);
                }

                //Case 3 -- 

            }
            else {
                //If Task Defination Not Found
                log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] | '${task.tsk_nm}' | Task Definition not Found `);
                callback(false, null);
            }

        })
        .catch((error) => {

        })

}



/**************************************************************************************
* Controller     : processApiOptions
* Parameters     : None
* Description    : Create Api options and return
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
function executeApiCall(apiDtls, parmsObj, callback) {
    if (apiDtls.api_cl_type == 'GET') {
        var options = {
            method: apiDtls.api_cl_type,
            url: stringTemplateBinding(apiDtls.api_url_tx, parmsObj),
            headers: (apiDtls.hdrs_jsn_tx == null) ? {} : JSON.parse(apiDtls.hdrs_jsn_tx),
            json: true
        };
    }
    else if (apiDtls.api_cl_type == 'POST') {
        var options = {
            method: apiDtls.api_cl_type,
            url: stringTemplateBinding(apiDtls.api_url_tx, parmsObj),
            headers: (apiDtls.hdrs_jsn_tx != null) ? JSON.parse(apiDtls.hdrs_jsn_tx) : {},
            body: (apiDtls.bdy_jsn_tx != null) ? jsonTemplateBinding(apiDtls.bdy_jsn_tx,parmsObj) : {},
            json: true
        };
    }

    console.log("Calling : " + options.url);
    request(options, function (error, response, body) {
        if (error) { log.message("ERROR", cntxtDtls, 100, error); callback(error, null); return; };
        callback(false, body);
    });

}

/**************************************************************************************
* Controller     : stringTemplateBinding
* Parameters     : None
* Description    : Replace Templates varibles with parameters
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
function stringTemplateBinding(str, tmpltOptns) {
    if(tmpltOptns && Object.entries(tmpltOptns).length>0){
        Object.keys(tmpltOptns).forEach(function (key) {
            str = str.replace('$$' + key + '$$', tmpltOptns[key])
        });   
        return str;
    }
    else{
        return str;
    }
    
}


/**************************************************************************************
* Controller     : jsonTemplateBinding
* Parameters     : None
* Description    : Replace Templates json object with parameters
* Change History :
* 07/01/2020     - Raju Dasari - Initial Function
***************************************************************************************/
function jsonTemplateBinding(jsn_tx, tmpltOptns) {
    if(tmpltOptns && Object.entries(tmpltOptns).length>0){
        Object.keys(tmpltOptns).forEach(function (key) {    
            jsn_tx = jsn_tx.replace('$$' + key + '$$', tmpltOptns[key])
        });   
        return JSON.parse(jsn_tx);
    }
    else{
        return JSON.parse(jsn_tx);
    }

    
}