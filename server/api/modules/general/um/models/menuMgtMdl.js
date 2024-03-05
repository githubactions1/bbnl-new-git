// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');
/*****************************************************************************
* Function      : creating new menu 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.chckAdmnMnuPrfl = function (user, data, callback) {

    var fnm="chckAdmnMnuPrfl"
    var QRY_TO_EXEC = `select * from mnu_prfle_lst_t where clnt_id=${data.clnt_id} and tnt_id = ${data.tnt_id} and app_id =${data.appID.id} and admn_in=1 and(a_in  = 1 or a_in  is null);`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function      : creating new menu 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.postCreateMnu = function (user, data, callback) {
    var fnm="postCreateMnu"

    var QRY_TO_EXEC = "insert into mnu_prfle_lst_t(mnu_prfle_nm,i_ts,app_id,clnt_id,tnt_id,admn_in)values('" + data.mnuPrflNM + "',current_timestamp()," + data.appID.id + "," + data.clnt_id + "," + data.tnt_id + "," + data.admn_in + ");";
    // console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : assigning menu items to new menu profile  
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.itmsFornewMnu = function (user, prfId, data, callback) {
    var fnm="itmsFornewMnu"
    if (!data.permc) { data.permc = 0; }
    if (!data.permr) { data.permr = 0; }
    if (!data.permu) { data.permu = 0; }
    if (!data.permd) { data.permd = 0; }
    if (!data.permo) { data.permo = 0; }
    if (!data.perme) { data.perme = 0; }

    // console.log(QRY_TO_EXEC);

    var QRY_TO_EXEC = "insert into mnu_prfle_itm_rel_t(mnu_prfle_id,mnu_itm_id,prnt_mnu_itm_id,sqnce_id)values(" + prfId + "," + data.submnu_itm_id + "," + data.mnu_itm_id + "," + data.sqnceId + ");";
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : To change menu profile name
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.changeMnuPrfNm = function (user, data, admn_in, callback) {
    var fnm="changeMnuPrfNm"

    var QRY_TO_EXEC = `UPDATE mnu_prfle_lst_t SET mnu_prfle_nm="${data.mnuPrflNM}", admn_in=${admn_in} WHERE mnu_prfle_id=${data.mnu_prfle_id};`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delete menu profile and menu items in mnu_prfle_itm_rel_t
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.dltItmsFrmMnuPrf = function (user, data, callback) {
    var fnm="dltItmsFrmMnuPrf"

    var QRY_TO_EXEC = `DELETE FROM mnu_prfle_itm_rel_t WHERE mnu_prfle_id=${data} ;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delete menu profile
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.dltMnuPrf = function (user, data, callback) {
    var fnm="dltMnuPrf"

    var QRY_TO_EXEC = `DELETE FROM mnu_prfle_lst_t WHERE mnu_prfle_id=${data}; DELETE FROM mnu_prfle_itm_rel_t WHERE mnu_prfle_id=${data} ;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : to get app profile id based on app profile name 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getMnuPrflId = function (user, mnuPrflNm, callback) {
    var fnm="getMnuPrflId"

    var QRY_TO_EXEC = "select mnu_prfle_id from mnu_prfle_lst_t where mnu_prfle_nm = '" + mnuPrflNm + "';";
    // console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user ,fnm);
};

/*****************************************************************************
* Function      : getting app names
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.assignMnuToUsrMdl = function (user, menuDtls, user_data, callback) {
    var fnm="assignMnuToUsrMdl"

    var QRY_TO_EXEC = "UPDATE usr_mnu_prfle_rel_t SET mnu_prfle_id=" + menuDtls.menu_id + " WHERE usr_id=" + user_data.usr_id + " and app_id=" + menuDtls.app_id + ";";

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user ,fnm);
};



/*****************************************************************************
* Function      : allMenu_getProfles
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allMenu_getProfles = function (user, data, callback) {
    var fnm="allMenu_getProfles"
    var QRY_TO_EXEC = "select * from mnu_prfle_lst_t where    clnt_id=' " + data.clnt_id + "' and tnt_id='" + data.tnt_id + "' order by mnu_prfle_id;"

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : Update User Profile 
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMnuPrf_ins_updt = function (user, data, usr_id, callback) {
    var fnm="updateMnuPrf_ins_updt"
    var count = 0;
    var QRY_TO_EXEC1 = "SELECT  * FROM usr_mnu_prfle_rel_t  where usr_id ='" + usr_id.usrId + "' ";
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm, function (err, results) {
            if (results.length > 0) {
                var QRY_TO_EXEC2 = "delete FROM usr_mnu_prfle_rel_t  where usr_id ='" + usr_id.usrId + "' ";
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC2, cntxtDtls, user,fnm, function (err, results) {
                    for (var i = 0; i < data.length; i++) {
                        var QRY_TO_EXEC2 = "insert into  usr_mnu_prfle_rel_t (app_id,usr_id,mnu_prfle_id,clnt_id,tnt_id) values ('" + data[i].app_id + "','" + usr_id.usrId + "','" + data[i].mnu_prfle_id + "','" + data[i].clnt_id + "','" + data[i].tnt_id + "');"
                        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC2, cntxtDtls, user,fnm, function (err, results) {
                            count++;
                            if (count == data.length) {
                                callback(err, results);
                                return;
                            }
                        });
                    }
                });
            } else {
                for (var i = 0; i < data.length; i++) {
                    var QRY_TO_EXEC2 = "insert into  usr_mnu_prfle_rel_t (app_id,usr_id,mnu_prfle_id,clnt_id,tnt_id) values ('" + data[i].app_id + "','" + usr_id.usrId + "','" + data[i].mnu_prfle_id + "','" + data[i].clnt_id + "','" + data[i].tnt_id + "');"
                    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC2, cntxtDtls, user,fnm, function (err, results) {
                        count++;
                        if (count == data.length) {
                            callback(err, results);
                            return;
                        }
                    });
                }
            }
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : allMenu_getProfles
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allusrMenu_getProfles = function (user, data, callback) {
    var fnm ="allusrMenu_getProfles"
    var QRY_TO_EXEC = "select m.mnu_prfle_id,mf.mnu_prfle_nm,m.app_id,u.usr_id from usr_mnu_prfle_rel_t  m  join usr_clnt_tnt_rel_t u on u.usr_id=m.usr_id join mnu_prfle_lst_t mf on mf.mnu_prfle_id=m.mnu_prfle_id where  u.clnt_id=' " + data.clnt_id + "' and u.tnt_id='" + data.tnt_id + "' and u.usr_id= '" + data.usrId + "' order by mnu_prfle_id;"
    console.log("In allusrMenu_getProfles")
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


// /*****************************************************************************
// * Function      : getUserPrfles
// * Description   : 
// * Arguments     : callback function
// ******************************************************************************/
// exports.getUserPrfles = function (usr_id, callback) {
//     var QRY_TO_EXEC = ` select mn.mnu_prfle_id,m.mnu_prfle_nm,mn.mnu_itm_id,mo.mnu_itm_nm,mn.sqnce_id,mn.dsble_in, ml.mnu_itm_nm as prnt_mnu_itm_nm 
//                         from mnu_prfle_lst_t m
//                         join mnu_prfle_itm_rel_t as mn on mn.mnu_prfle_id = m.mnu_prfle_id
//                         join mnu_itm_lst_t as mo on mo.mnu_itm_id = mn.mnu_itm_id 
//                         left join mnu_itm_lst_t as ml on  ml.mnu_itm_id = mn.mnu_itm_id
//                         LEFT JOIN usr_mnu_prfle_rel_t as p on m.mnu_prfle_id = p.mnu_prfle_id
//                         WHERE p.usr_id = ${usr_id} AND mo.a_in = 1
//                         ORDER BY mn.mnu_prfle_id,mn.mnu_itm_id`;
//     console.log(QRY_TO_EXEC);
//     if (callback && typeof callback == "function")
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     else
//         return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

/*****************************************************************************
* Function      : getMenuItems
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMenuItems = function (user, callback) {
    var fnm ="getMenuItems"
    var QRY_TO_EXEC = `select m.mnu_itm_id,m.mnu_itm_nm,m.mnu_itm_icn_tx,mn.mnu_prfle_id,mp.mnu_prfle_nm,mn.prnt_mnu_itm_id,mo.mnu_itm_nm as prnt_mnu_itm_nm,mo.mnu_itm_icn_tx as prnt_mnu_icn_tx,m.mnu_itm_url_tx, m.a_in   
    from mnu_itm_lst_t m
    join mnu_prfle_itm_rel_t as mn on mn.mnu_itm_id = m.mnu_itm_id
    join mnu_prfle_lst_t as mp on mp.mnu_prfle_id = mn.mnu_prfle_id
    left join mnu_itm_lst_t as mo on mo.mnu_itm_id = mn.prnt_mnu_itm_id
    GROUP BY m.mnu_itm_id`;
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
* Function      : updateUsrPrfle
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateUsrPrfle = function (user, data, callback) {
    var fnm ="updateUsrPrfle"
    var QRY_TO_EXEC = `UPDATE mnu_itm_lst_t set a_in=${data.act_in}
                        WHERE mnu_itm_id=${data.mnu_itm_id}`;
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
* Function      : getting menu items
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getMnuItmsMdl = function (user, data) {
    var fnm ="getMnuItmsMdl"
    var QRY_TO_EXEC = `SELECT a.mnu_itm_id,a.mnu_itm_nm,a.clnt_id,a.tnt_id,a.mnu_prfle_id,a.cmpnt_id,c.cmpnt_nm 
    FROM mnu_itm_lst_t a 
    JOIN cmpnt_lst_t c on a.cmpnt_id = c.cmpnt_id 
    where a.cmpnt_id=${data.cmpnt_id} and a.a_in=1
    ORDER BY a.mnu_itm_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : add menu items
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addMnuItmsMdl = function (user, data, callback) {
    var fnm ="addMnuItmsMdl"
    var QRY_TO_EXEC = "select mnu_itm_id,mnu_itm_nm from mnu_itm_lst_t where mnu_itm_url_tx is not null and  app_id = " + data.appId + " and a_in = 1;";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getting users for Menu Profiles 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getMnPrflusrs = function (user, data) {
    var fnm ="getMnPrflusrs"

    var where = '';
    if (data.mnu_prfle_id) {
        where = ` and mp.mnu_prfle_id= ${data.mnu_prfle_id}`
    }

    if (data.cmpnt_id) {
        where = ` and m.cmpnt_id =${data.cmpnt_id} `
    }

    var QRY_TO_EXEC = `select prfle_dshbd_url_tx,DISTINCT mp.mnu_prfle_id,mp.mnu_prfle_nm,m.mnu_itm_id, m.mnu_itm_nm, mpr.mnu_prfle_itm_rel_id,mpr.prnt_mnu_itm_id,pm.mnu_itm_nm as prnt_mnu_itm_nm, mk.kywrd_tx,m.cmpnt_id
    from mnu_prfle_lst_t mp
        join mnu_prfle_itm_rel_t mpr on mp.mnu_prfle_id=mpr.mnu_prfle_id
        join mnu_itm_lst_t m on m.mnu_itm_id=mpr.mnu_itm_id
        left join mnu_itm_lst_t pm on pm.mnu_itm_id=mpr.prnt_mnu_itm_id
    where mp.clnt_id = ${data.clnt_id} and mp.tnt_id =${data.tnt_id} and mp.a_in =1 and mpr.a_in =1 and m.a_in =1 ${where} order by mpr.sqnce_id`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : insertClntTntRelation
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertClntTntMnuRltn = function (user, usrId, usrDt, tntDtls, mnuDt, callback) {
    var fnm ="insertClntTntMnuRltn"
    var QRY_TO_EXEC = "insert into usr_mnu_prfle_rel_t(usr_id,mnu_prfle_id,app_id,clnt_id,tnt_id)values(" + usrId + "," + mnuDt.mnu_prfle_id + "," + mnuDt.app_id + "," + usrDt.clnt_id + "," + tntDtls.tnt_id + ")";
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : usermenu_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usermenu_getMdl = function (uerDtls, data) {
    var fnm ='usermenu_getMdl'
    console.log("uerDtls In usermenu_getMdl");
    console.log(uerDtls);
    var condition = ``;
    if (data.grp_id) {
        condition = `up.grp_id = ${data.grp_id}`;
    } else {
        condition = `up.mrcht_usr_id = ${data.user.mrcht_usr_id}`;
    }

    var QRY_TO_EXEC = `
    SELECT pf.prfle_nm as mnu_prfle_nm,   up.mnu_prfle_id, pm.mnu_itm_id, pm.prnt_mnu_itm_id, 
            mp.mnu_itm_nm as prnt_mnu_itm_nm, mi.mnu_itm_nm, mi.mnu_itm_icn_tx, CONCAT('admin', mi.mnu_itm_url_tx) as mnu_itm_url_tx, 
            mp.mnu_itm_icn_tx as prnt_mnu_icn_tx, pm.sqnce_id, CONCAT('admin', prfle_dshbd_url_tx) as prfle_dshbd_url_tx
    FROM mrcht_mnu_prfle_rel_t up 
        JOIN prfle_lst_t pf on pf.prfle_id = up.mnu_prfle_id 
        JOIN mnu_prfle_itm_rel_t pm on pm.mnu_prfle_id = up.mnu_prfle_id
        JOIN mnu_itm_lst_t mi on mi.mnu_itm_id = pm.mnu_itm_id
        LEFT JOIN mnu_itm_lst_t mp on mp.mnu_itm_id = pm.prnt_mnu_itm_id 
    WHERE ${condition} AND mi.cmpnt_id = ${data.user.cmpnt_id} AND mi.a_in = 1 AND pm.a_in = 1
    GROUP BY mi.mnu_itm_id ORDER BY  pm.sqnce_id;
    `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, data.user,fnm);


};

/*****************************************************************************
* Function      : get_userMenuByPrfleID
* Description   : 
* Arguments     : callback function
* Change History :
* 13/02/2020    - Sunil Mulagada - Initial Function(Created to get the menu profile from session)
*
******************************************************************************/
exports.get_userMenuByPrfleID = function (userDtls, data) {
    var fnm = 'get_userMenuByPrfleID'
    var QRY_TO_EXEC = `SELECT pf.prfle_nm as mnu_prfle_nm,   pf.prfle_id, pm.mnu_itm_id, pm.prnt_mnu_itm_id, 
                            mp.mnu_itm_nm as prnt_mnu_itm_nm, mi.mnu_itm_nm, mi.mnu_itm_icn_tx, CONCAT('admin', mi.mnu_itm_url_tx) as mnu_itm_url_tx, 
                            mp.mnu_itm_icn_tx as prnt_mnu_icn_tx, pm.sqnce_id, CONCAT('admin', prfle_dshbd_url_tx) as prfle_dshbd_url_tx
                        FROM prfle_lst_t pf 
                            JOIN mnu_prfle_itm_rel_t pm on pm.mnu_prfle_id = pf.prfle_id and pf.prfle_id =${userDtls.mnu_prfle_id}
                            JOIN mnu_itm_lst_t mi on mi.mnu_itm_id = pm.mnu_itm_id
                            LEFT JOIN mnu_itm_lst_t mp on mp.mnu_itm_id = pm.prnt_mnu_itm_id 
                        WHERE mi.cmpnt_id = ${data.user.cmpnt_id} and pm.a_in = 1
                        GROUP BY mi.mnu_itm_id ORDER BY  pm.sqnce_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, data.user, fnm);
};

/**************************************************************************************
* Controller     : Allmenus_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 22/01/2018    - Sekhar - Initial Function
*
***************************************************************************************/
exports.Allusrmenus_get = function (req, res) {
    var fnm = "Allusrmenus_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.allusrMenu_getProfles(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/*****************************************************************************
* Function      : userGrps_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.userGrps_getMdl = function (user) {
    var fnm ="userGrps_getMdl"

    var QRY_TO_EXEC = `SELECT * FROM
        usr_grp_rel_t WHERE usr_id=${user.mrcht_usr_id} ORDER BY grp_id;
    `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);


};



/*****************************************************************************
* Function      : updateAppLastRfrshMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateAppLastRfrshMdl = function (data, user) {
    var fnm ="updateAppLastRfrshMdl"

    var QRY_TO_EXEC = ` INSERT INTO app_last_rfrsh_dtl_t(
        app_lgn_usr_id,
        app_id,
        app_title,
        app_vrsn,
        app_psh_ntfy_tkn,
        app_lst_frsh_ts,
        i_ts)
        VALUES(
            ${data.app_lgn_usr_id},
            ${data.app_id},
            ${sqldb.MySQLConPool.escape(data.app_title)},
            '${data.app_vrsn}',
            '${data.app_psh_ntfy_tkn}',
            CURRENT_TIMESTAMP(),
            CURRENT_TIMESTAMP()
            ) ON DUPLICATE KEY UPDATE app_id = VALUES(app_id),
            app_title = VALUES(app_title),
            app_psh_ntfy_tkn =  VALUES(app_psh_ntfy_tkn),
            app_vrsn = VALUES(app_vrsn),
            app_lst_frsh_ts = CURRENT_TIMESTAMP(),
            u_ts = CURRENT_TIMESTAMP(); `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};




/*****************************************************************************
* Function      : getNotificationDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getNotificationDetailsMdl = function (data, user) {
    var fnm ="getNotificationDetailsMdl"

    var QRY_TO_EXEC = ` SELECT * FROM app_psh_ntfy_dtl_t WHERE app_id = ${data.app_id} AND ntfy_id  = ${data.ntfy_id} AND a_in = 1; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : getAllNotificationDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAllNotificationDetailsMdl = function (data, user) {
    var fnm ="getAllNotificationDetailsMdl"

    var QRY_TO_EXEC = ` 
    SELECT n.ntfy_hdr, n.ntfy_bdy, n.ntfy_img, n.ntfy_id, 
    CONCAT(DATE_FORMAT(r.ntfctn_ts,'%d %b %Y'), ', ', TIME_FORMAT(r.ntfctn_ts, '%h:%i %p')) AS ntfctn_ts,
    n.lnch_pg_url, n.lnch_pg_in  FROM app_pshntfy_usr_rel_t r
    JOIN app_psh_ntfy_dtl_t n on n.ntfy_id = r.ntfy_id
    WHERE r.app_lgn_usr_id = ${data.agent_id} AND r.pblsh_in = 1  `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : getAllNotificationDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getYoutubeVdesMdl = function (user) {
    var fnm ="getYoutubeVdesMdl"

    var QRY_TO_EXEC = `SELECT * FROM app_vdeo_lnk_dtl_t WHERE a_in = 1 ORDER BY vdeo_indx_ordr;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : getAgntAppLeftSideMenuMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAgntAppLeftSideMenuMdl = function (sde_mnu_prfl_id, user) {
 var fnm ="getAgntAppLeftSideMenuMdl"
    var QRY_TO_EXEC = `
    SELECT m.mnu_itm_id, m.mnu_itm_nm, m.mnu_dscn_tx,
    m.mnu_itm_icn_tx,	m.mnu_itm_url_tx, 1 as mnu_vw_in
    FROM prfle_lst_t p
    JOIN mnu_prfle_itm_rel_t mp on mp.mnu_prfle_id = p.prfle_id
    JOIN mnu_itm_lst_t m on m.mnu_itm_id = mp.mnu_itm_id
    WHERE p.prfle_id = ${sde_mnu_prfl_id} ORDER BY mp.sqnce_id; `;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


