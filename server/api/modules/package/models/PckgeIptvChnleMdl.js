var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getPckgeIptvChnleMdl
* Description   : get details of all pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeIptvChnleMdl = (user, callback) => {
    var fnm = "getPckgeIptvChnleMdl"
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY pckge_iptv_chnle_lst_t.chnle_id) sno, cre_srvce_lst_t.cre_srvce_nm, lnge_lst_t.lnge_nm, brdcr_lst_t.brdcr_nm,pckge_iptv_chnle_lst_t.* FROM pckge_iptv_chnle_lst_t  JOIN cre_srvce_lst_t On cre_srvce_lst_t.cre_srvce_id = pckge_iptv_chnle_lst_t.cre_srvce_id JOIN lnge_lst_t On lnge_lst_t.lnge_id = pckge_iptv_chnle_lst_t.lnge_id JOIN brdcr_lst_t On brdcr_lst_t.brdcr_id = pckge_iptv_chnle_lst_t.brdcr_id where pckge_iptv_chnle_lst_t.a_in = 1 ORDER BY pckge_iptv_chnle_lst_t.chnle_id ASC;`
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
* Function      : srchPckgeIptvChnleMdl
* Description   : search details of all pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchPckgeIptvChnleMdl = (data, user, callback) => {
    var fnm = "srchPckgeIptvChnleMdl"
    var QRY_WHERE = "1 = 1"

    if (data.hasOwnProperty('chnle_nm')) {
        QRY_WHERE += ` AND chnle_nm='${data.chnle_nm}'`
    }
    if (data.hasOwnProperty('cre_srvce_id')) {
        QRY_WHERE += ` AND cre_srvce_id=${data.cre_srvce_id}`
    }
    if (data.hasOwnProperty('chnle_cd')) {
        QRY_WHERE += ` AND chnle_cd=${data.chnle_cd}`
    }
    if (data.hasOwnProperty('chnle_hndlr_tx')) {
        QRY_WHERE += ` AND chnle_hndlr_tx='${data.chnle_hndlr_tx}'`
    }
    if (data.hasOwnProperty('lnge_id')) {
        QRY_WHERE += ` AND lnge_id=${data.lnge_id}`
    }
    if (data.hasOwnProperty('brdcr_id')) {
        QRY_WHERE += ` AND brdcr_id=${data.brdcr_id}`
    }
    if (data.hasOwnProperty('msp_cd')) {
        QRY_WHERE += ` AND msp_cd='${data.msp_cd}'`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
    }
    if (data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}` } else { QRY_WHERE += ` AND a_in=1` }
    if (data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL` } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY chnle_id) sno,
                                chnle_id,chnle_nm,cre_srvce_id,chnle_cd,chnle_hndlr_tx,lnge_id,brdcr_id,msp_cd,a_in 
                        FROM pckge_iptv_chnle_lst_t 
                        WHERE ${QRY_WHERE} AND chnle_id= ${data.chnle_id}; `;
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
* Function      : getPckgeIptvChnleByIdMdl
* Description   : get details of single  pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeIptvChnleByIdMdl = (id, user, callback) => {
    var fnm = "getPckgeIptvChnleByIdMdl"
    var QRY_TO_EXEC = `SELECT chnle_id,chnle_nm,cre_srvce_id,chnle_cd,chnle_hndlr_tx,lnge_id,brdcr_id,msp_cd,a_in 
                        FROM pckge_iptv_chnle_lst_t 
                        WHERE a_in = 1 AND chnle_id= ${id}; `;
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
* Function      : insrtPckgeIptvChnleMdl
* Description   : Add new  pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgeIptvChnleMdl = (user, callback) => {
    var fnm = "insrtPckgeIptvChnleMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_iptv_chnle_lst_t (chnle_nm, cre_srvce_id, chnle_cd, chnle_hndlr_tx, lnge_id, brdcr_id, msp_cd, a_in, i_ts,crte_usr_id)
    SELECT stg.chnle_nm,stg.cre_srvce_id,stg.chnle_cd,stg.chnle_hndlr_tx,l.lnge_id,b.brdcr_id,stg.msp_cd,1,CURRENT_TIMESTAMP(),stg.crte_usr_id FROM
    pckge_iptv_chnle_stg_t as stg 
    JOIN lnge_lst_t as l on LOWER(l.lnge_nm) =LOWER(stg.lnge_nm)
    JOIN brdcr_lst_t as b on LOWER(b.brdcr_nm)=LOWER(stg.brdcr_nm)
    GROUP BY stg.chnle_cd
    ORDER BY stg.chnle_id;`;
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
* Function      : updtePckgeIptvChnleMdl
* Description   : Update existing  pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtePckgeIptvChnleMdl = (data, id, user, callback) => {
    var fnm = "updtePckgeIptvChnleMdl"
    var QRY_SET = ""

    if (data.hasOwnProperty('chnle_nm')) {
        QRY_SET += ` , chnle_nm='${data.chnle_nm}'`
    }
    if (data.hasOwnProperty('cre_srvce_id')) {
        QRY_SET += ` , cre_srvce_id=${data.cre_srvce_id}`
    }
    if (data.hasOwnProperty('chnle_cd')) {
        QRY_SET += ` , chnle_cd=${data.chnle_cd}`
    }
    if (data.hasOwnProperty('chnle_hndlr_tx')) {
        QRY_SET += ` , chnle_hndlr_tx='${data.chnle_hndlr_tx}'`
    }
    if (data.hasOwnProperty('lnge_id')) {
        QRY_SET += ` , lnge_id=${data.lnge_id}`
    }
    if (data.hasOwnProperty('brdcr_id')) {
        QRY_SET += ` , brdcr_id=${data.brdcr_id}`
    }
    if (data.hasOwnProperty('msp_cd')) {
        QRY_SET += ` , msp_cd='${data.msp_cd}'`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
    }

    var QRY_TO_EXEC = ` UPDATE pckge_iptv_chnle_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE chnle_id= ${id}; `;
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
* Function      : dltePckgeIptvChnleMdl
* Description   : Delete existing  pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgeIptvChnleMdl = (id, user, callback) => {
    var fnm = "dltePckgeIptvChnleMdl"
    var QRY_TO_EXEC = `UPDATE pckge_iptv_chnle_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE chnle_id= ${id};`;
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
* Function      : get_PckgeIptvChnleRefrshMdl
* Description   : Delete existing  pckgeIptvChannels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_PckgeIptvChnleRefrshMdl = (user, callback) => {
    var fnm = "get_PckgeIptvChnleRefrshMdl"
    var QRY_TO_EXEC = `SELECT c.chnle_id,c.chnle_cd,c.chnle_nm,l.lnge_id,l.lnge_nm,b.brdcr_id,b.brdcr_nm,g.genre_id,g.genre_nm
    FROM pckge_iptv_chnle_lst_t as c
    left JOIN pckge_iptv_chnle_genre_rel_t as gr on c.chnle_id=gr.chnle_id
    left JOIN genre_lst_t as g on g.genre_id=gr.genre_id
    left JOIN lnge_lst_t as l on l.lnge_id=c.lnge_id
    left JOIN brdcr_lst_t as b on b.brdcr_id=c.brdcr_id
    ORDER BY c.chnle_cd;`;
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
* Function      : insrtChnleStgMdl
* Description   : add packge related charges
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtChnleStgMdl = (data, user, callback) => {
    var fnm = "insrtChnleStgMdl"
    // console.log(data)
    if (data) {
        var QRY_TO_EXEC = ` INSERT INTO pckge_iptv_chnle_stg_t (chnle_nm, cre_srvce_id, chnle_cd, chnle_hndlr_tx, lnge_nm, brdcr_nm, msp_cd,catmapid,categoryDesc, a_in,  i_ts,crte_usr_id)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var outer_counter = 0;
        data.filter((k) => {
            ++outer_counter;
            var iner_counter = 0;
            k.categoryLst.filter((c) => {
             
                if(outer_counter == data.length && ++iner_counter == k.categoryLst.length)
                {
                    dlmtr = `; `
                }
                valus_qry += ` ('${k.name}',2,'${k.serviceId}','${k.code}','${k.language}','${k.partnerCode}','APSFL','${c.catmapid}','${c.categoryDesc}',1,CURRENT_TIMESTAMP(),${user.user_id}) ${dlmtr}`
            })

        })
        QRY_TO_EXEC += valus_qry;
        // console.log(QRY_TO_EXEC)
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
    }
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
* Function      : delChnleStgMdl
* Description   : Delete existing  chanels in staging table
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.delChnleStgMdl = (user, callback) => {
    var fnm = "delChnleStgMdl"
    var QRY_TO_EXEC = `DELETE from pckge_iptv_chnle_stg_t where chnle_cd in (SELECT DISTINCT chnle_cd FROM pckge_iptv_chnle_lst_t)`;
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
* Function      : insrtPckgeIptvChnle_genereRelMdl
* Description   : inserting generes of channels
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgeIptvChnle_genereRelMdl = (user, callback) => {
    var fnm = "insrtPckgeIptvChnle_genereRelMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_iptv_chnle_genre_rel_t (chnle_id, genre_id, a_in, i_ts,crte_usr_id)
    SELECT cn.chnle_id,g.genre_id ,1 ,CURRENT_TIMESTAMP(),g.crte_usr_id from pckge_iptv_chnle_stg_t as stg
    JOIN pckge_iptv_chnle_lst_t as cn on cn.chnle_cd=stg.chnle_cd
    JOIN genre_lst_t as g on g.genre_cd=stg.catmapid`;
	console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


