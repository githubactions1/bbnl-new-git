var ev = require(appRoot + '/utils/evntsts.utils');
var apCnst = require(appRoot + '/utils/appConstants');

/*****************************************************************************
* Function      : updateEntyAndEvntSts
* Description   : update entity status and entity event status
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Seetharam ** Initial Code
******************************************************************************/
exports.updateEntyAndEvntSts = function (enty, enty_id, evnt_code, sts_code) {
    console.log(enty, enty_id, evnt_code, sts_code)
    return new Promise((resolve, reject) => {
        updateEntySts(enty_id, sts_code).then(() => {
            updateEntyEvntSts(enty, enty_id, evnt_code, apCnst.evntTxts.INSTALLED).then(() => {

            })

            resolve(true)
        })
    })
}
/*****************************************************************************
* Function      : updateEntySts
* Description   : update entity  status
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Seetharam ** Initial Code
******************************************************************************/
exports.updateEntySts = function (enty, enty_id, sts_code) {
    return new Promise((resolve, reject) => {

    })
};
/*****************************************************************************
* Function      : updateEventStatus
* Description   : update entity event status
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Seetharam ** Initial Code
******************************************************************************/
exports.updateEntyEvntSts = function (Directories) {
    return new Promise((resolve, reject) => {

    })

};