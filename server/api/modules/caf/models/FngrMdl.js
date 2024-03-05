
var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


var csfslct
var skipval = 10
var takeslct








/*****************************************************************************
* Function      : gtFntMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/

exports.gtFntMdl = (data, user, callback) => {
    var fnm = "gtFntMdl"


    console.log('---------------------------------------------------------')

    var QRY_TO_EXEC = `SELECT * from msgs_fnt_lst_t where a_in=1 ORDER BY fnt_id;`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : gtclrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/

exports.gtclrMdl = (data, user, callback) => {
    var fnm = "gtclrMdl"


    console.log('---------------------------------------------------------')

    var QRY_TO_EXEC = `select * from msgs_clr_lst_t where a_in=1 ORDER BY clr_id ;`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : srvpcsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtmsgTypMdl = (data, user, callback) => {
    var fnm = "gtmsgTypMdl"


    console.log('---------------------------------------------------------')

    var QRY_TO_EXEC = `select * from msgs_type_lst_t;`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getfngrcafdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getfngrcafdtMdl = (skip, take, data, user, callback) => {
    var fnm = "getfngrcafdtMdl"
    if (take == 10)
        skipval = Number(skip) + 10
    if (take == 25)
        skipval = Number(skip) + 25
    if (take == 50)
        skipval = Number(skip) + 50
    if (take == 100)
        skipval = Number(skip) + 100
    if (take == 1000)
        skipval = Number(skip) + 1000

    //   takeslct =Number(take)
    //   console.log(skipval)
    // var from=0
    // var to=10
    // if(data.pgIndex>=1){
    //     from=(data.pgIndex-1)*(data.pgsze)
    //     to=(data.pgsze)*(data.pgIndex)
    // }



    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.caf_id,CONCAT(c.frst_nm," ",c.lst_nm)as frst_nm,
    REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') as actvn_dt,cf.caf_nu,cf.mdlwe_sbscr_id,cf.caf_mac_addr_tx from caf_dtl_t as cf
    join cstmr_dtl_t as c on c.cstmr_id=cf.cstmr_id
    where cf.caf_type_id=1 limit ${take} OFFSET ${skip}
    `;
    console.log(csfslct = QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.getSelcttMdl = (skip, take, data, user, callback) => {
    var fnm = "getSelcttMdl"

    // var from=0
    // var to=10
    // if(data.pgIndex>=1){
    //     from=(data.pgIndex-1)*(data.pgsze)
    //     to=(data.pgsze)*(data.pgIndex)
    // }

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.caf_id,CONCAT(c.frst_nm," ",c.lst_nm)as frst_nm,
        REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') as actvn_dt,cf.caf_nu,cf.mdlwe_sbscr_id,cf.caf_mac_addr_tx from caf_dtl_t as cf
        join cstmr_dtl_t as c on c.cstmr_id=cf.cstmr_id where cf.caf_type_id=1 limit ${skipval}`
        ;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            // callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : gtmsgCtgryMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtCafSrchMdl = (data, user, callback) => {
    var fnm = "gtCafSrchMdl"

    where = 'cf.caf_type_id=1 and '
    for (i = 0; i < data.length; i++) {
        console.log(data[i].key)
        if (data[i].key == 'frst_nm') {


            data[i].key = ` concat_ws(' ',c.frst_nm,c.lst_nm)`
            console.log(data[i].key)
        }
        if (data[i].key == 'actvn_dt' || data[i].key == 'caf_mac_addr_tx' || data[i].key == 'adhr_nu' || data[i].key == 'mdlwe_sbscr_id') {
            str = "cf."
            console.log(str)
            data[i].key = str.concat(data[i].key)
        }

        where += ` ${data[i].key} like '%${data[i].value}%'`
        if (i != data.length - 1) {
            where += ` or`
        }
    }



    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.caf_id,CONCAT(c.frst_nm," ",c.lst_nm)as frst_nm,
    REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') as actvn_dt,cf.caf_nu,cf.mdlwe_sbscr_id,cf.caf_mac_addr_tx from caf_dtl_t as cf
    join cstmr_dtl_t as c on c.cstmr_id=cf.cstmr_id where  ${where}
    `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : gtmsgCtgryMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtmsgCtgryMdl = (data, user, callback) => {
    var fnm = "gtmsgCtgryMdl"



    var QRY_TO_EXEC = `SELECT * from msgs_ctgry_lst_t ORDER BY msgs_ctgry_id;
    `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : gtmsgStsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtmsgStsMdl = (data, user, callback) => {
    var fnm = "gtmsgStsMdl"



    var QRY_TO_EXEC = `SELECT * FROM enty_sts_lst_t ORDER BY enty_sts_id limit 5,8;
    `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_fngr
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.sndMsgMdl = (data, user, callback) => {

    var fnm = "sndMsgMdl"

    if (data.command == 'OSD') {

        var QRY_TO_EXEC = `insert into  msgs_dtl_t (msge_tx,msge_clse_in,msge_drtn_ct,msgs_ctgry_id,msge_type_id,expry_dt,pstn_tx,fnt_id,fnt_sze_ct,frnt_clr_id,bkgrd_clr_id,enty_sts_id,crte_usr_id,a_in,i_ts)
                                              VALUE('${data.message}','${data.userCanCloseMessage}','${data.duration}','${data.msgcat}','${data.msgtype}','${data.expiryDate}','${data.position}','${data.fontTypeId}','${data.fontSize}','${data.fontColorId}','${data.bgColorId}',1,'${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP())
    `;

    }
    if (data.command == 'SCROLL_TEXT') {

        var QRY_TO_EXEC = `insert into  msgs_dtl_t (msge_tx,msgs_ctgry_id,msge_type_id,expry_dt,msge_drtn_ct,enty_sts_id,crte_usr_id,a_in,i_ts)
                                              VALUE('${data.message}','${data.msgcat}','${data.msgtype}','${data.expiryDate}','${data.duration}',1,'${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP())`
    }
    if (data.command == 'FINGER_PRINT') {


        var QRY_TO_EXEC = `insert into  msgs_dtl_t (msge_drtn_ct,msgs_ctgry_id,msge_type_id,expry_dt,pstn_tx,fnt_id,fnt_sze_ct,frnt_clr_id,bkgrd_clr_id,enty_sts_id,stc_in,crte_usr_id,a_in,i_ts)
                                              VALUE('${data.duration}','${data.msgcat}',0,'${data.expiryDate}','${data.position}','${data.fontType}','${data.fontSize}','${data.fontColor}','${data.bgColor}',1,'${data.Fingertype}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP())`
    }

    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

// exports.sndMsgMdl = (msgid,cafid,user,callback) => {


//     if(data.command =='OSD'){

//       var QRY_TO_EXEC = `insert into caf_msgs_rel_t (caf_id,msge_id) value(${msgid},${cafid})

//       `;

//     }

//     console.log(QRY_TO_EXEC)

//     if (callback && typeof callback == "function")
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     else
//         return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
//   }

/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCafRelMdl = (msge_id, caf_id, user, callback) => {
    var fnm = "insrtCafRelMdl"
    var QRY_TO_EXEC = `INSERT INTO caf_msgs_rel_t (caf_id, msge_id, crte_usr_id, a_in,i_ts) VALUES (${caf_id},${msge_id},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtagntRelMdl = (msge_id, agnt_cd, user, callback) => {
    var fnm = "insrtagntRelMdl"

    var QRY_TO_EXEC = `INSERT INTO agnt_msgs_rel_t (agnt_cd, msge_id, crte_usr_id, a_in, i_ts) VALUES ('${agnt_cd}',${msge_id},${user.mrcht_usr_id},1, CURRENT_TIMESTAMP());`;
    //console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);


}

/*****************************************************************************
* Function      : insrtAgntRelMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtAgntRelMdl = (msge_id, ids, user, callback) => {
    var fnm = "insrtAgntRelMdl"
    values = `VALUES`
    for (var i = 0; i < ids.length; i++) {
        if(i == ids.length - 1){
            values += `('${ids[i]}',${msge_id} ,${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`
        }else{
            values += `('${ids[i]}',${msge_id} ,${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()),`
        }
        
    }
    var QRY_TO_EXEC = `INSERT INTO agnt_msgs_rel_t (agnt_cd, msge_id, crte_usr_id, a_in, i_ts) ${values}`;
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getGrpFngrcafdtMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getGrpFngrcafdtMdl = (data, msge_id, user, callback) => {
    var fnm = "getGrpFngrcafdtMdl"

    var where = "cf.caf_type_id=1  "

    if (data.dstrc_id) {
        where += `and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    }
    if (data.vlge_id) {
        where += `and cf.instl_vlge_id=${data.vlge_id} `
    }
    var QRY_TO_EXEC = ` 
    SELECT ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.caf_id,CONCAT(c.frst_nm," ",c.lst_nm)as frst_nm,
    REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.actvn_dt,cf.caf_nu,cf.mdlwe_sbscr_id,cf.caf_mac_addr_tx from caf_dtl_t as cf
    join cstmr_dtl_t as c on c.cstmr_id=cf.cstmr_id where ${where}`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.gtCafctMdl = (caf_id, msge_id, user, callback) => {
    var fnm = "gtCafctMdl"
    var QRY_TO_EXEC = `
    select COUNT(*) as tl_cafs from caf_dtl_t where a_in=1`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/

exports.getMsgDtlsMdl = (data, user, callback) => {
    var fnm = "getMsgDtlsMdl"
    var where = "1 = 1 "

    if (data.Catg_id) {
        where += `and m.msgs_ctgry_id=${data.Catg_id} `
    }
    if (data.msgty_id) {
        where += `and m.msge_type_id=${data.msgty_id} `
    }
    if (data.str_dt && data.end_dt) {
        where += `and (m.expry_dt BETWEEN ${data.str_dt} AND ${data.str_dt}) `
    } else if (data.str_dt) {
        where += `and  m.expry_dt=${data.str_dt} `
    } if (data.till_dt) {
        where += `and m.expry_dt<CURDATE()
             `
    } if (data.Stuts_id) {
        where += `and m.enty_sts_id=${data.Stuts_id}`
    }


    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY m.msge_id) sno,m.*,DATE(m.i_ts) as send_dt,mc.msgs_ctgry_nm,mt.msge_type_nm,es.sts_nm,mf.fnt_nm,c.clr_nm,bc.clr_nm as bg_clr,bc.clr_cd AS bg_clr_cd from msgs_dtl_t m
        join msgs_ctgry_lst_t mc on mc.msgs_ctgry_id=m.msgs_ctgry_id
        join msgs_type_lst_t mt on mt.msge_type_id=m.msge_type_id
        join enty_sts_lst_t es on es.enty_sts_id=m.enty_sts_id
		join msgs_fnt_lst_t mf on mf.fnt_id=m.fnt_id
        join msgs_clr_lst_t c on c.clr_id=m.frnt_clr_id
        join msgs_clr_lst_t bc on bc.clr_id=m.bkgrd_clr_id
        where ${where}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getmsgbyidMdl = (msge_id, user, callback) => {
    var fnm = "getmsgbyidMdl"
    var QRY_TO_EXEC = `
    SELECT ROW_NUMBER() OVER ( ORDER BY m.msge_id) sno,c.caf_id,c.mdlwe_sbscr_id,md.mndl_nm,d.dstrt_nm from msgs_dtl_t m
    join caf_msgs_rel_t mc on mc.msge_id=m.msge_id
    join caf_dtl_t c on c.caf_id=mc.caf_id
    JOIN mndl_lst_t md on md.mndl_id=c.instl_mndl_id
    JOIN dstrt_lst_t d on md.dstrt_id=d.dstrt_id
    WHERE m.msge_id=${msge_id}`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafRelMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMsgLmoMdl = (data, user, callback) => {
    var fnm = "getMsgLmoMdl"
    where = '1=1 '
    if (data.dstr_id) {
        where += `and ofce_dstrt_id =${data.dstr_id} `
    }
    if (data.mndl_id) {
        where += `and ofce_mndl_id=${data.mndl_id} `
    }
    if (data.vlge_id) {
        where += `and ofce_vlge_id=${data.vlge_id} `
    }
    var QRY_TO_EXEC = `SELECT agnt_cd,agnt_id from agnt_lst_t where  ${where}
 `;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : cnclmsgMdl
* Description   : Insert Into CafMsg Relation table
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.cnclmsgMdl = (data, user, callback) => {
    var fnm= "cnclmsgMdl"
    console.log(data)
    var QRY_TO_EXEC = `
    update msgs_dtl_t set enty_sts_id= 9,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() where msge_id =${data[0].msge_id}`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    // return new Promise((resolve, reject) => {
    //     resolve(true)
    // })
}