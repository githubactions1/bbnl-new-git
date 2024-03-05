var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : add_kbSectionMdl
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.add_kbSectionMdl = (data, user) => {
    var fnm = "add_kbSectionMdl"

    var QRY_TO_EXEC = ` insert into kb_sctn_dtl_t (sctn_nm, dscptn_txt,crte_usr_id, i_ts, a_in, pge_id) values('${data.sctn_nm}', '${data.dscptn_txt}',${user.mrcht_usr_id}, current_timestamp(), 1, ${data.pge_id})`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updt_kbSectionMdl
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updt_kbSectionMdl = (data, user) => {
    var fnm = "updt_kbSectionMdl"

    var QRY_TO_EXEC = `update kb_sctn_dtl_t set sctn_nm='${data.sctn_nm}' , dscptn_txt='${data.dscptn_txt}' , updte_usr_id=${user.mrcht_usr_id}, u_ts=current_timestamp() where sctn_id=${data.sctn_id} and pge_id=${data.pge_id};` ;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_kbMdl
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_sectionsMdl = (data, user) => {
var fnm = "get_sectionsMdl"

    var QRY_TO_EXEC = ` select k.sctn_id,k.sctn_nm ,k.dscptn_txt, DATE_FORMAT(k.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp, DATE_FORMAT(k.u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp, 
    k.pge_id, m.mrcht_usr_nm as crte_usr_nm, m1.mrcht_usr_nm as updte_usr_nm
        FROM kb_sctn_dtl_t k 
        left join mrcht_usr_lst_t m on k.crte_usr_id= m.mrcht_usr_id
        left join mrcht_usr_lst_t m1 on k.updte_usr_id= m1.mrcht_usr_id
    WHERE k.pge_id = '${data.page_id}' and  k.a_in=1 order by k.sctn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_kbPageMdl
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_kbPageMdl = (data, user) => {
    var fnm = "get_kbPageMdl"
    var QRY_TO_EXEC = ` select pge_id,pge_nm from kb_pge_lst_t
    WHERE url_txt = '${data.url}';`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : imgUpld
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 22/06/2020    -  Sony Angel  - Initial Function
*
******************************************************************************/
exports.imgUpld = (img_url) => {
    console.log("*******************************image")
    return new Promise((resolve, reject) => {
        if (img_url) {
            if (img_url.match(/base64/i)) {
                attachmentUtils.uploadToS3([img_url], 'wetrackon/image_upload', (err, attChres) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        let url = attChres[0].Location;
                        resolve(url)
                    }

                })
            }
            else {
                resolve(img_url)
            }
        }
        else {
            resolve('')
        }

    })
}
/*****************************************************************************
* Function      : froalaGetDfltImgsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.froalaDltFileMdl = () => {
    return new Promise((resolve, reject) => {
        if (img_url) {
            if (img_url.match(/base64/i)) {
                attachmentUtils.deleteFromS3([img_url], 'wetrackon/image_upload', (err, attChres) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        let url = attChres[0].Location;
                        resolve(url)
                    }

                })
            }
            else {
                resolve(img_url)
            }
        }
        else {
            resolve('')
        }

    })
}