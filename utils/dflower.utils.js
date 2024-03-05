
var log         = require(appRoot+'/utils/logmessages');
var std         = require(appRoot+'/utils/standardMessages');
/**************************************************************************************
* Controller     : getModuleMetaData
* Parameters     : None
* Description    : Get Module Related Metadata and generates the  File Code

                      File Code (FCD) Format

                      A - Application Related
                      D - glits Service Related
                      G - General
                      O - Others

                      A - API Related
                      W - Web Page Related
                      U - Utility
                      D - glits Service Related
                      O - Others


                      C - Controller
                      M - Model
                      R - Router
                      U - Utiliry
                      O - Others

* Change History :
* 11/29/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.getModuleMetaData = function (dirName,fileName){

    var dir_array = dirName.split("/");

    //console.log("mod_name lenght "+mod_name[mod_name.length-2]);
    var mod_name = "";
    var fcd= "";
    if (dir_array.length < 2) {
            mod_name ="UNKNOWN";
            fcd=="UNK";
    }else {
        if(dir_array.indexOf("server")>0){    // server Related File
                var serverIndex = dir_array.indexOf("server");

                if(dir_array.indexOf("ds-services")>0) { // DreamSter Service Related
                    var dsIndex = dir_array.indexOf("ds-services");

                    if(dir_array[dsIndex+1]=="routers"){
                        mod_name ="GENERAL";
                        fcd="DDR";
                    }else if(dir_array[dsIndex+1]=="modules"){
                            mod_name = dir_array[dsIndex+2];
                            if(dir_array[dsIndex+3] == "controllers") {
                                fcd="DDC";
                            }else if(dir_array[dsIndex+3] == "routes"){
                                fcd="DDR";

                            }else if(dir_array[dsIndex+3] == "models"){
                                fcd="DDM";
                            }else {
                                fcd="DDO";
                            }

                    } else{
                        mod_name ="UNKNOWN";
                        fcd="DOO";                
                    }

                }else if(dir_array[serverIndex+1]=="app"){

                    if(dir_array[serverIndex+1]=="routers"){
                        mod_name ="GENERAL";
                        fcd="AWR";
                    }else if(dir_array[serverIndex+2]=="modules"){
                            mod_name = dir_array[serverIndex+3];
                            if(dir_array[serverIndex+4] == "controllers") {
                                fcd="AWC";
                            }else if(dir_array[serverIndex+4] == "routes"){
                                fcd="AWR";

                            }else if(dir_array[serverIndex+4] == "models"){
                                fcd="AWM";
                            }else if(dir_array[serverIndex+4] == "utils"){
                                fcd="AWU";
                            }else {
                                fcd="AWO";
                            }

                    } else{
                        mod_name ="UNKNOWN";
                        fcd="AWO";                
                    }


                }else if(dir_array[serverIndex+1]=="api"){

                    if(dir_array[serverIndex+1]=="routers"){
                        mod_name ="GENERAL";
                        fcd="AAR";
                    }else if(dir_array[serverIndex+2]=="modules"){
                            mod_name = dir_array[serverIndex+3];
                            if(dir_array[serverIndex+4] == "controllers") {
                                fcd="AAC";
                            }else if(dir_array[serverIndex+4] == "routes"){
                                fcd="AAR";

                            }else if(dir_array[serverIndex+4] == "models"){
                                fcd="AAM";
                            }else if(dir_array[serverIndex+4] == "utils"){
                                fcd="AAU";
                            }else {
                                fcd="AAO";
                            }

                    } else{
                        mod_name ="UNKNOWN";
                        fcd="AWO";                
                    }

                }else {  // Not from ds-services/ app/ api directories in Server folder
                        mod_name ="UNKNOWN";
                        fcd="OOO";   
                }


        }else if(dir_array.indexOf("utils")>0){  // Outside Server and in Utilities
              mod_name ="UNKNOWN";
              fcd="GUU";

        } else {
              mod_name ="UNKNOWN";
              fcd="OOO";
        }

    }



    return {
        "mod_name":mod_name,
        "scriptName":path.basename(fileName),
        "fcd":fcd
    }

};

/**************************************************************************************
* Controller     : formatAppNewInvalidParamsErrorMwRes
* Parameters     : None
* Description    : Prints the Successfull Message
* Change History :
* 02/01/2022    - Ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppNewInvalidParamsErrorMwRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS_APP_MW.code
    ,success_msg=std.message.SUCCESS_APP_MW.message
    ,error_status=std.message.MODEL_ERR.code
    ,err_message=std.message.MODEL_ERR.message}) {
//     if(req.method == "GET"){
//         req.perm={slct_in:1 ,insrt_in:1 ,updt_in:1 ,dlte_in:1 ,exprt_in:1}
//         res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});
//     }
//    else 
if(req.perm===undefined)
res.send({"status":success_status,"message":success_msg,"data":results,"errors":[]});
else
res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});

}

/**************************************************************************************
* Controller     : runGenerator
* Parameters     : None
* Description    : A generator function runner
* Reference      : http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/
* Change History :
* 12/31/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
let runGenerator = function (generatorFunction) {

  // recursive next()
  let next = function (err, arg) {

    // if error - throw and error
    if (err) return it.throw(err);

    // cache it.next(arg) as result
    var result = it.next(arg);

    // are we done?
    if (result.done) return;

    // result.value should be our callback() function from the XHR request
    if (typeof result.value == 'function') {
      // call next() as the callback()
      result.value(next);
    }
    else {
      // if the response isn't a function
      // pass it to next()
      next(null, result.value);
    }
  }

  // create the iterator
  let it = generatorFunction();
  return next();
}


exports.beautyRes =function(req, res, err,results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
           if (err) { 
                log.message("ERROR",cntxtDtls,null,message); 
                res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
                return; 
          }
          else
                res.send({"status":success_status,"message":success_msg,"data":results,"errors":[]});

}

/**************************************************************************************
* Controller     : formatSucessRes
* Parameters     : None
* Description    : Prints the Successfull Message
* Change History :
* 12/31/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.formatSucessRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
        //     if(req.method == "GET"){
        //         req.perm={slct_in:1 ,insrt_in:1 ,updt_in:1 ,dlte_in:1 ,exprt_in:1}
        //         res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});
        //     }
        //    else 

           if(req.perm===undefined)
            res.send({"status":success_status,"message":success_msg,"data":results,"errors":[]});
           else
            res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});

}
/**************************************************************************************
* Controller     : formatErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 05/01/2017    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.formatErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
            res.send({"status":error_status,"message":err_message,"data":{},"errors":[err_message]}); 
}

/**************************************************************************************
* Controller     : formatErrorResresume
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 05/01/2017    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.formatErrorResresume = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
            res.send({"status":error_status,"message":err_message,"data":{},"errors":[]}); 
}

/**************************************************************************************
* Controller     : forParamErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Parameter related Errors
* Change History :
* 05/01/2017    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.forParamErrorRes = function ( res, results,cntxtDtls,controllerName,parmErrors,{error_status=std.message.UN_REQ_FIELDS.code
                                                       ,err_message=std.message.UN_REQ_FIELDS.message}) {
            res.send({"status":error_status,"message":err_message,"data":[],"errors":parmErrors}); 
}


/**************************************************************************************
* Controller     : formatSucessAppRes
* Parameters     : None
* Description    : Prints the Successfull Message
* Change History :
* 12/31/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.formatSucessAppRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS_APP.code
                                                       ,success_msg=std.message.SUCCESS_APP.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
        //     if(req.method == "GET"){
        //         req.perm={slct_in:1 ,insrt_in:1 ,updt_in:1 ,dlte_in:1 ,exprt_in:1}
        //         res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});
        //     }
        //    else 
           if(req.perm===undefined)
            res.send({"status":success_status,"message":success_msg,"data":results,"errors":[]});
           else
            res.send({"status":success_status,"message":success_msg,"data":results,"perm":req.perm,"errors":[]});

}


/**************************************************************************************
* Controller     : formatErrorExtrnlRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 17/09/2017    - RAMESH P - Initial Function
*
***************************************************************************************/
exports.formatErrorExtrnlRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS_EXT.code
                                                       ,success_msg=std.message.SUCCESS_EXT.message
                                                       ,error_status=std.message.MODEL_ERR_EXT.code
                                                       ,err_message=std.message.MODEL_ERR_EXT.message}) {
            res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.APP_LOGIN_ERROR.code
    ,err_message=std.message.APP_LOGIN_ERROR.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppFailedErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.FAILED_APP.code
    ,err_message=std.message.FAILED_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppUpdtFailedErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_PASS_NOT_APP.code
    ,err_message=std.message.INVALID_PASS_NOT_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppInvalidErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_DATA_APP.code
    ,err_message=std.message.INVALID_DATA_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 27/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppSameInvalidErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_DATA_Same_APP.code
    ,err_message=std.message.INVALID_DATA_Same_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppMoreMbleErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_DATA_MBLE_APP.code
    ,err_message=std.message.INVALID_DATA_MBLE_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppMbleInvalidErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_DATA_NOT_APP.code
    ,err_message=std.message.INVALID_DATA_NOT_APP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppInvalidParamsErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_QUERY_PERMS.code
    ,err_message=std.message.INVALID_QUERY_PERMS.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 24/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppNewInvalidParamsErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_QUERY_ADD_PERMS.code
    ,err_message=std.message.INVALID_QUERY_ADD_PERMS.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":results}); 
}

/**************************************************************************************
* Controller     : formatAppErrorRes
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 22/07/2021    - ramesh - Initial Function
*
***************************************************************************************/
exports.formatAppInvalidCmpErrorRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
    ,success_msg=std.message.SUCCESS.message
    ,error_status=std.message.INVALID_QUERY_CMP.code
    ,err_message=std.message.INVALID_QUERY_CMP.message}) {
res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatErrorarrayResresume
* Parameters     : None
* Description    : Send the Error responce if there are any Database related Model Errors
* Change History :
* 05/01/2017    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.formatErrorarrayResresume = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
            res.send({"status":error_status,"message":err_message,"data":[],"errors":[]}); 
}

/**************************************************************************************
* Controller     : formatChckIptvSucessRes
* Parameters     : None
* Description    : Prints the Successfull Message
* Change History :
* 04/12/2013    - Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.formatChckIptvSucessRes = function (req, res, results,cntxtDtls,controllerName,{success_status=std.message.SUCCESS.code
                                                       ,success_msg=std.message.SUCCESS.message
                                                       ,error_status=std.message.MODEL_ERR.code
                                                       ,err_message=std.message.MODEL_ERR.message}) {
           if(req.perm===undefined)
            res.send(results);
           else
            res.send(results);

}