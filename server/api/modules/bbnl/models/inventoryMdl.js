var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function       : getinvtryTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getinvtryTbleDtaMdl = function (data, user) {
    var fnm = "getinvtryTbleDtaMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (order by s1.dstrct_id desc) sno,d1.dstrt_nm,d1.dstrt_id,s1.*
    FROM dstrt_lst_t as d1
    left join (
        select dstrt_id, count(distinct olt_ip_addr_tx) as oltCt, 
        sum(case when oprtnl_ste_id=1 then 1 else 0 end) as olt_upCt, 
        sum(case when oprtnl_ste_id=2 then 1 else 0 end) as olt_dwnCt, a.*, c.*
        from
        (select dstrt_id, olt_id, olt_ip_addr_tx,oprtnl_ste_id from olt_ltrck_dtl_t where olt_vndr_id = 1 group by olt_ip_addr_tx) b
        join
        (select dstrct_id,count(Distinct ol.caf_id) as onuCt,sum(case when ol.oprtnl_ste_id=1 then 1 else 0 end) as onu_upCt,
        sum(case when ol.oprtnl_ste_id = 2 then 1 else 0 end) as onu_dwnCt
        from onu_ltrck_dtl_t ol
        join caf_dtl_t c on c.caf_id=ol.caf_id and c.trmnd_in <> 1
        where ol.a_in =1 and ol.bbnl_in = 1 and ol.olt_vndr_id=1 group by dstrct_id) a on a.dstrct_id = b.dstrt_id
        join
        (select o.dstrt_id as alrm_dstrt_id, count(Distinct ol.alrm_id) as alrmCt ,
        count(Distinct(case when ol.opn_in = 1 then alrm_id else null end)) as alrmopnCt,
        count(Distinct(case when ol.opn_in = 0 then alrm_id else null end)) as alrmclsCt ,
        count(Distinct(case when ol.svrty_id = 1 and ol.opn_in = 1 then alrm_id else null end)) as crtclAlrmCt,
        count(Distinct(case when ol.svrty_id = 2 and ol.opn_in = 1 then alrm_id else null end)) as mjrAlrmCt, 
        count(Distinct(case when ol.svrty_id = 3 and ol.opn_in = 1 then alrm_id else null end)) as mnrAlrmCt,
        count(Distinct(case when ol.svrty_id = 4 and ol.opn_in = 1 then alrm_id else null end)) as intermAlrmCt,
        count(Distinct(case when ol.svrty_id = 5 and ol.opn_in = 1 then alrm_id else null end)) as warnAlrmCt 
        from dsnw_alrm_dtl_t ol 
        join olt_ltrck_dtl_t o on ol.olt_id = o.olt_id and o.olt_vndr_id=1  
        where o.a_in =1 group by dstrt_id) c on c.alrm_dstrt_id = b.dstrt_id
        group by b.dstrt_id
        ) as s1 on s1.dstrct_id=d1.dstrt_id
    ORDER BY s1.dstrct_id desc;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getMndlWsInvntryTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMndlWsInvntryTbleDtaMdl = function (data, user) {
    var fnm = "getMndlWsInvntryTbleDtaMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( order by s1.mndl_id desc) sno,d1.dstrt_id,d1.mndl_nm,d1.mndl_nu as mndll_id,s1.*
    FROM mndl_lst_t as d1
    left join
    (select count(distinct olt_ip_addr_tx) as oltCt, 
    sum(case when oprtnl_ste_id=1 then 1 else 0 end) as olt_upCt, 
    sum(case when oprtnl_ste_id=2 then 1 else 0 end) as olt_dwnCt, a.onuCt,a.onu_upCt,a.onu_dwnCt, c.*
    from
    (select mndl_id,dstrt_id, olt_id, olt_ip_addr_tx,oprtnl_ste_id from olt_ltrck_dtl_t 
    where olt_vndr_id = 1 and dstrt_id = ${data.dstrct_id} group by olt_ip_addr_tx) b
    join
    (select o.mndl_id,dstrt_id,count(Distinct ol.caf_id) as onuCt,sum(case when ol.oprtnl_ste_id=1 then 1 else 0 end) as onu_upCt,
    sum(case when ol.oprtnl_ste_id = 2 then 1 else 0 end) as onu_dwnCt
    from onu_ltrck_dtl_t ol
    join caf_dtl_t c on c.caf_id=ol.caf_id and c.trmnd_in <> 1
    join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id=1  
    where ol.a_in =1 and ol.bbnl_in = 1 and ol.olt_vndr_id=1  and dstrct_id =${data.dstrct_id} group by o.mndl_id) a 
    on a.mndl_id = b.mndl_id and a.dstrt_id=b.dstrt_id
    join
    (select o.mndl_id,o.dstrt_id, count(Distinct ol.alrm_id) as alrmCt ,
    count(Distinct(case when ol.opn_in = 1 then alrm_id else null end)) as alrmopnCt,
    count(Distinct(case when ol.opn_in = 0 then alrm_id else null end)) as alrmclsCt ,
    count(Distinct(case when ol.svrty_id = 1 and ol.opn_in = 1 then alrm_id else null end)) as crtclAlrmCt,
    count(Distinct(case when ol.svrty_id = 2 and ol.opn_in = 1 then alrm_id else null end)) as mjrAlrmCt, 
    count(Distinct(case when ol.svrty_id = 3 and ol.opn_in = 1 then alrm_id else null end)) as mnrAlrmCt,
    count(Distinct(case when ol.svrty_id = 4 and ol.opn_in = 1 then alrm_id else null end)) as intermAlrmCt,
    count(Distinct(case when ol.svrty_id = 5 and ol.opn_in = 1 then alrm_id else null end)) as warnAlrmCt  
    from dsnw_alrm_dtl_t ol 
    join olt_ltrck_dtl_t o on ol.olt_id = o.olt_id and o.olt_vndr_id=1  
    where o.a_in =1 and dstrt_id =${data.dstrct_id} group by mndl_id) c 
    on c.mndl_id = b.mndl_id and c.dstrt_id=b.dstrt_id
    group by b.mndl_id ) as s1 on s1.mndl_id=d1.mndl_nu and d1.dstrt_id= s1.dstrt_id
    where d1.dstrt_id=${data.dstrct_id}
    ORDER BY s1.mndl_id desc;`
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getGPWsInvntryTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getGPWsInvntryTbleDtaMdl = function (data, user) {
    var fnm = "getGPWsInvntryTbleDtaMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( order by s1.vlge_id desc) sno,d1.vlge_nm as gp_nm,d1.vlge_id as gp_id,s1.*
    FROM vlge_lst_t as d1
    left join
    (select onu.gp_id as vlge_id, count(Distinct o.olt_id) as oltCt, count(Distinct (case when o.oprtnl_ste_id = 1 then o.olt_id else null end)) as olt_upCt, 
    count(Distinct(case when o.oprtnl_ste_id = 2 then o.olt_id else null end)) as olt_dwnCt,count(Distinct onu.caf_id) as onuCt, 
    count(Distinct(case when onu.oprtnl_ste_id = 1 then onu.caf_id else null end)) as onu_upCt, 
    count(Distinct (case when onu.oprtnl_ste_id = 2 then onu.caf_id else null end)) as onu_dwnCt, count(Distinct a.alrm_id) as alrmCt,
    count(Distinct(case when a.opn_in = 1 then a.alrm_id else null end)) as alrmopnCt, count(Distinct(case when a.opn_in = 0 then a.alrm_id else null end)) as alrmclsCt
   from onu_ltrck_dtl_t onu
    join olt_ltrck_dtl_t o on  onu.olt_ip = o.olt_ip_addr_tx  and onu.bbnl_in = 1 and onu.olt_vndr_id=1 
    left join dsnw_alrm_dtl_t a on a.olt_id = o.olt_id
    where onu.mndl_id = ${data.mndl_id} and onu.dstrct_id = ${data.dstrct_id} and o.olt_vndr_id = 1 
    group by onu.gp_id) as s1 on s1.vlge_id=d1.vlge_id
    where d1.mndl_id = ${data.mndl_id} and d1.dstrt_id = ${data.dstrct_id}
    ORDER BY s1.vlge_id desc;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getOltTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltTbleDtaMdl = function (data, user) {
    var fnm = "getOltTbleDtaMdl"
    var where = ``;
    if (data.dstrct_id) where += ` and d.dstrt_id = ${data.dstrct_id}`;
    if (data.mndl_id) where += ` and m.mndl_nu = ${data.mndl_id}`;
    if (data.oprtnl_ste_id) where += ` and o.oprtnl_ste_id = ${data.oprtnl_ste_id}`;

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( order by o.olt_id) sno, d.dstrt_nm, m.mndl_nm,(case when o.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as ste_nm,o.olt_nm,o.olt_lble_nu,o.olt_srl_nu,o.lat,o.lng, olt_ip_addr_tx, sftwe_vrsn_tx, hrdwe_vrsn_tx,nde_nm, d.lgd_cd as dstrt_lgd_cd,m.lgd_cd as mndl_lgd_cd,
    (case when o.oprtnl_ste_id = 1 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upDateTime,
    (case when o.oprtnl_ste_id = 2 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as dwnDateTime,
    (case when o.oprtnl_ste_id = 2 then case when sh.dwn_rsn_tx= 'none' then 'NA'  else sh.dwn_rsn_tx end else null end) as lst_dw_rsn_tx
    from olt_ltrck_dtl_t o
    join dstrt_lst_t d on d.dstrt_id = o.dstrt_id
    join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
    left join olt_oprnl_ste_hst_t as sh on sh.olt_id = o.olt_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
    where o.a_in=1 and o.olt_vndr_id = 1 ${where} group by o.olt_id order by o.olt_id;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getOnuTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOnuTbleDtaMdl = function (data, user) {
    var fnm ="getOnuTbleDtaMdl"
    var where = ``;
    if (data.dstrct_id) where += ` and d.dstrt_id = ${data.dstrct_id}`;
    if (data.mndl_id) where += ` and m.mndl_nu = ${data.mndl_id}`;
    if (data.gp_id) where += ` and v.vlge_id = ${data.gp_id}`;
    if (data.oprtnl_ste_id) where += ` and onu.oprtnl_ste_id = ${data.oprtnl_ste_id}`;

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( order by onu.caf_id) sno,onu.caf_id, d.dstrt_nm, m.mndl_nm, v.vlge_nm as gp_nm, onu.olt_srl_nu,onu.olt_ip,( case when onu.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as ste_nm, onu.oprtnl_ste_id, onu.onu_mdl_nm, onu_dscrptn_tx,onu.onu_srl_nu, d.lgd_cd as dstrt_lgd_cd,m.lgd_cd as mndl_lgd_cd,v.lgd_cd,
    (case when onu.oprtnl_ste_id = 1 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upDateTime,
    (case when onu.oprtnl_ste_id = 2 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as dwnDateTime,
    (case when onu.oprtnl_ste_id = 2 then case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end else null end) as lst_dw_rsn_tx
    from onu_ltrck_dtl_t onu
    join caf_dtl_t c on c.caf_id = onu.caf_id  
    join (select olt_ip_addr_tx, olt_vndr_id,mndl_id,dstrt_id from olt_ltrck_dtl_t where olt_vndr_id=1 group by olt_ip_addr_tx) o on o.olt_ip_addr_tx = onu.olt_ip and o.olt_vndr_id = 1
    join dstrt_lst_t d on d.dstrt_id = onu.dstrct_id
    join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
    left join vlge_lst_t v on onu.gp_id = v.vlge_id
    where onu.a_in=1 and onu.bbnl_in = 1 and onu.olt_vndr_id=1 ${where} order by onu.caf_id;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_inventoryDt
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_inventoryDt = function (data, user) {
    var fnm = "get_inventoryDt"

    var QRY_TO_EXEC = `select * from(
        select d.dstrt_nm as district,d.lgd_cd as district_LGD_code, m.mndl_nm as mandal, m.lgd_cd as mandal_LGD_code, null as gramphanchayat, null as gramphanchayat_LGD_code,
        o.olt_srl_nu as olt_serial_number, olt_ip_addr_tx as ip_address, null as onu_serial_number,
        (case when o.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state,
        (case when o.oprtnl_ste_id = 1 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when o.oprtnl_ste_id = 2 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
        (case when o.oprtnl_ste_id = 2 then case when sh.dwn_rsn_tx= 'none' then 'NA'  else sh.dwn_rsn_tx end else null end) as last_down_reason
        from olt_ltrck_dtl_t o
        join dstrt_lst_t d on d.dstrt_id = o.dstrt_id
        join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
        left join olt_oprnl_ste_hst_t as sh on sh.olt_id = o.olt_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
        where o.a_in=1 and o.olt_vndr_id = 1 group by o.olt_id order by o.olt_id
        UNION ALL
        select d.dstrt_nm as district,d.lgd_cd as district_LGD_code, m.mndl_nm as mandal, m.lgd_cd as mandal_LGD_code, v.vlge_nm as gramphanchayat, v.lgd_cd as gramphanchayat_LGD_code,
        onu.olt_srl_nu as olt_serial_numbe,onu.olt_ip as ip_address, onu.onu_srl_nu as onu_serial_number,
        (case when onu.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state, 
        (case when onu.oprtnl_ste_id = 1 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when onu.oprtnl_ste_id = 2 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
        (case when onu.oprtnl_ste_id = 2 then case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end else null end) as last_down_reason
        from onu_ltrck_dtl_t onu
        join caf_dtl_t c on c.caf_id = onu.caf_id  
        join (select olt_ip_addr_tx, olt_vndr_id,mndl_id,dstrt_id from olt_ltrck_dtl_t where olt_vndr_id=1 group by olt_ip_addr_tx) o on o.olt_ip_addr_tx = onu.olt_ip and o.olt_vndr_id = 1
        join dstrt_lst_t d on d.dstrt_id = onu.dstrct_id
        join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
        left join vlge_lst_t v on onu.gp_id = v.vlge_id
        where onu.a_in=1 and onu.bbnl_in = 1 and onu.olt_vndr_id=1 order by onu.caf_id
        ) as a`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_alarmsDt
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_alarmsDt = function (data, user) {
    var fnm = "get_alarmsDt"
    let where = ``;
    if (data.severity) where += ` and s.sts_nm in (${data.sts_nm})`;
    if (data.fromDate && data.toDate) where += ` and DATE_FORMAT(a.alrm_ocrd_ts,'%Y-%m-%d') BETWEEN DATE_FORMAT('${data.fromDate}','%Y-%m-%d') AND DATE_FORMAT('${data.toDate}','%Y-%m-%d')`;

    var QRY_TO_EXEC = `select a.dsnw_alrm_id as dasan_alert_id,d.dstrt_nm as district,d.lgd_cd as district_LGD_code, m.mndl_nm as mandal, m.lgd_cd as mandal_LGD_code, 
    v.vlge_nm as gramphanchayat, v.lgd_cd as gramphanchayat_LGD_code,
    DATE_FORMAT(a.alrm_ocrd_ts, "%d-%m-%Y %H:%i:%s") as alert_occurred_timestamp,
    DATE_FORMAT(a.alrm_clrd_ts, "%d-%m-%Y %H:%i:%s") as alert_cleared_timestamp,
    a.alrm_clrd_tx as alert_cleared_message, a.alrm_cse_tx as alert_cse_message, 
    a.prblm_tx as problem_message, s.sts_nm as severity, 
    (case when (a.alrm_clrd_ts is null and a.opn_in = 1) then 'Open' else 'Close' end) as opn_in
        from dsnw_alrm_dtl_t a 
        join dsnw_elmnt_typ_lst_t e on a.enty_typ_id = e.elmnt_id
        join dsnw_alrm_svrty_lst_t s on s.sts_id = a.svrty_id
        join olt_ltrck_dtl_t as do on do.olt_id = a.olt_id and do.olt_vndr_id = 1
        join dstrt_lst_t d on d.dstrt_id = do.dstrt_id
        JOIN mndl_lst_t m ON m.mndl_nu = do.mndl_id AND do.dstrt_id = m.dstrt_id
        left join onu_ltrck_dtl_t o on o.caf_id = a.onu_caf_id and o.bbnl_in = 1 and o.olt_vndr_id=1 
        left join vlge_lst_t v on o.gp_id = v.vlge_id
        where do.a_in =1 ${where} order by a.alrm_ocrd_ts desc, a.i_ts desc;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_serviceInventoryDt
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_serviceInventoryDt = function (data, user) {
    var fnm = "get_serviceInventoryDt"

    var QRY_TO_EXEC = `select * from(
        select d.dstrt_nm as district,d.lgd_cd as district_LGD_code, m.mndl_nm as mandal, m.lgd_cd as mandal_LGD_code, null as gramphanchayat, null as gramphanchayat_LGD_code,
        o.olt_srl_nu as olt_serial_number, olt_ip_addr_tx as ip_address, null as onu_serial_number,
        (case when o.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state,
        (case when o.oprtnl_ste_id = 1 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when o.oprtnl_ste_id = 2 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
        (case when o.oprtnl_ste_id = 2 then case when sh.dwn_rsn_tx= 'none' then 'NA'  else sh.dwn_rsn_tx end else null end) as last_down_reason
        from olt_ltrck_dtl_t o
        join dstrt_lst_t d on d.dstrt_id = o.dstrt_id
        join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
        left join olt_oprnl_ste_hst_t as sh on sh.olt_id = o.olt_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
        where o.a_in=1 and o.olt_vndr_id = 1 group by o.olt_id order by o.olt_id
        UNION ALL
        select d.dstrt_nm as district,d.lgd_cd as district_LGD_code, m.mndl_nm as mandal, m.lgd_cd as mandal_LGD_code, v.vlge_nm as gramphanchayat, v.lgd_cd as gramphanchayat_LGD_code,
        onu.olt_srl_nu as olt_serial_numbe,onu.olt_ip as ip_address, onu.onu_srl_nu as onu_serial_number,
        (case when onu.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state, 
        (case when onu.oprtnl_ste_id = 1 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when onu.oprtnl_ste_id = 2 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
        (case when onu.oprtnl_ste_id = 2 then case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end else null end) as last_down_reason
        from onu_ltrck_dtl_t onu
        join caf_dtl_t c on c.caf_id = onu.caf_id  
        join (select olt_ip_addr_tx, olt_vndr_id,mndl_id,dstrt_id from olt_ltrck_dtl_t where olt_vndr_id=1 group by olt_ip_addr_tx) o on o.olt_ip_addr_tx = onu.olt_ip and o.olt_vndr_id = 1
        join dstrt_lst_t d on d.dstrt_id = onu.dstrct_id
        join mndl_lst_t m on m.mndl_nu = o.mndl_id and m.dstrt_id = o.dstrt_id
        left join vlge_lst_t v on onu.gp_id = v.vlge_id
        where onu.a_in=1 and onu.bbnl_in = 1 and onu.olt_vndr_id=1 order by onu.caf_id
        ) as a`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_slaDt
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slaDt = function (data, user) {
    var fnm = "get_slaDt"
    var QRY_TO_EXEC = `select * from
    (
        SELECT o.olt_srl_nu as olt_serial_number,o.olt_ip_addr_tx as ip_address, null as onu_serial_number,
        (case when o.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state,
        (case when o.oprtnl_ste_id = 1 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when o.oprtnl_ste_id = 2 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
    (case when o.oprtnl_ste_id = 2 then case when sh.dwn_rsn_tx= 'none' then 'NA'  else sh.dwn_rsn_tx end else null end) as last_down_reason
        FROM olt_ltrck_dtl_t o
        join dstrt_lst_t d on d.dstrt_id = o.dstrt_id and o.olt_vndr_id=1
        left join olt_oprnl_ste_hst_t as sh on sh.olt_id = o.olt_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
        WHERE o.a_in=1 group by o.olt_ip_addr_tx order by d.dstrt_nm
        UNION ALL
    SELECT o.olt_srl_nu as olt_serial_number,o.olt_ip_addr_tx as ip_address,onu.onu_srl_nu as onu_serial_number,
        ( case when onu.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as operational_state,
        (case when onu.oprtnl_ste_id = 1 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upTime,
        (case when onu.oprtnl_ste_id = 2 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as downTime,
        (case when onu.oprtnl_ste_id = 2 then case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end else null end) as last_down_reason
        FROM onu_ltrck_dtl_t onu
        join caf_dtl_t c on c.caf_id = onu.caf_id and onu.bbnl_in = 1 and c.trmnd_in=0 and onu.olt_vndr_id=1 
        join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id=1
        left join onu_oprnl_ste_hst_t as sh on sh.caf_id = onu.caf_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
        WHERE o.a_in=1 and onu.a_in=1 group by onu.caf_id order by onu.caf_id
        ) a`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};