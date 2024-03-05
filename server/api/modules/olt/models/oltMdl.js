
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');




/*****************************************************************************
* Function       : oltstsUpdateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.oltstsUpdateMdl = function (data, sts) {
    var fnm = "oltstsUpdateMdl"
    var QRY_TO_EXEC = `update olt_lst_t set olt_up_down_sts=${sts} where olt_ip_addr_tx ='${data.olt_ip}'`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {},fnm);
};

/*****************************************************************************
* Function       : get_oltsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltsCtrlMdl = function (agent_id,user) {
    var fnm = "get_oltsCtrlMdl"
    console.log(user)
    agnt_id =agent_id
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
	if(agnt_id == undefined || agnt_id == 'undefined' || agnt_id== null || agnt_id == '')
		agnt_id = user.usr_ctgry_ky
	
    var QRY_TO_EXEC = `select o.olt_id,o.olt_nm,o.olt_srl_nu,o.olt_ip_addr_tx,o.olt_lble_nu,p.crd_id,o.sbstn_id,o.pop_id  
    from olt_lst_t as o
    LEFT JOIN olt_prts_lst_t as p on p.olt_id = o.olt_id
    where p.agnt_id=${agnt_id}
    GROUP BY o.olt_id
    order by o.olt_nm`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : get_slotsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slotsCtrlMdl = function (olt_id, user) {
    var fnm = "get_slotsCtrlMdl"
    console.log(user)
    agnt_id =user.usr_ctgry_ky
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
	if(agnt_id == undefined || agnt_id == 'undefined' || agnt_id== null || agnt_id == '')
		agnt_id = user.usr_ctgry_ky
	
    var QRY_TO_EXEC = `SELECT  o.olt_id,o.olt_nm,p.olt_prt_id,o.olt_ip_addr_tx,o.olt_acs_nde_id,p.olt_prt_nm,p.crd_id,o.olt_srl_nu,COUNT(DISTINCT sl.olt_slt_id) as sltsct, GROUP_CONCAT(CONCAT(sl.slt1_id,'-',sl.slt2_id,'-',sl.slt3_id)) as solts
    FROM olt_lst_t as o
    JOIN olt_prts_lst_t as p on p.olt_id=o.olt_id
    left JOIN olt_prt_slts_lst_t as sl on sl.olt_prt_id=p.olt_prt_id
    WHERE o.olt_id= ${olt_id} and p.agnt_id =${agnt_id}
    GROUP BY p.olt_prt_id
    order by p.crd_id,p.olt_prt_nm`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : get_ponChangeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_ponChangeMdl = function (data, user) {
    var fnm = "get_ponChangeMdl"
    if (data.caf_nu == 0) {
        caf = ``
    }
    if (user.usr_ctgry_id == 10) {
        if (data.caf_nu != 0) {
            caf = `and c.caf_nu='${data.caf_nu}' and c.caf_type_id=2 `
        }
    }
    else {
        if (data.caf_nu != 0) {
            caf = `and c.caf_nu='${data.caf_nu}' `
        }
    }

    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (user.usr_ctgry_id == 10) {
        if (data.adhar_nu != 0) {
            adhar = `and c.adhr_nu='${data.adhar_nu}' and c.caf_type_id=2 `
        }
    }
    else {
        if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
        }
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (user.usr_ctgry_id == 10) {
        if (data.mbl_nu != 0) {
            mobile = `and c.mbl_nu='${data.mbl_nu}' and c.caf_type_id=2 `
        }
    }
    else {
        if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
        }
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (user.usr_ctgry_id == 10) {
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID} and c.caf_type_id=2`
    }
}
else{
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    } 
}
    var QRY_TO_EXEC = `select c.caf_id,c.caf_nu,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,c.caf_mac_addr_tx,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.lmo_agnt_id,a.agnt_cd,o.olt_nm,o.pop_id,c.olt_id,c.olt_srl_nu,
    c.olt_ip_addr_tx,c.olt_prt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.aghra_cd,c.cstmr_id,d.cstmr_nm,d.cstmr_nm as frst_nm,d.loc_addr1_tx,d.loc_addr2_tx,d.loc_lcly_tx,d.loc_ara_tx,d.loc_dstrct_id,
    l.dstrt_id,l.dstrt_nm,d.loc_mndl_id,m.mndl_id,m.mndl_nm,d.loc_vlge_id,v.vlge_id,v.vlge_nm,c.aaa_cd,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.mdlwe_sbscr_id,crnt_pln_id,d.cstmr_nm,i.stpbx_id,i.mac_addr_cd,inv.mdl_dtls_tx,c.caf_type_id,inv.mdle_cd,c.splt_id,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx from 
    caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id and i.prdct_id=1
    left join inv_prdct_mdle_lst_t as inv on inv.mdle_id = i.mdle_id 
    join cstmr_dtl_t as d on d.cstmr_id = c.cstmr_id
    join olt_lst_t as o on o.olt_id =c.olt_id
    left JOIN vlge_lst_t v ON v.vlge_nu = d.loc_vlge_id and v.mndl_id = d.loc_mndl_id AND v.dstrt_id = d.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t l ON l.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0 and c.trmnd_rqst_in=0 and  c.enty_sts_id not in (1,7,8,84,85) ${agntid} ${caf} ${adhar} ${mobile}
    GROUP BY c.caf_id
    ORDER BY c.caf_id`;

    console.log("****************PON CHANGE********************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : get_ponChangeSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_ponChangeSrvrPgntnMdl = function (data, user) {
    var fnm = "get_ponChangeSrvrPgntnMdl"

    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }

    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }


    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and d.cstmr_nm like '%${data.srch_txt}%'`
        }
    } 
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }


    var QRY_TO_EXEC = ` select c.caf_id,c.caf_nu,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,c.caf_mac_addr_tx,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.lmo_agnt_id,a.agnt_cd,o.olt_nm,o.pop_id,c.olt_id,c.olt_srl_nu,c.olt_srl_nu,c.iptv_srl_nu,
    c.olt_ip_addr_tx,c.olt_prt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.aghra_cd,c.cstmr_id,d.cstmr_nm,d.cstmr_nm as frst_nm,d.lst_nm,d.loc_addr1_tx,d.loc_addr2_tx,d.loc_lcly_tx,d.loc_ara_tx,d.loc_dstrct_id,
    l.dstrt_id,l.dstrt_nm,d.loc_mndl_id,m.mndl_id,m.mndl_nm,d.loc_vlge_id,v.vlge_id,v.vlge_nm,c.aaa_cd,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.mdlwe_sbscr_id,crnt_pln_id,d.cstmr_nm,i.stpbx_id,i.mac_addr_cd,inv.mdl_dtls_tx, c.caf_type_id,inv.mdle_cd,c.splt_id,st.sts_nm,
    (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,st.enty_sts_id,st.sts_clr_cd_tx from
    caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id and i.prdct_id=1
    left join inv_prdct_mdle_lst_t as inv on inv.mdle_id = i.mdle_id
    join cstmr_dtl_t as d on d.cstmr_id = c.cstmr_id
    join olt_lst_t as o on o.olt_id =c.olt_id
    left JOIN vlge_lst_t v ON (v.vlge_nu = a.ofce_vlge_id or v.vlge_id = a.ofce_vlge_id) and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t l ON l.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0  and  c.enty_sts_id not in (1,7,8,84,85)  ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd}
    GROUP BY c.caf_id
    ORDER BY c.caf_id and c.i_ts desc limit ${pge_nu}, 20`

    console.log("****************PON CHANGE********************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_slotsForPortMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slotsForPortMdl = function (port_id, user) {
    var fnm = "get_slotsForPortMdl"
    var QRY_TO_EXEC = `select olt_slt_id,olt_prt_id,slt1_id,slt2_id,slt3_id from olt_prt_slts_lst_t where olt_prt_id=${port_id} order by slt1_id,slt2_id,slt3_id `;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_slotsbyportMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slotsbyportMdl = function (port_id, user) {
    var fnm = "get_slotsbyportMdl"
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${port_id} and op.caf_id is NULL 
    GROUP BY op.splt1_nu 
    ORDER BY op.splt1_nu`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_allslotsbyportMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_allslotsbyportMdl = function (port_id, user) {
    var fnm = "get_allslotsbyportMdl"
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${port_id}  
    GROUP BY op.splt1_nu 
    ORDER BY op.splt1_nu`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_slottwoForPortMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slottwoForPortMdl = function (data, user) {
    var fnm = "get_slottwoForPortMdl"
    console.log(data)
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${data[0].olt_prt_id} and op.caf_id is NULL and  op.splt1_nu =${data[0].level1} 
    GROUP BY op.splt2_nu 
    ORDER BY op.splt2_nu`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_slottwoForPortMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_allslottwoForPortMdl = function (data, user) {
    var fnm = "get_allslottwoForPortMdl"
    console.log(data)
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${data[0].olt_prt_id} and  op.splt1_nu =${data[0].level1} 
    GROUP BY op.splt2_nu 
    ORDER BY op.splt2_nu`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_slottwoForPortMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_slotthreeForPortMdl = function (data, user) {
    var fnm = "get_slotthreeForPortMdl"
    console.log(data)
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${data[0].olt_prt_id} and op.caf_id is NULL and  op.splt1_nu =${data[0].level1} and  op.splt2_nu =${data[0].level2}
    
    ORDER BY op.splt3_nu `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_allslotthreeForPortMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_allslotthreeForPortMdl = function (data, user) {
    var fnm = "get_allslotthreeForPortMdl"
    console.log(data)
    var QRY_TO_EXEC = `SELECT op.* from olt_prt_splt_lst_t op 
    JOIN olt_prt_slts_lst_t o ON o.olt_slt_id = op.olt_slt_id
    WHERE o.olt_prt_id = ${data[0].olt_prt_id} and  op.splt1_nu =${data[0].level1} and  op.splt2_nu =${data[0].level2}
    GROUP BY op.splt3_nu
    ORDER BY op.splt3_nu `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_spiltMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_spiltMdl = function (data, user) {
    var fnm = "get_spiltMdl"
    var QRY_TO_EXEC = `select splt_id,olt_slt_id,splt1_nu,splt2_nu,splt3_nu,onu_id from olt_prt_splt_lst_t where olt_slt_id =${data.olt_slt_id} and splt1_nu=${data.splt1_nu} and splt2_nu=${data.splt2_nu} and splt3_nu=${data.splt3_nu}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : updatecustomerDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updatecustomerDtlsMdl = function (data, user) {
    var fnm = "updatecustomerDtlsMdl"
    var QRY_TO_EXEC = `UPDATE cstmr_dtl_t  SET loc_dstrct_id='${data.district_id}',loc_mndl_id='${data.mandal_id}',loc_vlge_id='${data.village_id}',loc_addr1_tx='${data.address_one}',loc_addr2_tx='${data.address_two}',loc_lcly_tx='${data.localty}',loc_ara_tx ='${data.ara}',
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE cstmr_id= ${data.customer_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : updatecafsDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updatecafsDtlsMdl = function (data, user) {
    var fnm = "updatecafsDtlsMdl"
    var QRY_TO_EXEC = `update caf_dtl_t SET olt_id='${data.olt_id}',olt_srl_nu='${data.olt_srl_nu}',olt_ip_addr_tx='${data.olt_ip_addr_tx}',olt_prt_id='${data.olt_prt_id}',olt_prt_nm='${data.olt_prt_nm}',splt_id='${data.splt_id}',
    olt_prt_splt_tx ='${data.olt_prt_splt_tx}',instl_addr1_tx='${data.caf_address_one}',instl_addr2_tx='${data.caf_address_two}',instl_lcly_tx='${data.caf_locality}',instl_ara_tx='${data.caf_area}',olt_crd_nu='${data.olt_crd_nu}',olt_onu_id='${data.olt_onu_id}',
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP(),aaa_cd='${data.new_lag_id}',aghra_cd='${data.aghra_cd_nw}'
    WHERE caf_id=${data.caf_id}`;

    // console.log("&&&&&&&111111111111&&&&&&&&&&")
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updatecafInPortSplitMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updatecafInPortSplitMdl = function (data, user) {
    var fnm = "updatecafInPortSplitMdl"
    var QRY_TO_EXEC = `update olt_prt_splt_lst_t SET caf_id='${data.caf_id}',
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE splt_id=${data.splt_id}`;
    // console.log("&&&&&&&2222222222222&&&&&&&&&&")
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateSplitsTable
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateSplitsTable = function (data, user) {
    var fnm = "updateSplitsTable"
    var QRY_TO_EXEC = `update olt_prt_splt_lst_t SET caf_id =null
    WHERE splt_id=${data.old_split_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updateCafSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateCafSetupBoxMdl = function (data, user) {
    var fnm = "updateCafSetupBoxMdl"
    var QRY_TO_EXEC = `update caf_splt_rel_t SET crnt_in=0,a_in=0,expry_dt=CURDATE(),
    updte_user_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id=${data.caf_id}`;
    // console.log("&&&&&&&33333333333&&&&&&&&&&")
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insertCafSetupBoxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertCafSetupBoxMdl = function (data, user) {
    var fnm = "insertCafSetupBoxMdl"
    var QRY_TO_EXEC = `insert into caf_splt_rel_t(caf_id,splt_id,crnt_in,efcte_dt,a_in,i_ts) values ('${data.caf_id}','${data.splt_id}','1',CURDATE(),'1',CURRENT_TIMESTAMP())`;
    // console.log("&&&&&&&444444444444&&&&&&&&&&")
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : get_onuDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_onuDetailsMdl = function (onu_srl_nu, user) {
    var fnm = "get_onuDetailsMdl"
    var lmoCond = ``;
    if(user.usr_ctgry_ky == null){
        lmoCond = ``;
    } else {
        lmoCond = `AND lmo_agnt_id=${user.usr_ctgry_ky}`;
    }
    var QRY_TO_EXEC = ` select stpbx_id as onu_stpbx_id,srl_nu as onu_srl_nu,mac_addr_cd as onu_mac_addr 
                        from inv_stpbx_lst_t 
                        where srl_nu = '${onu_srl_nu}' ${lmoCond} and a_in=1`;
console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_boxchangeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_boxchangeMdl = function (data, user) {
    var fnm = "get_boxchangeMdl"
    var cafTypeCond = ``;
    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }
    if(user.usr_ctgry_id == 10){
        cafTypeCond = `AND c.caf_type_id=2`
    }
    // var QRY_TO_EXEC = `
    // select c.caf_id,c.caf_nu,c.adhr_nu,c.mbl_nu,c.frst_nm,c.lst_nm,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,d.dstrt_nm,c.instl_mndl_id,m.mndl_nm,c.instl_vlge_id,v.vlge_nm,c.mdlwe_sbscr_id,c.agnt_id,a.agnt_cd,
    // c.iptv_stpbx_id,c.onu_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.onu_mac_addr_tx
    // from caf_dtl_t as c 
    // join agnt_lst_t as a on a.agnt_id=c.agnt_id
    // join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id
    // join mndl_lst_t as m on m.mndl_id = c.instl_mndl_id
    // join vlge_lst_t as v on v.vlge_id = c.instl_vlge_id
    // where c.agnt_id=${data.agntID} ${caf} ${adhar} ${mobile}
    // ORDER BY c.agnt_id`;

    var QRY_TO_EXEC = `
    select c.caf_id,c.caf_nu,c.caf_type_id,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.olt_ip_addr_tx,c.olt_crd_nu,c.olt_prt_nm,c.olt_onu_id,c.aaa_cd,c.aghra_cd,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,d.dstrt_nm,c.instl_mndl_id,m.mndl_nm,c.instl_vlge_id,v.vlge_nm,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,
    c.iptv_stpbx_id,c.onu_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.onu_mac_addr_tx,c.aaa_cd as lagId,c.caf_mac_addr_tx as accessid,
    cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.crnt_pln_id,i.stpbx_id,i.mac_addr_cd as accId, st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,
    i.stpbx_id as 'IPTVBOXID',onu.stpbx_id as 'ONUBOXID'
    from caf_dtl_t as c 
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id and i.prdct_id=2
    left join inv_stpbx_lst_t as onu on onu.caf_id = c.caf_id and onu.prdct_id=1
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left JOIN vlge_lst_t v ON v.vlge_nu = c.instl_vlge_id and v.mndl_id = c.instl_mndl_id AND v.dstrt_id = c.instl_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0 and c.trmnd_rqst_in=0 and c.enty_sts_id not in (1,7,8,84,85) ${agntid} ${caf} ${adhar} ${mobile} ${cafTypeCond}
    group by c.caf_id
    ORDER BY c.caf_id`;


    console.log("************************************");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_boxchangeSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_boxchangeSrvrPgntnMdl = function (data, user) {
    var fnm = "get_boxchangeSrvrPgntnMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    if (data.caf_nu == 0) {
        caf = ` `
    }
    else if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ` `
    }
    else if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ` `
    }
    else if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ` `
    }
    else if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }


    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `
       select c.caf_id,c.caf_nu,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.olt_ip_addr_tx,c.olt_crd_nu,c.olt_prt_nm,c.olt_onu_id,c.aaa_cd,c.aghra_cd,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,IFNULL(d.dstrt_nm, '') AS dstrt_nm,c.instl_mndl_id,IFNULL(m.mndl_nm, '') AS mndl_nm,c.instl_vlge_id,IFNULL(v.vlge_nm, '') AS vlge_nm,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,
    c.iptv_stpbx_id,c.onu_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.onu_mac_addr_tx,c.aaa_cd as lagId,c.caf_mac_addr_tx as accessid,(case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    IFNULL(cm.cstmr_nm, '') as frst_nm,IFNULL(cm.lst_nm, '') as lst_nm ,IFNULL(cm.cstmr_nm, '') as cstmr_nm,c.crnt_pln_id,i.stpbx_id,i.mac_addr_cd as accId,c.caf_type_id,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx
    , case when i.mdle_id in (800,801,802,803,804) then 1 else 2 end as combobox_flag
	from caf_dtl_t as c 
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id and prdct_id=1 and i.a_in=1
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left JOIN vlge_lst_t v ON v.vlge_nu = c.instl_vlge_id and v.mndl_id = c.instl_mndl_id AND v.dstrt_id = c.instl_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0  and c.enty_sts_id not in (1,7,8,84,85) ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd}
    group by c.caf_id
    ORDER BY c.caf_id and c.i_ts desc limit ${pge_nu}, 20`;


    console.log("************************************");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getcollectionDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getcollectionDataMdl = function (data, user) {
    var fnm = "getcollectionDataMdl"

    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `AND cf.caf_nu='${data.caf_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `AND cst.cntct_mble1_nu='${data.mbl_nu}'`
    }

    var QRY_TO_EXEC = `select ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as 'ltst_inv_amnt',count(*) as caf_ct ,cf.caf_id,cf.caf_nu,cf.mbl_nu,cf.caf_type_id, DATE_FORMAT(i.invce_dt,'%d-%m-%Y')  as 'ltst_inv_dt' ,
    cst.pndng_blne_at as 'prvs_blnc',cst.cstmr_nm as frst_nm, cst.lst_nm,ct.caf_type_nm , REPLACE(cst.adhr_nu,SUBSTR(cst.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cst.cntct_mble1_nu,cst.cstmr_id,cst.cstmr_nm,
    case when cst.pndng_blne_at=0 then 'PAID' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then 'Not Paid'  end lbl_txt,
    case when cst.pndng_blne_at=0 then '1' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then '0'  end pd_in,i.caf_invce_id
    FROM caf_dtl_t cf
    join cstmr_dtl_t as cst on cf.cstmr_id =cst.cstmr_id AND cf.lmo_agnt_id =${data.agntID} AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
    join caf_type_lst_t ct on cst.caf_type_id =ct.caf_type_id
    left join erp_invce_lst_t as i on i.caf_invce_id = cf.lst_invce_id
    where i.pd_in=0 ${caf} ${mobile}
    GROUP BY cst.cstmr_id
    order by cst.cstmr_id`

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getMnthlyCollectionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMnthlyCollectionsMdl = function (data, user) {
    var fnm = "getMnthlyCollectionsMdl"

    // var QRY_TO_EXEC = `select e.caf_invce_id,e.caf_id,c.caf_nu,e.cstmr_id,u.frst_nm,u.cntct_mble1_nu,e.pd_in as pymnt_sts,
    // REPLACE(u.adhr_nu,SUBSTR(u.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    // t.caf_type_nm,u.agnt_id,a.agnt_nm,sum(e.invce_at) as pd_amnt,e.pd_in,e.pd_dt,SUM(prvce_blnce_at) as prvce_blnce_at from
    // erp_invce_lst_t as e
    // join erp_cstmr_invce_lst_t as ecs on ecs.cstmr_id=e.cstmr_id
    // join caf_dtl_t as c on c.caf_id = e.caf_id
    // join cstmr_dtl_t as u on u.cstmr_id = e.cstmr_id
    // join caf_type_lst_t as t on t.caf_type_id = u.caf_type_id
    // join agnt_lst_t as a on a.agnt_id=u.agnt_id
    // where e.pblsd_in=1 and u.agnt_id=${data.agntID} and e.pd_in=${data.p_in} and MONTH(e.invce_dt)=${data.mm} and YEAR(e.invce_dt)=${data.yr}
    // group by e.cstmr_id`;
    console.log('getMnthlyCollectionsMdl');

    console.log(data);
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;

    console.log('-----------------------', data.p_in)
    if (data.p_in == 0 || data.p_in == 1) {
        console.log('-----------------------', data.p_in)
        if (data.p_in == 1) {
            pd_in = `where cst.pndng_blne_at=0 and i.pd_in=1`
        } else {
            console.log('-----------------------')
            pd_in = `where  (cst.pndng_blne_at is null or cst.pndng_blne_at <> 0) and i.pd_in=0`
        }
    }
    else {
        pd_in = ``
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += `and cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += `and cst.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += `and cst.cntct_mble1_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cst.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }

    if(user.usr_ctgry_nm == 'MSO'){
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else{
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }


        var QRY_TO_EXEC = `select ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as 'ltst_inv_amnt',count(*) as caf_ct ,cf.caf_id,cf.caf_type_id, DATE_FORMAT(i.invce_dt,'%d-%m-%Y')  as 'ltst_inv_dt' ,
        cst.pndng_blne_at as 'prvs_blnc',cst.cstmr_nm as frst_nm, cst.lst_nm,ct.caf_type_nm , REPLACE(cst.adhr_nu,SUBSTR(cst.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
        cst.cntct_mble1_nu,cst.cstmr_id,cst.cstmr_nm,
        case when cst.pndng_blne_at=0 then 'PAID' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then 'Not Paid'  end lbl_txt,
        case when cst.pndng_blne_at=0 then '1' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then '0'  end pd_in,i.caf_invce_id
        FROM caf_dtl_t cf
        join cstmr_dtl_t as cst on cf.cstmr_id =cst.cstmr_id AND ${agntID} AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
        join caf_type_lst_t ct on cst.caf_type_id =ct.caf_type_id
        left join erp_invce_lst_t as i on i.caf_invce_id = cf.lst_invce_id
        ${pd_in} ${where_cnd}
        GROUP BY cst.cstmr_id
        order by cst.cstmr_id  limit ${pge_nu}, 20`



    console.log("************** montly Collections **********************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : prepaidgetMnthlyCollectionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prepaidgetMnthlyCollectionsMdl = function (data, user) {
    var fnm = "prepaidgetMnthlyCollectionsMdl"

    console.log('prepaidgetMnthlyCollectionsMdl');

    console.log(data);
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
	
	if (data.yr == 'undefined' || data.yr == undefined || data.yr == null || data.yr == '') {
		year = `and year(f.ac_date)=YEAR(CURDATE())`
	}
	else {
		year = `and year(f.ac_date)=${data.yr}`
	}
	
	if (data.mm == 'undefined' || data.mm == undefined || data.mm == null || data.mm == '') {
		month = `and month(f.ac_date)=month(CURDATE())`
	}
	else {
		month = `and month(f.ac_date)=${data.mm}`
	}
	
    console.log('-----------------------', data.p_in)
    if (data.p_in == 0 || data.p_in == 1) {
        console.log('-----------------------', data.p_in)
        if (data.p_in == 1) {
            pd_in = `where cst.pndng_blne_at=0 and i.pd_in=1`
        } else {
            console.log('-----------------------')
            pd_in = `where  (cst.pndng_blne_at is null or cst.pndng_blne_at <> 0) and i.pd_in=0`
        }
    }
    else {
        pd_in = ``
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += `and cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += `and cst.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += `and cst.cntct_mble1_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cst.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }

    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `a.prnt_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }
        var QRY_TO_EXEC = `select a.agnt_cd,count(distinct(f.cust_id)) as caf_ct,cf.caf_type_id,cf.caf_id,
        format(sum((p.bse_pck_price*p.apsfl_share/100)+(p.bse_pck_price*p.mso_share/100)+p.cpe_rental+(p.cpe_rental*p.tax/100)+(p.bse_pck_price*p.lmo_share/100)),2) as ltst_inv_amnt
        ,REPLACE(cst.adhr_nu,SUBSTR(cst.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cst.lst_nm,ct.caf_type_nm ,  cst.pndng_blne_at as 'prvs_blnc',cst.cstmr_nm as frst_nm, 
            cst.cntct_mble1_nu,cst.cstmr_id,cst.cstmr_nm,DATE_FORMAT(f.ac_date,'%d-%m-%Y')  as 'ltst_inv_dt' 
         from prepaid_f_accounting as f
        join agnt_lst_t as a on a.agnt_id=f.created_by
        join pckge_lst_t as p on p.pckge_id=f.stb_id and p.pckge_type_id=1
        join caf_dtl_t as cf on cf.caf_id=f.cust_id
        join cstmr_dtl_t as cst on cf.cstmr_id =cst.cstmr_id AND ${agntID} ${year} ${month} ${where_cnd}  AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
        join caf_type_lst_t ct on cf.caf_type_id =ct.caf_type_id
		where operation='resume'
        GROUP BY cf.caf_id
        order by cf.caf_id limit ${pge_nu}, 20;`;

    console.log("************** montly Collections **********************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function       : get_activecafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_activecafsMdl = function (data, user) {
    var fnm = "get_activecafsMdl"

    caftyp = `and 1=1`

    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }
    var QRY_TO_EXEC = `
    select c.caf_id,c.caf_nu,c.cstmr_id,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,max(date_format(c.spnd_ts,'%d-%m-%Y')) as prvs_spnd_ts,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,c.crnt_pln_id,c.aaa_cd,c.caf_mac_addr_tx,cm.cstmr_nm as frst_nm,cm.lst_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,
    c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd
    from caf_dtl_t as c
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.spnd_in = 0 and c.actve_in = 1 and c.trmnd_in=0 and c.enty_sts_id <> 8 and c.enty_sts_id in(6,84) ${agntid} ${caf} ${adhar} ${mobile}  GROUP BY c.caf_id`;

    console.log("&&&&&&&&&&&&&&&&gettttttactiveeeeeeeeeeeeeeeee&&&&&&&&&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_activecafsSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_activecafsSrvrPgntnMdl = function (data,agntdt, user) {
    var fnm = "get_activecafsSrvrPgntnMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(agntdt)
    caftyp = `and 1=1`
    if (agntdt == 6) {
        caftyp = `and c.caf_type_id =2`
    }
    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }

    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `
    select DISTINCT(c.caf_id),c.caf_id,c.caf_nu,c.cstmr_id,max(date_format(cp.cycle_end_dt,'%d-%m-%Y')) as pack_expry,max(date_format(cp.cycle_strt_dt,'%d-%m-%Y')) as pack_strt,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,max(date_format(c.spnd_ts,'%d-%m-%Y')) as prvs_spnd_ts,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,c.crnt_pln_id,c.aaa_cd,c.caf_mac_addr_tx,cm.cstmr_nm as frst_nm,cm.lst_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,
    c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt
    from caf_dtl_t as c
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
	join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
    left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.spnd_in = 0 and c.actve_in = 1 and c.trmnd_in=0 and c.enty_sts_id <> 8 and c.enty_sts_id in(6,84)
    ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd}  GROUP BY c.caf_id ORDER BY c.caf_id  limit ${pge_nu}, 5`;




    console.log("&&&&&&&&&&&&&&&& get_activecafsSrvrPgntnMdl &&&&&&&&&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_suspendedcafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_suspendedcafsMdl = function (data, user) {
    var fnm =  "get_suspendedcafsMdl"
    let where_cnd = ` `;

    caftyp = `and 1=1`

    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }


    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    var QRY_TO_EXEC = `select c.caf_id,c.caf_nu,c.cstmr_id,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
    c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,max(date_format(s.spnd_dt,'%d-%m-%Y')) as spnd_dt,
    DATEDIFF(CURRENT_DATE() , max(s.spnd_dt)) as spnd_count,c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
    cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
    c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd
    from caf_dtl_t as c
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.spnd_in = 1 and c.actve_in = 0 and c.trmnd_in=0 and c.enty_sts_id <> 8 and st.trmn_in=2  ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd}
    GROUP BY c.caf_id order by s.spnd_dt desc`;



    console.log("&&&&&&&&&&&&&&&&gettttttsusssssspnd&&&&&&&&&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_suspendedcafsMdl get_suspendedcafsSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_suspendedcafsSrvrPgntnMdl = function (data, agntdt, user) {
    var fnm = "get_suspendedcafsSrvrPgntnMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(agntdt)
    caftyp = `and 1=1`
    if (agntdt == 6 ) {
        caftyp = `and c.caf_type_id =2`
    }
    if (data.caf_nu == 0) {
        caf = ` `
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }


    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
	 if (user.prpd_flag == 1) {
        var QRY_TO_EXEC = `select DISTINCT(c.caf_id),p.pckge_nm,c.caf_id,date_format(max(c1.cycle_end_dt),'%d-%m-%Y') as cycle_end_dt,c.caf_nu,c.cstmr_id,
        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,case when date_format(max(c1.cycle_strt_dt),'%d-%m-%Y') is null then 0 else date_format(max(c1.cycle_strt_dt),'%d-%m-%Y') end as Renewed_On,
        c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
        c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,case when DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') is null then 0 else date_format(max(c.spnd_ts),'%d-%m-%Y') end as spnd_dt,
        (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
        #case when c.enty_sts_id=6 then 0 else ifnull(DATEDIFF(CURDATE(),c.spnd_ts)+(30*spnd_count),0) end as spnd_count,
        case when c.enty_sts_id=6 then 0 else DATEDIFF(CURDATE(),c.spnd_ts) end as spnd_count,
		c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
        cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
        c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') as actvnDt
        from caf_dtl_t as c
        left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id 
        left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
		join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
        #left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
        left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id  
         join caf_pckge_prchse_dtl_t as c1 on c.caf_id=c1.caf_id and c1.pckge_id=c.crnt_pln_id and c1.a_in=1
        where    c.trmnd_in=0 and c.trmnd_rqst_in=0 and c.enty_sts_id <> 8 
    and ((st.trmn_in=2 and c.spnd_in=1) OR cycle_end_dt between CURDATE() and CURDATE()+INTERVAL 10 DAY
    ) 
     ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd} and c.caf_id not in (select caf_id from bulk_renew_caf_data_t where a_in=1)
        GROUP BY c.caf_id order by c.caf_id desc limit ${pge_nu}, 20`
    } else {
    var QRY_TO_EXEC = `select DISTINCT(c.caf_id),c.caf_id,c.caf_nu,c.cstmr_id,max(date_format(cp.cycle_end_dt,'%d-%m-%Y')) as pack_expry,max(date_format(cp.cycle_strt_dt,'%d-%m-%Y')) as pack_strt,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
    c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,max(date_format(s.spnd_dt,'%d-%m-%Y')) as spnd_dt,
    (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    DATEDIFF(CURRENT_DATE() , max(s.spnd_dt)) as spnd_count,c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
    cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
    c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt
    from caf_dtl_t as c
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
	join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.spnd_in = 1 and c.actve_in = 0 and c.trmnd_in=0 and c.enty_sts_id <> 8 and c.enty_sts_id in(7,85)  ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd}
    GROUP BY c.caf_id order by s.spnd_dt desc  limit ${pge_nu}, 20`;
	}
    console.log("&&&&&&&&&&&&&&&& get_suspendedcafsSrvrPgntnMdl &&&&&&&&&&&&&&&&&&&&&");



    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       :  get_bulksuspendedcafsSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_bulksuspendedcafsSrvrPgntnMdl = function (data, agntdt, user) {
    var fnm = "get_bulksuspendedcafsSrvrPgntnMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(agntdt)
    caftyp = `and 1=1`
    if (agntdt == 6) {
        caftyp = `and c.caf_type_id =2`
    }
    if (data.caf_nu == 0) {
        caf = ` `
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }


    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    if (user.prpd_flag == 1) {
        var QRY_TO_EXEC = `select DISTINCT(c.caf_id),c.caf_id,c1.cycle_end_dt,c.caf_nu,c.cstmr_id,
        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
        c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
        c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,max(date_format(s.spnd_dt,'%d-%m-%Y')) as spnd_dt,
        (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
        DATEDIFF(CURRENT_DATE() , max(s.spnd_dt)) as spnd_count,c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
        cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
        c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt
        from caf_dtl_t as c
        left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id 
        left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
        left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id  
         join caf_pckge_prchse_dtl_t as c1 on c.caf_id=c1.caf_id and c1.pckge_id=c.crnt_pln_id and c1.a_in=1 
        where    c.trmnd_in=0 and c.trmnd_rqst_in=0 and c.enty_sts_id <> 8 and c.caf_type_id=1
        and st.trmn_in=2 and c.spnd_in = 1 
        ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd} and c.caf_id not in (select caf_id from bulk_renew_caf_data_t where a_in=1)
        GROUP BY c.caf_id order by c.caf_id desc limit ${pge_nu}, 20`
    } else {
        var QRY_TO_EXEC = `select DISTINCT(c.caf_id),c.caf_id,c.caf_nu,c.cstmr_id,
        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
        c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
        c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,max(date_format(s.spnd_dt,'%d-%m-%Y')) as spnd_dt,
        (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
        DATEDIFF(CURRENT_DATE() , max(s.spnd_dt)) as spnd_count,c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
        cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
        c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt
        from caf_dtl_t as c
        left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
        left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
        left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
        where c.spnd_in = 1 and c.actve_in = 0 and c.trmnd_in=0 and c.trmnd_rqst_in=0 and c.enty_sts_id <> 8 and c.caf_type_id=1 and st.trmn_in=2  ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd}
        GROUP BY c.caf_id order by c.caf_id desc  limit ${pge_nu}, 20`;
    }

    console.log("&&&&&&&&&&&&&&&& get_suspendedcafsSrvrPgntnMdl &&&&&&&&&&&&&&&&&&&&&");



    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : update_activecafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.update_activecafsMdl = function (data, user) {
    var fnm = "update_activecafsMdl"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t  SET actve_in=1,spnd_in=0,actvn_ts=CURRENT_TIMESTAMP(),enty_sts_id=6,
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id= ${data.caf_id}`;


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : update_activecafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateCafStsMdl = function (updtData, data, user) {
    var fnm = "updateCafStsMdl"
    let updateKeys = '';
    try {
        Object.keys(updtData).forEach(function (k) {
            if (k == 'spnd_ts' || k == 'rsme_ts') {
                updateKeys += `${k} = CURRENT_TIMESTAMP(),`
            } else {
                updateKeys += `${k} = ${updtData[k]},`
            }

        })
        var QRY_TO_EXEC = `UPDATE caf_dtl_t  SET ${updateKeys}
        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
        WHERE caf_id= ${data.caf_id}`;
    } catch (err) {
        console.log(err)
    }


    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : update_partily_resumecafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.update_partily_resumecafsMdl = function (data, user) {
    var fnm = "update_partily_resumecafsMdl"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t  SET actve_in=1,spnd_in=0,actvn_ts=CURRENT_TIMESTAMP(),enty_sts_id=85,
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id= ${data.caf_id}`;


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insertcstmrspndForActive
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertcstmrspndForActive = function (data, user) {
    var fnm = "insertcstmrspndForActive"

    // var QRY_TO_EXEC = `insert into cstmr_spnd_dtl_t(rsme_dt,cstmr_id,a_in,crte_usr_id,i_ts) values(CURDATE(),'${data.cstmr_id}',1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`;
    var QRY_TO_EXEC = `UPDATE caf_spnd_dtl_t SET rsme_dt=CURDATE(),updte_usr_id = ${user.mrcht_usr_id},rsme_usr_id= ${user.mrcht_usr_id},rsme_ts=CURDATE(),u_ts = CURRENT_TIMESTAMP() where caf_id = ${data.caf_id} and rsme_dt is null`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : check_suspendsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.check_suspendsMdl = function (data, user) {
    var fnm = "check_suspendsMdl"
    // var QRY_TO_EXEC = `select month(spnd_dt),MONTH(CURRENT_DATE()),year(spnd_dt),YEAR(CURRENT_DATE()),count(*) as count from caf_spnd_dtl_t where caf_id=${data.caf_id}
    // and month(spnd_dt)=MONTH(CURRENT_DATE()) and year(spnd_dt)=YEAR(CURRENT_DATE())
    // having count(*) < ${as.bssconf.caf_spns_per_month}
    // order by caf_id`;
    var QRY_TO_EXEC = `select month(spnd_dt),MONTH(CURRENT_DATE()),year(spnd_dt),YEAR(CURRENT_DATE()),count(*) as count,DATE_FORMAT(spnd_dt,"%d-%M-%Y") as spnd_dt,
      (case when count(*) < ${as.bssconf.caf_spns_per_month} THEN "true" else "false" end) as 'value'
      from caf_spnd_dtl_t
      where caf_id=${data.caf_id} and month(spnd_dt)=MONTH(CURRENT_DATE()) and year(spnd_dt)=YEAR(CURRENT_DATE())
      order by caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : update_suspendcafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.update_suspendcafsMdl = function (data, user) {
    var fnm = "update_suspendcafsMdl"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t  SET actve_in=0,spnd_in=1,spnd_ts=CURRENT_TIMESTAMP(),enty_sts_id=7,
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id= ${data.caf_id}`;


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : update_partily_suspendcafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.update_partily_suspendcafsMdl = function (data, user) {
    var fnm = "update_partily_suspendcafsMdl"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t  SET enty_sts_id=84,
    updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id= ${data.caf_id}`;


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insertcstmrspndForSuspend
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertcstmrspndForSuspend = function (data, user) {
    var fnm = "insertcstmrspndForSuspend"

    var QRY_TO_EXEC = `insert into caf_spnd_dtl_t(spnd_dt,spnd_cmnt_tx,spnd_usr_id,spnd_ts,caf_id,a_in,crte_usr_id,i_ts) values(CURDATE(),'${data.spnd_reason}',${user.mrcht_usr_id},CURDATE(),'${data.caf_id}',1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : forExternalApiPckgeServicesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.forExternalApiPckgeServicesMdl = function (data, user) {
    var fnm = "forExternalApiPckgeServicesMdl"

    var QRY_TO_EXEC = `select r.pckge_srvcpk_rel_id,r.pckge_id,r.srvcpk_id,s.srvcpk_nm,r.cre_srvce_id,c.cre_srvce_nm,
    MAX(case when hp.prpry_nm='AAA-DownloadSpeed-Normal' THEN vle_tx ELSE NULL END) as aaa_dw_nrml,
    MAX(case when hp.prpry_nm='AAA-UploadSpeed-Normal' THEN vle_tx ELSE NULL END) as aaa_up_nrml,
    MAX(case when hp.prpry_nm='upstreamTrafficProfileName' THEN vle_tx ELSE NULL END) as up_strm_trfficpfl_nm,
    MAX(case when hp.prpry_nm='downstreamTrafficProfileName' THEN vle_tx ELSE NULL END) as dwn_strm_trfficpfl_nm,
    s.expry_dt,DATE_FORMAT(s.expry_dt, "%y%m%d") as dt
    from 
    pckge_srvcpk_rel_t as r 
    join pckge_srvcpk_lst_t as s on s.srvcpk_id=r.srvcpk_id
    left join cre_srvce_lst_t as c on c.cre_srvce_id=r.cre_srvce_id
    left JOIN BSS_ONLINE_U.pckge_hsi_prpry_srvcpk_rel_t as spr on spr.srvcpk_id=s.srvcpk_id
    left JOIN BSS_ONLINE_U.pckge_hsi_prpry_lst_t as hp on hp.prpry_id=spr.prpry_id
    where r.pckge_id=${data.pckge_id}
    group by pckge_srvcpk_rel_id
    ORDER BY r.cre_srvce_id`;

    console.log("servicesssssssssssssssssss");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_paymntmodesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_paymntmodesMdl = function (user) {
    var fnm = "get_paymntmodesMdl"
    var QRY_TO_EXEC = `select pymnt_mde_id,pymnt_mde_nm,a_in from pymnt_mde_lst_t order by pymnt_mde_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};






/*****************************************************************************
* Function       : get_dueAmountMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_dueAmountMdl = function (custmr_id, agent_id, user) {
    var fnm = "get_dueAmountMdl"
    // var QRY_TO_EXEC = `select e.caf_invce_id,e.caf_id,c.caf_nu,e.cstmr_id,u.cstmr_nm,u.frst_nm,u.lst_nm,u.cntct_mble1_nu,
    // REPLACE(u.adhr_nu,SUBSTR(u.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    // t.caf_type_nm,u.agnt_id,a.agnt_nm,e.invce_at as due_amnt,DATE_FORMAT(e.invce_dt, "%d-%m-%Y") as invce_dt,e.invce_yr from 
    // erp_invce_lst_t as e
    // join caf_dtl_t  as c on c.caf_id = e.caf_id
    // join cstmr_dtl_t as u on u.cstmr_id = e.cstmr_id
    // join caf_type_lst_t as t on t.caf_type_id = u.caf_type_id
    // join agnt_lst_t as a on a.agnt_id=u.agnt_id
    // where e.pblsd_in=1 and e.pd_in = 0 and u.agnt_id=${agent_id} and e.cstmr_id=${custmr_id} order by e.invce_dt desc`;


    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as due_amnt,i.invce_at as amnt,
    format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,
    DATE_FORMAT(i.invce_dt,'%d-%m-%Y') as invce_dt,i.lmo_agnt_id as agnt_id,i.caf_id,i.caf_id as caf_nu,i.cstmr_id,a.agnt_nm,(case when i.pd_in=0 then 'Not Paid' WHEN i.pd_in=1 THEN 'Paid' end) as 'Payment Status'
    from erp_invce_lst_t i
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id
        join agnt_lst_t as a on a.agnt_id = i.lmo_agnt_id
        WHERE i.pd_in=0 and i.pblsd_in=1 AND i.cstmr_id=${custmr_id}
        ORDER BY i.invce_dt desc`;

    console.log("***********************payyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*******************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insertPaymentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insertPaymentsMdl = function (data, agentid, user, pmnt_id) {
    var fnm = "insertPaymentsMdl"

    
    console.log(data);
    var QRY_TO_EXEC = `insert into erp_pmnt_dtl_t(pmnt_id,pmnt_at,pymnt_mde_id,crte_usr_id,a_in,i_ts) values (${pmnt_id},${data.amount},${data.paymode},${user.mrcht_usr_id},1,current_timestamp())`;

    console.log("******************** 111111111111111 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : updateCustomrPaymntDtls
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateCustomrPaymntDtls = function (data, agentid, user) {
    var fnm = "updateCustomrPaymntDtls"
    var QRY_TO_EXEC = `update cstmr_dtl_t set lst_pymnt_id='${data.pmnt_id}',pndng_blne_at = '${data.pnd_bal_amnt}', updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp() where cstmr_id='${data.cstmr_id}'`;
    console.log("******************** 2222222222222222222222222 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insertInvoicePaymentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertInvoicePaymentsMdl = function (data, user, callback) {
    var fnm = "insertInvoicePaymentsMdl"
    let semicolumnORcomma = ' ,'
    let concat = ' '

    var QRY_TO_EXEC = `insert into erp_invce_pmnt_dtl_t(invce_id,pmnt_id,crte_usr_id,a_in,i_ts) values`;
    for (var i = 0; i < data.insertData.length; i++) {
        if (i + 1 == data.insertData.length) {
            semicolumnORcomma = ' ;'
        }
        concat += `(${data.insertData[i].invce_id},${data.insertData[i].pmnt_id},${user.mrcht_usr_id},1,current_timestamp()) ${semicolumnORcomma}`;
    }

    QRY_TO_EXEC += concat;

    console.log("******************** 333333333333333333 ***************************");
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updatepayedINdicator
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updatepayedINdicator = function (data, user) {
    var fnm = "updatepayedINdicator"

    console.log(data);
    var QRY_TO_EXEC = `update erp_invce_lst_t set  pd_in = 1,pd_dt=current_date(), pd_ts=current_timestamp(), u_ts=current_timestamp() where caf_invce_id= ${data.invce_id}`;
    console.log("******************** 111111111111111 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_terminationMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_terminationMdl = function (agent_id, user) {
    var fnm = "get_terminationMdl"
    // var QRY_TO_EXEC = `select c.caf_id,c.caf_nu,c.caf_mac_addr_tx,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.agnt_id,a.agnt_cd,o.olt_nm,o.pop_id,c.olt_id,c.olt_srl_nu,c.olt_ip_addr_tx,c.olt_prt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.aghra_cd,c.cstmr_id,d.frst_nm,d.loc_addr1_tx,d.loc_addr2_tx,d.loc_lcly_tx,d.loc_ara_tx,d.loc_dstrct_id,l.dstrt_nm,d.loc_mndl_id,m.mndl_nm,d.loc_vlge_id,v.vlge_nm,
    // trmnd_in,trmnd_dt,
    //  from 
    //     caf_dtl_t as c
    //     join agnt_lst_t as a on a.agnt_id = c.agnt_id
    //     join cstmr_dtl_t as d on d.cstmr_id = c.cstmr_id
    //     join olt_lst_t as o on o.olt_id =c.olt_id
    //     join dstrt_lst_t as l on l.dstrt_id = d.loc_dstrct_id
    //     join mndl_lst_t as m on m.mndl_id = d.loc_mndl_id
    //     join vlge_lst_t as v on v.vlge_id = d.loc_vlge_id
    //     where c.agnt_id=${agent_id} and trmnd_in=1`;
    var QRY_TO_EXEC = `select c.caf_id,c.caf_nu,c.caf_mac_addr_tx,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.lmo_agnt_id,a.agnt_cd,o.olt_nm,o.pop_id,c.olt_id,c.olt_srl_nu,c.olt_ip_addr_tx,c.olt_prt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.aghra_cd,c.cstmr_id,d.frst_nm,d.loc_addr1_tx,d.loc_addr2_tx,d.loc_lcly_tx,d.loc_ara_tx,d.loc_dstrct_id,l.dstrt_nm,d.loc_mndl_id,m.mndl_nm,d.loc_vlge_id,v.vlge_nm,
                       c.trmnd_in,c.trmnd_dt
                       from
                      caf_dtl_t as c
                      join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
                      join cstmr_dtl_t as d on d.cstmr_id = c.cstmr_id
                      join olt_lst_t as o on o.olt_id =c.olt_id
                      JOIN vlge_lst_t v ON v.vlge_nu = d.loc_vlge_id and v.mndl_id = d.loc_mndl_id AND v.dstrt_id = d.loc_dstrct_id
                      JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
                      JOIN dstrt_lst_t l ON l.dstrt_id = v.dstrt_id
                      where c.lmo_agnt_id=${agent_id} and c.trmnd_in=1`

    console.log("*******termination**********");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : to_terminationMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.to_terminationMdl = function (caf_id, user) {
    var fnm = "to_terminationMdl"
    var QRY_TO_EXEC = `update caf_dtl_t set trmnd_in=1 and trmnd_dt=CURRENT_DATE()  where caf_id=${caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_iptvDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_iptvDetailsMdl = function (iptv_srl_nu, user) {
    var fnm = "get_iptvDetailsMdl"
    var lmoCond = ``;
    if(user.usr_ctgry_ky == null){
        lmoCond = ``;
    } else {
        lmoCond = `AND lmo_agnt_id=${user.usr_ctgry_ky}`;
    }
    var QRY_TO_EXEC = ` select stpbx_id as iptv_stpbx_id,srl_nu as iptv_srl_nu,mac_addr_cd as iptv_mac_addr,prdct_id
                        from inv_stpbx_lst_t where srl_nu = '${iptv_srl_nu}' ${lmoCond}`;
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_onuDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_onuDetailsMdl = function (onu_srl_nu, user) {
    var fnm = "get_onuDetailsMdl"
    var lmoCond = ``;
    if(user.usr_ctgry_ky == null){
        lmoCond = ``;
    } else {
        lmoCond = `AND lmo_agnt_id=${user.usr_ctgry_ky}`;
    }
    var QRY_TO_EXEC = ` select stpbx_id as onu_stpbx_id,srl_nu as onu_srl_nu,mac_addr_cd as onu_mac_addr,prdct_id
                        from inv_stpbx_lst_t 
                        where srl_nu = '${onu_srl_nu}' ${lmoCond}`;
 console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : updateBoxChangeFailureStatus
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateBoxChangeFailureStatus = function (data, user) {
    var fnm = "updateBoxChangeFailureStatus"
    var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=2, updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp(), a_in=1
    where caf_id='${data.caf_id}'`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateBoxChangePndngStatus
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateBoxChangePndngStatus = function (data, user) {
    var fnm = "updateBoxChangePndngStatus"
    var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=1, updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp(), a_in=1
    where caf_id='${data.caf_id}'`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updateBoxChangeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateBoxChangeMdl = function (data, user) {
    var fnm = "updateBoxChangeMdl"
    var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=3,iptv_stpbx_id='${data.iptv_stpbx_id}', onu_stpbx_id='${data.onu_stpbx_id}', iptv_srl_nu ='${data.new_iptv_srno}',iptv_mac_addr_tx='${data.new_iptv_mac_adrs}', onu_srl_nu ='${data.new_onu_srno}', onu_mac_addr_tx ='${data.new_onu_mac_adrs}', updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp(), a_in=1
    where caf_id='${data.caf_id}'`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updateinvoicesetupbox
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateinvoicesetupbox = function (data, user) {
    var fnm = "updateinvoicesetupbox"

    var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_iptv_srno}','${data.old_onu_srno}')`,
    `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_iptv_srno}','${data.new_onu_srno}')`]

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateInvoiceDblSetupbox
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateInvoiceDblSetupbox = function (data, user) {
    var fnm = "updateInvoiceDblSetupbox"
    if (data.changed == 'iptv') {
        var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_iptv_srno}')`,
        `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_iptv_srno}')`]
    } else if (data.changed == 'onu') {
        var QRY_TO_EXEC = [`update inv_stpbx_lst_t set caf_id =null where srl_nu in ('${data.old_onu_srno}')`,
        `update inv_stpbx_lst_t set caf_id =${data.caf_id} where srl_nu in ('${data.new_onu_srno}')`]
    }
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateDblBoxChangeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateDblBoxChangeMdl = function (data, user) {
    var fnm= "updateDblBoxChangeMdl"
    if (data.changed == 'iptv') {
        var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=3,iptv_stpbx_id='${data.iptv_stpbx_id}', iptv_srl_nu ='${data.new_iptv_srno}',iptv_mac_addr_tx='${data.new_iptv_mac_adrs}', updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp(), a_in=1
        where caf_id='${data.caf_id}'`;
    } else if (data.changed == 'onu') {
        var QRY_TO_EXEC = `update caf_dtl_t set box_chng_sts_id=3, onu_stpbx_id='${data.onu_stpbx_id}', onu_srl_nu ='${data.new_onu_srno}', onu_mac_addr_tx ='${data.new_onu_mac_adrs}', updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp(), a_in=1
        where caf_id='${data.caf_id}'`;
    }
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insertBothIptvOnuMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insertBothIptvOnuMdl = function (data, user) {
    var fnm = "insertBothIptvOnuMdl"


    var QRY_TO_EXEC = [`insert into caf_stpbx_rel_t(caf_id,stpbx_id,crnt_in,cmnt_tx,rsn_in,efcte_dt,crte_usr_id,a_in,i_ts)values
    ('${data.caf_id}','${data.iptv_stpbx_id}',1,'${data.change_comment}','${data.reason_change}','CURDATE()','${user.mrcht_usr_id}',1,current_timestamp())`,
    `insert into caf_stpbx_rel_t(caf_id,stpbx_id,crnt_in,cmnt_tx,rsn_in,efcte_dt,crte_usr_id,a_in,i_ts)values
    ('${data.caf_id}','${data.onu_stpbx_id}',1,'${data.change_comment}','${data.reason_change}','CURDATE()','${user.mrcht_usr_id}',1,current_timestamp())`]

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_oltinstaladdrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltinstaladdrMdl = function (data, user) {
    var fnm = "get_oltinstaladdrMdl"
    var QRY_TO_EXEC = `select o.olt_id,vlge_nm,v.vlge_nu,v.vlge_id,v.mndl_id,v.dstrt_id,v.std_cd from agnt_sbstn_rel_t as a
    join sbstn_lst_t as s on s.sbstn_id=a.sbstn_id
    join olt_lst_t as o on o.sbstn_id=s.sbstn_id
    join vlge_lst_t as v on v.vlge_id=a.vlge_id
    where s.sbstn_id=${data.sbstn_id} and a.agnt_id=${data.agnt_id}
    group by s.sbstn_id,v.vlge_id`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getOltdtlsByagentIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltdtlsByagentIdMdl = function (id, user) {
    var fnm = "getOltdtlsByagentIdMdl"

    console.log(user)
    agnt_id =user.usr_ctgry_ky
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
	if(agnt_id == undefined || agnt_id == 'undefined' || agnt_id== null || agnt_id == '')
		agnt_id = user.usr_ctgry_ky
	
    var QRY_TO_EXEC = `SELECT o1.*,o.crd_id FROM olt_prts_lst_t as o
    join olt_lst_t as o1 on o.olt_id=o1.olt_id
        WHERE  agnt_id=${agnt_id} and sbstn_id=${id} group by sbstn_id,o.olt_id  order by olt_lble_nu`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getOltdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltdtlsMdl = function (id, user) {
    var fnm = "getOltdtlsMdl"
    var QRY_TO_EXEC = `SELECT * FROM olt_lst_t 
    WHERE sbstn_id = ${id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_oltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltsMdl = function (agent_id, user) {
    var fnm = "get_oltsMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY o.olt_id) as sno,o.olt_id,p.crd_id,o.olt_nm,olt_ip_addr_tx,olt_srl_nu,olt_acs_nde_id,o.sbstn_id,s.sbstn_nm,o.sbstn_type_id,st.sbstn_type_nm,o.olt_lble_nu,o.olt_nde_nu,o.olt_prt_ct,s.dstrct_id,d.dstrt_nm,s.mndl_id,m.mndl_nm FROM olt_lst_t o
                        JOIN sbstn_lst_t s ON s.sbstn_id = o.sbstn_id
                        left JOIN sbstn_type_lst_t st on st.sbstn_type_id =o.sbstn_type_id
                        left JOIN olt_prts_lst_t as p on p.olt_id=o.olt_id
                        JOIN dstrt_lst_t d on d.dstrt_id = s.dstrct_id
                        JOIN mndl_lst_t m on m.mndl_nu = s.mndl_id and m.dstrt_id = s.dstrct_id
                        where o.a_in =1
                        GROUP BY o.olt_id,p.crd_id
                        order by o.olt_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_sbstnsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_sbstnsMdl = function (dstrct_id, mndl_id, user) {
    var fnm = "get_sbstnsMdl"
    var QRY_TO_EXEC = `SELECT * FROM sbstn_lst_t  
    WHERE dstrct_id = ${dstrct_id} AND mndl_id = ${mndl_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_sbstnstypeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_sbstnstypeMdl = function (user) {
    var fnm = "get_sbstnstypeMdl"
    var QRY_TO_EXEC = `SELECT * FROM sbstn_type_lst_t;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getOltPortDtlsByAgntIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltPortDtlsByAgntIdMdl = function (id, user) {
    var fnm = "getOltPortDtlsByAgntIdMdl"
    var QRY_TO_EXEC = ` SELECT olt_prt_id,olt_prt_nm,p.olt_id,olt_nm,
                        olt_ip_addr_tx,olt_srl_nu,olt_nde_nu,olt_lble_nu,olt_acs_nde_id,o.sbstn_id,sbstn_nm,
                        o.sbstn_type_id,sbstn_type_nm,
                        agnt_id,crd_id,m.mndl_nm FROM
                        olt_prts_lst_t p
                        JOIN olt_lst_t o ON p.olt_id = o.olt_id
                        JOIN sbstn_lst_t s ON o.sbstn_id = s.sbstn_id
                        JOIN mndl_lst_t m on m.dstrt_id = s.dstrct_id AND m.mndl_nu = s.mndl_id 
                        JOIN sbstn_type_lst_t st ON o.sbstn_type_id = st.sbstn_type_id
                        WHERE agnt_id=${id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateOltdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateOltdtlsMdl = function (data, olt_id, user) {
    var fnm = "updateOltdtlsMdl"
    var QRY_TO_EXEC = `UPDATE olt_lst_t SET  olt_nm='${data.olt_nm}', olt_ip_addr_tx='${data.olt_ip_adrs}',olt_srl_nu='${data.olt_srl_no}',olt_nde_nu='${data.nde_nm}',olt_lble_nu='${data.lbl_nm}',olt_acs_nde_id='${data.olt_acces_cd}',sbstn_id=${data.sbstn_id},sbstn_type_id=${data.olt_typ},updte_usr_id='${user.mrcht_usr_id}',u_ts=current_timestamp() WHERE olt_id=${olt_id}`
                    // `UPDATE olt_ltrck_dtl_t SET  olt_nm='${data.olt_nm}',dstrt_id='${data.dstrt_id}', mndl_id='${data.mndl_id}', olt_ip_addr_tx='${data.olt_ip_adrs}',olt_srl_nu='${data.olt_srl_no}',olt_lble_nu=${data.lbl_nm},olt_acs_nde_id=${data.olt_acces_cd},sbstn_id=${data.sbstn_id},olt_type_id=${data.olt_typ},updte_usr_id='${user.mrcht_usr_id}',u_ts=current_timestamp() WHERE olt_id=${olt_id}`]
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
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
* Function       : deleteOltdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteOltdtlsMdl = function (id, user) {
    var fnm = "deleteOltdtlsMdl"
    var QRY_TO_EXEC = `UPDATE olt_lst_t SET a_in=0, d_ts = current_timestamp() where olt_id = ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getRevenueSharingMonthWiseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingMonthWiseMdl = function (yearid, agnt_id, data) {
    var fnm = "getRevenueSharingMonthWiseMdl"
    console.log("yearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    console.log(yearid)

	if(data.usr_ctgry_nm == 'MSO'){
		where_agnt = `a.agnt_id=e.mso_agnt_id`,
		where_agnt_id = `e.mso_agnt_id=${agnt_id}`
	}else{
		where_agnt = `a.agnt_id=e.lmo_agnt_id`,
		where_agnt_id = `e.lmo_agnt_id=${agnt_id}`
	}
    if (yearid == 'undefined') {
        year = `and invce_yr=YEAR(CURDATE())`
    }
    else {
        year = `and invce_yr=${yearid}`
    }
    var QRY_TO_EXEC = `select a.agnt_cd,count(DISTINCT e.caf_id) as cafcount,sum(e.apsfl_shre_at) as apsflshare,sum(e.mso_shre_at) as msoshare,sum(e.lmo_shre_at) as lmoshare,sum(invce_at+sgst_at+cgst_at+srvc_at) as total,invce_mm as monthid,invce_yr as year,
    (case when pd_in=0 then count(pd_in) else 0 end)  as 'NotPaid',
    (case when pd_in=1 then count(pd_in) else 0 end)  as 'Paid',
    (case when pd_in=0 then 'Not Paid' else 'Paid' end)  as pd_sts,
    e.voip_chrge_at,e.add_on_chrge_at,
    (CASE WHEN prtd_in =1 then count(prtd_in) else 0 end) as pro_rted_caf_cnt,ofce_dstrt_id
    from erp_invce_lst_t as e
    left join agnt_lst_t as a on ${where_agnt}
    where e.pblsd_in=1 and ${where_agnt_id} and invce_yr=${yearid}
    GROUP BY invce_mm order by invce_mm`;
	
    console.log("************firstttttttttttttttttttttt*************************")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, data,fnm);
};

/*****************************************************************************
* Function       : prepaidgetRevenueSharingMonthWiseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prepaidgetRevenueSharingMonthWiseMdl = function (yearid, agnt_id, data) {
    var fnm = "prepaidgetRevenueSharingMonthWiseMdl"
    console.log("yearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    console.log(yearid)
        if (data.usr_ctgry_nm == 'MSO') {
            where_agnt = `,agnt_cd`,
                where_agnt_id = `c.mso_agnt_id=${agnt_id}`
        } else {
            where_agnt = ``,
                where_agnt_id = `c.lmo_agnt_id=${agnt_id}`
        }
        if (yearid == 'undefined') {
            year = `and year(f.ac_date)=YEAR(CURDATE())`
        }
        else {
            year = `and year(f.ac_date)=${yearid}`
        }
        var QRY_TO_EXEC = `select a.agnt_cd,count(distinct(f.cust_id)) as cafcount,count(distinct(f.cust_id)) as pro_rted_caf_cnt,sum((p.bse_pck_price*p.apsfl_share/100)+(p.cpe_rental+p.cpe_rental*p.tax/100)) as apsflshare,
            sum(p.bse_pck_price*p.mso_share/100) as msoshare,sum(p.bse_pck_price*p.lmo_share/100) as lmoshare,
            sum((p.bse_pck_price*p.apsfl_share/100)+(p.bse_pck_price*p.mso_share/100)+p.cpe_rental+(p.cpe_rental*p.tax/100)+(p.bse_pck_price*p.lmo_share/100)) as total
            ,year(f.ac_date) as year,MONTH(f.ac_date) as monthid,ofce_dstrt_id,0 as voip_chrge_at,count(distinct(f.cust_id)) as paid, 0 as NotPaid,
            (case when cust_id=0 then 'Not Paid' else 'Paid' end)  as pd_sts
            from prepaid_f_accounting as f
            join agnt_lst_t as a on a.agnt_id=f.created_by
            join pckge_lst_t as p on p.pckge_id=f.stb_id
            join caf_dtl_t as c on c.caf_id=f.cust_id where ${where_agnt_id} ${year}
            group by MONTH(f.ac_date)${where_agnt} order by MONTH(f.ac_date) desc;`

    console.log("************firstttttttttttttttttttttt*************************")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : getRevenueSharingCustomerWiseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingCustomerWiseMdl = function (data, user) {
    var fnm = "getRevenueSharingCustomerWiseMdl"
    // var QRY_TO_EXEC = `select caf_invce_id as 'Invoice Id',a.agnt_cd as 'LMO Code',e.cstmr_id,cm.frst_nm,cm.lst_nm,cm.cstmr_nm as 'Customer Name',cm.cntct_mble1_nu as 'Mobile Number',c.caf_nu as 'Caf No',DATE_FORMAT(c.actvn_dt, "%d-%m-%Y")as 'Caf Date',
    // e.apsfl_shre_at as 'APSFL Share',e.mso_shre_at as 'MSO Share',e.lmo_shre_at as 'LMO Share',(invce_at+sgst_at+cgst_at+srvc_at) as 'Total',
    // date_format(invce_dt,'%d-%m-%y') as 'Invoice Date',invce_mm as 'Month',
    // (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status',e.invce_yr,e.invce_mm
    // from erp_invce_lst_t as e
    // left join agnt_lst_t as a on a.agnt_id=e.lmo_agnt_id
    // LEFT JOIN cstmr_dtl_t as cm on cm.cstmr_id= e.cstmr_id
    //  jOIN caf_dtl_t as c on  c.cstmr_id = e.cstmr_id
    //  where e.pblsd_in=1 and e.lmo_agnt_id=${data.agentid} and invce_yr=${data.year} and invce_mm=${data.month}
    // GROUP BY e.cstmr_id
    // ORDER BY e.caf_invce_id`;
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY i.caf_invce_id) as 'Sno',i.lmo_agnt_id as agnt_id
    ,i.caf_invce_id as 'CAF Invoice Id'
     ,a.agnt_cd as 'LMO Code' 
    ,c.caf_nu as 'CAF Number',cs.cstmr_nm as 'Customer Name',c.mbl_nu as 'Customer Mobile No',i.invce_yr as 'Invoice Year'
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as 'Invoice Month',i.invce_mm as invoice_mnth
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as 'Invoice From Date',DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as 'Invoice To Date'
    ,DATE_FORMAT(c.actvn_dt ,'%d-%m-%Y') as 'Activation Date',bf.frqncy_nm as 'Frequency Name'
     ,p.pckge_nm AS 'Base Package',CASE (i.pd_in) WHEN 1 THEN 'PAID' ELSE 'NOT PAID' END as 'Status',i.pd_ts as 'Paid Time Stamp'
     ,format(sum(id.lmo_shre_at),2) as 'LMO Share'
      ,format(sum(id.mso_shre_at),2) as 'MSO Share'
     ,format(sum(id.apsfl_shre_at),2) as 'APSFL Share'
    ,format(sum(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at),2) as 'Invoice Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'VOIP Charge Amount'
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Add on Charge Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'Box Rent'
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Base Packages Charge Amount'
     ,cs.loc_dstrct_id as dstrt_id
    from erp_invce_lst_t i
    JOIN erp_invce_dtl_t id on i.caf_invce_id =id.caf_invce_id 
    JOIN caf_dtl_t c ON i.caf_id=c.caf_id  
    JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id
    join blng_frqncy_lst_t bf on i.frqncy_id =bf.frqncy_id 
    LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    where 1=1 and i.invce_yr='${data.invce_yr}' and i.invce_mm='${data.invoice_month}' 
    and id.invce_yr = i.invce_yr and id.invce_mm = i.invce_mm 
    and c.instl_dstrct_id='${data.dstrt_id}' and
    i.pblsd_in=1 and i.lmo_agnt_id ='${data.agnt_id}'
    group by i.caf_invce_id;`
    console.log("&&&&&&&&&&&&SecondOne&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getRevenueSharingCustomerWisePageNationsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingCustomerWisePageNationsMdl = function (data,user) {
    var fnm = "getRevenueSharingCustomerWisePageNationsMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    let lmit_cnd = `limit ${pge_nu}, 20`;

    if (data.srch_type == 1) {
        if (data.srch_txt) {
           
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`,
            console.log('------------------------------------------------------------------');
            console.log(lmit_cnd);
            lmit_cnd = ` `
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`,
            lmit_cnd = ` `
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`,
            lmit_cnd = ` `
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cs.cstmr_nm like '%${data.srch_txt}%'`,
            lmit_cnd = ` `
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`,
            lmit_cnd = ` `
        }
    }

    console.log('------------------------------------------------------------------');
    console.log(lmit_cnd);
    console.log(lmit_cnd);

    if(user.usr_ctgry_nm == 'MSO'){
        agntID = `i.mso_agnt_id=${user.usr_ctgry_ky}`
    } else{
        agntID = `i.lmo_agnt_id=${user.usr_ctgry_ky}`
    }

    // var QRY_TO_EXEC = `select 
    // ROW_NUMBER() OVER ( ORDER BY caf_invce_id) as sno,
    // caf_invce_id as 'Invoice Id',cm.cstmr_nm as frst_nm, cm.lst_nm,
    // a.agnt_cd as 'LMO Code',e.cstmr_id,cm.cstmr_nm as 'Customer Name',
    // cm.cntct_mble1_nu as 'Mobile Number',c.caf_nu as 'Caf No',c.caf_id,
    // DATE_FORMAT(c.actvn_dt, "%d, %b %y")as 'Caf Date',
    // e.apsfl_shre_at as 'APSFL Share',e.mso_shre_at as 'MSO Share',
    // e.lmo_shre_at as 'LMO Share',(invce_at+sgst_at+cgst_at+srvc_at) as 'Total',
    // DATE_FORMAT(invce_dt, "%d, %b %y")  as 'Invoice Date',invce_mm as 'Month',invce_yr as yr,
    // (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    // from erp_invce_lst_t as e
    // left join agnt_lst_t as a on a.agnt_id=e.lmo_agnt_id
    // LEFT JOIN cstmr_dtl_t as cm on cm.cstmr_id= e.cstmr_id
    // jOIN caf_dtl_t as c on  c.cstmr_id = e.cstmr_id
    // where e.pblsd_in=1 and ${agntID} and invce_yr=${data.year} and invce_mm=${data.month} 
    // ${where_cnd}
    // GROUP BY e.caf_id
    // ORDER BY e.caf_invce_id ${lmit_cnd}; `;




    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY i.caf_invce_id) as 'Sno',i.lmo_agnt_id as agnt_id
    ,i.caf_invce_id as 'Invoice Id'
     ,a.agnt_cd as 'LMO Code' 
    ,c.caf_nu as 'CAF Number',c.caf_nu as 'Caf No', c.caf_id as caf_id, cs.cstmr_nm as 'frst_nm',cs.lst_nm,c.mbl_nu as 'Mobile Number',i.invce_yr as 'yr',MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as 'Invoice Month',i.invce_mm as Month,
    DATE_FORMAT(i.invce_dt, '%d, %b %y')  as 'Invoice Date',
    concat(DATE_FORMAT(i.invce_frm_dt,'%d, %b'), '-',DATE_FORMAT(i.invce_to_dt,'%d, %b')) as 'Bill Date'
    ,DATE_FORMAT(i.invce_frm_dt,'%d, %b %y') as 'Invoice From Date',DATE_FORMAT(i.invce_to_dt,'%d, %b %y') as 'Invoice To Date'
    ,DATE_FORMAT(c.actvn_dt ,'%d, %b %y') as 'Caf Date',bf.frqncy_nm as 'Frequency Name'
     ,p.pckge_nm AS 'Base Package',CASE (i.pd_in) WHEN 1 THEN 'PAID' ELSE 'NOT PAID' END as 'Status',i.pd_ts as 'Paid Time Stamp'
     ,format(sum(id.lmo_shre_at),2) as 'LMO Share'
      ,format(sum(id.mso_shre_at),2) as 'MSO Share'
     ,format(sum(id.apsfl_shre_at),2) as 'APSFL Share'
    ,format(sum(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at),2) as 'Total'
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'VOIP Charge Amount'
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Add on Charge Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'Box Rent'
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Base Packages Charge Amount'
     ,cs.loc_dstrct_id as dstrt_id
    from erp_invce_lst_t i
    JOIN erp_invce_dtl_t id on i.caf_invce_id =id.caf_invce_id 
    JOIN caf_dtl_t c ON i.caf_id=c.caf_id  
    JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id
    join blng_frqncy_lst_t bf on i.frqncy_id =bf.frqncy_id 
    LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    where 1=1 and i.invce_yr=${data.year} and i.invce_mm=${data.month} 
    and id.invce_yr = i.invce_yr and id.invce_mm = i.invce_mm  and
    i.pblsd_in=1 and ${agntID} ${where_cnd}
    group by i.caf_invce_id ${lmit_cnd};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getRevenueSharingCustomerWiseDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingCustomerWiseDetailsMdl = function (data) {
    var fnm = "getRevenueSharingCustomerWiseDetailsMdl"
    var QRY_TO_EXEC = `select d.caf_invce_id,d.chrge_cde_id,d.pckge_id,d.apsfl_shre_at as 'APSFL Share',d.mso_shre_at as 'MSO Share',
    d.lmo_shre_at as 'LMO Share',(d.chrge_at+d.sgst_at+d.cgst_at+d.srvc_at) as 'Total',DATE_FORMAT(chrge_frm_dt,'%d-%m-%Y') as 'Charge From Date',
        DATE_FORMAT(chrge_to_dt,'%d-%m-%Y') as 'Charge To Date',p.pckge_nm as 'Package Name',c.chrge_cd as 'Charge Code',c.chrge_cde_dscn_tx as 'Charge Code Description',
        (case when d.prtd_in=1 then 'yes' when d.prtd_in=0 then 'No' end) as 'Pro rated',
        (case when i.pd_in=0 then 'Not Paid' WHEN i.pd_in=1 THEN 'Paid' end) as 'Payment Status'
        from erp_invce_dtl_t as d
        LEFT JOIN pckge_lst_t as p on p.pckge_id=d.pckge_id
        left join chrge_cde_lst_t as c on c.chrge_cde_id=d.chrge_cde_id
        left join erp_invce_lst_t as i on i.caf_invce_id = d.caf_invce_id and i.pblsd_in=1
        where d.caf_invce_id=${data.caf_invce_id}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : getTtlRvnShrngCusDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getTtlRvnShrngCusDtlsMdl = function (data, user) {
    var fnm = "getTtlRvnShrngCusDtlsMdl"
    console.log(data)
    var QRY_TO_EXEC = `select d.caf_invce_id,d.chrge_cde_id,d.pckge_id,d.apsfl_shre_at as 'APSFL Share',d.mso_shre_at as 'MSO Share',
    d.lmo_shre_at as 'LMO Share',(d.chrge_at+d.sgst_at+d.cgst_at+d.srvc_at) as 'Total',DATE_FORMAT(chrge_frm_dt,'%d-%m-%Y') as 'Charge From Date',
        DATE_FORMAT(chrge_to_dt,'%d-%m-%Y') as 'Charge To Date',p.pckge_nm as 'Package Name',c.chrge_cd as 'Charge Code',
        (case when d.prtd_in=1 then 'yes' when d.prtd_in=0 then 'No' end) as 'Pro rated',
        (case when i.pd_in=0 then 'Not Paid' WHEN i.pd_in=1 THEN 'Paid' end) as 'Payment Status',
        sum(d.chrge_at+d.sgst_at+d.cgst_at+d.srvc_at) as 'GrandTtl'
        from erp_invce_dtl_t as d
        LEFT JOIN pckge_lst_t as p on p.pckge_id=d.pckge_id
        left join chrge_cde_lst_t as c on c.chrge_cde_id=d.chrge_cde_id
        left join erp_invce_lst_t as i on i.caf_invce_id = d.caf_invce_id and i.pblsd_in=1
        where d.caf_invce_id=${data.caf_invce_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_prvoususpnstnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_prvoususpnstnMdl = function (data, user) {
    var fnm = "get_prvoususpnstnMdl"
    var QRY_TO_EXEC = `select s.spnd_id,s.caf_id,DATE_FORMAT(s.spnd_dt,'%d-%m-%Y') as spnd_dt,s.spnd_ts,s.spnd_usr_id,s.spnd_cmnt_tx,DATE_FORMAT(s.rsme_dt,'%d-%m-%Y') as rsme_dt,s.rsme_ts,s.rsme_usr_id,s.rsme_cmnt_tx,c.caf_nu,
     REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,cm.frst_nm,cm.lst_nm,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,a.agnt_cd,c.instl_dstrct_id,d.dstrt_nm,c.instl_mndl_id,m.mndl_nm,
    c.instl_vlge_id,v.vlge_nm,u.mrcht_usr_nm as 'spnd_by',t.mrcht_usr_nm as 'rsm_by'
    from caf_spnd_dtl_t as s 
    LEFT JOIN caf_dtl_t as c on c.caf_id=s.caf_id
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as u on u.mrcht_usr_id = s.spnd_usr_id
    left join mrcht_usr_lst_t as t on t.mrcht_usr_id = s.rsme_usr_id
    left JOIN vlge_lst_t v ON v.vlge_nu = c.instl_vlge_id and v.mndl_id = c.instl_mndl_id AND v.dstrt_id = c.instl_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    where c.lmo_agnt_id=${data.agntID}
    GROUP BY s.spnd_id`;
    console.log("&&&&&&&&&&&&previous suspenstion&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : validtion_boxMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.validtion_boxMdl = function (id, user) {
    var fnm ="validtion_boxMdl"

    var QRY_TO_EXEC = `select * from caf_stpbx_rel_t where  stpbx_id in ('${id}') and a_in=1`

    console.log("^^^^^^^^^^^^^^QRY_TO_EXEC^^^^^^^^^^^^^^^");
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_olts_sbstn_Mdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olts_sbstn_Mdl = function (agent_id, user) {
    var fnm = "get_olts_sbstn_Mdl"
    var QRY_TO_EXEC = `select s.sbstn_id,s.sbstn_nm,o.olt_id,o.olt_nm,o.olt_srl_nu,o.olt_ip_addr_tx,o.olt_lble_nu,p.crd_id,o.sbstn_id,o.pop_id
    from sbstn_lst_t as s
    left join olt_lst_t as o on o.sbstn_id=s.sbstn_id
    LEFT JOIN olt_prts_lst_t as p on p.olt_id = o.olt_id
    where p.agnt_id=${agent_id}
    GROUP BY s.sbstn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : validationDataForSplits
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.validationDataForSplits = function (data, user) {
    var fnm = "validationDataForSplits"
    var QRY_TO_EXEC = `select splt_id as splitidoriginal,olt_slt_id as slidoriginal,onu_id as onuorginal,splt1_nu as spone,splt2_nu as sptwo,splt3_nu as spthree from olt_prt_splt_lst_t where olt_slt_id=${data.spltsData[0].olt_slt_id} and caf_id is null GROUP BY onu_id ORDER BY splt2_nu,splt3_nu`

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insrtPonChngDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtPonChngDtlMdl = function (data, user) {
    var fnm = "insrtPonChngDtlMdl"
    //var QRY_TO_EXEC = `insert into caf_splt_rel_t(caf_id,splt_id,crnt_in,efcte_dt,a_in,i_ts) values ('${data.caf_id}','${data.splt_id}','1','CURDATE()','1','CURRENT_TIMESTAMP()')`;
    var QRY_TO_EXEC = `INSERT INTO caf_pon_chng_dtl_t (caf_id, pon_chng_dt, 
        pon_chng_ts, pon_chng_usr_id, 
        aghra_cd_old, aghra_cd_nw, aaa_cd_old,aaa_cd_nw, pon_chng_sts, chng_rsn_txt,
        crte_usr_id, a_in, i_ts) VALUES (${data.caf_id},'CURDATE()','CURRENT_TIMESTAMP()',${user.mrcht_usr_id},'${data.aghra_cd}','${data.aghra_cd_nw}','${data.old_lag_id}','${data.new_lag_id}',1,
        ${sqldb.MySQLConPool.escape(data.chng_rsn_txt)},${user.mrcht_usr_id},1,'CURRENT_TIMESTAMP()');`
    // console.log("&&&&&&&444444444444&&&&&&&&&&")
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updtPonChngDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtPonChngDtlMdl = function (id, sts, user) {
    var fnm = "updtPonChngDtlMdl"
    var QRY_TO_EXEC = `UPDATE caf_pon_chng_dtl_t SET pon_chng_sts=${sts} WHERE pon_chng_id=${id};`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getPonchangeCafMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPonchangeCafMdl = function (cafId, user) {
    var fnm = "getPonchangeCafMdl"
    var QRY_TO_EXEC = ` select c.caf_id,c.caf_nu,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.mbl_nu,c.caf_mac_addr_tx,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.lmo_agnt_id,a.agnt_cd,o.olt_nm,o.pop_id,c.olt_id,c.olt_srl_nu,
    c.olt_ip_addr_tx,c.olt_prt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.aghra_cd,c.cstmr_id,d.cstmr_nm,d.cstmr_nm as frst_nm,d.lst_nm,d.loc_addr1_tx,d.loc_addr2_tx,d.loc_lcly_tx,d.loc_ara_tx,d.loc_dstrct_id,
    l.dstrt_id,l.dstrt_nm,d.loc_mndl_id,m.mndl_id,m.mndl_nu,m.mndl_nm,d.loc_vlge_id,v.vlge_id,v.vlge_nm,c.aaa_cd,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.mdlwe_sbscr_id,crnt_pln_id,d.cstmr_nm,i.stpbx_id,i.mac_addr_cd,inv.mdl_dtls_tx, c.caf_type_id,inv.mdle_cd,c.splt_id,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx from
    caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id and i.prdct_id=1
    left join inv_prdct_mdle_lst_t as inv on inv.mdle_id = i.mdle_id
    join cstmr_dtl_t as d on d.cstmr_id = c.cstmr_id
    join olt_lst_t as o on o.olt_id =c.olt_id
    left JOIN vlge_lst_t v ON (v.vlge_nu = a.ofce_vlge_id or v.vlge_id = a.ofce_vlge_id) and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t l ON l.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0 and c.trmnd_rqst_in=0 and  c.enty_sts_id not in (1,7,8,84,85) and c.caf_id = ${cafId}`
    console.log('getPonchangeCafMdl -------------------');

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : getBoxchangeCafMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getBoxchangeCafMdl = function (cafId, user) {
    var fnm = "getBoxchangeCafMdl"
    var QRY_TO_EXEC = ` select c.caf_id,c.caf_nu,c.caf_type_id,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.olt_ip_addr_tx,c.olt_crd_nu,c.olt_prt_nm,c.olt_onu_id,c.aaa_cd,c.aghra_cd,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,d.dstrt_nm,c.instl_mndl_id,m.mndl_nm,c.instl_vlge_id,v.vlge_nm,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,
    c.iptv_stpbx_id,c.onu_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.onu_mac_addr_tx,c.aaa_cd as lagId,c.caf_mac_addr_tx as accessid,
    cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.crnt_pln_id,i.stpbx_id,i.mac_addr_cd as accId, st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx
    from caf_dtl_t as c 
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join inv_stpbx_lst_t as i on i.caf_id = c.caf_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left JOIN vlge_lst_t v ON v.vlge_nu = c.instl_vlge_id and v.mndl_id = c.instl_mndl_id AND v.dstrt_id = c.instl_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.trmnd_in=0 and c.trmnd_rqst_in=0 and  c.enty_sts_id not in (1,7,8,84,85) and c.caf_id = ${cafId}`
    console.log('getBoxchangeCafMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : getLmoMsgMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getLmoMsgMdl = function (user) {
    var fnm = "getLmoMsgMdl"
    var QRY_TO_EXEC = `select agnt_id,agnt_cd,clctn_pymnt_msg_tx,apsfl_pymnt_msg_tx, home_msg_tx, adtnl_srvc_tx, frc_lgt_in, ofce_dstrt_id, ofce_mndl_id,ofce_vlge_id from agnt_lst_t where agnt_id = '${user.usr_ctgry_ky}'`
    // console.log('getLmoMsgMdl -------------------');
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}



/*****************************************************************************
* Function       : getRevenueSharingMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingMdl = function (data, user) {
    var fnm = "getRevenueSharingMdl"
    console.log("daaaaaataaaaaaaaaaaaaaaaaaaaa");
    console.log(data)
    console.log(data.district_id)
    if (data.district_id == 0) {
        districtId = ``
    }
    if (data.district_id > 0) {
        districtId = `and c.instl_dstrct_id = ${data.district_id}`
    }
    if (data.caf_type_id == 0) {
        caftypeId = ``
    }
    if (data.caf_type_id > 0) {
        caftypeId = `and c.caf_type_id =${data.caf_type_id}`
    }
    // if(data.mnth_id == 0){
    //     month=`and i.invce_mm=MONTH(CURDATE()) - 1`
    // }
    // if(data.mnth_id > 0){
    //     month=`and i.invce_mm=${data.mnth_id}`
    // }
    var QRY_TO_EXEC = `select 
    ROW_NUMBER() OVER (ORDER BY l.agnt_id) as s_no,c.instl_dstrct_id as dstrt_id,i.lmo_agnt_id as agnt_id,c.instl_mndl_id as mndl_nu
    ,l.agnt_cd as LMO_CODE,i.invce_mm as invoice_month
    ,m.agnt_cd as MSO_CODE
    ,upper(l.agnt_nm) as NETWORK_NAME
    ,l.ofce_cntct_nm as lmo_contact
    ,l.ofce_mbl_nu as lmo_mble_nu
    ,d.dstrt_nm 
    ,v.vlge_nm 
    ,i.invce_yr
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,count(distinct i.caf_id ) as TOTAL_CAF_COUNT
    ,format(sum(id.lmo_shre_at),2) as lmo_shre_at
    ,format(sum(id.mso_shre_at),2) as mso_shre_at
    ,format(sum(id.apsfl_shre_at),2) as apsfl_shre_at
    ,l.agnt_blnce_at as CURRENT_LMO_BALANCE_AT
    ,count(distinct c.lmo_agnt_id ) as LMO_CT
    ,count(distinct c.mso_agnt_id ) as MSO_CT
    ,format(sum(id.chrge_at)*1.18,2) as revanue_at
    ,format(sum(id.chrge_at)*1.18/count(distinct i.caf_id ),2) as connection_average_revanue 
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as voip_chrge_at
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as add_on_chrge_at
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as box_rent
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as base_package_chrge_at
    ,SUM(case when year(c.actvn_dt)=i.invce_yr AND month(c.actvn_dt)=i.invce_mm THEN 1 ELSE 0 END) as 'NEW_CAFS_INVOICED'
    ,SUM(case when year(c.trmnd_dt )=i.invce_yr AND month(c.trmnd_dt)=i.invce_mm THEN 1 ELSE 0 END) as 'TERMINATED_CAFS_INVOICED'
    ,sum(case(i.invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
    ,sum(i.prtd_in) as PRORATED_BILL_CAFS
    ,count(distinct  case (id.chrge_cde_id ) WHEN 13 THEN i.caf_id 
                            WHEN 14 THEN i.caf_id 
                            WHEN 16 THEN i.caf_id 
                            WHEN 27 THEN i.caf_id 
                            WHEN 28 THEN i.caf_id 
                             ELSE 0 END) as voip_caf_ct
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS_INVOICED'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS_INVOICED'
    from erp_invce_lst_t i join erp_invce_dtl_t id 
    on i.caf_invce_id =id.caf_invce_id   
    join caf_dtl_t c on c.caf_id=i.caf_id ${districtId} ${caftypeId} 
    left join agnt_lst_t l on l.agnt_id=i.lmo_agnt_id 
    left join agnt_lst_t m on m.agnt_id=i.mso_agnt_id
    left join dstrt_lst_t d on d.dstrt_id =l.ofce_dstrt_id 
    left join vlge_lst_t v on l.ofce_vlge_id=v.vlge_id 
    where 1=1 and i.invce_yr=${data.year_id} and i.invce_mm=${data.mnth_id}
    and id.invce_yr =i.invce_yr and id.invce_mm=i.invce_mm
    group by i.lmo_agnt_id;`
    console.log('getRevenueSharingMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}




/*****************************************************************************
* Function       : getRevenueSharingCafCount
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueSharingCafCount = function (data, user) {
    var fnm = "getRevenueSharingCafCount"
    console.log("daaaaaataaaaaaaaaaaaaaaaaaaaa22222222222222222222");
    console.log(data)
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY i.caf_invce_id) as 'Sno',i.lmo_agnt_id as agnt_id
    ,i.caf_invce_id as 'CAF Invoice Id'
     ,a.agnt_cd as 'LMO Code' 
    ,c.caf_nu as 'CAF Number',cs.cstmr_nm as 'Customer Name',c.mbl_nu as 'Customer Mobile No',i.invce_yr as 'Invoice Year'
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as 'Invoice Month',i.invce_mm as invoice_mnth
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as 'Invoice From Date',DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as 'Invoice To Date'
    ,DATE_FORMAT(c.actvn_dt ,'%d-%m-%Y') as 'Activation Date',bf.frqncy_nm as 'Frequency Name'
     ,p.pckge_nm AS 'Base Package',CASE (i.pd_in) WHEN 1 THEN 'PAID' ELSE 'NOT PAID' END as 'Status',i.pd_ts as 'Paid Time Stamp'
     ,format(sum(id.lmo_shre_at),2) as 'LMO Share'
      ,format(sum(id.mso_shre_at),2) as 'MSO Share'
     ,format(sum(id.apsfl_shre_at),2) as 'APSFL Share'
    ,format(sum(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at),2) as 'Invoice Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'VOIP Charge Amount'
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Add on Charge Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'Box Rent'
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Base Packages Charge Amount'
     ,cs.loc_dstrct_id as dstrt_id
    from erp_invce_lst_t i
    JOIN erp_invce_dtl_t id on i.caf_invce_id =id.caf_invce_id 
    JOIN caf_dtl_t c ON i.caf_id=c.caf_id  
    JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id
    join blng_frqncy_lst_t bf on i.frqncy_id =bf.frqncy_id 
    LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    where 1=1 and i.invce_yr='${data.invce_yr}' and i.invce_mm='${data.invoice_month}' 
    and id.invce_yr = i.invce_yr and id.invce_mm = i.invce_mm 
    and c.instl_dstrct_id='${data.dstrt_id}' and i.lmo_agnt_id ='${data.agnt_id}'
    group by i.caf_invce_id;`
    console.log('getRevenueSharingMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function       : getLmoRevenueSharing
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getLmoRevenueSharing = function (data, user) {
    var fnm = "getLmoRevenueSharing"
    console.log("daaaaaataaaaaaaaaaaaaaaaaaaaa333333333");
    console.log(data)
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as 'Sno',p.pckge_nm as 'Package name',pt.pckage_type_nm as 'Package Type',cc.chrge_cde_dscn_tx as 'Charge Description Text',
    cc.chrge_cd as 'Charge Code'
    ,format(id.chrge_at,2) as 'Charge Amount',format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as 'Tax Amount'
    ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as 'Total Amount'
    from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
    LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    where 1=1 and id.caf_invce_id =${data} order by p.pckge_id desc ,id.invce_dtl_id `
    console.log('getLmoRevenueSharing -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : getAgntPonCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntPonCountsMdl = function (user) {
    var fnm = "getAgntPonCountsMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY o.olt_id,opl.olt_prt_nm) as s_no
    ,count(DISTINCT c.caf_id) as caf_cnt,(128-count(DISTINCT c.caf_id)) as caf_rmng,
    (COUNT(DISTINCT c.caf_id))+(128-COUNT(DISTINCT c.caf_id))as ttl,
    sum(case when c.actvn_dt > (DATE(CURDATE() -INTERVAL 7 DAY)) then 1 else 0 end) as nw,
    d.dstrt_id,d.dstrt_nm,o.olt_id,o.olt_nm,c.instl_mndl_id as mndl_nu
    ,o.olt_ip_addr_tx,opl.olt_prt_nm,a.agnt_id,a.agnt_cd, a.ofce_cntct_nm, a.ofce_mbl_nu
    ,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y %h:%i') as created_on
    FROM caf_dtl_t c
    LEFT JOIN olt_lst_t o ON o.olt_id = c.olt_id
    LEFT JOIN olt_prts_lst_t as opl ON opl.olt_id = o.olt_id AND c.olt_prt_nm = opl.olt_prt_nm
    LEFT JOIN agnt_lst_t as a ON a.agnt_id = opl.agnt_id
    JOIN dstrt_lst_t d ON d.dstrt_id = c.instl_dstrct_id
    WHERE 1=1 AND a.agnt_id=${user.usr_ctgry_ky} and c.trmnd_in=0
    group BY o.olt_id,opl.olt_prt_nm
    ORDER BY o.olt_id,opl.olt_prt_nm;`
    console.log('getAgntPonCountsMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : getAgntPonAssgnedCafMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntPonAssgnedCafMdl = function (data, user) {
    var fnm = "getAgntPonAssgnedCafMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(data)
    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }
    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cs.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
	if(user.prpd_flag == 1){
		var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY c.caf_id) as s_no,case when cs.frst_nm is null then 0 else cs.frst_nm end as frst_nm,
    case when cs.lst_nm is null then 0 else cs.lst_nm end as lst_nm,c.caf_id,c.caf_nu,case when c.mbl_nu is null then 0 else c.mbl_nu end as mbl_nu,case when c.onu_srl_nu is null
    then 0 else c.onu_srl_nu end as onu_srl_nu,
    case when c.olt_id is null then 0 else c.olt_id end as olt_id,
     case when  c.olt_prt_nm is null then 0 else c.olt_prt_nm end as olt_prt_nm ,case when c.olt_prt_splt_tx is null then 0 else c.olt_prt_splt_tx end as olt_prt_splt_tx,
        case when c.iptv_srl_nu is null then 0 else c.iptv_srl_nu end as iptv_srl_nu,case when c.caf_type_id is null then 0 else c.caf_type_id end as caf_type_id,
        case when c.instl_dstrct_id is null then 0 else c.instl_dstrct_id end as instl_dstrct_id,case when c.mbl_nu is null then 0 else c.mbl_nu end as mbl_nu,
        case when o.olt_id is null then 0 else o.olt_id end as olt_id,case when o.olt_nm is null then 0 else o.olt_nm end as olt_nm,
        case when o.olt_ip_addr_tx is null then 0 else o.olt_ip_addr_tx end as olt_ip_addr_tx,
        case when opl.olt_prt_nm is null then 0 else opl.olt_prt_nm end as olt_prt_nm, case when a.agnt_id is null then 0 else a.agnt_id end as agnt_id,
        case when a.agnt_cd is null then 0 else a.agnt_cd end as agnt_cd,case when a.ofce_mbl_nu is null then 0 else a.ofce_mbl_nu end as ofce_mbl_nu ,
        case when  a.ofce_cntct_nm is null then 0 else a.ofce_cntct_nm end as ofce_cntct_nm,case when d.dstrt_nm is null then 0 else d.dstrt_nm end as dstrt_nm,
        case when a.agnt_nm is null then 0 else a.agnt_nm end as agnt_nm,
        case when REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') is null then 0 else REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') end as adhr_nu,
        case when c.caf_type_id is null then 0 else c.caf_type_id end as caf_type_id,case when DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') is null then 0 else DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') end as actvnDt,
        case when DATE_FORMAT(o.i_ts,'%d-%m-%Y %h:%i') is null then 0 else DATE_FORMAT(o.i_ts,'%d-%m-%Y %h:%i') end   as created_on , 
        case when e.sts_nm is null then 0 else e.sts_nm end as sts_nm , case when e.sts_clr_cd_tx is null then 0 else e.sts_clr_cd_tx  end as sts_clr_cd_tx,
        case when b.frqncy_nm is null then 0 else b.frqncy_nm end as frqncy_nm,case when c.mdlwe_sbscr_id is null then 0 else c.mdlwe_sbscr_id end as mdlwe_sbscr_id,
        case when vps.phne_nu is null then 0 else vps.phne_nu end as phne_nu
        FROM caf_dtl_t c
        JOIN cstmr_dtl_t as cs ON cs.cstmr_id = c.cstmr_id
        JOIN olt_lst_t as o ON o.olt_id = c.olt_id
        JOIN olt_prts_lst_t as opl ON opl.olt_id = o.olt_id AND c.olt_prt_nm = opl.olt_prt_nm
        JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
        JOIN agnt_lst_t as a ON a.agnt_id = opl.agnt_id
        JOIN blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        JOIN dstrt_lst_t as d ON d.dstrt_id = c.instl_dstrct_id
        left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    where c.olt_id=${data.olt_id} AND c.olt_prt_nm=${data.olt_prt_nm} and c.trmnd_in=0
    ${where_cnd}
    GROUP BY c.caf_id
    ORDER BY c.caf_id, c.i_ts limit ${pge_nu}, 20;`
	} else {
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY c.caf_id) as s_no,cs.frst_nm as frst_nm,cs.lst_nm as lst_nm,c.caf_id,c.caf_nu,c.mbl_nu,c.onu_srl_nu,c.
    olt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.iptv_srl_nu,c.caf_type_id,c.instl_dstrct_id,c.mbl_nu,
        o.olt_id,o.olt_nm,o.olt_ip_addr_tx,opl.olt_prt_nm,a.agnt_id,a.agnt_cd,a.ofce_mbl_nu, a.ofce_cntct_nm,d.dstrt_nm,a.agnt_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.caf_type_id,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt,
        DATE_FORMAT(o.i_ts,'%d-%m-%Y %h:%i') as created_on , e.sts_nm, e.sts_clr_cd_tx,b.frqncy_nm,c.mdlwe_sbscr_id,vps.phne_nu
        FROM caf_dtl_t c
        JOIN cstmr_dtl_t as cs ON cs.cstmr_id = c.cstmr_id
        JOIN olt_lst_t as o ON o.olt_id = c.olt_id
        JOIN olt_prts_lst_t as opl ON opl.olt_id = o.olt_id AND c.olt_prt_nm = opl.olt_prt_nm
        JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
        JOIN agnt_lst_t as a ON a.agnt_id = opl.agnt_id
        JOIN blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        JOIN dstrt_lst_t as d ON d.dstrt_id = c.instl_dstrct_id
        left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    where c.olt_id=${data.olt_id} AND c.olt_prt_nm=${data.olt_prt_nm} and c.trmnd_in=0
    ${where_cnd}
    GROUP BY c.caf_id
    ORDER BY c.caf_id, c.i_ts limit ${pge_nu}, 20; `;
	}
    console.log('getAgntPonAssgnedCafMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function       : getMsoRevenueSharingMonthWiseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMsoRevenueSharingMonthWiseMdl = function (year, agnt_id, user) {
    var fnm = "getMsoRevenueSharingMonthWiseMdl"
    console.log("yearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    var QRY_TO_EXEC = `select a.agnt_cd,count(DISTINCT e.caf_id) as cafcount,sum(e.apsfl_shre_at) as apsflshare,sum(e.mso_shre_at) as msoshare,sum(e.lmo_shre_at) as lmoshare,sum(invce_at+sgst_at+cgst_at+srvc_at) as total,invce_mm as monthid,invce_yr as year,
    (case when pd_in=0 then count(pd_in) else 0 end)  as 'NotPaid',
    (case when pd_in=1 then count(pd_in) else 0 end)  as 'Paid',
    (case when pd_in=0 then 'Not Paid' else 'Paid' end)  as pd_sts,
    e.voip_chrge_at,e.add_on_chrge_at,
    (CASE WHEN prtd_in =1 then count(prtd_in) else 0 end) as pro_rted_caf_cnt
    from erp_invce_lst_t as e
    left join agnt_lst_t as a on a.agnt_id=e.mso_agnt_id
    where e.pblsd_in=1 and e.mso_agnt_id=${agnt_id} and invce_yr= ${year}
    GROUP BY invce_mm order by invce_mm`;
    console.log("************firstttttttttttttttttttttt*************************")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getIsueCtrgryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getIsueCtrgryMdl = function (user) {
    var fnm = "getIsueCtrgryMdl"
    var QRY_TO_EXEC = `select * from olt_iss_ctgry_lst_t`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getOltLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltLstMdl = function (user) {
    var fnm = "getOltLstMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY o.olt_id) as sno,o.olt_id,o.olt_nm,o.oprtnl_ste_id,o.olt_sts_id,o.olt_type_nm,o.olt_ip_addr_tx,o.olt_srl_nu,o.sbstn_id,o.sbstn_nm,o.dstrt_id,o.mndl_id,
    p.ste_nm,DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,s.sts_nm,DATE_FORMAT(o.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,
    es.sts_nm as entystatus,l.dstrt_nm,m.mndl_nm
    FROM olt_ltrck_dtl_t as o
    LEFT JOIN agro_olt_oprtnl_ste_lst_t as p on p.agro_oprtnl_ste_id=o.oprtnl_ste_id
    LEFT JOIN agro_olt_sts_lst_t as s on s.agro_sts_id=o.olt_sts_id
    LEFT JOIN enty_sts_lst_t as es on es.enty_sts_id = o.olt_sts_id
    left JOIN mndl_lst_t m ON m.mndl_nu = o.mndl_id AND o.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t l ON l.dstrt_id = o.dstrt_id
    ORDER BY o.olt_id limit 100`;

    console.log("&&&&&&&&&&&&oltttttttttttttttt&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : getOltLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOltLstMdl = function (user) {
    var fnm = "getOltLstMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY o.olt_id) as sno,o.olt_id,o.olt_nm,o.oprtnl_ste_id,o.olt_sts_id,o.olt_type_nm,o.olt_ip_addr_tx,o.olt_srl_nu,o.sbstn_id,o.sbstn_nm,o.dstrt_id,o.mndl_id,
    p.ste_nm,DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,s.sts_nm,DATE_FORMAT(o.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,
    es.sts_nm as entystatus,l.dstrt_nm,m.mndl_nm
    FROM olt_ltrck_dtl_t as o
    LEFT JOIN agro_olt_oprtnl_ste_lst_t as p on p.agro_oprtnl_ste_id=o.oprtnl_ste_id
    LEFT JOIN agro_olt_sts_lst_t as s on s.agro_sts_id=o.olt_sts_id
    LEFT JOIN enty_sts_lst_t as es on es.enty_sts_id = o.olt_sts_id
    left JOIN mndl_lst_t m ON m.mndl_nu = o.mndl_id AND o.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t l ON l.dstrt_id = o.dstrt_id
    ORDER BY o.olt_id limit 100`;

    console.log("&&&&&&&&&&&&oltttttttttttttttt&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insrtStateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtStateMdl = function (data,jsondata,user) {
    var fnm = "insrtStateMdl"
    var QRY_TO_EXEC = `insert into olt_oprnl_ste_hst_t(olt_id,oprtnl_ste_id,oprtnl_ste_strt_ts,oprtnl_ste_strt_dt,a_in,i_ts)values
                      (${data.olt_id},${jsondata.operationalState},CURRENT_TIMESTAMP(),current_date(),1,CURRENT_TIMESTAMP())`;

    console.log("&&&&&&&&&&&&stateeeeeeeeeeee&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insrtStatusMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtStatusMdl = function (data,jsondata,user) {
    var fnm = "insrtStatusMdl"
    var QRY_TO_EXEC = `insert into olt_sts_hst_t(olt_id,olt_sts_id,olt_sts_strt_ts,olt_sts_strt_dt,a_in,i_ts)values
                      (${data.olt_id},${jsondata.admin},CURRENT_TIMESTAMP(),current_date(),1,CURRENT_TIMESTAMP())`;

    console.log("&&&&&&&&&&&&statussssssssssss&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updtOltLtrctMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtOltLtrctMdl = function (data,jsondata,user) {
    var fnm = "updtOltLtrctMdl"
    if (data.oprtnl_ste_id != jsondata.operationalState && data.olt_sts_id == jsondata.admin) {
        ste=`,oprtnl_ste_id=${jsondata.operationalState},oprtnl_ste_chnge_ts=CURRENT_TIMESTAMP()`;
        sts=``;
    }
    else if (data.oprtnl_ste_id == jsondata.operationalState && data.olt_sts_id != jsondata.admin) {
        ste=``;
        sts=`,olt_sts_id=${jsondata.admin},oprnl_sts_chnge_ts=CURRENT_TIMESTAMP()`;
    }
    else if (data.oprtnl_ste_id != jsondata.operationalState && data.olt_sts_id != jsondata.admin) {
        ste=`,oprtnl_ste_id=${jsondata.operationalState},oprtnl_ste_chnge_ts=CURRENT_TIMESTAMP()`;
        sts=`,olt_sts_id=${jsondata.admin},oprnl_sts_chnge_ts=CURRENT_TIMESTAMP()`;
    }
    else if (data.oprtnl_ste_id == jsondata.operationalState && data.olt_sts_id == jsondata.admin) {
        ste=``;
        sts=``;
    }
    var QRY_TO_EXEC = `update olt_ltrck_dtl_t set sftwe_vrsn_tx ='${jsondata.swVersion}',hrdwe_vrsn_tx='${jsondata.hwVersion}',site_nm='${jsondata.name}',
                       type_id='${jsondata.type}',olt_srl_nu='${jsondata.serialNumber}',mngmt_dmn_nm='${jsondata.managedDomain}',eqpmt_id='${jsondata.equipmentModelId}',
                       u_ts=CURRENT_TIMESTAMP() ,lst_rfrh_ts=CURRENT_TIMESTAMP()
                       ${ste} ${sts} where olt_id=${data.olt_id}`;

    console.log("&&&&&&&&&&&&ltrackkkkkk&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : scltOltLtrctMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.scltOltLtrctMdl = function (data,jsondata,user) {
    var fnm = "scltOltLtrctMdl"
    var QRY_TO_EXEC = `select a.olt_id,a.olt_nm,a.oprtnl_ste_id,(case when oprtnl_ste_id =1 then 0 else respond_delay end) as hr,DATE_FORMAT(oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,a.ste_nm,a.oprtnl_ste_chnge_ts,a.olt_sts_id,a.sts_nm,a.oprnl_sts_chnge_ts,a.lst_rfrh_ts,a.type_id,a.instl_dt,a.sftwe_vrsn_tx,
    a.hrdwe_vrsn_tx,a.site_nm,a.mngmt_dmn_nm,a.eqpmt_id,a.olt_type_id,a.olt_type_nm,a.olt_ip_addr_tx,a.olt_srl_nu,a.pop_id,a.olt_lble_nu,a.olt_acs_nde_id,a.sbstn_id,
    a.sbstn_nm,a.sbstn_unq_cd,a.dstrt_id,a.dstrt_nm,a.mndl_id from
(select od.olt_id,od.olt_nm,TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay,od.oprtnl_ste_id,op.ste_nm,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
    od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
    od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id
    from olt_ltrck_dtl_t od
    join caf_dtl_t c on c.olt_id = od.olt_id
    join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
    join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
    join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
    where od.olt_id=${data.olt_id}
    GROUP BY c.olt_id
    ORDER BY od.dstrt_id ASC) as a`

    console.log("&&&&&&&&&&&&oltttttttttttttttt&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : insrtStateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtStateMdl = function (data,jsondata,user) {
    var fnm = "insrtStateMdl"
    var QRY_TO_EXEC = `insert into olt_oprnl_ste_hst_t(olt_id,oprtnl_ste_id,oprtnl_ste_strt_ts,oprtnl_ste_strt_dt,a_in,i_ts)values
                      (${data.olt_id},${jsondata.operationalState},CURRENT_TIMESTAMP(),current_date(),1,CURRENT_TIMESTAMP())`;

    console.log("&&&&&&&&&&&&stateeeeeeeeeeee&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insrtStatusMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtStatusMdl = function (data,jsondata,user) {
    var fnm = "insrtStatusMdl"
    var QRY_TO_EXEC = `insert into olt_sts_hst_t(olt_id,olt_sts_id,olt_sts_strt_ts,olt_sts_strt_dt,a_in,i_ts)values
                      (${data.olt_id},${jsondata.admin},CURRENT_TIMESTAMP(),current_date(),1,CURRENT_TIMESTAMP())`;

    console.log("&&&&&&&&&&&&statussssssssssss&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updtOltLtrctMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtOltLtrctMdl = function (data,jsondata,user) {
    var fnm = "updtOltLtrctMdl"
    if (data.oprtnl_ste_id != jsondata.operationalState && data.olt_sts_id == jsondata.admin) {
        ste=`,oprtnl_ste_id=${jsondata.operationalState},oprtnl_ste_chnge_ts=CURRENT_TIMESTAMP()`;
        sts=``;
    }
    else if (data.oprtnl_ste_id == jsondata.operationalState && data.olt_sts_id != jsondata.admin) {
        ste=``;
        sts=`,olt_sts_id=${jsondata.admin},oprnl_sts_chnge_ts=CURRENT_TIMESTAMP()`;
    }
    else if (data.oprtnl_ste_id != jsondata.operationalState && data.olt_sts_id != jsondata.admin) {
        ste=`,oprtnl_ste_id=${jsondata.operationalState},oprtnl_ste_chnge_ts=CURRENT_TIMESTAMP()`;
        sts=`,olt_sts_id=${jsondata.admin},oprnl_sts_chnge_ts=CURRENT_TIMESTAMP()`;
    }
    else if (data.oprtnl_ste_id == jsondata.operationalState && data.olt_sts_id == jsondata.admin) {
        ste=``;
        sts=``;
    }
    var QRY_TO_EXEC = `update olt_ltrck_dtl_t set sftwe_vrsn_tx ='${jsondata.swVersion}',hrdwe_vrsn_tx='${jsondata.hwVersion}',site_nm='${jsondata.name}',
                       type_id='${jsondata.type}',olt_srl_nu='${jsondata.serialNumber}',mngmt_dmn_nm='${jsondata.managedDomain}',eqpmt_id='${jsondata.equipmentModelId}',
                       u_ts=CURRENT_TIMESTAMP() ,lst_rfrh_ts=CURRENT_TIMESTAMP()
                       ${ste} ${sts} where olt_id=${data.olt_id}`;

    console.log("&&&&&&&&&&&&ltrackkkkkk&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : scltOltLtrctMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.scltOltLtrctMdl = function (data,jsondata,user) {
    var fnm = "scltOltLtrctMdl"
    var QRY_TO_EXEC = `select a.olt_id,a.olt_nm,a.oprtnl_ste_id,(case when oprtnl_ste_id =1 then 0 else respond_delay end) as hr,DATE_FORMAT(oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,a.ste_nm,a.oprtnl_ste_chnge_ts,a.olt_sts_id,a.sts_nm,a.oprnl_sts_chnge_ts,a.lst_rfrh_ts,a.type_id,a.instl_dt,a.sftwe_vrsn_tx,
    a.hrdwe_vrsn_tx,a.site_nm,a.mngmt_dmn_nm,a.eqpmt_id,a.olt_type_id,a.olt_type_nm,a.olt_ip_addr_tx,a.olt_srl_nu,a.pop_id,a.olt_lble_nu,a.olt_acs_nde_id,a.sbstn_id,
    a.sbstn_nm,a.sbstn_unq_cd,a.dstrt_id,a.dstrt_nm,a.mndl_id from
(select od.olt_id,od.olt_nm,TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay,od.oprtnl_ste_id,op.ste_nm,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
    od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
    od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id
    from olt_ltrck_dtl_t od
    join caf_dtl_t c on c.olt_id = od.olt_id
    join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
    join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
    join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
    where od.olt_id=${data.olt_id}
    GROUP BY c.olt_id
    ORDER BY od.dstrt_id ASC) as a`

    console.log("&&&&&&&&&&&&oltttttttttttttttt&&&&&&&&&&&")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};





/*****************************************************************************
* Function       : getOutgeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOutgeMdl = function (data,user) {
    var fnm = "getOutgeMdl"
    var QRY_TO_EXEC = `select * from olt_outage_dtl_t where olt_id=${data.olt_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insrtOutgeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtOutgeMdl = function (data,user) {
    var fnm = "insrtOutgeMdl"
    var QRY_TO_EXEC = `insert into olt_outage_dtl_t(olt_id,olt_iss_ctgry_id,olt_iss_sub_ctgry_id,oprtnl_ste_id,oprtnl_ste_strt_ts,oprtnl_ste_strt_dt,olt_sts_id,olt_sts_strt_ts,olt_sts_strt_dt,cmnt_tx,crte_usr_id,a_in,i_ts)values
                        ('${data.olt_id}','${data.olt_iss_ctgry_id}','${data.olt_iss_sub_ctgry_id}','${data.oprtnl_ste_id}','${data.oprtnl_ste_strt_ts}','${data.oprtnl_ste_strt_dt}','${data.olt_sts_id}','${data.olt_sts_strt_ts}','${data.olt_sts_strt_dt}','${data.cmnt_tx}',
                        '${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP())`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtOutgeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtOutgeMdl = function (data,user) {
    var fnm = "updtOutgeMdl"
    var QRY_TO_EXEC = `update olt_outage_dtl_t set olt_iss_ctgry_id=${data.olt_iss_ctgry_id},olt_iss_sub_ctgry_id=${data.olt_iss_sub_ctgry_id} ,cmnt_tx='${data.cmnt_tx}',updte_usr_id='${user.mrcht_usr_id}',u_ts=CURRENT_TIMESTAMP() where olt_id=${data.olt_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : getoutageOltMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoutageOltMdl = function (oltid, user) {
    var fnm = "getoutageOltMdl"
    var QRY_TO_EXEC = `select * from olt_outage_dtl_t where olt_id=${oltid}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getoutageCmntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoutageCmntsMdl = function (oltid, user) {
    var fnm = "getoutageCmntsMdl"
    var QRY_TO_EXEC = `select olt_outage_rel_id,olt_outage_id,olt_id,cmnt_tx,DATE_FORMAT(i_ts,'%d-%m-%Y %H:%i:%S') as i_ts from olt_outage_rel_t where olt_id=${oltid} order by i_ts asc;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getPhnbrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPhnbrMdl = function (oltid, user) {
    var fnm = "getPhnbrMdl"
    var QRY_TO_EXEC = `select mble1_ph from 
    olt_ltrck_dtl_t as od
    join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
    where od.olt_id=${oltid} and ct.cntct_ctgry_id=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getisueSubCtgryOltMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getisueSubCtgryOltMdl = function (catid, user) {
    var fnm = "getisueSubCtgryOltMdl"
    var QRY_TO_EXEC = `select * from olt_iss_sub_ctgry_lst_t where olt_iss_ctgry_id =${catid} ORDER BY olt_iss_sub_ctgry_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insrFrMultipletOutgeReltnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrFrMultipletOutgeReltnMdl = function (data,user,insrtid,callback) {
    var fnm = "insrFrMultipletOutgeReltnMdl"
    var QRY_TO_EXEC = `INSERT INTO olt_outage_rel_t (olt_outage_id,olt_id,cmnt_tx,crte_usr_id,a_in,i_ts) VALUES(${insrtid},${data.olt_id},'${data.relCmnts}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`
       console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : insrtOutgeReltnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtOutgeReltnMdl = function (data,user,insrtid,callback) {
    var fnm = "insrtOutgeReltnMdl"
    let dlmtr = ' ,';
    let sbr_qry = ' '
    var QRY_TO_EXEC = `INSERT INTO olt_outage_rel_t (olt_outage_id,olt_id,cmnt_tx,crte_usr_id,a_in,i_ts) VALUES`;
    for (i = 0; i < data.relCmnts.length; i++) {
        if (i + 1 == data.relCmnts.length) {
            dlmtr = ' ;'
        }
        sbr_qry += ` (${insrtid},${data.olt_id},'${data.relCmnts[i].cmntext}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()) ${dlmtr}`;
    }
    QRY_TO_EXEC += sbr_qry;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getNmbrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getNmbrMdl = function (data,user) {
    var fnm = "getNmbrMdl"
    var QRY_TO_EXEC = `select od.olt_id,od.olt_nm,ct.cntct_nm,GROUP_CONCAT(DISTINCT ct.mble1_ph) as mble1_ph,od.olt_ip_addr_tx,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%S') as oprtnl_ste_chnge_ts,
    GROUP_CONCAT(DISTINCT ag.ofce_mbl_nu) as ofce_mbl_nu
    from olt_ltrck_dtl_t as od
     join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
     left join olt_prts_lst_t p on p.olt_id=od.olt_id
     left join agnt_lst_t ag on ag.agnt_id=p.agnt_id
    where ct.cntct_ctgry_id=1 and od.olt_id=${data.olt_id}
    GROUP BY od.olt_id
    ORDER BY od.olt_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getoltidsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoltidsMdl = function (ip, user) {
    var fnm = "getoltidsMdl"
    var QRY_TO_EXEC = `select o.olt_id ,o.olt_nm ,o.olt_ip_addr_tx ,p.olt_prt_id ,p.crd_id from olt_lst_t as o
    join olt_prts_lst_t as p on o.olt_id= p.olt_id
    where olt_ip_addr_tx='${ip}'
    GROUP by p.olt_id 
    ORDER by olt_lble_nu `
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function       : getprtsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getprtsMdl = function (oltid,pon, user) {
    fnm = "getprtsMdl"
    var QRY_TO_EXEC = `select * from olt_prts_lst_t where olt_id=${oltid} and olt_prt_nm =${pon} ORDER by olt_prt_nm ;`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getspltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getspltsMdl = function (prtid,onu, user) {
    var fnm = "getspltsMdl"
    var QRY_TO_EXEC = `select * from olt_prt_splt_lst_t where olt_slt_id in (select olt_slt_id from olt_prt_slts_lst_t where olt_prt_id=${prtid}) and onu_id =${onu} order by onu_id`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_olt_mntrngMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olt_mntrngMdl = function (user) {
    var fnm = "get_olt_mntrngMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY o.olt_id) as sno,o.olt_id,o.olt_nm,type_id,DATE_FORMAT(o.instl_dt,'%d-%m-%Y %h:%i') as instl_dt,o.sftwe_vrsn_tx,o.hrdwe_vrsn_tx,
                            DATE_FORMAT(o.lst_rfrh_ts,'%d-%m-%Y %h:%i') as last_refresh_date,o.olt_sts_id,ags.sts_nm,
                            DATE_FORMAT(o.oprnl_sts_chnge_ts,'%d-%m-%Y %h:%i') as oprt_sts_chnge_ts,
                            o.oprtnl_ste_id,ago.ste_nm,DATE_FORMAT(o.oprtnl_ste_chnge_ts,'%d-%m-%Y %h:%i') as oprtnl_ste_chnge_ts,
                            site_nm,mngmt_dmn_nm,eqpmt_id,olt_type_id,olt_type_nm,o.olt_ip_addr_tx,o.olt_srl_nu,o.pop_id,o.olt_lble_nu,o.olt_acs_nde_id,
                            o.sbstn_id,s.sbstn_nm,o.sbstn_unq_cd,o.a_in,
                            ol.sbstn_type_id,st.sbstn_type_nm,s.dstrct_id,d.dstrt_nm,s.mndl_id,m.mndl_nm,
                            CASE WHEN o.a_in = 1 THEN 'Active' else 'Inactive' END as olt_sts  
                            FROM olt_ltrck_dtl_t o
                            JOIN sbstn_lst_t s ON s.sbstn_id = o.sbstn_id
                            JOIN olt_lst_t ol on ol.olt_id = o.olt_id
                            left JOIN agro_olt_sts_lst_t as ags on ags.agro_sts_id = o.olt_sts_id
                            left JOIN agro_olt_oprtnl_ste_lst_t as ago on ago.agro_oprtnl_ste_id = o.oprtnl_ste_id
                            JOIN sbstn_type_lst_t st on st.sbstn_type_id =ol.sbstn_type_id
                            JOIN dstrt_lst_t d on d.dstrt_id = s.dstrct_id
                            JOIN mndl_lst_t m on m.mndl_id = s.mndl_id
                            order by o.olt_id;`;
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
            '${data.olt_srl_no}',0,'${data.lbl_nm}','${data.olt_acces_cd}',${data.sbstn_id},
            ${data.olt_typ},'${user.mrcht_usr_id}',1,current_timestamp(),1,0)`;
          console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateoltMntrngdtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateoltMntrngdtlsMdl = function (data, olt_id, user) {
    var fnm = "updateoltMntrngdtlsMdl"
    var QRY_TO_EXEC = `UPDATE olt_ltrck_dtl_t SET  olt_nm='${data.olt_nm}',dstrt_id='${data.dstrt_id}', mndl_id='${data.mndl_id}', olt_ip_addr_tx='${data.olt_ip_adrs}',olt_srl_nu='${data.olt_srl_no}',olt_lble_nu='${data.lbl_nm}',olt_acs_nde_id='${data.olt_acces_cd}',sbstn_id=${data.sbstn_id},olt_type_id=${data.olt_typ},updte_usr_id='${user.mrcht_usr_id}',u_ts=current_timestamp() WHERE olt_id=${olt_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deleteoltMntrngDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteoltMntrngDtlMdl = function (id, user) {
    var fnm = "deleteoltMntrngDtlMdl"
    var QRY_TO_EXEC = `UPDATE olt_ltrck_dtl_t SET a_in=0, d_ts = current_timestamp() where olt_id = ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deleteoltMntrngDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteoltMntrngDtlMdl = function (id, user) {
    var fnm = "deleteoltMntrngDtlMdl"
    var QRY_TO_EXEC = `UPDATE olt_ltrck_dtl_t SET a_in=1, d_ts = current_timestamp() where olt_id = ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : selctoltdataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selctoltdataMdl = function (user) {
    var fnm = "selctoltdataMdl"
    var QRY_TO_EXEC = `	SELECT ol.olt_id as olt_ltrck_id,o.olt_id,o.olt_nm,s.dstrct_id as dstrt_id,s.mndl_id,o.olt_ip_addr_tx as olt_ip_adrs,o.olt_vndr_id as vndr_id,
                        o.olt_srl_nu as olt_srl_no,o.olt_lble_nu as lbl_nm,o.olt_acs_nde_id as olt_acces_cd,o.sbstn_id,o.sbstn_type_id as olt_typ,o.a_in
                        FROM olt_lst_t as o
                        JOIN sbstn_lst_t s ON s.sbstn_id = o.sbstn_id
                        left join olt_ltrck_dtl_t as ol on ol.olt_id = o.olt_id
                        where ol.olt_id is null
                        ORDER BY ol.olt_id is null desc;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_agnt_dstrtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_agnt_dstrtMdl = function (user) {
    var fnm = "get_agnt_dstrtMdl"
    console.log(user)
    var QRY_TO_EXEC = `select * from agnt_lst_t where agnt_id =${user.usr_ctgry_ky}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getontdtlsfrmapiextrnl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getontdtlsfrmapiextrnl = function (data,user) {
    var fnm = "getontdtlsfrmapiextrnl"
    var QRY_TO_EXEC = `select od.olt_id,od.olt_nm,ct.cntct_nm,GROUP_CONCAT(DISTINCT ct.mble1_ph) as mble1_ph,od.olt_ip_addr_tx,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y %H:%i:%S') as oprtnl_ste_chnge_ts,
    GROUP_CONCAT(DISTINCT ag.ofce_mbl_nu) as ofce_mbl_nu
    from olt_ltrck_dtl_t as od
     join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
     left join olt_prts_lst_t p on p.olt_id=od.olt_id
     left join agnt_lst_t ag on ag.agnt_id=p.agnt_id
    where ct.cntct_ctgry_id=1 and od.olt_ip_addr_tx='${data.olt_ip_addr_tx}'
    GROUP BY od.olt_id
    ORDER BY od.olt_id limit 1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_advncersmeactivecafsSrvrPgntnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_advncersmeactivecafsSrvrPgntnMdl = function (data, user) {
    var fnm = "get_advncersmeactivecafsSrvrPgntnMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    if (data.caf_nu == 0) {
        caf = ` `
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu=${data.caf_nu} `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu=${data.adhar_nu} `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu=${data.mbl_nu} `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }


    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
        }
    }
	
        var QRY_TO_EXEC = `select DISTINCT(c.caf_id),c.caf_id,date_format(c1.cycle_end_dt,'%d-%m-%Y') as cycle_end_dt,c.caf_nu,c.cstmr_id,
        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
        c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,
        c.instl_vlge_id,c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,max(date_format(s.spnd_dt,'%d-%m-%Y')) as spnd_dt,
        (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
        DATEDIFF(CURRENT_DATE() , max(s.spnd_dt)) as spnd_count,c.crnt_pln_id,c.caf_mac_addr_tx,c.aaa_cd,
        cm.cstmr_nm as frst_nm,cm.lst_nm,cm.cstmr_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,
        c.olt_crd_nu,st.sts_nm,date_format(c1.cycle_strt_dt,'%d-%m-%Y') as Renewed_On,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') as actvnDt
        from caf_dtl_t as c
        left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id 
        left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        left join caf_spnd_dtl_t as s on c.caf_id = s.caf_id
        left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id  
         join caf_pckge_prchse_dtl_t as c1 on c.caf_id=c1.caf_id and c1.pckge_id=c.crnt_pln_id and c1.a_in=1 
        where c.trmnd_in=0 and c.trmnd_rqst_in=0 and c.enty_sts_id =6 and c.caf_type_id=1
         and cycle_end_dt between CURDATE() and CURDATE()+INTERVAL 10 DAY  
       ${agntid} ${caf} ${adhar} ${mobile}  ${where_cnd}
        GROUP BY c.caf_id order by c.caf_id desc limit ${pge_nu}, 20`

    console.log("&&&&&&&&&&&&&&&& get_suspendedcafsSrvrPgntnMdl &&&&&&&&&&&&&&&&&&&&&");



    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_bbnlolts_sbstn_Mdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_bbnlolts_sbstn_Mdl = function (agent_id, apsfl_bbnl, user) {
    var fnm = "get_bbnlolts_sbstn_Mdl"
    var QRY_TO_EXEC = `select s.sbstn_id,s.sbstn_nm,o.olt_id,o.olt_nm,o.olt_srl_nu,o.olt_ip_addr_tx,o.olt_lble_nu,p.crd_id,o.sbstn_id,o.pop_id
    from sbstn_lst_t as s
    left join olt_lst_t as o on o.sbstn_id=s.sbstn_id
    LEFT JOIN olt_prts_lst_t as p on p.olt_id = o.olt_id
    where p.agnt_id=${agent_id} and o.apsfl_bbnl=${apsfl_bbnl}
    GROUP BY s.sbstn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getapsflBbnloltsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getapsflBbnloltsCtrlMdl = function (agent_id,cafid,user) {
    var fnm = "getapsflBbnloltsCtrlMdl"
    console.log(user)
    agnt_id =agent_id
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
	if(agnt_id == undefined || agnt_id == 'undefined' || agnt_id== null || agnt_id == '')
		agnt_id = user.usr_ctgry_ky
	
    var QRY_TO_EXEC = `select o.olt_id,o.olt_nm,o.olt_srl_nu,o.olt_ip_addr_tx,o.olt_lble_nu,p.crd_id,o.sbstn_id,o.pop_id  
    from olt_lst_t as o
    LEFT JOIN olt_prts_lst_t as p on p.olt_id = o.olt_id
    join caf_dtl_t as c on c.apsfl_bbnl=o.apsfl_bbnl and c.caf_id = ${cafid}
    where p.agnt_id=${agnt_id} 
    GROUP BY o.olt_id
    order by o.olt_nm`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getapsflBbnl_oltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getapsflBbnl_oltsMdl = function (agent_id,apsfl_bbnl,user) {
    var fnm = "getapsflBbnl_oltsMdl"
    console.log(user)
    agnt_id =agent_id
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
	if(agnt_id == undefined || agnt_id == 'undefined' || agnt_id== null || agnt_id == '')
		agnt_id = user.usr_ctgry_ky
	
    var QRY_TO_EXEC = `select o.olt_id,o.olt_nm,o.olt_srl_nu,o.olt_ip_addr_tx,o.olt_lble_nu,p.crd_id,o.sbstn_id,o.pop_id  
    from olt_lst_t as o
    LEFT JOIN olt_prts_lst_t as p on p.olt_id = o.olt_id
    where p.agnt_id=${agnt_id} and o.apsfl_bbnl=${apsfl_bbnl}
    GROUP BY o.olt_id
    order by o.olt_nm`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insertsbstndtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertsbstndtlsMdl = function (data,user) {
    var fnm = "insertsbstndtlsMdl"
    var QRY_TO_EXEC = `insert into sbstn_lst_t (sbstn_nm,apsfl_bbnl,dstrct_id,mndl_id,sbstn_type_id,a_in,i_ts) 
    values ('${data.sbstn_nm}',${data.apsfl_bbnl},${data.dstrt_id},${data.mndl_id},1,1,current_timestamp())`
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
* Function       : prepaidgetRevenueSharingMonthFilterWiseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prepaidgetRevenueSharingMonthFilterWiseMdl = function (yearid, agnt_id, mnthid, data) {
    var fnm = "prepaidgetRevenueSharingMonthFilterWiseMdl"
    console.log("yearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    console.log(yearid)
	var mnth = ``;
        if (data.usr_ctgry_nm == 'MSO') {
            where_agnt = `a.agnt_id=e.mso_agnt_id`,
                where_agnt_id = `c.mso_agnt_id=${agnt_id}`
        } else {
            where_agnt = `a.agnt_id=e.lmo_agnt_id`,
                where_agnt_id = `c.lmo_agnt_id=${agnt_id}`
        }
        if (yearid == 'undefined') {
            year = `and year(f.ac_date)=YEAR(CURDATE())`
        }
        else {
            year = `and year(f.ac_date)=${yearid}`
        }
		if(mnthid != 0){
            mnth = `and month(f.ac_date)=${mnthid}`
        }
        var QRY_TO_EXEC = `select a.agnt_cd,count(distinct(f.cust_id)) as cafcount,count(distinct(f.cust_id)) as pro_rted_caf_cnt,sum(round(p.bse_pck_price*p.apsfl_share/100)+round(p.cpe_rental+p.cpe_rental*p.tax/100)) as apsflshare,
            sum(round(p.bse_pck_price*p.mso_share/100)) as msoshare,sum(round(p.bse_pck_price*p.lmo_share/100)) as lmoshare,
            sum((p.bse_pck_price*p.apsfl_share/100)+(p.bse_pck_price*p.mso_share/100)+p.cpe_rental+(p.cpe_rental*p.tax/100)+(p.bse_pck_price*p.lmo_share/100)) as total
            ,year(f.ac_date) as year,MONTH(f.ac_date) as monthid,ofce_dstrt_id,0 as voip_chrge_at,count(distinct(f.cust_id)) as paid, 0 as NotPaid,
            (case when cust_id=0 then 'Not Paid' else 'Paid' end)  as pd_sts
            from prepaid_f_accounting as f
            join agnt_lst_t as a on a.agnt_id=f.created_by
            join pckge_lst_t as p on p.pckge_id=f.stb_id
            join caf_dtl_t as c on c.caf_id=f.cust_id where ${where_agnt_id} ${year} ${mnth}
            group by MONTH(f.ac_date);`

    console.log("************firstttttttttttttttttttttt*************************")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};