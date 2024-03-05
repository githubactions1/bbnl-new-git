const PckgeIptvChnleMdl = require(appRoot + '/server/api/modules/package/models/PckgeIptvChnleMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require('request');
var jsonUtils = require(appRoot + '/utils/json.utils');
var BrdcrCtrl = require(appRoot + '/server/api/modules/package/controllers/BrdcrCtrl');

var BrdcrMdl = require(appRoot + '/server/api/modules/package/models/BrdcrMdl');
var LngeMdl = require(appRoot + '/server/api/modules/package/models/LngeMdl');
var pckgeBo = require(appRoot + '/server/api/modules/package/packageBo/packageBo');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
/**************************************************************************************
* Controller     : get_PckgeIptvChnleCtrl
* Parameters     : req,res()
* Description    : get details of all pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeIptvChnleCtrl = function (req, res) {

    PckgeIptvChnleMdl.getPckgeIptvChnleMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_PckgeIptvChnleCtrl
* Parameters     : req,res()
* Description    : search details of all pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_PckgeIptvChnleCtrl = function (req, res) {

    PckgeIptvChnleMdl.srchPckgeIptvChnleMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgeIptvChnleByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeIptvChnleByIdCtrl = function (req, res) {

    PckgeIptvChnleMdl.getPckgeIptvChnleByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_PckgeIptvChnleCtrl
* Parameters     : req,res()
* Description    : Add new  pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_PckgeIptvChnleCtrl = function (req, res) {

    PckgeIptvChnleMdl.insrtPckgeIptvChnleMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_PckgeIptvChnleCtrl
* Parameters     : req,res()
* Description    : Update existing  pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_PckgeIptvChnleCtrl = function (req, res) {

    PckgeIptvChnleMdl.updtePckgeIptvChnleMdl(req.body.data, req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_PckgeIptvChnleCtrl
* Parameters     : req,res()
* Description    : Delete existing  pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_PckgeIptvChnleCtrl = function (req, res) {

    PckgeIptvChnleMdl.dltePckgeIptvChnleMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'dlte_PckgeIptvChnleCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'dlte_PckgeIptvChnleCtrl', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgeIptvChnleRefrshCtrl
* Parameters     : req,res()
* Description    : Refresh existing  pckgeIptvChannels
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeIptvChnleRefrshCtrl = function (req, res) {
    let apicalls = pckgeBo.addNwChnles();
    extApiCtrl.callApi("Channels Adding", 12, 10, 0, apicalls,req.user).then((response) => {
        var resp = JSON.parse(response.res)
        var lngarray = []
        var brdcArray = []
        BrdcrMdl.getBrdcrMdl(req.user)
            .then(function (brdcresults) {
                brdcArray.push(brdcresults)
            })
        LngeMdl.getLngeMdl(req.user)
            .then(function (lngresults) {
                lngarray.push(lngresults)
            })
        PckgeIptvChnleMdl.get_PckgeIptvChnleRefrshMdl(req.user)
            .then(function (results) {
                var common_feilds = ['chnle_id', 'chnle_cd', 'chnle_nm', 'lnge_id', 'lnge_nm', 'brdcr_id', 'brdcr_nm'];
                var arrFeilds = ['genre_id', 'genre_nm'];
                var arrName = 'geners';
                var groupBy = 'chnle_cd';
                var sortKey = 'chnle_cd';
                var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

                function comparer(otherArray) {
                    return function (current) {
                        return otherArray.filter(function (other) {
                            return other.chnle_cd == current.serviceId
                        }).length == 0;
                    }
                }
                var onlyInA = resp.services.filter(comparer(groupres));
                if (onlyInA.length > 0) {
                    PckgeIptvChnleMdl.delChnleStgMdl(req.user)
                        .then(function (delstgresults) {
                            PckgeIptvChnleMdl.insrtChnleStgMdl(onlyInA, req.user)
                                .then(function (stgresults) {
                                    PckgeIptvChnleMdl.insrtPckgeIptvChnleMdl(req.user)
                                        .then(function (instrdresults) {
                                            PckgeIptvChnleMdl.insrtPckgeIptvChnle_genereRelMdl(req.user)
                                                .then(function (instrdrelresults) {
                                                    df.formatSucessRes(req, res, instrdresults.affectedRows, cntxtDtls, 'get_PckgeIptvChnleRefrshCtrl', {});
                                                })
                                        })
                                })
                        })
                }
                else {
                    df.formatSucessRes(req, res, onlyInA.length, cntxtDtls, 'get_PckgeIptvChnleRefrshCtrl', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, 'get_PckgeIptvChnleRefrshCtrl', {});
            });
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, 'get_PckgeIptvChnleRefrshCtrl', {});
    });
}

