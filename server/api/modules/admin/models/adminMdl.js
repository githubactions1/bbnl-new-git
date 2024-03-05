// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function      : states_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.states_getMdl = function (user) {
    var fnm = "states_getMdl"
    var QRY_TO_EXEC = "select ste_id,ste_nm from stes_lst_t;";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : cities_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.cities_getMdl = function (user) {
    var fnm = "cities_getMdl"
    var QRY_TO_EXEC = "select cty_id,cty_nm from ctes_lst_t";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : allOrgLvls_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allOrgLvls_getMdl = function (user) {
    var fnm = "allOrgLvls_getMdl"
    var QRY_TO_EXEC = "select orgn_lvls_id,orgn_lvls_nm from orgn_lvls_lst_t";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : allClntOrgLvls_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allClntOrgLvls_getMdl = function (user, data) {
    var fnm = "allClntOrgLvls_getMdl"
    var QRY_TO_EXEC = "select orgn_lvls_id,orgn_lvls_nm from orgn_lvls_lst_t where clnt_id =" + data.clientid + ";";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : tntOrgLvlsByClnt_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.tntOrgLvlsByClnt_getMdl = function (user, data) {
    var fnm = "tntOrgLvlsByClnt_getMdl"
    var QRY_TO_EXEC = "select orgn_lvls_id,orgn_lvls_nm from orgn_lvls_lst_t where clnt_id =" + data.clientid + " and tnt_id =" + data.tenantid + ";";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : svUsrAlrtId
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.svUsrAlrtId = function (user, data, usr_id) {
    var fnm = "svUsrAlrtId"
    var QRY_TO_EXEC = "update usr_lst_t set fb_usr_id='" + data.id + "' where usr_id='" + usr_id + "' and (d_in=0 or d_in is null)";
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : getClntPrflMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getClntPrflMdl = function (user, clientid) {
    var fnm = "getClntPrflMdl"
    var QRY_TO_EXEC = `select * from clnt_prfl_t where a_in <> 0 and clnt_id = ${clientid} ORDER BY clnt_id;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtClntPrflMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtClntPrflMdl = function (user, data, clientid) {
    var fnm = "updtClntPrflMdl"
    var QRY_TO_EXEC = `update clnt_prfl_t set cmpny_nm=${data.cmpny_nm}, bsns_typ=${data.bsns_typ}, bsns_desc=${data.bsns_desc}, gst_no=${data.gst_no}, eml_tx=${data.eml_tx}, gst_no=${data.gst_no}, ph_no=${data.ph_no}, lgo_url_tx=${data.lgo_url_tx}, mn_cntct_nm=${data.mn_cntct_nm}, mn_cntct_no=${data.mn_cntct_no},
    mn_cntct_eml=${data.mn_cntct_eml}, mn_cntct_dsgn=${data.mn_cntct_dsgn},addr_tx=${data.addr_tx},  cty_id=${data.cty_id}, ste_id=${data.ste_id}, pn_cd=${data.pn_cd}, lnkdin_url_tx=${data.lnkdin_url_tx}, fb_url_tx=${data.fb_url_tx}, u_ts=current_timestamp() where clnt_id=${clientid} and a_in <> 0;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getClntRprtMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getClntRprtMdl = function (user, clientid) {
    var fnm = "getClntRprtMdl"
    var QRY_TO_EXEC = `select c.lgo_url_tx,r.* from tnt_rprt_set_t r join clnt_prfl_t c on c.clnt_id = r.clnt_id where r.a_in <> 0 and r.clnt_id = ${clientid};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtClntPrflMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtClntRprtMdl = function (user, data, clientid) {
    var fnm = "updtClntRprtMdl"
    var QRY_TO_EXEC = `UPDATE tnt_rprt_set_t SET ttl_tx=${data.ttl_tx}, ttl_in=${data.ttl_in}, 
    ttl_fnt=${data.ttl_fnt}, ttl_clr=${data.ttl_clr}, lcty_tx=${data.lcty_tx}, lcty_in=${data.lcty_in}, 
lcty_fnt=${data.lcty_fnt}, lcty_clr=${data.lcty_clr}, wb_url_tx=${data.wb_url_tx}, wb_url_in=${data.wb_url_in}, 
wb_url_fnt=${data.wb_url_fnt}, wb_url_clr=${data.wb_url_clr}, rpt_nm_in=${data.rpt_nm_in}, lgo_in=${data.lgo_in}, 
hdr_pstn=${data.hdr_pstn}, pgng_in=${data.pgng_in},u_ts = current_timestamp() WHERE clnt_id=${clientid} and a_in=1;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getClntPrflMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getClntPrflMdl = function (user, clientid) {
    var fnm = "getClntPrflMdl"
    var QRY_TO_EXEC = `select * from clnt_prfl_t where a_in <> 0 and clnt_id = ${clientid} ORDER BY clnt_id;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtClntPrflMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtClntPrflMdl = function (user, data, clientid) {
    var fnm = "updtClntPrflMdl"
    var QRY_TO_EXEC = `update clnt_prfl_t set cmpny_nm=${data.cmpny_nm}, bsns_typ=${data.bsns_typ}, bsns_desc=${data.bsns_desc}, gst_no=${data.gst_no}, eml_tx=${data.eml_tx}, gst_no=${data.gst_no}, ph_no=${data.ph_no}, lgo_url_tx=${data.lgo_url_tx}, mn_cntct_nm=${data.mn_cntct_nm}, mn_cntct_no=${data.mn_cntct_no},
    mn_cntct_eml=${data.mn_cntct_eml}, mn_cntct_dsgn=${data.mn_cntct_dsgn},addr_tx=${data.addr_tx},  cty_id=${data.cty_id}, ste_id=${data.ste_id}, pn_cd=${data.pn_cd}, lnkdin_url_tx=${data.lnkdin_url_tx}, fb_url_tx=${data.fb_url_tx}, u_ts=current_timestamp() where clnt_id=${clientid} and a_in <> 0;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : getAllClntsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.get_allClntsMdl = function (user) {
    var fnm = "get_allClntsMdl"
    var QRY_TO_EXEC = "select * from clnt_lst_t where a_in =1 ORDER BY clnt_id;";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getAllClntsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.get_allTntsByClnt = function (user, clientid) {
    var fnm = "get_allTntsByClnt"

    var QRY_TO_EXEC = "select * from tnt_lst_t where clnt_id = " + clientid + " ORDER BY tnt_id;";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



exports.getDirectoryUsers = (user, clnt_id, tnt_id) => {
    var fnm = "getDirectoryUsers"
    var QRY_TO_EXEC = `SELECT usr.usr_id,usr.frst_nm,dsgn.dsgn_id,dprt.dprt_id,lctn.lctn_id,dsgn.dsgn_nm,dprt.dprt_nm,lctn.lctn_nm,usr.usr_nm,usr.eml_tx,usr.mbl_nu,usr.addr_tx,usr.pn_cd
    FROM
    usr_lst_t usr
    LEFT JOIN dsgn_lst_t dsgn ON dsgn.dsgn_id = usr.dsgn_id
    LEFT JOIN dprts_lst_t dprt ON dprt.dprt_id = usr.dprt_id
    LEFT JOIN lctn_lst_t lctn ON lctn.lctn_id = usr.lctn_id
    WHERE dsgn.clnt_id = ${clnt_id} and dsgn.tnt_id = ${tnt_id}`;


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





/*****************************************************************************
* Function      : getUsers
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.postUserDesigDprtIds = (user, data) => {
    var fnm = "postUserDesigDprtIds"

    if (data.designation && data.department == 0 && data.location == 0) {
        var condition = `where dsgn_id = ${data.designation}`;
    }
    if (data.designation && data.department && data.location == 0) {
        var condition = `where dsgn_id = ${data.designation} and dprt_id = ${data.department}`;
    }
    if (data.designation && data.location && data.department == 0) {
        var condition = `where dsgn_id = ${data.designation} and lctn_id = ${data.location}`;
    }
    if (data.designation && data.location && data.department) {
        var condition = `where dsgn_id = ${data.designation} and lctn_id = ${data.location} and dprt_id=${data.department}`;
    }

    var QRY_TO_EXEC = `select * from usr_lst_t ${condition}`;
    // var QRY_TO_EXEC = `select * from usr_lst_t where dsgn_id = ${data.designation} and dprt_id = ${data.department} and lctn_id=${data.location}`;    // var QRY_TO_EXEC = `select * from usr_lst_t ${condition}`;
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getTotUsrsCnt
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTotUsrsCnt = function (user, clnt_id, tnt_id) {
    var fnm = "getTotUsrsCnt"
    var QRY_TO_EXEC_ACTIVE = `SELECT COUNT(usr_id) as tot_usrs FROM usr_lst_t`;
    var QRY_TO_EXEC_INACTIVE = `SELECT COUNT(usr_id) as act_usrs FROM usr_lst_t WHERE d_in is null`;
    var QRY_TO_EXEC_CLNT_ACT = `SELECT COUNT(u.usr_id) as tot_usrs FROM usr_lst_t u JOIN usr_clnt_tnt_rel_t ct on u.usr_id = ct.usr_id  WHERE  clnt_id = ` + clnt_id + ` and tnt_id = ` + tnt_id + ` `;
    var QRY_TO_EXEC_CLNT_INACT = `SELECT COUNT(u.usr_id) as act_usrs FROM usr_lst_t u JOIN usr_clnt_tnt_rel_t ct on u.usr_id = ct.usr_id  WHERE (u.d_in = 0 or u.d_in is null) and clnt_id = ` + clnt_id + ` and tnt_id = ` + tnt_id + ` `;
    var QRY_TO_EXEC = QRY_TO_EXEC_ACTIVE + ";" + QRY_TO_EXEC_INACTIVE + ";" + QRY_TO_EXEC_CLNT_ACT + ";" + QRY_TO_EXEC_CLNT_INACT;
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : tntAdminsLst_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.tntAdminsLst_getMdl = function (user, data) {
    var fnm = "tntAdminsLst_getMdl"
    var QRY_TO_EXEC = "select u.*,uct.*,DATE_FORMAT(u.i_ts,'%m-%d-%Y') as i_timeStamp FROM usr_lst_t as u join usr_clnt_tnt_rel_t as uct on u.usr_id = uct.usr_id WHERE (u.d_in = 0 or u.d_in is null) and uct.clnt_id =" + data.clientid + " and uct.clnt_admn_in = 1 ;";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUsers
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usersByClnt_getMdl = function (user, data) {
    var fnm = "usersByClnt_getMdl"
    var QRY_TO_EXEC = "select u.*,uct.*,DATE_FORMAT(u.i_ts,'%m-%d-%Y') as i_timeStamp FROM usr_lst_t as u join usr_clnt_tnt_rel_t as uct on u.usr_id = uct.usr_id WHERE (u.d_in = 0 or u.d_in is null) and uct.clnt_id =" + data.clientid + " ;";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUsers
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usersByTnt_getMdl = function (user, data) {
    var fnm = "usersByTnt_getMdl"
    var QRY_TO_EXEC = "select u.*,uct.*,DATE_FORMAT(u.i_ts,'%m-%d-%Y') as i_timeStamp FROM usr_lst_t as u join usr_clnt_tnt_rel_t as uct on u.usr_id = uct.usr_id WHERE (u.d_in = 0 or u.d_in is null) and uct.clnt_id =" + data.clientid + " and uct.tnt_id = " + data.tenantid + ";";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      :createClient
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.createClient = function (user, data, callback) {
    var fnm = "createClient"

    var QRY_TO_EXEC = `INSERT INTO clnt_lst_t(clnt_nm,clnt_dsply_nm,clnt_wb_url_tx,a_in,i_ts) VALUES(${data.clnt_nm},${data.clnt_nm},${data.clnt_wb_url_tx},'1',current_timestamp())`;
    // console.log(QRY_TO_EXEC);
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm,function (error, clntRslts) {
        if (error) {
            return callback(error, clntRslts);
        }
        if (clntRslts) {
            var QRY_TO_EXEC1 = `INSERT INTO clnt_prfl_t(clnt_id,cmpny_nm,eml_tx,ph_no,addr_tx,cty_id,ste_id,a_in,i_ts) VALUES(${clntRslts.insertId},${data.clnt_nm},${data.eml_tx},${data.mbl_nu},${data.addr_tx || null},${data.cty_id || null},${data.ste_id || null},'1',current_timestamp())`;
            // console.log(QRY_TO_EXEC1);
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user, fnm,function (error, results) {
                return callback(error, clntRslts);
            });
        } else {
            return callback(error, clntRslts);
        }
    });
};

/*****************************************************************************
* Function      : getAllClntsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getClientDtl = function (user, data) {
    var fnm = "getClientDtl"
    var QRY_TO_EXEC = "select * from clnt_lst_t where clnt_id='" + data.clnt_id + "'";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      :updateClient
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateClient = function (user, data) {
    var fnm = "updateClient"
    var QRY_TO_EXEC_CLNT = "update clnt_lst_t set clnt_nm='" + data.clnt_nm + "',clnt_dsply_nm='" + data.clnt_nm + "',clnt_wb_url_tx='" + data.clnt_wb_url_tx + "',u_ts=current_timestamp() where clnt_id='" + data.clnt_id + "' and a_in=1";
    var QRY_TO_EXEC_CLNT_PRF = "update clnt_prfl_t set cmpny_nm='" + data.clnt_nm + "',eml_tx='" + data.eml_tx + "',ph_no='" + data.mbl_nu + "',addr_tx='" + data.addr_tx + "',cty_id='" + data.cty_id + "',ste_id='" + data.ste_id + "',u_ts=current_timestamp() where clnt_id='" + data.clnt_id + "' and a_in=1";
    var QRY_TO_EXEC = QRY_TO_EXEC_CLNT + ";" + QRY_TO_EXEC_CLNT_PRF;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);


};
/*****************************************************************************
* Function      :devareClient
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareClient = function (user, data) {
    var fnm = "devareClient"
    console.log("---------------------data");
    console.log(data);
    var QRY_TO_EXEC_CLNT = "update clnt_lst_t set d_in = 1,a_in = 0,d_ts = current_timestamp()  where clnt_id='" + data.clnt_id + "' ";
    var QRY_TO_EXEC_TNT = "UPDATE tnt_lst_t set d_in = 1,a_in = 0,d_ts = current_timestamp()  where clnt_id='" + data.clnt_id + "' ";
    var QRY_TO_EXEC_CLNT_PRF = "UPDATE clnt_prfl_t set d_in = 1,a_in = 0,d_ts = current_timestamp()  where clnt_id='" + data.clnt_id + "' ";

    var QRY_TO_EXEC = QRY_TO_EXEC_CLNT + ";" + QRY_TO_EXEC_TNT + ";" + QRY_TO_EXEC_CLNT_PRF;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      :createTenant
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.createTenant = function (user, data) {
    var fnm = "createTenant"
    var QRY_TO_EXEC = `INSERT INTO tnt_lst_t(clnt_id,tnt_nm,tnt_dsply_nm,tnt_hmdshb_pg,a_in,i_ts) VALUES(${data.clnt_id},${data.tnt_nm},${data.tnt_dsply_nm || null},'/ds','1',current_timestamp())`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : insertClntTntRelation
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertClntTntRelation = function (user, usr_id, clnt_id, tnt_id) {
    var fnm = "insertClntTntRelation"
    var QRY_TO_EXEC = "INSERT INTO usr_clnt_tnt_rel_t (usr_id,clnt_id,tnt_id,a_in,i_ts) values (" + usr_id + "," + clnt_id + "," + tnt_id + ",1,CURRENT_TIMESTAMP())";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : getTenantDtls
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTenantDtls = function (user, data) {
    var fnm = "getTenantDtls"
    var QRY_TO_EXEC = "select * from tnt_lst_t where clnt_id='" + data.clnt_id + "' and tnt_id='" + data.tnt_id + "';";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      :updateClient
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateTenant = function (user, data) {
    var fnm = "updateTenant"
    var QRY_TO_EXEC = "update tnt_lst_t set tnt_nm='" + data.tnt_nm + "',tnt_dsply_nm='" + data.tnt_dsply_nm + "',u_ts=current_timestamp() where clnt_id='" + data.clnt_id + "' and tnt_id='" + data.tnt_id + "'";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      :devareTenant
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareTenant = function (user, data) {
    var fnm = "devareTenant"
    var QRY_TO_EXEC = "update tnt_lst_t set d_in=1,a_in=0,d_ts=current_timestamp() where clnt_id='" + data.clnt_id + "' and tnt_id='" + data.tnt_id + "'";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      :getAllClntTnts
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAllClntTnts = function (user, data) {
    var fnm = "getAllClntTnts"
    var QRY_TO_EXEC = "SELECT * FROM tnt_lst_t t  JOIN clnt_lst_t c on t.clnt_id = c.clnt_id where t.a_in =1";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      :getlgdUsrDtls
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getlgdUsrDtls = function (user, data) {
    var fnm = "getlgdUsrDtls"
    var QRY_TO_EXEC = `SELECT COUNT(distinct(u.usr_id)) as 'count',DATE_FORMAT(u.i_ts,'%d-%m-%Y') as 'date' FROM usr_lgn_hstry_dtl_t u WHERE DATE(u.i_ts) BETWEEN CURDATE() - INTERVAL 6 DAY and CURDATE() GROUP BY DATE(u.i_ts)  ORDER BY u.i_ts desc`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getDesignationsByClnt_Mdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDesignationsByClnt_Mdl = function (user, data) {
    var fnm = "getDesignationsByClnt_Mdl"
    var QRY_TO_EXEC = "select * FROM dsgn_lst_t where clnt_id =" + data.clntId + " and d_in <> 1 and a_in <> 0 ORDER by dsgn_id";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getDsgns
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDsgns = (user, clntId, tntId) => {
    var fnm = "getDsgns"
    // and d_in <> 1 and a_in <> 0 
    var QRY_TO_EXEC = `select * FROM dsgn_lst_t where clnt_id=${clntId} and tnt_id=${tntId} ORDER by dsgn_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getOrgns
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOrgns = function (user, data, clntId, tntId) {
    var fnm = "getOrgns"
    var QRY_TO_EXEC = "select * FROM orgn_lst_t where clnt_id =" + clntId + " and tnt_id = " + tntId + " and d_in <> 1 and a_in <> 0 ORDER by orgn_id";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getDprt
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDprt = function (user, data, clntId, tntId) {
    var fnm = "getDprt"
    var QRY_TO_EXEC = "select * FROM dprts_lst_t where clnt_id =" + clntId + " and tnt_id = " + tntId + " and d_in <> 1 and a_in <> 0 ORDER by dprt_id";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : usrsHirchy_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.usrsHirchy_getMdl = function (user, data) {
    var fnm = "usrsHirchy_getMdl"

    var QRY_TO_EXEC = `Select u.usr_id,u.usr_nm,d.dsgn_id,d.dsgn_nm,ol.orgn_lvls_nm from usr_lst_t u 
                        join dsgn_lst_t d on u.dsgn_id = d.dsgn_id
                        join orgn_grp_lst_t og on u.orgn_grp_id = og.orgn_grp_id and u.clnt_id = og.clnt_id and u.tnt_id = og.tnt_id
                        join orgn_lvls_lst_t ol on og.orgn_lvls_id = ol.orgn_lvls_id 
                        where og.clnt_id =`+ data.clntId + ` and og.tnt_id =` + data.tntId + `;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updHirchy_postMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updHirchy_postMdl = function (user, data) {
    var fnm = "updHirchy_postMdl"

    var QRY_TO_EXEC = "UPDATE orgn_grp_lst_t SET orgn_lvls_id=" + data.orgn_lvls_id + " WHERE orgn_grp_id = (select orgn_grp_id from usr_lst_t where usr_id = " + data.usr_id + ");";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Update User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updateDsgn = function (user, data, params, clntId, tntId) {
    var fnm = "updateDsgn"

    var QRY_TO_EXEC = "UPDATE dsgn_lst_t set dsgn_nm = '" + data.name + "', asrt_asgn_in = '" + data.asrt_asgn_in + "', u_ts = CURRENT_TIMESTAMP() where dsgn_id = '" + params.id + "' and clnt_id='" + clntId + "' and tnt_id=" + tntId;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Update User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updateDprt = function (user, data, params, clntId, tntId) {
    var fnm = "updateDprt"

    var QRY_TO_EXEC = "UPDATE dprts_lst_t set dprt_nm = '" + data.name + "',u_ts = CURRENT_TIMESTAMP() where dprt_id = '" + params.id + "' and clnt_id='" + clntId + "' and tnt_id=" + tntId;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Update User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updateOrgn = function (user, data, params, clntId, tntId) {
    var fnm = "updateOrgn"
    var QRY_TO_EXEC = "UPDATE orgn_lst_t set orgn_nm = '" + data.name + "',u_ts = CURRENT_TIMESTAMP() where orgn_id = '" + params.id + "' and clnt_id='" + clntId + "' and tnt_id=" + tntId;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Add User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addDsgn = function (user, data, clntId, tntId) {
    var fnm = "addDsgn"
    var QRY_TO_EXEC = "insert into dsgn_lst_t(dsgn_nm,asrt_asgn_in,clnt_id,tnt_id,a_in,d_in,i_ts)values('" + data.name + "','" + data.asrt_asgn_in + "'," + clntId + "," + tntId + ",1,0,CURRENT_TIMESTAMP())";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Add User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addDprt = function (user, data, clntId, tntId) {
    var fnm = "addDprt"
    var QRY_TO_EXEC = "insert into dprts_lst_t(dprt_nm,clnt_id,tnt_id,a_in,d_in,i_ts)values('" + data.name + "'," + clntId + "," + tntId + ",1,0,CURRENT_TIMESTAMP())";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : Add User Orgnization
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addOrgn = function (user, data, clntId, tntId) {
    var fnm = "addOrgn"
    var QRY_TO_EXEC = "insert into orgn_lst_t(orgn_nm,clnt_id,tnt_id,a_in,d_in,i_ts)values('" + data.name + "'," + clntId + "," + tntId + ",1,0,CURRENT_TIMESTAMP())";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : deleteDsgns
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deleteDesgns = function (user, data, clntId, tntId) {
    var fnm = "deleteDesgns"
    var QRY_TO_EXEC = "UPDATE dsgn_lst_t set d_in = 1 , d_ts = CURRENT_TIMESTAMP() where dsgn_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : deleteDprts
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deleteDprts = function (user, data, clntId, tntId) {
    var fnm = "deleteDprts"
    var QRY_TO_EXEC = "UPDATE dprts_lst_t set d_in = 1 , d_ts = CURRENT_TIMESTAMP() where dprt_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : deleteOrgn
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deleteOrgn = function (user, data, clntId, tntId) {
    var fnm = "deleteOrgn"
    var QRY_TO_EXEC = "UPDATE orgn_lst_t set d_in = 1 , d_ts = CURRENT_TIMESTAMP() where orgn_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getAdtTableLst_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAdtTableLst_M = function (user) {
    var fnm = "getAdtTableLst_M"
    var QRY_TO_EXEC = `select * from tbl_lst_t where adt_in = 1; `;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getAdtDtls_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAdtDtls_M = function (user, data) {
    var fnm = "getAdtDtls_M"
    var QRY_TO_EXEC = `select t.tbl_id, t.tbl_nm,t.prmry_ky, a.prmry_ky_vl, a.nw_rcrd, a.old_rcrd, a.i_ts, SUBSTRING (a.qry_tx, 1, 6) as sql_typ, a.adt_usr_id, u.frst_nm, u.lst_nm , a.qry_tx
    from adt_tbl_dtl_t a 
    join tbl_lst_t t on a.tbl_id = t.tbl_id 
    left join usr_lst_t u on a.adt_usr_id = u.usr_id where DATE_FORMAT(a.i_ts,'%Y-%m-%d') BETWEEN '${data.from}' AND '${data.to}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getLocations
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getLocations = function (user, clntId, tntId) {
    var fnm = "updtLocation"
    var QRY_TO_EXEC = "select * FROM lctn_lst_t where  a_in <> 0 ORDER by lctn_id";
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtLocation
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtLocation = function (user, params, data, clntId, tntId) {
    var fnm = "updtLocation"

    var QRY_TO_EXEC = "UPDATE lctn_lst_t set lctn_nm = '" + data.name + "',u_ts = CURRENT_TIMESTAMP() where lctn_id = '" + params.id + "' and clnt_id='" + clntId + "' and tnt_id=" + tntId;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : Add Location
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addLocation = function (user, data, clntId, tntId) {
    var fnm = "devareLocation"
    var QRY_TO_EXEC = "insert into lctn_lst_t(lctn_nm,clnt_id,tnt_id,a_in,i_ts)values('" + data.name + "'," + clntId + "," + tntId + ",1,CURRENT_TIMESTAMP())";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : devare location
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareLocation = function (user, data, clntId, tntId) {
    var fnm = "devareLocation"
    var QRY_TO_EXEC = "UPDATE lctn_lst_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where lctn_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getEmployees
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getEmployees = function (user, clntId, tntId) {
    var fnm = "getEmployees"
    var QRY_TO_EXEC = "select e.*, u.usr_id, u.ste_id,u.pn_cd,u.frst_nm,u.lst_nm FROM emply_lst_t e left join usr_lst_t u on e.mbl_nu = u.mbl_nu where e.a_in  <> 0 and e.d_in <> 1 ORDER by e.emply_id;";
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtEmployee
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtEmployee = function (user, params, data, clntId, tntId) {
    var fnm = "updtEmployee"

    var QRY_TO_EXEC = `UPDATE emply_lst_t set emply_nm = ${data.emply_nm || null},dprt_id = ${data.dprt_id || null},dsgn_id = ${data.dsgn_id || null},mbl_nu = ${data.mbl_nu || null},eml_tx = ${data.eml_tx || null},addr_tx = ${data.addr_tx || null},u_ts = CURRENT_TIMESTAMP() where emply_id = ${params.id} and clnt_id=${clntId} and tnt_id=${tntId}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : Add Employee
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addEmployee = function (user, data, clntId, tntId) {
    var fnm = "addEmployee"
    var QRY_TO_EXEC = `insert into emply_lst_t(emply_nm,mbl_nu,eml_tx,addr_tx, dprt_id, dsgn_id, clnt_id,tnt_id,a_in,i_ts)values(${data.emply_nm || null},${data.mbl_nu || null},${data.eml_tx || null},${data.addr_tx || null},${data.dprt_id || null},${data.dsgn_id || null},${clntId},${tntId},1,CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : devare location
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareEmployee = function (user, data, clntId, tntId) {
    var fnm = "devareEmployee"
    var QRY_TO_EXEC = "UPDATE emply_lst_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where emply_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getHolidays_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getHolidays_M = function (user) {
    var fnm = "getHolidays_M"
    var QRY_TO_EXEC = `select * from hldy_lst_t where d_in=0 ORDER BY hldy_dt desc`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : addHoliday_M
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addHoliday_M = function (user, title, date, clntId, tntId) {
    var fnm = "addHoliday_M"
    // console.log(title, date);
    var QRY_TO_EXEC = `insert into hldy_lst_t(hldy_ttl,hldy_dt,clnt_id,tnt_id,i_ts)values("${title}", "${date}", ${clntId} ,${tntId},CURRENT_TIMESTAMP())`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : deleteHoliday_M
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.deleteHoliday_M = function (user, hldy_id, clntId, tntId) {
    // console.log(hldy_id);
    var fnm = "deleteHoliday_M"
    var QRY_TO_EXEC = `update hldy_lst_t set d_in =1, i_ts = CURRENT_TIMESTAMP() where hldy_id = ${hldy_id} and clnt_id=${clntId} and tnt_id=${tntId}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUserGroups
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUserGroups = function (user, clntId, tntId) {
    var fnm = "getUserGroups"
    var QRY_TO_EXEC = `select * FROM usr_grp_lst_t where a_in <> 0 and clnt_id=${clntId} and tnt_id=${tntId} ORDER by usr_sprt_grp_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtUserGroup
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtUserGroup = function (user, params, data, clntId, tntId) {
    var fnm = "updtUserGroup"

    var QRY_TO_EXEC = "UPDATE usr_grp_lst_t set usr_sprt_grp_nm = '" + data.name + "',u_ts = CURRENT_TIMESTAMP() where usr_sprt_grp_id = '" + params.id + "' and clnt_id='" + clntId + "' and tnt_id=" + tntId;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : Add UserGroup
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addUserGroup = function (user, data, clntId, tntId) {
    var fnm = "addUserGroup"
    var QRY_TO_EXEC = "insert into usr_grp_lst_t(usr_sprt_grp_nm,clnt_id,tnt_id,a_in,i_ts)values('" + data.usr_sprt_grp_nm + "'," + clntId + "," + tntId + ",1,CURRENT_TIMESTAMP())";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : devare UserGroup
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareUserGroup = function (user, data, clntId, tntId) {
    var fnm = "devareUserGroup"
    var QRY_TO_EXEC = "UPDATE usr_grp_lst_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where usr_sprt_grp_id = '" + data.id + "'  and clnt_id='" + clntId + "' and tnt_id=" + tntId;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUserRoles
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUserRoles = function (user) {
    var fnm = "getUserRoles"
    var QRY_TO_EXEC = `select * FROM rles_lst_t where a_in <> 0 ORDER by rle_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updtUserRole
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtUserRole = function (user, params, data) {
    var fnm = "updtUserRole"
    var QRY_TO_EXEC = "UPDATE rles_lst_t set rle_nm = '" + data.name + "',u_ts = CURRENT_TIMESTAMP() where rle_id = " + params.id;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : Add UserRole
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addUserRole = function (user, data) {
    var fnm = "addUserRole"
    var QRY_TO_EXEC = "insert into rles_lst_t(rle_nm,a_in,i_ts)values('" + data.name + "',1,CURRENT_TIMESTAMP())";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : devare UserRole
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.devareUserRole = function (user, data) {
    var fnm = "devareUserRole"
    var QRY_TO_EXEC = "UPDATE rles_lst_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where rle_id = " + data.id;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : get Permissions
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getPermissions = function (user, data) {
    var fnm = "getPermissions"
    var QRY_TO_EXEC = `select DISTINCT ap.app_prfle_id,ap.app_prfle_nm, a.app_id, a.app_nm, a.app_url_tx, a.app_lgo_tx,a.hdr_in,0 as dsble_in, prnt_app_id
    from app_prfle_lst_t ap
    join app_prfle_app_rel_t apr on ap.app_prfle_id=apr.app_prfle_id
    join app_lst_t a on a.app_id=apr.app_id
    JOIN tnt_lst_t as tnt on tnt.tnt_id=ap.tnt_id
    where ap.clnt_id =1 and tnt.tnt_id =1 and a.a_in =1 and a.cmpnt_id =1 order by apr.sqnce_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
 * Function      : appUpdtDtlMdl
 * Description   : 
 * Arguments     : callback function
 ******************************************************************************/
exports.appUpdtDtlMdl = function (app_id, vrsn_nu) {
    var fnm = "appUpdtDtlMdl"
    log.info(vrsn_nu)

    var QRY_TO_EXEC = `SELECT * FROM app_vrsn_dtl_t  where vrsn_nu = '${vrsn_nu}' and app_id = ${app_id};	`;

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
 * Function      : appUpdtDtlMdl
 * Description   : 
 * Arguments     : callback function
 ******************************************************************************/
exports.lclstrgdtaMDL = function (callback) {
    
    temp = [{
        trn_id: 1,
        trn_nm: "Functional Training",
        trn_attnd_ttl: 1000,
        trn_unattnd_ttl: 4000,
        trn_yt_ated: 100,
        schdld: 40,
        nt_schdue: 60,
       
    }]
    callback(null, temp)
    return;
}

