	var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var FCM = require('fcm-node');
var dbutil = require(appRoot + '/utils/db.utils');



/*****************************************************************************
* Function       : getcafinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafinfoappMdl = function (data) {
	var fnm = "getcafinfoappMdl" 
	var QRY_TO_EXEC = `select c.*,date_format(cp.cycle_end_dt,'%d-%m-%Y') as cycle_end_dt,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as cycle_strt_dt,cs.blng_eml1_tx,cs.loc_eml1_tx,c.caf_id as stb_id,p.pckge_nm,e.agnt_cd,e.agnt_cd as rmso_code,e.agnt_nm as emp_first_name,e.ofce_mbl_nu as emp_mobile_no,e.prpd_flag from caf_dtl_t c 
	    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id and c.crnt_pln_id=cp.pckge_id  and cp.a_in=1
    join cstmr_dtl_t cs on cs.cstmr_id=c.cstmr_id
	left join pckge_lst_t p ON c.crnt_pln_id=p.pckge_id 
	join agnt_lst_t e ON c.lmo_agnt_id=e.agnt_id 
	where c.caf_id='${data.caf_id}'`;
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : OCCIssueCcCatgrybyCaftypeMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/06/2023    -  Ramesh Patlola - Initial Function
******************************************************************************/
exports.OCCIssueCcCatgrybyCaftypeMdl = function (data,cc_occ, cafId, user) {
    var fnm = "OCCIssueCcCatgrybyCaftypeMdl"

    var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=${data} and cc_occ=${cc_occ}  and id not in (select comp_cat from prepaid_create_complaint where comp_status in (1,5,6) and caf_id=${cafId}) order by category asc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : OCCIssueCountByCafCatgrytypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/06/2023    -  Ramesh Patlola - Initial Function
******************************************************************************/
exports.OCCIssueCountByCafCatgrytypMdl = function (data, cafId, user) {
    var fnm = "OCCIssueCountByCafCatgrytypMdl"

	var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=${data} and id not in (select comp_cat from prepaid_create_complaint where comp_status in (1,5,6) and caf_id=${cafId}) order by category asc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getcafhsidtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 05/08/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafhsidtlsappMdl = function (data) {
	var fnm = "getcafhsidtlsappMdl"
	var year =new Date().getFullYear();
	//var year =2020;
	var month =new Date().getMonth()+1;
	//var month =8;
	    if(data.caf_type_id == 1 && data.prpd_flag == 1  && data.enty_sts_id == 6){ 
        var QRY_TO_EXEC = `select year(usg_dt) as yr_ct,month(usg_dt) as 'mnt_ct',d.caf_id,last(usg_dt,d.i_ts) as usg_dt,last(mnth_usge_lmt_ct,d.i_ts) as mnth_usge_lmt_ct,round(sum(upld_ct)/1024/1024/1024,1) as TU,
		round(sum(dwnld_ct)/1024/1024/1024,1) as TD,round(sum(ttl_ct)/1024/1024/1024,1) as total from BSS_BATCH.dly_hsi_usge_dtl_t as d
		join BSS_ONLINE_U.caf_pckge_prchse_dtl_t as cp on cp.caf_id=d.caf_id and cp.a_in=1
		join BSS_ONLINE_U.pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
		where d.caf_id=${data.caf_id} and usg_dt BETWEEN cp.cycle_strt_dt and cp.cycle_end_dt
		order by usg_dt DESC;`
    } else {
        var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) yr_ct,mnt_ct,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,
						ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,mnth_usge_lmt_ct
                        from hsi_mnthly_usge_dtl_t
                        WHERE caf_id= '${data.caf_id}' and yr_ct = '${year}' and mnt_ct='${month}'`;
    }
	/*var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) yr_ct,mnt_ct,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,
						ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,mnth_usge_lmt_ct
                        from hsi_mnthly_usge_dtl_t
                        WHERE caf_id= '${data.caf_id}' and yr_ct = '${year}' and mnt_ct='${month}'`;*/
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getbusnesinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getbusnesinfoappMdl = function (data) {
    var fnm = "getbusnesinfoappMdl"
	var QRY_TO_EXEC = `select * from prepaid_business_information`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : custnotificationMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.custmernotificationMdl = function (data,user) {
    var fnm = "custmernotificationMdl"
    var QRY_TO_EXEC = `select count(*) as count from prepaid_notification_log where caf_id='${data.caf_id}' and status=1`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : custnotificationMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updatecuststatusMdl = function (data,user) {
    var fnm = "updatecuststatusMdl"
    var QRY_TO_EXEC = `update prepaid_notification_log set status=0 where id='${data.id}'`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getcompcatappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcompcatappMdl = function (data) {
    var fnm = "getcompcatappMdl"
	var QRY_TO_EXEC = `SELECT * FROM prepaid_complaint_prefer`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrcmplntappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrcmplntappMdl = function (data) {
    var fnm = "getcstmrcmplntappMdl"
	var QRY_TO_EXEC = `SELECT prepaid_create_complaint.*,DATE_FORMAT(prepaid_create_complaint.created_date,'%d-%m-%Y %H:%i:%S') as created_date_time,cu.cstmr_nm as first_name,cu.lst_nm,cu.cntct_mble1_nu,cf.caf_id,
	cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,cf.caf_nu,cf.mbl_nu,
	(select category from prepaid_complaint_prefer where id=prepaid_create_complaint.comp_cat) as comp_cat_name FROM prepaid_create_complaint JOIN caf_dtl_t cf ON prepaid_create_complaint.caf_id=cf.caf_id join cstmr_dtl_t as cu on cu.cstmr_id=cf.cstmr_id
	where cf.caf_id ='${data.caf_id}' ORDER BY prepaid_create_complaint.created_date DESC`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getaddonhsipckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getaddonhsipckgesappMdl = function (pack_ids) {
    var fnm = "getaddonhsipckgesappMdl"
	var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id as package_id,3 as cat_id,p.vod_pack,
    p.pckge_nm as package_name, p.chrge_at as lco_price, p.chrge_at as cust_price, p.gst_at as pack_tax,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,vle_tx
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 1 
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC`;
    // var QRY_TO_EXEC = `SELECT
    // ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id as package_id,3 as cat_id,
    // p.pckge_nm as package_name, 1 as lco_price, 1 as cust_price,0.18 as pack_tax,
    // 1.18 as ttl_cst
    // FROM pckge_lst_t p
    // JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    // JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    // JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    // JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    // WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 1 
    // GROUP BY p.pckge_id
    // ORDER BY p.pckge_id DESC`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : checksubalacartecafplandataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 02/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.checksubalacartecafplandataMdl = function(data, user){
    var fnm = "checksubalacartecafplandataMdl"

    var QRY_TO_EXEC = `select crnt_pln_id as pack_id from caf_dtl_t where caf_id=${data.caf_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : checksubalacarteplanindataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 02/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.checksubalacarteplanindataMdl = function(body,data, user){

    var fnm = "checksubalacarteplanindataMdl"
    var whr = ``;
    if(data.pack_id == 79 || data.pack_id == 80){
        whr = `and HBasic_HMini=1`
    } else if (data.pack_id == 3000107){
        whr = `and Home_Essential=1`
    } else if(data.pack_id == 3000106){
        whr = `and Home_Premium=1`
    }

    var QRY_TO_EXEC = `select pckge_id from prepaid_base_pack_channels where a_in=1 and pckge_id in (${body.package_ids}) ${whr};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrcmplntaddappMdl = function (data) {
    var fnm = "getcstmrcmplntaddappMdl"
var QRY_TO_EXEC = `select * from caf_dtl_t where caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcntcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcntcstmrcmplntaddappMdl = function () {
    var fnm = "getcntcstmrcmplntaddappMdl"
var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : insrtcstmrcmplntaddappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.insrtcstmrcmplntaddappMdl = function ( data, result, ticketNo, emp_id, user) {
    var fnm = "insrtcstmrcmplntaddappMdl";
	    if (data.app_type == 'LMO APP') {
        selfasgn = 'LMO APP'
    } else {
        selfasgn = 'Self Assign'
    }
	var QRY_TO_EXEC = `INSERT INTO prepaid_create_complaint( caf_id, comp_priority, comp_ticketno, comp_cat, complaint, comp_status, created_by, created_date, last_edited_by, edited_on, comp_remarks,complaint_owner,complaint_assigned_to,comp_ticket_type,comp_source) VALUES ('${data.caf_id}','1','${ticketNo}','${data.comp_cat}',"${data.complaint.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}",1,'${selfasgn}',CURRENT_TIMESTAMP(),0,CURRENT_TIMESTAMP(),'N/A',21,8000000,'Customer Complaints','App')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getcstmrpaymntsdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpaymntsdtlsappMdl = function (data) {
    var fnm = "getcstmrpaymntsdtlsappMdl"
	var QRY_TO_EXEC = `select amt as 'amount',descr as 'remarks',discriminator as 'type',DATE_FORMAT(i_ts,'%d-%m-%Y %H:%i:%S') as dateCreated,pckge_names as 'packages_names' from sub_alacarte_transaction where caf_id='${data.caf_id}' order by i_ts DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : updtcstmrupdtdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.updtcstmrupdtdtlsappMdl = function (data) {
    var fnm = "updtcstmrupdtdtlsappMdl"   
	var QRY_TO_EXEC = `UPDATE cstmr_dtl_t SET blng_cntct_mble1_nu='${data.mobile_no}',cntct_mble1_nu='${data.mobile_no}' WHERE cstmr_id='${data.cstmr_id}';
	UPDATE caf_dtl_t set mbl_nu='${data.mobile_no}' where cstmr_id='${data.cstmr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrntfcstnlstappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrntfcstnlstappMdl = function (data) {
    var fnm = "getcstmrntfcstnlstappMdl"
	var QRY_TO_EXEC = `SELECT id,category,message, DATE_FORMAT(dateCreated,'%d-%m-%Y %H:%i:%S') as dateCreated from prepaid_notification_log where caf_id='${data.caf_id}' ORDER BY id DESC LIMIT 20`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrpckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesappMdl = function (data) {
    var fnm = "getcstmrpckgesappMdl"
	var QRY_TO_EXEC = `select c.lmo_agnt_id,c.caf_id as stb_id from caf_dtl_t c where c.caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrpckgesjoinappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesjoinappMdl = function (data) {
    var fnm = "getcstmrpckgesjoinappMdl"
	//var QRY_TO_EXEC = `select GROUP_CONCAT(p.pckge_id) as pack_ids from prepaid_customer_alacarte ca LEFT JOIN pckge_lst_t p ON ca.pack_id=p.pckge_id where ca.caf_id = '${data.caf_id}' AND ca.pack_id!='' AND p.pckge_id!=''`;
	var QRY_TO_EXEC = `SELECT GROUP_CONCAT(distinct(p.pckge_id)) as packge_id
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrjoinpckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrjoinpckgesappMdl = function (pack_ids) {
    var fnm = "getcstmrjoinpckgesappMdl"	
	console.log("in mdl pack_ids", pack_ids);
	if(pack_ids==''){
		pack_ids=0;
	}

	var QRY_TO_EXEC = `select p.pckge_type_id as cat_id,p.vod_pack,p.pckge_id as package_id,p.pck_in_sts,p.pckge_nm as package_name,p.pckge_dscn_tx,p.chrge_at as cust_price,p.chrge_at as lco_price,p.gst_at as pack_tax,(p.chrge_at+p.gst_at) as ttl_cst,p.i_ts as created_at,1 as op_status from pckge_lst_t p where p.a_in=1 AND p.pckge_id!='' AND p.pckge_id NOT IN (${pack_ids}) and p.caf_type_id=1 and p.oprtn_in=1 AND p.glbl_in=1 ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrjoinalacartepckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrjoinalacartepckgesappMdl = function (pack_ids) {
    var fnm = "getcstmrjoinalacartepckgesappMdl"
	var QRY_TO_EXEC = `SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,p.pckge_id as package_id,p.vod_pack,
    2 as cat_id,H_p as 'home_premium',H_E as 'home_essential',
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
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt and p.vod_pack=0
    AND p.a_in = 1 AND spl.a_in = 1 
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrpckgesdtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrpckgesdtlsappMdl = function (pack_ids) {
    var fnm = "getcstmrpckgesdtlsappMdl"
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
	var QRY_TO_EXEC = `select p.pckge_id as package_id,p.vod_pack,p.pckge_nm as package_name,p.pck_in_sts,p.chrge_at as cust_price,p.chrge_at as lco_price,p.pckge_type_id as cat_id,
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getcstmrcperentaldtlsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcstmrcperentaldtlsappMdl = function (data) {
    var fnm = "getcstmrcperentaldtlsappMdl"
	var QRY_TO_EXEC = `SELECT p.*,date_format(cpp.cycle_end_dt,'%Y-%m-%d') as cycle_end_dt,date_format(cpp.cycle_strt_dt,'%Y-%m-%d') as cycle_strt_dt
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${data.caf_id} and p.pckge_type_id=1;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getsbscrcafHsiDtlsMdl = (id, yr) => {
    var fnm = "getsbscrcafHsiDtlsMdl"
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
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}

/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getsbscrcafVoipDtlsMdl = (id, yr) => {
    var fnm = "getsbscrcafVoipDtlsMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}


/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvcepckgesappMdl = (data) => {
    var fnm = "getcstmrinvcepckgesappMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : getcstmrinvcedtlsfrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvcedtlsfrappMdl = (data) => {
    var fnm = "getcstmrinvcedtlsfrappMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : getcstmrinvceaddonsdtlsfrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvceaddonsdtlsfrappMdl = (data) => {
    var fnm = "getcstmrinvceaddonsdtlsfrappMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : getcstmrmnthwiseinvcepckgesappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrmnthwiseinvcepckgesappMdl = (caf_id, year, month) => {
    var fnm = "getcstmrmnthwiseinvcepckgesappMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function       : occinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occinsrtnewcmplntMdl = function (data, ticketNo, cmpsts, user) {
    var fnm = "occinsrtnewcmplntMdl"
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
	var orgnm=``;
    var dprtcde=``;
    var entemail=``;
    var clrtyp=``;
    var newdstrct=``;
    var clrnm=``;
    var atndby=``;
	var lcn= ``;
	var editon = ``;
	var occorcc = ``;
    if(cmpsts == 3){
        editon = ` edited_on = current_timestamp(),`
    } else {
		editon = ` edited_on = 0,`
	}
	if(data.occ_or_cc != '' && data.occ_or_cc != undefined){
        occorcc = `occ_or_cc=${data.occ_or_cc},`
    }
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
        cmplrmk = `complaint="${data.complaintremarks}",`
    }
    if(data.attachments[0].uploadfile != '' && data.attachments[0].uploadfile != null ){
        cmpimg = `comp_image=1,`
    } else {
        cmpimg = `comp_image=0,`
    }
        if(data.orgnname != '' && data.orgnname != undefined){
       orgnm = `Organization_Name ='${data.orgnname}',` 
    }
    if(data.dprtmntcde != '' && data.dprtmntcde != undefined){
        dprtcde = `department_code='${data.dprtmntcde}',`
    }
    if(data.ent_email != '' && data.ent_email != undefined){
        entemail = `ent_eamil='${data.ent_email}',`
    }
    if(data.cllertype != '' && data.cllertype != undefined){
        clrtyp = `caller_type='${data.cllertype}',`
    }
    if(data.newdstrt != '' && data.newdstrt != undefined){
        newdstrct = `new_district=${data.newdstrt},`
    }
    if(data.cllrname != '' && data.cllrname != undefined){
        clrnm = `caller_name='${data.cllrname}',`
    }
    if(data.attndby != '' && data.attndby != undefined){
        atndby = `call_attend_by=${data.attndby},`
    }
	if(data.location != '' && data.location != undefined){
        lcn = `location='${data.location}',`
    }
	
	var QRY_TO_EXEC = `INSERT INTO prepaid_create_complaint set ${occorcc} ${lcn} ${cmpimg} ${editon} ${tcktyp} ${srvcrqst} ${cmpltctgry} ${cnllst} ${altrmble} ${plnaugrd} ${plndngrd} ${slcmonr} ${cmplrmk} ${assslcmonr} ${orgnm} ${dprtcde} ${entemail} ${clrtyp} ${newdstrct} ${clrnm} ${atndby} caf_id=${data.caf_id},comp_ticketno='${ticketNo}',comp_status=${cmpsts},comp_priority=${data.priority},created_date=CURRENT_TIMESTAMP(),created_by=${user.mrcht_usr_id},last_edited_by=0,comp_remarks=0,comp_source='Web'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : cafdatafrsms
* Description    : 
* Arguments      : callback function
* Change History :
* 28/02/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.cafdatafrsms = function (id,packs,user) {
    var fnm = "cafdatafrsms"
     var QRY_TO_EXEC = `select group_concat(p.pckge_nm) as packname,c.mbl_nu from caf_dtl_t as c 
join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
join pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
where c.caf_id=${id} and p.pckge_id in (${packs}) and p.a_in=1 AND ps.cre_srvce_id = 2;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function      : getcstmrinvceaddonsdtlspckgefrappMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcstmrinvceaddonsdtlspckgefrappMdl = (caf_invoice_id, year_n, month) => {
    var fnm = "getcstmrinvceaddonsdtlspckgefrappMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.caf_type_id,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
where id.caf_invce_id=${caf_invoice_id} and invce_yr = ${year_n}
        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function       : getcompcatfrappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcompcatfrappMdl = function (data) {
    var fnm = "getcompcatfrappMdl"
	var QRY_TO_EXEC = `SELECT * FROM prepaid_complaint_prefer where app_type=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : occgetinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occgetinsrtnewcmplntMdl = function (user) {
    var fnm = "occgetinsrtnewcmplntMdl"
    var cndtcn = ``;
	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853 || user.mrcht_usr_id == 101002412 || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068  || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1 || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
		cndtcn = ` `;
	} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
		cndtcn = ` `;
		//cndtcn = ` where cse.complaint_owner_id in (15,16) or cse1.complaint_owner_id in (15,16) or p.created_by=${user.mrcht_usr_id} `;
	} else if (user.mnu_prfle_id == 109 || user.mnu_prfle_id == 110 || user.mnu_prfle_id == 111 ){
		cndtcn = ` where p.complaint_owner in (10,12) or p.comp_resolve_by in (select mrcht_usr_id from complaint_sub_employees where complaint_owner_id in (10,12) )  `;
	} else if (user.mnu_prfle_id == 113 || user.mnu_prfle_id == 112 ){
		cndtcn = ` where p.complaint_owner in (7,13) or p.comp_resolve_by in (select mrcht_usr_id from complaint_sub_employees where complaint_owner_id in (7,13) ) `;
	} else if (user.mnu_prfle_id == 105) {
        cndtcn = ` where  c1.instl_dstrct_id = ${user.hyrchy_grp_id} `;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}' or p.created_by=${user.mrcht_usr_id}) `;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,
	pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm,
	CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,
    co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
	,CASE WHEN comp_status=1 then time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') 
    WHEN comp_status not in (1) then time_format(timediff(p.edited_on, p.created_date),'%H:%i:%s') 
    end as datediff
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  join caf_dtl_t as c1 on c1.caf_id = p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  ${cndtcn}
  order by p.created_date desc limit 500;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : occgetcafinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occgetcafinsrtnewcmplntMdl = function (cafid, user) {
    var fnm = "occgetcafinsrtnewcmplntMdl"
    var cndtcn = ``;

	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm,
	CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,
    co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
	,CASE WHEN comp_status=1 then time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') 
    WHEN comp_status not in (1) then time_format(timediff(p.edited_on, p.created_date),'%H:%i:%s') 
    end as datediff
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  join caf_dtl_t as c1 on c1.caf_id = p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  where (p.caf_id='${cafid}' or p.comp_ticketno = '${cafid}')
  order by p.created_date desc limit 500;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCgetAddOnpackagesMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCgetAddOnpackagesMdl = function () {
    var fnm = "OCCgetAddOnpackagesMdl"

	var QRY_TO_EXEC = `SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,chl.chnle_id as package_id,
    2 as cat_id,
    p.pckge_nm as package_name, p1.chrge_at as cust_price,p1.chrge_at as lco_price, p1.gst_at as pack_tax, 
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : OCCgetcmplntdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCgetcmplntdtlsMdl = function (cafid, tckno, user) {
    var fnm = "OCCgetcmplntdtlsMdl"


	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,
	pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  where p.caf_id=${cafid} and p.comp_ticketno='${tckno}'
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCpostcmplntdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCpostcmplntdtlsMdl = function (body, user) {
    var fnm = "OCCpostcmplntdtlsMdl"

	var QRY_TO_EXEC = `SELECT * from prepaid_create_complaint where caf_id=${body.caf_id} and comp_ticketno='${body.ticketNo}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueCstmrTypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCstmrTypMdl = function (body, user) {
    var fnm = "OCCIssueCstmrTypMdl"

    if(body == 1){
        var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY complaint_owner_id) sno,
            complaint_owner_id,complaint_owner_name,a_in 
        FROM complaint_owners 
        WHERE a_in = 1 and owner_lst = 1 
        ORDER BY complaint_owner_id;`;
    } else {
        var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY complaint_owner_id) sno,
            complaint_owner_id,complaint_owner_name,a_in 
        FROM complaint_owners 
        WHERE a_in = 1 
        ORDER BY complaint_owner_id;`;
    }
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueCstmrSubTypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCstmrSubTypMdl = function (id, user) {
    var fnm = "OCCIssueCstmrSubTypMdl"

	var QRY_TO_EXEC = `SELECT A.*,B.open_count,CASE WHEN B.open_count THEN CONCAT(A.complaint_sub_emp_name,'(',B.open_count,')') ELSE CONCAT(A.complaint_sub_emp_name,'(','0',')') END
    as name_count FROM (SELECT complaint_sub_emp_id,complaint_owner_id,complaint_sub_emp_name,emp_active,a_in 
        FROM complaint_sub_employees 
        WHERE a_in = 1 AND complaint_owner_id= ${id}) A LEFT JOIN 
        (select count(*) as open_count,complaint_assigned_to FROM prepaid_create_complaint WHERE comp_status=1 AND complaint_owner= ${id} GROUP BY complaint_assigned_to) B 
        ON A.complaint_sub_emp_id=B.complaint_assigned_to ORDER BY  B.open_count asc; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueAssgnCatMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueAssgnCatMdl = function (data, user) {
    var fnm = "OCCIssueAssgnCatMdl"
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
        cmplntremrk = `complaint="${data.complaintremarks}",`; 
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
        rslvetime = `comp_resolved_time=CURRENT_TIMESTAMP(),comp_resolve_by=${user.mrcht_usr_id},`
    } else if ( data.complaintstatus == 3 ) {
        clsetime = `comp_closed_time=CURRENT_TIMESTAMP(),comp_colsed_by=${user.mrcht_usr_id},`
    }

	var QRY_TO_EXEC = ` update prepaid_create_complaint set ${srvcrqst} ${cmplntctrgy} ${chnllst} ${upgrdpckge} ${dwngrdpckge} ${cmplntremrk} ${cmplntsts} ${clsedovr} ${actntken} ${issuefnd} ${rslvetime} ${clsetime} comp_priority='${data.priority}',complaint_owner='${data.selectcomplaintowner}',complaint_assigned_to='${data.assignedemployee}',edited_on=CURRENT_TIMESTAMP() where caf_id=${data.cafid} and comp_ticketno='${data.ticketnumber}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryMdl = function (id, user) {
    var fnm = "OCCIssueByCatgryMdl"
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
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryOpenMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryOpenMdl = function (id, user) {
    var fnm = "OCCIssueByCatgryOpenMdl"
    var cndtcn = ``;

	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853 || user.mrcht_usr_id==101002412 || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068  || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
		cndtcn = ` where  p.comp_status in (1,5,6)`;
	} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
		//cndtcn = ` where cse.complaint_owner_id in (15,16) or cse1.complaint_owner_id in (15,16) or p.created_by=${user.mrcht_usr_id}  `;
		cndtcn = ` where  p.comp_status in (1,5,6) and c1.caf_type_id=2`;
	} else if (user.mnu_prfle_id == 105) {
		cndtcn = ` where p.comp_status in (1,5,6) and  c1.instl_dstrct_id = ${user.hyrchy_grp_id} `;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}' or p.created_by=${user.mrcht_usr_id} )  and p.comp_status in (1,5,6)`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,pp3.category as ent_orgn_name,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') as datediff,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm as districtname,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join prepaid_complaint_prefer as pp3 on pp3.id=p.Organization_Name
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
   ${cndtcn}
  order by p.created_date desc limit 500`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryCloseMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryCloseMdl = function (id, user) {
    var fnm = "OCCIssueByCatgryCloseMdl"
    var cndtcn = ``;

	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853 || user.mrcht_usr_id==101002412 || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068  || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
		cndtcn = ` where  p.comp_status=3`;
	} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
		//cndtcn = ` where cse.complaint_owner_id in (15,16) or cse1.complaint_owner_id in (15,16) or p.created_by=${user.mrcht_usr_id}  `;
		cndtcn = ` where  p.comp_status=3 and c1.caf_type_id=2`;
	} else if (user.mnu_prfle_id == 105) {
        cndtcn = ` where p.comp_status=3 and  c1.instl_dstrct_id = ${user.hyrchy_grp_id} `;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}' or p.created_by=${user.mrcht_usr_id} ) and p.comp_status=3`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,pp3.category as ent_orgn_name,m1.mrcht_usr_nm as closeby,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,d.dstrt_nm as districtname,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,DATE_FORMAT(p.edited_on,'%d-%m-%Y %H:%i:%S') as closedatetime,
DATE_FORMAT(p.edited_on,'%d-%m-%Y') as closedate,time_format(timediff(p.edited_on, p.created_date),'%H:%i:%s') as datediff,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,m.mrcht_usr_nm,d.dstrt_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join prepaid_complaint_prefer as pp3 on pp3.id=p.Organization_Name
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join mrcht_usr_lst_t as m1 on m1.mrcht_usr_id=p.comp_colsed_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
   left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  ${cndtcn}
  order by p.created_date desc limit 500`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueByCatgryResolveMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueByCatgryResolveMdl = function (id, user) {
    var fnm = "OCCIssueByCatgryResolveMdl"
    var cndtcn = ``;

	if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853 || user.mrcht_usr_id==101002412 || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
		cndtcn = ` where  p.comp_status=2`;
	} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
		//cndtcn = ` where cse.complaint_owner_id in (15,16) or cse1.complaint_owner_id in (15,16) or p.created_by=${user.mrcht_usr_id}  `;
		cndtcn = ` where  p.comp_status=2 and c1.caf_type_id=2`;
	} else if (user.mnu_prfle_id == 105) {
		cndtcn = ` where p.comp_status=2 and  c1.instl_dstrct_id = ${user.hyrchy_grp_id} `;
	} else {
		cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}' or p.created_by=${user.mrcht_usr_id} ) and p.comp_status=2`;
	}
	var QRY_TO_EXEC = `select pp.category as 'Category',m1.mrcht_usr_nm as rslve_by,pp1.category as callertype,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,time_format(timediff(p.edited_on, p.created_date),'%H:%i:%s') as datediff,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
	DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,DATE_FORMAT(p.edited_on,'%d-%m-%Y %H:%i:%S') as closedatetime,DATE_FORMAT(p.edited_on,'%d-%m-%Y') as closedate,d.dstrt_nm as districtname,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join mrcht_usr_lst_t as m1 on m1.mrcht_usr_id=p.comp_resolve_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  ${cndtcn}
  order by p.created_date desc limit 500 `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : occgetcafinsrtnewcmplntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.occgetcafinsrtnewcmplntMdl = function (cafid, user) {
    var fnm = "occgetcafinsrtnewcmplntMdl"
    var cndtcn = ``;

	var QRY_TO_EXEC = `select pp.category as 'Category',pp1.category as callertype,#co1.complaint_owner_name as tkt_rse_by,
	CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm,
	CASE WHEN pp.scope=1 then 'BSS' 
    WHEN pp.scope in (2,6) then 'LMO'
    WHEN pp.scope=5 then 'APSFL' 
    WHEN pp.scope=4 then 'CC'  
    WHEN pp.scope=7 then 'LCO' end as SCOPE,
    co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
	,CASE WHEN comp_status=1 then time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') 
    WHEN comp_status not in (1) then time_format(timediff(p.edited_on, p.created_date),'%H:%i:%s') 
    end as datediff
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  #left join complaint_sub_employees as cse1 on cse1.complaint_sub_emp_id=p.call_attend_by
	#left join complaint_owners as co1 on co1.complaint_owner_id=cse1.complaint_owner_id
  join caf_dtl_t as c1 on c1.caf_id = p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  where (p.caf_id='${cafid}' or p.comp_ticketno = '${cafid}')
  order by p.created_date desc limit 500;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueCountByCatgryResolveMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 15/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCountByCatgryResolveMdl = function (id, user) {
    var fnm = "OCCIssueCountByCatgryResolveMdl"
    var cndtcn = ``;
    if(id == 0){
		if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853 || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
			cndtcn = ` `;
		} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
			//cndtcn = ` where c1.complaint_owner_id in (15,16) or c.complaint_owner_id in (15,16) `;
			cndtcn = ` `;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}') `;
		}
    } else if (id == 1){
		if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853  || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
			cndtcn = ` where p.comp_status in (1,5,6)`;
		} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
			//cndtcn = ` where c1.complaint_owner_id in (15,16) or c.complaint_owner_id in (15,16) `;
			cndtcn = ` `;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=1`;
		}
    } else if (id == 2){
        if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853  || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
			cndtcn = ` where p.comp_status=2`;
		} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
			//cndtcn = ` where c1.complaint_owner_id in (15,16) or c.complaint_owner_id in (15,16) `;
			cndtcn = ` `;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=2`;
		}
    } else if (id == 3){
        if( user.mrcht_usr_id == 15 || user.mrcht_usr_id == 101090624 || user.mrcht_usr_id == 142000853  || user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 || user.mnu_prfle_id == 8  || user.mnu_prfle_id == 308000884 || user.mnu_prfle_id == 12246 || user.mnu_prfle_id == 1  || user.mnu_prfle_id == 3 || user.mnu_prfle_id == 104 ) {
			cndtcn = ` where p.comp_status=3`;
		} else if (user.mnu_prfle_id == 308000885 || user.mnu_prfle_id == 308000888) {
			//cndtcn = ` where c1.complaint_owner_id in (15,16) or c.complaint_owner_id in (15,16) `;
			cndtcn = ` `;
		} else {
			cndtcn = ` where (c.mrcht_usr_id=${user.mrcht_usr_id} or c.complaint_sub_emp_name='${user.mrcht_usr_nm}' or p.complaint_assigned_to ='${user.mrcht_usr_nm}') and  p.comp_status=3`;
		}
    } 
	var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint as p 
						left join complaint_sub_employees as c on c.complaint_sub_emp_id=p.complaint_assigned_to
						left join complaint_sub_employees as c1 on c1.complaint_sub_emp_id=p.call_attend_by
						${cndtcn}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getcmplntforlogsappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
********cls**********************************************************************/
exports.getcmplntforlogsappMdl = function (data, user) {
    var fnm = "getcmplntforlogsappMdl"

	var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_ticketno='${data.ticketnumber}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getcmplntforlogappMdl = function (ticktno, user) {
    var fnm = "getcmplntforlogappMdl"

	var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_ticketno='${ticktno}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.insrtcmplntlogappMdl = function (data, user) {
    var fnm = "insrtcmplntlogappMdl"
    var empid = 0;
    if(user.mrcht_usr_id){
        empid=user.mrcht_usr_id;
    }
	var QRY_TO_EXEC = `insert into complaint_log (complaint_id,comp_status,comments,emp_id,cl_date_created) 
    values ('${data.complaint_id}','${data.comp_status}',"${data.complaint}",'${empid}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insrtcmplntlogappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueTicktMdl = function (data, user) {
    var fnm = "OCCIssueTicktMdl"

	var QRY_TO_EXEC = `select c.*,DATE_FORMAT(c.cl_date_created,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,p.comp_ticketno,p.caf_id,
    pp2.category as comp_stas ,
        (CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name
     from complaint_log as c 
        join  prepaid_create_complaint as p on p.complaint_id=c.complaint_id 
		left join prepaid_complaint_prefer as pp2 on pp2.scope=c.comp_status and pp2.type=100 and pp2.app_type=100
        left join mrcht_usr_lst_t as m on m.mrcht_usr_id=c.emp_id
        left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
        where c.complaint_id=${data}
        order by cl_id desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function       : CheckZipFileMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.CheckZipFileMdl = function (data, user) {
    var fnm = "CheckZipFileMdl"

	var QRY_TO_EXEC = `select caf_id from caf_dtl_t where crnt_pln_id=${data.custype} and instl_dstrct_id=${data.district} and trmnd_in not in (1) `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function       : OCCIssueCountByCatgrytypMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCountByCatgrytypMdl = function (data, user) {
    var fnm = "OCCIssueCountByCatgrytypMdl"

	var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueCatgrygenralenqryMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCatgrygenralenqryMdl = function (data, user) {
    var fnm = "OCCIssueCatgrygenralenqryMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueDstrtMngrMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueDstrtMngrMdl = function ( user) {
    var fnm = "OCCIssueDstrtMngrMdl"

	var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY d.dstrt_id)as sno,d.ste_id,d.dstrt_id ,d.dstrt_nm,s.ste_nm
    from dstrt_lst_t as d 
    JOIN ste_lst_t as s on s.ste_id = d.ste_id 
    WHERE d.a_in=1 and d.ste_id=1
    ORDER BY d.dstrt_nm ASC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssueDstrtMngrIdMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueDstrtMngrIdMdl = function (id, user) {
    var fnm = "OCCIssueDstrtMngrIdMdl"

	var QRY_TO_EXEC = `select c.mble1_ph as netwrk_mbl_nu, c.cntct_nm as netwrk_manager_nm,
    c1.mble1_ph as sales_mbl_nu, c1.cntct_nm as sales_manager_nm  from  cntct_lst_t as c
join cntct_lst_t as c1 on c.dstrct_id = c1.dstrct_id AND c1.cntct_ctgry_id=2
  where c.dstrct_id=${id} and c.cntct_ctgry_id=1;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : addCafcheckInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.addCafcheckInsrtPckgsMdl = function (data, id,user) {
    var fnm = "addCafcheckInsrtPckgsMdl"
	var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t where pckge_id in (${data.package_ids}) and (prpd_in=1 or prpd_in=2) and a_in=1 and caf_id=${data.caf_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : OCCIssuegetGnrlenqrymdl
* Description    : 
* Arguments      : callback function
* Change History :
* 01/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssuegetGnrlenqrymdl = function (id, user) {
    var fnm = "OCCIssuegetGnrlenqrymdl"

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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : selefAsgnTcktsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.selefAsgnTcktsMdl = function (user) {
    var fnm = "selefAsgnTcktsMdl"

	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,co.complaint_owner_name as cmplnt_owner,
    (CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
    (CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
   where (p.created_by ='${user.mrcht_usr_id}') 
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : selefAsgnTcktsCntMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.selefAsgnTcktsCntMdl = function (user) {
    var fnm = "selefAsgnTcktsCntMdl"

	var QRY_TO_EXEC = `select count(*) from prepaid_create_complaint as p where p.created_by ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : toggleButtonResMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 08/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.toggleButtonResMdl = function (data, user) {
    var fnm = "toggleButtonResMdl"
    var tgle = ` `;
    console.log("data",data);
    if(data.toggle == true){
        tgle = ` emp_active=1, last_active_time=CURRENT_TIMESTAMP() `
    } else if(data.toggle == false) {
        tgle = ` emp_active=0, last_inactive_time=CURRENT_TIMESTAMP() `
    }
	var QRY_TO_EXEC = `update complaint_sub_employees set ${tgle} where mrcht_usr_id ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : toggleButtonValueMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.toggleButtonValueMdl = function (user) {
    var fnm = "toggleButtonValueMdl"
	var QRY_TO_EXEC = `select emp_active from complaint_sub_employees where mrcht_usr_id ='${user.mrcht_usr_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : sprtTicktCafDtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.sprtTicktCafDtlsMdl = function (data, user) {
    var fnm = "sprtTicktCafDtlsMdl"
	var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  where p.caf_id=${data.cafid}
  order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insertsubalacarteMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - durga - Initial Function
******************************************************************************/
exports.insertsubalacarteMdl = function(data, user,callback){
    var fnm = "insertsubalacarteMdl"
    console.log("success",data,user)
	var amount = 0;
	var gateway;
	if(data.amt){
		amount = data.amt;
	}
	if(data.gateway){
        gateway = data.gateway
    } else {
        gateway = 'OLD_APP'
    }
    //var QRY_TO_EXEC = `INSERT INTO sub_alacarte_transaction(package_ids,pckge_names, trns_mrchant_id, mdlw_sbscr_id,amt, caf_id,i_ts) VALUES ('${data.package_ids}','${data.packages_names}','${data.trns_mrchant_id}','${data.mdlw_sbscr_id}','${amount}','${data.caf_id}',CURRENT_TIMESTAMP())`;
	var QRY_TO_EXEC = `INSERT INTO sub_alacarte_transaction(months_val,package_ids,pckge_names, amt,trns_mrchant_id, mdlw_sbscr_id, gateway, caf_id,cat_ids,i_ts) VALUES ('${data.mnthval}','${data.package_ids}','${data.packages_names}','${data.amt}','${data.trns_mrchant_id}','${data.mdlw_sbscr_id}','${gateway}','${data.caf_id}','${data.cat_id}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updatealacartedataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/12/2021   - Durga - Initial Function
******************************************************************************/

exports.updatealacartedataMdl = function (data, user) {
    var fnm = "updatealacartedataMdl"
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
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getpackgedatafrapp
* Description    : 
* Arguments      : callback function
* Change History :
* 23/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.getpackgedatafrapp = function (data) {
    var fnm = "getpackgedatafrapp"
    var QRY_TO_EXEC = `select p.*,DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expiry_dt,DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efect_dt,
    ps.srvcpk_id,p1.chrge_at,p1.gst_at from pckge_lst_t as p
     join pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id where p.pckge_id in (${data.package_ids}) and p.a_in=1 AND ps.cre_srvce_id = 2;`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : addCafInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 09/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.addCafInsrtPckgsMdl = function (data, caf_id, type, mnthval, user) {
    var fnm = "addCafInsrtPckgsMdl"
    var datenew = new Date(); // Now
	if(mnthval == undefined || mnthval == '' || mnthval == null || mnthval == 0 ){
		mnthval = 1;
	}
    datenew.setDate(datenew.getDate() + mnthval*30 -1); // Set now + 30 days as the new date
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
			//if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			//|| k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
			if(k.vod_pack == 1){
                mnthval = 0;
                datenew = new Date();
                datenew.setDate(datenew.getDate() + 1);  // Set now + 1 no of days as the new date
	            datenew = moment(datenew).format('YYYY-MM-DD')
            }
            valQry += `(
                ${caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                curdate(),
                '${datenew}',
                curdate(),
                '${datenew}',
                2,
                ${k.chrge_at},
                ${k.gst_at},
                0,0,0,0,1,
                ${caf_id},0,0,null,null,1,current_timestamp(),${caf_id},2,'Approval From Subscriber ${type} ${caf_id}',1, CURRENT_TIMESTAMP())  ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____ addCafInsrtPckgsMdl from subscriber App  ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : checksubalacartedataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 02/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.checksubalacartedataMdl = function(data, user){
    var fnm = "checksubalacartedataMdl"

    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t where a_in=1 and caf_id=${data.caf_id} and pckge_id in (${data.package_ids}) and (prpd_in = 1 or prpd_in=2)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updatesbscrPassMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 06/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.updatesbscrPassMdl = function (data,user) {
    var fnm = "updatesbscrPassMdl"

    var QRY_TO_EXEC = `update caf_dtl_t set pwd_encrd_tx=MD5(1234567890) where caf_id=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getpackgedataremvlfrapp
* Description    : 
* Arguments      : callback function
* Change History :
* 10/01/2022   - Ramesh - Initial Function
******************************************************************************/
exports.getpackgedataremvlfrapp = function (callback) {
    var fnm = "getpackgedataremvlfrapp"
    var QRY_TO_EXEC = `select cp.caf_id,GROUP_CONCAT(cp.pckge_id) as package_ids,GROUP_CONCAT(cp.pkge_prche_id) as pkge_prche_id,c.mdlwe_sbscr_id as mdlw_sbscr_id 
	FROM caf_pckge_prchse_dtl_t as cp
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=2
    where cp.a_in=1 and cp.cycle_end_dt = curdate()-interval 1 day 
    and cp.pckge_id not in (3000007,3000008) GROUP BY cp.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getpackgedatafrremvlfrmMWapp
* Description    : 
* Arguments      : callback function
* Change History :
* 10/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getpackgedatafrremvlfrmMWapp = function (data) {
    var fnm = "getpackgedatafrremvlfrmMWapp"
    var QRY_TO_EXEC = `select p.*,DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expiry_dt,DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efect_dt,
    ps.srvcpk_id,p1.chrge_at,p1.gst_at from pckge_lst_t as p
     join pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id where p.pckge_id in (${data.package_ids}) and p.a_in=1;`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };

/*****************************************************************************
* Function       : removeAddonsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 10/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.removeAddonsMdl = (data, user, caf) => {
    var fnm = "removeAddonsMdl"
    var QRY_TO_EXEC = `UPDATE caf_pckge_prchse_dtl_t set a_in = 0, sbscrptn_req_in = 0, dscnt_in = 1, expry_dt = CURDATE(), dscnt_ts = CURRENT_TIMESTAMP(), dscnt_srce_id = 2, updte_usr_id='123456',
    u_ts = CURRENT_TIMESTAMP() WHERE pkge_prche_id in (${data.pkge_prche_id}) and (a_in=1 or expry_dt>curdate()) and caf_id = ${caf}`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : addCaffailedInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedInsrtPckgsMdl = function(str,data, body, ext_json, api_response, user,callback){
    var fnm = "addCaffailedInsrtPckgsMdl"
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (service_type,package_ids, ext_json, trns_mrchant_id, mdlw_sbscr_id, caf_id, cat_ids,status, status_code, err_msg, months_val,i_ts) VALUES ('${str}','${body.package_ids}','${JSON.stringify(ext_json)}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}',2,0,'${api_response.statusCode}','${api_response.statusMessage}','${body.mnthval}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : addCaffailedInsrtAddOnPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedInsrtAddOnPckgsMdl = function(str,packid,catid,data, body, ext_json, api_response, user,callback){
    var fnm = "addCaffailedInsrtAddOnPckgsMdl"
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (service_type,package_ids, ext_json, trns_mrchant_id, mdlw_sbscr_id, caf_id, cat_ids,status, status_code, err_msg, months_val,i_ts) VALUES ('${str}','${packid}','${JSON.stringify(ext_json)}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}','${catid}',0,'${api_response.statusCode}','${api_response.statusMessage}','${body.mnthval}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : addCaffailedHsiInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedHsiInsrtPckgsMdl = function(str, body, data, api_response, user,callback){
    var fnm = "addCaffailedHsiInsrtPckgsMdl"
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (service_type,package_ids, trns_mrchant_id, mdlw_sbscr_id, caf_id, cat_ids, status, i_ts) VALUES ('${str}','${data.package_id}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}','${api_response}',0,CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : retrackalacartepckgesMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.retrackalacartepckgesMdl = (data, user) => {
    var fnm = "retrackalacartepckgesMdl"
    var QRY_TO_EXEC = `select * from subscriber_app_retrack_pckgs where status=0`;

    console.log( QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : deleteretrkpckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.deleteretrkpckgsMdl = (data, user) => {
    var fnm = "deleteretrkpckgsMdl"
    var QRY_TO_EXEC = `update subscriber_app_retrack_pckgs set status=1 where ID=${data.ID}`;

    console.log( QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : countCafPckgsfrmAppMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 14/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.countCafPckgsfrmAppMdl = function (id,user) {
    var fnm = "countCafPckgsfrmAppMdl"
    var data = ``;
    if( id == 3){
        data = ` and cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 3 DAY)`;
    } else if ( id == 5){
        data = ` and cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 5 DAY)`;
    } else if ( id == 0){
        data = ` and cycle_end_dt = CURDATE()`;
    } else if ( id == 1){
        data = ` and cycle_strt_dt = CURDATE()`;
    }
     var QRY_TO_EXEC = `select count(*) as count from caf_pckge_prchse_dtl_t where (prpd_in=1 or prpd_in=2) and a_in=1 ${data}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : AmountfrAlacarteAppMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 14/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.AmountfrAlacarteAppMdl = function (id,user) {
    var fnm = "AmountfrAlacarteAppMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if(currntMnth == 1){
        var pervsMnth = 12;
    }else {
        var pervsMnth = date.getMonth();
    }
    if(currntMnth == 1){
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear()-1;
        pervsMnth = 12;
    } else {
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    var data = ` `;
    if( id == 1){
        data = `and cycle_strt_dt=curdate()`;
    } else if ( id == 2){
        data = `and cycle_strt_dt>'2022-01-01'`;
    } else if ( id == 3){
        data = ` and cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}'`;
    } else if ( id == 4){
        data = ` and cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE()`;
    }
    var QRY_TO_EXEC = `select sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END) as total_money from caf_pckge_prchse_dtl_t where (prpd_in=1 or prpd_in=2) ${data}; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : DataCafPckgsfrmAppMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 14/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.DataCafPckgsfrmAppMdl = function (id,user) {
    var fnm = "DataCafPckgsfrmAppMdl"
    var data = ` `;
    if( id == 3){
        data = `and cp.cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 3 DAY)`;
    } else if ( id == 5){
        data = ` and cp.cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 5 DAY)`;
    } else if ( id == 0){
        data = ` and cp.cycle_end_dt = CURDATE()`;
    } else if ( id == 1){
        data = ` and cp.cycle_strt_dt = CURDATE()`;
    }
    var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
    ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
    left join caf_dtl_t as c on c.caf_id=cp.caf_id
    left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join pckge_lst_t as p on p.pckge_id=cp.pckge_id
     where (cp.prpd_in=1 or cp.prpd_in=2) and cp.a_in=1 ${data} order by cp.i_ts desc`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : allDataCafPckgsfrmAppMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.allDataCafPckgsfrmAppMdl = function (id, nom, user) {
    var fnm = "allDataCafPckgsfrmAppMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if(currntMnth == 1){
        var pervsMnth = 12;
    }else {
        var pervsMnth = date.getMonth();
    }
    if(currntMnth == 1){
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear()-1;
        pervsMnth = 12;
    } else {
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    if( id == 1){
        if(nom == 0 ){
            var QRY_TO_EXEC = ` select count(*) as failed_count from subscriber_app_retrack_pckgs where service_type='ADD SERVICE PACK' and date(i_ts)=curdate()`;
        } else if ( nom == 1){
            var QRY_TO_EXEC = ` select * from subscriber_app_retrack_pckgs where service_type='ADD SERVICE PACK' and date(i_ts)=curdate() order by i_ts desc`;
        }    
    } else if ( id == 2){
        if(nom == 0){
            var QRY_TO_EXEC = `select sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END) as failed_count from caf_pckge_prchse_dtl_t as cp 
             where (cp.prpd_in=1 or cp.prpd_in=2) and cp.a_in=1  and cp.cycle_strt_dt = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`
        } else if (nom == 1){
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
            ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
            left join caf_dtl_t as c on c.caf_id=cp.caf_id
            left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
            left join pckge_lst_t as p on p.pckge_id=cp.pckge_id
            where (cp.prpd_in=1 or cp.prpd_in=2) and cp.a_in=1  and cp.cycle_strt_dt = DATE_SUB(CURDATE(), INTERVAL 1 DAY) order by i_ts desc`
        }
    } else if ( id == 3){
        if(nom == 0){
            var QRY_TO_EXEC = `select count(*) as prvscountdat from caf_pckge_prchse_dtl_t as cp 
     where (cp.prpd_in=1 or cp.prpd_in=2) and cp.cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}'`
        }else if(nom == 1){
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
        ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
        left join caf_dtl_t as c on c.caf_id=cp.caf_id
        left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        left join pckge_lst_t as p on p.pckge_id=cp.pckge_id
        where (cp.prpd_in=1 or cp.prpd_in=2)  and cp.cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' order by cp.i_ts desc`
        }
    } else if ( id == 4){
        if(nom == 0){
            var QRY_TO_EXEC = `select count(*) as crntcountdat from caf_pckge_prchse_dtl_t as cp 
     where (cp.prpd_in=1 or cp.prpd_in=2) and cp.a_in=1  and cp.cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE()`
        } else if (nom == 1){
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
    ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
    left join caf_dtl_t as c on c.caf_id=cp.caf_id
    left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join pckge_lst_t as p on p.pckge_id=cp.pckge_id
     where (cp.prpd_in=1 or cp.prpd_in=2) and cp.a_in=1  and cp.cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE() order by cp.i_ts desc`
        }
    }
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm); 
}

/*****************************************************************************
* Function       : CalcntrIssueByCatgryMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 13/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.CalcntrIssueByCatgryMdl = function (id, cmpsts, user) {
    var fnm = "CalcntrIssueByCatgryMdl"
    var cndtcn = ``;
    var cmpstscndtcn = ``;


    if(id == 0){
		if( cmpsts == 0 ) {
            slt = ` count(*) as 'count' `;
            if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where  p.complaint_owner in (2,6,7,8,9,10,12,13)  `;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}') `;
            }
			
		} else if( cmpsts == 1 ) {
            slt = ` count(*) as 'count' `;
			cmpstscndtcn = ` and p.comp_status=1`
            if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
			
		} else if( cmpsts == 2 ) {
            slt = ` count(*) as 'count' `;
			cmpstscndtcn = ` and p.comp_status=2`
            if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where  p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
			
		} else if( cmpsts == 3 ) {
            slt = ` count(*) as 'count' `;
			cmpstscndtcn = ` and p.comp_status=3`
            if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
			
		}
    } else if (id == 1){
		if( cmpsts == 0 ) {
			
            slt = ` pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp `
			if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where  p.complaint_owner in (2,6,7,8,9,10,12,13)  `;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}') `;
            }
		} else if( cmpsts == 1 ) {
			cmpstscndtcn = ` and p.comp_status=1`
            slt = ` pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp `
			if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
		} else if( cmpsts == 2 ) {
			cmpstscndtcn = ` and p.comp_status=2`
            slt = ` pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp `
			if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where  p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
		} else if( cmpsts == 3 ) {
			cmpstscndtcn = ` and p.comp_status=3`
            slt = ` pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp `
			if( user.mrcht_usr_id == 103011067 || user.mrcht_usr_id == 103011068 ){
                cndtcn = ` where p.complaint_owner in (2,6,7,8,9,10,12,13)`;
            } else {
                cndtcn = ` where (cse.mrcht_usr_id=${user.mrcht_usr_id} or cse.complaint_sub_emp_name='${user.mrcht_usr_nm}'
			or p.complaint_assigned_to ='${user.mrcht_usr_nm}')`;
            }
		}
    } 
	var QRY_TO_EXEC = `select ${slt}
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat ${cmpstscndtcn}
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
  ${cndtcn}
  order by p.created_date desc `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : FirstdayFirstShowMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 03/06/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.FirstdayFirstShowMdl = function (id, nom, user) {
    var fnm = "FirstdayFirstShowMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
    } else {
        var pervsMnth = date.getMonth();
    }
    if (currntMnth == 1) {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear() - 1;
        pervsMnth = 12;
    } else {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    if (id == 1) {
        if (nom == 0) {
            var QRY_TO_EXEC = ` select count(*) as prsnt_count from caf_pckge_prchse_dtl_t as cp
            join  pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1 where cp.cycle_strt_dt=curdate()`;
        } else if (nom == 1) {
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
            ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
            left join caf_dtl_t as c on c.caf_id=cp.caf_id
            left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
            join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1 where cp.cycle_strt_dt=curdate() order by cp.i_ts desc`;
        }
    } else if (id == 2) {
        if (nom == 0) {
            var QRY_TO_EXEC = `select count(*) as failed_count from caf_pckge_prchse_dtl_t as cp 
            join  pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1 where cp.cycle_strt_dt = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`
        } else if (nom == 1) {
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
            ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
            left join caf_dtl_t as c on c.caf_id=cp.caf_id
            left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
            join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1
            where cp.cycle_strt_dt = DATE_SUB(CURDATE(), INTERVAL 1 DAY) order by i_ts desc`
        }
    } else if (id == 3) {
        if (nom == 0) {
            var QRY_TO_EXEC = `select count(*) as prvscountdat from caf_pckge_prchse_dtl_t as cp 
            join  pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1
     where cp.cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}'`
        } else if (nom == 1) {
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
        ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
        left join caf_dtl_t as c on c.caf_id=cp.caf_id
        left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1
        where cp.cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' order by cp.i_ts desc`
        }
    } else if (id == 4) {
        if (nom == 0) {
            var QRY_TO_EXEC = `select count(*) as crntcountdat from caf_pckge_prchse_dtl_t as cp 
            join  pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1
     where cp.cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE()`
        } else if (nom == 1) {
            var QRY_TO_EXEC = `select c.mbl_nu,c.mdlwe_sbscr_id,a.agnt_cd,p.pckge_nm,cp.*,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y %H:%i:%S') as cyclestrtdt
    ,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y %H:%i:%S') as cyclenddt from caf_pckge_prchse_dtl_t as cp 
    left join caf_dtl_t as c on c.caf_id=cp.caf_id
    left join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.vod_pack=1
     where cp.cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE() order by cp.i_ts desc`
        }
    }

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function       : prvsthisdaytcktsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.prvsthisdaytcktsMdl = (id, cmpstus, user) => {
    var fnm = "prvsthisdaytcktsMdl"
    var cmpsts = ``;
    if( cmpstus == 1){
        cmpsts = ` and comp_status=1`;
    } else if( cmpstus == 2){
        cmpsts = ` and comp_status=2`;
    } else if( cmpstus == 3){
        cmpsts = ` and comp_status=3`;
    }
    if(id == 1){
        var QRY_TO_EXEC = `select count(*) as 'today' from prepaid_create_complaint where date(created_date) = curdate() ${cmpsts};`
        //var QRY_TO_EXEC = `select 0 as today`
    } else if ( id == 2){
        var QRY_TO_EXEC = `select count(*) as 'prvsday' from prepaid_create_complaint where date(created_date) = DATE_FORMAT(DATE_SUB(curdate(),INTERVAL 1 DAY),'%Y-%m-%d') ${cmpsts};`;
        //var QRY_TO_EXEC = `select 0 as 'prvsday' `;
    } else if(id == 3){
        var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
      from prepaid_create_complaint as p 
      left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
	  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
      left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
      left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
      left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
        where date(created_date) = curdate() order by p.created_date desc;`
    } else if ( id == 4){
        var QRY_TO_EXEC = `select pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,m.mrcht_usr_nm,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
      from prepaid_create_complaint as p 
      left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
	  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
      left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
      left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
      left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to where date(created_date) = DATE_FORMAT(DATE_SUB(curdate(),INTERVAL 1 DAY),'%Y-%m-%d') order by p.created_date desc;`;
    }

    console.log( QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : prvsthismnthtcktsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 12/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.prvsthismnthtcktsMdl = (id,cmpstus, user) => {
    var fnm = "prvsthismnthtcktsMdl"
    var cmpsts = ``;
    if( cmpstus == 1){
        cmpsts = ` and comp_status=1`;
    } else if( cmpstus == 2){
        cmpsts = ` and comp_status=2`;
    } else if( cmpstus == 3){
        cmpsts = ` and comp_status=3`;
    }
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if(currntMnth == 1){
        var pervsMnth = 12;
    }else {
        var pervsMnth = date.getMonth();
    }
    if(currntMnth == 1){
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear()-1;
        pervsMnth = 12;
    } else {
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    if(id == 1){
        var QRY_TO_EXEC = `select count(*) as 'thismnth' from prepaid_create_complaint where date(created_date) BETWEEN '${currntYear}-${currntMnth}-01' and curdate() ${cmpsts};`
    } else if ( id == 2){
        var QRY_TO_EXEC = `select count(*) as 'prvsmnth' from prepaid_create_complaint where date(created_date) BETWEEN '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' ${cmpsts};`;
    }
    console.log( QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : compstatusMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 05/01/2022   - durga - Initial Function
******************************************************************************/
exports.compstatusMdl = function (id, data,callback) {
    var fnm = "compstatusMdl"
    console.log("success",data);
    var datas = ``;
   if(id == 0 ){
       datas = ` pp.category as 'Category','Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
       co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp `;
       joins = `    left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
	   left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
       left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
       left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
       left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to`
   } else if(id == 1){
       datas = ` count(*) as count`;
       joins = ``;
   }
    var QRY_TO_EXEC = `select ${datas} from prepaid_create_complaint as p ${joins} where p.comp_source='App'  order by p.created_date desc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : generalenquiredataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 05/01/2022   - Durga - Initial Function
******************************************************************************/
exports.generalenquiredataMdl = function (data,callback) {
    var fnm = "generalenquiredataMdl"
    console.log("success",data);
    var id = ``;
   if(data == 0){
    id = ``;
   } else {
    id = ` where tckt_typ='${data}'`
   }
    var QRY_TO_EXEC = `select count(*) as 'count' from general_enquiries ${id} `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : dateformatdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 5/1/2022   - durga - Initial Function
******************************************************************************/
exports.dateformatdataMdl = function (data,user) {
    var fnm  = "dateformatdataMdl"
    console.log("success",data);
    var cmpsts = ``;
    var cmpownr = ``;
    var asngdemplyee = ``;
    var compsrc=``;
	var join = ``;
	var joindata = ``;
	var cllrtyp = ``;
	if(data.tcktcrtedby != '' && data.tcktcrtedby != null && data.tcktcrtedby != undefined){
        if(data.tcktcrtedby != 0){
			if(data.tcktcrtedby == 22){
				join =` and p.occ_or_cc=8 `
			} else if(data.tcktcrtedby == 11){
				join =` and p.occ_or_cc=1 `
			} else if(data.tcktcrtedby == 1) {
				join =` and p.occ_or_cc=2 `
			} else if(data.tcktcrtedby == 15){
				join =` and c.caf_type_id=2 `
			}
        }
    }
    if(data.complaint_status != '' && data.complaint_status != null && data.complaint_status != undefined){
        cmpsts = ` and comp_status=${data.complaint_status} `
    }
    if(data.selectcomplaintowner != '' && data.selectcomplaintowner != null && data.selectcomplaintowner != undefined){
        cmpownr = ` and complaint_owner=${data.selectcomplaintowner} `
    }
    if(data.assignedemployee != '' && data.assignedemployee != null && data.assignedemployee != undefined){
        asngdemplyee = ` and complaint_assigned_to=${data.assignedemployee} `
    }
    if(data.complaint_source != '' && data.complaint_source != null && data.complaint_source != undefined){
        if(data.complaint_source == 1){
            compsrc = ` and comp_source='Web' `
        } else {
            compsrc = ` and comp_source='App' `
        }
    }
	if(data.cllrtyp != '' && data.cllrtyp != null && data.cllrtyp != undefined){
        cllrtyp = ` and caller_type=${data.cllrtyp} `
    }
    var QRY_TO_EXEC = `select pp.category as 'Category',pp3.category as callertypee, CASE WHEN p.occ_or_cc=1 then 'CC' 
    WHEN p.occ_or_cc =2 then 'OCC'
    WHEN p.occ_or_cc=8 then 'GRIEVANCE' 
    WHEN p.occ_or_cc is null then null end as tkt_rse_by, d.dstrt_nm , mn.mndl_nm,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,
	pp2.category as cmp_sts,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,
    co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
    from prepaid_create_complaint as p 
    left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat  
	join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
	left join prepaid_complaint_prefer as pp3 on pp3.id=p.caller_type
    left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
    left join caf_dtl_t as c on c.caf_id=p.caf_id
    left JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id 
    left join mndl_lst_t mn on (mn.mndl_nu = c.instl_mndl_id or mn.mndl_id = c.instl_mndl_id) and mn.dstrt_id = c.instl_dstrct_id
    left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
    left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
    where date(p.created_date) BETWEEN '${data.fromDate}' and '${data.toDate}' ${cmpsts} ${cmpownr} ${asngdemplyee} ${compsrc} ${cllrtyp} ${join} order by p.created_date desc ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getsubemployeesMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/12/2021   - Durga - Initial Function
******************************************************************************/
exports.getsubemployeesMdl = function (user) {
    var fnm = "getsubemployeesMdl"

    var QRY_TO_EXEC = `select cs.*,co.complaint_owner_name,'Edit' as 'Edit' from complaint_sub_employees as cs
    join complaint_owners as co on co.complaint_owner_id=cs.complaint_owner_id order by cs.complaint_owner_id asc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : subemployessMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 16/12/2021   - Durga - Initial Function
******************************************************************************/
exports.subemployessMdl = function (data, user) {
    var fnm = "subemployessMdl"
    complaintownerid = ` `;
    mrchtusrid = ` `;
    complaintsub_emp_name = ` `;

    if (data.owner_id != null && data.owner_id != '') {
        complaintownerid = `,complaint_owner_id=${data.owner_id}`
    }
    if (data.merchent_id != null && data.merchent_id != '') {
        mrchtusrid = `,mrcht_usr_id=${data.merchent_id}`
    }
    if (data.employeename != null && data.employeename != '') {
        complaintsub_emp_name = `,complaint_sub_emp_name='${data.employeename}'`
    }

    var QRY_TO_EXEC = `insert into complaint_sub_employees set a_in=1 ${complaintownerid} ${mrchtusrid} ${complaintsub_emp_name} `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function       : sladataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 03/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.sladataMdl = function (data, user, callback) {
    var fnm = "sladataMdl"

    var checkval = ` `;
    let delim = ` , `;
    var count = 0;
    var lvloneseconds = data.level_one_time ;
    var lvlotwoseconds = data.level_two_time ;
    var lvlthreeseconds = null;
    var lvlfourseconds = null;
    if(data.level_three_time != null && data.level_three_time != undefined && data.level_three_time != ''){
        lvlthreeseconds = data.level_three_time ;
    }
    if(data.level_four_time != null && data.level_four_time != undefined && data.level_four_time != ''){
        lvlfourseconds = data.level_four_time ;
    }
    
    console.log("success", Object.keys(data).length);
    var datalength = Object.keys(data);
    datalength.filter((k)=> {
        if (k == "Other_emails") {
            checkval += `Escltn_other_email='${data.Other_emails}' `
        } else if (k == "level_one_time") {
            checkval += `Escltn_lvl_one_time='${lvloneseconds}' `
        }  else if (k == "level_two_time") {
            checkval += `Escltn_lvl_two_time='${lvlotwoseconds}' `
        }  else if (k == "level_three_time") {
            checkval += `Escltn_lvl_three_time='${lvlthreeseconds}' `
        }  else if (k == "level_four_time") {
            checkval += `Escltn_lvl_four_time='${lvlfourseconds}' `
        }  else if (k == "issue_owner") {
            checkval += `issue_owner='${data.issue_owner}' `
        }
    
        if (count != datalength.length - 1 ) {
            checkval += delim
        }
        count++;
    })
    

    var QRY_TO_EXEC = `INSERT INTO sla_hour set ${checkval} , a_in=1,i_ts=CURRENT_TIMESTAMP()`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/*****************************************************************************
* Function       : getsladatainsertMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 04/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.getsladatainsertMdl = function(data, user){
    var fnm = "getsladatainsertMdl"

    var QRY_TO_EXEC = `select s.*,'Edit' as 'Edit',co.complaint_owner_name from sla_hour as s
    join complaint_owners as co on co.complaint_owner_id=s.issue_owner order by ID;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getsladataidinsertMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 04/01/2022   - ramesh - Initial Function
******************************************************************************/
exports.getsladataidinsertMdl = function(id){
    var fnm = "getsladataidinsertMdl"
    var QRY_TO_EXEC = `select s.*,co.complaint_owner_name from sla_hour as s
    join complaint_owners as co on co.complaint_owner_id=s.issue_owner where s.issue_owner=${id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : editslllahoursMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 10/1/2022   - durga - Initial Function
******************************************************************************/
exports.editslahoursMdl = function (data, callback) {
    var fnm = "editslahoursMdl"
    var checkval = ` `;
    var lvloneseconds = data.level_one_time ;
    var lvlotwoseconds = data.level_two_time ;
    var lvlthreeseconds = null;
    var lvlfourseconds = null;
    if(data.level_three_time != null && data.level_three_time != undefined && data.level_three_time != ''){
        lvlthreeseconds = data.level_three_time ;
    }
    if(data.level_four_time != null && data.level_four_time != undefined && data.level_four_time != ''){
        lvlfourseconds = data.level_four_time ;
    }
    let delim = `,`;
    count = 0;
    console.log("success", Object.keys(data).length);
    console.log(count);
    let datalength = Object.keys(data);
    datalength.filter((k) => {
        console.log("k", k)
        if (k == "Other_emails") {
            checkval += `Escltn_other_email='${data.Other_emails}' `
        } else if (k == "level_one_time") {
            checkval += `Escltn_lvl_one_time='${lvloneseconds}' `
        }  else if (k == "level_two_time") {
            checkval += `Escltn_lvl_two_time='${lvlotwoseconds}' `
        }  else if (k == "level_three_time") {
            checkval += `Escltn_lvl_three_time='${lvlthreeseconds}' `
        }  else if (k == "level_four_time") {
            checkval += `Escltn_lvl_four_time='${lvlfourseconds}' `
        } 

        if (count != datalength.length - 1 && k != 'issue_owner') {
            checkval += delim
        }
        count++;
    })
    var QRY_TO_EXEC = `update sla_hour set ${checkval} where issue_owner= ${data.issue_owner}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function       : DatagetbysubeployeesMdlMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/12/2021   - Durga - Initial Function
******************************************************************************/

exports.getbysubemployeesMdl =function(data,callback) {
    var fnm = "getbysubemployeesMdl"
    var QRY_TO_EXEC = `select * from complaint_sub_employees where mrcht_usr_id=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : occgetcmplntsMdl
* Description    : 
* Arguments      : callback function
* Change History : 
* 19/01/2022   - Durga - Initial Function
******************************************************************************/
exports.getocccmplntdtlMdl = function (data, callback) {
    var fnm = "getocccmplntdtlMdl"
    console.log("success", data);
    var QRY_TO_EXEC = `select g.*,d.dstrt_nm,CASE WHEN g.tckt_typ=1 then 'New Connection' 
    WHEN g.tckt_typ=2 then 'Call Drop' end as tckt_name from general_enquiries as g
    left join dstrt_lst_t as d on d.dstrt_id=g.district
     where g.gen_enq_id= '${data}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : slaLvlHrsfrmDbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 22/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.slaLvlHrsfrmDbMdl = function (id, data) {
    var fnm = "slaLvlHrsfrmDbMdl"
    var QRY_TO_EXEC = `select * from sla_hour order by ID asc`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };
	    
/*****************************************************************************
* Function       : slaLvlOneMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.slaLvlOneMdl = function () {
    var fnm = "slaLvlOneMdl"
     var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_status=1 and complaint_owner not in (4,3,5,11) and created_date < NOW() - INTERVAL 59 MINUTE order by complaint_owner asc`;
    //var QRY_TO_EXEC = `select * from prepaid_create_complaint where comp_status=1 and complaint_owner not in (4,3,5,11) and  date_format(created_date,'%Y-%m-%d')  = curdate()`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };
	
/*****************************************************************************
* Function       : slaLvlcheckMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.slaLvlcheckMdl = function (tm, data) {
    var fnm = "slaLvlcheckMdl"
    var QRY_TO_EXEC = `select * from escalation_tckt_dtl_t where Escltn_tckt='${data.comp_ticketno}' and time_lvl=${tm}`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };
	
/*****************************************************************************
* Function       : slaLvlEsclatonMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.slaLvlEsclatonMdl = function (id, tm, data) {
    var fnm = "slaLvlEsclatonMdl"
    var QRY_TO_EXEC = `insert into escalation_tckt_dtl_t (Escltn_tckt,time_lvl,issue_owner,emply_id,caf_id,Escltn_data_time,a_in,u_ts,i_ts) values ('${data.comp_ticketno}','${tm}','${data.complaint_owner}','${data.complaint_assigned_to}','${data.caf_id}',"${id}",1,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getaddonhsiCafDtaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getaddonhsiCafDtaMdl = function (data) {
    var fnm = "getaddonhsiCafDtaMdl"
    var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id as package_id,
    1 as pkcge_idnty,3 as cat_id,
    p.pckge_nm as package_name, p.chrge_at as lco_price, p.chrge_at as cust_price, p.gst_at as pack_tax,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, h.prpry_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,vle_tx
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 1 and p.pckge_id in (${data.package_ids})
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function      : insrtCafStgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*28/01/2022   - Ramesh P - Initial Function
******************************************************************************/
// exports.getCafDtaMdl = (caf_id, user) => {
//     var QRY_TO_EXEC = `select caf_id,caf_type_id, aaa_cd,crnt_pln_id,hsi_orgnl_prfle_tx,
//     LOWER(CONCAT(SUBSTR(REPLACE(onu_mac_addr_tx,":",""),1,4),".",SUBSTR(REPLACE(onu_mac_addr_tx,":",""),5,4),".",SUBSTR(REPLACE(onu_mac_addr_tx,":",""),9,4))) as 'accessId'
//     From caf_dtl_t where caf_id=${caf_id};`

//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// }


exports.getCafDtaMdl = (id, user, callback) => {
    var fnm = "getCafDtaMdl"

    var QRY_TO_EXEC = `SELECT c.caf_id, c.caf_nu,c.mbl_nu,c.actvn_dt,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.iptv_srl_nu,c.iptv_mac_addr_tx,cst.cstmr_nm as frst_nm,cst.lst_nm,cst.cstmr_id,cst.cstmr_nm,c.instl_lcly_tx,cs.sts_nm,cs.sts_clr_cd_tx,c.enty_sts_id,DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') as spnd_ts,
    DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_ts,DATE_FORMAT(c.trmnd_ts,'%d-%m-%Y') as trmnd_ts,fr.frqncy_nm,
    ct.caf_type_nm, md.mdle_nm as onu_mdl_nm,md1.mdle_nm as iptv_mdl_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.adhr_nu as full_adhr_nu,c.mdlwe_sbscr_id,
    c.olt_prt_nm,c.olt_crd_nu,c.olt_prt_splt_tx,group_concat(vps.phne_nu) as phne_nu,count(vps.phne_nu) as phne_nu_cnt,c.caf_type_id,
    '' as pswrd_txt,md.emi_at,pl.pckge_nm,pl.pckge_id,
    c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    v.vlge_nm,m.mndl_nm,d.dstrt_nm, c.instl_ste_id, c.instl_std_cd, cst.loc_eml1_tx as email, cst.loc_std_cd,alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,c.aghra_cd,c.aaa_cd, LOWER(CONCAT(SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),1,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),5,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),9,4))) as 'accessId',
    c.olt_id,c.pop_id,c.olt_ip_addr_tx,c.olt_srl_nu,c.olt_prt_nm,c.olt_prt_splt_tx,
    c.olt_ip_addr_tx ,ol.olt_srl_nu ,ol.olt_nm,ol.pop_id,ol.sbstn_unq_cd,ol.olt_srl_nu,ol.sbstn_nm,
    DATE_FORMAT(ol.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as  oprnl_sts_chnge_ts,DATE_FORMAT(ol.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts
    ,DATE_FORMAT(ol.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,oste.ste_nm,ast.sts_nm as ahgra_sts_nm,
    cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    left JOIN inv_stpbx_lst_t as i on i.caf_id=c.caf_id AND i.prdct_id =1
    left JOIN inv_stpbx_lst_t as i1 on i1.caf_id=c.caf_id AND i1.prdct_id =2
    left JOIN inv_prdct_mdle_lst_t as md on md.mdle_id=i.mdle_id
    left JOIN inv_prdct_mdle_lst_t as md1 on md1.mdle_id=i1.mdle_id
    left JOIN vlge_lst_t v ON v.vlge_nu = cst.loc_vlge_id and v.mndl_id = cst.loc_mndl_id AND v.dstrt_id = cst.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where c.caf_id= ${id} AND c.a_in= 1
    GROUP BY c.caf_id`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : insrtCafStgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*28/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getCafPckageMdl = function (id) {
    var fnm = "getCafPckageMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,
    p.pckge_nm,
    psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,
    GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
    psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${id}
    GROUP BY p.pckge_id
    ORDER BY t.srvcpk_type_nm desc;`;
    console.log('getCafPckageMdl ______________________')

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getCstmrMnthlyHsiPckgeDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCstmrMnthlyHsiPckgeDtlsMdl = function (caf_id) {
    var fnm = "getCstmrMnthlyHsiPckgeDtlsMdl"
    var QRY_TO_EXEC = ` SELECT * FROM
    BSS_BATCH.hsi_mnthly_usge_dtl_t
    WHERE
    caf_id=${caf_id}
    AND
    mnt_ct=MONTH(CURDATE())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : addHsiCafPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.addHsiCafPckgsMdl = (data, user) => {
    var fnm = "addHsiCafPckgsMdl"

    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,
        prpd_in,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,
		cycle_strt_dt,
		cycle_end_dt,		
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,	
        a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
                ${data.caf_id}, 
                ${k.package_id}, 
                2,
                ${k.srvcpk_id},
                CURDATE(),
                CURDATE()+INTERVAL 3 MONTH,
				CURDATE(),
                CURDATE()+INTERVAL 3 MONTH,
                ${k.cust_price},
                ${k.pack_tax},
                0,0,0,0,1,
                ${data.caf_id},
                1, CURRENT_TIMESTAMP()) ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function       : addCafHsiMnthPckgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addCafHsiMnthPckgsMdl = function (data) {
    var fnm = "addCafHsiMnthPckgsMdl"
    var QRY_TO_EXEC = ` UPDATE BSS_BATCH.hsi_mnthly_usge_dtl_t
    SET mnth_usge_lmt_ct=${data.nw_hsi_pckge}
    WHERE caf_id=${data.caf_id} AND mnt_ct=MONTH(CURDATE());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : updateBatchCafDtlTable
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateBatchCafDtlTable = function (data,aaaData) {
    var fnm = "updateBatchCafDtlTable"
    var QRY_TO_EXEC = ` UPDATE caf_dtl_t set 
                        hsi_thrtd_in=0,
                        hsi_thrtd_ts=CURRENT_TIMESTAMP(),
                        hsi_crnt_prfle_tx="${aaaData.sa}"
                        where caf_id='${data.caf_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : updateOnlineCafDtlTable
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateOnlineCafDtlTable = function (data,aaaData) {
    var fnm = "updateOnlineCafDtlTable"
    var QRY_TO_EXEC = ` UPDATE caf_dtl_t set 
                        hsi_thrtd_in=0,
                        hsi_thrtd_ts=CURRENT_TIMESTAMP(),
                        hsi_crnt_prfle_tx="${aaaData.sa}"
                        where caf_id='${data.caf_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : addHsiToThrldMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addHsiToThrldMdl = function (data) {
    var fnm = "addHsiToThrldMdl"
    var QRY_TO_EXEC = ` INSERT INTO BSS_BATCH.thrttld_cafs_dtl_t(caf_id,caf_type_id,pln_id,aaa_cd,frm_prfle_tx,mnth_ct,yr_ct,bstr_in,dt,i_ts)
    VALUES(${data.caf_id},${data.caf_type_id},${data.crnt_pln_id},'${data.aaa_cd}','${data.aaa_prfl_nm}',MONTH(CURDATE()),YEAR(CURDATE()),1,CURDATE(),CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : testdeletecmnddbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.testdeletecmnddbMdl = function (data) {
    var fnm = "testdeletecmnddbMdl"
    var QRY_TO_EXEC = `select * from check_mw_data limit 1;
	delete from caf_dtl_t where caf_id=200175267`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };

/*****************************************************************************
* Function       : testdeletecmndothrdbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.testdeletecmndothrdbMdl = function (data) {
    var fnm = "testdeletecmndothrdbMdl"
    var QRY_TO_EXEC = `delete from caf_dtl_t where caf_id=200175267`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    };

/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.gettotallmocountdataMdl = function (user) {
    var fnm = "gettotallmocountdataMdl"
    var QRY_TO_EXEC = `SELECT count(agnt_id) as count from agnt_lst_t where agnt_ctgry_id = 1 and onbrd_in=1;`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, user, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.totalkyctobedoneMdl = function (user) {
    var fnm = "totalkyctobedoneMdl"
    var QRY_TO_EXEC = `SELECT count(distinct(agnt_id)) as count from agnt_lst_t where agnt_ctgry_id = 1 and onbrd_in=1 and agnt_id not in (select distinct(agnt_id) from prepaid_agnt_kyc_dcmnt_lst_t)`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, user, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.totalkycdonedataMdl = function (user) {
    var fnm = "totalkycdonedataMdl"
    var QRY_TO_EXEC = `SELECT count(distinct(p.agnt_id)) as count from agnt_lst_t as a 
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
   where a.agnt_ctgry_id = 1 and a.onbrd_in=1`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,  "hello",user,fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done today count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.kycdonetodayMdl = function (user) {
    var fnm = "kycdonetodayMdl"
    var QRY_TO_EXEC = `SELECT count(distinct(p.agnt_id)) as count from agnt_lst_t as a 
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
   where a.agnt_ctgry_id = 1 and date(p.i_ts)= curdate()`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,  "hello",user,fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.yesterdaydonekycMdl = function (user) {
    var fnm = "yesterdaydonekycMdl"
    var QRY_TO_EXEC = `SELECT count(distinct(a.agnt_id)) as count FROM agnt_lst_t a
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
   where a.agnt_ctgry_id = 1 and date(p.i_ts)=curdate() - INTERVAL 1 day`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,  "hello",user,fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.listkycdonetobeMdl = function (user) {
    var fnm = "listkycdonetobeMdl"
    var QRY_TO_EXEC = `SELECT a.* FROM agnt_lst_t a
   where agnt_ctgry_id = 1 and onbrd_in=1 and a.agnt_id not in (select distinct(agnt_id) from prepaid_agnt_kyc_dcmnt_lst_t)`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,  "hello",user,fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.listkycdoneMdl = function (user) {
    var fnm = "listkycdoneMdl"
    var QRY_TO_EXEC = `SELECT p.*,d.dstrt_nm,m.mndl_nm,a.agnt_cd,a.agnt_nm,a.ofce_mbl_nu,date_format(p.i_ts,'%Y-%m-%d %H:%i:%S') as created  FROM agnt_lst_t a
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
	left join new_dstrt_lst_t as d on d.dstrt_id=p.district
    left join new_mndl_lst_t as m on p.mandal=m.mndl_id
   where agnt_ctgry_id = 1 and onbrd_in=1
   group by a.agnt_id
   ORDER BY p.i_ts desc`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,"hello", user, fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.listtodaykycMdl = function (user) {
    var fnm = "listtodaykycMdl"
    var QRY_TO_EXEC = `SELECT p.*,d.dstrt_nm,m.mndl_nm,a.agnt_cd,a.agnt_nm,a.ofce_mbl_nu,date_format(p.i_ts,'%Y-%m-%d %H:%i:%S') as created  FROM agnt_lst_t a
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
	left join new_dstrt_lst_t as d on d.dstrt_id=p.district
    left join new_mndl_lst_t as m on p.mandal=m.mndl_id
   where agnt_ctgry_id = 1 and date(p.i_ts)= curdate()
   GROUP BY a.agnt_id
   ORDER BY p.i_ts desc`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,"hello", user, fnm);
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 28/2/2022   -  durga  - Initial Function
*
**************************************************************************************/

exports.listyesterdaykycMdl = function (user) {
    var fnm = "listyesterdaykycMdl"
    var QRY_TO_EXEC = `SELECT p.*,d.dstrt_nm,m.mndl_nm,a.agnt_cd,a.agnt_nm,a.ofce_mbl_nu,date_format(p.i_ts,'%Y-%m-%d %H:%i:%S') as created from agnt_lst_t a
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
	left join new_dstrt_lst_t as d on d.dstrt_id=p.district
    left join new_mndl_lst_t as m on p.mandal=m.mndl_id
   where agnt_ctgry_id = 1 and date(p.i_ts)= curdate() - INTERVAL 1 day
   GROUP BY a.agnt_id 
   ORDER BY p.i_ts desc`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,"hello", user, fnm);
}


/*****************************************************************************
* Function       : dstrctlstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.dstrctlstMdl = function (data, user) {
    var fnm = "dstrctlstMdl"
    var QRY_TO_EXEC = `select * from new_dstrt_lst_t`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : newmndllstlstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.newmndllstlstMdl = function (id, user) {
    var fnm = "newmndllstlstMdl"
    var QRY_TO_EXEC = `select * from new_mndl_lst_t where dstrt_id=${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/**************************************************************************************
* Controller     : testcodedropanddelMdl
* Parameters     : req,res()
* Description    : kyc done yesterday count
* Change History :
* 26/07/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.testcodedropanddelMdl = function (data,user) {
    var fnm = "testcodedropanddelMdl"

    //var QRY_TO_EXEC = `${data.qry}`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user,fnm);
}

/*****************************************************************************
* Function       : MTD compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.monthtodatecomplaintsCtrlMdl = function (user, callback) {
    var fnm = "monthtodatecomplaintsCtrlMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }

    var QRY_TO_EXEC = `select count(*) as count from prepaid_create_complaint as pc
     join caf_dtl_t as c on c.caf_id = pc.caf_id 
     where created_date between '${currntYear}-${currntMnth}-01' and curdate() ${whr}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : today compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.todaycomplaintscountCtrlMdl = function (user, callback) {
    var fnm = "todaycomplaintscountCtrlMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }


    var QRY_TO_EXEC = `select count(*) as count from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id = pc.caf_id 
     where date(created_date) =curdate() ${whr};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : sbscrbrapp compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.subscriberappcomplaintscntCtrlMdl = function (user, callback) {
    var fnm = "subscriberappcomplaintscntCtrlMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }


    var QRY_TO_EXEC = `select count(*) as count from prepaid_create_complaint as pc
     join caf_dtl_t as c on c.caf_id = pc.caf_id 
     where created_by= 'Self Assign' ${whr};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : completed compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.completeticketsCtrlMdl = function (user, callback) {
    var fnm = "completeticketsCtrlMdl"
      
    var date = new Date();
    
    var currntMnth = (new Date().getMonth() + 1).toString().padStart(2, "0");
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }


    var QRY_TO_EXEC = `select  format(COUNT(CASE
            WHEN pc.comp_status = 1 THEN 1
            ELSE NULL
        END), 'NO') AS 'open',
        format(COUNT(CASE
            WHEN pc.comp_status = 2 THEN 1
            ELSE NULL
        END), 'NO') AS 'resolved',
        format(COUNT(CASE
            WHEN pc.comp_status = 3 THEN 1
            ELSE NULL
            END), 'NO') AS 'close',
		count(*) as 'Total'
           from prepaid_create_complaint  as pc
           join caf_dtl_t as c on c.caf_id = pc.caf_id 
           where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() ${whr}`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : completed compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.todaycomplaintsCtrlMdl = function (user, callback) {
    var fnm = "todaycomplaintsCtrlMdl"


    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }
    var QRY_TO_EXEC = `select  format(COUNT(CASE
    WHEN pc.comp_status = 1 THEN 1
    ELSE NULL
     END), 'NO') AS 'open',
    format(COUNT(CASE
    WHEN pc.comp_status = 2 THEN 1
    ELSE NULL
   END), 'NO') AS 'resolved',
   format(COUNT(CASE
    WHEN pc.comp_status = 3 THEN 1
    ELSE NULL
    END), 'NO') AS 'close',
    count(*) as 'Total'
   from prepaid_create_complaint  as pc
   join caf_dtl_t as c on c.caf_id = pc.caf_id 
     where date(created_date) =curdate() ${whr}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : getcafdtlsfrlmodatMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getcafdtlsfrlmodatMdl = function (data, user) {
    var fnm = "getcafdtlsfrlmodatMdl"
    var QRY_TO_EXEC = `SELECT c.caf_id, c.caf_nu,c.mbl_nu,c.actvn_dt,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.iptv_srl_nu,c.iptv_mac_addr_tx,cst.cstmr_nm as frst_nm,cst.lst_nm,cst.cstmr_id,cst.cstmr_nm,c.instl_lcly_tx,cs.sts_nm,cs.sts_clr_cd_tx,c.enty_sts_id,DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') as spnd_ts,
    DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_ts,DATE_FORMAT(c.trmnd_ts,'%d-%m-%Y') as trmnd_ts,fr.frqncy_nm,
    ct.caf_type_nm, md.mdle_nm as onu_mdl_nm,md1.mdle_nm as iptv_mdl_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.adhr_nu as full_adhr_nu,c.mdlwe_sbscr_id,
    c.olt_prt_nm,c.olt_crd_nu,c.olt_prt_splt_tx,group_concat(vps.phne_nu) as phne_nu,count(vps.phne_nu) as phne_nu_cnt,c.caf_type_id,
    '' as pswrd_txt,md.emi_at,pl.pckge_nm,pl.pckge_id,
    c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    v.vlge_nm,m.mndl_nm,d.dstrt_nm, c.instl_ste_id, c.instl_std_cd, cst.loc_eml1_tx as email, cst.loc_std_cd,alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,c.aghra_cd,c.aaa_cd,
    c.olt_id,c.pop_id,c.olt_ip_addr_tx,c.olt_srl_nu,c.olt_prt_nm,c.olt_prt_splt_tx,
    c.olt_ip_addr_tx ,ol.olt_srl_nu ,ol.olt_nm,ol.pop_id,ol.sbstn_unq_cd,ol.olt_srl_nu,ol.sbstn_nm,
    DATE_FORMAT(ol.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as  oprnl_sts_chnge_ts,DATE_FORMAT(ol.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts
    ,DATE_FORMAT(ol.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,oste.ste_nm,ast.sts_nm as ahgra_sts_nm,
    cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,
	DATE_FORMAT(date(c.actvn_dt),'%d-%m-%Y') as actvn_dts,
    DATE_FORMAT(date(c.rsme_ts),'%d-%m-%Y') as rsme_dts,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts,c.tp_ct,c.olt_onu_id
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    left JOIN inv_stpbx_lst_t as i on i.caf_id=c.caf_id AND i.prdct_id =1
    left JOIN inv_stpbx_lst_t as i1 on i1.caf_id=c.caf_id AND i1.prdct_id =2
    left JOIN inv_prdct_mdle_lst_t as md on md.mdle_id=i.mdle_id
    left JOIN inv_prdct_mdle_lst_t as md1 on md1.mdle_id=i1.mdle_id
    left JOIN vlge_lst_t v ON v.vlge_nu = cst.loc_vlge_id and v.mndl_id = cst.loc_mndl_id AND v.dstrt_id = cst.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id and vp.a_in = 1
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where (c.caf_id=${data.caf_id} OR c.onu_srl_nu=${data.caf_id} OR c.iptv_srl_nu=${data.caf_id} ) and c.lmo_agnt_id=${user.usr_ctgry_ky}
    GROUP BY c.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : list complaints compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.totalsubscribercomplaintslistMdl = function (user, callback) {
    var fnm = "totalsubscribercomplaintslistMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }


	var QRY_TO_EXEC = `select  format(COUNT(CASE
		WHEN pc.comp_status = 1 THEN 1
		ELSE NULL
	END), 'NO') AS 'open',
	format(COUNT(CASE
		WHEN pc.comp_status = 2 THEN 1
		ELSE NULL
	END), 'NO') AS 'resolved',
	format(COUNT(CASE
		WHEN pc.comp_status = 3 THEN 1
		ELSE NULL
		END), 'NO') AS 'close',
		count(*) as 'Total'
	   from prepaid_create_complaint  as pc
	   join caf_dtl_t as c on c.caf_id = pc.caf_id 
	   where created_by= 'Self Assign' ${whr}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : MTD compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.mtdCtrlMdl = function (data,user, callback) {
    var fnm = "mtdCtrlMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var cmpsts = ``;
    var where_cnd = ``;
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;


    if (data.cmpstus == '1') {
        cmpsts = ` and pc.comp_status = 1`;
    } else if (data.cmpstus == '2') {
        cmpsts = ` and pc.comp_status = 2`;
    } else if (data.cmpstus == '3') {
        cmpsts = ` and pc.comp_status= 3`;
    } else {
		cmpsts = ``
	}

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and pc.comp_ticketno like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    if (data.frm_dt && data.to_dt) {
        where_cnd += ` and date(pc.created_date) between '${data.frm_dt}' and '${data.to_dt}' `
    } else {
		where_cnd += ` and date(pc.created_date) between '${currntYear}-${currntMnth}-01' and curdate()`
	}
    console .log ("suscess",user.usr_ctgry_id);

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }

    var QRY_TO_EXEC = `select 
    ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,c.caf_id,comp_ticketno as ticket_No,c.mbl_nu as Mbl_nu ,pc.complaint_id,pc.created_date,pc.comp_ticket_type,pc.complaint,pc.comp_cat,pp2.category as cmp_sts,cd.cstmr_nm, 
    (CASE WHEN pc.complaint_owner=4 THEN pc.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_assigned_to,
    pc.complaint_assigned_to ,pp.category as comp_cat_name,pc.comp_status as comp_sts_id from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id = pc.caf_id 
    join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    join prepaid_complaint_prefer as pp on pp.id = pc.comp_cat
	left join prepaid_complaint_prefer as pp2 on pp2.scope=pc.comp_status and pp2.type=100 and pp2.app_type=100
    left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=pc.complaint_assigned_to
    where 1=1  ${where_cnd} ${whr} ${cmpsts}  ORDER BY c.caf_id  limit ${pge_nu}, ${pag_size};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : tdy compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.tdycmplaintsCtrlMdl = function (data,user, callback) {
    var fnm = "tdycmplaintsCtrlMdl"
    var date = new Date();


    var cmpsts = ``;
    var where_cnd = ``;
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;

    if (data.cmpstus == '1') {
        cmpsts = ` and pc.comp_status = 1`;
    } else if (data.cmpstus == '2') {
        cmpsts = ` and pc.comp_status = 2`;
    } else if (data.cmpstus == '3') {
        cmpsts = ` and pc.comp_status = 3`;
    } else {
		cmpsts = ``
	}

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and pc.comp_ticketno like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
   

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }

    var QRY_TO_EXEC = `select 
    ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,c.caf_id,comp_ticketno as ticket_No,c.mbl_nu as Mbl_nu ,pc.complaint_id,pc.created_date,pc.comp_ticket_type,pc.complaint,pc.comp_cat,pp2.category as cmp_sts,cd.cstmr_nm, 
    (CASE WHEN pc.complaint_owner=4 THEN pc.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_assigned_to,
    pc.complaint_assigned_to ,pp.category as comp_cat_name,pc.comp_status as comp_sts_id from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id = pc.caf_id 
    join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    join prepaid_complaint_prefer as pp on pp.id = pc.comp_cat
	left join prepaid_complaint_prefer as pp2 on pp2.scope=pc.comp_status and pp2.type=100 and pp2.app_type=100
    left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=pc.complaint_assigned_to
    where date(created_date) = curdate() ${where_cnd} ${whr} ${cmpsts}  ORDER BY c.caf_id  limit ${pge_nu}, ${pag_size};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : tdy compalints
* Description    : 
* Arguments      : callback function
* Change History :
* 19/9/2022   - Durga - Initial Function
******************************************************************************/

exports.totalsbscribersCtrlMdl = function (data,user, callback) {
    var fnm = "totalsbscribersCtrlMdl"

console .log ("suscess",data.cmpstus);
    var cmpsts = ``;
    var where_cnd = ``;
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;

    if (data.cmpstus == '1') {
        cmpsts = ` and pc.comp_status = 1`;
    } else if (data.cmpstus == '2') {
        cmpsts = ` and pc.comp_status = 2`;
    } else if (data.cmpstus == '3') {
        cmpsts = ` and pc.comp_status = 3`;
    } else {
		cmpsts = ``
	}

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and pc.comp_ticketno like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    if (data.frm_dt && data.to_dt) {
        where_cnd += ` and date(pc.created_date) between '${data.frm_dt}' and '${data.to_dt}' `
    }

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }

    var QRY_TO_EXEC = `select 
     ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,c.caf_id,comp_ticketno as ticket_No,c.mbl_nu as Mbl_nu ,pc.complaint_id,pc.created_date,pc.comp_ticket_type,pc.complaint,pc.comp_cat,pp2.category as cmp_sts,cd.cstmr_nm, 
    (CASE WHEN pc.complaint_owner=4 THEN pc.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_assigned_to,
    pc.complaint_assigned_to ,pp.category as comp_cat_name,pc.comp_status as comp_sts_id from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id = pc.caf_id 
    join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    join prepaid_complaint_prefer as pp on pp.id = pc.comp_cat
	left join prepaid_complaint_prefer as pp2 on pp2.scope=pc.comp_status and pp2.type=100 and pp2.app_type=100
    left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=pc.complaint_assigned_to
    where created_by= 'Self Assign' ${where_cnd} ${whr} ${cmpsts} ORDER BY c.caf_id  limit ${pge_nu}, ${pag_size};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : openclosereslvdtickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.openclosereslvdticketsCtrlMdl = function (data, user) {
    var fnm = "openclosereslvdticketsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'
       from prepaid_create_complaint  
       where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : openclosereslvdtickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.openclosereslvdticketsCountMdl = function (data, user) {
    var fnm = "openclosereslvdticketsCountMdl"

    var QRY_TO_EXEC = ` select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'
       from prepaid_create_complaint  
       where date(created_date) =curdate();`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : presentmnthenterprise Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.presentmnthenterpriseCtrlMdl = function (data, user) {
    var fnm = "presentmnthenterpriseCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select format(COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END), 'NO') AS 'Open',
    format(COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END), 'NO') AS 'Resolved',
    format(COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END), 'NO') AS 'Close',
        count(*) as 'Total_Tickets' from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousmnthenterprisetickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmnthenterpriseticketsCtrlMdl = function (data, user) {
    var fnm = "previousmnthenterpriseticketsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = `select format(COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END), 'NO') AS 'Open',
    format(COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END), 'NO') AS 'Resolved',
    format(COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END), 'NO') AS 'Close',
        count(*) as 'Total_Tickets'  
       from prepaid_create_complaint  as pc
       join caf_dtl_t as c on c.caf_id =pc.caf_id
      where date(created_date) between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : presentmnthdomestictckts Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.presentmnthdomestictcktsCtrlMdl = function (data, user) {
    var fnm = "presentmnthdomestictcktsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select count(*) as Domestic from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() and c.caf_type_id=1 ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : presentmnthgrievance Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.presentmnthgrievanceCtrlMdl = function (data, user) {
    var fnm = "presentmnthgrievanceCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select count(*)  as Greviences from general_enquiries where date(i_ts) between '${currntYear}-${currntMnth}-01' and curdate() and tckt_typ in (1,2);`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : yesterdayticketsCtrl Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.yesterdayticketsCtrlMdl = function (data, user) {
    var fnm = "yesterdayticketsCtrlMdl"



    var QRY_TO_EXEC = ` select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'
       from prepaid_create_complaint  
       where date(created_date) = curdate() - INTERVAL 1 DAY ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : openclosereslvdtickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.sourceprsntmnthCtrlMdl = function (data, user) {
    var fnm = "sourceprsntmnthCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();



    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN created_by = 'Self Assign' THEN 1
        ELSE NULL
    END) AS 'subcriber_app',
    COUNT(CASE
        WHEN created_by = 'LMO APP' THEN 1
        ELSE NULL
    END) AS 'lmo_app',
    COUNT(CASE
        WHEN created_by not in ( 'LMO APP','Self Assign' ) THEN 1
        ELSE NULL
    END) AS 'call_center',
      count(*) as 'total_tickets'
       from prepaid_create_complaint 
      where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate();`



    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : sourceprvsmnthCtrl Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.sourceprvsmnthCtrlMdl = function (data, user) {
    var fnm = "sourceprvsmnthCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN created_by = 'Self Assign' THEN 1
        ELSE NULL
    END) AS 'subcriber_app',
    COUNT(CASE
        WHEN created_by = 'LMO APP' THEN 1
        ELSE NULL
    END) AS 'lmo_app',
    COUNT(CASE
        WHEN created_by not in ( 'LMO APP','Self Assign' ) THEN 1
        ELSE NULL
    END) AS 'call_center',
      count(*) as 'total_tickets'
       from prepaid_create_complaint  
      where date(created_date) between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       :resumepending
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todayresmependingCtrlMdl = function (user, callback) {
    var fnm = "todayresmependingCtrlMdl"

    var QRY_TO_EXEC = `select count(*) as 'resume_pending' from caf_dtl_t where enty_sts_id=85 and date(rsme_ts)= curdate() ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :todaypendingactivation
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todaypendingactivationCtrlMdl = function (user, callback) {
    var fnm = "todaypendingactivationCtrlMdl"

    var QRY_TO_EXEC = ` select count(*) as 'pending_activation' from caf_dtl_t where enty_sts_id=1 and date(actvn_ts)= curdate() ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :todaysuspndpending
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todaysuspndpendingCtrlMdl = function (user, callback) {
    var fnm = "todaysuspndpendingCtrlMdl"

    var QRY_TO_EXEC = ` select count(*) as 'suspend_pending' from caf_dtl_t where enty_sts_id=84 and date(spnd_ts)= curdate() ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :todaysuspndpending
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todayterminationpendingCtrlMdl = function (user, callback) {
    var fnm = "todayterminationpendingCtrlMdl"

    var QRY_TO_EXEC = `select count(*) as 'termination_pending' from caf_dtl_t where enty_sts_id=45 and date(trmnd_ts)= curdate();`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :todaysuspndpending
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todayboxchnageCtrlMdl = function (user, callback) {
    var fnm = "todayboxchnageCtrlMdl"

    var QRY_TO_EXEC = `select count(*) as 'box_change' from caf_dtl_t where enty_sts_id=10 ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :todayponchange
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.todayponchangeCtrlMdl = function (user, callback) {
    var fnm = "todayponchangeCtrlMdl"

    var QRY_TO_EXEC = `select count(*) as 'pon_change' from caf_dtl_t where enty_sts_id=11 ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       :categorywisecomplaints
* Description    : 
* Arguments      : callback function
* Change History :
* 29/10/2022   - durga - Initial Function
******************************************************************************/
exports.categorywisecomplaintsCtrlMdl = function (user, callback) {
    var fnm = "categorywisecomplaintsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();


    var QRY_TO_EXEC = `select * from (select count(*) as count,pc.category from prepaid_create_complaint as p
    join prepaid_complaint_prefer as pc on pc.id=p.comp_cat
    where date(p.created_date) between '${currntYear}-${currntMnth}-01' and curdate()
    group by pc.id ) as a order by count desc limit 6; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : previousmnthtickts Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmnthticktsCtrlMdl = function (data, user) {
    var fnm = "previousmnthticktsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'
       from prepaid_create_complaint  
       where date(created_date)  between  '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}';`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function       : singleSbscrkycDatacountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.singleSbscrkycDatacountMdl = function (data, user) {
    var fnm = "singleSbscrkycDatacountMdl"
    var QRY_TO_EXEC = `select format(COUNT(CASE
        WHEN kyc_doc_in = 1 THEN 1
        ELSE NULL
    END), 'NO') AS 'COMPLETED',
    format(COUNT(CASE
        WHEN kyc_doc_in = 0 THEN 1
        ELSE NULL
    END), 'NO') AS 'NOT_COMPLETED',
      count(*) as 'TOTAL_CAFs' from caf_dtl_t where  enty_sts_id not in (8,45);`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : kyc done today count
* Change History :
* 07/11/2022   -  ramesh  - Initial Function extrnl_PrpdAppcafcount
*
**************************************************************************************/

exports.kycdonetodayyesterdaydataMdl = function (user) {
    var fnm = "kycdonetodayyesterdaydataMdl"
    var QRY_TO_EXEC = `SELECT count(distinct(p.agnt_id)) as count,'KYC DONE TODAY' from agnt_lst_t as a 
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
   where a.agnt_ctgry_id = 1 and date(p.i_ts)= curdate() union all
   SELECT count(distinct(p.agnt_id)) as count,'KYC DONE YESTERDAY' from agnt_lst_t as a 
    join prepaid_agnt_kyc_dcmnt_lst_t p on p.agnt_id = a.agnt_id
   where a.agnt_ctgry_id = 1 and date(p.i_ts)= curdate() - interval 1 day`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/*****************************************************************************
* Function       : SbscrAppAmntcountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.SbscrAppAmntcountMdl = function (data, user) {
    var fnm = "SbscrAppAmntcountMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
    } else {
        var pervsMnth = date.getMonth();
    }
    if (currntMnth == 1) {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear() - 1;
        pervsMnth = 12;
    } else {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    var QRY_TO_EXEC = `select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as 'total', 'Today amount' as 'Today amount' 
        from caf_pckge_prchse_dtl_t where prpd_in=2 and cycle_strt_dt=curdate() union all
        select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as 'total', 'Yesterday amount' as 'Yesterday amount' 
        from caf_pckge_prchse_dtl_t where prpd_in=2 and cycle_strt_dt=curdate() - interval 1 day union all
        select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as 'total', 'YTD' as 'YTD' 
        from caf_pckge_prchse_dtl_t where prpd_in in (2,1) and cycle_strt_dt>'${currntYear}-01-01' union all
        select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as 'total', 'PREVIOUS MONTH' as 'PREVIOUS MONTH' 
        from caf_pckge_prchse_dtl_t where prpd_in=2 and cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' union all
        select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as 'total', 'CURRENT MONTH' as 'CURRENT MONTH' 
        from caf_pckge_prchse_dtl_t where prpd_in=2 and cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE()`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : SbscrAppchnlcountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.SbscrAppchnlcountMdl = function (data, user) {
    var fnm = "SbscrAppchnlcountMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
    } else {
        var pervsMnth = date.getMonth();
    }
    if (currntMnth == 1) {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear() - 1;
        pervsMnth = 12;
    } else {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    var QRY_TO_EXEC = `select count(*) as total, 'TODAY ACTIVATED' from caf_pckge_prchse_dtl_t where prpd_in=1 and a_in=1 and cycle_strt_dt = CURDATE() union all
        select count(*) as total, 'TODAY DEACTIVATE' from caf_pckge_prchse_dtl_t where prpd_in=2 and a_in=1 and cycle_end_dt = CURDATE() union all
        select count(*) as total, 'FIVE DAY EXPIRY' from caf_pckge_prchse_dtl_t where prpd_in=2 and a_in=1 and cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 5 DAY) union all
        select count(*) as total, 'THREE DAY EXPIRY' from caf_pckge_prchse_dtl_t where prpd_in=2 and a_in=1 and cycle_end_dt = DATE_ADD(CURDATE(), INTERVAL 3 DAY) union all
        select count(*) as total, 'CURRENT MONTH' from caf_pckge_prchse_dtl_t where prpd_in=2 and a_in=1 and cycle_strt_dt between '${currntYear}-${currntMnth}-01' and CURDATE() union all
        select count(*) as total, 'PREVIOUS MONTH' from caf_pckge_prchse_dtl_t where prpd_in=2 and a_in=1 and cycle_strt_dt between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' union all
        select count(*) as total, 'Failed Count' from subscriber_app_retrack_pckgs where service_type='ADD SERVICE PACK' and date(i_ts)=curdate()`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : PrpdAppcafcountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.PrpdAppcafcountMdl = function (data, user) {
    var fnm = "PrpdAppcafcountMdl"
    var QRY_TO_EXEC = `select format(COUNT(CASE
        WHEN enty_sts_id = 6 THEN 1
        ELSE NULL
    END), 'NO') AS 'Active',
    format(COUNT(CASE
        WHEN enty_sts_id = 7 THEN 1
        ELSE NULL
    END), 'NO') AS 'Suspend',format(COUNT(CASE
        WHEN enty_sts_id = 8 THEN 1
        ELSE NULL
    END), 'NO') AS 'Terminate',
    format(COUNT(CASE
        WHEN enty_sts_id = 45 THEN 1
        ELSE NULL
    END), 'NO') AS 'Terminate_Pending',format(COUNT(CASE
        WHEN enty_sts_id = 84 THEN 1
        ELSE NULL
    END), 'NO') AS 'Suspend_pending',
    format(COUNT(CASE
        WHEN enty_sts_id = 85 THEN 1
        ELSE NULL
    END), 'NO') AS 'Resume_pending',format(COUNT(CASE
        WHEN enty_sts_id = 1 THEN 1
        ELSE NULL
    END), 'NO') AS 'Pending_activation',
    format(COUNT(CASE
        WHEN enty_sts_id = 10 THEN 1
        ELSE NULL
    END), 'NO') AS 'Box_change_initiated',
    format(COUNT(CASE
        WHEN enty_sts_id = 11 THEN 1
        ELSE NULL
    END), 'NO') AS 'Pon_change_initiated',count(*) as 'total_cafs' from caf_dtl_t as c
    join agnt_lst_t as a on c.lmo_agnt_id=a.agnt_id where a.prpd_flag=1;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : PrpdAppcafclctnrevneamtndcountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.PrpdAppcafclctnrevneamtndcountMdl = function (data, user) {
    var fnm = "PrpdAppcafclctnrevneamtndcountMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
    } else {
        var pervsMnth = date.getMonth();
    }
    if (currntMnth == 1) {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear() - 1;
        pervsMnth = 12;
    } else {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as count, 'Today Expired CAFs' as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 and cp.a_in=1 and cp.cycle_end_dt=curdate() union all
select count(distinct(c.caf_id)) as count, 'MTD Renewed Cafs' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where cp.a_in=1 and p.pckge_type_id=1 and f.ac_date between
     '${currntYear}-${currntMnth}-01' and curdate() union all
select count(distinct(c.caf_id)) as count, 'Today Renewed Cafs' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where  p.pckge_type_id=1 and  f.ac_date = curdate() union all
select cast(SUM(amt) as decimal(10,2)) as count, 'MTD Online Collection' as 'expired_caf'  from sub_alacarte_transaction as s
    join caf_dtl_t as c on c.caf_id=s.caf_id
     where f_code='Ok' and date(s.i_ts) between '${currntYear}-${currntMnth}-01' and curdate() union all
select ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as count, 'APSFL Today Revenue' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    where f.ac_date = curdate() and p.pckge_type_id=1 union all
select round(ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0)) as count, 'MTD Apsfl Revenue' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    where f.ac_date between '${currntYear}-${currntMnth}-01' and curdate() and p.pckge_type_id=1 union all
select ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*mso_share/100)+round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as count, 'MTD Apsfl Collection' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    where f.ac_date between '${currntYear}-${currntMnth}-01' and curdate()  union all
select ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*mso_share/100)+round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as count, 'Apsfl Today Collection' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    where f.ac_date = curdate() union all
select count(*) as count, 'Prepaid LMO Count' as 'expired_caf'  from agnt_lst_t where prpd_flag=1 union all
select count(distinct(c.caf_id) ) as count, 'MTD Advance Recharge Cafs' as 'expired_caf'  from caf_pckge_prchse_dtl_t as cp
    join caf_dtl_t as c on c.caf_id = cp.caf_id 
     where advance_recharge=1 and cycle_strt_dt between '${currntYear}-${currntMnth}-01' and curdate()`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : prpdcmplntscountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.prpdcmplntscountMdl = function (data, user) {
    var fnm = "prpdcmplntscountMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
    } else {
        var pervsMnth = date.getMonth();
    }
    if (currntMnth == 1) {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear() - 1;
        pervsMnth = 12;
    } else {
        var currntYear = new Date().getFullYear();
        var pervsYear = new Date().getFullYear();
    }
    var days = new Date(pervsYear, pervsMnth, 0).getDate();
    var QRY_TO_EXEC = `   select format(COUNT(CASE WHEN comp_status = 1 THEN 1 ELSE NULL END), 'NO') AS 'open',format(COUNT(CASE WHEN comp_status = 2 THEN 1 ELSE NULL END), 'NO') AS 'resolve',format(COUNT(CASE WHEN comp_status in (3,4) THEN 1 ELSE NULL END), 'NO') AS 'close',count(*) as 'total','All complaints' from prepaid_create_complaint union all
    select format(COUNT(CASE WHEN comp_status = 1 THEN 1 ELSE NULL END), 'NO') AS 'open', format(COUNT(CASE WHEN comp_status = 2 THEN 1 ELSE NULL END), 'NO') AS 'resolve', format(COUNT(CASE WHEN comp_status in (3,4) THEN 1 ELSE NULL END), 'NO') AS 'close', count(*) as 'total','Previous month complaints' from prepaid_create_complaint where date(created_date) between '${pervsYear}-${pervsMnth}-01' and '${pervsYear}-${pervsMnth}-${days}' union all
     select format(COUNT(CASE WHEN comp_status = 1 THEN 1 ELSE NULL END), 'NO') AS 'open', format(COUNT(CASE WHEN comp_status = 2 THEN 1 ELSE NULL END), 'NO') AS 'resolve', format(COUNT(CASE WHEN comp_status in (3,4) THEN 1 ELSE NULL END), 'NO') AS 'close', count(*) as 'total','Current month complaints' from prepaid_create_complaint where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : singletotallmocountMdl
* Description    : 
 07/11/2022   -  ramesh  - Initial Function
******************************************************************************/
exports.singletotallmocountMdl = function (data, user) {
    var fnm = "singletotallmocountMdl"
    var QRY_TO_EXEC = `SELECT format(COUNT(CASE
        WHEN kyc_doc_in = 1 THEN 1
        ELSE NULL
    END), 'NO') AS 'COMPLETED',
    format(COUNT(CASE
        WHEN kyc_doc_in = 0 THEN 1
        ELSE NULL
    END), 'NO') AS 'NOT_COMPLETED',count(agnt_id) as 'TOTAL_LMOs' from agnt_lst_t where agnt_ctgry_id = 1 and onbrd_in=1;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : cllrtypeMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.cllrtypeMdl = function (data, user) {
    var fnm = "cllrtypeMdl"

    var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=5`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : cllattndbyMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.cllattndbyMdl = function (data, user) {
    var fnm = "cllattndbyMdl"

    var QRY_TO_EXEC = `SELECT complaint_sub_emp_id,complaint_owner_id,complaint_sub_emp_name,emp_active,a_in 
    FROM complaint_sub_employees 
    WHERE a_in = 1 AND complaint_owner_id in (1,11)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : presentmnthenterprise Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.prsntmnthentrpriselstCtrlMdl = function (data, user) {
    var fnm = "prsntmnthentrpriselstCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    if (data == '1') {
        cmpsts = ` and p.comp_status = 1`;
    } else if (data == '2') {
        cmpsts = ` and p.comp_status = 2`;
    } else if (data == '3') {
        cmpsts = ` and p.comp_status= 3`;
    } else {
        cmpsts = ``
    }

    var QRY_TO_EXEC = `select  ROW_NUMBER() OVER (
        ORDER BY p.caf_id
        ) sno,pp.category as 'Category',pp1.category as callertype,pp3.category as ent_orgn_name,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') as datediff,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm as districtname,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join prepaid_complaint_prefer as pp3 on pp3.id=p.Organization_Name
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
    where 
    date(created_date) between '${currntYear}-${currntMnth}-01' and curdate()
    and c1.caf_type_id=2 ${cmpsts} ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousmnthentrpriselstmdl
* Description    : 
 02/11/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmnthentrpriselstCtrlMdl = function (data, user) {
    var fnm = "previousmnthentrpriselstCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    if (data == '1') {
        cmpsts = ` and p.comp_status = 1`;
    } else if (data == '2') {
        cmpsts = ` and p.comp_status = 2`;
    } else if (data == '3') {
        cmpsts = ` and p.comp_status= 3`;
    } else {
        cmpsts = ``
    }


    var QRY_TO_EXEC = `select  ROW_NUMBER() OVER (
        ORDER BY p.caf_id
        ) sno,pp.category as 'Category',pp1.category as callertype,pp3.category as ent_orgn_name,'Edit' as 'Edit',p.*,DATE_FORMAT(p.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(p.created_date,'%d-%m-%Y') as createdDate,pp2.category as cmp_sts,CASE WHEN c1.caf_type_id=1 then 'Domestic' 
    WHEN c1.caf_type_id=2 then 'Enterprise' end as caftype,time_format(timediff(current_timestamp(),p.created_date),'%H:%i:%s') as datediff,(CASE WHEN p.created_by='Self Assign' then p.created_by ELSE m.mrcht_usr_nm END) as mrcht_usr_nm,d.dstrt_nm as districtname,co.complaint_owner_name as cmplnt_owner,(CASE WHEN p.complaint_owner=4 THEN p.complaint_assigned_to ELSE cse.complaint_sub_emp_name END) as cmplnt_emp
  from prepaid_create_complaint as p 
  left join prepaid_complaint_prefer as pp on pp.id=p.comp_cat
  left join prepaid_complaint_prefer as pp1 on pp1.id=p.caller_type
  left join prepaid_complaint_prefer as pp3 on pp3.id=p.Organization_Name
  left join prepaid_complaint_prefer as pp2 on pp2.scope=p.comp_status and pp2.type=100 and pp2.app_type=100
  left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.created_by
  left join complaint_owners as co on co.complaint_owner_id=p.complaint_owner
  join caf_dtl_t as c1 on c1.caf_id=p.caf_id
  left join new_dstrt_lst_t as d on d.dstrt_id = p.new_district 
  left join complaint_sub_employees as cse on cse.complaint_sub_emp_id=p.complaint_assigned_to
      where date(created_date)  between  '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' and c1.caf_type_id=2 ${cmpsts};`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function       : enterprise Mdl
* Description    : 
 30/11/2022   -  durga  - Initial Function
******************************************************************************/
exports.enterprisecountMdl = function (data, user) {
    var fnm = "enterprisecountMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select count(*) as enterprise from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousenterpriseMdl
* Description    : 
 30/11/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmonthenterprisecountMdl = function (data, user) {
    var fnm = "previousmonthenterprisecountMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = `select  count(*) as enterprise 
       from prepaid_create_complaint  as pc
       join caf_dtl_t as c on c.caf_id =pc.caf_id
      where date(created_date) between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/*****************************************************************************
* Function       : previousmnthdomestictickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmonthdomesticcountMdl = function (data, user) {
    var fnm = "previousmonthdomesticcountMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = `  select count(*) as 'domestic'
    from prepaid_create_complaint  as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
   where date(created_date) between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' and c.caf_type_id=1;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/*****************************************************************************
* Function       : previousmnthgravences Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmonthgrivancescountMdl = function (data, user) {
    var fnm = "previousmonthgrivancescountMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = ` select count(*) as 'grevience' from general_enquiries where date(i_ts)between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}'  and tckt_typ in (1,2);`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousmnthdomestictickets Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousmnthdomesticticketsCtrlMdl = function (data, user) {
    var fnm = "previousmnthdomesticticketsCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();
    var currntMnth = date.getMonth() + 1;
    if (currntMnth == 1) {
        var pervsMnth = 12;
        var currntYear = new Date().getFullYear() - 1;
    } else {
        var pervsMnth = date.getMonth();
    }

    var days = new Date(currntYear, pervsMnth, 0).getDate();

    var QRY_TO_EXEC = ` select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'  
       from prepaid_create_complaint  as pc
       join caf_dtl_t as c on c.caf_id =pc.caf_id
      where date(created_date) between '${currntYear}-${pervsMnth}-01' and '${currntYear}-${pervsMnth}-${days}' and c.caf_type_id=1;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : presentmnthentrpriseopnclereslvd Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.prsntmnthdomesticopnclsereslvedCtrlMdl = function (data, user) {
    var fnm = "prsntmnthdomesticopnclsereslvedCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` 
    select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'  from  prepaid_create_complaint as pc
   join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() and c.caf_type_id=1;`


    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousdomestictickets 
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousdomesticticketsCtrlMdl = function (data, user) {
    var fnm = "previousdomesticticketsCtrlMdl"

    //var date = new Date();
    //var currntMnth = date.getMonth() + 1
    //var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'  from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) =curdate() - interval 1 day and c.caf_type_id=1 ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : todayenterprisetickets 
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.todaydomesticticketsCtrlMdl = function (data, user) {
    var fnm = "todaydomesticticketsCtrlMdl"

    //var date = new Date();
    //var currntMnth = date.getMonth() + 1
    //var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'  from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) =curdate() and c.caf_type_id=1 ;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : presentmnthentrpriseopnclereslvd Mdl
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.presentmnthentrpriseopnclereslvdCtrlMdl = function (data, user) {
    var fnm = "presentmnthentrpriseopnclereslvdCtrlMdl"

    var date = new Date();
    var currntMnth = date.getMonth() + 1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `  
    select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets'  from  prepaid_create_complaint as pc
   join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) between '${currntYear}-${currntMnth}-01' and curdate() and c.caf_type_id=2;`


    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : previousenterprisetickets 
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.previousenterpriseticketsCtrlMdl = function (data, user) {
    var fnm = "previousenterpriseticketsCtrlMdl"

    //var date = new Date();
    //var currntMnth = date.getMonth() + 1
    //var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets' from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) = curdate() - interval 1 day  and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : todayenterprisetickets 
* Description    : 
 28/10/2022   -  durga  - Initial Function
******************************************************************************/
exports.todayenterpriseticketsCtrlMdl = function (data, user) {
    var fnm = "todayenterpriseticketsCtrlMdl"

    //var date = new Date();
    //var currntMnth = date.getMonth() + 1
    //var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = ` select COUNT(CASE
        WHEN comp_status = 1 THEN 1
        ELSE NULL
    END) AS 'Open',
    COUNT(CASE
        WHEN comp_status = 2 THEN 1
        ELSE NULL
    END) AS 'Resolved',
    COUNT(CASE
        WHEN comp_status in (3,4) THEN 1
        ELSE NULL
        END) AS 'Close',
        count(*) as 'Total Tickets' from prepaid_create_complaint as pc
    join caf_dtl_t as c on c.caf_id =pc.caf_id
    where date(created_date) = curdate() and c.caf_type_id=2;`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : killprocesslistidsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.killprocesslistidsMdl = function (data) {
	
    var QRY_TO_EXEC = `SELECT * FROM information_schema.PROCESSLIST where STATE='${data.exc_kill}';`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : processlistidchckMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.processlistidchckMdl = function (data) {
	

    var QRY_TO_EXEC = [];
	for(var i=0;i<data.length;i++){
		QRY_TO_EXEC.push(
			`KILL ${data[i].ID};`
		)
	}

    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : insertnotificationdataMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertnotificationdataMdl = function (data, cafdata, user) {
    var fnm ="insertnotificationdataMdl"
    var text = 'Ticket Created,  for caf id : '+ data.caf_id +', Ticket Number is : '+ cafdata.comp_ticketno+ '' ;
    var kind= 'complaints';
    var title = 'Ticket Raised';
    var QRY_TO_EXEC = ` insert into  app_psh_ntfy_dtl_t (lmo_agnt_id,ntfy_hdr,ntfy_bdy_txt,ntfy_bdy,caf_id,a_in,seen,i_ts) values(${user.usr_ctgry_ky},'${title}','${kind}','${text}',${data.caf_id},1,0,current_timestamp()) `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function       : cllattndbyMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 14/11/2022   - Ramesh P - Initial Function
****************************************************fcmmodel************************************************************** */
exports.sendPushNotificationMdl = function (cafdata,ticketNo, user, callback) {
    var serverKey = 'AAAAF5wWAks:APA91bE67J5oTAC5E_2py3JkTLejs0h2zybtDcG4A7rWY4C04d1AGyBBnHKgbYr8lVU-P4xRII_yb_QQ8s_dfKtDSChmsH1GEMhIWkZHvSIPYifuWm97roN116DTQr5HFxwvVwSY7vqr';
    var fcm = new FCM(serverKey);
    var QRY_TO_EXEC = `select m.fcm_id as fcm_tkn from mrcht_usr_lst_t as m
    join caf_dtl_t as c on c.lmo_agnt_id=m.usr_ctgry_ky where caf_id= ${cafdata.caf_id}`;
    var text = 'Ticket Created,  for caf id : '+ cafdata.caf_id +', Ticket Number is : '+ ticketNo+ '' ;
    console.log(QRY_TO_EXEC, 'qureyfcm')
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log("rows",rows)
            let fcm_token = rows[0].fcm_tkn;
			if(fcm_token == null || fcm_token == '' || fcm_token == undefined || fcm_token == 'undefined' ){
				connection.release();
				callback(false, [])
				return;
			} else {
				var nowdate = new Date();
				//let fcm_token = 'cCbfDH5cQAaWOEpPLTeYeQ:APA91bFJs-NPpeoPHRKWMlhfztTgEtC1zxyX8HWg68Tu_CVwcMRsKw0_nV-VIA9hlEn8K71GE5TZeat8hm0MvHvYkH7B2O505ybIxInEXm_tmV-TCBaK2234xCqRsUTc5dsNajoVnNVq'
				if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
				var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
					to: fcm_token
					// collapse_key: 'your_collapse_key',
					,
					notification: {
						title: 'Ticket Raised',
						body: text,
						kind: 'complaints',
						tag : '.activity.CameraBarcodeScannerActivity'
					},

					data: {  //you can send only notification or only data(or include both)
						complaintsId: ticketNo,
						kind: 'complaints',
						date: nowdate,
						cafId:cafdata.caf_id,
						packId:'',
						title: 'Ticket Raised',
						message: text,
						tag : '.activity.CameraBarcodeScannerActivity',
						type:''
					}
				};
				fcm.send(message, function (err, response) {
					if (err) {
						console.log("Something has gone wrong!");
						console.log(err);
						connection.release();
						callback(true, err); 
						return;
					} else {
						console.log("Successfully sent with response: ", response);
						connection.release();  // Release connection back to Pool
						callback(false, [])
						return;
					}
				});
				//console.log("rows",rows[0]);
				//console.log("rows",rows.fcm_tkn)
			}
        });
    });
}

/*****************************************************************************
* Function       : editcomplaintsCtrlMdl
* Description    : 
 08/11/2022   -  durga  - Initial Function
******************************************************************************/
exports.editcomplaintsCtrlMdl = function (data, user) {
    var fnm = "editcomplaintsCtrlMdl"

    var cmpimg = ``;


    //if (data.compstatus != '' && data.compstatus != null && data.compstatus != undefined) {
    // compstatus = `comp_status=${data.compstatus}`;
    //} 
    if (data.attachments[0].uploadfile != '' && data.attachments[0].uploadfile != null) {
        cmpimg = `comp_image=1,`
    } else {
        cmpimg = `comp_image=0,`
    }

    var QRY_TO_EXEC = ` update prepaid_create_complaint set ${cmpimg} complaint='${data.comments.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}',comp_status=${data.comp_status},edited_on=CURRENT_TIMESTAMP() where comp_ticketno = '${data.comp_ticketno}' ;`


    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);

}

/*****************************************************************************
* Function       : insertcomplaintlog
* Description    : 
* Arguments      : callback function
* Change History :
* 08/11/2022  - durga - Initial Function
******************************************************************************/
exports.insertcomplaintlogCtrlMdl = function (data, user, callback) {
    var fnm = "insertcomplaintlogCtrlMdl"
    var empid = 0;
    if (user.mrcht_usr_id) {
        empid = user.mrcht_usr_id;
    }
    var QRY_TO_EXEC = `insert into complaint_log (complaint_id,comp_status,comments,emp_id,cl_date_created) 
    values ('${data.complaint_id}','${data.comp_status}','${data.comments}','${empid}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : OCCIssueCcCatgrytypeMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 19/11/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.OCCIssueCcCatgrytypeMdl = function (data,cc_occ, user) {
    var fnm = "OCCIssueCcCatgrytypeMdl"

    var QRY_TO_EXEC = `select * from prepaid_complaint_prefer where type=${data} and cc_occ=${cc_occ} order by category asc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : getaddonVodpckgesappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getaddonVodpckgesappMdl = function (pack_ids) {
    var fnm = "getaddonVodpckgesappMdl"
    var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,spr.srvcpk_id, p.pckge_id as package_id,2 as cat_id,p.vod_url as image_url,
    p.pckge_nm as package_name, p.chrge_at as lco_price, p.chrge_at as cust_price, p.gst_at as pack_tax,p.vod_pack,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,p.apsfl_share,p.m2mit_share,p.meemo_share,p.bse_pck_price,p.cpe_rental,p.tax
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 and p.a_in=1 and p.vod_pack=1
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : pckgedatapriceMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/02/2024   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.pckgedatapriceMdl = function (pckge_id, user, callback) {
    var fnm = `pckgedatapriceMdl`
    var QRY_TO_EXEC = `select *,chrge_at+gst_at as ttl_cst from pckge_lst_t where pckge_id in (${pckge_id})`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : chklmoblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/02/2024   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.chklmoblnceFaccountingMdl = function (data, user, callback) {
    var fnm = "chklmoblnceFaccountingMdl"

    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as caf_count,m.* from caf_dtl_t as c
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=c.lmo_agnt_id where c.enty_sts_id not in (8,45) and m.mrcht_usr_id=${user.mrcht_usr_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : updateagntbalMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/02/2024   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateagntbalMdl = function (data, rmbalance, newblnce, result, user, callback) {
    var fnm = "updateagntbalMdl"

    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance='${newblnce}' where mrcht_usr_id=${user.mrcht_usr_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : insrtblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/02/2024   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.insrtblnceFaccountingMdl = function (data, rmbalance, newblnces, result, pckgeprice, reqbody, user, callback) {
    var fnm = "insrtblnceFaccountingMdl"
	var mnth = 1;
	var days = mnth*30;
	var date = new Date(); // Now
	var milliseconds = date.getTime(); 
	milliseconds = "RCPT_ID_"+milliseconds
	var dates = moment(date).format('YYYY-MM-DD')
	date.setDate(date.getDate() + days -1); // Set now + no of days as the new date
	date = moment(date).format('YYYY-MM-DD')
    var QRY_TO_EXEC = `insert into prepaid_f_accounting (mnths,strt_date,end_date,pack_price,receipt_id,operation,admin_id,cust_id,stb_id,money_type,open_bal,amount,
        close_bal,remarks,ac_date,dateCreated,created_by)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
    var newblnce = result.balance;
    var blnce = result.balance;
    var cut = 0;
    console.log("pckgeprice model",pckgeprice);
    if (pckgeprice && pckgeprice.length > 0) {
        var counter = 0;
        pckgeprice.filter((k) => {
            console.log("model k",k)
            if (pckgeprice.length == ++counter) {
                dlmtr = ' ; '
            }
			//if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			 //|| k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
            if(k.vod_pack == 1){
                mnth = 0;
                days = 1;
                date = new Date();
                date.setDate(date.getDate() + 1);  // Set now + 1 no of days as the new date
	            date = moment(date).format('YYYY-MM-DD')
            }
			let pack_price = mnth * (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            newblnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

            cut = (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            valQry += `(${mnth},'${dates}','${date}','${pack_price}','${milliseconds}','add on',
					${user.mrcht_usr_id}, 
					${reqbody.caf_id}, 
					${k.pckge_id},
					'debit',
					'${blnce}',
					'${cut}',
					'${newblnce}',
					'${k.pckge_nm} ( ${days} days amount) (${dates} to ${date})',
					curdate(),
					CURRENT_TIMESTAMP(),${user.usr_ctgry_ky}) ${dlmtr} `;

            blnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function       : getcstmrcmplntbystatusMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 18/01/2024   - Radhika - Initial Function
******************************************************************************/
exports.getcstmrcmplntbystatusMdl = function (data) {
    var fnm = "getcstmrcmplntbystatusMdl"
	console.log(data.caf_id)
    var QRY_TO_EXEC = `SELECT prepaid_create_complaint.*,DATE_FORMAT(prepaid_create_complaint.created_date,'%d-%m-%Y %H:%i:%S') as created_date_time,cu.cstmr_nm as first_name,cu.lst_nm,cu.cntct_mble1_nu,cf.caf_id,
	cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,cf.caf_nu,cf.mbl_nu,
	(select category from prepaid_complaint_prefer where id=prepaid_create_complaint.comp_cat) as comp_cat_name FROM prepaid_create_complaint JOIN caf_dtl_t cf ON prepaid_create_complaint.caf_id=cf.caf_id join cstmr_dtl_t as cu on cu.cstmr_id=cf.cstmr_id
	where cf.caf_id =${data.caf_id} AND prepaid_create_complaint.comp_status =${data.comp_status} ORDER BY prepaid_create_complaint.created_date DESC`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : insertsubalacarteMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 18/01/2024   - Radhika - Initial Function
******************************************************************************/
exports.insertsubalacartewebMdl = function (data, user, callback) {
    var fnm = "insertsubalacartewebMdl"
    console.log("success", data, user)
    var amount = 0;
    var gateway;
    var apsfltxnid;
    var apsflamt;
    var lmotxnid;
    var lmoamt;
    var m2mittxnid;
    var m2mitamt;
    var meemotxnid;
    var meemoamt;
    var adtnlboxrntl;
    var adtnltdrchrgs;
    if (data.amt) {
        amount = data.amt;
    }
    if (data.gateway) {
        gateway = data.gateway
    } else {
        gateway = 'OLD_APP'
    }
    if (data.apsfl_txnid) {
        apsfltxnid = data.apsfl_txnid.replace(/['"]+/g, '')
    } else {
        apsfltxnid = 'N/A'
    }
    if (data.apsfl_amount) {
        apsflamt = data.apsfl_amount.replace(/['"]+/g, '')
    } else {
        apsflamt = 'N/A'
    }
    if (data.lmo_txnid) {
        lmotxnid = data.lmo_txnid.replace(/['"]+/g, '')
    } else {
        lmotxnid = 'N/A'
    }
    if (data.lmo_amount) {
        lmoamt = data.lmo_amount.replace(/['"]+/g, '')
    } else {
        lmoamt = 'N/A'
    }
    if (data.m2mit_txnid) {
        m2mittxnid = data.m2mit_txnid.replace(/['"]+/g, '')
    } else {
        m2mittxnid = 'N/A'
    }
    if (data.m2mit_amount) {
        m2mitamt = data.m2mit_amount.replace(/['"]+/g, '')
    } else {
        m2mitamt = 'N/A'
    }
    if (data.meemo_txnid) {
        meemotxnid = data.meemo_txnid.replace(/['"]+/g, '')
    } else {
        meemotxnid = 'N/A'
    }
    if (data.meemo_amount) {
        meemoamt = data.meemo_amount.replace(/['"]+/g, '')
    } else {
        meemoamt = 'N/A'
    }
    if (data.adtnl_box_rntl) {
        adtnlboxrntl = data.adtnl_box_rntl.replace(/['"]+/g, '')
    } else {
        adtnlboxrntl = 'N/A'
    }
    if (data.adtnl_tdr_chrgs) {
        adtnltdrchrgs = data.adtnl_tdr_chrgs.replace(/['"]+/g, '')
    } else {
        adtnltdrchrgs = 'N/A'
    }
    var QRY_TO_EXEC = `INSERT INTO sub_alacarte_transaction(package_ids,pckge_names, trns_mrchant_id, mdlw_sbscr_id,amt, caf_id,i_ts) VALUES (${data.package_ids},${data.packages_names},${data.trns_mrchant_id},${data.mdlw_sbscr_id},${amount},${data.caf_id},CURRENT_TIMESTAMP())`;
    //var QRY_TO_EXEC = `INSERT INTO sub_alacarte_transaction(months_val,package_ids,pckge_names, amt,trns_mrchant_id, mdlw_sbscr_id,gateway,p_apsfl_txnid,p_apsfl_amount,c_lmo_txnid,c_lmo_amount,c1_m2mit_txnid,c1_m2mit_amount,c2_meemo_txnid,c2_meemo_amount,adtnl_tdr_chrgs,adtnl_box_rntl,caf_id,cat_ids,i_ts) VALUES (${data.mnthval},${data.package_ids},${data.packages_names},${data.amt},${data.trns_mrchant_id},${data.mdlw_sbscr_id},${gateway},'${apsfltxnid}','${apsflamt}','${lmotxnid}','${lmoamt}','${m2mittxnid}','${m2mitamt}','${meemotxnid}','${meemoamt}','${adtnltdrchrgs}','${adtnlboxrntl}',${data.caf_id},${data.cat_id},CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};

/*****************************************************************************
* Function       : updatealacartedataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 18/01/2024   - Radhika - Initial Function
******************************************************************************/

exports.updatealacartedatawebMdl = function (data, user) {
    var fnm = "updatealacartedatawebMdl"
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
    var descamnt = data.desc.replace(/['"]+/g, '') + ' Amount : ' + data.amt.replace(/['"]+/g, '');

    if (data.date != null && data.date != '' && data.date != undefined) {
        date = `,date =${data.date}`
    }
    if (data.CardNumber != null && data.CardNumber != '' && data.CardNumber != undefined) {
        CardNumber = `,CardNumber =${data.CardNumber}`
    }
    if (data.surcharge != null && data.surcharge != '' && data.surcharge != undefined) {
        surcharge = `,surcharge =${data.surcharge}`
    }
    if (data.clientcode != null && data.clientcode != '' && data.clientcode != undefined) {
        clientcode = `,clientcode =${data.clientcode}`
    }
    if (data.udf15 != null && data.udf15 != '' && data.udf15 != undefined) {
        udf15 = `,udf15 =${data.udf15}`
    }
    if (data.udf14 != null && data.udf14 != '' && data.udf14 != undefined) {
        udf14 = `,udf14 =${data.udf14}`
    }
    if (data.signature != null && data.signature != '' && data.signature != undefined) {
        signature = `,signature =${data.signature}`
    }
    if (data.udf13 != null && data.udf13 != '' && data.udf13 != undefined) {
        udf13 = `,udf13 =${data.udf13}`
    }
    if (data.udf12 != null && data.udf12 != '' && data.udf12 != undefined) {
        udf12 = `,udf12 =${data.udf12}`
    }
    if (data.udf11 != null && data.udf11 != '' && data.udf11 != undefined) {
        udf11 = `,udf11 =${data.udf11}`
    }
    if (data.amt != null && data.amt != '' && data.amt != undefined) {
        amt = `,amt =${data.amt}`
    }
    if (data.udf10 != null && data.udf10 != '' && data.udf10 != undefined) {
        udf10 = `,udf10 =${data.udf10}`
    }
    if (data.merchant_id != null && data.merchant_id != '' && data.merchant_id != undefined) {
        merchant_id = `,merchant_id =${data.merchant_id}`
    }
    if (data.mer_txn != null && data.mer_txn != '' && data.mer_txn != undefined) {
        mer_txn = `,mer_txn =${data.mer_txn}`
    }
    if (data.f_code != null && data.f_code != '' && data.f_code != undefined) {
        f_code = `,f_code =${data.f_code}`
    }
    if (data.bank_txn != null && data.bank_txn != '' && data.bank_txn != undefined) {
        bank_txn = `,bank_txn =${data.bank_txn}`
    }
    if (data.udf9 != null && data.udf9 != '' && data.udf9 != undefined) {
        udf9 = `,udf9 =${data.udf9}`
    }
    if (data.ipg_txn_id != null && data.ipg_txn_id != '' && data.ipg_txn_id != undefined) {
        ipg_txn_id = `,ipg_txn_id =${data.ipg_txn_id}`
    }
    if (data.bank_name != null && data.bank_name != '' && data.bank_name != undefined) {
        bank_name = `,bank_name =${data.bank_name}`
    }
    if (data.prod != null && data.prod != '' && data.prod != undefined) {
        prod = `,prod =${data.prod}`
    }
    if (data.mmp_txn != null && data.mmp_txn != '' && data.mmp_txn != undefined) {
        mmp_txn = `,mmp_txn =${data.mmp_txn}`
    }
    if (data.udf5 != null && data.udf5 != '' && data.udf5 != undefined) {
        udf5 = `,udf5 =${data.udf5}`
    }
    if (data.udf6 != null && data.udf6 != '' && data.udf6 != undefined) {
        udf6 = `,udf6 =${data.udf6}`
    }
    if (data.udf3 != null && data.udf3 != '' && data.udf3 != undefined) {
        udf3 = `,udf3 =${data.udf3}`
    }
    if (data.udf4 != null && data.udf4 != '' && data.udf4 != undefined) {
        udf4 = `,udf4 =${data.udf4}`
    }
    if (data.udf1 != null && data.udf1 != '' && data.udf1 != undefined) {
        udf1 = `,udf1 =${data.udf1}`
    }
    if (data.udf2 != null && data.udf2 != '' && data.udf2 != undefined) {
        udf2 = `,udf2 =${data.udf2}`
    }
    if (data.discriminator != null && data.discriminator != '' && data.discriminator != undefined) {
        discriminator = `,discriminator =${data.discriminator}`
    }
    if (data.auth_code != null && data.auth_code != '' && data.auth_code != undefined) {
        auth_code = `,auth_code =${data.auth_code}`
    }

    var QRY_TO_EXEC = `update sub_alacarte_transaction set descr =${data.desc} ${date} ${CardNumber} ${surcharge} ${clientcode} ${udf15} ${udf14} ${signature} ${udf13} ${udf12}
     ${udf11} ${udf10} ${amt} ${merchant_id} ${mer_txn} ${f_code} ${bank_txn} ${bank_txn} ${udf9} ${ipg_txn_id}
     ${bank_name} ${prod} ${mmp_txn} ${udf5} ${udf6} ${udf3} ${udf4} ${udf1} ${udf2} ${discriminator} ${auth_code} ,u_ts=CURRENT_TIMESTAMP() where trns_mrchant_id=${data.trns_mrchant_id} ;
	 insert into prepaid_notification_log set emp_id=0,caf_id=${data.caf_id},message='${descamnt}',dateCreated=CURRENT_TIMESTAMP(),status=1,category='Payments'`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};