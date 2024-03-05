// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsSHA = require('jssha');

var request = require('request');

var dbutil = require(appRoot + '/utils/db.utils');
var smsutil = require(appRoot + '/utils/sms.utils');

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 13/02/2020    - Sunil Mulagada - Added joins based on user category to get default profiles
*
******************************************************************************/
exports.loginMdl = function (data) {
    var fnm = "loginMdl"
	/*var namearry=data.username.split("(");
    var pwdarry=data.password.split("(");
    var user=[];
    var pwd=[];
    for(i=0;i<namearry.length;i++){
        user+=namearry[i]
    }
    for(i=0;i<pwdarry.length;i++){
        pwd+=pwdarry[i]
    }*/
    var QRY_TO_EXEC = `SELECT u.fst_nm as frst_nm,a.prpd_flag,u.ivr_usr_id,u.ivr_pswrd,u.ivr_station,u.lst_nm,m.mrcht_id,mrcht_nm,u.mrcht_usr_id, u.pwd_chngd_in, u.chng_lg_in,u.hyrchy_id,u.hyrchy_grp_id,mur.admn_in
                            , u.mrcht_usr_nm,u.mbl_nu,u.orgn_id,u.dprts_id,u.dsgn_id,csb.complaint_sub_emp_id
                            , c.usr_ctgry_nm, u.usr_ctgry_id, u.usr_ctgry_ky,p.prfle_dshbd_url_tx,
                            CASE WHEN umpr.sde_mnu_prfl_id IS NULL THEN c.dflt_sde_mnu_prfl_id ELSE umpr.sde_mnu_prfl_id END as sde_mnu_prfl_id
                            , CASE WHEN umpr.mnu_prfle_id IS NULL THEN c.dflt_mnu_prfle_id ELSE umpr.mnu_prfle_id END as mnu_prfle_id
                            , CASE WHEN urpr.rpt_prfle_id IS NULL THEN c.dflt_rpt_prfle_id ELSE urpr.rpt_prfle_id END as rpt_prfle_id
                            , CASE WHEN uspr.stp_prfle_id IS NULL THEN c.dflt_stp_prfle_id ELSE uspr.stp_prfle_id END as stp_prfle_id
                            ,DATE_FORMAT(mh.i_ts, '%d-%m-%Y  %h:%i %p') as lstlgn,a.prt_in,a.caf_in
                        FROM mrcht_usr_lst_t as u
                            JOIN mrcht_usr_rel_t as mur on mur.mrcht_usr_id=u.mrcht_usr_id
                            JOIN mrcht_lst_t m ON mur.mrcht_id = m.mrcht_id
                            JOIN usr_ctgry_lst_t c ON u.usr_ctgry_id=c.usr_ctgry_id
                            left JOIN agnt_lst_t a on u.usr_ctgry_ky = a.agnt_id  
                            LEFT JOIN mrcht_mnu_prfle_rel_t umpr ON umpr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN prfle_lst_t p on p.prfle_id = umpr.mnu_prfle_id
                            LEFT JOIN mrcht_stp_prfle_rel_t uspr ON uspr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN mrcht_rpt_prfle_rel_t urpr ON urpr.mrcht_usr_id = u.mrcht_usr_id
                            left JOIN mrcht_lgn_hstry_dtl_t as mh on mh.mrcht_usr_id =u.mrcht_usr_id and mh.a_in=1
							left join complaint_sub_employees as csb on csb.mrcht_usr_id=u.usr_ctgry_ky
                            LEFT JOIN agnt_lst_t an on an.agnt_cd = u.mrcht_usr_nm
                        WHERE u.mrcht_usr_nm = '${data.username}' and pswrd_encrd_tx = SHA1('${data.password}') 
                        and u.a_in = 1 ORDER by mh.i_ts desc
                        LIMIT 0,1;`
	/*var QRY_TO_EXEC = `SELECT u.fst_nm as frst_nm,u.lst_nm,m.mrcht_id,mrcht_nm,u.mrcht_usr_id, u.pwd_chngd_in, u.chng_lg_in,u.hyrchy_id,u.hyrchy_grp_id,mur.admn_in
                            , u.mrcht_usr_nm,u.mbl_nu,u.orgn_id,u.dprts_id,u.dsgn_id
                            , c.usr_ctgry_nm, u.usr_ctgry_id, u.usr_ctgry_ky,p.prfle_dshbd_url_tx,
                            CASE WHEN umpr.sde_mnu_prfl_id IS NULL THEN c.dflt_sde_mnu_prfl_id ELSE umpr.sde_mnu_prfl_id END as sde_mnu_prfl_id
                            , CASE WHEN umpr.mnu_prfle_id IS NULL THEN c.dflt_mnu_prfle_id ELSE umpr.mnu_prfle_id END as mnu_prfle_id
                            , CASE WHEN urpr.rpt_prfle_id IS NULL THEN c.dflt_rpt_prfle_id ELSE urpr.rpt_prfle_id END as rpt_prfle_id
                            , CASE WHEN uspr.stp_prfle_id IS NULL THEN c.dflt_stp_prfle_id ELSE uspr.stp_prfle_id END as stp_prfle_id
                            ,DATE_FORMAT(mh.i_ts, '%d-%m-%Y  %h:%i %p') as lstlgn,a.prt_in,a.caf_in
                        FROM mrcht_usr_lst_t as u
                            JOIN mrcht_usr_rel_t as mur on mur.mrcht_usr_id=u.mrcht_usr_id
                            JOIN mrcht_lst_t m ON mur.mrcht_id = m.mrcht_id
                            JOIN usr_ctgry_lst_t c ON u.usr_ctgry_id=c.usr_ctgry_id
                            left JOIN agnt_lst_t a on u.usr_ctgry_ky = a.agnt_id  
                            LEFT JOIN mrcht_mnu_prfle_rel_t umpr ON umpr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN prfle_lst_t p on p.prfle_id = umpr.mnu_prfle_id
                            LEFT JOIN mrcht_stp_prfle_rel_t uspr ON uspr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN mrcht_rpt_prfle_rel_t urpr ON urpr.mrcht_usr_id = u.mrcht_usr_id
                            left JOIN mrcht_lgn_hstry_dtl_t as mh on mh.mrcht_usr_id =u.mrcht_usr_id and mh.a_in=1
                            LEFT JOIN agnt_lst_t an on an.agnt_cd = u.mrcht_usr_nm
                        WHERE u.mrcht_usr_nm = '${user}' and pswrd_encrd_tx = SHA1('${pwd}') 
                        and u.a_in = 1 ORDER by mh.i_ts desc
                        LIMIT 0,1;`*/
                        console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function : loginMdl_new
* Description : login
* Arguments : callback function
* 13/02/2020    - Sunil Mulagada - Added joins based on user category to get default profiles
*
******************************************************************************/
exports.loginMdl_new = function (data) {
    var fnm = "loginMdl_new"

    var QRY_TO_EXEC = `SELECT u.fst_nm as frst_nm,a.prpd_flag,u.lst_nm,m.mrcht_id,mrcht_nm,u.mrcht_usr_id, u.pwd_chngd_in, u.chng_lg_in,u.hyrchy_id,u.hyrchy_grp_id,mur.admn_in
                            , u.mrcht_usr_nm,u.mbl_nu,u.orgn_id,u.dprts_id,u.dsgn_id,csb.complaint_sub_emp_id
                            , c.usr_ctgry_nm, u.usr_ctgry_id, u.usr_ctgry_ky,p.prfle_dshbd_url_tx,
                            CASE WHEN umpr.sde_mnu_prfl_id IS NULL THEN c.dflt_sde_mnu_prfl_id ELSE umpr.sde_mnu_prfl_id END as sde_mnu_prfl_id
                            , CASE WHEN umpr.mnu_prfle_id IS NULL THEN c.dflt_mnu_prfle_id ELSE umpr.mnu_prfle_id END as mnu_prfle_id
                            , CASE WHEN urpr.rpt_prfle_id IS NULL THEN c.dflt_rpt_prfle_id ELSE urpr.rpt_prfle_id END as rpt_prfle_id
                            , CASE WHEN uspr.stp_prfle_id IS NULL THEN c.dflt_stp_prfle_id ELSE uspr.stp_prfle_id END as stp_prfle_id
                            ,DATE_FORMAT(mh.i_ts, '%d-%m-%Y  %h:%i %p') as lstlgn,a.prt_in,a.caf_in
                        FROM mrcht_usr_lst_t as u
                            JOIN mrcht_usr_rel_t as mur on mur.mrcht_usr_id=u.mrcht_usr_id
                            JOIN mrcht_lst_t m ON mur.mrcht_id = m.mrcht_id
                            JOIN usr_ctgry_lst_t c ON u.usr_ctgry_id=c.usr_ctgry_id
                            left JOIN agnt_lst_t a on u.usr_ctgry_ky = a.agnt_id  
                            LEFT JOIN mrcht_mnu_prfle_rel_t umpr ON umpr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN prfle_lst_t p on p.prfle_id = umpr.mnu_prfle_id
                            LEFT JOIN mrcht_stp_prfle_rel_t uspr ON uspr.mrcht_usr_id = u.mrcht_usr_id
                            LEFT JOIN mrcht_rpt_prfle_rel_t urpr ON urpr.mrcht_usr_id = u.mrcht_usr_id
                            left JOIN mrcht_lgn_hstry_dtl_t as mh on mh.mrcht_usr_id =u.mrcht_usr_id and mh.a_in=1
                            LEFT JOIN agnt_lst_t an on an.agnt_cd = u.mrcht_usr_nm
							left join complaint_sub_employees as csb on csb.mrcht_usr_id=u.mrcht_usr_id
                            join usr_cptch_lst_t as uc on uc.cptch_slt_ky='${data.saltKey}' and uc.cptch_txt='${data.captcha}'
                        WHERE u.mrcht_usr_nm = '${data.username}' and pswrd_encrd_tx = SHA1('${data.password}') 
                        and u.a_in = 1 ORDER by mh.i_ts desc
                        LIMIT 0,1;`
                        console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles
*
******************************************************************************/
exports.loginsbscrbrAppMdl = function (data) {
    var fnm = "loginsbscrbrAppMdl"
	console.log("data",data);
	/*var namearry=data.email.split("(");
    var pwdarry=data.pwd.split("(");
    var user=[];
    var pwd=[];
    for(i=0;i<namearry.length;i++){
        user+=namearry[i]
    }
    for(i=0;i<pwdarry.length;i++){
        pwd+=pwdarry[i]
    }*/
    var QRY_TO_EXEC = `select c.caf_id, 'No' as kyc,mbl_nu,cu.cstmr_nm from caf_dtl_t c
join cstmr_dtl_t cu on cu.cstmr_id=c.cstmr_id where (c.caf_id='${data.email}' OR c.mbl_nu='${data.email}' OR c.onu_srl_nu='${data.email}') AND c.pwd_encrd_tx = MD5('${data.pwd}') and c.enty_sts_id not in (8,45) and c.caf_type_id=1`;
	/*var QRY_TO_EXEC = `select c.caf_id, 'No' as kyc,mbl_nu,cu.cstmr_nm from caf_dtl_t c
join cstmr_dtl_t cu on cu.cstmr_id=c.cstmr_id where (c.caf_id='${user}' OR c.mbl_nu='${user}' OR c.onu_srl_nu='${user}') AND c.pwd_encrd_tx = MD5('${pwd}') and c.enty_sts_id not in (8,45) and c.caf_type_id=1`;*/
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function : updcstmrtyp
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles updcstmrtyp
*
******************************************************************************/
exports.updcstmrtypMdl = function (data, r) {
    var fnm = "updcstmrtypMdl"
    var QRY_TO_EXEC = `update prepaid_customer_tokens set token_status='0', updated_at=CURRENT_TIMESTAMP() where token_status=1 and caf_id=${r.caf_id};
	UPDATE caf_dtl_t SET fcm_id='${data.fcm_id}' WHERE caf_id=${r.caf_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function : insrtlgnhstrycstmrMdl
* Description : login
* Arguments : callback function
* 02/08/2021 - ramesh  - to get default profiles
*
******************************************************************************/
exports.insrtlgnhstrycstmrMdl = function (data, ipaddress, env_info, version) {
	var fnm = "insrtlgnhstrycstmrMdl"
	var mydate = new Date();
	let now = new Date(mydate.getTime() - (mydate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
	
	console.log("data in insert", data);

    var QRY_TO_EXEC = `INSERT INTO prepaid_login_history (emp_id,admin_id,ip,env_info,login_time,is_logged_in) VALUES ('${data.emp_id}','${data.admin_id}','${ipaddress}','${env_info}','${now}','${version}')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : logout_sessMdl
 * Description   : login
 * Arguments     : callback function
 ******************************************************************************/
 exports.logout_sessMdl = function (user) {
    var fnm = "logout_sessMdl"
     console.log("user",user)
    var QRY_TO_EXEC = `update complaint_sub_employees set emp_active=0 and last_inactive_time=CURRENT_TIMESTAMP() where mrcht_usr_id=${user.mrcht_usr_id}`;
    // // // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function          : getUsrAdtnlDtls
* Description       : Get user additional details
* Arguments         : user details
* Change History    :
* 13/02/2020 - Sunil Mulagada - Initial Function
*
******************************************************************************/
exports.getUsrAdtnlDtls = function (usrData) {
    var fnm = "getUsrAdtnlDtls"
    var QRY_TO_EXEC = ""
    if (usrData.usr_ctgry_id == 1 || usrData.usr_ctgry_id == 2 || usrData.usr_ctgry_id == 6 || usrData.usr_ctgry_id == 3 || usrData.usr_ctgry_id == 9 || usrData.usr_ctgry_id == 10 || usrData.usr_ctgry_id == 1000000)  // glits  OR Client APSFL OR Call Center OR Vendors
    {
        QRY_TO_EXEC = `SELECT o.orgn_nm, d.dprt_nm,ds.dsgn_nm
                     FROM   mrcht_dprts_lst_t d,
                            mrcht_dsgn_lst_t ds,
                            orgn_lst_t o
                     WHERE orgn_id=${usrData.orgn_id} AND d.dprt_id=${usrData.dprts_id} AND dsgn_id=${usrData.dsgn_id}`;
    } else if (usrData.usr_ctgry_id == 4) // Customers
    {
        QRY_TO_EXEC = `SELECT c.caf_nu,s.sts_nm,
                     FROM caf_dtl_t c JOIN enty_sts_lst_t s s.enty_sts_id ON c.crnt_caf_sts_id AND s.enty_id=1
                     WHERE c.caf_id=${usrData.usr_ctgry_ky}`;
    } else if (usrData.usr_ctgry_id == 5) // Enterprise Customers
    {
        QRY_TO_EXEC = `SELECT c.caf_nu,s.sts_nm,
                     FROM caf_dtl_t c JOIN enty_sts_lst_t s s.enty_sts_id ON c.crnt_caf_sts_id AND s.enty_id=1
                     WHERE c.caf_id=${usrData.usr_ctgry_ky}`;
    } else if (usrData.usr_ctgry_id == 7) // MSO
    {
        QRY_TO_EXEC = `SELECT a.agnt_nm as mso_org_nm,agnt_cd as mso_cd
                     FROM agnt_lst_t a
                     WHERE a.agnt_id=${usrData.usr_ctgry_ky}`;
    } else if (usrData.usr_ctgry_id == 8) // LMO
    {
        QRY_TO_EXEC = `SELECT l.agnt_nm as lmo_org_nm,l.agnt_cd as lmo_cd,m.agnt_cd as mso_cd
                     FROM agnt_lst_t l 
                      right JOIN agnt_lst_t m ON l.prnt_agnt_id=m.agnt_id
                     WHERE l.agnt_id=${usrData.usr_ctgry_ky}`;
        
    }else if (usrData.usr_ctgry_id == 1000000) // Lineman LMO
    {
        QRY_TO_EXEC = `SELECT l.agnt_nm as lmo_org_nm,l.agnt_cd as lmo_cd,m.agnt_cd as mso_cd
                     FROM agnt_lst_t l 
                      right JOIN agnt_lst_t m ON l.prnt_agnt_id=m.agnt_id
                     WHERE l.agnt_id=${usrData.usr_ctgry_ky}`;
        
    }
    console.log(QRY_TO_EXEC)
    // // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
* Function : getUsrBseDtls
* Description : login
* Arguments : callback function
******************************************************************************/
exports.getUsrBseDtls = function (usrData) {
    var fnm = "getUsrBseDtls"
    var hyrchy_grp_nm = "";
    var political_dtls = "";

    if (usrData.hyrchy_id == 1) {
        var join = '';
        hyrchy_grp_nm = 'Andhra Pradesh'
        political_dtls = ",1 as ste_id,null as dstrt_id,null as mndl_id,null as svm_id"
    } else if (usrData.hyrchy_id == 2) {
        var join = 'JOIN dstrt_lst_t as d on d.dstrt_id=u.hyrchy_grp_id';
        hyrchy_grp_nm = 'd.dstrt_nm'
        political_dtls = ",1 as ste_id,d.dstrt_id,d.dstrt_nm,null as mndl_id,null as svm_id"
    } else if (usrData.hyrchy_id == 3) {
        var join = 'JOIN mndl_lst_t as m on m.mndl_id=u.hyrchy_grp_id JOIN dstrt_lst_t as d on d.dstrt_id=m.dstrt_id';
        hyrchy_grp_nm = 'm.mndl_nm'
        political_dtls = ",1 as ste_id,d.dstrt_id as dstrt_id,d.dstrt_nm as dstrt_nm,m.mndl_id,null as svm_id"
    } else if (usrData.hyrchy_id == 6) {
        var join = '';
        hyrchy_grp_nm = "'Call Center'"
        political_dtls = ",1 as ste_id,null as dstrt_id,null as mndl_id,null as svm_id"
    } else {
        var join = 'JOIN svm_lst_t as s on s.svm_id=u.hyrchy_grp_id JOIN mndl_lst_t as m on m.mndl_id=s.mndl_id JOIN dstrt_lst_t as d on d.dstrt_id=s.dstrt_id';
        hyrchy_grp_nm = 's.svm_nm'
        political_dtls = ",1 as ste_id,d.dstrt_id as dstrt_id,d.dstrt_nm as dstrt_nm,m.mndl_id,s.svm_id as svm_id"
    }
    var QRY_TO_EXEC = `select mu.mrcht_id,mrcht_nm,mu.admn_in,u.mrcht_usr_id, u.pwd_chngd_in, u.chng_lg_in,u.hyrchy_id,h.hyrchy_nm,u.hyrchy_grp_id,${(usrData.hyrchy_id == 1) ? "'Andhra Pradesh'" : hyrchy_grp_nm} as hyrchy_grp_nm
    ${political_dtls}
    from mrcht_usr_lst_t as u
        ${join}
        JOIN hyrchy_lst_t as h on h.hyrchy_id=u.hyrchy_id
        JOIN mrcht_usr_rel_t mu ON mu.mrcht_usr_id = u.mrcht_usr_id
        JOIN mrcht_lst_t ml ON mu.mrcht_id = ml.mrcht_id
        where u.mrcht_usr_id = '${usrData.mrcht_usr_id}' and u.a_in = 1
    GROUP BY u.mrcht_usr_id;`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : recordLoginHistoryMdl
 * Description   : login
 * Arguments     : callback function
 ******************************************************************************/
exports.recordLoginHistoryMdl = function (data, sts_cd) {
    var fnm = "recordLoginHistoryMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_lgn_hstry_dtl_t (mrcht_usr_id, app_typ, sts_cd, i_ts) 
                       VALUES (${data.mrcht_usr_id},'${data.app}','${sts_cd}', current_timestamp());`;
    // // // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : getClntUsrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.getClntUsrMdl = function (usrId, callback) {
    var fnm = "getClntUsrMdl"
    var QRY_TO_EXEC = "select mrcht_usr_id FROM mrcht_usr_lst_t where usr_id = " + usrId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : getUsrClntsMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.getUsrClntsMdl = function (usrId) {
    var fnm = "getUsrClntsMdl"
    var QRY_TO_EXEC = `select ua.usr_id, ua.clnt_id,ua.tnt_id,ua.usr_grp_id,ua.clnt_admn_in,ua.tnt_admn_in,c.clnt_nm,t.tnt_nm,t.tnt_dsply_nm,t.tnt_hmdshb_pg,t.tnt_lgo_url_tx,c.lat as clat,c.lng as clng, t.lat as lat,t.lng as lng from usr_clnt_tnt_rel_t as ua 
                                join mrcht_usr_lst_t as u on u.mrcht_usr_id = ua.usr_id
                                join clnt_lst_t as c on ua.clnt_id = c.clnt_id
                                join tnt_lst_t as t on t.tnt_id = ua.tnt_id
                        where u.mrcht_usr_id = '${usrId}' order by usr_id, clnt_id, tnt_id`;
    // // // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : getUsrsAdtMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.getUsrsAdtMdl = function (data, callback) {
    var fnm = "getUsrsAdtMdl"
    var QRY_TO_EXEC = `select ua.mrcht_lgn_ky, ua.mrcht_usr_id, u.mrcht_usr_nm, ua.app_typ, DATE_FORMAT(ua.i_ts,'%d-%m-%Y %h:%m:%s') as loggedinAt  
                        from mrcht_lgn_hstry_dtl_t as ua 
                        join mrcht_usr_lst_t as u on ua.mrcht_usr_id = u.mrcht_usr_id
                        where ua.d_in = 0;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : check_usrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.check_usrMdl = function (data) {
    var fnm = "check_usrMdl"
    // // console.log('model --------------');

    // // console.log(data)
    var condition = '';
    var condition1 = '';
    if (data.username) {
        condition1 = `and u.mrcht_usr_nm = '${data.username}' `
    }
    if (data.mobile) {
        condition = `and u.mbl_nu = ${data.mobile} and u.mrcht_usr_nm = '${data.usr_nm}'`;
    } else if (data.email) {
        condition = `and u.eml_tx = '${data.email}'`;
    } else if (data.mrcht_usr_id) {
        condition = `and u.mrcht_usr_id = ${data.mrcht_usr_id}`;
    }

    var QRY_TO_EXEC = `select u.mrcht_usr_id,u.mrcht_usr_nm,u.mbl_nu
                        from mrcht_usr_lst_t u 
                        where  u.a_in = 1 ${condition1} ${condition} ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : check_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.check_pwdMdl = function (data) {
    var fnm = "check_pwdMdl"
    var QRY_TO_EXEC = `select * from (select * from mrcht_pwd_hstry_dtl_t where mrcht_usr_id=${data.mrcht_usr_id} order by i_ts desc limit 0,6) as a where a.pswrd_encrd_tx=SHA1('${data.nw_pswrd}');`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_phnNumMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.change_phnNumMdl = function (data) {
    var fnm = "change_phnNumMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set mbl_nu=${data.phone_no},u_ts=current_timestamp() where mrcht_usr_id = '${data.mrcht_usr_id}' ;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.change_pwdMdl = function (data, pwd_chngd_in) {
    var fnm = "change_pwdMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set pwd_chngd_in=${pwd_chngd_in},pwd_chngd_ts=current_timestamp(),pswrd_encrd_tx = SHA1('${data.nw_pswrd}'),u_ts=current_timestamp() where mrcht_usr_id = '${data.mrcht_usr_id}' ;`;
   
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : pwd_chnghistMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.pwd_chnghistMdl = function (data) {
    var fnm = "pwd_chnghistMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_pwd_hstry_dtl_t(mrcht_usr_id,pswrd_encrd_tx,i_ts)VALUES(${data.mrcht_usr_id},sha1('${data.nw_pswrd}'),current_timestamp()) ;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : reset_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.reset_pwdMdl = function (data, usrId) {
    var fnm = "reset_pwdMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set pswrd_encrd_tx = SHA1('${data.newPassword}') where usr_id = '${usrId}' and d_in is null`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : validateOtpMdl
 * Description   : To check if session with user details created or not
 * Arguments     : callback function
 ******************************************************************************/
exports.validateOtpMdl = function (data, user, callback) {
    var fnm = "validateOtpMdl"
    var QRY_TO_EXEC = `SELECT * FROM usr_otp_t WHERE usr_mbl_nu=${data.phno} AND code=${data.otp}`;

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (error, results) {
        callback(error, results)
        return;
    })

}

/*****************************************************************************
 * Function      : userForgetpwdMdl
 * Description   : To check if session with user details created or not
 * Arguments     : callback function
 ******************************************************************************/
exports.userForgetpwdMdl = function (user, data, callback) {
    var fnm = "userForgetpwdMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set pswrd_encrd_tx = SHA1('${data.pwd}') where mble_ph = ${data.mble_ph}`;

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (error, results) {
        callback(error, results)
        return;
    })

}

/*****************************************************************************
 * Function      : sendOtpMdl
 * Description   : Send OTP
 * Arguments     : callback function
 ******************************************************************************/
exports.sendOtpMdl = function (user, data,msg_tx, tmplt_id,otp,callback) {
    var fnm = "sendOtpMdl"
    var resUID;
    // var totpObj = new TOTP();
    // var otp = totpObj.getOTP('onetimepassword');
    // var msg_tx = `Your One Time Password is ${otp}. Please use this OTP to validate your login.`;
    // var msg_tx = `Your OTP for New LMO/MSO Registration is ${otp} - Team APSFL`;
    smsutil.sendNotifySMS(data.phone_no,msg_tx,data.ntfcn_cgry_id, function(err,smsres){
		console.log("err,smsres", err, smsres);
        if(err){
            callback(err);
            return;
        } else {
            var results = { "usr_mbl": data.phone_no, uuid: resUID ? resUID : 0, code: otp, i_ts: new Date() };

            var QRY_TO_EXEC = `INSERT INTO usr_otp_t (usr_mbl_nu, code, uuid, i_ts) VALUES (${results.usr_mbl},'${results.code}','${results.uuid}', current_timestamp());`;

            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (error, ins_results) {
				console.log("error , ins_results in db", error, ins_results);
                if(error){
                    callback(error);
                    return;
                }else{
                    ins_results['code'] = results.code;
                    callback(error, ins_results)
                    return;
                }
            })
        }
    }, tmplt_id);
}

// function TOTP() {

//     var dec2hex = function (s) {
//         return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
//     };

//     var hex2dec = function (s) {
//         return parseInt(s, 16);
//     };

//     var leftpad = function (s, l, p) {
//         if (l + 1 >= s.length) {
//             s = Array(l + 1 - s.length).join(p) + s;
//         }
//         return s;
//     };

//     var base32tohex = function (base32) {
//         var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
//         var bits = "";
//         var hex = "";
//         for (var i = 0; i < base32.length; i++) {
//             var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
//             bits += leftpad(val.toString(2), 5, '0');
//         }
//         for (var i = 0; i + 4 <= bits.length; i += 4) {
//             var chunk = bits.substr(i, 4);
//             hex = hex + parseInt(chunk, 2).toString(16);
//         }
//         return hex;
//     };

//     this.getOTP = function (secret) {
//         try {
//             var epoch = Math.round(new Date().getTime() / 1000.0);
//             var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
//             var hmacObj = new jsSHA("SHA-1", "HEX");
//             hmacObj.setHMACKey(base32tohex(secret), "HEX");
//             hmacObj.update(time);
//             var hmac = hmacObj.getHMAC("HEX");
//             // var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
//             var offset = hex2dec(hmac.substring(hmac.length - 1));
//             var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
//             otp = (otp).substr(otp.length - 6, 4);
//             // // // console.log(otp)
//         } catch (error) {
//             throw error;
//         }
//         return otp;
//     };

// }

/*****************************************************************************
 * Function      : matchOldNewPwdMdl
 * Description   : login
 * Arguments     : callback function
 ******************************************************************************/
exports.matchOldNewPwdMdl = function (user, pwd, callback) {
    var fnm = "matchOldNewPwdMdl"
    var QRY_TO_EXEC = [`select SHA1('${pwd.old_pswrd}') as pswrd_encrd_tx `,`select pswrd_encrd_tx from mrcht_usr_lst_t where mrcht_usr_id = '${pwd.mrcht_usr_id}' `]

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
 * Function      : check_agent
 * Description   : Check MSO Exists or Not
 * Arguments     : callback function
 ******************************************************************************/
exports.check_agntMdl = function (data) {
    var fnm = "check_agntMdl"
    var QRY_TO_EXEC = `SELECT * from agnt_lst_t WHERE ofce_mbl_nu=${data.phone_no} AND agnt_ctgry_id = ${data.prtnr_id};`;
    // // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
 * Function      : getUsrPrmsDataMdl
 * Description   : Get permissions according to login
 * Arguments     : callback function
 ******************************************************************************/
exports.getUsrPrmsDataMdl = function (user,prm_txt) {
    var fnm = "getUsrPrmsDataMdl"
    var QRY_TO_EXEC = ` select ro.slct_in
                        ,ro.insrt_in
                        ,ro.updt_in
                        ,ro.dlte_in
                        ,ro.exprt_in
                        ,o.spcl_prmsns_in
                        ,o.aprvl_grp_id
                        ,o.adt_in
                        from
                        rle_objct_lst_t o
                        join rle_objct_rel_t ro on o.objct_id=ro.objct_id
                        join rle_lst_t r on r.rle_id=ro.rle_id
                        join rle_mrcht_usr_rel_t ru on r.rle_id=ru.rle_id
                        WHERE o.objct_nm='${prm_txt}'
                        and ru.mrcht_usr_id=${user.mrcht_usr_id} AND ru.a_in=1 and ro.a_in=1;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function : updcstmrtyp
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles updcstmrtyp
*
******************************************************************************/
exports.getpckgeidcstmrMdl = function (data) {
    var fnm = "getpckgeidcstmrMdl"
    var QRY_TO_EXEC = `select crnt_pln_id from caf_dtl_t where caf_id=${data.caf_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : updcstmrtyp
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles updcstmrtyp 
*
******************************************************************************/
exports.getpckgenamecstmrMdl = function (data) {
    var fnm = "getpckgenamecstmrMdl"
    var QRY_TO_EXEC = `SELECT pckge_nm,chrge_at,gst_at FROM pckge_lst_t WHERE pckge_id IN (${data.crnt_pln_id})`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : getcstmrprfleDtlsFrmBssMdl
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles updcstmrtyp
*
******************************************************************************/
exports.getcstmrprfleDtlsFrmBssMdl = function (usrdtls) {
    var fnm = "getcstmrprfleDtlsFrmBssMdl"
	var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno, 'Profile' as 'Profile',m.mbl_nu as lmo_mobile,cf.kyc_doc_in,cf.crnt_pln_id,cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd, m.fst_nm as lmo_name ,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,cf.caf_id,d.dstrt_nm,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,cs.sts_nm,ec.entrpe_type_nm,DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts from caf_dtl_t cf join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1 LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id join mrcht_usr_lst_t as m on m.mrcht_usr_nm=a.agnt_cd JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id where cf.caf_id = ${usrdtls.caf_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : insrttokentotbles
* Description : login
* Arguments : callback function
* 22/07/2021 - ramesh  - to get default profiles updcstmrtyp
*
******************************************************************************/
exports.insrttokentotbles = function (usrdtls, token, data) {
    var fnm = "insrttokentotbles"
	var QRY_TO_EXEC = `INSERT INTO prepaid_customer_tokens (caf_id,token,token_status,created_at,fcm_id,device_type,device_id) VALUES ('${usrdtls.caf_id}','${token}','1',CURRENT_TIMESTAMP(),"${data.fcm_id}",'${data.device_type}','${data.device_id}');`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : check_sbscrbd_app_usrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.check_sbscrbd_app_usrMdl = function (data) {
    var fnm = "check_sbscrbd_app_usrMdl"
    var QRY_TO_EXEC = `select *  from caf_dtl_t where mbl_nu='${data.mobile_no}' AND caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : updpwd_sbscrbd_app_usrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.updpwd_sbscrbd_app_usrMdl = function (data, result, genPwd) {
    var fnm = "updpwd_sbscrbd_app_usrMdl"
	console.log("data in mdl",result);
	var QRY_TO_EXEC = `UPDATE caf_dtl_t SET pwd_encrd_tx = MD5('${genPwd}') where caf_id='${result.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : check_sbscr_app_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
 exports.check_sbscr_app_pwdMdl = function (data) {
    var fnm = "check_sbscr_app_pwdMdl"
	/*var namearry=data.caf_id.split("(");
    var pwdarry=data.old_password.split("(");
    var user=[];
    var pwd=[];
    for(i=0;i<namearry.length;i++){
        user+=namearry[i]
    }
    for(i=0;i<pwdarry.length;i++){
        pwd+=pwdarry[i]
    }*/
    var QRY_TO_EXEC = `select caf_id from caf_dtl_t where caf_id=${data.caf_id} AND pwd_encrd_tx = MD5('${data.old_password}');`;
	/*var QRY_TO_EXEC = `select caf_id from caf_dtl_t where caf_id=${user} AND pwd_encrd_tx = MD5('${pwd}');`*/
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_sbscr_app_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
 exports.change_sbscr_app_pwdMdl = function (data) {
    var fnm = "change_sbscr_app_pwdMdl"
	/*var namearry=data.caf_id.split("(");
    var pwdarry=data.new_password.split("(");
    var user=[];
    var pwd=[];
    for(i=0;i<namearry.length;i++){
        user+=namearry[i]
    }
    for(i=0;i<pwdarry.length;i++){
        pwd+=pwdarry[i]
    }*/
    var QRY_TO_EXEC = `UPDATE caf_dtl_t SET pwd_encrd_tx=MD5('${data.new_password}') where caf_id='${data.caf_id}'`;
	/*var QRY_TO_EXEC = `UPDATE caf_dtl_t SET pwd_encrd_tx=MD5('${pwd}') where caf_id='${user}'`;*/
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : check_reset_pwd
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.check_reset_pwd = function (data) {
    var fnm = "check_reset_pwd"
	console.log("data in mdl",data);
	var QRY_TO_EXEC = `select * from caf_dtl_t where pwd_encrd_tx = MD5('${data.otp}') and caf_id='${data.caf_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_reset_pwd
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.change_reset_pwd = function (data) {
    var fnm = "change_reset_pwd"
	/*var namearry=data.caf_id.split("(");
    var pwdarry=data.new_password.split("(");
    var user=[];
    var pwd=[];
    for(i=0;i<namearry.length;i++){
        user+=namearry[i]
    }
    for(i=0;i<pwdarry.length;i++){
        pwd+=pwdarry[i]
    }*/
	var QRY_TO_EXEC = `UPDATE caf_dtl_t SET pwd_encrd_tx = MD5('${data.new_password}') where caf_id='${data.caf_id}'`;
	/*var QRY_TO_EXEC = `UPDATE caf_dtl_t SET pwd_encrd_tx = MD5('${pwd}') where caf_id='${user}'`*/
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
