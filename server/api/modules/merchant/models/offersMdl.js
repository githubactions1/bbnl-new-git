var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/*****************************************************************************
* Function      : getMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntOffrsMdl = (mrchntID,mnu_itm_id) => {
    var fnm='getMrchntOffrsMdl'
    var QRY_TO_EXEC = 
    `select o.*, CASE when o.ofr_id then 'offer' end as type,a.min_aprve_cnt,u.mrcht_usr_id,ap.arvl_in From mrcht_ofrs_lst_t o 
    join mrcht_ofr_rel_t as m on m.ofr_id=o.ofr_id
    JOIN aprvl_lst_t a on a.mnu_itm_id = o.mnu_itm_id LEFT JOIN mrcht_emp_grp_rel_t e
     ON a.grp_id = e.grp_id 
     LEFT JOIN mrcht_usr_rel_t u ON e.emp_id = u.emp_id
    LEFT JOIN aprvl_evnt_dtl_t ap ON u.mrcht_usr_id = ap.usr_id and o.ofr_id = ap.itm_id WHERE a.mnu_itm_id = ${mnu_itm_id} And u.mrcht_id = ${mrchntID} Order BY  o.ofr_id
    `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : insrtMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntOffrsMdl = (data, callback) => {
    var fnm='insrtMrchntOffrsMdl'
    attachmentUtils.uploadToS3([data.base64], 'wetrackon/image_upload', (err, attChres) => {
        let url = attChres[0].Location
        data.desc = data.desc.replace(/'/g, "''");
        data.trmsCndtns = data.trmsCndtns.replace(/'/g, "''");
        var QRY_TO_EXEC = `INSERT INTO mrcht_ofrs_lst_t ( ofr_nm, ofr_ctgry_id, ofr_dscn_tx, ofr_imge_url_tx, efcte_dt, expry_dt, trms_cndn_tx,usg_lmt,tmplt_id,mnu_itm_id, a_in) VALUES ('${data.title}', '1',  '${data.desc}', '${url}', '${data.fromDt}', '${data.toDt}', '${data.trmsCndtns}', '${data.usgLmt}','${data.tmplt_id}',${data.mnu_itm_id},'1');`;
        console.log('insrtMrchntOffrsMdl');
        
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
            console.log('insrtMrchntOffrsMdl-------------------------');
            console.log(results)
            callback(err, results)
        });

    })

}

/*****************************************************************************
* Function      : insrtMrchntOffrRelMdl
* Description   : 
guments     : callback function
******************************************************************************/
exports.insrtMrchntOffrRelMdl = (mrchntId, offrId) => {
    var fnm='insrtMrchntOffrRelMdl'
    var QRY_TO_EXEC = ` insert into mrcht_ofr_rel_t (ofr_id, mrcht_id)
    values (${offrId}, ${mrchntId}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
// var QRY_TO_EXEC = 
// `INSERT INTO aprvl_evnt_dtl_t (mnu_itm_id, itm_id, usr_id, arvl_in, a_in) VALUES (${data.mnu_itm_id}, ${data.ofr_id}, ${data.usr_id}, 1, 1);`
// 
// dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls).then((results)=>{
//     var QRY_TO_EXEC = 
//     `SELECT count(*) as aprvl_cnt from aprvl_evnt_dtl_t where itm_id = ${data.ofr_id} and arvl_in = 1;`
//     
//     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls).then((aprvlRes)=>{
//        if(aprvlRes[0].aprvl_cnt == data.min_aprve_cnt){
//         var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  aprve_in='1', a_in=1 WHERE ofr_id=${data.ofr_id};`;
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', (err, results) => {
//             console.log(results)
//             callback(err, results)
//         });
//        }else{
//         callback(err, aprvlRes)
//        }
       
//     }).catch(()=>{

//     })
// }).catch(()=>{
        
//     })
/******************************************************************
    : updateMrchntOffrsMdl
    : 
    : callback function
******************************************************************/
exports.updateMrchntOffrsMdl = (data, callback) => {
    var fnm='updateMrchntOffrsMdl'
    // ofr_id:id,
    // min_aprve_cnt:min_aprve_cnt,
    // mnu_itm_id:mnu_itm_id,
    // usr_id:this.usrdtls.mrcht_usr_id
    if (data.ofr_id) {
        var QRY_TO_EXEC = `INSERT INTO aprvl_evnt_dtl_t (mnu_itm_id, itm_id, usr_id, arvl_in, a_in) VALUES (${data.mnu_itm_id}, ${data.ofr_id}, ${data.usr_id}, 1, 1);`;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
            console.log(results)
            callback(err, results)
        });

    }
    else {
        data.desc = data.desc.replace(/'/g, "''");
        data.trmsCndtns = data.trmsCndtns.replace(/'/g, "''");
        if (data.base64) {
            attachmentUtils.uploadToS3([data.base64], 'wetrackon/image_upload', (err, attChres) => {
                let url = attChres[0].Location
                var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  ofr_nm='${data.title}', ofr_ctgry_id=1, ofr_dscn_tx='${data.desc}', ofr_imge_url_tx='${url}', usg_lmt='${data.usgLmt}', efcte_dt='${data.fromDt}' , expry_dt='${data.toDt}', trms_cndn_tx='${data.trmsCndtns}', tmplt_id = '${data.tmplt_id}', a_in=1 WHERE ofr_id=${data.id};`;
                
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
                    console.log(results)
                    callback(err, results)
                });

            })
        } else {
            var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  ofr_nm='${data.title}', ofr_ctgry_id=1, ofr_dscn_tx='${data.desc}', ofr_imge_url_tx='${data.imgUrl}', usg_lmt='${data.usgLmt}', efcte_dt='${data.fromDt}' , expry_dt='${data.toDt}', trms_cndn_tx='${data.trmsCndtns}', tmplt_id = '${data.tmplt_id}', a_in=1 WHERE ofr_id=${data.id};`;
            
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
                console.log(results)
                callback(err, results)
            });
        }
    }
}
/*****************************************************************************
* Function      : deltMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntOffrsMdl = (id, mrchntID, callback) => {
    var fnm='deltMrchntOffrsMdl'
    var QRY_TO_EXEC = `DELETE FROM mrcht_ofrs_lst_t WHERE  ofr_id  in (SELECT t1.ofr_id FROM mrcht_ofrs_lst_t t1 LEFT JOIN mrcht_ofr_rel_t t2 ON t1.ofr_id = t2.ofr_id WHERE t2.mrcht_id =${mrchntID} AND t2.ofr_id = ${id});`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm).then(function (results) {
        var QRY_TO_EXEC = `DELETE r FROM mrcht_ofr_rel_t r WHERE r.mrcht_id = ${mrchntID} AND r.ofr_id = ${id}  ;`;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
            callback(err, results)
        });
    }).catch(function (error) {

    });
}



/******************************************************************
    : approveOfferMdl
    : 
    : callback function
******************************************************************/
exports.approveOfferMdl = (data, callback) => {
    var fnm='approveOfferMdl'
    var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  aprve_in='1', a_in=1 WHERE ofr_id=${data.ofr_id};`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        console.log(results)
        callback(err, results)
    });
    }
