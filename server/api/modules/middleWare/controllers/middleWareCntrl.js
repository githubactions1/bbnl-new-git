const mddleWareMdl = require(appRoot + '/server/api/modules/middleWare/models/middleWareMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require('request');
var jsonUtils = require(appRoot + '/utils/json.utils');

/**************************************************************************************
* Controller     : get_CstmrvoipByIdCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 28/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/
exports.get_CstmrvoipByIdCtrl = function (req, res) {
    console.log(req.params.id);
    mddleWareMdl.get_CstmrvoipByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CstmrInvoiceByIdCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 28/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/
exports.get_CstmrInvoiceByIdCtrl = function (req, res) {
    console.log(req.params.id);
    mddleWareMdl.get_CstmrInvoiceByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : get_CstmrInvoiceChargsByIdCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 28/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/
exports.get_CstmrInvoiceChargsByIdCtrl = function (req, res) {
    console.log(req.params.id);
    mddleWareMdl.get_CstmrInvoiceChargsByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : get_CstmrHsiByIdCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 27/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/

exports.get_CstmrHsiByIdCtrl = function (req, res) {
    console.log(req.params.id);
    mddleWareMdl.get_CstmrHsiByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
 * Controller     : getchannelAprvlLst
 * Parameters     : None
 * Description    :
 * Change History :
 * 21/07/2020    -  - Initial Function
 ***************************************************************************************/

exports.getchannelAprvlLst = function (req, res) {
    var fnm = "getchannelAprvlLst";
    console.log('getchannelAprvlLst _________________________________ ');
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    mddleWareMdl.getchannelAprvlLstMdl(req.body, req.user)
        .then((results) => {
            var common_feilds = ['caf_id','caf_nu', 'req_dt', 'sbscrptn_req_ts', 'sbscrptn_req_in', 'frst_nm', 'lst_nm', 'mbl_nu','iptv_srl_nu', 'iptv_mac_addr_tx'];
        var arrFeilds = ['caf_id','caf_nu','pckge_id','req_dt', 'sbscrptn_req_ts', 'sbscrptn_req_in', 'frst_nm', 'lst_nm','cstmr_nm','adhr_nu','mbl_nu','iptv_srl_nu', 'iptv_mac_addr_tx','onu_srl_nu', 'pckge_nm', 'ttl_cst', 'srvcpk_id', 'srvcpk_nm', 'chnle_id', 'chnle_nm', 'efcte_dt', 'expry_dt'];
        var arrName = 'cafDtls';
        var groupByKey = 'caf_id';
        var sortKey = 'pckge_id'
        cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, cstmrInvoicArray, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
};

/**************************************************************************************
 * Controller     : getchannelHstryLst
 * Parameters     : None
 * Description    :
 * Change History :
 * 21/07/2020    -  - Initial Function
 ***************************************************************************************/

exports.getchannelHstryLst = function (req, res) {
    var fnm = "getchannelHstryLst";
    console.log('getchannelHstryLst _________________________________ ');
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    mddleWareMdl.getchannelHstryLstMdl(req.body, req.user)
        .then((results) => {
            var common_feilds = ['caf_id','caf_nu', 'req_dt', 'sbscrptn_req_ts', 'sbscrptn_req_in', 'frst_nm', 'lst_nm', 'mbl_nu','iptv_srl_nu', 'iptv_mac_addr_tx','status','rjct_ts','aprvl_ts'];
        var arrFeilds = ['caf_id','caf_nu','pckge_id','req_dt', 'sbscrptn_req_ts', 'sbscrptn_req_in', 'frst_nm', 'lst_nm','cstmr_nm','adhr_nu','mbl_nu','iptv_srl_nu', 'iptv_mac_addr_tx','onu_srl_nu', 'pckge_nm', 'ttl_cst', 'srvcpk_id', 'srvcpk_nm', 'chnle_id', 'chnle_nm', 'efcte_dt', 'expry_dt','status','rjct_ts','aprvl_ts'];
        var arrName = 'cafDtls';
        var groupByKey = 'caf_id';
        var sortKey = 'pckge_id'
        cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, cstmrInvoicArray, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
};
/**************************************************************************************
 * Controller     : postUpdtAprvl
 * Parameters     : None
 * Description    :
 * Change History :
 * 21/07/2020    -  - Initial Function
 ***************************************************************************************/
var updateAprvlInMware = (data) => {
    console.log("updateAprvlInMware _________________________________");
    console.log(data)
    const options = {
        url: 'http://mware.glits.info/apiv1/iptvbox/updtAprvl',
        // url: 'http://localhost:4901/apiv1/iptvbox/updtAprvl',
        body: data,
        json: true
    };
    request.post(options, function (error, response, body) {
        console.log(error)
        console.log(body);
    });
}

exports.postUpdtAprvl = function (req, res) {
    var fnm = "postUpdtAprvl";
    // console.log('postUpdtAprvl _________________________________ ');
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    mddleWareMdl.postUpdtAprvlMdl(req.body.data, req.user, (err, results)=>{
        if(err){
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }
        else{
            updateAprvlInMware(req.body.data)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }
    });
  
};


/**************************************************************************************
 * Controller     : postRjctAprvl
 * Parameters     : None
 * Description    :
 * Change History :
 * 21/07/2020    -  - Initial Function
 ***************************************************************************************/
var updateRjctInMware = (data) => {
    console.log("updateRjctInMware _________________________________");
    console.log(data)
    const options = {
        url: 'http://mware.glits.info/apiv1/iptvbox/rjctAprvl',
        // url: 'http://localhost:4901/apiv1/iptvbox/rjctAprvl',
        body: data,
        json: true
    };
    request.post(options, function (error, response, body) {
        console.log(error)
        console.log(body);
    });
}

exports.postRjctAprvl = function (req, res) {
    var fnm = "postRjctAprvl";
    // console.log('postRjctAprvl _________________________________ ');
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    mddleWareMdl.postRjctAprvlMdl(req.body.data, req.user, (err, results)=>{
        if(err){
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }
        else{
            updateRjctInMware(req.body.data)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }
    });
  
};




/**************************************************************************************
* Controller     : insrtSubscrptnRqustCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 27/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/

exports.insrtSubscrptnRqustCtrl = function (req, res) {
    mddleWareMdl.insrtSubscrptnRqustMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : updtUnsubscrptnRqustCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* 27/07/2020    -  Madhuri  - Initial Function
***************************************************************************************/

exports.updtUnsubscrptnRqustCtrl = function (req, res) {
    mddleWareMdl.updtUnsubscrptnRqustMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
