var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getPckgePlnMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgePlnMdl = (user, callback) => {
    var fnm = "getPckgePlnMdl"
    var QRY_TO_EXEC = `SELECT pckge_id,pckge_nm,efcte_dt,expry_dt,caf_type_id
    FROM pckge_lst_t
    WHERE a_in = 1`
    log.info(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_PckgesMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgesMdl = (user, callback) => {
    var fnm = "get_PckgesMdl"
    var QRY_TO_EXEC = `
    SELECT p.pckge_id,psr.pckge_srvcpk_rel_id,p.pckge_nm,psr.srvcpk_id,s.srvcpk_nm,cd.chrge_at,cd.gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,cs.cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx as chrgTyp,DATE_FORMAT(p.efcte_dt,'%d-%m-%Y')efcte_dt,
        DATE_FORMAT(p.expry_dt,'%d-%m-%Y') as expry_dt,p.efcte_dt as date,p.expry_dt as date1,psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm
        from pckge_lst_t as p
        JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
        JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
        JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
        JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
        join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
            JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
        JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
        where p.a_in=1
        ORDER BY p.pckge_id,s.cre_srvce_id`
    log.info(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : srchPckgePlnMdl
* Description   : search details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchPckgePlnMdl = (data, user, callback) => {
    var fnm = "srchPckgePlnMdl"
    var QRY_WHERE = "1 = 1"

    if (data.hasOwnProperty('pckge_nm')) {
        QRY_WHERE += ` AND pckge_nm='${data.pckge_nm}'`
    }
    if (data.hasOwnProperty('efcte_dt')) {
        QRY_WHERE += ` AND efcte_dt='${data.efcte_dt}'`
    }
    if (data.hasOwnProperty('expre_dt')) {
        QRY_WHERE += ` AND expre_dt='${data.expre_dt}'`
    }
    if (data.hasOwnProperty('caf_type_id')) {
        QRY_WHERE += ` AND caf_type_id=${data.caf_type_id}`
    }
    if (data.hasOwnProperty('chrge_at')) {
        QRY_WHERE += ` AND chrge_at=${data.chrge_at}`
    }
    if (data.hasOwnProperty('gst_at')) {
        QRY_WHERE += ` AND gst_at=${data.gst_at}`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
    }
    if (data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}` } else { QRY_WHERE += ` AND a_in=1` }
    if (data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL` } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY pckge_id) sno,
                                pckge_id,pckge_nm,efcte_dt,expre_dt,caf_type_id,chrge_at,gst_at,a_in 
                        FROM pckge_lst_t 
                        WHERE ${QRY_WHERE} AND pckge_id= ${data.pckge_id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPckgePlnByIdMdl
* Description   : get details of single  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgePlnByIdMdl = (id, user, callback) => {
    var fnm = "getPckgePlnByIdMdl"
    var QRY_TO_EXEC = `SELECT pckge_id,pckge_nm,efcte_dt,expre_dt,caf_type_id,chrge_at,gst_at,a_in 
                        FROM pckge_lst_t 
                        WHERE a_in = 1 AND pckge_id= ${id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtPckgePlnMdl
* Description   : Add new  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgePlnMdl = (data, user, callback) => {
    var fnm = "insrtPckgePlnMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_lst_t(pckge_nm,efcte_dt,expry_dt,caf_type_id,lckn_dys_ct,glbl_in,pckge_type_id,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.pckge_nm}','${data.efcte_dt}','${data.expre_dt}',${data.caf_type_id},${data.lckn_dys_ct},${data.glbl_in},${data.srvcpk_type_id},1,CURRENT_TIMESTAMP(),${user.user_id})`;
    log.info(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


// /*****************************************************************************
// * Function      : insrtPckgesrvcrelMdl
// * Description   : Add new  packagePlan
// * Arguments     : callback function
// * Change History :
// * 05/02/2020    -  SCRIPT DENERATED  - Initial Function
// *
// ******************************************************************************/
exports.insrtPckgesrvcrelMdl = (data1, data, insertId, user, callback) => {
    var fnm = "insrtPckgesrvcrelMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_srvcpk_rel_t(pckge_id,srvcpk_id,cre_srvce_id,lckn_dys_ct,efcte_dt,expry_dt,a_in,i_ts,crte_usr_id) VALUES ('${insertId}',${data1.srvcpk_id},${data1.cre_srvce_id},${data.lckn_dys_ct},'${data.efcte_dt}','${data.expre_dt}',1,CURRENT_TIMESTAMP(),${user.user_id})`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrtPckgechrgMdl
* Description   : add packge related charges
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgechrgMdl = (data1, data, user, callback) => {
    var fnm = "insrtPckgechrgMdl"
    if (data) {
        var QRY_TO_EXEC = ` INSERT INTO pckge_chrge_dtl_t(pckge_srvcpk_rel_id,chrge_cde_id,efcte_dt,expry_dt,chrge_at,gst_at,a_in,i_ts,crte_usr_id)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        data1.filter((k) => {
            if (++counter == data1.length) {
                dlmtr = `; `
            }
            valus_qry += ` (${k.insrt_id},${k.chrgTyp_id},'${data.efcte_dt}','${data.expre_dt}','${k.amnt}','${k.tx}',1,CURRENT_TIMESTAMP(),${user.user_id}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updtePckgePlnMdl
* Description   : Update existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtePckgePlnMdl = (data, id, user, callback) => {
    var fnm ="updtePckgePlnMdl"
    var QRY_SET = ""

    if (data.hasOwnProperty('pckge_nm')) {
        QRY_SET += ` , pckge_nm='${data.pckge_nm}'`
    }
    if (data.hasOwnProperty('efcte_dt')) {
        QRY_SET += ` , efcte_dt='${data.efcte_dt}'`
    }
    if (data.hasOwnProperty('expry_dt')) {
        QRY_SET += ` , expry_dt='${data.expre_dt}'`
    }
    if (data.hasOwnProperty('caf_type_id')) {
        QRY_SET += ` , caf_type_id=${data.caf_type_id}`
    }
    if (data.hasOwnProperty('pckge_type_id')) {
        QRY_SET += ` , pckge_type_id=${data.srvcpk_type_id}`
    }
    if (data.hasOwnProperty('lckn_dys_ct')) {
        QRY_SET += ` , lckn_dys_ct=${data.lckn_dys_ct}`
    }
    if (data.hasOwnProperty('glbl_in')) {
        QRY_SET += ` , glbl_in=${data.glbl_in}`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
    }

    var QRY_TO_EXEC = ` UPDATE pckge_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE pckge_id= ${id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dltePckgePlnMdl
* Description   : Delete existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgePlnMdl = (id, user, callback) => {
    var fnm = "dltePckgePlnMdl"
    var QRY_TO_EXEC = `UPDATE pckge_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0
                       WHERE pckge_id= ${id};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dltePckgesrvcMdl
* Description   : Delete existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgesrvcMdl = (id, user, callback) => {
    var fnm = "dltePckgesrvcMdl"
    var QRY_TO_EXEC = `update pckge_srvcpk_rel_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE pckge_id= ${id};`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getPckgePlnLstMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgePlnLstMdl = (user, callback) => {
    var fnm="getPckgePlnLstMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY p.pckge_id) as sno,p.pckge_id,p.pckge_nm,p.caf_type_id,c.caf_type_nm,p.pckge_type_id,t.pckage_type_nm,p.chrge_at,p.gst_at,(p.chrge_at+p.gst_at)as total,date_format(p.efcte_dt,'%d-%m-%Y') as efcte_dt,
    date_format(p.expry_dt,'%d-%m-%Y') as expry_dt
    from pckge_lst_t as p
    join caf_type_lst_t as c on c.caf_type_id=p.caf_type_id
    join pckge_type_lst_t as t on t.pckge_type_id=p.pckge_type_id
    where expry_dt > CURDATE()
    GROUP BY p.pckge_id
    order by p.pckge_id`


    console.log("$$$$$$$$$$$$$$$$$$$$packagePlan$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(QRY_TO_EXEC);
    console.log("$$$$$$$$$$$$$$$$$$$$packagePlan$$$$$$$$$$$$$$$$$$$$$$$$");


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : get_PckgeservicesMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeservicesMdl = (packgeid, user, callback) => {
    var fnm = "get_PckgeservicesMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY r.srvcpk_id) as sno,r.pckge_id,r.srvcpk_id,s.srvcpk_nm as 'Service Name',c.cre_srvce_nm as 'Service Type',d.chrge_at as 'Charge Amount',d.gst_at as 'Gst Amount',(d.chrge_at + d.gst_at)as 'Total Amount',
    l.chrge_cd as 'Charge Code'
     from  pckge_srvcpk_rel_t as r
    join pckge_srvcpk_lst_t as s on s.srvcpk_id=r.srvcpk_id
    join cre_srvce_lst_t as c on c.cre_srvce_id=s.cre_srvce_id
    join pckge_chrge_dtl_t as d on d.pckge_srvcpk_rel_id=r.pckge_srvcpk_rel_id
    join chrge_cde_lst_t as l on l.chrge_cde_id=d.chrge_cde_id
    where r.pckge_id=${packgeid}
    GROUP BY r.srvcpk_id`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_srvcpcksMdl
* Description   : Delete existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_srvcpcksMdl = (id, user, callback) => {
    var fnm = "get_srvcpcksMdl"
    if (id == 2) {
        var condition = `LEFT JOIN pckge_iptv_chnle_srvcpk_rel_t as p on s.srvcpk_id=p.srvcpk_id`
        var condition1 = `COUNT(p.chnle_id) as chnle_cnt,`
    }
    else {
        var condition = ''
        var condition1 = ''
    }
    var QRY_TO_EXEC = `SELECT s.srvcpk_id,s.srvcpk_nm,t.srvcpk_type_id,t.srvcpk_type_nm,${condition1}s.cre_srvce_id,c.cre_srvce_nm from pckge_srvcpk_lst_t as s
    JOIN pckge_srvcpk_type_lst_t as t on s.srvcpk_type_id=t.srvcpk_type_id
    ${condition} 
    JOIN cre_srvce_lst_t as c on c.cre_srvce_id=s.cre_srvce_id
    where s.cre_srvce_id=${id} and s.a_in=1 GROUP BY s.srvcpk_id ORDER BY s.srvcpk_id;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}






/*****************************************************************************
* Function      : insert_PckgeAgreementMdl
* Description   : Delete existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insert_PckgeAgreementMdl = (data, user, callback) => {
    var fnm = "insert_PckgeAgreementMdl"

    var QRY_TO_EXEC = `insert into pckge_agrmt_lst_t (pckge_agrmt_dt,aprve_ts,aprve_usr_id,aprve_cmnt_tx,crte_usr_id,a_in,i_ts)values
    (CURDATE(),CURRENT_TIMESTAMP(),'${user.user_id}','${data[0].comment}','${user.user_id}',1,CURRENT_TIMESTAMP())`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : cancel_PckgeAgreementCtrl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.cancel_PckgeAgreementCtrl = function (data,user) {
    var fnm = "cancel_PckgeAgreementCtrl"
    var QRY_TO_EXEC = [
        ` update pckge_agrmt_lst_t SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}  where pckge_agrmt_id='${data.pckge_agrmt_id}'`,
        `update pckge_agrmt_prtnrs_rel_t  SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}  where pckge_agrmt_id='${data.pckge_agrmt_id}'`]

    console.log(QRY_TO_EXEC);
     return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function      : insert_PckgeAgreementRelatnMdl
* Description   : Delete existing  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insert_PckgeAgreementRelatnMdl = (data, user, pckge_agrmt_id, callback) => {
    var fnm = "insert_PckgeAgreementRelatnMdl"
    let dlmtr = ' ,';
    let sbr_qry = ' '


    var QRY_TO_EXEC = `INSERT INTO pckge_agrmt_prtnrs_rel_t (pckge_agrmt_id,agnt_id,pckge_id,tmple_id,crte_usr_id,a_in,i_ts) VALUES`;
    for (i = 0; i < data.length; i++) {

        for (j = 0; j < data[i].tntAGntData.length; j++) {
            if (i + 1 == data.length && j + 1 == data[i].tntAGntData.length) {
                dlmtr = ' ;'
            }
            if (data[i].tntAGntData[j].agnt_id > 0) {
                sbr_qry += ` (${pckge_agrmt_id},${data[i].tntAGntData[j].agnt_id}, ${data[i].pckge_id} ,'${data[i].tntAGntData[j].tmple_id}', ${user.user_id},1,current_timestamp()) ${dlmtr} `;
            }
        }

    }
    QRY_TO_EXEC += sbr_qry;
	console.log("QRY_TO_EXEC insert_PckgeAgreementRelatnMdl",QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





/*****************************************************************************
* Function      : get_PckgeAgreementCtrlMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeAgreementCtrlMdl = (user, callback) => {
    var fnm = "get_PckgeAgreementCtrlMdl"

    var QRY_TO_EXEC = `select l.*,l1.* from 
    (select a.pckge_agrmt_id,DATE_FORMAT(a.pckge_agrmt_dt,'%d-%m-%Y') as pckge_agrmt_dt,DATE_FORMAT(a.aprve_ts,'%d-%m-%Y') as aprve_ts,a.aprve_cmnt_tx,DATE_FORMAT(a.i_ts,'%d-%m-%Y') as i_ts
    ,count(g.pckge_agrmt_id) as agrmt_ct,GROUP_CONCAT(distinct a1.agnt_cd) as agnt_cds
     from
    pckge_agrmt_lst_t as a
    join pckge_agrmt_prtnrs_rel_t as g on g.pckge_agrmt_id=a.pckge_agrmt_id
    join pckge_lst_t as p on p.pckge_id=g.pckge_id
    join agnt_lst_t as a1 on a1.agnt_id=g.agnt_id
    where a.aprve_ts is not null
    group by a.pckge_agrmt_id) as l
    join
    (
    select a1.pckge_agrmt_id,a1.pckg_ct,
    case when a2.bsepckg_ct > 0 then a2.bsepckg_ct else 0 end as bsepckg_ct,case when a3.addpckg_ct > 0 then a3.addpckg_ct else 0 end as addpckg_ct
    from
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as pckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    group by pckge_agrmt_id) as a1
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as bsepckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=1
    group by pckge_agrmt_id) as a2 on a1.pckge_agrmt_id=a2.pckge_agrmt_id
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as addpckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=2
    group by pckge_agrmt_id) as a3 on a1.pckge_agrmt_id=a3.pckge_agrmt_id) as l1 on l.pckge_agrmt_id=l1.pckge_agrmt_id`

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@pkgeAgreement@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(QRY_TO_EXEC);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@pkgeAgreement@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_PckgeAgreementDtlsMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeAgreementDtlsMdl = (id, user, callback) => {
    var fnm = "get_PckgeAgreementDtlsMdl"
    var QRY_TO_EXEC = `select a.*,b.Percentage
    from
    (select ROW_NUMBER() OVER (ORDER BY r.pckge_id) sno,r.pckge_agrmt_id,r.pckge_id,p.pckge_nm as 'Package Name',p1.pckage_type_nm as 'Package Type',GROUP_CONCAT(agnt_cd) as agents,r.tmple_id,t.tmple_nm as 'Template Name'
    from pckge_agrmt_prtnrs_rel_t as r
    join pckge_lst_t as p on p.pckge_id = r.pckge_id
    join pckge_type_lst_t as p1 on p1.pckge_type_id = p.pckge_type_id
    join agnt_lst_t as a on a.agnt_id = r.agnt_id
    join erp_tmple_lst_t as t on t.tmple_id = r.tmple_id
    where pckge_agrmt_id =${id}
    GROUP BY r.pckge_id,r.tmple_id) as a
    join
    (select tmple_id,SUM(prcnt_ct) as 'Percentage' from erp_tmple_prtnrs_rel_t
    group by tmple_id) as b on a.tmple_id=b.tmple_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_pckgeprtnrsMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_pckgeprtnrsMdl = (data, user, callback) => {
    var fnm = "get_pckgeprtnrsMdl"
    // var QRY_TO_EXEC =`select ar.pckge_agrmt_id,ar.agnt_id,ar.pckge_id,ar.tmple_id,a.agnt_cd as 'Partner Name',a.agnt_ctgry_id,r.tmple_id,r.prtnr_id,r.ara_type_id,t.ara_type_nm as 'Area',r.prcnt_ct as 'Partner Percentage'
    // FROM 
    // pckge_agrmt_prtnrs_rel_t as ar
    // left join agnt_lst_t as a on a.agnt_id = ar.agnt_id
    // left join erp_tmple_prtnrs_rel_t as r on r.prtnr_id=a.agnt_ctgry_id and r.tmple_id=ar.tmple_id
    // join ara_type_lst_t as t on t.ara_type_id=r.ara_type_id
    // where ar.pckge_id=${data.pckge_id} and ar.tmple_id=${data.tmple_id} and ar.pckge_agrmt_id=${data.packge_agrmnt_id}
    // group by r.tmple_id,r.prtnr_id,r.ara_type_id,ar.agnt_id
    // ORDER BY r.ara_type_id`

    var QRY_TO_EXEC = `select CEILING((ROW_NUMBER() OVER ( ORDER BY r.agnt_id,r.pckge_id,a.ara_type_nm))/4) as PACKAGE_SNO,ag.agnt_cd as 'Agent',r.agnt_id,r.pckge_id,p.pckge_nm,a.ara_type_nm as 'Area'
	,MAX(CASE(p1.prtnr_nm) WHEN 'APSFL' THEN t.prcnt_ct ELSE 0 END) as 'APSFL Percentage'
	,MAX(CASE(p1.prtnr_nm) WHEN 'MSO' THEN t.prcnt_ct ELSE 0 END) as 'MSO Percentage'
	,MAX(CASE(p1.prtnr_nm) WHEN 'LMO' THEN t.prcnt_ct ELSE 0 END) as 'LMO Percentage'
from  pckge_agrmt_prtnrs_rel_t as r 
	LEFT JOIN pckge_lst_t as p on p.pckge_id=r.pckge_id
  left join agnt_lst_t as ag on ag.agnt_id=r.agnt_id
	left join erp_tmple_prtnrs_rel_t as t on t.tmple_id=r.tmple_id
	left join prtnrs_lst_t as p1 on p1.prtnr_id=t.prtnr_id
	left join ara_type_lst_t as a on a.ara_type_id=t.ara_type_id
-- where  agnt_id=100005143
where r.pckge_id=${data.pckge_id} and r.tmple_id=${data.tmple_id} and r.pckge_agrmt_id=${data.packge_agrmnt_id}
GROUP BY r.agnt_id,r.pckge_id,a.ara_type_nm
ORDER BY r.pckge_id,a.ara_type_nm`

    console.log("**********pacakgequeryyyyAgreement************");
    console.log(QRY_TO_EXEC);
    console.log("**********pacakgequeryyyyAgreement************");
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtpckgsrvcrelMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtpckgsrvcrelMdl = (data, user, callback) => {
    var fnm = "updtpckgsrvcrelMdl"
    var QRY_TO_EXEC = `update pckge_srvcpk_rel_t set a_in=0,d_ts= CURRENT_TIMESTAMP() where pckge_srvcpk_rel_id=${data.relid}`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getservicesMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 17/02/2020    -  MADHURI.NUNE
*
******************************************************************************/
exports.getservicesMdl = (data, user, callback) => {
    var fnm = "getservicesMdl"
    var QRY_TO_EXEC = `select r.pckge_id,r.srvcpk_id,p.pckge_nm,s.srvcpk_nm,s.msp_cd,sum(c.chrge_at) as chrg_amnt,s.efcte_dt,s.expry_dt,t.srvcpk_type_nm from
    pckge_srvcpk_rel_t as r
    LEFT JOIN pckge_lst_t as p on r.pckge_id = p.pckge_id
    LEFT JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id = r.srvcpk_id
    LEFT JOIN pckge_srvcpk_rel_t as v on v.srvcpk_id = s.srvcpk_id
    left join pckge_chrge_dtl_t as c on c.pckge_srvcpk_rel_id = v.pckge_srvcpk_rel_id
    left join pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id = s.srvcpk_type_id
    where r.pckge_id=${data.pckge_id}
    group by r.srvcpk_id`
    // var QRY_TO_EXEC =`select r.pckge_id,r.srvcpk_id,p.pckge_nm,s.srvcpk_nm,s.msp_cd,s.chrg_amnt,s.efcte_dt,s.expry_dt,t.srvcpk_type_nm from 
    // pckge_srvcpk_rel_t as r
    // LEFT JOIN pckge_lst_t as p on r.pckge_id = p.pckge_id
    // LEFT JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id = r.srvcpk_id
    // left join pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id = s.srvcpk_type_id
    // where r.pckge_id=${data.pckge_id}`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getpartnersMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 17/02/2020    -  MADHURI.NUNE
*
******************************************************************************/
exports.getpartnersMdl = (data, user, callback) => {
    var fnm = "getpartnersMdl"
    var QRY_TO_EXEC = `select r.tmple_id,r.prtnr_id,r.ara_type_id,r.prcnt_ct,t.tmple_nm,n.prtnr_nm,e.ara_type_nm from 
                       erp_tmple_prtnrs_rel_t as r 
                       left join erp_tmple_lst_t as t on t.tmple_id=r.tmple_id
                       left join prtnrs_lst_t as n on n.prtnr_id=r.prtnr_id
                       left join ara_type_lst_t as e on e.ara_type_id=r.ara_type_id
                       where r.tmple_id=${data.tmple_id}`
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_PckgeAgreementAgentMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 17/02/2020    -  MADHURI.NUNE
*
******************************************************************************/
exports.get_PckgeAgreementAgentMdl = (agentId, user, callback) => {
    var fnm = "get_PckgeAgreementAgentMdl"

    //     // var QRY_TO_EXEC = `select i.pckge_agnt_id,i.agnt_id,a.agnt_nm,i.pckge_id,p.pckge_nm,sum(h.chrge_at) as chrge_at,sum(h.gst_at) as gst_at,sum(h.chrge_at+h.gst_at) as tot_at,p.efcte_dt,c.caf_type_nm,i.tmple_id,t.tmple_nm,y.tmple_type_nm,count(DISTINCT tmple_prtnrs_rel_id) as prtnrs_ct from
    //     // pckge_agnt_prtnrs_rel_t as i
    //     // left join agnt_lst_t as a on a.agnt_id=i.agnt_id
    //     // left join pckge_lst_t as p on p.pckge_id=i.pckge_id
    //     // left join pckge_srvcpk_rel_t as s on s.pckge_id=p.pckge_id
    //     // left join pckge_chrge_dtl_t as h on h.pckge_srvcpk_rel_id = s.pckge_srvcpk_rel_id
    //     // left join caf_type_lst_t as c on c.caf_type_id=p.caf_type_id
    //     // left join erp_tmple_lst_t as t on t.tmple_id=i.tmple_id
    //     // left join erp_tmple_type_lst_t as y on y.tmple_type_id=t.tmple_type_id
    //     // left join erp_tmple_prtnrs_rel_t as r on r.tmple_id=t.tmple_id
    //     // WHERE i.agnt_id=${agentId}
    //     // group by i.pckge_agnt_id
    //     // order by agnt_id`
    var QRY_TO_EXEC = `select l.*,l1.* from 
    (select a.pckge_agrmt_id,DATE_FORMAT(a.pckge_agrmt_dt,'%d-%m-%Y') as pckge_agrmt_dt,DATE_FORMAT(a.aprve_ts,'%d-%m-%Y') as aprve_ts,a.aprve_cmnt_tx,DATE_FORMAT(a.i_ts,'%d-%m-%Y') as i_ts
    ,count(g.pckge_agrmt_id) as agrmt_ct,GROUP_CONCAT(distinct a1.agnt_cd) as agnt_cds
     from
    pckge_agrmt_lst_t as a
    join pckge_agrmt_prtnrs_rel_t as g on g.pckge_agrmt_id=a.pckge_agrmt_id
    join pckge_lst_t as p on p.pckge_id=g.pckge_id
    join agnt_lst_t as a1 on a1.agnt_id=g.agnt_id and g.agnt_id=${agentId}
    group by a.pckge_agrmt_id) as l
    join
    (
    select a1.pckge_agrmt_id,a1.pckg_ct,
    case when a2.bsepckg_ct > 0 then a2.bsepckg_ct else 0 end as bsepckg_ct,case when a3.addpckg_ct > 0 then a3.addpckg_ct else 0 end as addpckg_ct
    from
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as pckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    group by pckge_agrmt_id) as a1
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as bsepckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=1
    group by pckge_agrmt_id) as a2 on a1.pckge_agrmt_id=a2.pckge_agrmt_id
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as addpckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=2
    group by pckge_agrmt_id) as a3 on a1.pckge_agrmt_id=a3.pckge_agrmt_id) as l1 on l.pckge_agrmt_id=l1.pckge_agrmt_id`

    console.log("&&&&&&&&&&&&&&QRY_TO_EXEC&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_PlnChrgTypMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PlnChrgTypMdl = (user, callback) => {
    var fnm = "get_PlnChrgTypMdl"
    var QRY_TO_EXEC = `SELECT chrge_cde_id,chrge_cde_dscn_tx from chrge_cde_lst_t ORDER BY chrge_cde_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_PckgeDtlsByIdMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeDtlsByIdMdl = (id, user, callback) => {
    var fnm = "get_PckgeDtlsByIdMdl"
    var QRY_TO_EXEC = `SELECT p.pckge_id,p.pckge_nm,psr.srvcpk_id,s.srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,cs.cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm
    from pckge_lst_t as p
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    where p.a_in=1 AND p.pckge_id=${id}
     GROUP BY s.srvcpk_id
    ORDER BY p.pckge_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_PckgesByIdMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgesByIdMdl = (id, user, callback) => {
    var fnm = "get_PckgesByIdMdl"
    var QRY_TO_EXEC = `SELECT p.pckge_id,p.pckge_nm, DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt, DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt, s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at
    FROM  pckge_lst_t p
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    where p.pckge_id = ${id} and p.oprtn_in=1  AND p.efcte_dt <current_date() ANd p.expry_dt >CURRENT_DATE() AND cd.efcte_dt <current_date() ANd cd.expry_dt >CURRENT_DATE() and cd.a_in=1
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id`;

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
* Function      : get_PckgesByAgntIdMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgesByAgntIdMdl = (id, caf_type_id, user, callback) => {
    var fnm = "get_PckgesByAgntIdMdl"
    var condition = '';
    if (caf_type_id == 1) {
        condition = 'and p.oprtn_in=1 and p.caf_type_id=1 AND p.pckge_type_id=1 ANd p.efcte_dt <current_date() ANd p.expry_dt >CURRENT_DATE() AND cd.efcte_dt <current_date() ANd cd.expry_dt >CURRENT_DATE() and cd.a_in=1';
    } else {
        condition = 'and p.oprtn_in=1 and p.caf_type_id<>1 AND p.pckge_type_id=1 ANd p.efcte_dt <current_date() ANd p.expry_dt >CURRENT_DATE() AND cd.efcte_dt <current_date() ANd cd.expry_dt >CURRENT_DATE() and cd.a_in=1';
    }
    var QRY_TO_EXEC = `SELECT a.agnt_id,a.agnt_nm,a.instal_charges,p.*, DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt, DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt, s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at
    FROM 
    agnt_lst_t as a
    JOIN pckge_agrmt_prtnrs_rel_t as ar on ar.agnt_id=a.agnt_id
    JOIN pckge_lst_t as p on p.pckge_id= ar.pckge_id
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    where a.agnt_id=${id} ${condition}
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id`;

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
* Function      : get_Chnl_CdMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_EntPckgeMdl = (id, caf_type_id, user, callback) => {
    var fnm = "get_EntPckgeMdl"

    var QRY_TO_EXEC = `   SELECT p.pckge_id,p.pckge_nm,p.efcte_dt,p.expry_dt,s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at,p.caf_type_id
    FROM pckge_lst_t as p
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    where  p.oprtn_in=1 
and p.caf_type_id<>1 
AND p.pckge_type_id=1 
ANd p.efcte_dt <current_date() ANd p.expry_dt >CURRENT_DATE() 
AND cd.efcte_dt <current_date() ANd cd.expry_dt >CURRENT_DATE() and cd.a_in=1
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_Chnl_CdMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_Chnl_CdMdl = (ids, user, callback) => {
    var fnm = "get_Chnl_CdMdl"

    var QRY_TO_EXEC = `SELECT csr.srvcpk_id,c.chnle_id,c.chnle_cd,c.chnle_nm
    FROM
    pckge_iptv_chnle_srvcpk_rel_t as csr
    JOIN pckge_iptv_chnle_lst_t as c on c.chnle_id=csr.chnle_id
    WHERE csr.srvcpk_id =${ids} and csr.a_in=1 ORDER BY c.chnle_cd`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : get_PckgeAgreementAprvalMdl
* Description   : get details of all packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeAgreementAprvalMdl = (user, callback) => {
    var fnm = "get_PckgeAgreementAprvalMdl"

    var QRY_TO_EXEC = `select l.*,l1.* from 
    (select a.pckge_agrmt_id,DATE_FORMAT(a.pckge_agrmt_dt,'%d-%m-%Y') as pckge_agrmt_dt,DATE_FORMAT(a.aprve_ts,'%d-%m-%Y') as aprve_ts,a.aprve_cmnt_tx,DATE_FORMAT(a.i_ts,'%d-%m-%Y') as i_ts
    ,count(g.pckge_agrmt_id) as agrmt_ct,GROUP_CONCAT(distinct a1.agnt_cd) as agnt_cds
     from
    pckge_agrmt_lst_t as a
    join pckge_agrmt_prtnrs_rel_t as g on g.pckge_agrmt_id=a.pckge_agrmt_id
    join pckge_lst_t as p on p.pckge_id=g.pckge_id
    join agnt_lst_t as a1 on a1.agnt_id=g.agnt_id
    where a.aprve_ts is null and a.rjctd_in is null
    group by a.pckge_agrmt_id) as l
    join
    (
    select a1.pckge_agrmt_id,a1.pckg_ct,
    case when a2.bsepckg_ct > 0 then a2.bsepckg_ct else 0 end as bsepckg_ct,case when a3.addpckg_ct > 0 then a3.addpckg_ct else 0 end as addpckg_ct
    from
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as pckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    group by pckge_agrmt_id) as a1
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as bsepckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=1
    group by pckge_agrmt_id) as a2 on a1.pckge_agrmt_id=a2.pckge_agrmt_id
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as addpckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=2
    group by pckge_agrmt_id) as a3 on a1.pckge_agrmt_id=a3.pckge_agrmt_id) as l1 on l.pckge_agrmt_id=l1.pckge_agrmt_id`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_agreementToAprvalMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 24/03/2020    -  Madhuri.nune
*
******************************************************************************/
exports.get_agreementToAprvalMdl = (data, user) => {
    var fnm = "get_agreementToAprvalMdl"


    var updtFields;

    if (data.aprvl_in == 1) {
        updtFields = `aprve_ts = CURRENT_TIMESTAMP(), aprve_cmnt_tx='${data.aprvl_desc_tx}'`;
    } else {
        updtFields = `rjctd_in = 1`;
    }
    var QRY_TO_EXEC = ` UPDATE pckge_agrmt_lst_t
                        SET ${updtFields},aprve_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id}
                        WHERE pckge_agrmt_id=${data.pckge_agrmt_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_MyApprovalsMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 24/03/2020    -  Madhuri.nune
*
******************************************************************************/
exports.get_MyApprovalsMdl = (user) => {
    var fnm = "get_MyApprovalsMdl"

    var QRY_TO_EXEC = `select l.*,l1.* from 
    (select a.pckge_agrmt_id,DATE_FORMAT(a.pckge_agrmt_dt,'%d-%m-%Y') as pckge_agrmt_dt,DATE_FORMAT(a.aprve_ts,'%d-%m-%Y') as aprve_ts,a.aprve_cmnt_tx,DATE_FORMAT(a.i_ts,'%d-%m-%Y') as i_ts
    ,count(g.pckge_agrmt_id) as agrmt_ct,GROUP_CONCAT(distinct a1.agnt_cd) as agnt_cds
     from
    pckge_agrmt_lst_t as a
    join pckge_agrmt_prtnrs_rel_t as g on g.pckge_agrmt_id=a.pckge_agrmt_id
    join pckge_lst_t as p on p.pckge_id=g.pckge_id
    join agnt_lst_t as a1 on a1.agnt_id=g.agnt_id
    where a.aprve_ts is not null and a.rjctd_in is null and a.aprve_usr_id=${user.mrcht_usr_id}
    group by a.pckge_agrmt_id) as l
    join
    (
    select a1.pckge_agrmt_id,a1.pckg_ct,
    case when a2.bsepckg_ct > 0 then a2.bsepckg_ct else 0 end as bsepckg_ct,case when a3.addpckg_ct > 0 then a3.addpckg_ct else 0 end as addpckg_ct
    from
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as pckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    group by pckge_agrmt_id) as a1
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as bsepckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=1
    group by pckge_agrmt_id) as a2 on a1.pckge_agrmt_id=a2.pckge_agrmt_id
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as addpckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=2
    group by pckge_agrmt_id) as a3 on a1.pckge_agrmt_id=a3.pckge_agrmt_id) as l1 on l.pckge_agrmt_id=l1.pckge_agrmt_id`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_recentapprovalsMdl
* Description   : Delete existing service packs in packagePlan
* Arguments     : callback function
* Change History :
* 24/03/2020    -  Madhuri.nune
*
******************************************************************************/
exports.get_recentapprovalsMdl = (user) => {
    var fnm = "get_recentapprovalsMdl"

    var QRY_TO_EXEC = `select l.*,l1.* from 
    (select a.pckge_agrmt_id,DATE_FORMAT(a.pckge_agrmt_dt,'%d-%m-%Y') as pckge_agrmt_dt,DATE_FORMAT(a.aprve_ts,'%d-%m-%Y') as aprve_ts,a.aprve_cmnt_tx,DATE_FORMAT(a.i_ts,'%d-%m-%Y') as i_ts
    ,count(g.pckge_agrmt_id) as agrmt_ct,GROUP_CONCAT(distinct a1.agnt_cd) as agnt_cds
     from
    pckge_agrmt_lst_t as a
    join pckge_agrmt_prtnrs_rel_t as g on g.pckge_agrmt_id=a.pckge_agrmt_id
    join pckge_lst_t as p on p.pckge_id=g.pckge_id
    join agnt_lst_t as a1 on a1.agnt_id=g.agnt_id
    where a.aprve_ts is not null and a.rjctd_in is null 
    group by a.pckge_agrmt_id
    ORDER BY a.aprve_ts desc limit 50) as l
    join
    (
    select a1.pckge_agrmt_id,a1.pckg_ct,
    case when a2.bsepckg_ct > 0 then a2.bsepckg_ct else 0 end as bsepckg_ct,case when a3.addpckg_ct > 0 then a3.addpckg_ct else 0 end as addpckg_ct
    from
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as pckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    group by pckge_agrmt_id) as a1
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as bsepckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=1
    group by pckge_agrmt_id) as a2 on a1.pckge_agrmt_id=a2.pckge_agrmt_id
    left join
    (select pckge_agrmt_id,COUNT(DISTINCT p.pckge_id) as addpckg_ct from pckge_lst_t as p
    join pckge_agrmt_prtnrs_rel_t as p1 on p1.pckge_id=p.pckge_id
    where pckge_type_id=2
    group by pckge_agrmt_id) as a3 on a1.pckge_agrmt_id=a3.pckge_agrmt_id) as l1 on l.pckge_agrmt_id=l1.pckge_agrmt_id`
    console.log("&&&&&&&&&&&&&&recenttttttttttt&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_rpt_pckgMdl
* Description   : Get Charge Type of Plans
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_rpt_pckgMdl = (ids, user, callback) => {

    var fnm = "get_rpt_pckgMdl"
    var QRY_TO_EXEC = `SELECT * FROM pckge_srvcpk_lst_t WHERE cre_srvce_id =2 AND srvcpk_nm NOT LIKE '%MSO%'   AND srvcpk_type_id =1 AND CASE WHEN datediff(current_date,date(expry_dt)) < 0 THEN 1 else 0 END
    ORDER BY srvcpk_nm;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function       : PckgesFrPdfIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.PckgesFrPdfIdMdl = function (user) {
    var fnm = "PckgesFrPdfIdMdl"
    var QRY_TO_EXEC = 
        ` select * from pckge_lst_t where caf_type_id in (1,2) and  pckge_id=3000135 and pckge_type_id=1 and a_in=1 and oprtn_in=1 and glbl_in=1;`

    console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : PckgesFrcafIdPdfIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.PckgesFrcafIdPdfIdMdl = function (data,user) {
    var fmn = "PckgesFrcafIdPdfIdMdl"
    var QRY_TO_EXEC = 
        ` select caf_id from caf_dtl_t where crnt_pln_id=${data.custype} and instl_dstrct_id=${data.district} and trmnd_in not in (1) `;

    console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};