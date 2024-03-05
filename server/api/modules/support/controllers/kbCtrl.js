const kbMdl = require(appRoot + '/server/api/modules/support/models/kbMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : add_kbSectionCtrl
* Parameters     : req,res()
* Description    : get details of all Application
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.add_kbSectionCtrl = function (req, res) {

    kbMdl.add_kbSectionMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : updt_kbSectionCtrl
* Parameters     : req,res()
* Description    : get details of all Application
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updt_kbSectionCtrl = function (req, res) {

    kbMdl.updt_kbSectionMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : dlt_kbSectionCtrl
* Parameters     : req,res()
* Description    : get details of all Application
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlt_kbSectionCtrl = function (req, res) {

    kbMdl.get_sectionsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_kbSectionsCtrl
* Parameters     : req,res()
* Description    : get details of all Application
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_kbSectionsCtrl = function (req, res) {

    kbMdl.get_sectionsMdl(req.params,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_kbPageCtrl
* Parameters     : req,res()
* Description    : get details of all Application
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_kbPageCtrl = function (req, res) {
    kbMdl.get_kbPageMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

const formidable = require('formidable')

/**************************************************************************************
* Controller     : froalaImgUpld
* Parameters     : req,res()
* Description    : 
* Change History :
* 19/07/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.froalaImgUpld = function (req, res) {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            log.info(err, 0, cntxtDtls);
            throw err
        }
        kbMdl.imgUpld(fields.imgData)
            .then(function (img_res) {
                res.status(200).send({ "link": img_res });
            }).catch(function (error) {
                log.info(error, 0, cntxtDtls);
                df.formatErrorRes(res, error, cntxtDtls, '', {});
            });
    })

}


/**************************************************************************************
* Controller     : froalaImgUpld
* Parameters     : req,res()
* Description    : 
* Change History :
* 19/07/2019    -  Murali Krishna  - Initial Function
* 22/06/2020    -  Sony Angel  - copied from AllIGet
***************************************************************************************/

exports.froalaVideoUpld = function (req, res) {
    log.info("froalaVideoUpld..................................video", 0, cntxtDtls);
    new formidable.IncomingForm().parse(req, (err, fields, file) => {

        if (err) {
            log.info(err, 0, cntxtDtls);
            throw err
        }
        // fields.videoData
        kbMdl.videoUpld(fields.videoData)
            .then(function (video_res) {
                res.status(200).send({ "link": video_res.url, 'id': video_res.id });
            }).catch(function (error) {
                log.info(error, 0, cntxtDtls);
                df.formatErrorRes(res, error, cntxtDtls, '', {});
            });
    })

}

/**************************************************************************************
* Controller     : froalaDltFile
* Parameters     : req,res()
* Description    : 
* Change History :
* 19/07/2019    -  Murali Krishna  - Initial Function
* 22/06/2020    -  Sony Angel  - copied from AllIGet
*
***************************************************************************************/

exports.froalaDltFile = function (req, res) {
    log.info("froalaDltFile..................................", 0, cntxtDtls);
    // path.basename('/foo/bar/baz/asdf/quux.html')
    kbMdl.froalaDltFileMdl()
        .then(function (img_res) {
            res.status(200).send(img_res);
        }).catch(function (error) {
            log.info(error, 0, cntxtDtls);

            df.formatErrorRes(res, error, cntxtDtls, '', {});
        });
}