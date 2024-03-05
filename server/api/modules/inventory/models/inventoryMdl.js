var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function       : getInvetryPrdctLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getInvetryPrdctLstMdl = function (user) {
    var fnm = "getInvetryPrdctLstMdl"
    var QRY_TO_EXEC = `select  ips.splr_id,ips.splr_nm,ip.prdct_id,ip.prdct_nm,iv.vndr_nm,iv.vndr_id from inv_prdct_lst_t as ip
    JOIN inv_prdct_vndr_splr_rel_t as ipv on ipv.prdct_id=ip.prdct_id
    join inv_splr_lst_t as ips on ips.splr_id = ipv.splr_id
    join inv_vndr_lst_t as iv on iv.vndr_id = ipv.vndr_id
    where ip.a_in = 1
    GROUP BY ip.prdct_id`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getPrdctModlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPrdctModlsMdl = function (id, user) {
    var fnm = "getPrdctModlsMdl"
    var QRY_TO_EXEC = `select  * from inv_prdct_mdle_lst_t where prdct_id = '${id}' ORDER BY mdle_id`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getSetupboxPrefixMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getSetupboxPrefixMdl = function (user) {
    var fnm = "getSetupboxPrefixMdl"
    var QRY_TO_EXEC = `select  * from inv_stpbx_prfx_lst_t where a_in = 1`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : uploadSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.uploadSetupBoxMdl = function (data, user) {
    var fnm = "uploadSetupBoxMdl"
    let txt = JSON.stringify(data)
    var QRY_TO_EXEC = `insert into inv_stpbx_upld_lst_t (upld_cmnt_tx,upld_ct,upld_fld_in,crte_user_id,a_in,i_ts) values('${txt}',${data.length},0,${user.mrcht_usr_id},1,current_timestamp())`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insertSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertSetupBoxMdl = function (data, upid, user) {
    var fnm = "insertSetupBoxMdl"
    var QRY_TO_EXEC = `insert into inv_stpbx_lst_s (mac_addr_cd,srl_nu,btch_id,btch_ts,prdct_id,vndr_id,splr_id,mdle_id,upld_id,prfx_id,lmo_agnt_id,mso_agnt_id,enty_sts_id,crte_user_id,a_in,i_ts) values('${data.Cpe_Mac_Address}','${data.Cpe_Serial_No}','${data.Batch_Id || null}','${data.Batch_Date}',${data.prdct_id},${data.vndr_id},'${data.splr_id}',${data.mdle_id},${upid},${data.prfx_id},${data.lmo_agnt_id},${data.mso_agnt_id},1,${user.mrcht_usr_id},1,current_timestamp())`;
	console.log(QRY_TO_EXEC)
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : selectSetupBoxMastMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectSetupBoxMastMdl = function (id, user) {
    var fnm = "selectSetupBoxMastMdl"
    var QRY_TO_EXEC = `SELECT s.srl_nu as Cpe_Serial_No,s.mac_addr_cd as Cpe_Mac_Address,s.btch_id as Batch_Id,s.btch_ts as Batch_Date,a.agnt_cd as assignd_to_agnt
    FROM  inv_stpbx_lst_t  s
    right JOIN inv_stpbx_lst_s m on m.mac_addr_cd = s.mac_addr_cd or m.srl_nu = s.srl_nu
    left join agnt_lst_t a on a.agnt_id=s.lmo_agnt_id
    WHERE s.srl_nu is not NULL AND  s.mac_addr_cd is not NULL and s.a_in=1 and m.btch_id=${id}
    GROUP BY m.srl_nu, m.mac_addr_cd
    ORDER BY m.srl_nu, m.mac_addr_cd`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : insertSetupBoxMastMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertSetupBoxMastMdl = function (id, user) {
    var fnm = "insertSetupBoxMastMdl"
    var QRY_TO_EXEC = `INSERT INTO inv_stpbx_lst_t (mac_addr_cd,srl_nu,btch_id,btch_ts,enty_sts_id,prdct_id,vndr_id,splr_id,mdle_id,upld_id,prfx_id,lmo_agnt_id,mso_agnt_id,caf_id,crte_usr_id,a_in,i_ts)
    SELECT s.mac_addr_cd,s.srl_nu,s.btch_id,s.btch_ts,s.enty_sts_id,s.prdct_id,m.vndr_id,s.splr_id,s.mdle_id,s.upld_id,s.prfx_id,s.lmo_agnt_id,
    s.mso_agnt_id,s.caf_id,s.crte_user_id,1,CURRENT_TIMESTAMP()
    FROM inv_stpbx_lst_s s
    LEFT JOIN inv_stpbx_lst_t m on  m.mac_addr_cd = s.mac_addr_cd AND m.a_in = 1 or m.srl_nu = s.srl_nu AND m.a_in = 1
    WHERE  m.mac_addr_cd is NULL and m.srl_nu is NULL and s.btch_id=${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : deleteSetboxStgMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteSetboxStgMdl = function (id, user) {
    var fnm = "deleteSetboxStgMdl"
    var QRY_TO_EXEC = `delete from inv_stpbx_lst_s where btch_id=${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getAgentCpeStockMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentCpeStockMdl = function (id, user) {
    var fnm = "getAgentCpeStockMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%d-%m-%Y")as btch_ts,
                        ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm ,i.caf_id,es.sts_nm from caf_dtl_t i 
                        right JOIN inv_stpbx_lst_t as isv on isv.caf_id = i.caf_id
                        JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
                        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
                        JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id 
                        JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
                        JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
                        left JOIN enty_sts_lst_t es on es.enty_sts_id = i.enty_sts_id
                        WHERE isv.lmo_agnt_id = ${id} and isv.a_in!=0;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getAgentCpeStockByCtgryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentCpeStockByCtgryMdl = function (ctgry, id, user) {
    var fnm = "getAgentCpeStockByCtgryMdl"
    if (ctgry == 3) {
        var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%d-%m-%Y")as btch_ts,
        ip.prdct_nm,im.mdle_nm,a.agnt_cd as mso_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm ,i.caf_id,es.sts_nm from caf_dtl_t i 
        right JOIN inv_stpbx_lst_t as isv on isv.caf_id = i.caf_id
        JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
        JOIN agnt_lst_t as a on a.agnt_id = isv.mso_agnt_id 
        left JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
        left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
        left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
        left JOIN enty_sts_lst_t es on es.enty_sts_id = i.enty_sts_id
        WHERE isv.mso_agnt_id = ${id} and isv.lmo_agnt_id is null and isv.a_in=1;`;
    }
    else {
        var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%d-%m-%Y")as btch_ts,
        ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm ,i.caf_id,es.sts_nm from caf_dtl_t i 
        right JOIN inv_stpbx_lst_t as isv on isv.caf_id = i.caf_id
        JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
        JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id 
        left JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
        left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
        left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
        left JOIN enty_sts_lst_t es on es.enty_sts_id = i.enty_sts_id
        WHERE isv.lmo_agnt_id = ${id} and isv.a_in=1;`;
    }

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getAgentCpeStockPrdctIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentCpeStockPrdctIdMdl = function (id, prdct_id, user) {
    var fnm = "getAgentCpeStockPrdctIdMdl"
    /*var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%d-%m-%Y")as btch_ts,
                        ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm ,i.caf_id,es.sts_nm from caf_dtl_t i 
                        right JOIN inv_stpbx_lst_t as isv on isv.caf_id = i.caf_id
                        JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
                        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
                        JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id 
                        JOIN vlge_lst_t v ON (v.vlge_nu =a.ofce_vlge_id or v.vlge_id=a.ofce_vlge_id) and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
                        JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
                        left JOIN enty_sts_lst_t es on es.enty_sts_id = i.enty_sts_id
                        WHERE isv.lmo_agnt_id = ${id} and isv.a_in!=0 and isv.prdct_id = ${prdct_id};`;*/
	var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%d-%m-%Y")as btch_ts,
                        ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm ,i.caf_id,es.sts_nm from caf_dtl_t i 
                        right JOIN inv_stpbx_lst_t as isv on isv.caf_id = i.caf_id
                        JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
                        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
                        JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id 
                        JOIN vlge_lst_t v ON (v.vlge_nu =a.ofce_vlge_id or v.vlge_id=a.ofce_vlge_id) and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
                        JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
                        left JOIN enty_sts_lst_t es on es.enty_sts_id = i.enty_sts_id
                        WHERE isv.lmo_agnt_id = ${id} and isv.a_in!=0;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getAgentCpeStockByPrdctIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentCpeStockByPrdctIdMdl = function (id, prdctId, frm_date, to_date, srlnum, ctgryId, user) {
    var fnm = "getAgentCpeStockByPrdctIdMdl"
    var where = ''
    if (frm_date == 'null' && to_date == 'null' && srlnum == 'null' && prdctId == 'null') {
        if (ctgryId == 3) {
            where = `isv.mso_agnt_id = ${id} and isv.lmo_agnt_id is null and isv.a_in <> 0`;
        }
        else {
            where = `isv.lmo_agnt_id = ${id} and isv.a_in <> 0`;
        }
    }
    else if (frm_date && to_date && id && srlnum == 'null') {
        if (ctgryId == 3) {
            where = `isv.mso_agnt_id = ${id} and isv.lmo_agnt_id is null and isv.prdct_id = ${prdctId} and isv.a_in <> 0`
        }
        else {
            where = `isv.lmo_agnt_id = ${id} and isv.prdct_id = ${prdctId} and isv.a_in <> 0`
        }
    }
    else if (frm_date == 'null' && to_date == 'null' && id && prdctId && srlnum == 'null') {
        if (ctgryId == 3) {
            where = `isv.mso_agnt_id = ${id} and isv.lmo_agnt_id is null and isv.prdct_id = ${prdctId} and isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}'`
        }
        else {
            where = `isv.lmo_agnt_id = ${id} and isv.prdct_id = ${prdctId} and isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}'`
        }
    }
    else if (frm_date == 'null' && to_date == 'null' && prdctId == 'null' && srlnum) {
        where = `isv.a_in <> 0 and isv.srl_nu = '${srlnum}'`
    }
    else if (frm_date == 'null' && to_date == 'null' && prdctId && srlnum) {
        where = `isv.prdct_id = ${prdctId} and isv.a_in <> 0 and isv.srl_nu = '${srlnum}'`
    }
    else if (frm_date && to_date && srlnum && prdctId == 'null' && id == 'null') {
        where = `isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}' and isv.srl_nu = '${srlnum}'`
    }
    else if (frm_date && to_date && srlnum && prdctId && id == 'null') {
        where = `isv.prdct_id = ${prdctId} and isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}' and isv.srl_nu = '${srlnum}'`
    }
    else if (frm_date && to_date && srlnum == 'null' && prdctId == 'null' && id) {
        if (ctgryId == 3) {
            where = `isv.mso_agnt_id = ${id} and isv.lmo_agnt_id is null and isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}'`
        }
        else {
            where = `isv.lmo_agnt_id = ${id}  and isv.a_in <> 0 and isv.btch_ts BETWEEN '${frm_date}' and '${to_date}'`
        }
    }
    if (ctgryId == 3) {
        var QRY_TO_EXEC = `select  ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.stpbx_id,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%Y-%m-%d")as btch_ts,ip.prdct_nm,im.mdle_nm,
        a.agnt_cd as mso_code,a.agnt_id,d.dstrt_nm as mso_dstrt_nm,m.mndl_nm as mso_mndl_nm,v.vlge_nm as mso_vlge_nm,isv.caf_id,c.spnd_in,a.agnt_ctgry_id as mso_ctgry
         from inv_stpbx_lst_t as isv
            left JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
            left JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id 
            left JOIN agnt_lst_t as a on a.agnt_id = isv.mso_agnt_id
            left JOIN caf_dtl_t as c on c.caf_id = isv.caf_id and c.actve_in = 0 and c.spnd_in = 1
            left JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
            left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
            left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
            where ${where} GROUP BY isv.stpbx_id`;
    }
    else {
        var QRY_TO_EXEC = `select  ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.stpbx_id,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%Y-%m-%d")as btch_ts,ip.prdct_nm,im.mdle_nm,
        a.agnt_cd as lmo_code,ap.agnt_cd as mso_code,a.agnt_id,ap.agnt_id as prnt_agnt_id,d.dstrt_nm,m.mndl_nm,v.vlge_nm,isv.caf_id,c.spnd_in,d1.dstrt_nm as mso_dstrt_nm,m1.mndl_nm as mso_mndl_nm,v1.vlge_nm as mso_vlge_nm,a.agnt_ctgry_id as lmo_ctgry,ap.agnt_ctgry_id as mso_ctgry
             from inv_stpbx_lst_t as isv
            left JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
            left JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
            left JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id 
            left JOIN caf_dtl_t as c on c.caf_id = isv.caf_id 
            left JOIN agnt_lst_t as ap on ap.agnt_id = isv.mso_agnt_id 
            left JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
            left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
            left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
            left JOIN vlge_lst_t v1 ON v1.vlge_nu = ap.ofce_vlge_id and v1.mndl_id = ap.ofce_mndl_id AND v1.dstrt_id = ap.ofce_dstrt_id
            left JOIN mndl_lst_t m1 ON m1.mndl_nu = v1.mndl_id AND v1.dstrt_id = m1.dstrt_id
            left JOIN dstrt_lst_t d1 ON d1.dstrt_id = v1.dstrt_id
            where ${where} GROUP BY isv.stpbx_id`;
    }

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getUploadCpeStockMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getUploadCpeStockMdl = function (user) {
    var fnm = "getUploadCpeStockMdl"
    var QRY_TO_EXEC = `select st.upld_id,st.srl_nu,st.mac_addr_cd,DATE_FORMAT(st.btch_ts,"%Y-%m-%d")as btch_ts,ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,
    ap.agnt_cd as mso_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm from inv_stpbx_upld_lst_t bx
    JOIN  inv_stpbx_lst_t st on st.upld_id = bx.upld_id
    JOIN inv_prdct_lst_t as ip on ip.prdct_id = st.prdct_id
    JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = st.mdle_id
    JOIN agnt_lst_t as a on a.agnt_id = st.lmo_agnt_id 
    left JOIN agnt_lst_t as ap on ap.prnt_agnt_id = st.mso_agnt_id
    JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
    JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id 
    and bx.crte_user_id = ${user.mrcht_usr_id} ORDER BY st.i_ts DESC limit 1000 `;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getRecntUploadCpeStockMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRecntUploadCpeStockMdl = function (user) {
    var fnm = "getRecntUploadCpeStockMdl"
    var QRY_TO_EXEC = `select st.upld_id,ROW_NUMBER() OVER ( ORDER BY st.srl_nu) as sno,st.srl_nu,st.mac_addr_cd,DATE_FORMAT(st.btch_ts,"%Y-%m-%d")as btch_ts,ip.prdct_nm,im.mdle_nm,a.agnt_cd as lmo_code,
    ap.agnt_cd as mso_code,d.dstrt_nm,m.mndl_nm,v.vlge_nm from inv_stpbx_upld_lst_t bx
    JOIN  inv_stpbx_lst_t st on st.upld_id = bx.upld_id
    JOIN inv_prdct_lst_t as ip on ip.prdct_id = st.prdct_id
    JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = st.mdle_id
    JOIN agnt_lst_t as a on a.agnt_id = st.lmo_agnt_id 
    left JOIN agnt_lst_t as ap on ap.prnt_agnt_id = st.mso_agnt_id
    JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id 
    JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id GROUP BY st.stpbx_id
    ORDER BY st.i_ts DESC limit 1000`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insrtaddPrixMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtaddPrixMdl = function (data, user) {
    var fnm = "insrtaddPrixMdl"
    var QRY_TO_EXEC = `insert into inv_stpbx_prfx_lst_t (prfx_cd,crte_user_id,a_in,i_ts) values('${data.Prixnm}',${user.mrcht_usr_id},1,current_timestamp())`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insrtTransfrdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtTransfrdtlsMdl = function (data, user) {
    var fnm = "insrtTransfrdtlsMdl"
    var QRY_TO_EXEC = `insert into inv_stpbx_trnsfr_dtl_t (trnsfr_cmnt_tx,trnsfr_ct,trnsfr_fld_in,crte_user_id,a_in,i_ts) values('SetBox Transfer Details',${data.length},1,${user.mrcht_usr_id},1,current_timestamp())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : checkSrlnoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.checkSrlnoMdl = function (data, user) {
    var fnm = "checkSrlnoMdl"
    console.log(data)
    var QRY_TO_EXEC = `select * from inv_stpbx_lst_t where srl_nu = '${data.Cpe_Serial_No}' and lmo_agnt_id=${data.frm_lmo_agnt_id} and a_in=1`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : insrtTransfrRelMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtTransfrRelMdl = function (data, user, id) {
    var fnm = "insrtTransfrRelMdl"
    if(data.lmo_ctgry==null || !data.lmo_ctgry){
        console.log("in if")

    var QRY_TO_EXEC = [`insert into inv_stpbx_trnsfr_rel_t (trnsfr_id,stpbx_id,to_lmo_agnt_id,frm_lmo_agnt_id,crte_user_id,a_in,i_ts) values(${id},'${data.stpbx_id}',${data.to_agnt_id},${data.frm_agnt_id},${user.mrcht_usr_id},1,current_timestamp())`, `update inv_stpbx_lst_t set mso_agnt_id = ${data.to_agnt_id},lmo_agnt_id = null,u_ts=current_timestamp(), updte_usr_id=${user.mrcht_usr_id} where stpbx_id = '${data.stpbx_id}' and a_in=1`];
    }
    else{
        console.log("in else")
        var QRY_TO_EXEC = [`insert into inv_stpbx_trnsfr_rel_t (trnsfr_id,stpbx_id,to_lmo_agnt_id,frm_lmo_agnt_id,crte_user_id,a_in,i_ts) values(${id},'${data.stpbx_id}',${data.to_agnt_id},${data.frm_agnt_id},${user.mrcht_usr_id},1,current_timestamp())`, `update inv_stpbx_lst_t set lmo_agnt_id = ${data.to_agnt_id},mso_agnt_id = ${data.prnt_agnt_id},u_ts=current_timestamp(), updte_usr_id=${user.mrcht_usr_id} where stpbx_id = '${data.stpbx_id}' and a_in=1`];   
    }
    console.log(QRY_TO_EXEC)

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deleteCpeToAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteCpeToAgentMdl = function (data, user) {
    var fnm = "deleteCpeToAgentMdl"
    var QRY_TO_EXEC = `update inv_stpbx_lst_t set a_in =0, d_in=1, u_ts=current_timestamp(), updte_usr_id=${user.mrcht_usr_id} where stpbx_id = ${data.stpbx_id} `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getTransferUploadCpeStockMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getTransferUploadCpeStockMdl = function (user) {
    var fnm = "getTransferUploadCpeStockMdl"
    var QRY_TO_EXEC = `select st.trnsfr_id,s.srl_nu,s.mac_addr_cd,DATE_FORMAT(s.u_ts,"%Y-%m-%d")as u_ts,
    ip.prdct_nm,im.mdle_nm,a.agnt_cd as to_lmo_code,al.agnt_cd as frm_lmo_code,ap.agnt_cd as mso_code,d.dstrt_nm as to_dstrt_nm,m.mndl_nm as to_mndl_nm,v.vlge_nm as to_vlge_nm,d1.dstrt_nm as frm_dstrt_nm,m1.mndl_nm as frm_mndl_nm,v1.vlge_nm as frm_vlge_nm
     from inv_stpbx_trnsfr_dtl_t bx
           JOIN  inv_stpbx_trnsfr_rel_t st on st.trnsfr_id = bx.trnsfr_id
           JOIN inv_stpbx_lst_t s on s.stpbx_id = st.stpbx_id
           JOIN inv_prdct_lst_t as ip on ip.prdct_id = s.prdct_id
           JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = s.mdle_id
           JOIN agnt_lst_t as a on a.agnt_id = st.to_lmo_agnt_id 
           JOIN agnt_lst_t as al on al.agnt_id = st.frm_lmo_agnt_id
           left JOIN agnt_lst_t as ap on ap.agnt_id = a.prnt_agnt_id
           JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
           JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
           JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
           and bx.crte_user_id = ${user.mrcht_usr_id}
           left JOIN vlge_lst_t v1 ON v1.vlge_nu = al.ofce_vlge_id and v1.mndl_id = al.ofce_mndl_id AND v1.dstrt_id = al.ofce_dstrt_id
           left JOIN mndl_lst_t m1 ON m1.mndl_nu = v1.mndl_id AND v1.dstrt_id = m1.dstrt_id
           left JOIN dstrt_lst_t d1 ON d1.dstrt_id = v1.dstrt_id order by st.i_ts desc`;
		   console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getTransferRecntUploadCpeStockMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getTransferRecntUploadCpeStockMdl = function (user) {
    var fnm = "getTransferRecntUploadCpeStockMdl"
    var QRY_TO_EXEC = `select s.trnsfr_id,st.srl_nu,st.mac_addr_cd,DATE_FORMAT(st.u_ts,"%Y-%m-%d")as u_ts,ip.prdct_nm,im.mdle_nm,
    a.agnt_cd as to_lmo_code,al.agnt_cd as frm_lmo_code,ap.agnt_cd as mso_code,d.dstrt_nm as to_dstrt_nm,m.mndl_nm as to_mndl_nm,v.vlge_nm as to_vlge_nm,
d1.dstrt_nm as frm_dstrt_nm,m1.mndl_nm as frm_mndl_nm,v1.vlge_nm as frm_vlge_nm
        from inv_stpbx_trnsfr_dtl_t bx
        join inv_stpbx_trnsfr_rel_t s on s.trnsfr_id = bx.trnsfr_id
        JOIN  inv_stpbx_lst_t st on st.stpbx_id = s.stpbx_id
        JOIN inv_prdct_lst_t as ip on ip.prdct_id = st.prdct_id
        JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = st.mdle_id
        JOIN agnt_lst_t as a on a.agnt_id = s.to_lmo_agnt_id
        JOIN agnt_lst_t as al on al.agnt_id = s.frm_lmo_agnt_id
        left JOIN agnt_lst_t as ap on ap.agnt_id = a.prnt_agnt_id
        JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
        JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
        JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
        left JOIN vlge_lst_t v1 ON v1.vlge_nu = al.ofce_vlge_id and v1.mndl_id = al.ofce_mndl_id AND v1.dstrt_id = al.ofce_dstrt_id
        left JOIN mndl_lst_t m1 ON m1.mndl_nu = v1.mndl_id AND v1.dstrt_id = m1.dstrt_id
        left JOIN dstrt_lst_t d1 ON d1.dstrt_id = v1.dstrt_id order by bx.i_ts desc `;
		console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getInvntrySplrsCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getInvntrySplrsCntMdl = function (user) {
    var fnm = "getInvntrySplrsCntMdl"
    var QRY_TO_EXEC = `select count(*) as total,
    sum(case when n.vndr_id = 1 then 1 else 0 end) as 'DASAN',
    sum(case when n.vndr_id = 2 then 1 else 0 end) as 'ZTE',
    sum(case when n.vndr_id = 3 then 1 else 0 end) as 'PT',
    sum(case when n.vndr_id = 4 then 1 else 0 end) as 'RGW',
    sum(case when n.vndr_id = 6 then 1 else 0 end) as 'YAGA',
    sum(case when n.vndr_id = 7 then 1 else 0 end) as 'IPTV',
    sum(case when n.vndr_id = 8 then 1 else 0 end) as 'DSNCOMBO',
	'Total' as label
    from inv_stpbx_lst_t as s

    join inv_prdct_vndr_splr_rel_t as n on n.prdct_id = s.prdct_id and n.mdle_id = s.mdle_id
    where s.lmo_agnt_id = ${user.usr_ctgry_ky} and s.a_in = 1
    UNION
    select sum(case when caf_id is not null then 1 else 0 end) as ttl_cus_cpe,
    sum(case when n.vndr_id = 1 then 1 else 0 end) as 'DASAN',
    sum(case when n.vndr_id = 2 then 1 else 0 end) as 'ZTE',
    sum(case when n.vndr_id = 3 then 1 else 0 end) as 'PT',
    sum(case when n.vndr_id = 4 then 1 else 0 end) as 'RGW',
    sum(case when n.vndr_id = 6 then 1 else 0 end) as 'YAGA',
    sum(case when n.vndr_id = 7 then 1 else 0 end) as 'IPTV',
    sum(case when n.vndr_id = 8 then 1 else 0 end) as 'DSNCOMBO',
    case when caf_id is not null then 'CPE Allocated to Customers' else 'Total' end as label
    from inv_stpbx_lst_t as s

    join inv_prdct_vndr_splr_rel_t as n on n.prdct_id = s.prdct_id and n.mdle_id = s.mdle_id
    where s.lmo_agnt_id = ${user.usr_ctgry_ky} and s.a_in = 1 and caf_id is not null
    UNION

    select sum(case when caf_id is null then 1 else 0 end) as ttl_avli_cpe,
    sum(case when n.vndr_id = 1 then 1 else 0 end) as 'DASAN',
    sum(case when n.vndr_id = 2 then 1 else 0 end) as 'ZTE',
    sum(case when n.vndr_id = 3 then 1 else 0 end) as 'PT',
    sum(case when n.vndr_id = 4 then 1 else 0 end) as 'RGW',
    sum(case when n.vndr_id = 6 then 1 else 0 end) as 'YAGA',
    sum(case when n.vndr_id = 7 then 1 else 0 end) as 'IPTV',
    sum(case when n.vndr_id = 8 then 1 else 0 end) as 'DSNCOMBO',
    case when caf_id is null then 'Available CPEs' else 'Total' end as label
    from inv_stpbx_lst_t as s

    join inv_prdct_vndr_splr_rel_t as n on n.prdct_id = s.prdct_id and n.mdle_id = s.mdle_id
    where s.lmo_agnt_id = ${user.usr_ctgry_ky}  and s.a_in = 1 and caf_id is null ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getInvntryTtlCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getInvntryTtlCntMdl = function (user) {
    var fnm = "getInvntryTtlCntMdl"
    var QRY_TO_EXEC = `select count(*) as 'Total', 
    sum(case when caf_id is not null then 1 else 0 end) as 'Allocated', 
    sum(case when caf_id is null then 1 else 0 end) as 'Available'
    from inv_stpbx_lst_t as s
	join inv_prdct_vndr_splr_rel_t as n on n.prdct_id = s.prdct_id and n.mdle_id = s.mdle_id
    where s.lmo_agnt_id = ${user.usr_ctgry_ky} and s.a_in = 1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getCpeStockBySrlnumMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCpeStockBySrlnumMdl = function (data, user) {
    var fnm = "getCpeStockBySrlnumMdl"
    let dlmtr = ' , ';
    let counter = 0;
    let btch_qry = ' ';
    if (data) {
        data.filter((k) => {
            if (++counter == data.length) {
                dlmtr = ')';
            }
            btch_qry += `'${k.Cpe_Serial_No}' ${dlmtr} `
        })
    }
    console.log(btch_qry)
    var QRY_TO_EXEC = `select  ROW_NUMBER() OVER ( ORDER BY isv.srl_nu) as sno,isv.stpbx_id,isv.srl_nu,isv.mac_addr_cd,DATE_FORMAT(isv.btch_ts,"%Y-%m-%d")as btch_ts,ip.prdct_nm,im.mdle_nm,
    a.agnt_cd as lmo_code,ap.agnt_cd as mso_code,a.agnt_id,ap.agnt_id as prnt_agnt_id,d.dstrt_nm,m.mndl_nm,v.vlge_nm,isv.caf_id,c.spnd_in,d1.dstrt_nm as mso_dstrt_nm,m1.mndl_nm as mso_mndl_nm,v1.vlge_nm as mso_vlge_nm,
a.agnt_ctgry_id as lmo_ctgry,ap.agnt_ctgry_id as mso_ctgry 
from inv_stpbx_lst_t as isv
        left JOIN inv_prdct_lst_t as ip on ip.prdct_id = isv.prdct_id
        left JOIN inv_prdct_mdle_lst_t as im on im.mdle_id = isv.mdle_id
        left JOIN agnt_lst_t as a on a.agnt_id = isv.lmo_agnt_id
        left JOIN caf_dtl_t as c on c.caf_id = isv.caf_id and c.actve_in = 0 and c.spnd_in = 1
        left JOIN agnt_lst_t as ap on ap.agnt_id = isv.mso_agnt_id
        left JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
        left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
        left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
        left JOIN vlge_lst_t v1 ON v1.vlge_nu = ap.ofce_vlge_id and v1.mndl_id = ap.ofce_mndl_id AND v1.dstrt_id = ap.ofce_dstrt_id
        left JOIN mndl_lst_t m1 ON m1.mndl_nu = v1.mndl_id AND v1.dstrt_id = m1.dstrt_id
        left JOIN dstrt_lst_t d1 ON d1.dstrt_id = v1.dstrt_id
        where srl_nu in (${btch_qry} and isv.a_in <> 0 GROUP BY isv.stpbx_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getBoxDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getBoxDtlsMdl = function (data, user) {
    var fnm = "getBoxDtlsMdl"
    var condition=''
 if(data.type==1)
 {
    condition=`where mac_addr_cd like '${data.iptv_mac_ad}' and prdct_id =2 and a_in=1`
 }
 else if(data.type==2)
 {
    condition=`where srl_nu LIKE '${data.srl_nu}' and prdct_id =1 and a_in=1`
 }
    var QRY_TO_EXEC = `SELECT * FROM inv_stpbx_lst_t islt ${condition}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getboxdtlsMdl
* Description   : Get CAF details related to termination
* Arguments     : callback function
*
******************************************************************************/

exports.getboxdtlsMdl = function (data, user) {
    var fnm = "getboxdtlsMdl"

    var QRY_TO_EXEC = `select srl_nu,stpbx_id,mac_addr_cd,caf_id from inv_stpbx_lst_t
     where srl_nu='${data}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtboxdtlsMdl
* Description   : Get CAF details related to termination
* Arguments     : callback function
* combooo
******************************************************************************/

exports.updtboxdtlsMdl = function (data, user) {
    var fnm = "updtboxdtlsMdl"
    console.log(data)
    var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_onu_srl_nu}','${data.old_iptv_srl_nu}') and caf_id =${data.caf_id} `,
    `update caf_stpbx_rel_t set a_in=0 where stpbx_id in (${data.old_iptv_stpbx_id},${data.old_onu_stpbx_id}) and caf_id =${data.caf_id}`,
    `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_onu_srl_nu}','${data.new_iptv_srl_nu}')`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtoldbxMdl
* Description   : Get CAF details related to termination
* Arguments     : callback function
* 
******************************************************************************/

exports.updtoldbxMdl = function (data,id, user) {
    var fnm = "updtoldbxMdl"
    console.log(data)
    var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu ='${data.srl_nu}'and caf_id=${id}`,
    `update caf_stpbx_rel_t set a_in=0 where stpbx_id=${data.stpbx_id} and caf_id =${id}`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtnewbxMdl
* Description   : Get CAF details related to termination
* Arguments     : callback function
* 
******************************************************************************/

exports.updtnewbxMdl = function (data,id, user) {
    var fnm = "updtnewbxMdl"
    console.log(data)
    var QRY_TO_EXEC = `update inv_stpbx_lst_t set caf_id =${id} where srl_nu ='${data.srl_nu}'`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtcafdtltblMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updtcafdtltblMdl = function (data, type, caf_id, user) {
    var fnm = "updtcafdtltblMdl"
    console.log(data)
    console.log(type)
    console.log(caf_id)
    if (type == 'iptv') {
        var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=3,enty_sts_id=6,iptv_stpbx_id=${data.stpbx_id}, iptv_srl_nu ='${data.srl_nu}',iptv_mac_addr_tx='${data.mac_addr_cd}', u_ts=current_timestamp(), a_in=1
        where caf_id='${caf_id}'`;
    } else if (type == 'onu') {
        var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=3,enty_sts_id=6, onu_stpbx_id=${data.stpbx_id}, onu_srl_nu ='${data.srl_nu}', onu_mac_addr_tx ='${data.mac_addr_cd}',u_ts=current_timestamp(), a_in=1
        where caf_id='${caf_id}'`;
    }
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insrtbxrelMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insrtbxrelMdl = function (data, caf_id, user) {
    var fnm = "insrtbxrelMdl"
    console.log(data)

    var QRY_TO_EXEC = `insert into caf_stpbx_rel_t(caf_id,stpbx_id,a_in,i_ts)values('${caf_id}',${data.stpbx_id},1,current_timestamp())`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updatebbnlboxinvntrydtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updatebbnlboxinvntrydtlsMdl = function (data, caf_id, user) {
    var fnm = "updatebbnlboxinvntrydtlsMdl"
    console.log(data)
    var values = ``
    if (data.onu_srl_nu) {
        values += `'${data.onu_srl_nu}'`
    }
    if (data.iptv_bx_srl_num) {
        values += `,'${data.iptv_bx_srl_num}'`
    }

    var QRY_TO_EXEC = `UPDATE inv_stpbx_lst_t set caf_id = ${caf_id},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
    where srl_nu in (${values}) `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insrtbbnlboxinvntrydtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insrtbbnlboxinvntrydtlsMdl = function (data, caf_id, user) {
    var fnm = "insrtbbnlboxinvntrydtlsMdl"
    console.log(data)

    
    values = `VALUES`
    if (data.onu_stpbx_id) {
        values += `(${caf_id},${data.onu_stpbx_id} ,1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`
    }
    if (data.iptv_stpbx_id) {
        values += `,(${caf_id},${data.iptv_stpbx_id} ,1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`
    }

    var QRY_TO_EXEC = `INSERT INTO caf_stpbx_rel_t (caf_id, stpbx_id, crnt_in,crte_usr_id,i_ts ) ${values}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updateTrmndCafsInvntryStpBxMdl
* Description   : Update CAF inventory in caf_stpbx_rel_t upon termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsInvntryStpBxMdl = (data, user) => {

    var QRY_TO_EXEC = ` UPDATE caf_stpbx_rel_t
                        SET a_in=0,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}


/*****************************************************************************
* Function      : updateTrmndCafsStpBxDtlsMdl
* Description   : Update CAF inventory setup details in inv_stpbx_lst_t upon termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsStpBxDtlsMdl = (data, user) => {

    var QRY_TO_EXEC = ` UPDATE inv_stpbx_lst_t
                        SET caf_id=NULL,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}

/*****************************************************************************
* Function       : updateBoxchangebbnlboxinvntrydtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateBoxchangebbnlboxinvntrydtlsMdl = function (data, user) {
    var fnm = "updateBoxchangebbnlboxinvntrydtlsMdl"
    if (data.changed == 'iptv') {
        var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_iptv_srno}')`,
        `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_iptv_srno}')`]
    } else if (data.changed == 'onu') {
        var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_onu_srno}')`,
        `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_onu_srno}')`]
    }
    else {
        var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_iptv_srno}','${data.old_onu_srno}')`,
        `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_iptv_srno}','${data.new_onu_srno}')`]
    }
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : insrtBoxchangebbnlboxinvntrydtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insrtBoxchangebbnlboxinvntrydtlsMdl = function (data, user) {
    var fnm = "insrtBoxchangebbnlboxinvntrydtlsMdl"
    console.log(data)
    
    var QRY_TO_EXEC = `update caf_stpbx_rel_t set a_in = 0 where stpbx_id in ('${data.iptv_stpbx_id}','${data.onu_stpbx_id}');`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};