var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function       : get_AllalrtsCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllalrtsCountsMdl = function (data, user) {
    var fnm = "get_AllalrtsCountsMdl"
    var QRY_TO_EXEC = `select * from (
        select CONCAT(count(case when opn_in =1 then 1 else null end),' / ',count(case when opn_in =1 then null else 1 end)) as all_talrmct, count(alrm_id) as all_total 
        from dsnw_alrm_dtl_t a
        join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
        where do.a_in = 1) as a
        join
    (select CONCAT(count(case when opn_in =1 then 1 else null end),' / ',count(case when opn_in =1 then null else 1 end)) as tdy_talrmct, count(alrm_id) as tdy_total  
    from dsnw_alrm_dtl_t a
    join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
    where do.a_in = 1 and DATE(a.alrm_ocrd_ts) = CURDATE()) b
    join
        (select CONCAT(count(case when a.opn_in =1 then 1 else null end),' / ',count(case when opn_in =1 then null else 1 end)) as oltct, count(alrm_id) as olt_total  
        from dsnw_alrm_dtl_t a
        join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
        where do.a_in=1 and a.enty_typ_id = 1) c
        join
        (select CONCAT(count((case when s.opn_in =1 then s.alrm_id else null end)),' / ',count(case when opn_in =1 then null else 1 end))  as galrmct , count(alrm_id) as onu_total 
        from dsnw_alrm_dtl_t s 
        join olt_ltrck_dtl_t ol on s.olt_id = ol.olt_id and ol.olt_vndr_id = 1
        where ol.a_in=1 and s.enty_typ_id = 2) d`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_elementTypesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_elementTypesMdl = function (data, user) {
    var fnm = "get_elementTypesMdl"
    var QRY_TO_EXEC = `select * from dsnw_elmnt_typ_lst_t order by elmnt_nm;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_districtsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_districtsMdl = function (data, user) {
    var fnm = "get_districtsMdl"
    var QRY_TO_EXEC = `SELECT * FROM dstrt_lst_t where a_in = 1 ORDER BY dstrt_nm ASC;`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_mandalsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_mandalsMdl = function (params, user) {
    var fnm = "get_mandalsMdl"
    var where = '';
    if (params.dstrct_id || params.dstrct_id == 0) where += ` and dstrt_id = ${params.dstrct_id}`;
    var QRY_TO_EXEC = `SELECT * FROM mndl_lst_t where a_in = 1 ${where} ORDER BY mndl_nm ASC;`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_gpsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_gpsMdl = function (params, user) {
    var fnm = "get_gpsMdl"
    var where = '';
    if (params.dstrct_id || params.dstrct_id == 0) where += ` and dstrt_id = ${params.dstrct_id}`;
    if (params.mndl_id || params.mndl_id == 0) where += ` and mndl_id = ${params.mndl_id}`;
    var QRY_TO_EXEC = `SELECT vlge_nm as gp_nm, vlge_id as gp_id FROM vlge_lst_t where a_in = 1 ${where} ORDER BY vlge_nm ASC`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_elementTypesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_alrtstatusMdl = function (data, user) {
    var fnm = "get_alrtstatusMdl"
    var QRY_TO_EXEC = `select * from dsnw_alrm_svrty_lst_t where a_in =1 order by sts_nm;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user ,fnm);
};


/*****************************************************************************
* Function       : getSlctdAlrmsDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getSlctdAlrmsDtaMdl = function (data, user) {
    var fnm = "getSlctdAlrmsDtaMdl"
    let where = ``
    if (data.severity) where += ` and a.svrty_id = '${data.severity}'`;
    if (data.from_time && data.to_time) where += ` and DATE_FORMAT(a.alrm_ocrd_ts,'%Y-%m-%d') BETWEEN '${data.from_time}' AND '${data.to_time}'`;
    if (data.open) where += ` and a.opn_in = ${data.open == 1 ? 1 : 2}`;

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY a.i_ts desc) s_no, e.elmnt_nm as Element_Name, do.olt_nm as OLT_Name, d.dstrt_nm as District, m.mndl_nm as Mandal, DATE_FORMAT(a.alrm_ocrd_ts, "%d-%m-%Y %H:%i:%s") as alert_occurred_timestamp, DATE_FORMAT(a.alrm_clrd_ts, "%d-%m-%Y %H:%i:%s") as alert_cleared_timestamp, a.alrm_clrd_tx as alert_cleared_message, a.prblm_tx as problem_message, s.sts_nm as severity
                        from dsnw_alrm_dtl_t a 
                        join dsnw_elmnt_typ_lst_t e on a.enty_typ_id = e.elmnt_id
                        join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
                        join dsnw_alrm_svrty_lst_t s on s.sts_id = a.svrty_id
                        join dstrt_lst_t d on d.dstrt_id = do.dstrt_id
                        JOIN mndl_lst_t m ON m.mndl_nu = do.mndl_id AND do.dstrt_id = m.dstrt_id
                        where do.a_in =1 ${where} order by a.i_ts desc`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_AllShareMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAlertsTbleDtaMdl = function (data, user) {
    var fnm = "getAlertsTbleDtaMdl"
    let where = ``;
    if (data.elmnt_id) where += ` and a.enty_typ_id = ${data.elmnt_id}`;
    if (data.dstrt_id) where += ` and d.dstrt_id = ${data.dstrt_id}`;
    if (data.mndl_id) where += ` and m.mndl_nu = ${data.mndl_id}`;
    if (data.gp_id) {
        where += ` and v.vlge_id = ${data.gp_id}`;
    };
    if (data.sts_id) where += ` and s.sts_id = ${data.sts_id}`;
    if (data.opn_in) where += ` and a.opn_in = ${data.opn_in == 1 ? 1 : 0}`;
    if (data.fromDate && data.toDate) where += ` and DATE_FORMAT(a.alrm_ocrd_ts,'%Y-%m-%d') BETWEEN DATE_FORMAT('${data.fromDate}','%Y-%m-%d') AND DATE_FORMAT('${data.toDate}','%Y-%m-%d')`;

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY a.alrm_ocrd_ts desc) sno, a.dsnw_alrm_id, e.elmnt_nm, do.olt_nm, d.dstrt_nm, m.mndl_nm , v.vlge_nm as gp_nm, DATE_FORMAT(a.alrm_ocrd_ts, "%d-%m-%Y %H:%i:%s") as alert_occurred_timestamp,a.alrm_ocrd_ts, DATE_FORMAT(a.alrm_clrd_ts, "%d-%m-%Y %H:%i:%s") as alert_cleared_timestamp,a.alrm_clrd_ts, a.alrm_clrd_tx as alert_cleared_message, a.alrm_cse_tx as alert_cse_message, a.prblm_tx as problem_message, s.sts_nm, (case when (a.alrm_clrd_ts is null and a.opn_in = 1) then 'Open' else 'Close' end) as opn_in, d.dstrt_id, m.mndl_id, do.nde_nm,d.lgd_cd as dstrt_lgd_cd,m.lgd_cd as mndl_lgd_cd,v.lgd_cd
    from dsnw_alrm_dtl_t a 
    join dsnw_elmnt_typ_lst_t e on a.enty_typ_id = e.elmnt_id
    join dsnw_alrm_svrty_lst_t s on s.sts_id = a.svrty_id
    join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
    join dstrt_lst_t d on d.dstrt_id = do.dstrt_id
    JOIN mndl_lst_t m ON m.mndl_nu = do.mndl_id AND do.dstrt_id = m.dstrt_id
    left join onu_ltrck_dtl_t o on o.caf_id = a.onu_caf_id and o.bbnl_in = 1 and o.olt_vndr_id=1 
    left join vlge_lst_t v on o.gp_id = v.vlge_id
    where do.a_in =1 ${where} order by a.alrm_ocrd_ts desc, a.i_ts desc;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
