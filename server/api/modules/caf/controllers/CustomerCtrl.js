const CustMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
var df = require(appRoot + '/utils/dflower.utils');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var cstmrMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');

var apCnst = require(appRoot + '/utils/appConstants');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/**************************************************************************************
* Controller     : get_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : get details of all CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrtIndCstmrMdl = function (req, res) {

    CafEvntStsMdl.getCafEvntStsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.get_cafdtls = function (req, res) {

    console.log(req.body.data)
    cstmrMdl.get_cstmrdtlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getcstmrdt = function (req, res) {
    console.log(req.body)

    var query = require('url').parse(req.url, true).query;
 
    let filter = []
    //console.log(JSON.parse(query.filter)[1])
    if (query.filter) {
        for (let i = 0; i < JSON.parse(query.filter).length; i++) {
            if (typeof JSON.parse(query.filter)[i] == 'object') {
                filter.push({
                    key: JSON.parse(query.filter)[i][0],
                    opr: JSON.parse(query.filter)[i][1],
                    value: JSON.parse(query.filter)[i][2],
                }
                )
            }
        }
        console.log(filter)
        cstmrMdl.gtCstmrSrchMdl(filter,req.user).then(function(results){
            
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
       }).catch(function (error){
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
           
       })

    
    }else{
        var take = query.take;
        var skip = query.skip;
        console.log(skip, take)
    
        cstmrMdl.getcustmrdtMdl(skip, take,filter,req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
   
    }

   
}