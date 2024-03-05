const GenreMdl = require(appRoot + '/server/api/modules/package/models/GenreMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_GenreCtrl
* Parameters     : req,res()
* Description    : get details of all genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_GenreCtrl = function (req, res) {

    GenreMdl.getGenreMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_GenreCtrl
* Parameters     : req,res()
* Description    : search details of all genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_GenreCtrl = function (req, res) {

    GenreMdl.srchGenreMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_GenreByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_GenreByIdCtrl = function (req, res) {

    GenreMdl.getGenreByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_GenreCtrl
* Parameters     : req,res()
* Description    : Add new  genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_GenreCtrl = function (req, res) {

    GenreMdl.insrtGenreMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_GenreCtrl
* Parameters     : req,res()
* Description    : Update existing  genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_GenreCtrl = function (req, res) {

    GenreMdl.updteGenreMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_GenreCtrl
* Parameters     : req,res()
* Description    : Delete existing  genrelst
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_GenreCtrl = function (req, res) {

    GenreMdl.dlteGenreMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_GenreCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_GenreCtrl', {});
        });
}