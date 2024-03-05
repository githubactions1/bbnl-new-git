var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : insrtRequests
* Description   : insrtRequests
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtReqMdl = (rqst_dscn_tx, enty_id, actn_id, enty_ky, user, callback) => {
    var fnm = "insrtReqMdl"
    var QRY_TO_EXEC = `INSERT INTO api_rqst_dtl_t (rqst_dscn_tx, enty_id, actn_id, enty_ky, crte_usr_id) VALUES ('${rqst_dscn_tx}', ${enty_id}, ${actn_id}, ${enty_ky}, ${user.usr_ctgry_ky});`;
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
* Function      : insrtRequests
* Description   : insrtRequests
* Arguments     : callback function
* Change History :
* 24/12/2021    -  ramesh  - Initial Function
*
******************************************************************************/
exports.insrtReqnewMdl = (rqst_dscn_tx, enty_id, actn_id, enty_ky, user, callback) => {
    var fnm = "insrtReqnewMdl"
    var QRY_TO_EXEC = `INSERT INTO api_rqst_dtl_t (rqst_dscn_tx, enty_id, actn_id, enty_ky, crte_usr_id) VALUES ('${rqst_dscn_tx}', ${enty_id}, ${actn_id}, ${enty_ky}, ${enty_ky});`;
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
* Function      : insrtClnewMdl
* Description   : insrtClnewMdl
* Arguments     : callback function
* Change History :
* 24/12/2021    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtClnewMdl = (req_id, data, user, callback) => {
    var fnm = "insrtClnewMdl"
    let values = '';
    let delim = ','
    let counter = 0
    console.log(data)
    data.forEach(d => {
        if (!d.headerDtls) {
            d["headerDtls"] = "";
        }
        if (!d.input) {
            d["input"] = "";
        } if (!d.dpndnt_sqnce_nu) {
            d["dpndnt_sqnce_nu"] = null;
        }
        if (!d.dpndnt_kys) {
            d["dpndnt_kys"] = null;
        }
        if (!d.outpt_kys) {
            d["outpt_kys"] = null;
        }
        if (!d.cre_srvce_id) {
            d["cre_srvce_id"] = null;
        }
        values += `(${d.method},${req_id},${d.api_rqst_cl_type_id},${d.sqnce_nu},${d.dpndnt_sqnce_nu},${d.cre_srvce_id},'${d.dpndnt_kys}','${d.outpt_kys}','${d.url}','${JSON.stringify(d.headerDtls)}','${JSON.stringify(d.input).replace(/'/g, "`")}',"",1,0,${d.aplcn_id},${user},1)`
        if (counter != data.length - 1) {
            values += delim
        }
        counter++
    });

    var QRY_TO_EXEC = `INSERT INTO api_rqst_cl_dtl_t ( mthd_id, api_rqst_id,api_rqst_cl_type_id, sqnce_nu, dpndnt_sqnce_nu,cre_srvce_id,dpndnt_kys,outpt_kys, url_tx, hdr_tx ,url_dta_tx,rspne_tx, api_sts_id, rtry_ct,extrl_aplcn_id, crte_usr_id, a_in) VALUES ${values}`
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
* Function      : insrtRequests
* Description   : insrtRequests
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtCafMdl = (id, keys, data, user) => {
    var fnm = "updtCafMdl"

    let values = '';
    let count = 0;
    keys.forEach((k) => {
        console.log(data + "---key")
        if (k == 'subscribercode') {
            if (data != null)
                values += `mdlwe_sbscr_id = '${data[k]}'`
            else {
                values += `mdlwe_sbscr_id = null`
            }
        } else {
            if (data != 'null')
                values += `${k} = '${data[k]}'`
            else {
                values += `${k} = null`
            }
            // values += `${k} = ${data[k]}`
        }

        if (count != keys.length - 1) {
            values += ','
        }
        count++;
    })

    var QRY_TO_EXEC = ` UPDATE caf_dtl_t 
            SET ${values}
            WHERE caf_id= ${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insrtClMdl
* Description   : insrtClMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtClMdl = (req_id, data, user, callback) => {
    var fnm = "insrtClMdl"
    let values = '';
    let delim = ','
    let counter = 0
    console.log(data)
    data.forEach(d => {
        if (!d.headerDtls) {
            d["headerDtls"] = "";
        }
        if (!d.input) {
            d["input"] = "";
        } if (!d.dpndnt_sqnce_nu) {
            d["dpndnt_sqnce_nu"] = null;
        }
        if (!d.dpndnt_kys) {
            d["dpndnt_kys"] = null;
        }
        if (!d.outpt_kys) {
            d["outpt_kys"] = null;
        }
        if (!d.cre_srvce_id) {
            d["cre_srvce_id"] = null;
        }
        values += `(${d.method},${req_id},${d.api_rqst_cl_type_id},${d.sqnce_nu},${d.dpndnt_sqnce_nu},${d.cre_srvce_id},'${d.dpndnt_kys}','${d.outpt_kys}','${d.url}','${JSON.stringify(d.headerDtls)}','${JSON.stringify(d.input).replace(/'/g, "`")}',"",1,0,${d.aplcn_id},${user.usr_ctgry_ky},1)`
        if (counter != data.length - 1) {
            values += delim
        }
        counter++
    });

    var QRY_TO_EXEC = `INSERT INTO api_rqst_cl_dtl_t ( mthd_id, api_rqst_id,api_rqst_cl_type_id, sqnce_nu, dpndnt_sqnce_nu,cre_srvce_id,dpndnt_kys,outpt_kys, url_tx, hdr_tx ,url_dta_tx,rspne_tx, api_sts_id, rtry_ct,extrl_aplcn_id, crte_usr_id, a_in) VALUES ${values}`
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
* Function      : getDependentDataMdl
* Description   : getDependentDataMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDependentDataMdl = (id, keys, user) => {
    var fnm = "getDependentDataMdl"
    let select = '';
    let count = 0;
    keys.forEach((k) => {

        if (k == 'subscribercode') {
            select += `mdlwe_sbscr_id `
        } else {
            select += `${k}`
        }
        //select += k;
        if (count != keys.length - 1) {
            select += ","
        }
        count++;
    })
    var QRY_TO_EXEC = `SELECT  ${select} from caf_dtl_t where caf_id = ${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updtReqClSts
* Description   : updtReqClSts
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtClUrlDta = (rest_cl_id, url_dta_tx, user) => {
    var fnm = "updtClUrlDta"
    var QRY_TO_EXEC = ` UPDATE api_rqst_cl_dtl_t 
        SET url_dta_tx = '${JSON.stringify(url_dta_tx)}'
        WHERE rest_cl_id= ${rest_cl_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtReqStsMdl
* Description   : updtReqStsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtReqStsMdl = (reqId, user) => {
    var fnm = "updtReqStsMdl"
    var QRY_TO_EXEC = `UPDATE api_rqst_dtl_t 
        SET api_sts_id = 3`;
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
exports.getApiClsMdl = (req_id, user, callback) => {
    var fnm = "getApiClsMdl"
    var QRY_TO_EXEC = `SELECT c.*,m.mthd_nm
    FROM api_rqst_cl_dtl_t c JOIN api_mthds_lst_t m ON m.mthd_id = c.mthd_id 
    WHERE c.a_in = 1 AND c.api_rqst_id= ${req_id} ORDER BY c.sqnce_nu;`;
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
* Function      : updtReqClSts
* Description   : updtReqClSts
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtClStsMdl = (rest_cl_id, sts, rspne_tx, user) => {
    var fnm = "updtClStsMdl"
    var QRY_TO_EXEC = ` UPDATE api_rqst_cl_dtl_t 
        SET api_sts_id = ${sts},rspne_tx = ${sqldb.MySQLConPool.escape(JSON.stringify(rspne_tx))}
        WHERE rest_cl_id= ${rest_cl_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrtRtryTbl
* Description   : insrtRtryTbl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtRtryTbl = (rest_cl_id, rspne_tx, sts, user) => {
    var fnm = "insrtRtryTbl"
    var QRY_TO_EXEC = `INSERT INTO api_rqst_cl_rtry_dtl_t (rest_cl_id, rspne_tx, api_sts_id, crte_usr_id, a_in) VALUES (${rest_cl_id},'${JSON.stringify(rspne_tx).replace(/'/g, "`")}',${sts},${user.user_id},1); `;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : uploadSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.uploadSetupBoxMdl = function (data, user) {
    var fnm = "uploadSetupBoxMdl"
    let txt = JSON.stringify(data)
    var QRY_TO_EXEC = `insert into inv_stpbx_upld_lst_t (upld_cmnt_tx,upld_ct,upld_fld_in,crte_user_id,a_in,i_ts) values('${txt}',${data.length},0,${user.mrcht_usr_id},1,current_timestamp())`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insertSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertSetupBoxMdl = function (data, upid, user) {
    var fnm = "insertSetupBoxMdl"
    var QRY_TO_EXEC = `insert into inv_stpbx_lst_s (mac_addr_cd,srl_nu,btch_id,btch_ts,prdct_id,vndr_id,splr_id,mdle_id,upld_id,prfx_id,lmo_agnt_id,mso_agnt_id,enty_sts_id,crte_user_id,a_in,i_ts) values('${data.Cpe_Mac_Address}','${data.Cpe_Serial_No}',${data.Batch_Id || null},'${data.Batch_Date}',${data.prdct_id},${data.vndr_id},${data.splr_id},${data.mdle_id},${upid},${data.prfx_id},${data.lmo_agnt_id},${data.mso_agnt_id},1,${user.mrcht_usr_id},1,current_timestamp())`;
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
* Function       : oltstsUpdateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.oltstsUpdateMdl = function (data, sts) {
    var fnm = "oltstsUpdateMdl"
    var QRY_TO_EXEC = `update olt_lst_t set olt_up_down_sts=${sts} where olt_ip_addr_tx ='${data.olt_ip}'`;
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {},fnm);
};

/*****************************************************************************
* Function       : insertOltdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertOltdtlsMdl = function (data, user) {
        var fnm = "insertOltdtlsMdl"
	let lgd_code = ``;
	let lgd_code_val = ``;
	let gp_code = ``;
	let gp_code_val = ``;
	if(data.gp_code){
		gp_code = `, Gp_code`;
		gp_code_val = `,'${data.gp_code}'`;
	}
	if(data.lgd_code){
		lgd_code = `, Lgd_code`;
		lgd_code_val = `,'${data.lgd_code}'`;
	}
    var QRY_TO_EXEC = `INSERT INTO olt_lst_t ( Latitude, Longitude, olt_nm, olt_vndr_id, apsfl_bbnl, olt_sts_id, olt_ip_addr_tx, olt_srl_nu, pop_id, olt_nde_nu, olt_lble_nu,olt_acs_nde_id, sbstn_id, sbstn_type_id,olt_prt_ct, crte_usr_id,  a_in, i_ts ${gp_code} ${lgd_code}) VALUES('${data.lat}','${data.lang}','${data.olt_nm}',${data.vndr_id},${data.apsfl_bbnl},1,'${data.olt_ip_adrs}','${data.olt_srl_no}',0,'${data.nde_nm}','${data.lbl_nm}','${data.olt_acces_cd}','${data.sbstn_id}','1','${data.olt_prt}','${user.mrcht_usr_id}',1,current_timestamp() ${gp_code_val} ${lgd_code_val})`;
    // `INSERT INTO olt_ltrck_dtl_t ( olt_nm, olt_vndr_id,dstrt_id,mndl_id, olt_sts_id, olt_ip_addr_tx, olt_srl_nu, pop_id,  olt_lble_nu,olt_acs_nde_id, sbstn_id,olt_type_id, crte_usr_id,  a_in, i_ts) VALUES('${data.olt_nm}',0,'${data.dstrt_id}','${data.mndl_id}',1,'${data.olt_ip_adrs}','${data.olt_srl_no}',0,'${data.lbl_nm}','${data.olt_acces_cd}','${data.sbstn_id}','${data.olt_typ}','${user.mrcht_usr_id}',1,current_timestamp())`]
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insertOltMntrngdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertOltMntrngdtlsMdl = function (data,olt_id, user) {
    var fnm = "insertOltMntrngdtlsMdl"
    console.log("data")
    console.log(data)
    console.log("data")
    var QRY_TO_EXEC = `INSERT INTO olt_ltrck_dtl_t (olt_id, olt_nm, olt_vndr_id,dstrt_id,mndl_id, olt_sts_id, 
        olt_ip_addr_tx, olt_srl_nu, pop_id,  olt_lble_nu,olt_acs_nde_id, sbstn_id,olt_type_id, crte_usr_id, 
         a_in, i_ts,oprtnl_ste_id,eqpmt_id) 
            VALUES('${olt_id}','${data.olt_nm}',${data.vndr_id},${data.dstrt_id},${data.mndl_id},1,'${data.olt_ip_adrs}',
            '${data.olt_srl_no}',0,'${data.lbl_nm}',${data.olt_acces_cd},${data.sbstn_id},
            ${data.olt_typ},'${user.mrcht_usr_id}',1,current_timestamp(),1,0)`;
          console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insertOltprtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertOltprtMdl = function (data, oltId, user) {
    var fnm ="insertOltprtMdl"
    var olt_prt_leng = data.olt_prt
    // for(i=o; i<=olt_prt_leng.length; i++){
    //     console.log(i);
    console.log(data);
	let agnt_id = ``
	let agnt_id_val = ``
	if(data.portno == 1){
		agnt_id = `,agnt_id`;
		agnt_id_val = `,101000008`
	}
    var QRY_TO_EXEC = `INSERT INTO olt_prts_lst_t ( olt_prt_nm, olt_id, crte_usr_id,crd_id, a_in, i_ts ${agnt_id}) VALUES('${data.portno}','${oltId}','${user.mrcht_usr_id}','${data.crd_nu}',1,current_timestamp() ${agnt_id_val})`;
    console.log(QRY_TO_EXEC);
    // }

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getOltDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltDtlsMdl = function (id, user, callback) {
    var fnm = "getOltDtlsMdl"
    var QRY_TO_EXEC = `SELECT * FROM olt_lst_t WHERE olt_id = ${id}`;
	console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};


/*****************************************************************************
* Function      : addSlot
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.addSlot = (port_id, slot, user, callback) => {
	var fnm = 'addSlot'
	slot = slot.replace(/'/g,"");
    var sltArr = slot.split('-');
    var s1 = (sltArr[0] && sltArr[0] > 0) ? sltArr[0] : 0;
    var s2 = (sltArr[1] && sltArr[1] > 0) ? sltArr[1] : 0;
    var s3 = (sltArr[2] && sltArr[2] > 0) ? sltArr[2] : 0;
    var QRY_TO_EXEC = `INSERT INTO olt_prt_slts_lst_t ( olt_prt_id, slt1_id, slt2_id, slt3_id, a_in,i_ts) VALUES ( '${port_id}', '${s1}', '${s2}', '${s3}', '1',CURRENT_TIMESTAMP());`;
	console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : addSplits
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.addSplits = (slot_id, slot,sum, user, oltdata, callback) => {
	var fnm = 'addSplits'
	slot = slot.replace(/'/g,"");
    if (slot.split('-') && slot.split('-').length > 2) {
        var slots_str = slot;
        var resVal = '';
        if(sum == 1){
            var ct = 0;
        }
        else if(sum == 2){
            var ct = 32;
        }
        else if(sum == 3){
            var ct = 64;
        }
        else if(sum == 4){
            var ct = 96;
        }
       
      
        var slotsArr = slots_str.split(",");
        for (i = 0; i < slotsArr.length; i++) {
            var slot = slotsArr[i];
            var mSplits = slot.split('-').map(x => +x);
            for (j = 1; j <= mSplits[1]; j++) {
                for (k = 1; k <= mSplits[2]; k++) {
                    ct++;
                    if(oltdata.olt_vndr_id == 1){
                        var value = ct
                    } else {
                        var value = ct - 1;
                    }
                    (resVal == '') ? resVal += `(${slot_id}, ${mSplits[0]}, ${j}, ${k}, ${value} ,1, CURRENT_TIMESTAMP())` : resVal += `,(${slot_id}, ${mSplits[0]}, ${j}, ${k}, ${value}, 1, CURRENT_TIMESTAMP())`

                }
            }
        }

        var QRY_TO_EXEC = `INSERT INTO  olt_prt_splt_lst_t (olt_slt_id, splt1_nu, splt2_nu, splt3_nu,onu_id,a_in,i_ts) VALUES ${resVal};`;

        console.log("dataMigrationModelllllllllllllllllllllllllllllllllllllllllllllllllllll")
        console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
    } else {
        callback(false, []);
    }

}

/*****************************************************************************
* Function       : insertsbstndtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertsbstndtlsMdl = function (data,user, insertId) {
    var fnm = "insertsbstndtlsMdl"
    var QRY_TO_EXEC = `insert into sbstn_lst_t (sbstn_id,sbstn_nm,apsfl_bbnl,dstrct_id,mndl_id,sbstn_type_id,a_in,i_ts) 
    values (${insertId},'${data.sbstn_nm}',${data.apsfl_bbnl},${data.dstrt_id},${data.mndl_id},1,1,current_timestamp())`
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : insertsbstnAgntdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertsbstnAgntdtlsMdl = function (data,insrtid,user) {
    var fnm = "insertsbstnAgntdtlsMdl"
    var QRY_TO_EXEC = `insert into agnt_sbstn_rel_t (agnt_id,sbstn_id,vlge_id,a_in,i_ts) values (101000008,${insrtid},${data.vlg_id},1,current_timestamp())`
	console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : newAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.newAgentMdl = function (tntdata, enrlt_nu, user) {
    var fnm = "newAgentMdl"

    var tntInfo = tntdata.data.agntInfo;
    var ofcAdrs = tntdata.data.officeAddress;
    var brnchAdrs = tntdata.data.branchAddress;
    // var tntBnkDtls = tntdata.data.agntBnkDtls;
    // var tntdocDtls = tntdata.data.agntIdPrfDtls;
    var brnch_chk;
    // var enrlt_nu;
    var prnt_agnt;
    // tntInfo.enrlmnt_Nu = 'SELECT MAX(enrlt_nu) + 1 FROM agnt_lst_t WHERE a_in=1'
    // if (tntdata.branchAddress.brnch_chk_ind == true) {
    //     brnch_chk = 1;
    // }
    // if (tntdata.branchAddress.brnch_chk_ind == false) {
    //     brnch_chk = 0;
    // }
    // console.log(data.data)
    // let dtls = data.data

    // var dbutil = require(appRoot + '/utils/db.utils');

    // console.log(nextId)

    if (tntInfo.agnt_Typ == 1) {
        prnt_agnt = `${tntInfo.lmoCode.agnt_id}`;
    } else {
        prnt_agnt = ``;
    }
    // console.log(enrlt_nu);
    // return;
    var QRY_TO_EXEC = `INSERT INTO agnt_lst_t(prpd_flag,wallet_flag,agnt_prpd_date,instal_charges,agnt_nm,agnt_ctgry_id, prnt_agnt_id, enrlt_nu,adhr_nu,pan_nu, tan_nu,gst_nu, pstl_rgstn_nu, pstl_exprn_dt, ofce_cntct_nm, ofce_mbl_nu, 
        ofce_eml_tx, ofce_addr1_tx,ofce_addr2_tx, ofce_ara_nm, ofce_cty_nm, ofce_ste_id, ofce_dstrt_id, ofce_mndl_id, ofce_vlge_id, ofce_pn_cd,ofce_lclty_nm,ofce_std_cd, ofce_lndle_nu, brnch_cntct_nm, 
        brnch_mbl_nu,brnch_eml_tx, brnch_addr1_tx,brnch_addr2_tx, brnch_ara_nm, brnch_cty_nm, brnch_ste_id, brnch_dstrt_id, brnch_mndl_id, brnch_vlge_id, brnch_pn_cd,brnch_lclty_nm,brnch_std_cd, brnch_lndne_nu,orgn_type_id,sts_id,a_in, i_ts,slf_rgnrn_ts)
        VALUES(1,1,curdate(),60,'${tntInfo.agnt_nm}','${tntInfo.agnt_Typ}', '${prnt_agnt}', '${enrlt_nu}','${tntInfo.adhr_Nu}','${tntInfo.pan_Nu}','${tntInfo.tan_Nu}',
        '${tntInfo.gst_Nu}','${tntInfo.pstl_reg_Nu}','${tntInfo.pstl_exp_dt}','${ofcAdrs.ofce_cntct_Nm}','${ofcAdrs.ofce_mble_Nu}','${ofcAdrs.ofce_email}',
        '${ofcAdrs.ofce_address1}','${ofcAdrs.ofce_address2}','${ofcAdrs.ofce_ara_nm}','${ofcAdrs.ofce_City}','${ofcAdrs.ofce_State}','${ofcAdrs.ofce_Dstrt}','${ofcAdrs.ofce_Mndl}',
        '${ofcAdrs.ofce_Vlge}','${ofcAdrs.ofce_pn_cd}','${ofcAdrs.ofce_lcty_nm}','${ofcAdrs.ofce_lndline_cd}','${ofcAdrs.ofce_lndline}','${brnchAdrs.brnch_cntct_Nm}','${brnchAdrs.brnch_mble_Nu}','${brnchAdrs.brnch_email}',
        '${brnchAdrs.brnch_address1}','${brnchAdrs.brnch_address2}','${brnchAdrs.brnch_ara_nm}','${brnchAdrs.brnch_City}','${brnchAdrs.brnch_State}','${brnchAdrs.brnch_Dstrt}','${brnchAdrs.brnch_Mndl}',
        '${brnchAdrs.brnch_Vlge}','${brnchAdrs.brnch_pn_cd}','${brnchAdrs.brnch_lcty_nm}','${brnchAdrs.brnch_lndline_cd}','${brnchAdrs.brnch_lndline}','${tntInfo.orgn_typ}',2,1,CURRENT_TIMESTAMP(),NULL)`;
 
    log.info(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : srvngAraMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngAraMdl = function (srvAraData, insertId, user) {
    var fnm='srvngAraMdl'
    // console.log(srvAraData)
    // return;
    var QRY_TO_EXEC = `INSERT INTO srving_ara_lst_t (agnt_id, srving_ara_nm, cble_type_id, cble_lngth_ct, dstrct_id, mndl_id, vlge_id, sbscbr_ct, cnctn_ct, dgtl_cntn_ct, anlge_cntn_ct, a_in, i_ts) VALUES ('${insertId}', '${srvAraData.ara_nm}', '${srvAraData.cbl_type}','${srvAraData.rng_cbl_lngth}', '${srvAraData.srv_ara_dstrt}', '${srvAraData.srv_ara_mndl}', '${srvAraData.srv_ara_vlge}', '${srvAraData.sbsc_ct}', '${srvAraData.cnct_ct}', '${srvAraData.dgtl_cnct_ct}', '${srvAraData.anlg_cnct_ct}' , 1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : srvngAsrtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngAsrtMdl = function (srvAsrtData, insertId, user) {
    var fnm = "srvngAsrtMdl"
    // console.log(srvAsrtData);
    if (srvAsrtData != undefined || srvAsrtData.cble_type_id != ' ') {
        var QRY_TO_EXEC = `INSERT INTO srvng_ast_dtl_t(agnt_id, cble_type_id, asrt_id, rt_nm, snd_trnse, imie_nu, vrsn_nu, a_in,i_ts) VALUES('${insertId}','${srvAsrtData.arv_ast_cbl_type}','${srvAsrtData.ast_type}','${srvAsrtData.rte_nm}','${srvAsrtData.snt_trns_tm}','${srvAsrtData.ime_nu}','${srvAsrtData.vrsn_nu}',1,CURRENT_TIMESTAMP())`;
    }
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : srvngsbstnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngsbstnMdl = function (sbstnData, insertId,user) {
    var fnm  ="srvngsbstnMdl"
    var QRY_TO_EXEC = `INSERT INTO agnt_sbstn_rel_t(agnt_id,sbstn_id,sbstn_dstnce_ct,vlge_id,a_in,i_ts)VALUES(${insertId},${sbstnData.sb_stn.sbstn_id},${sbstnData.sb_stn_dst},4,1,CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : prfDocMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prfDocMdl = function (prfData, insertId, user) {
    // console.log(prfData)
    var fnm = "prfDocMdl"
    // if(prfData.prf_dcmn == ''){
    //     prfData.prf_dcmn = 0;
    // }
    var QRY_TO_EXEC = ` INSERT INTO agnt_dcmnt_lst_t(agnt_id,dcmnt_type_id,dcmnt_ctgry_id,dcmnt_url_tx,dcmnt_prf_nu,a_in,i_ts)
                        VALUES(${insertId},'${prfData.prf_dcmn}','${prfData.doc_ctgry}','${prfData.image}','${prfData.prf_Nu}',1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : srvngbnkAcntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngbnkAcntMdl = function (bnkData, insertId,user) {
    var fnm='srvngbnkAcntMdl'
    // console.log('In Bank Mdl')
    // console.log(bnkData)
    var QRY_TO_EXEC = `INSERT INTO agnt_bnk_dtl_t(agnt_id,bnk_acnt_nu,ifsc_cd,brnch_nm,bnk_nm,svngs_in,a_in,i_ts) VALUES(${insertId},'${bnkData.acnt_Nu}','${bnkData.ifsc_cd}','${bnkData.brnch}','${bnkData.bnk_nm}',1,1,CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

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
* Function      : insrtTimeClStsMdl
* Description   : insrtTimeClStsMdl
* Arguments     : callback function
* Change History :
* 29-07-2021    -  Ramesh - Initial Function
*
******************************************************************************/
exports.insrtTimeClStsMdl = (data, sts, rspne_tx, user,rqst_desc_txt, TimeBfrREQ, TimeAftrREQ) => {
    var QRY_TO_EXEC = ` INSERT INTO api_execution_time_logs (activity_name,api_req_data,api_req_time,api_res_data,api_res_time)
        VALUES ('${rqst_desc_txt}',${sqldb.MySQLConPool.escape(JSON.stringify(data))},'${TimeBfrREQ}',${sqldb.MySQLConPool.escape(JSON.stringify(rspne_tx))},'${TimeAftrREQ}')`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/*****************************************************************************
* Function      : updtReqStsMdl
* Description   : updtReqStsMdl
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtReqStsMdl = (req_id, sts, rspne_tx, user) => {
    var QRY_TO_EXEC = ` UPDATE api_rqst_dtl_t 
        SET api_sts_id = ${sts},err_resp_txt = ${sqldb.MySQLConPool.escape(JSON.stringify(rspne_tx))}
        WHERE api_rqst_id= ${req_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/*****************************************************************************
* Function      : updtReqClSts
* Description   : updtReqClSts
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtClStsMdl = (rest_cl_id, sts, rspne_tx, user) => {
    var QRY_TO_EXEC = ` UPDATE api_rqst_cl_dtl_t 
        SET api_sts_id = ${sts},rspne_tx = ${sqldb.MySQLConPool.escape(JSON.stringify(rspne_tx))}
        WHERE rest_cl_id= ${rest_cl_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/*****************************************************************************
* Function      : insrtRequests
* Description   : insrtRequests
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtCafMdl = (id, keys, data, user) => {

    let values = '';
    let count = 0;
    keys.forEach((k) => {
        console.log(data + "---key")
        if (k == 'subscribercode') {
            if (data != null)
                values += `mdlwe_sbscr_id = '${data[k]}'`
            else {
                values += `mdlwe_sbscr_id = null`
            }
        } else if (k == 'ds_subscribercode') {
            if (data != null)
                values += `ds_mdlwe_sbscr_id = '${data[k]}'`
            else {
                values += `ds_mdlwe_sbscr_id = null`
            }
        } else {
            if (data != 'null')
                values += `${k} = '${data[k]}'`
            else {
                values += `${k} = null`
            }
            // values += `${k} = ${data[k]}`
        }

        if (count != keys.length - 1) {
            values += ','
        }
        count++;
    })

    var QRY_TO_EXEC = ` UPDATE caf_dtl_t 
            SET ${values}
            WHERE caf_id= ${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);

}

/*****************************************************************************
* Function       : getPendingActvnCafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPendingActvnCafsMdl = function (data) {
	
var QRY_TO_EXEC = `select * from caf_dtl_t where enty_sts_id=1 and olt_ip_addr_tx='${data.olt_ip}' and date(i_ts)> curdate() - interval 1 day`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getPendingCafDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPendingCafDataMdl = function(data){
	
	var QRY_TO_EXEC = `select * from api_rqst_dtl_t where enty_ky in (${data.caf_id}) and rqst_dscn_tx='CAF PROVISIONING';`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : get_apiCls
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_apiCls = function(id){
	
	var QRY_TO_EXEC = `SELECT c.*,m.mthd_nm
	  FROM api_rqst_cl_dtl_t c JOIN api_mthds_lst_t m ON m.mthd_id = c.mthd_id
	  WHERE c.a_in = 1 AND c.api_rqst_id= ${id} ORDER BY c.sqnce_nu;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : insrtPendingActvnCafsdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtPendingActvnCafsdtlsMdl = function (data) {
	
var QRY_TO_EXEC = `insert into olt_down_pending_caf_dtl_t (caf_id, olt_id, olt_ip_addr_tx, a_in, i_ts) values (${data.caf_id},${data.olt_id},'${data.olt_ip_addr_tx}',1,current_timestamp())`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};