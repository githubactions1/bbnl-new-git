var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');



/*****************************************************************************
* Function       : getcafinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 08/09/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafinfoappMdl = function (data, user) {
    var fnm = "getcafinfoappMdl"

	var QRY_TO_EXEC = `select c.caf_id as 'CAF_ID',cu.cstmr_nm as 'CUSTOMER_NAME', c.mbl_nu as 'MOBILE',cu.cstmr_nm as 'ORG_NAME',cu.blng_eml1_tx as 'EMAIL',e.sts_nm as 'STATUS',
	c.caf_id as 'ACCOUNT_ID',cu.loc_lctn_tx as 'ADDRESS',c.onu_srl_nu as 'ONU_SRL_NU', c.onu_mac_addr_tx as 'ONU_MAC',c.iptv_srl_nu as 'IPTV_SRL_NU', 
	c.iptv_mac_addr_tx as 'IPTV_MAC',p.pckge_nm as 'PLAN',GROUP_CONCAT(s.srvcpk_nm SEPARATOR ', ') as 'SERVICES', a.agnt_cd as 'LMO',c.olt_ip_addr_tx as 'OLT_IP',
	d.dstrt_nm as 'DISTRICT', m.mndl_nm as 'MANDAL',v.vlge_nm as 'VILLAGE',c.mdlwe_sbscr_id as 'IPTV_SUB_ID', c.aaa_cd as 'AAA_CODE', c.aghra_cd as 'AGORA_ID' , o.olt_vndr_id as 'Vendor_id'
	from caf_dtl_t c
	 join cstmr_dtl_t as cu on  cu.cstmr_id=c.cstmr_id and cu.a_in=1
	 join agnt_lst_t as a on  a.agnt_id=c.lmo_agnt_id
	 join dstrt_lst_t d on cu.blng_dstrct_id=d.dstrt_id
	 join mndl_lst_t m on (cu.blng_mndl_id=m.mndl_id or cu.blng_mndl_id=m.mndl_nu) and cu.blng_dstrct_id=m.dstrt_id
	 join vlge_lst_t v on (cu.blng_vlge_id=v.vlge_id or cu.blng_vlge_id=v.vlge_nu) and cu.blng_mndl_id=v.mndl_id and cu.blng_dstrct_id=v.dstrt_id
	 join enty_sts_lst_t e on c.enty_sts_id=e.enty_sts_id
	 join pckge_lst_t p on c.crnt_pln_id=p.pckge_id
	 join olt_lst_t as o on o.olt_id = c.olt_id
	  JOIN pckge_srvcpk_rel_t psr on psr.pckge_id=p.pckge_id
	  join pckge_srvcpk_lst_t s on s.srvcpk_id=psr.srvcpk_id 
	 where c.caf_id='${data}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getcafinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/09/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafextstusinfoappMdl = function (user) {
    var fnm = "getcafextstusinfoappMdl"
	var year =new Date().getFullYear();
	var month =new Date().getMonth()+1;
	var check = year+'-'+month+'-'+'01';
	var QRY_TO_EXEC = `select c.caf_id as 'CAF_ID',c.enty_sts_id as 'STATUS_ID',c.aaa_cd as 'AAA_CODE',c.aghra_cd as 'AGORA_CODE',c.trmnd_ts as 'Termination_Date',c.spnd_ts as 'Suspend_Date' from caf_dtl_t as c where c.caf_type_id=2 and c.trmnd_in=1 and c.enty_sts_id=8 and  c.trmnd_dt between '${check}' and CURDATE()`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getextcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getextcafHsiDtlsMdl = (id, user) => {
    var fnm = "getextcafHsiDtlsMdl"
	var year =new Date().getFullYear();
    var month =new Date().getMonth()+1;
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,
                        ROUND(dy_up_1/1024/1024/1024,2) AS day_1_TU,
                        ROUND(dy_dw_1/1024/1024/1024,2) AS day_1_TD,
					    ROUND(dy_up_2/1024/1024/1024,2) AS day_2_TU,
                        ROUND(dy_dw_2/1024/1024/1024,2) AS day_2_TD,
						ROUND(dy_up_3/1024/1024/1024,2) AS day_3_TU,
                        ROUND(dy_dw_3/1024/1024/1024,2) AS day_3_TD,
						ROUND(dy_up_4/1024/1024/1024,2) AS day_4_TU,
                        ROUND(dy_dw_4/1024/1024/1024,2) AS day_4_TD,
						ROUND(dy_up_5/1024/1024/1024,2) AS day_5_TU,
                        ROUND(dy_dw_5/1024/1024/1024,2) AS day_5_TD,
						ROUND(dy_up_6/1024/1024/1024,2) AS day_6_TU,
                        ROUND(dy_dw_6/1024/1024/1024,2) AS day_6_TD,
						ROUND(dy_up_7/1024/1024/1024,2) AS day_7_TU,
                        ROUND(dy_dw_7/1024/1024/1024,2) AS day_7_TD,
						ROUND(dy_up_8/1024/1024/1024,2) AS day_8_TU,
                        ROUND(dy_dw_8/1024/1024/1024,2) AS day_8_TD,
						ROUND(dy_up_9/1024/1024/1024,2) AS day_9_TU,
                        ROUND(dy_dw_9/1024/1024/1024,2) AS day_9_TD,
						ROUND(dy_up_10/1024/1024/1024,2) AS day_10_TU,
                        ROUND(dy_dw_10/1024/1024/1024,2) AS day_10_TD,
						ROUND(dy_up_11/1024/1024/1024,2) AS day_11_TU,
                        ROUND(dy_dw_11/1024/1024/1024,2) AS day_11_TD,
						ROUND(dy_up_12/1024/1024/1024,2) AS day_12_TU,
                        ROUND(dy_dw_12/1024/1024/1024,2) AS day_12_TD,
						ROUND(dy_up_13/1024/1024/1024,2) AS day_13_TU,
                        ROUND(dy_dw_13/1024/1024/1024,2) AS day_13_TD,
						ROUND(dy_up_14/1024/1024/1024,2) AS day_14_TU,
                        ROUND(dy_dw_14/1024/1024/1024,2) AS day_14_TD,
						ROUND(dy_up_15/1024/1024/1024,2) AS day_15_TU,
                        ROUND(dy_dw_15/1024/1024/1024,2) AS day_15_TD,
						ROUND(dy_up_16/1024/1024/1024,2) AS day_16_TU,
                        ROUND(dy_dw_16/1024/1024/1024,2) AS day_16_TD,
	                    ROUND(dy_up_17/1024/1024/1024,2) AS day_17_TU,
                        ROUND(dy_dw_17/1024/1024/1024,2) AS day_17_TD,
						ROUND(dy_up_18/1024/1024/1024,2) AS day_18_TU,
                        ROUND(dy_dw_18/1024/1024/1024,2) AS day_18_TD,
						ROUND(dy_up_19/1024/1024/1024,2) AS day_19_TU,
                        ROUND(dy_dw_19/1024/1024/1024,2) AS day_19_TD,
						ROUND(dy_up_20/1024/1024/1024,2) AS day_20_TU,
                        ROUND(dy_dw_20/1024/1024/1024,2) AS day_20_TD,
						ROUND(dy_up_21/1024/1024/1024,2) AS day_21_TU,
                        ROUND(dy_dw_21/1024/1024/1024,2) AS day_21_TD,
						ROUND(dy_up_22/1024/1024/1024,2) AS day_22_TU,
                        ROUND(dy_dw_22/1024/1024/1024,2) AS day_22_TD,
						ROUND(dy_up_23/1024/1024/1024,2) AS day_23_TU,
                        ROUND(dy_dw_23/1024/1024/1024,2) AS day_23_TD,
						ROUND(dy_up_24/1024/1024/1024,2) AS day_24_TU,
                        ROUND(dy_dw_24/1024/1024/1024,2) AS day_24_TD,
                        ROUND(dy_up_25/1024/1024/1024,2) AS day_25_TU,
                        ROUND(dy_dw_25/1024/1024/1024,2) AS day_25_TD,
						ROUND(dy_up_26/1024/1024/1024,2) AS day_26_TU,
                        ROUND(dy_dw_26/1024/1024/1024,2) AS day_26_TD,
						ROUND(dy_up_27/1024/1024/1024,2) AS day_27_TU,
                        ROUND(dy_dw_27/1024/1024/1024,2) AS day_27_TD,
						ROUND(dy_up_28/1024/1024/1024,2) AS day_28_TU,
                        ROUND(dy_dw_28/1024/1024/1024,2) AS day_28_TD,
						ROUND(dy_up_29/1024/1024/1024,2) AS day_29_TU,
                        ROUND(dy_dw_29/1024/1024/1024,2) AS day_29_TD,
						ROUND(dy_up_30/1024/1024/1024,2) AS day_30_TU,
                        ROUND(dy_dw_30/1024/1024/1024,2) AS day_30_TD,
						ROUND(dy_up_31/1024/1024/1024,2) AS day_31_TU,
                        ROUND(dy_dw_31/1024/1024/1024,2) AS day_31_TD,mnth_usge_lmt_ct
                        from hsi_mnthly_usge_dtl_t
                        WHERE caf_id= ${id} and yr_ct =${year} and mnt_ct=${month}
                        GROUP BY mnt_ct
                        ORDER BY mnt_ct `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : oltEffectedcafcountMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 05/07/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.oltEffectedcafcountMdl = function (data,user) {
    var fnm = "oltEffectedcafcountMdl"

	var QRY_TO_EXEC = `select count(*) as down_count,
    sum(case when enty_sts_id in (6,1,85,10,11) and caf_type_id=1 then 1 else 0 end) as 'ind_actve_cnt',
    sum(case when enty_sts_id in (6,1,85,10,11) and caf_type_id=2 then 1 else 0 end) as 'ent_actve_cnt',
    sum(case when enty_sts_id in (7,84) and caf_type_id=1 then 1 else 0 end) as 'ind_spnd_cnt',
    sum(case when enty_sts_id in (7,84) and caf_type_id=2 then 1 else 0 end) as 'ent_spnd_cnt' from caf_dtl_t where olt_ip_addr_tx in (${data.olt_ip}) and enty_sts_id not in (8,45)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : todayprovisionedafsDataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 20/10/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.todayprovisionedafsDataMdl = function (data,user) {
    var fnm = "todayprovisionedafsDataMdl"

	var QRY_TO_EXEC = `select cs.cstmr_nm as 'cus_name',c.link_type,c.org_type,c.orgnsn_code,c.caf_id as 'user_name', c.ent_dept_id as 'org_id', c.mbl_nu as 'phone',c.hsi_crnt_prfle_tx as 'plan_id',
    c.instl_dstrct_id as 'dist_id',date_format(c.i_ts,'%Y-%m-%d') as 'act_date',loc_addr1_tx as 'street1',loc_lctn_tx as 'landmark',c.instl_ste_id as 'state',
    c.instl_eml1_tx as email_id,m.mrcht_usr_nm as 'lco_id',c.frqncy_id as 'billing_frequency',0 as 'user_arc',0 as 'user_otc',
    c.instl_mndl_id as 'mandal_id',o.olt_vndr_id as 'oem',c.aghra_cd as 'aghracode',c.onu_srl_nu as 'onu_serial_no',c.apsfl_bbnl
	,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx
     from caf_dtl_t as c
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
	#join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
    join olt_lst_t as o on o.olt_id=c.olt_id and o.a_in=1
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=c.lmo_agnt_id
    where c.caf_type_id=2 and date(c.i_ts)=curdate()-interval 1 day;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : ActiveLmoDtlsDataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 14/11/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.ActiveLmoDtlsDataMdl = function (id) {
    var fnm = "ActiveLmoDtlsDataMdl"
	if(id == 1){
		var QRY_TO_EXEC = `select a.agnt_id as lco_id,a.agnt_nm as lco_network_name,a.ofce_cntct_nm as lco_name,agnt_cd as lco_username,agnt_cd as lco_code,
		a.ofce_dstrt_id as lco_district,a.ofce_mndl_id as lco_mandal,a.ofce_eml_tx as lco_email,a.ofce_mbl_nu as lco_mobile,
		a.brnch_mbl_nu as lco_phone,ofce_addr1_tx as lco_street1,ofce_addr2_tx as lco_street2,ofce_ara_nm as lco_landmark,
		ofce_lclty_nm as lco_city,ofce_ste_id as lco_state,ofce_pn_cd as lco_pincode,m.a_in as lco_status,
		date_format(onbrd_ts,'%d-%m-%Y') as lco_onboard_date,date_format(a.i_ts,'%d-%m-%Y') as its
		 from mrcht_usr_lst_t as m
		join agnt_lst_t as a on a.agnt_id=m.usr_ctgry_ky and mrcht_usr_nm like 'LMO%'
		where m.a_in = 1;`;
	} else {
		var QRY_TO_EXEC = `select a.agnt_id as lco_id,a.agnt_nm as lco_network_name,a.ofce_cntct_nm as lco_name,agnt_cd as lco_username,agnt_cd as lco_code,
		a.ofce_dstrt_id as lco_district,a.ofce_mndl_id as lco_mandal,a.ofce_eml_tx as lco_email,a.ofce_mbl_nu as lco_mobile,
		a.brnch_mbl_nu as lco_phone,ofce_addr1_tx as lco_street1,ofce_addr2_tx as lco_street2,ofce_ara_nm as lco_landmark,
		ofce_lclty_nm as lco_city,ofce_ste_id as lco_state,ofce_pn_cd as lco_pincode,m.a_in as lco_status,
		date_format(onbrd_ts,'%d-%m-%Y') as lco_onboard_date,date_format(a.i_ts,'%d-%m-%Y') as its
		 from mrcht_usr_lst_t as m
		join agnt_lst_t as a on a.agnt_id=m.usr_ctgry_ky and mrcht_usr_nm like 'LMO%'
		where m.a_in = 1 and date(a.i_ts)=curdate()-interval 1 day;`;
	}
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {},fnm);
};

/*****************************************************************************
* Function       : timebasedOltDataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/11/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.timebasedOltDataMdl = function (mints,user) {
    var fnm = "timebasedOltDataMdl"

	var QRY_TO_EXEC = `select o.i_ts,o.olt_nm as 'OLT_Name',o.olt_ip_addr_tx as 'OLT_IP',o.Gp_code as 'GP_Code',o.Latitude as 'LAT',o.Longitude as 'LANG',
o.Lgd_code as 'LGD_Code',o.olt_srl_nu as 'OLT_Serial_No',s.sbstn_nm as 'Pop_Name',s.dstrct_id,d.dstrt_nm,s.mndl_id,m.mndl_nm,o.olt_vndr_id,o.apsfl_bbnl from olt_lst_t as o 
join sbstn_lst_t as s on s.sbstn_id=o.sbstn_id
join dstrt_lst_t as d on d.dstrt_id=s.dstrct_id
join mndl_lst_t as m on m.dstrt_id=s.dstrct_id and (m.mndl_id=s.mndl_id or m.mndl_nu=s.mndl_id)
where o.i_ts between now() - interval ${mints} minute and now()  and o.a_in=1 order by o.i_ts desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {},fnm);
};

/*****************************************************************************
* Function       : yesterdaycafinsertMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/11/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.yesterdaycafinsertMdl = function (mints,user) {
    var fnm = "yesterdaycafinsertMdl"

	var QRY_TO_EXEC = `select * from caf_dtl_t where date(i_ts)=curdate() - interval 1 day`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {},fnm);
};