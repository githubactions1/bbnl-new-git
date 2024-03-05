var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/******************************************************************************/
exports.get_mrchntdetailsMdl = (id) => {
    var fnm='get_mrchntdetailsMdl'
    var QRY_TO_EXEC = ` select * from mbrsp_dtl_t where  a_in = 1`;

    console.log("membership")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : insrtMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntMdl = (data) => {
    var fnm='insrtMrchntMdl'
    var QRY_TO_EXEC = ` insert into mrcht_lst_t (mrcht_ctgry_id, mrcht_nm, addr1_tx, addr2_tx, strte_id, ste_id, cty_id)
    values (${data.mrcht_ctgry_id}, '${data.mrcht_nm}', '${data.addr1_tx}', '${data.addr2_tx}', ${data.strte_id}, ${data.ste_id}
    , ${data.cty_id}); `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
/*****************************************************************************
* Function      : insrtMrchntMdl
* Description   : from caf ctrl
* Arguments     : callback function
******************************************************************************/
exports.insrtMrcntMdl = (data, user) => {
    var fnm = "insrtMrcntMdl"
    console.log("added into marchent")
    var QRY_TO_EXEC = ` insert into mrcht_lst_t (mrcht_ctgry_id,fst_nm)
    values (1,'${data.orgName}' ); `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntMdl = (id) => {
    var fnm='getMrchntMdl'
    var QRY_TO_EXEC = ` select * from mrcht_lst_t where a_in = 1 order by mrcht_id; `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : updateMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntMdl = (data) => {
    var fnm='updateMrchntMdl'
    var QRY_TO_EXEC = ` update mrcht_lst_t set  mrcht_ctgry_id = ${data.mrcht_ctgry_id}, mrcht_nm = '${data.mrcht_nm}',
    addr1_tx = ${data.mrcht_ctgry_id}, addr2_tx = ${data.mrcht_ctgry_id}, strte_id = ${data.mrcht_ctgry_id}, ste_id = ${data.mrcht_ctgry_id}, 
    cty_id = ${data.mrcht_ctgry_id} where mrcht_id = ${data.mrcht_id} `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : insrtMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtMrchntQRCode = (insertId) => {
    var fnm='updtMrchntQRCode'
    var qr_cde = '';
    var accnt_nu = ' ';
    if (insertId) {

        for (let index = 10; index > (insertId + '').length; index--) {
            qr_cde += '0';
        }
        qr_cde += insertId;
        accnt_nu += 'SCARD_' + insertId;
    }
    var QRY_TO_EXEC = ` update mrcht_lst_t set mrcht_acnt_nu = '${accnt_nu}', qr_cde = '${qr_cde}' where mrcht_id = ${insertId} `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : deltMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntMdl = (id) => {
    var fnm='deltMrchntMdl'
    var QRY_TO_EXEC = ` update  mrcht_lst_t set d_ts = current_timestamp(), a_in = 0 where mrcht_id = ${id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}




/*****************************************************************************
* Function      : upldMrchntDocMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.upldMrchntDocMdl = (data, callback) => {
    var fnm='upldMrchntDocMdl'
    // console.log(data)
    attchMnts.fleUpld(data, 'wetrackon/image_upload', (err, filePath) => {
        var QRY_TO_EXEC = ` select * from trmnl_lst_t; `;

        console.log(filePath)
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, result) => {
            callback(err, [{
                filePath: filePath[0].Location
            }])
        });
    })
}


/*****************************************************************************
* Function      : updateMrchntSetupMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntSetupMdl = (data, callback) => {
    var fnm='updateMrchntSetupMdl'
    console.log(data)
    var QRY_TO_EXEC =
        `update mrcht_mnu_itm_rel_t 
   set stp_in = 1             
   where mnu_itm_id = ${data.mnu_itm_id} And usr_id in 
   (
       select tt.mrcht_usr_id
       from 
       (
           SELECT m.mrcht_id,m.mrcht_usr_id,r.mnu_itm_id,r.stp_in FROM mrcht_usr_rel_t m 
   LEFT JOIN mrcht_mnu_itm_rel_t r ON m.mrcht_usr_id = r.usr_id
   where m.mrcht_id = ${data.mrchnt_id} GROUP BY m.mrcht_usr_id
       ) as tt
   )`;

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
        callback(err, results)
    });



}
