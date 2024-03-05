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
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafinfoappMdl = function (data) {
	
	var QRY_TO_EXEC = `select c.*,c.caf_id as stb_id,p.pckge_nm,e.agnt_cd,e.agnt_cd as rmso_code,e.agnt_nm as emp_first_name,e.ofce_mbl_nu as emp_mobile_no from caf_dtl_t c 
	left join pckge_lst_t p ON c.crnt_pln_id=p.pckge_id 
	join agnt_lst_t e ON c.lmo_agnt_id=e.agnt_id 
	where c.caf_id='${data.caf_id}'`;
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcafhsidtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 05/08/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafhsidtlsappMdl = function (data) {
	
	var year =new Date().getFullYear();
	//var year =2020;
	var month =new Date().getMonth()+1;
	//var month =8;

	var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) yr_ct,mnt_ct,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,
						ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,mnth_usge_lmt_ct
                        from hsi_mnthly_usge_dtl_t
                        WHERE caf_id= '${data.caf_id}' and yr_ct = '${year}' and mnt_ct='${month}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getbusnesinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getbusnesinfoappMdl = function (data) {

	var QRY_TO_EXEC = `select * from prepaid_business_information`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcompcatappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcompcatappMdl = function (data) {

	var QRY_TO_EXEC = `SELECT * FROM prepaid_complaint_prefer`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrcmplntappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrcmplntappMdl = function (data) {

	var QRY_TO_EXEC = `SELECT prepaid_create_complaint.*,DATE_FORMAT(prepaid_create_complaint.created_date,'%d-%m-%Y %H:%i:%S') as created_date_time,cu.cstmr_nm as first_name,cu.lst_nm,cu.cntct_mble1_nu,cf.caf_id,
	cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,cf.caf_nu,cf.mbl_nu,
	(select category from prepaid_complaint_prefer where id=prepaid_create_complaint.comp_cat) as comp_cat_name FROM prepaid_create_complaint JOIN caf_dtl_t cf ON prepaid_create_complaint.caf_id=cf.caf_id join cstmr_dtl_t as cu on cu.cstmr_id=cf.cstmr_id
	where cf.caf_id ='${data.caf_id}' ORDER BY prepaid_create_complaint.created_date DESC`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrcmplntaddappMdl = function (data) {

var QRY_TO_EXEC = `select * from caf_dtl_t where caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcntcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcntcstmrcmplntaddappMdl = function () {

var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.insrtcstmrcmplntaddappMdl = function (count, data, result, ticketNo, emp_id, user) {

var QRY_TO_EXEC = `INSERT INTO prepaid_create_complaint(complaint_id, caf_id, comp_priority, comp_ticketno, comp_cat, complaint, comp_status, created_by, created_date, last_edited_by, edited_on, comp_remarks,complaint_owner,complaint_assigned_to,comp_ticket_type,comp_source) VALUES ('${count}','${data.caf_id}','1','${ticketNo}','${data.comp_cat}','${data.complaint}',1,'Self Assign',CURRENT_TIMESTAMP(),0,CURRENT_TIMESTAMP(),'N/A',1,17,'Customer Complaints','App')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrpaymntsdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpaymntsdtlsappMdl = function (data) {

	var QRY_TO_EXEC = `select amt as 'amount',descr as 'remarks',discriminator as 'type',DATE_FORMAT(i_ts,'%d-%m-%Y %H:%i:%S') as dateCreated,pckge_names as 'packages_names' from sub_alacarte_transaction where caf_id='${data.caf_id}' order by i_ts DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updtcstmrupdtdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.updtcstmrupdtdtlsappMdl = function (data) {
    
	var QRY_TO_EXEC = `UPDATE cstmr_dtl_t SET blng_cntct_mble1_nu='${data.mobile_no}',cntct_mble1_nu='${data.mobile_no}' WHERE cstmr_id='${data.cstmr_id}';
	UPDATE caf_dtl_t set mbl_nu='${data.mobile_no}' where cstmr_id='${data.cstmr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrntfcstnlstappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrntfcstnlstappMdl = function (data) {

	var QRY_TO_EXEC = `SELECT category,message, DATE_FORMAT(dateCreated,'%d-%m-%Y %H:%i:%S') as dateCreated from prepaid_notification_log where caf_id='${data.caf_id}' ORDER BY id DESC LIMIT 20`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrpckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesappMdl = function (data) {

	var QRY_TO_EXEC = `select c.lmo_agnt_id,c.caf_id as stb_id from caf_dtl_t c where c.caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrpckgesjoinappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesjoinappMdl = function (data) {

	//var QRY_TO_EXEC = `select GROUP_CONCAT(p.pckge_id) as pack_ids from prepaid_customer_alacarte ca LEFT JOIN pckge_lst_t p ON ca.pack_id=p.pckge_id where ca.caf_id = '${data.caf_id}' AND ca.pack_id!='' AND p.pckge_id!=''`;
	var QRY_TO_EXEC = `SELECT GROUP_CONCAT(distinct(p.pckge_id)) as packge_id
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrjoinpckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrjoinpckgesappMdl = function (pack_ids) {
	
	console.log("in mdl pack_ids", pack_ids);
	if(pack_ids==''){
		pack_ids=0;
	}

	var QRY_TO_EXEC = `select p.pckge_type_id as cat_id,p.pckge_id as package_id,p.pckge_nm as package_name,p.pckge_dscn_tx,p.chrge_at as cust_price,p.chrge_at as lco_price,p.gst_at as pack_tax,(p.chrge_at+p.gst_at) as ttl_cst,p.i_ts as created_at,1 as op_status from pckge_lst_t p where p.a_in=1 AND p.pckge_id!='' AND p.pckge_id NOT IN (${pack_ids}) and p.caf_type_id=1 and p.oprtn_in=1 AND p.glbl_in=1 ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrjoinalacartepckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrjoinalacartepckgesappMdl = function (pack_ids) {

	var QRY_TO_EXEC = `SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,p.pckge_id as package_id,
    2 as cat_id,
    p.pckge_nm as package_name, p1.chrge_at as cust_price,p1.chrge_at as lco_price, p1.gst_at as pack_tax, 
    ((CASE WHEN FORMAT(p1.chrge_at,2) is NOT NULL THEN p1.chrge_at  ELSE 0 END) +
    (CASE WHEN FORMAT(p1.gst_at,2) is NOT NULL THEN p1.gst_at  ELSE 0 END)) as ttl_cst
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id 
    JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt 
    AND p.a_in = 1 AND spl.a_in = 1 
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcstmrpckgesdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesdtlsappMdl = function (pack_ids) {
	console.log("pack_ids",pack_ids);
	var trnfpt ;
	var tps = [];
	if(pack_ids==''){
		pack_ids=0;
		tps =0;
		trnfpt =0;
	} else {
		parseInt(pack_ids);
		trnfpt = pack_ids.split(",");
		console.log("trnfpt",trnfpt);
		trnfpt.forEach((t) => {
			console.log("t",t);
			tps.push(parseInt(t));
			console.log("tps in push", tps[0]);
		});
	}
	console.log("tps out of the loop", tps);
	console.log("trnfpt out of the loop",trnfpt);
	var QRY_TO_EXEC = `select p.pckge_id as package_id,p.pckge_nm as package_name,p.chrge_at as cust_price,p.chrge_at as lco_price,p.pckge_type_id as cat_id,
    p.gst_at as pack_tax,(p.chrge_at+p.gst_at) as ttl_cst9,p.i_ts as created_at,1 as op_status,p.pckge_dscn_tx ,
     (CASE WHEN p.pckge_type_id =1 THEN p.chrge_at ELSE FORMAT(p1.chrge_at,2) END) AS tot_chrge9,
     (CASE WHEN p.pckge_type_id =1 THEN p.gst_at ELSE FORMAT(p1.gst_at,2) END) AS tot_gst_at9,
     (CASE WHEN p.pckge_type_id =1 THEN (p.chrge_at+p.gst_at) ELSE FORMAT(p1.chrge_at+p1.gst_at,2) END) AS ttl_cst
    from pckge_lst_t p 
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    where p.pckge_id IN (${tps}) group by p.pckge_nm;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getsbscrcafHsiDtlsMdl = (id, yr) => {
	console.log("in hsi id year", id, yr);
    if (yr) {
        var year = `and yr_ct = ${yr}`;
    }
    else {
        var year = ``;
    }
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
                        WHERE caf_id= ${id} ${year}
                        GROUP BY mnt_ct
                        ORDER BY mnt_ct `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls);

}

/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getsbscrcafVoipDtlsMdl = (id, yr) => {
	console.log("in hsi id year", id, yr);
    if (yr) {
        var year = `and call_yr = ${yr}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER (ORDER BY v.call_yr,v.call_mm) as s_no,vp.phne_nu,v.*,SUM(v.std_chrge_at + v.isd_chrge_at+v.lcl_chrge_at) as total from voip_caf_phne_chrges_dtl_t v
                        JOIN voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id = v.phne_nmbr_id
                        where caf_id = ${id} ${year}
                        GROUP BY v.call_mm
                        ORDER BY v.call_yr,v.call_mm;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}


/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvcepckgesappMdl = (data) => {
    var year =new Date().getFullYear();
    var month =new Date().getMonth();
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,
	c.caf_id, DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_dt, cd.cstmr_nm,d.dstrt_nm
    ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth,DATE_FORMAT(i.de_dt,'%d-%m-%Y') as due_date
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_dt,'%d-%m-%Y') as invce_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2) as base_price ,format(i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tax_at
    ,format(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    ,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment_Status'
    ,i.spnd_dy_ct as SuspendDays,i.actve_dy_ct,(i.actve_dy_ct-i.spnd_dy_ct) as ActiveDays,
    p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
    ,format(id.chrge_at,2) as chrge_at,format(id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tax_at2
    ,format(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tl_at2 
    from erp_invce_lst_t i
    join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    join erp_invce_dtl_t id on id.caf_invce_id = i.caf_invce_id
    JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
	join caf_dtl_t as c on c.caf_id=i.caf_id
	 JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id 
	join cstmr_dtl_t as cd on cd.cstmr_id=c.cstmr_id and cd.a_in=1
    WHERE i.pblsd_in=1 AND i.caf_id = ${data.caf_id} and i.invce_yr=${year} and i.invce_mm=${month}
    ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


/*****************************************************************************
* Function      : getcstmrinvcedtlsfrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvcedtlsfrappMdl = (data) => {
    if (data.year_n) {
        var year = `and invce_yr = ${data.year_n}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
    ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,
    (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    ,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment_Status'
    from erp_invce_lst_t i
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
        WHERE i.pblsd_in=1 AND i.caf_id = ${data.caf_id} ${year}
        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


/*****************************************************************************
* Function      : getcstmrinvceaddonsdtlsfrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvceaddonsdtlsfrappMdl = (data) => {
    if (data.year_n) {
        var year = `and invce_yr = ${data.year_n}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
where id.caf_invce_id=${data.caf_invoice_id} ${year}
        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


/*****************************************************************************
* Function      : getcstmrmnthwiseinvcepckgesappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrmnthwiseinvcepckgesappMdl = (caf_id, year, month) => {
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,
	c.caf_id, DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_dt, cd.cstmr_nm,c.mbl_nu as cstmr_mble_nu,vps.phne_nu as phne_nu,d.dstrt_nm
    ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth,DATE_FORMAT(i.de_dt,'%d-%m-%Y') as due_date
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_dt,'%d-%m-%Y') as invce_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2) as base_price ,format(i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tax_at
    ,format(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    ,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment_Status'
    ,i.spnd_dy_ct as SuspendDays,i.actve_dy_ct,(i.actve_dy_ct-i.spnd_dy_ct) as ActiveDays,
    p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
    ,format(id.chrge_at,2) as chrge_at,format(id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tax_at2
    ,format(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tl_at2,ROUND(h.ttl_dwnld_ct/1024/1024/1024)  as DOWNLOAD_IN_GB,ROUND(h.ttl_upld_ct/1024/1024/1024) as UPLOAD_IN_GB,ROUND(h.ttl_dwnld_ct/1024/1024/1024,2) + ROUND(h.ttl_upld_ct/1024/1024/1024,2) as TOTAL_IN_GB
    from erp_invce_lst_t i
    join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    join erp_invce_dtl_t id on id.caf_invce_id = i.caf_invce_id
    JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
	join caf_dtl_t as c on c.caf_id=i.caf_id
	JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id 
	join cstmr_dtl_t as cd on cd.cstmr_id=c.cstmr_id and cd.a_in=1
	LEFT JOIN BSS_BATCH.hsi_mnthly_usge_dtl_t h ON h.caf_id=c.caf_id AND i.invce_yr=h.yr_ct AND i.invce_mm=h.mnt_ct
	LEFT JOIN voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id and vp.a_in = 1
	LEFT JOIN voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    WHERE i.pblsd_in=1 AND i.caf_id = ${caf_id} and i.invce_yr=${year} and i.invce_mm=${month}
    ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : occinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occinsrtnewcmplntMdl = function (data, ticketNo, user) {
    console.log("data in mdl", data)
    var tcktyp = ` `;
    var srvcrqst = ` `;
    var cmpltctgry = ` `;
    var cnllst = ` `;
    var plnaugrd = ` `;
    var plndngrd = ` `;
    var slcmonr = ` `;
    var cmplrmk = ` `;
    var assslcmonr = ` `;
    var cmpimg = ``;
	var altrmble = ``;
    if(data.tickettype != '' && data.tickettype != undefined){
        tcktyp = `comp_ticket_type = '${data.tickettype}',`
    }

    if(data.servicerequest != '' && data.servicerequest != undefined ) {
        srvcrqst = `comp_request_service='${data.servicerequest}',comp_cat='24',`
    }
    if(data.complaintcategory != '' && data.complaintcategory != undefined) {
        cmpltctgry = `comp_cat='${data.complaintcategory}',`
    }
    if(data.channellist != '' && data.channellist != undefined ) {
        cnllst = `comp_channel_list='${data.channellist}',`
    }
    if(data.upgradpackage != '' && data.upgradpackage != undefined){
        plnaugrd = `comp_package_upgrade='${data.upgradpackage}',`
    }
    if(data.plandowngradation != '' && data.plandowngradation != undefined){
        plndngrd = `comp_package_downgrade='${data.plandowngradation}',`
    }
    if(data.selectcomplaintowner != '' && data.selectcomplaintowner != undefined){
        slcmonr = `complaint_owner='${data.selectcomplaintowner}',`
    }
    if(data.assignedemployee != '' && data.assignedemployee != undefined){
        assslcmonr = `complaint_assigned_to='${data.assignedemployee}',`
    }
	if(data.alternate_mobile != '' && data.alternate_mobile != undefined){
        altrmble = `alternate_mobile='${data.alternate_mobile}',`
    }
    if(data.complaintremarks != '' && data.complaintremarks != undefined){
        cmplrmk = `complaint='${data.complaintremarks}',`
    }
    if(data.attachments[0].uploadfile != '' && data.attachments[0].uploadfile != null ){
        cmpimg = `comp_image=1,`
    } else {
        cmpimg = `comp_image=0,`
    }
    
	var QRY_TO_EXEC = `INSERT INTO prepaid_create_complaint set ${cmpimg} ${tcktyp} ${srvcrqst} ${cmpltctgry} ${cnllst} ${altrmble} ${plnaugrd} ${plndngrd} ${slcmonr} ${cmplrmk} ${assslcmonr} caf_id=${data.caf_id},comp_ticketno='${ticketNo}',comp_status=1,comp_priority=${data.priority},created_date=CURRENT_TIMESTAMP(),created_by=${user.mrcht_usr_id},last_edited_by=0,edited_on=0,comp_remarks=0,comp_source='Web'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function      : getcstmrinvceaddonsdtlspckgefrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvceaddonsdtlspckgefrappMdl = (caf_invoice_id, year_n, month) => {

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.caf_type_id,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
where id.caf_invce_id=${caf_invoice_id} and invce_yr = ${year_n}
        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


/*****************************************************************************
* Function       : getcompcatfrappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcompcatfrappMdl = function (data) {

	var QRY_TO_EXEC = `SELECT * FROM prepaid_complaint_prefer where app_type=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : occgetinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occgetinsrtnewcmplntMdl = function (user) {
    var cndtcn = ``;
	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
		cndtcn = ` `;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') `;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
    co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCgetAddOnpackagesMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCgetAddOnpackagesMdl = function () {

	var QRY_TO_EXEC = `SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,chl.chnle_id as package_id,
    2 as cat_id,
    chl.chnle_nm as package_name, p1.chrge_at as cust_price,p1.chrge_at as lco_price, p1.gst_at as pack_tax, 
    ((CASE WHEN FORMAT(p1.chrge_at,2) is NOT NULL THEN p1.chrge_at  ELSE 0 END) +
    (CASE WHEN FORMAT(p1.gst_at,2) is NOT NULL THEN p1.gst_at  ELSE 0 END)) as ttl_cst
    FROM pckge_lst_t p
    left JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    left JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    left JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    left JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id 
    left JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
    left join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt 
    AND p.a_in = 1 AND spl.a_in = 1 
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : OCCgetcmplntdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCgetcmplntdtlsMdl = function (cafid, tckno, user) {


	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  where p.caf_id=${cafid} and p.comp_ticketno='${tckno}'
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCpostcmplntdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCpostcmplntdtlsMdl = function (body, user) {

	var QRY_TO_EXEC = `SELECT * from prepaid_create_complaint where caf_id=${body.caf_id} and comp_ticketno='${body.ticketNo}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueCstmrTypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCstmrTypMdl = function (body, user) {

	var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY complaint_owner_id) sno,
            complaint_owner_id,complaint_owner_name,a_in 
        FROM complaint_owners 
        WHERE a_in = 1 
        ORDER BY complaint_owner_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueCstmrSubTypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCstmrSubTypMdl = function (id, user) {

	var QRY_TO_EXEC = `SELECT A.*,B.open_count,CASE WHEN B.open_count THEN CONCAT(A.complaint_sub_emp_name,'(',B.open_count,')') ELSE CONCAT(A.complaint_sub_emp_name,'(','0',')') END
    as name_count FROM (SELECT complaint_sub_emp_id,complaint_owner_id,complaint_sub_emp_name,emp_active,a_in 
        FROM complaint_sub_employees 
        WHERE a_in = 1 AND complaint_owner_id= ${id}) A LEFT JOIN 
        (select count(*) as open_count,complaint_assigned_to FROM prepaid_create_complaint WHERE comp_status=1 AND complaint_owner= ${id} GROUP BY complaint_assigned_to) B 
        ON A.complaint_sub_emp_id=B.complaint_assigned_to ORDER BY  B.open_count asc; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueAssgnCatMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueAssgnCatMdl = function (data, user) {
    var srvcrqst = ``;
    var cmplntctrgy = ``;
    var chnllst = ``;
    var upgrdpckge = ``;
    var dwngrdpckge = ``;
    var cmplntremrk = ``;
    var cmplntsts = ``;
    var clsedovr = ``;
    var actntken = ``;
    var issuefnd = ``;
    var rslvetime = ``;
    var clsetime = ``;
    console.log("edit assign cmplt req.body : ", data)
    if( data.servicerequest != '' && data.servicerequest != null && data.servicerequest != undefined ){
        srvcrqst = `comp_request_service='${data.servicerequest}',`;
    }
    if( data.complaintcategory != '' &&  data.complaintcategory != null && data.complaintcategory != undefined ){
        cmplntctrgy = `comp_cat=${data.complaintcategory},`;
    }
    if(  data.channellist != '' && data.channellist != null && data.channellist != undefined ){
        chnllst = `comp_channel_list='${data.channellist}',`;
    }
    if( data.upgradpackage != '' &&  data.upgradpackage != null && data.upgradpackage != undefined ){
        upgrdpckge = `comp_package_upgrade=${data.upgradpackage},`;
    }
    if(  data.plandowngradation != '' && data.plandowngradation != null && data.plandowngradation != undefined ){
        dwngrdpckge = `comp_package_downgrade=${data.plandowngradation},`;
    }
    if(  data.complaintremarks != '' && data.complaintremarks != null && data.complaintremarks != undefined ){
        cmplntremrk = `complaint='${data.complaintremarks}',`; 
    }
    if(  data.complaintstatus != '' && data.complaintstatus != null && data.complaintstatus != undefined ){
        cmplntsts = `comp_status=${data.complaintstatus},`;
    }
    if(  data.closed_over != '' && data.closed_over != null && data.closed_over != undefined ){
        clsedovr = `closed_over=${data.closed_over},`;
    }
    if(  data.action_taken != '' && data.action_taken != null && data.action_taken != undefined ){
        actntken = `action_taken='${data.action_taken}',`;
    }
    if(  data.issue_found != '' && data.issue_found != null && data.issue_found != undefined ){
        issuefnd = `issue_found='${data.issue_found}',`;
    }
    if( data.complaintstatus == 2 ){
        rslvetime = `comp_resolved_time=CURRENT_TIMESTAMP(),`
    } else if ( data.complaintstatus == 3 ) {
        clsetime = `comp_closed_time=CURRENT_TIMESTAMP(),`
    }

	var QRY_TO_EXEC = ` update prepaid_create_complaint set ${srvcrqst} ${cmplntctrgy} ${chnllst} ${upgrdpckge} ${dwngrdpckge} ${cmplntremrk} ${cmplntsts} ${clsedovr} ${actntken} ${issuefnd} ${rslvetime} ${clsetime} comp_priority='${data.priority}',complaint_owner='${data.selectcomplaintowner}',complaint_assigned_to='${data.assignedemployee}',edited_on=CURRENT_TIMESTAMP() where caf_id=${data.cafid} and comp_ticketno='${data.ticketnumber}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryMdl = function (id, user) {
    var cndtcn = ``;
    if(id == 0){
        cndtcn = ` `;
    } else if (id == 1){
        cndtcn = ` where p.complaint_owner = 1`;
    } else if (id == 2){
        cndtcn = ` where p.complaint_owner = 2`;
    } else if (id == 3){
        cndtcn = ` where p.complaint_owner = 3`;
    } else if (id == 4){
        cndtcn = ` where p.complaint_owner = 4`;
    } else if (id == 5){
        cndtcn = ` where p.complaint_owner = 5`;
    }
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryOpenMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryOpenMdl = function (id, user) {
    var cndtcn = ``;
    /*if(id == 0){
        cndtcn = ` where p.comp_status=1 `;
    } else if (id == 1){
        cndtcn = ` where cse.mrcht_usr_id=${user.mrcht_usr_id} and p.complaint_owner = 1 and p.comp_status=1`;
    } else if (id == 2){
        cndtcn = ` where cse.mrcht_usr_id=${user.mrcht_usr_id} and p.complaint_owner = 2 and p.comp_status=1`;
    } else if (id == 3){
        cndtcn = ` where cse.mrcht_usr_id=${user.mrcht_usr_id} and p.complaint_owner = 3 and p.comp_status=1`;
    } else if (id == 4){
        cndtcn = ` where cse.mrcht_usr_id=${user.mrcht_usr_id} and p.complaint_owner = 4 and p.comp_status=1`;
    } else if (id == 5){
        cndtcn = ` where p.complaint_owner = 5 and p.comp_status=1`;
    }*/
	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
		cndtcn = ` where  p.comp_status=1`;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and p.comp_status=1`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
   ${cndtcn}
  order by p.created_date desc `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryCloseMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryCloseMdl = function (id, user) {
    var cndtcn = ``;
    /*if(id == 0){
        cndtcn = `where p.comp_status=3 `;
    } else if (id == 1){
        cndtcn = ` where p.complaint_owner = 1 and p.comp_status=3`;
    } else if (id == 2){
        cndtcn = ` where p.complaint_owner = 2 and p.comp_status=3`;
    } else if (id == 3){
        cndtcn = ` where p.complaint_owner = 3 and p.comp_status=3`;
    } else if (id == 4){
        cndtcn = ` where p.complaint_owner = 4 and p.comp_status=3`;
    } else if (id == 5){
        cndtcn = ` where p.complaint_owner = 5  and p.comp_status=3`;
    }*/
	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
		cndtcn = ` where  p.comp_status=3`;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and p.comp_status=3`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryResolveMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryResolveMdl = function (id, user) {
    var cndtcn = ``;
    /*if(id == 0){
        cndtcn = ` where p.comp_status=2 `;
    } else if (id == 1){
        cndtcn = ` where p.complaint_owner = 1 and p.comp_status=2`;
    } else if (id == 2){
        cndtcn = ` where p.complaint_owner = 2 and p.comp_status=2`;
    } else if (id == 3){
        cndtcn = ` where p.complaint_owner = 3 and p.comp_status=2`;
    } else if (id == 4){
        cndtcn = ` where p.complaint_owner = 4 and p.comp_status=2`;
    } else if (id == 5){
        cndtcn = ` where p.complaint_owner = 5 and p.comp_status=2`;
    }*/
	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
		cndtcn = ` where  p.comp_status=2`;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and p.comp_status=2`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc  `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueCountByCatgryResolveMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 15/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCountByCatgryResolveMdl = function (id, user) {
    var cndtcn = ``;
    if(id == 0){
		if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
			cndtcn = ` `;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}') `;
		}
    } else if (id == 1){
		if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
			cndtcn = ` where p.comp_status=1`;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=1`;
		}
    } else if (id == 2){
        if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
			cndtcn = ` where p.comp_status=2`;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=2`;
		}
    } else if (id == 3){
        if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mnu_prfle_id == 8 ) {
			cndtcn = ` where p.comp_status=3`;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=3`;
		}
    } 
	var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint as p 
						left join complaint_sub_employees as c on c.complaint_sub_emp_id=p.complaint_assigned_to
						${cndtcn}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getcmplntforlogsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
********cls**********************************************************************/
exports.getcmplntforlogsappMdl = function (data, user) {

	var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_ticketno='${data.ticketnumber}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcmplntforlogappMdl = function (ticktno, user) {

	var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_ticketno='${ticktno}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.insrtcmplntlogappMdl = function (data, user) {
    var empid = 0;
    if(user.mrcht_usr_id){
        empid=user.mrcht_usr_id;
    }
	var QRY_TO_EXEC = `insert into complaint_log (complaint_id,comp_status,comments,emp_id,cl_date_created) 
    values ('${data.complaint_id}','${data.comp_status}','${data.complaint}','${empid}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueTicktMdl = function (data, user) {

	var QRY_TO_EXEC = `select c.*,DATE_FORMAT(c.cl_date_created,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,p.comp_ticketno,p.caf_id,
    CASE WHEN c.comp_status=1 then 'Open' 
        WHEN c.comp_status=2 then 'Resolved'
        when c.comp_status=3 then 'Close'  end as comp_stas ,
        (CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name
     from complaint_log as c 
        join  prepaid_create_complaint as p on p.complaint_id=c.complaint_id 
        left join mrcht_usr_lst_t as m on m.mrcht_usr_id=c.emp_id
        left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
        where c.complaint_id=${data}
        order by cl_id desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : CheckZipFileMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.CheckZipFileMdl = function (data, user) {

	var QRY_TO_EXEC = `select caf_id from caf_dtl_t where crnt_pln_id=${data.custype} and instl_dstrct_id=${data.district} and trmnd_in not in (1) `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : OCCIssueCountByCatgrytypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCountByCatgrytypMdl = function (data, user) {

	var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueCatgrygenralenqryMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCatgrygenralenqryMdl = function (data, user) {
    var vlg = ` `;
    var email = ` `;
    if(data.village != null && data.village != '' ){
        vlg = `,village='${data.village}'`
    }
    if(data.email != null && data.email != '' ){
        email = `,email_id='${data.email}'`
    }
	if(data.ticket_type == 1 ){
        tckttyp = `,tckt_typ=1`
    } else if (data.ticket_type == 2 ) {
        tckttyp = `,tckt_typ=2`
    }

	var QRY_TO_EXEC = `insert into general_enquiries set Ticket_no='${ticketNo}',first_name='${data.name}',mobile_no='${data.mobile}',district='${data.district}',mandal='${data.mandal}',pincode='${data.pincode}',manager='${data.dst_manager}',description='${data.description}',created_by='${data.mrcnt_id}',a_in=1,i_ts=CURRENT_TIMESTAMP() ${vlg} ${tckttyp} ${email}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueDstrtMngrMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueDstrtMngrMdl = function ( user) {

	var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY d.dstrt_id)as sno,d.ste_id,d.dstrt_id ,d.dstrt_nm,s.ste_nm
    from dstrt_lst_t as d 
    JOIN ste_lst_t as s on s.ste_id = d.ste_id 
    WHERE d.a_in=1 and d.ste_id=1
    ORDER BY d.dstrt_nm ASC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : OCCIssueDstrtMngrIdMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueDstrtMngrIdMdl = function (id, user) {

	var QRY_TO_EXEC = `select c.mble1_ph as netwrk_mbl_nu, c.cntct_nm as netwrk_manager_nm,
    c1.mble1_ph as sales_mbl_nu, c1.cntct_nm as sales_manager_nm  from  cntct_lst_t as c
join cntct_lst_t as c1 on c.dstrct_id = c1.dstrct_id AND c1.cntct_ctgry_id=2
  where c.dstrct_id=${id} and c.cntct_ctgry_id=1;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : OCCIssuegetGnrlenqrymdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssuegetGnrlenqrymdl = function (id, user) {

	var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY g.i_ts desc) sno,
    CASE WHEN g.tckt_typ=1 then 'New Connection' 
    WHEN g.tckt_typ=2 then 'Call Drop' end as tckt_name
    ,g.*,DATE_FORMAT(g.i_ts ,'%d-%m-%Y %H:%i:%S') as created_on,
    DATE_FORMAT(g.i_ts ,'%d-%m-%Y') as created_date,d.dstrt_nm,
    c.mble1_ph as netwrk_mbl_nu, c.cntct_nm as netwrk_manager_nm,
    c1.mble1_ph as sales_mbl_nu, c1.cntct_nm as sales_manager_nm,
    m.mrcht_usr_nm as 'merchant_name'
    from general_enquiries as g 
    left join dstrt_lst_t as d on d.dstrt_id=g.district
    left join mrcht_usr_lst_t as m on m.mrcht_usr_id=g.created_by
    left join cntct_lst_t as c on d.dstrt_id = c.dstrct_id AND c.cntct_ctgry_id=1
    left join cntct_lst_t as c1 on d.dstrt_id = c1.dstrct_id AND c1.cntct_ctgry_id=2 order by i_ts desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selefAsgnTcktsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.selefAsgnTcktsMdl = function (user) {

	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,co.complaint_owner_name as cmplnt_owner,
    (CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
    (CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
   where (p.created_by ='${user.mrcht_usr_id}') 
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selefAsgnTcktsCntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.selefAsgnTcktsCntMdl = function (user) {

	var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint as p where p.created_by ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : toggleButtonResMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 08/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.toggleButtonResMdl = function (data, user) {
    var tgle = ` `;
    console.log("data",data);
    if(data.toggle == true){
        tgle = ` emp_active=1, last_active_time=CURRENT_TIMESTAMP() `
    } else if(data.toggle == false) {
        tgle = ` emp_active=0, last_inactive_time=CURRENT_TIMESTAMP() `
    }
	var QRY_TO_EXEC = `update complaint_sub_employees set ${tgle} where mrcht_usr_id ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : toggleButtonValueMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.toggleButtonValueMdl = function (user) {
	var QRY_TO_EXEC = `select emp_active from complaint_sub_employees where mrcht_usr_id ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : sprtTicktCafDtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.sprtTicktCafDtlsMdl = function (data, user) {
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN comp_status=1 then 'Open' 
    WHEN comp_status=2 then 'Resolved'
    when comp_status=3 then 'Close'  end as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  where p.caf_id=${data.cafid}
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - durga - Initial Function
******************************************************************************/
exports.insertsubalacarteMdl = function(data, user,callback){
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO sub_alacarte_transaction(package_ids,pckge_names, trns_mrchant_id, mdlw_sbscr_id, caf_id,i_ts) VALUES ('${data.package_ids}','${data.packages_names}','${data.trns_mrchant_id}','${data.mdlw_sbscr_id}','${data.caf_id}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insertMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/12/2021   - Durga - Initial Function
******************************************************************************/

exports.updatealacartedataMdl = function (data, user) {
    date = ``;
    CardNumber = ``;
    surcharge = ``;
    clientcode = ``;
    udf15 = ``;
    udf14 = ``;
    signature = ``;
    udf13 = ``;
    udf12 = ``;
    udf11 = ``;
    amt = ``;
    udf10 = ``;
    merchant_id = ``;
    mer_txn = ``;
    f_code = ``;
    bank_txn = ``;
    udf9 = ``;
    ipg_txn_id = ``;
    bank_name = ``;
    prod = ``;
    mmp_txn = ``;
    udf5 = ``;
    udf6 = ``;
    udf3 = ``;
    udf4 = ``;
    udf2 = ``;
    udf1 = ``;
    discriminator = ``;
    auth_code = ``;
    desc = ``;
	var descamnt = data.desc +' Amount : ' +data.amt;

    if (data.date != null && data.date != '' && data.date != undefined) {
        date = `,date ='${data.date}'`
    }
    if (data.CardNumber != null && data.CardNumber != '' && data.CardNumber != undefined) {
        CardNumber = `,CardNumber ='${data.CardNumber}'`
    }
    if (data.surcharge != null && data.surcharge != '' && data.surcharge != undefined) {
        surcharge = `,surcharge ='${data.surcharge}'`
    }
    if (data.clientcode != null && data.clientcode != '' && data.clientcode != undefined) {
        clientcode = `,clientcode ='${data.clientcode}'`
    }
    if (data.udf15 != null && data.udf15 != '' && data.udf15 != undefined) {
        udf15 = `,udf15 ='${data.udf15}'`
    }
    if (data.udf14 != null && data.udf14 != '' && data.udf14 != undefined) {
        udf14 = `,udf14 ='${data.udf14}'`
    }
    if (data.signature != null && data.signature != '' && data.signature != undefined) {
        signature = `,signature ='${data.signature}'`
    }
    if (data.udf13 != null && data.udf13 != '' && data.udf13 != undefined) {
        udf13 = `,udf13 ='${data.udf13}'`
    }
    if (data.udf12 != null && data.udf12 != '' && data.udf12 != undefined) {
        udf12 = `,udf12 ='${data.udf12}'`
    }
    if (data.udf11 != null && data.udf11 != '' && data.udf11 != undefined) {
        udf11 = `,udf11 ='${data.udf11}'`
    }
    if (data.amt != null && data.amt != '' && data.amt != undefined) {
        amt = `,amt ='${data.amt}'`
    }
    if (data.udf10 != null && data.udf10 != '' && data.udf10 != undefined) {
        udf10 = `,udf10 ='${data.udf10}'`
    }
    if (data.merchant_id != null && data.merchant_id != '' && data.merchant_id != undefined) {
        merchant_id = `,merchant_id ='${data.merchant_id}'`
    }
    if (data.mer_txn != null && data.mer_txn != '' && data.mer_txn != undefined) {
        mer_txn = `,mer_txn ='${data.mer_txn}'`
    }
    if (data.f_code != null && data.f_code != '' && data.f_code != undefined) {
        f_code = `,f_code ='${data.f_code}'`
    }
    if (data.bank_txn != null && data.bank_txn != '' && data.bank_txn != undefined) {
        bank_txn = `,bank_txn ='${data.bank_txn}'`
    }
    if (data.udf9 != null && data.udf9 != '' && data.udf9 != undefined) {
        udf9 = `,udf9 ='${data.udf9}'`
    }
    if (data.ipg_txn_id != null && data.ipg_txn_id != '' && data.ipg_txn_id != undefined) {
        ipg_txn_id = `,ipg_txn_id ='${data.ipg_txn_id}'`
    }
    if (data.bank_name != null && data.bank_name != '' && data.bank_name != undefined) {
        bank_name = `,bank_name ='${data.bank_name}'`
    }
    if (data.prod != null && data.prod != '' && data.prod != undefined) {
        prod = `,prod ='${data.prod}'`
    }
    if (data.mmp_txn != null && data.mmp_txn != '' && data.mmp_txn != undefined) {
        mmp_txn = `,mmp_txn ='${data.mmp_txn}'`
    }
    if (data.udf5 != null && data.udf5 != '' && data.udf5 != undefined) {
        udf5 = `,udf5 ='${data.udf5}'`
    }
    if (data.udf6 != null && data.udf6 != '' && data.udf6 != undefined) {
        udf6 = `,udf6 ='${data.udf6}'`
    }
    if (data.udf3 != null && data.udf3 != '' && data.udf3 != undefined) {
        udf3 = `,udf3 ='${data.udf3}'`
    }
    if (data.udf4 != null && data.udf4 != '' && data.udf4 != undefined) {
        udf4 = `,udf4 ='${data.udf4}'`
    }
    if (data.udf1 != null && data.udf1 != '' && data.udf1 != undefined) {
        udf1 = `,udf1 ='${data.udf1}'`
    }
    if (data.udf2 != null && data.udf2 != '' && data.udf2 != undefined) {
        udf2 = `,udf2 ='${data.udf2}'`
    }
    if (data.discriminator != null && data.discriminator != '' && data.discriminator != undefined) {
        discriminator = `,discriminator ='${data.discriminator}'`
    }
    if (data.auth_code != null && data.auth_code != '' && data.auth_code != undefined) {
        auth_code = `,auth_code ='${data.auth_code}'`
    }

    var QRY_TO_EXEC = `update sub_alacarte_transaction set descr ='${data.desc}' ${date} ${CardNumber} ${surcharge} ${clientcode} ${udf15} ${udf14} ${signature} ${udf13} ${udf12}
     ${udf11} ${udf10} ${amt} ${merchant_id} ${mer_txn} ${f_code} ${bank_txn} ${bank_txn} ${udf9} ${ipg_txn_id}
     ${bank_name} ${prod} ${mmp_txn} ${udf5} ${udf6} ${udf3} ${udf4} ${udf1} ${udf2} ${discriminator} ${auth_code} ,u_ts=CURRENT_TIMESTAMP() where trns_mrchant_id='${data.trns_mrchant_id}' ;
	 insert into prepaid_notification_log set emp_id=0,caf_id=${data.caf_id},message='${descamnt}',dateCreated=CURRENT_TIMESTAMP(),status=1,category='Payments'`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getpackgedatafrapp
* Description    : 
* Arguments      : callback function
* Change History :
* 23/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getpackgedatafrapp = function (data) {

    var QRY_TO_EXEC = `select p.*,DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expiry_dt,DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efect_dt,
    ps.srvcpk_id,p1.chrge_at,p1.gst_at from pckge_lst_t as p
     join pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id where p.pckge_id in (${data.package_ids}) and p.a_in=1;`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    };


/*****************************************************************************
* Function       : sprtTicktCafDtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.addCafInsrtPckgsMdl = function (data, caf_id, type, user) {
    var datenew = new Date(); // Now
    datenew.setDate(datenew.getDate() + 30); // Set now + 30 days as the new date
    datenew = moment(datenew).format('YYYY-MM-DD')
    console.log(datenew);
    console.log("data",data);
	var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,
        cycle_strt_dt,
        cycle_end_dt,
        prpd_in,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,
        sbscrptn_req_in, rjct_in,rjct_ts,rjct_usr_id,aprvl_in,aprvl_ts, aprvl_usr_id, src_id, cmnt_txt,a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.length > 0) {
        var counter = 0;
        data.filter((k) => {
            if (data.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
                ${caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                '${k.efect_dt}',
                '${k.expiry_dt}',
                current_timestamp(),
                '${datenew}',
                1,
                ${k.chrge_at},
                ${k.gst_at},
                0,0,0,0,1,
                ${caf_id},0,0,null,null,1,current_timestamp(),${caf_id},2,'Approval From Subscriber ${type} ${caf_id}',1, CURRENT_TIMESTAMP())  ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____ addCafInsrtPckgsMdl from subscriber App  ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : addCaffailedInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedInsrtPckgsMdl = function(data, body, ext_json, api_response, user,callback){
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (package_ids, ext_json, trns_mrchant_id, mdlw_sbscr_id, caf_id, status, status_code, err_msg, i_ts) VALUES ('${body.package_ids}','${JSON.stringify(ext_json)}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}',0,'${api_response.statusCode}','${api_response.statusMessage}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : checksubalacartedataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 02/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.checksubalacartedataMdl = function(data, user){

    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t where a_in=1 and caf_id=${data.caf_id} and pckge_id in (${data.package_ids})`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updatesbscrPassMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 06/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.updatesbscrPassMdl = function (data,user) {

    var QRY_TO_EXEC = `update caf_dtl_t set pwd_encrd_tx=MD5(1234567890) where caf_id=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};