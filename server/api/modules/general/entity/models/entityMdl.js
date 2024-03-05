var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
/*****************************************************************************
* Function      : get_entityMdl
* Description   : get_entityMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_entityMdl = (user) => {
    var fnm = "get_entityMdl"
    var QRY_TO_EXEC = `select *,ROW_NUMBER() OVER ( ORDER BY enty_id) as sno FROM aplcn_enty_lst_t ORDER BY enty_id `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_actionsMdl
* Description   : get_actionsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_actionsMdl = (id, user) => {
    var fnm= "get_actionsMdl"
    var QRY_TO_EXEC = `select *,ROW_NUMBER() OVER ( ORDER BY actn_id) as sno FROM api_actn_lst_t where enty_id =${id}  ORDER BY actn_id `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_statusMdl
* Description   : get_statusMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_statusMdl = (id, user) => {
    var fnm = "get_statusMdl"
    var QRY_TO_EXEC = `select * FROM enty_sts_lst_t where enty_id =${id}  ORDER BY enty_sts_id `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_extapidtlsMdl
* Description   : get_extapidtlsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
// exports.get_extapidtlsMdl = (data, callback) => {
//     var where = "1 = 1 "

//     if (data.entity) {
//         where += `and api.enty_id=${data.entity} `
//     }
//     if (data.entyid) {
//         where += `and api.enty_ky=${data.entyid} `
//     }
//     if (data.action) {
//         where += `and api.actn_id=${data.action} `
//     }
// //    if (data.str_dt && data.end_dt) {
// //         where += `and (api.actvn_dt BETWEEN ${data.str_dt} AND ${data.str_dt}) `
// //     } else if (data.str_dt) {
// //         where += `and cf.actvn_dt=${data.str_dt} `
// //     }
//     //  if (data.till_dt) {
//     //     where += `and cf.actvn_dt<CURDATE()
//     //      `
//     // }


//     var QRY_TO_EXEC = `select e.*,aps.*,a.*, ac.*,api.*,ext.*,COUNT(ar.rest_cl_id) as rttv_cnt,am.* from api_rqst_dtl_t as api
//  join api_actn_lst_t a on a.actn_id = api.actn_id
//     join aplcn_enty_lst_t e on e.enty_id = api.enty_id
// 		JOIN api_sts_lst_t	aps  on aps.api_sts_id =api.api_sts_id
//  join api_rqst_cl_dtl_t ac on ac.api_rqst_id =api.api_rqst_id
//  join extrl_aplcn_lst_t ext on ext.extrl_aplcn_id = ac.extrl_aplcn_id
//  JOIN api_mthds_lst_t am on am.mthd_id =ac.mthd_id
//  left JOIN api_rqst_cl_rtry_dtl_t ar on ar.rest_cl_id =ac.rest_cl_id
//  where ${where}
// group by ac.rest_cl_id
// order by ac.api_rqst_id,ac.rest_cl_id  `;
//     console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

/*****************************************************************************
* Function      : get_extapidtlsMdl
* Description   : get_extapidtlsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_extapidtlsMdl = (data,user) => {
    var fnm = "get_extapidtlsMdl"
    var where = "1 = 1 "

    if (data.entity) {
        where += `and api.enty_id=${data.entity} `
    }
    if (data.entyid) {
        where += `and api.enty_ky=${data.entyid} `
    }
    if (data.action) {
        where += `and api.actn_id=${data.action} `
    }
//    if (data.str_dt && data.end_dt) {
//         where += `and (api.actvn_dt BETWEEN ${data.str_dt} AND ${data.str_dt}) `
//     } else if (data.str_dt) {
//         where += `and cf.actvn_dt=${data.str_dt} `
//     }
//      if (data.till_dt) {
//         where += `and cf.actvn_dt<CURDATE()
//          `
//     }


    console.log("in try")
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY api.api_rqst_id) as sno,api.*,e.enty_nm,aps.api_sts_nm,a.actn_nm,COUNT(ar.rest_cl_id) as rttv_cnt,am.mthd_nm,
    (case WHEN api.api_sts_id =3 then api.i_ts ELSE DATE_FORMAT(max(ar.i_ts),'%d-%m-%Y') END) as date,
    (case WHEN api.api_sts_id =3 then api.i_ts ELSE TIME_FORMAT(max(ar.i_ts),'%h:%m') END) as time,
    DATE_FORMAT(api.i_ts,'%d-%m-%Y') as rqst_date,TIME_FORMAT(api.i_ts,'%h:%i:%s') as rqst_time,
    mu.agnt_cd
    from api_rqst_dtl_t as api
    LEFT join api_actn_lst_t a on a.actn_id = api.actn_id
    left join aplcn_enty_lst_t e on e.enty_id = api.enty_id
    left join api_rqst_cl_dtl_t ac on ac.api_rqst_id =api.api_rqst_id
		left JOIN api_sts_lst_t aps on aps.api_sts_id =api.api_sts_id
    left join extrl_aplcn_lst_t ext on ext.extrl_aplcn_id = ac.extrl_aplcn_id
    left JOIN api_mthds_lst_t am on am.mthd_id =ac.mthd_id
    left JOIN api_rqst_cl_rtry_dtl_t ar on ar.rest_cl_id =ac.rest_cl_id
    left JOIN agnt_lst_t as mu on mu.agnt_id=api.crte_usr_id
    where  ${where}
    group by api.api_rqst_id
    ORDER BY api.i_ts DESC;`;
    console.log(QRY_TO_EXEC)
    // var results =dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls)
    // console.log(results)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
} 


/*****************************************************************************
* Function      : get_extrnlapirqstdtlsMdl
* Description   : get_extrnlapirqstdtlsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_extrnlapirqstdtlsMdl = (id,user) => {
    var fnm = "get_extrnlapirqstdtlsMdl"

    var QRY_TO_EXEC = `SELECT rs.rtry_id, r.api_rqst_id, r.rqst_dscn_tx, rc.rest_cl_id ,rc.rest_cl_id as mstr_rest_cl_id,e.extrl_aplcn_nm,rc.rspne_tx as req_res,rs.rspne_tx as retry_res,rc.cl_cmnt_tx,
    rc.url_tx,rc.url_dta_tx,rc.mthd_id, m.mthd_nm, rs.rspne_tx,s1.api_sts_id as mstr_cl_id,  s1.api_sts_nm as mstr_cl_res,DATE_FORMAT(rc.i_ts, '%d-%m-%Y') as mstr_ts_dt, TIME_FORMAT(rc.i_ts, '%h:%i:%s %p') as mstr_ts_time, 
    s.api_sts_nm as rtry_res, rs.i_ts as rtry_ts, DATE_FORMAT(rs.i_ts, '%d-%m-%Y') as rtry_ts_dt, TIME_FORMAT(rs.i_ts, '%h:%i:%s %p') as rtry_ts_time
    FROM api_rqst_dtl_t r
    left JOIN api_rqst_cl_dtl_t rc on rc.api_rqst_id = r.api_rqst_id
    left JOIN api_mthds_lst_t m on m.mthd_id = rc.mthd_id
    left JOIN api_rqst_cl_rtry_dtl_t rs on rs.rest_cl_id = rc.rest_cl_id
    left JOIN api_sts_lst_t s on s.api_sts_id = rs.api_sts_id
    left JOIN api_sts_lst_t s1 on s1.api_sts_id = rc.api_sts_id
    LEFT JOIN extrl_aplcn_lst_t as e on e.extrl_aplcn_id=rc.extrl_aplcn_id
    WHERE r.api_rqst_id =  ${id} ORDER BY rc.sqnce_nu,rc.extrl_aplcn_id asc;`;
    // var results =dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls)
    // console.log(results)
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
} 

/*****************************************************************************
* Function      : getApiClsMdl
* Description   : getApiClsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getApiClsMdl = (data, user, callback) => {
    var fnm = "getApiClsMdl"
    var QRY_TO_EXEC = `SELECT c.*,m.mthd_nm
    FROM api_rqst_cl_dtl_t c JOIN api_mthds_lst_t m ON m.mthd_id = c.mthd_id 
    WHERE c.a_in = 1 AND c.rest_cl_id= ${data.rest_cl_id} ORDER BY c.sqnce_nu;`;
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
* Function      : getApiClsMdl
* Description   : getApiClsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insreqrty = (data, user, callback) => {
    var fnm = "insreqrty"
    var QRY_TO_EXEC = `INSERT INTO api_rqst_cl_rtry_dtl_t (rest_cl_id,api_sts_id, crte_usr_id, a_in) VALUES (${data.rest_cl_id},1,${user.user_id},1); `;

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
* Function      : updtrtyClStsMdl
* Description   : updtrtyClStsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtrtyClStsMdl = (rtry_id, sts, rspne_tx, user) => {
    var fnm= "updtrtyClStsMdl"
    var QRY_TO_EXEC = ` UPDATE api_rqst_cl_rtry_dtl_t 
        SET api_sts_id = ${sts},rspne_tx = ${sqldb.MySQLConPool.escape(JSON.stringify(rspne_tx))}
        WHERE rtry_id= ${rtry_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}