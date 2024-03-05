// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function      : getUsers
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAllUsers = (user, clnt_id, tnt_id, callback) => {
    var fnm = "getAllUsers"
    var QRY_TO_EXEC = `select distinct u.usr_id, u.usr_nm, frst_nm, lst_nm, eml_tx, mbl_nu,usr_imge_url_tx , orgn_id, orgn_grp_id,fb_usr_id, dg.dsgn_nm ,dg.dsgn_id, d.dprt_nm ,d.dprt_id, spr_admn_in, cty_id, ste_id, pn_cd, addr_tx, uct.usr_grp_id, u.a_in,
                                DATE_FORMAT(u.i_ts, '%m-%d-%Y') as i_ts, DATE_FORMAT(u.u_ts, '%m-%d-%Y') as u_ts, DATE_FORMAT(u.i_ts, '%m-%d-%Y') as i_timeStamp
                        FROM usr_lst_t as u 
                            join usr_clnt_tnt_rel_t as uct on u.usr_id = uct.usr_id 
                            left join dsgn_lst_t dg on u.dsgn_id = dg.dsgn_id 
                            left join dprts_lst_t d on u.dprt_id = d.dprt_id 
                        WHERE (u.d_in = 0 or u.d_in is null) and uct.clnt_id = ${clnt_id} and uct.tnt_id in (${tnt_id}) order by u.usr_id;`;
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
 * Function      : check_usrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.check_usrMdl = function (user, data, callback) {
    var fnm = "check_usrMdl"
    var condition = '';
    if (data.mobile) {
        condition = `and mbl_nu = ${data.mobile}`;
    } else if (data.email) {
        condition = `and eml_tx = '${data.email}'`;
    } else if (data.usr_id) {
        condition = `and usr_id = ${data.usr_id}`;
    }
    var QRY_TO_EXEC = `select usr_id,usr_nm,eml_tx,mbl_nu 
                        from usr_lst_t 
                        where d_in <> 1 and usr_nm = '${data.username}' ${condition} ;`;
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
 * Function      : getUsrAdtMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.getUsrAdtMdl = function (user, dt) {
    var fnm = "getUsrAdtMdl"

    var QRY_TO_EXEC = `select ua.usr_lgn_ky, ua.usr_id, u.usr_nm, ua.app_typ,ua.sts_cd, DATE_FORMAT(ua.i_ts,'%b %D %y') as date, DATE_FORMAT(ua.i_ts,'%H:%i') as time  
                        from usr_lgn_hstry_dtl_t as ua 
                                join usr_lst_t as u on ua.usr_id = u.usr_id
                        where ua.usr_id=${user.usr_id} and ua.d_in = 0 and date(ua.i_ts) between CURDATE()-interval ${dt} day and CURDATE() order by ua.i_ts desc limit 0,50;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : createUsers
* Description   : To create new user
* Arguments     : callback function
******************************************************************************/
exports.createUsers = function (user, clnt_id, tnts, data, callback) {
    var fnm = "createUsers"
    var QRY_TO_EXEC = `INSERT INTO usr_lst_t(usr_nm,pswrd_encrd_tx,frst_nm,lst_nm,eml_tx,mbl_nu,dsgn_id,dprt_id,cty_id,ste_id,pn_cd,addr_tx,fb_usr_id,pwd_chngd_in,pwd_chngd_ts,i_ts,a_in,spr_admn_in) VALUES(${data.usr_nm},sha1(${data.pwd}),${data.frst_nm || null},${data.lst_nm || null},${data.eml_tx || null},${data.mbl_nu},${data.dsgn_id || null},${data.dprt_id || null},${data.cty_id || null},${data.ste_id || null},${data.pn_cd || null},${data.addr_tx || null}, ${data.fb_usr_id || null},${data.pwd_chngd_in || null},current_timestamp(),current_timestamp(),1,0);`;
    // console.log(QRY_TO_EXEC);

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
        if (err) {
            callback(err, results);
            return;
        }
        for (var i = 0; i < tnts.length; i++) {
            var tnt_id = tnts[i].tnt_id;
            var QRY_TO_EXEC1 = `INSERT INTO usr_clnt_tnt_rel_t(usr_id,clnt_id,tnt_id,usr_grp_id,a_in)values(${results.insertId},${clnt_id},${tnt_id},${data.usr_grp_id || null},1)`;
            // console.log(QRY_TO_EXEC1);
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm,function (err, results) {
                // console.log(i, tnts.length)
                if (i == tnts.length) {
                    callback(err, results);
                    return;
                }
            });
        }
    });
};
/*****************************************************************************
* Function      : createUsers_p
* Description   : To create new user
* Arguments     : callback function
******************************************************************************/
exports.createUsers_p = function (user, data, callback) {
    var fnm = "createUsers_p"
    var QRY_TO_EXEC = `INSERT INTO usr_lst_t(usr_nm,pswrd_encrd_tx,frst_nm,lst_nm,eml_tx,mbl_nu,dsgn_id,dprt_id,cty_id,ste_id,pn_cd,addr_tx,fb_usr_id,pwd_chngd_in,pwd_chngd_ts,i_ts,a_in,spr_admn_in) VALUES(${data.usr_nm},sha1(${data.pwd}),${data.frst_nm},${data.lst_nm},${data.eml_tx},${data.mbl_nu},${data.dsgn_id},${data.dprt_id},${data.cty_id},${data.ste_id},${data.pn_cd},${data.addr_tx}, ${data.fb_usr_id},1,current_timestamp(),current_timestamp(),1,0);`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            // console.log("results");

            // console.log(results);
            if (err) {
                callback(err, results);
                return;
            }

            var QRY_TO_EXEC1 = "INSERT INTO usr_clnt_tnt_rel_t(usr_id,clnt_id,tnt_id,a_in)values('" + results.insertId + "',1,1,1)";
            // console.log(QRY_TO_EXEC1)
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm, function (err, results) {
                callback(err, results);
                return;
            });
        });
};


/*****************************************************************************
* Function      : getUserId
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUsers = function (user, data, callback) {
    var fnm = "getUsers"
    var QRY_TO_EXEC = `select usr_id,usr_nm from usr_lst_t where usr_nm = '${data}'`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUserId
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUserId = function (user, data, callback) {
    var fnm = "getUserId"
    var QRY_TO_EXEC = `select usr_id from usr_lst_t where usr_nm='` + data.usr_nm + `' and d_in is null;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : _90DysInactvUsrs_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports._90DysInactvUsrs_M = function (user, dys_ct) {
    var fnm = "_90DysInactvUsrs_M"
    var QRY_TO_EXEC = `select usr_id, max(i_ts) as i_ts from usr_lgn_hstry_dtl_t where d <> 1 group by usr_id having Date(i_ts) <= curdate() - interval ${dys_ct} Day;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delUsrs_Acs
* Description   : Disable User Access
* Arguments     : callback function
******************************************************************************/
exports.delUsrs_Acs = function (user, usr_id) {
    var fnm = "delUsrs_Acs"
    var QRY_TO_EXEC = `UPDATE usr_lst_t set a_in = 0, d_in = 1, d_ts = CURRENT_TIMESTAMP() where usr_id in (${usr_id});
                       UPDATE usr_clnt_tnt_rel_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where usr_id in (${usr_id}); 
                       UPDATE usr_mnu_prfle_rel_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where usr_id in (${usr_id}); 
                       UPDATE usr_pwd_hstry_dtl_t set a_in = 0 , d_ts = CURRENT_TIMESTAMP() where usr_id in (${usr_id});
                       UPDATE usr_lgn_hstry_dtl_t set d_in = 1 , d_ts = CURRENT_TIMESTAMP() where usr_id in (${usr_id});`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : _90DysFrcChngePwd_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports._90DysFrcChngePwd_M = function (user, dys_ct) {
    var fnm = "_90DysFrcChngePwd_M"
    var QRY_TO_EXEC = `UPDATE usr_lst_t SET pwd_chngd_in = 1 where usr_id in (select usr_id from usr_lst_t where d_in <> 1 and Date(pwd_chngd_ts) <= curdate() - interval ${dys_ct} Day)`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : updateUsers
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateUsers = function (user, usr_id, data, callback) {
    var fnm = "updateUsers"
    var QRY_TO_EXEC = `UPDATE usr_lst_t set frst_nm = ${data.frst_nm},lst_nm = ${data.lst_nm},eml_tx = ${data.eml_tx},mbl_nu = ${data.mbl_nu},addr_tx = ${data.addr_tx},cty_id = ${data.cty_id},ste_id = ${data.ste_id},pn_cd = ${data.pn_cd},u_ts = CURRENT_TIMESTAMP(),dsgn_id = ${data.dsgn_id},dprt_id=${data.dprt_id}, fb_usr_id = ${data.fb_usr_id}, a_in = ${data.a_in || 0} where usr_id = ${usr_id};`;

    // log.info("INFO", QRY_TO_EXEC, 100, QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : Getting User List with Designations
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getUsersWthDsgns = function (user, data, callback) {
    var fnm = "getUsersWthDsgns"
    var QRY_TO_EXEC = "SELECT * FROM usr_lst_t as u JOIN dsgn_lst_t as d on u.dsgn_id = d.dsgn_id WHERE d_in is NULL and u.clnt_id = " + data.clnt_id + " and u.tnt_id = " + data.tnt_id + ";";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : Update User Designation
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.PwdResetUsr = function (user, data, callback) {
    var fnm = "PwdResetUsr"

    var QRY_TO_EXEC = "SELECT * FROM usr_lst_t where d_in is NULL and clnt_id = " + data.clnt_id + " and tnt_id = " + data.tnt_id + ";";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : changeUserProfileMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.changeUserProfileMdl = function (user, dys_ct) {
    var fnm = "changeUserProfileMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_usr_lst_t SET fst_nm = ${user.frst_nm} where usr_id in (select usr_id from usr_lst_t where d_in <> 1 and Date(pwd_chngd_ts) <= curdate() - interval ${dys_ct} Day)`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUsrCtgryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUsrCtgryMdl = function (user) {
    var fnm = "getUsrCtgryMdl"
    var QRY_TO_EXEC = ` SELECT * FROM
                        usr_ctgry_lst_t
                        ORDER BY usr_ctgry_id;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : checkAgntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.checkAgntMdl = function (data, user) {
    var fnm = "checkAgntMdl"
    var QRY_TO_EXEC = ` SELECT agnt_enrlt_id,agnt_cmpny_nm FROM
                        agnt_enrlt_lst_t
                        WHERE agnt_mbl_nu = '${data.agnt_mbl_nu}'`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
 * Function      : sendOtpMdl
 * Description   : Send OTP
 * Arguments     : callback function
 ******************************************************************************/
exports.sendOtpMdl = function (data, user) {
    var fnm = "sendOtpMdl"

    var QRY_TO_EXEC = `INSERT INTO agnt_enrlt_lst_t (agnt_mbl_nu, agnt_otp, i_ts) VALUES (${data.agnt_mbl},'${data.code}',CURRENT_TIMESTAMP())
            ON DUPLICATE KEY 
            UPDATE agnt_otp='${data.code}', i_ts=CURRENT_TIMESTAMP();`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
 * Function      : postAgntVldtOtpMdl
 * Description   : Validate OTP
 * Arguments     : callback function
 ******************************************************************************/
exports.postAgntVldtOtpMdl = function (data, user) {
    var fnm = "postAgntVldtOtpMdl"

    var QRY_TO_EXEC = `SELECT * FROM agnt_enrlt_lst_t WHERE agnt_mbl_nu=${data.phno} AND agnt_otp=${data.otp}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
 * Function      : insrtusrMdl
 * Description   : Validate OTP
 * Arguments     : callback function
 ******************************************************************************/
exports.insrtusrMdl = (data, user, id, callback) => {
    var fnm = "insrtusrMdl"


    //console.log(data, '---------------------------------------------------------')
    var QRY_TO_EXEC = `
    INSERT INTO mrcht_usr_lst_t(mrcht_usr_nm,pswrd_encrd_tx,mrcht_id)
    VALUES ('${data.mbl_nu}',sha1('${data.mbl_nu}'),1);
    `;
    console.log(QRY_TO_EXEC)


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
 * Function      : cafdtlsget
 ******************************************************************************/
exports.cafdtlsgetMdl = function (id, user) {
    var fnm = "cafdtlsgetMdl"

    var QRY_TO_EXEC = `select substring(c.onu_srl_nu,1,3)as srnlo,c.onu_srl_nu as cpeslno,r.caf_id,concat('+91',REPLACE(p.phne_nu,'-','')) as phoneno,p.pswrd_txt as passwrd, CONCAT('+91',REPLACE(p.phne_nu,'-',''),'@vskp.apsflims.in') as username, CONCAT('+91',REPLACE(p.phne_nu,'-',''),'@apsfl.ims.in') as Huaweiusername,p.n_status as flag   
    from voip_caf_phne_nmbrs_rel_t as r
        join voip_phne_nmbrs_lst_t as p on p.phne_nmbr_id = r.phne_nmbr_id
        join caf_dtl_t as c on c.caf_id = r.caf_id
        where r.caf_id = ${id} ORDER BY p.phne_nu asc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
 * Function      : cafdtlsMultiMdl
 ******************************************************************************/
exports.cafdtlsMultiMdl = function (frmdt, todt, user) {
    var fnm = "cafdtlsMultiMdl"

    var QRY_TO_EXEC = `select substring(c.onu_srl_nu,1,3)as srnlo,c.onu_srl_nu as cpeslno,r.caf_id,concat('+91',REPLACE(p.phne_nu,'-','')) as phoneno,p.pswrd_txt as passwrd, CONCAT('+91',REPLACE(p.phne_nu,'-',''),'@vskp.apsflims.in') as username, CONCAT('+91',REPLACE(p.phne_nu,'-',''),'@apsfl.ims.in') as Huaweiusername,p.n_status as flag  
    from voip_caf_phne_nmbrs_rel_t as r
        join voip_phne_nmbrs_lst_t as p on p.phne_nmbr_id = r.phne_nmbr_id
        join caf_dtl_t as c on c.caf_id = r.caf_id
        where c.onu_srl_nu is not null and c.actvn_dt between '${frmdt}' and '${todt}' group by r.caf_id`;
//     var QRY_TO_EXEC = `SELECT substring(cf.onu_srl_nu,1,3)as srnlo,cf.onu_srl_nu as cpeslno,vc.caf_id,concat('+91',REPLACE(ph.phne_nu,'-','')) as phoneno,ph.pswrd_txt as passwrd, CONCAT('+91',REPLACE(ph.phne_nu,'-',''),'@vskp.apsflims.in') as username  
//     from api_rqst_dtl_t as r
//   JOIN api_rqst_cl_dtl_t as c on c.api_rqst_id=r.api_rqst_id
//     JOIN caf_dtl_t as cf on cf.caf_id=r.enty_ky
//     JOIN pckge_lst_t as p on p.pckge_id=cf.crnt_pln_id and cf.crnt_pln_id in (3000107,3000106,3000110)
//     JOIN voip_caf_phne_nmbrs_rel_t as vc on vc.caf_id=cf.caf_id and vc.a_in=1
//     JOIN voip_phne_nmbrs_lst_t as ph on ph.phne_nmbr_id=vc.phne_nmbr_id
//     WHERE DATE(r.i_ts)=CURDATE()-interval 1 day and CURDATE() and r.actn_id=17 and ph.pswrd_txt is not null
//     GROUP BY cf.caf_id
//     ORDER BY cf.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
 * Function      : getLMOContactsMdl
 ******************************************************************************/
exports.getLMOContactsMdl = function (agent_id, user) {
    var fnm = "getLMOContactsMdl"

    var QRY_TO_EXEC = `
    SELECT ct.cntct_ctgry_id, CONCAT(ct.cntct_ctgry_nm, ' (', d.dstrt_nm, ')') as cntct_prsn_dsg, c.cntct_nm,	c.mble1_ph,	c.mble2_ph,	c.eml_tx 
    FROM cntct_lst_t  c
    JOIN cntct_ctgry_lst_t ct on ct.cntct_ctgry_id = c.cntct_ctgry_id
    JOIN dstrt_lst_t d on d.dstrt_id = c.dstrct_id
    JOIN agnt_lst_t a on a.brnch_dstrt_id = d.dstrt_id
    WHERE c.a_in = 1 AND a.agnt_id = ${agent_id}
    ORDER BY d.dstrt_nm, ct.cntct_ctgry_nm;
    ` ;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : checkcaf
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.checkcaf = (caf_id, user) => {
    var fnm = "checkcaf"
    var QRY_TO_EXEC = `SELECT * FROM caf_dtl_t where caf_id=${caf_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}