// Standard Inclusions
var log         = require(appRoot+'/utils/logmessages');
var std         = require(appRoot+'/utils/standardMessages');
var df          = require(appRoot+'/utils/dflower.utils');
var cntxtDtls   = df.getModuleMetaData(__dirname,__filename);

// Model Inclusions
var bootstrapMdl = require(appRoot+'/server/api/modules/bootstrap/models/bootstrapMdl');

/**************************************************************************************
* Controller     : dbConnectionsCt_get
* Parameters     : status_id
* Description    : 
* Change History :
* 05/05/2017    - 
*
***************************************************************************************/
exports.dbConnectionsCt_get = function(req, res) {

    var fnm="dbConnectionsCt_get";
    log.info("INFO",cntxtDtls,100,`In ${fnm}`);
    // Request Parameters

    bootstrapMdl.getdbConnectionsCt(req.user,status_id)
            .then(function(results){
               df.formatSucessRes(req, res,results,cntxtDtls,fnm,{});  
            }).catch(function (error) {
                df.formatErrorRes(req, res,error,cntxtDtls,fnm,{}); 
            });

}


/**************************************************************************************
* Controller     : getGrpOpenTicketDtls_get
* Parameters     : status_id
* Description    : 
* Change History :
* 05/05/2017    - 
*
***************************************************************************************/
exports.getGrpOpenTicketDtls_get = function(req, res) {
var status_id=req.params.status_id;
    var fnm="getGrpOpenTicketDtls_get";
    log.info("INFO",cntxtDtls,100,`In ${fnm}`);
    // Request Parameters
    bootstrapMdl.getdbConnectionsCt(req.user,status_id)
            .then(function(results){
               df.formatSucessRes(req, res,results,cntxtDtls,fnm,{});  
            }).catch(function (error) {
                df.formatErrorRes(req, res,error,cntxtDtls,fnm,{}); 
            });

}
