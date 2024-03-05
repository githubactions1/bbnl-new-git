// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');




/*****************************************************************************
* Function      : getUserSubscMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUserSubscMdl = function (user) {
    var fnm = "getUserSubscMdl"
    var QRY_TO_EXEC = `select art.user_id,ROW_NUMBER() OVER ( ORDER BY art.user_id) sno,art.mrchnt_id,mn.mrcht_usr_nm,(CASE WHEN sms_alert_in is true THEN 'YES' ELSE 'NO' end) as sms,
    (CASE WHEN app_alert_in is true THEN 'YES' ELSE 'NO' end) as APP,
    (CASE WHEN email_alert_in is true THEN 'YES' ELSE 'NO' end) as email,
    (CASE WHEN web_alert_in is true THEN 'YES' ELSE 'NO' end) as web,art.alert_cat_id,
    act.alert_cat_nm,m.mrcht_nm from alert_subscn_dtl_t as art
    join alert_cat_lst_t as act on act.alert_cat_id = art.alert_cat_id
    join mrcht_usr_rel_t as mu on mu.mrcht_usr_id=art.user_id
    join mrcht_usr_lst_t as mn on mn.mrcht_usr_id=art.user_id
    join mrcht_lst_t as m on m.mrcht_id=mu.mrcht_id
    where art.user_id=${user.mrcht_usr_id};`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : getAlrtCtgryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAlrtCtgryMdl = function (user, id) {
    var fnm = "getAlrtCtgryMdl"
    if (id == 2) {
        var QRY_TO_EXEC = `SELECT a.*, u.user_id FROM alert_cat_lst_t a
    LEFT JOIN alert_subscn_dtl_t u on u.alert_cat_id = a.alert_cat_id AND u.user_id = ${user.mrcht_usr_id}
    WHERE u.user_id is NULL;`;
    }
    else {
        var QRY_TO_EXEC = `SELECT * from alert_cat_lst_t`;
    }
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : getMrchntsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntsMdl = function (user) {
    var fnm = "getMrchntsMdl"
    var QRY_TO_EXEC = `select * from mrcht_lst_t as m
    join mrcht_usr_rel_t mu on mu.mrcht_id=m.mrcht_id and mu.mrcht_usr_id=${user.mrcht_usr_id};`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : instAlrtSubsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.instAlrtSubsMdl = function (user, data) {
    var fnm = "instAlrtSubsMdl"
    var QRY_TO_EXEC = `insert into alert_subscn_dtl_t(user_id,alert_cat_id,mrchnt_id,sms_alert_in,app_alert_in,email_alert_in,web_alert_in,crte_usr_id,a_in,i_ts) values(${user.mrcht_usr_id},${data.alert_cat_id},${data.mrcht_id},${data.SMS},${data.APP},${data.EMAIL},${data.WEB},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : updtAlrtSubsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtAlrtSubsMdl = function (user, data) {
    var fnm = "updtAlrtSubsMdl"
    var QRY_TO_EXEC = `update alert_subscn_dtl_t set sms_alert_in = ${data.SMS},app_alert_in=${data.APP},email_alert_in=${data.EMAIL},web_alert_in = ${data.WEB},updte_usr_id=${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP() where user_id = ${user.mrcht_usr_id} and alert_cat_id = ${data.alert_cat_id} and mrchnt_id = ${data.mrcht_id}`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getNtfctnTypLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getNtfctnTypLstMdl = function (user) {
    var fnm = "getNtfctnTypLstMdl"
    var QRY_TO_EXEC = `SELECT * FROM alert_cat_lst_t order by alert_cat_id;`;
    // //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

// /*****************************************************************************
// * Function      : getctgryNtfctnLstMdl
// * Description   : 
// * Arguments     : callback function
// ******************************************************************************/
// exports.getctgryNtfctnLstMdl = function (user,id) {
//     var QRY_TO_EXEC = `SELECT CASE WHEN d.clse_in = 1 THEN 'READ' ELSE 'UN-READ' END AS read_sts,
//     d.alert_tx, DATE_FORMAT(d.i_ts, "%d %b %Y, %h:%m %p") as i_ts, c.alert_cat_nm, i.icn_img, u.fst_nm,u.lst_nm
//     from alert_notify_dtl_t as n
//     left join alert_dtl_t d on d.alert_id = n.alert_id
//     left join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
//     left join alert_icn_lst_t i on i.icn_id = d.alert_icn_id
//     left join mrcht_usr_lst_t u on u.mrcht_usr_id = d.crte_usr_id
//     where n.user_id = ${user.mrcht_usr_id} and n.alert_cat_id = ${id} order by n.i_ts desc;`;
//     // //  console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// };

/*****************************************************************************
* Function       : addNewNtfctnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addNewNtfctnMdl = function (data, user) {
    var fnm = "addNewNtfctnMdl"
    // //  console.log(data);
    var QRY_TO_EXEC = `INSERT INTO alert_dtl_t (alert_cat_id, mrchnt_id, alert_tx, crte_usr_id,alert_icn_id, alert_ts, a_in, i_ts) VALUES ('${data.catgryId}','${user.mrcht_id}','${data.ntfnMsg}','${user.mrcht_usr_id}','',CURRENT_TIMESTAMP(),1,CURRENT_TIMESTAMP());`;
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : addnewGrpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addNewntfctnGrpRelMdl = function (data, user, callback) {
    var fnm = "addNewntfctnGrpRelMdl"
    
        var QRY_TO_EXEC = `INSERT INTO alert_grp_rel_t (alert_id, grp_id, a_in,chk_in, i_ts) VALUES ('${data.alrtId}','${data.grpId}',1,1,CURRENT_TIMESTAMP());`;
        //  console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    };


/*****************************************************************************
* Function      : getUsrNtfctnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUsrNtfctnMdl = function (user, id) {
    var fnm = "getUsrNtfctnMdl"
    if(id == 1){
        var where = `where d.crte_usr_id = ${user.mrcht_usr_id} group by d.alert_id, ag.grp_id order by d.i_ts desc`;
        // where n.user_id = ${user.mrcht_usr_id} , %h:%m %p
    }
    else {
        var where = `where d.alert_cat_id = ${id} and d.crte_usr_id = ${user.mrcht_usr_id} group by d.alert_id, ag.grp_id order by d.i_ts desc`;
    }
    var QRY_TO_EXEC = `SELECT d.clse_in,d.alert_id, CASE WHEN d.clse_in = 1 THEN 'READ' ELSE 'UN-READ' END AS read_sts,
    d.alert_tx, DATE_FORMAT(d.i_ts, "%d %b %Y") as i_ts, g.grp_nm, u.mrcht_usr_nm, c.alert_cat_nm, i.icn_img
    from  alert_dtl_t as d
		left join alert_grp_rel_t ag on ag.alert_id =  d.alert_id
		left join usr_grp_lst_t g on g.grp_id = ag.grp_id
		left join mrcht_usr_lst_t u on u.mrcht_usr_id = d.crte_usr_id
		left join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
        left join alert_icn_lst_t i on i.icn_id = d.alert_icn_id
        left join alert_notify_dtl_t as n on n.alert_id = d.alert_id
		${where};`;
     console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getusrRcntNtfctnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getusrRcntNtfctnMdl = function (user) {
    var fnm = "getusrRcntNtfctnMdl"
    var QRY_TO_EXEC = `SELECT CASE WHEN d.clse_in = 1 THEN 'READ' ELSE 'UN-READ' END AS read_sts,
    d.alert_tx, c.alert_cat_nm, i.icn_img, n.alert_id
    from alert_notify_dtl_t as n
    left join alert_dtl_t d on d.alert_id = n.alert_id
    left join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
    left join alert_icn_lst_t i on i.icn_id = d.alert_icn_id
    left join mrcht_usr_lst_t u on u.mrcht_usr_id = d.crte_usr_id
    where d.clse_in =0 and n.user_id = ${user.mrcht_usr_id} 
	GROUP BY read_sts, d.alert_tx, c.alert_cat_nm, i.icn_img, n.alert_id
	order by MAX(n.i_ts)`;
    // n.user_id = ${user.mrcht_usr_id} and
   // //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getusrCrtdNtfctnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getusrCrtdNtfctnMdl = function (user) {
    var fnm = "getusrCrtdNtfctnMdl"
    var QRY_TO_EXEC = `select d.alert_tx, c.alert_cat_nm, GROUP_CONCAT(g.grp_nm) as grp_nm, DATE_FORMAT(d.i_ts,'%d-%m-%Y %H:%m') as dt
    from alert_dtl_t d 
    join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
    join alert_grp_rel_t ag on ag.alert_id =  d.alert_id
    join usr_grp_lst_t g on ag.grp_id = g.grp_id
    where d.crte_usr_id  = ${user.mrcht_usr_id} 
	GROUP BY d.alert_tx, c.alert_cat_nm, grp_nm, dt
	order by MAX(d.i_ts)`;
    // n.user_id = ${user.mrcht_usr_id} and
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : UpdtNtfctnRspnsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.UpdtNtfctnRspnsMdl = function (data, user) {
    var fnm ="UpdtNtfctnRspnsMdl"
    //  console.log(data);
    var QRY_TO_EXEC = `
    UPDATE alert_notify_dtl_t 
    SET clse_in = ${data.clsId}, u_ts=current_timestamp()
    WHERE alert_id= ${data.alertId} and user_id = ${user.mrcht_usr_id}`;
    //  console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUsrGrpLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUsrGrpLstMdl = function (user) {
    var fnm = "getUsrGrpLstMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY g.grp_id) Sno, g.grp_id, g.grp_nm, g.grp_dscn_tx,m.mrcht_usr_nm,   GROUP_CONCAT(uc.grp_ctry_nm) as 'catgories',
                            GROUP_CONCAT(uc.grp_ctry_id) as 'catgory_id', GROUP_CONCAT(m.mrcht_usr_nm) as 'users'
                            , GROUP_CONCAT(m.mrcht_usr_id) as 'user_id'
                            ,  DATE_FORMAT(g.i_ts, "%d %b %Y, %h:%m %p") as i_ts
                        FROM usr_grp_lst_t g
                            LEFT JOIN usr_grp_rel_t u on u.grp_id = g.grp_id
                            LEFT JOIN mrcht_usr_lst_t m on m.mrcht_usr_id = g.crte_usr_id
                            LEFT JOIN usr_grp_ctry_rel_t ug on ug.grp_id = g.grp_id
                            Left JOIN usr_grp_ctry_lst_t uc on uc.grp_ctry_id = ug.grp_ctry_id
                        WHERE g.a_in = 1
                        group by g.grp_id;`;
     console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getUsrGrpCtgryLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUsrGrpCtgryLstMdl = function (user) {
    var fnm = "getUsrGrpCtgryLstMdl"
    var QRY_TO_EXEC = `SELECT * FROM usr_grp_ctry_lst_t order by grp_ctry_id;`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : addnewGrpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addnewGrpMdl = function (data, user, callback) {
    var fnm = "addnewGrpMdl"

    var QRY_TO_EXEC = `INSERT INTO usr_grp_lst_t (grp_nm, grp_dscn_tx, crte_usr_id,mrchnt_id, a_in, i_ts) VALUES ('${data.grp_nm}','${data.grp_dscn_tx}','${user.mrcht_usr_id}','${user.mrcht_id}',1,CURRENT_TIMESTAMP());`;
     console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : addnewGrpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addnewGrpCtgyrRelMdl = function (data, user, callback) {
    var fnm = "addnewGrpCtgyrRelMdl"

    var QRY_TO_EXEC = `INSERT INTO usr_grp_ctry_rel_t (grp_id, grp_ctry_id, a_in,chk_in, i_ts) VALUES ('${data.grpid}','${data.ctgryid}',1,1,CURRENT_TIMESTAMP());`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : addnewUsrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addnewUsrMdl = function (data, user, callback) {
    var fnm = "addnewUsrMdl"
    //  console.log(data)
        //  console.log(data);
        var QRY_TO_EXEC = `INSERT INTO usr_grp_rel_t (grp_id, usr_id, a_in,chk_in, i_ts) VALUES ('${data.cstm_grp_id}','${data.mrcht_usr_id}',1,1,CURRENT_TIMESTAMP());`;
        //  console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                //  console.log(results)
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    };
  
/*****************************************************************************
* Function       : rmvexstUsrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.rmvexstUsrMdl = function (data, user, callback) {
    var fmn = "rmvexstUsrMdl"
    //  console.log(data);
        var QRY_TO_EXEC = `UPDATE  usr_grp_rel_t SET  a_in = 0, chk_in = 0 , u_ts=CURRENT_TIMESTAMP() where  grp_id = '${data.cstm_grp_id}' and  usr_id = '${data.mrcht_usr_id}';`;
        //  console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    };  
    

/*****************************************************************************
* Function      : getasgnUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getasgnUsrMdl = function (user, id) {
    var fnm = "getasgnUsrMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY u.mrcht_usr_id) sno,u.mrcht_usr_nm,'${id}' as cstm_grp_id,
    CASE WHEN u.mbl_nu is not null THEN u.mbl_nu ELSE '-' END AS mbl_nu,
    CASE WHEN u.eml_tx is not null THEN u.eml_tx ELSE '-' END AS eml_tx,
    CASE WHEN d.dsgn_nm is not null THEN d.dsgn_nm ELSE '-' END AS dsgn_nm,u.mrcht_usr_id, ug.grp_id
    from mrcht_usr_lst_t u
    left join dsgn_lst_t d on d.dsgn_id = u.dsgn_id
    left join usr_grp_rel_t ug on ug.usr_id = u.mrcht_usr_id and  ug.grp_id= ${id} and ug.chk_in = 1
    where grp_id is not null
    order by mrcht_usr_id;`
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getunasgnUsrCtrl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getunasgnUsrMdl = function (user, id) {
    var fnm = "getunasgnUsrMdl"
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY u.mrcht_usr_id) sno,u.mrcht_usr_nm,
    // CASE WHEN u.mbl_nu is not null THEN u.mbl_nu ELSE '-' END AS mbl_nu,
    // CASE WHEN u.eml_tx is not null THEN u.eml_tx ELSE '-' END AS eml_tx,
    // CASE WHEN d.dsgn_nm is not null THEN d.dsgn_nm ELSE '-' END AS dsgn_nm,u.mrcht_usr_id
    // from mrcht_usr_lst_t u
    // left join dsgn_lst_t d on d.dsgn_id = u.dsgn_id
    // order by mrcht_usr_id;`;
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY u.mrcht_usr_id) sno,u.mrcht_usr_nm,'${id}' as cstm_grp_id, ug.chk_in,
    CASE WHEN u.mbl_nu is not null THEN u.mbl_nu ELSE '-' END AS mbl_nu,
    CASE WHEN u.eml_tx is not null THEN u.eml_tx ELSE '-' END AS eml_tx,
    CASE WHEN d.dsgn_nm is not null THEN d.dsgn_nm ELSE '-' END AS dsgn_nm,u.mrcht_usr_id, ug.grp_id
    from mrcht_usr_lst_t u
    left join dsgn_lst_t d on d.dsgn_id = u.dsgn_id
    left join usr_grp_rel_t ug on ug.usr_id = u.mrcht_usr_id and  ug.grp_id= ${id} 
    where (ug.chk_in is null or ug.chk_in = 0)
    order by mrcht_usr_id;`
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : asgnUsrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnUsrMdl = function (data, user, callback) {
    var fnm = "asgnUsrMdl"
    //  console.log('data.grpId', data.grpId)
    var QRY_TO_EXEC = `INSERT INTO usr_grp_rel_t (grp_id, usr_id, i_ts) VALUES ('${data.grpId}','${data.usrId}',CURRENT_TIMESTAMP());`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delGrpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.delGrpMdl = function (user, grpId) {
    var fnm = "delGrpMdl"
    var QRY_TO_EXEC = `update usr_grp_lst_t set a_in = 0 where grp_id = ${grpId}`;
    //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtGrpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtGrpMdl = function (data, user, callback) {
    var fnm = "updtGrpMdl"

    var QRY_TO_EXEC = ` UPDATE usr_grp_lst_t SET grp_nm = '${data.grp_nm}', grp_dscn_tx = '${data.grp_dscn_tx}',crte_usr_id = '${user.mrcht_usr_id}', mrchnt_id = '${user.mrcht_id}', a_in=1 , u_ts=CURRENT_TIMESTAMP() where grp_id = '${data.grp_id}'`

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updtGrpCtgyrRelMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtGrpCtgyrRelMdl = function (data, user, callback) {
    var fnm = "updtGrpCtgyrRelMdl"
     console.log(data)
     console.log(data.grpCtgryControl)

    
        var QRY_TO_EXEC = ` insert into usr_grp_ctry_rel_t(grp_id, grp_ctry_id, i_ts , a_in, chk_in)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var d_ts_qry = ` `
        data.grpCtgryControl.filter((k) => {
            console.log(k);
            if (++counter == data.grpCtgryControl.length) {
                dlmtr = ` ON DUPLICATE KEY UPDATE  chk_in = VALUES(chk_in), u_ts = CURRENT_TIMESTAMP() ;`
            }
            d_ts_qry = `   CURRENT_TIMESTAMP() `
            valus_qry += ` ( ${data.grp_id}, ${k.grp_ctry_id}, ${d_ts_qry} , 1, ${k.chk_in}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
         console.log("########################################################");
         console.log(QRY_TO_EXEC);
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
                callback(err, results)
                return;
            })
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getsentNotificationsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getsentNotificationsMdl = function (user, catgry_id) {
    var fnm = "getsentNotificationsMdl"
    if(catgry_id == 1){
        var where = `where d.crte_usr_id= ${user.mrcht_usr_id} group by d.alert_id order by d.i_ts desc`;
        // where n.user_id = ${user.mrcht_usr_id} , %h:%m %p
    }
    else {
        var where = `where d.crte_usr_id= ${user.mrcht_usr_id} and c.alert_cat_id = ${catgry_id} group by d.alert_id order by d.i_ts desc`;
    }
    var QRY_TO_EXEC = `SELECT d.clse_in,d.alert_id, CASE WHEN d.clse_in = 1 THEN 'READ' ELSE 'UN-READ' END AS read_sts,
    d.alert_tx, DATE_FORMAT(d.i_ts, "%d %b %Y") as i_ts,  u.mrcht_usr_nm, c.alert_cat_nm, i.icn_img,GROUP_CONCAT(g.grp_nm) as grp_nm
    from  alert_dtl_t as d
		left join alert_grp_rel_t ag on ag.alert_id =  d.alert_id
		left join usr_grp_lst_t g on g.grp_id = ag.grp_id
		left join mrcht_usr_lst_t u on u.mrcht_usr_id = d.crte_usr_id
		left join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
    left join alert_icn_lst_t i on i.icn_id = d.alert_icn_id ${where}
  `;
    // n.user_id = ${user.mrcht_usr_id} and
    ////  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getreceivedNotificationsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getreceivedNotificationsMdl = function (user, catgry_id) {
    var fnm = "getreceivedNotificationsMdl"
    if(catgry_id == 1){
        var where = `where agq.user_id= ${user.mrcht_usr_id} order by agq.alert_ts desc`;
        // where n.user_id = ${user.mrcht_usr_id} , %h:%m %p
    }
    else {
        var where = `where agq.user_id= ${user.mrcht_usr_id} and c.alert_cat_id = ${catgry_id} order by alert_ts desc`;
    }
    var QRY_TO_EXEC = `SELECT agq.clse_in,d.alert_id, CASE WHEN agq.clse_in = 1 THEN 'READ' ELSE 'UN-READ' END AS read_sts,
    d.alert_tx, DATE_FORMAT(agq.alert_ts, "%d %b %Y") as alert_ts, u.mrcht_usr_nm, c.alert_cat_nm, i.icn_img, DATE_FORMAT(agq.alert_ts, "%d %b %Y") as i_ts
    from  alert_dtl_t as d
		left join alert_notify_dtl_t agq on agq.alert_id =  d.alert_id
		left join mrcht_usr_lst_t u on u.mrcht_usr_id = d.crte_usr_id
		left join alert_cat_lst_t c on c.alert_cat_id = d.alert_cat_id
    left join alert_icn_lst_t i on i.icn_id = d.alert_icn_id ${where}
  `;
    // n.user_id = ${user.mrcht_usr_id} and
   // //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
