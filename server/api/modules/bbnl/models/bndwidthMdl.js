var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function       : get_HsiCrntMnthCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsiCrntMnthCntMdl = function (data, user) {
    var fnm='get_HsiCrntMnthCntMdl'
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var pervsMnth = date.getMonth();
    var yearTdy = date.getFullYear();
    var QRY_TO_EXEC = ` select ROUND(sum(case when ttl_upld_ct then ttl_upld_ct else 0 end)/1024/1024/1024,2) as up,
    ROUND(sum(case when ttl_dwnld_ct then ttl_dwnld_ct else 0 end)/1024/1024/1024,2) as dwn,mnt_ct
    from BSS_BATCH.hsi_mnthly_usge_dtl_t u
    join caf_dtl_t c on u.caf_id = c.caf_id
    join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id = 1
    join cstmr_dtl_t d on c.cstmr_id = d.cstmr_id
    where o.a_in = 1 and yr_ct=${yearTdy} and mnt_ct=${currntMnth} or mnt_ct = ${pervsMnth}
    GROUP BY yr_ct,mnt_ct
    ORDER BY yr_ct,mnt_ct desc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : get_HsitdyprvsDayCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsitdyprvsDayCntMdl = function (user) {
    var fnm = "get_HsitdyprvsDayCntMdl"
    var date = new Date();
    var day = date.getDate();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1;
    var date1 = new Date();
    date1.setDate(date1.getDate() - 1)
    yester = date1.getDate();
    var yearYstrdy = date1.getFullYear();
    var mnthYstrdy = date1.getMonth() + 1;

    var QRY_TO_EXEC = [`select ROUND(sum(case when dy_up_${day} then dy_up_${day} else 0 end)/1024/1024/1024,2) as tdy_up,
        ROUND(sum(case when dy_dw_${day} then dy_dw_${day} else 0 end)/1024/1024/1024,2) as tdy_dwn
        from BSS_BATCH.hsi_mnthly_usge_dtl_t u
        join caf_dtl_t c on u.caf_id = c.caf_id
        join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id = 1
        where o.a_in = 1 and yr_ct=${yearTdy} and mnt_ct=${mnthTdy} 
        GROUP BY yr_ct,mnt_ct
        ORDER BY yr_ct,mnt_ct;`, 
        `select ROUND(sum(case when dy_up_${yester} then dy_up_${yester} else 0 end)/1024/1024/1024,2) as prvs_up,
        ROUND(sum(case when dy_dw_${yester} then dy_dw_${yester} else 0 end)/1024/1024/1024,2) as prvs_dwn
        from BSS_BATCH.hsi_mnthly_usge_dtl_t u
        join caf_dtl_t c on u.caf_id = c.caf_id
        join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id = 1
        where o.a_in = 1 and yr_ct=${yearYstrdy} and mnt_ct=${mnthYstrdy}
        GROUP BY yr_ct,mnt_ct
        ORDER BY yr_ct,mnt_ct;`];
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : bandWidthChartMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.bandWidthChartMdl = function (mnth, year, user) {
    var fnm = "bandWidthChartMdl"
    var QRY_TO_EXEC = `select ROUND(sum(case when dy_up_1 then dy_up_1 else 0 end)/1024/1024/1024,2) as day_1_U,
    ROUND(sum(case when dy_up_2 then dy_up_2 else 0 end)/1024/1024/1024,2) as day_2_U,
    ROUND(sum(case when dy_up_3 then dy_up_3 else 0 end)/1024/1024/1024,2) as day_3_U,
    ROUND(sum(case when dy_up_4 then dy_up_4 else 0 end)/1024/1024/1024,2) as day_4_U,
    ROUND(sum(case when dy_up_5 then dy_up_5 else 0 end)/1024/1024/1024,2) as day_5_U,
    ROUND(sum(case when dy_up_6 then dy_up_6 else 0 end)/1024/1024/1024,2) as day_6_U,
    ROUND(sum(case when dy_up_7 then dy_up_7 else 0 end)/1024/1024/1024,2) as day_7_U,
    ROUND(sum(case when dy_up_8 then dy_up_8 else 0 end)/1024/1024/1024,2) as day_8_U,
    ROUND(sum(case when dy_up_9 then dy_up_9 else 0 end)/1024/1024/1024,2) as day_9_U,
    ROUND(sum(case when dy_up_10 then dy_up_10 else 0 end)/1024/1024/1024,2) as day_10_U,
    ROUND(sum(case when dy_up_11 then dy_up_11 else 0 end)/1024/1024/1024,2) as day_11_U,
    ROUND(sum(case when dy_up_12 then dy_up_12 else 0 end)/1024/1024/1024,2) as day_12_U,
    ROUND(sum(case when dy_up_13 then dy_up_13 else 0 end)/1024/1024/1024,2) as day_13_U,
    ROUND(sum(case when dy_up_14 then dy_up_14 else 0 end)/1024/1024/1024,2) as day_14_U,
    ROUND(sum(case when dy_up_15 then dy_up_15 else 0 end)/1024/1024/1024,2) as day_15_U,
    ROUND(sum(case when dy_up_16 then dy_up_16 else 0 end)/1024/1024/1024,2) as day_16_U,
    ROUND(sum(case when dy_up_17 then dy_up_17 else 0 end)/1024/1024/1024,2) as day_17_U,
    ROUND(sum(case when dy_up_18 then dy_up_18 else 0 end)/1024/1024/1024,2) as day_18_U,
    ROUND(sum(case when dy_up_19 then dy_up_19 else 0 end)/1024/1024/1024,2) as day_19_U,
    ROUND(sum(case when dy_up_20 then dy_up_20 else 0 end)/1024/1024/1024,2) as day_20_U,
    ROUND(sum(case when dy_up_21 then dy_up_21 else 0 end)/1024/1024/1024,2) as day_21_U,
    ROUND(sum(case when dy_up_22 then dy_up_22 else 0 end)/1024/1024/1024,2) as day_22_U,
    ROUND(sum(case when dy_up_23 then dy_up_23 else 0 end)/1024/1024/1024,2) as day_23_U,
    ROUND(sum(case when dy_up_24 then dy_up_24 else 0 end)/1024/1024/1024,2) as day_24_U,
    ROUND(sum(case when dy_up_25 then dy_up_25 else 0 end)/1024/1024/1024,2) as day_25_U,
    ROUND(sum(case when dy_up_26 then dy_up_26 else 0 end)/1024/1024/1024,2) as day_26_U,
    ROUND(sum(case when dy_up_27 then dy_up_27 else 0 end)/1024/1024/1024,2) as day_27_U,
    ROUND(sum(case when dy_up_28 then dy_up_28 else 0 end)/1024/1024/1024,2) as day_28_U,
    ROUND(sum(case when dy_up_29 then dy_up_29 else 0 end)/1024/1024/1024,2) as day_29_U,
    ROUND(sum(case when dy_up_30 then dy_up_30 else 0 end)/1024/1024/1024,2) as day_30_U,
    ROUND(sum(case when dy_up_31 then dy_up_31 else 0 end)/1024/1024/1024,2) as day_31_U,
    ROUND(sum(case when dy_dw_1 then dy_dw_1 else 0 end)/1024/1024/1024,2) as day_1_D,
    ROUND(sum(case when dy_dw_2 then dy_dw_2 else 0 end)/1024/1024/1024,2) as day_2_D,
    ROUND(sum(case when dy_dw_3 then dy_dw_3 else 0 end)/1024/1024/1024,2) as day_3_D,
    ROUND(sum(case when dy_dw_4 then dy_dw_4 else 0 end)/1024/1024/1024,2) as day_4_D,
    ROUND(sum(case when dy_dw_5 then dy_dw_5 else 0 end)/1024/1024/1024,2) as day_5_D,
    ROUND(sum(case when dy_dw_6 then dy_dw_6 else 0 end)/1024/1024/1024,2) as day_6_D,
    ROUND(sum(case when dy_dw_7 then dy_dw_7 else 0 end)/1024/1024/1024,2) as day_7_D,
    ROUND(sum(case when dy_dw_8 then dy_dw_8 else 0 end)/1024/1024/1024,2) as day_8_D,
    ROUND(sum(case when dy_dw_9 then dy_dw_9 else 0 end)/1024/1024/1024,2) as day_9_D,
    ROUND(sum(case when dy_dw_10 then dy_dw_10 else 0 end)/1024/1024/1024,2) as day_10_D,
    ROUND(sum(case when dy_dw_11 then dy_dw_11 else 0 end)/1024/1024/1024,2) as day_11_D,
    ROUND(sum(case when dy_dw_12 then dy_dw_12 else 0 end)/1024/1024/1024,2) as day_12_D,
    ROUND(sum(case when dy_dw_13 then dy_dw_13 else 0 end)/1024/1024/1024,2) as day_13_D,
    ROUND(sum(case when dy_dw_14 then dy_dw_14 else 0 end)/1024/1024/1024,2) as day_14_D,
    ROUND(sum(case when dy_dw_15 then dy_dw_15 else 0 end)/1024/1024/1024,2) as day_15_D,
    ROUND(sum(case when dy_dw_16 then dy_dw_16 else 0 end)/1024/1024/1024,2) as day_16_D,
    ROUND(sum(case when dy_dw_17 then dy_dw_17 else 0 end)/1024/1024/1024,2) as day_17_D,
    ROUND(sum(case when dy_dw_18 then dy_dw_18 else 0 end)/1024/1024/1024,2) as day_18_D,
    ROUND(sum(case when dy_dw_19 then dy_dw_19 else 0 end)/1024/1024/1024,2) as day_19_D,
    ROUND(sum(case when dy_dw_20 then dy_dw_20 else 0 end)/1024/1024/1024,2) as day_20_D,
    ROUND(sum(case when dy_dw_21 then dy_dw_21 else 0 end)/1024/1024/1024,2) as day_21_D,
    ROUND(sum(case when dy_dw_22 then dy_dw_22 else 0 end)/1024/1024/1024,2) as day_22_D,
    ROUND(sum(case when dy_dw_23 then dy_dw_23 else 0 end)/1024/1024/1024,2) as day_23_D,
    ROUND(sum(case when dy_dw_24 then dy_dw_24 else 0 end)/1024/1024/1024,2) as day_24_D,
    ROUND(sum(case when dy_dw_25 then dy_dw_25 else 0 end)/1024/1024/1024,2) as day_25_D,
    ROUND(sum(case when dy_dw_26 then dy_dw_26 else 0 end)/1024/1024/1024,2) as day_26_D,
    ROUND(sum(case when dy_dw_27 then dy_dw_27 else 0 end)/1024/1024/1024,2) as day_27_D,
    ROUND(sum(case when dy_dw_28 then dy_dw_28 else 0 end)/1024/1024/1024,2) as day_28_D,
    ROUND(sum(case when dy_dw_29 then dy_dw_29 else 0 end)/1024/1024/1024,2) as day_29_D,
    ROUND(sum(case when dy_dw_30 then dy_dw_30 else 0 end)/1024/1024/1024,2) as day_30_D,
    ROUND(sum(case when dy_dw_31 then dy_dw_31 else 0 end)/1024/1024/1024,2) as day_31_D
    from BSS_BATCH.hsi_mnthly_usge_dtl_t u
    join caf_dtl_t c on u.caf_id = c.caf_id
    join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id = 1
    where o.a_in = 1 and mnt_ct=${mnth} and yr_ct=${year}
    GROUP BY yr_ct,mnt_ct
    ORDER BY yr_ct,mnt_ct;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getbndwdthTbleDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getbndwdthTbleDtaMdl = function (data, user) {
    var fnm = "getbndwdthTbleDtaMdl"

    var where = '';
    if (data.dstrt_id) where += ` and d1.dstrt_id = ${data.dstrt_id}`;
    if (data.mndl_id) where += ` and m.mndl_nu = ${data.mndl_id}`;
    if (data.gp_id) {
        where += ` and v.vlge_id = ${data.gp_id}`;
    };
    var QRY_TO_EXEC = `
        select ROW_NUMBER() OVER ( order by d.cstmr_nm) sno,d.cstmr_id,d.cstmr_nm,u.caf_id, o.dstrt_id,d1.dstrt_nm,m.mndl_id,m.mndl_nm,v.vlge_nm as gp_nm,v.lgd_cd, count(c.caf_id) as cnctns_ct,
        ROUND(sum(case when ttl_dwnld_ct then ttl_dwnld_ct else 0 end)/1024/1024/1024,2) AS mnthdld,
        ROUND(sum(case when ttl_upld_ct then ttl_upld_ct else 0 end)/1024/1024/1024,2) AS mnthupld,
        sum(u.mnth_usge_lmt_ct) as ttl_limit
        from BSS_BATCH.hsi_mnthly_usge_dtl_t u
        join caf_dtl_t c on u.caf_id = c.caf_id
        join olt_ltrck_dtl_t o on c.olt_id = o.olt_id and o.olt_vndr_id = 1
        join cstmr_dtl_t d on c.cstmr_id = d.cstmr_id
        left JOIN dstrt_lst_t as d1 on d1.dstrt_id = d.loc_dstrct_id
        left JOIN mndl_lst_t as m on m.dstrt_id = d.loc_dstrct_id and m.mndl_nu = d.loc_mndl_id
        left join vlge_lst_t as v on v.dstrt_id = d.loc_dstrct_id and v.mndl_id = d.loc_mndl_id and v.vlge_id = d.loc_vlge_id
        where o.a_in = 1 and yr_ct=${data.yr_id} and mnt_ct=${data.mnth_id} ${where}
        group by c.cstmr_id
        order by d.cstmr_nm`;

//         select ROUND(sum(h.ttl_dwnld_ct)/1024/1024/1024,2) AS mnthdld,
// ROUND(sum(h.ttl_upld_ct)/1024/1024/1024,2) AS mnthupld,
// (h.mnth_usge_lmt_ct) as ttl_limit
// from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
// join caf_dtl_t as c on c.caf_id=h.caf_id
// join olt_ltrck_dtl_t o on o.olt_id = c.olt_id and o.olt_vndr_id = 1
// join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
// group by c.cstmr_id 
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};