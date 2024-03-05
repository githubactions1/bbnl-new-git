// Standard Inclusions
appRoot = __dirname
as = require(appRoot + '/utils/settings.utils').getSettings();
var std = require(appRoot + '/utils/standardMessages');
//var df = require(nappRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
//var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var auditRequest = require(appRoot + '/utils/audit.requests');
var dbutil = require(appRoot + '/utils/db.utils');

var unirest = require("unirest");

/*****************************************************************************
* Function      : getRqstDtls
* Description   : get external API request details
* Arguments     : callback function
* Change History :
* 02/04/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
var getRqstDtls = function(api_rqst_id) {
    var QRY_TO_EXEC = `select r.rest_cl_id,m.mthd_nm,url_tx,url_dta_tx,hdr_tx,rspne_tx,api_sts_id,cre_srvce_id,extrl_aplcn_nm 
    from api_rqst_cl_dtl_t r
    join api_mthds_lst_t m on r.mthd_id=m.mthd_id
    JOIN BSS_ONLINE_U.extrl_aplcn_lst_t ea on ea.extrl_aplcn_id=r.extrl_aplcn_id
    where  api_rqst_id=${api_rqst_id} order by sqnce_nu` 
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, {}, {})
    .then(function (results) {
       for(i=0;i<7;i++){
           if(JSON.parse(JSON.stringify(results))[i].extrl_aplcn_nm=="AAA")
          // console.log(JSON.parse(JSON.stringify(results))[i])
           exAPICall(JSON.parse(JSON.stringify(results))[i])
       }
    }).catch(function (error) {
        console.log(error)
       // df.formatErrorRes(req,res, error, cntxtDtls, '', {});
    });
}

getRqstDtls(3104000039);

/*****************************************************************************
* Function      : getRqstDtls
* Description   : get external API request details
* Arguments     : callback function
* Change History :
* 02/04/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
var exAPICall = function(apiJson) {
    console.log("In exAPICall")
    var req = unirest(apiJson.mthd_nm, apiJson.url_tx); 
    req.query(apiJson.url_dta_tx);
    
    
    
    req.end(function (res) {
            if (res.error) {
                console.log(" When res.error")
                console.log(res)
            } else {
                console.log(" when not res.error")
                console.log(res);
            }
            
    });

}