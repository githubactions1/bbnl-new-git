var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/**********************************************************************
* Function      : getTemplatesMdl
* Description   : 
    nts     : callback function
******************************************************************************/
exports.getTemplatesMdl = () => {
    var fnm='getTemplatesMdl'
    // if(tmpltID == null || tmpltID == undefined || tmpltID == ''){
    var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t`;
    // }
    // else{
    //     var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t where tmplt_id = tmpltID`;
    // }
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/**********************************************************************
* Function       : getTemplatesDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTemplatesDtlsMdl = (tmpltID) => {
    var fnm='getTemplatesDtlsMdl'
    // if(tmpltID == null || tmpltID == undefined || tmpltID == ''){
    // var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t`;
    // }
    // else{
    var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t where tmplt_id = ${tmpltID}`;
    // }
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : insrtTemplateDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtTemplateDtlsMdl = (data, callback) => {
    var fnm='insrtTemplateDtlsMdl'
    console.log('Inserting Offer Temalate in Offerlist');
    // console.log(data.img);
    attachmentUtils.uploadToS3([data.img], 'wetrackon/image_upload', (err, attChres) => {
        let url = attChres[0].Location
        var QRY_TO_EXEC = `INSERT INTO mrcht_ofrs_lst_t (ofr_ctgry_id, ofr_imge_url_tx, tmplt_id, a_in) VALUES ('0', '${url}', '${data.tmplt_id}','1');`;
        ;
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
            // console.log(results)
            callback(err, results)
        });

    })
}
