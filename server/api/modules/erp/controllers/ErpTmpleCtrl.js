const ErpTmpleMdl = require(appRoot + '/server/api/modules/erp/models/ErpTmpleMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');


/**************************************************************************************
* Controller     : get_ErpTmpleCtrl
* Parameters     : req,res()
* Description    : get details of all erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmpleCtrl = function (req, res) {
    templateData = [];
    templData=[];
    ErpTmpleMdl.getErpTmpleMdl(req.user)
        .then(function (results) {
            var common_feilds = ['sno','tmple_id', 'tmple_nm', 'tmple_dscrn_tx', 'tmple_cd','tmple_type_nm','tmple_type_id'];
            var arrFeilds = ['prtnr_id','ara_type_id','Partners', 'ara_type_cd', 'Regions', 'Percentage'];
            var arrName = 'regions';
            var groupBy = 'tmple_id';
            var sortKey = 'tmple_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req,res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_ErpTmpleCtrl
* Parameters     : req,res()
* Description    : search details of all erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_ErpTmpleCtrl = function (req, res) {

    ErpTmpleMdl.srchErpTmpleMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_ErpTmpleByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmpleByIdCtrl = function (req, res) {

    ErpTmpleMdl.getErpTmpleByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_ErpTmpleCtrl
* Parameters     : req,res()
* Description    : Add new  erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_ErpTmpleCtrl = function (req, res) {

    ErpTmpleMdl.insrtErpTmpleMdl(req.body.data,req.user)
        .then(function (results) {
                     var tmple_id=results.insertId;
            event.record('TEMPLATE',tmple_id,'TEMPLATE_ADDED',"Adding New Template",req.user);
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_ErpTmpleCtrl
* Parameters     : req,res()
* Description    : Update existing  erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_ErpTmpleCtrl = function (req, res) {

    ErpTmpleMdl.updteErpTmpleMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_ErpTmpleCtrl
* Parameters     : req,res()
* Description    : Delete existing  erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_ErpTmpleCtrl = function (req, res) {

    ErpTmpleMdl.dlteErpTmpleMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_ErpTmpleCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_ErpTmpleCtrl', {});
        });
}



/**************************************************************************************
* Controller     : updateTmp_Ptrnrs_Rel
* Parameters     : req,res()
* Description    : Add new  erpTmplt
* Change History :
* 04/02/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.updateTmp_Ptrnrs_Rel = function (req, res) {
    var count = 0;
    for(var i = 0; i < req.body.data.rgnsPrtnrsUpData.length; i++){
        if( req.body.data.rgnsPrtnrsUpData[i].regions > 0){
        ErpTmpleMdl.updateTmp_Ptrnrs_Rel_Mdl(req.body.data.tmp_id,req.body.data.rgnsPrtnrsUpData[i],req.user)
        .then(function (results) {
            count++;
            console.log(count, req.body.data.rgnsPrtnrsUpData.length);
            if (count == req.body.data.rgnsPrtnrsUpData.length-1) {
                df.formatSucessRes(req,res, results, cntxtDtls, '', {});
            }
           
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'updateTmp_Ptrnrs_Rel', {});
        });
    }
}
}


/**************************************************************************************
* Controller     : dlte_tmp_prtnrs_Rel
* Parameters     : req,res()
* Description    : Delete existing  araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_tmp_prtnrs_Rel = function (req, res) {

    ErpTmpleMdl.dlte_tmp_prtnrs_Rel_Mdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AraTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AraTypeCtrl', {});
        });
}



/**************************************************************************************
* Controller     : get_templePartersRelCtrl
* Parameters     : req,res()
* Description    : get details of single  erpTmplt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_templePartersRelCtrl = function (req, res) {

    ErpTmpleMdl.get_templePartersRelCtrlMdl(req.params.id,req.user)
        .then(function (results) {
            var common_feilds = ['tmple_id','tmple_nm'];
            var arrFeilds = ['prtnr_id','prtnr_nm','agnt_id','agnt_nm','agnt_cd','ara_type_id','ara_type_nm','prcnt_ct'];
            var arrName = 'tenants';
            var groupBy = 'prtnr_id';
            var sortKey = 'prtnr_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req,res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
