var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function       : get_hourlyCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_hourlyCountsMdl = function (user) {
    var fnm = "get_hourlyCountsMdl"
    var QRY_TO_EXEC = `select onu.*, olt.* from (SELECT 
        SUM(CASE WHEN TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 1 THEN 1 ELSE 0 END ) as 'onu_one_hr',
        SUM(CASE WHEN TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 3 AND TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) > 1 THEN 1 ELSE 0 END ) as 'onu_three_hr',
        SUM(CASE WHEN TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 12 AND TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 24 THEN 1 ELSE 0 END ) as 'onu_twelve_hr',
        SUM(CASE WHEN TIMESTAMPDIFF(hour, ot.oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 24 THEN 1 ELSE 0 END ) as 'onu_twntfur_hr' 
        FROM onu_ltrck_dtl_t ot
        join caf_dtl_t c on c.caf_id = ot.caf_id and ot.bbnl_in = 1 and c.trmnd_in=0 and ot.olt_vndr_id=1 
        WHERE ot.a_in=1 and ot.oprtnl_ste_id=2) as onu
        join
        (SELECT 
        SUM(CASE WHEN respond_delay < 1 THEN 1 ELSE 0 END ) as 'olt_one_hr',
        SUM(CASE WHEN respond_delay < 3 AND  respond_delay < 1 THEN 1 ELSE 0 END ) as 'olt_three_hr',
        SUM(CASE WHEN respond_delay >= 12 AND respond_delay < 24 THEN 1 ELSE 0 END ) as 'olt_twelve_hr',
        SUM(CASE WHEN respond_delay >= 24 THEN 1 ELSE 0 END ) as 'olt_twntfur_hr' 
        from (
            SELECT c.olt_id,oprtnl_ste_chnge_ts,oprtnl_ste_id,COUNT(*) as ttl_cafs,
            TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay
            FROM caf_dtl_t c
            JOIN olt_ltrck_dtl_t t on t.olt_id = c.olt_id and t.olt_vndr_id =1 
            WHERE t.a_in=1 and c.trmnd_in=0 and t.oprtnl_ste_id=2
            GROUP BY c.olt_ip_addr_tx
            ORDER BY oprtnl_ste_chnge_ts
        ) as a ) as olt`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_onuHourlDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_onuHourlDataMdl = function (data, user) {
    var fnm = "get_onuHourlDataMdl"
    var where ='';
    if(data.hr == 1){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 1 `;
    }
    if(data.hr == 3){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 3 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) > 1 `;
    }
    if(data.hr == 12){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 12 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 24 `;
    }
    if(data.hr == 24){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 24 `;
    
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY onu.caf_id) sno,
    o.olt_id, o.olt_nm, ( case when onu.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as ste_nm,DATE_FORMAT(onu.lst_dw_ts,'%d-%m-%Y %H:%i:%s') as oprtnl_ste_chnge_ts,o.olt_srl_nu,( case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end) as lst_dw_rsn_tx,onu.onu_srl_nu,o.olt_ip_addr_tx,
    (case when onu.oprtnl_ste_id = 1 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upDateTime,
    (case when onu.oprtnl_ste_id = 2 then DATE_FORMAT(onu.oprnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as dwnDateTime,
    (case when onu.oprtnl_ste_id = 2 then case when onu.lst_dw_rsn_tx = 'none' then 'NA' else onu.lst_dw_rsn_tx end else null end) as lst_dw_rsn_tx
    FROM onu_ltrck_dtl_t onu
    join caf_dtl_t c on c.caf_id = onu.caf_id and onu.bbnl_in = 1 and c.trmnd_in=0 and onu.olt_vndr_id=1 
    join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id=1
    left join onu_oprnl_ste_hst_t as sh on sh.caf_id = onu.caf_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
    WHERE o.a_in=1 and onu.a_in=1 ${where} group by onu.caf_id order by onu.caf_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_OltHourlDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_OltHourlDataMdl = function (data, user) {
    var fnm = "get_OltHourlDataMdl"
    var where ='';
    if(data.hr == 1){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 1 `;
    }
    if(data.hr == 3){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 3 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) > 1 `;
    }
    if(data.hr == 12){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 12 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 24 `;
    }
    if(data.hr == 24){
        where = ` and TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 24 `;
    
    }
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY d.dstrt_nm) sno, d.dstrt_nm,o.olt_ip_addr_tx,
    o.olt_id, o.olt_nm, ( case when o.oprtnl_ste_id = 1 then 'Active' else 'Inactive' end) as ste_nm,o.olt_srl_nu,
    (case when o.oprtnl_ste_id = 1 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as upDateTime,
    (case when o.oprtnl_ste_id = 2 then DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%s') else null end) as dwnDateTime,
    (case when o.oprtnl_ste_id = 2 then sh.dwn_rsn_tx else null end) as lst_dw_rsn_tx
    FROM olt_ltrck_dtl_t o
    join dstrt_lst_t d on d.dstrt_id = o.dstrt_id and o.olt_vndr_id=1
    left join olt_oprnl_ste_hst_t as sh on sh.olt_id = o.olt_id and sh.oprtnl_ste_id in (1,2) and sh.oprtnl_ste_end_ts is not null
    WHERE o.a_in=1 ${where} group by o.olt_ip_addr_tx order by d.dstrt_nm;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};