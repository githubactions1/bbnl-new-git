const NotesMdl = require(appRoot + '/server/api/modules/general/notes/models/NotesMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
/**************************************************************************************
* Controller     : record
* Parameters     : req,res()
* Description    : Inserts the Notes data 
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.record = function (enty_cd,enty_ky,evnt_sts_cd,evnt_tx,user={usr_id:0}) {
    NotesMdl.insrtNotesMdl(enty_cd,enty_ky,evnt_sts_cd,evnt_tx,user)
        .then(function (results) {
            void(0);
        }).catch(function (error) {
            log.err(error)
        });
}
/**************************************************************************************
* Controller     : get
* Parameters     : req,res()
* Description    : search details of all cities
* Change History :
* 18/02/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.get = function (enty_id,enty_ky,l1=0, l2=100) {
    NotesMdl.getNotesMdl(enty_id,enty_ky,l1,l2)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}