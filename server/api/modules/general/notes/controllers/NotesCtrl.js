const NotesMdl = require(appRoot + '/server/api/modules/general/notes/models/NotesMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_StatusCtrl
* Parameters     : req,res()
* Description    : get notes
* Change History :
* 17/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.get_NotetsCtrl = function (req,res) {
    enty_id=req.body.enty_id
    enty_ky=req.body.enty_ky
    l1=(req.body.l1===undefined)?0:req.body.l1;
    l2=(req.body.l2===undefined)?100:req.body.l2;
    NotesMdl.getNotesMdl(enty_id,enty_ky,req.user,l1,l2)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


