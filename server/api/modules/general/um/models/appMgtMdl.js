// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');
/*****************************************************************************
* Function      : To change app profile name
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updateAppPrfle = function (user, params, data) {
    var fnm = "updateAppPrfle"
    var QRY_TO_EXEC = `UPDATE app_prfle_lst_t SET app_prfle_nm='${data.app_prfle_nm}',app_prfle_jsn_tx='${data.app_prfle_jsn_tx}', admn_in=${data.admn_in || null} WHERE app_prfle_id=${params.prfId};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : To change app profile name
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.updateAppPrflPrms = function (user, params, data) {
    var fnm = "updateAppPrflPrms"
    var where = ``;
    if (data.app_kywrds) {
        where = ` and app_kywrd_id in (${data.app_kywrds})`
    } else {
        where = ` and app_id = ${data.app_id}`
    }

    if (data.app_prfle_app_rel_id) {
        var QRY_TO_EXEC = `UPDATE app_prfle_app_rel_t SET c_in=${data.c_in}, r_in=${data.r_in}, u_in=${data.u_in}, d_in=${data.d_in},prnt_app_id=${data.prnt_app_id || 0}, sqnce_id=${data.sqnce_id || 1}, a_in=${data.a_in || 0} WHERE app_prfle_id=${params.prfId} ${where};`;
    } else {
        var QRY_TO_EXEC = `INSERT into app_prfle_app_rel_t (app_prfle_id, app_id, c_in, r_in, u_in, d_in, prnt_app_id, sqnce_id, a_in, i_ts)values( ${params.prfId},${data.app_id},${data.c_in}, ${data.r_in}, ${data.u_in},${data.d_in},${data.prnt_app_id || 0},${data.sqnce_id || 1},${data.a_in || 0},current_timestamp())`;
    }
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : to get app profile id based on app profile name 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getAppPrflId = function (user, data, callback) {
    var fnm = "getAppPrflId"
    var QRY_TO_EXEC = "select app_prfle_id from app_prfle_lst_t where app_prfle_nm = '" + data.appPrflNm + "' and clnt_id = '" + data.clnt_id + "' and tnt_id = '" + data.tnt_id + "';";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : creating new app profile 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.chckAdmnAppPrfl = function (user, data, callback) {
    var fnm = "chckAdmnAppPrfl"

    var QRY_TO_EXEC = `select * from app_prfle_lst_t where clnt_id = ${data.clnt_id} and tnt_id=${data.tnt_id} and admn_in=1 and a_in =1;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : creating new app profile 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.postCreateAppPrf = function (user, data, admn_in, callback) {
    var fnm = "postCreateAppPrf"

    var QRY_TO_EXEC = "insert into app_prfle_lst_t(app_prfle_nm,i_ts,clnt_id,tnt_id,admn_in)values('" + data.appPrflNm + "',current_timestamp()," + data.clnt_id + "," + data.tnt_id + "," + admn_in + ");";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : assigning app to new app profile
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.appsFornewAppPrf = function (user, appPrflId, data, callback) {
    var fnm = "appsFornewAppPrf"
    var QRY_TO_EXEC = `INSERT INTO app_prfle_app_rel_t (app_prfle_id, app_id, sqnce_id) VALUES (${appPrflId},${data.app_id},${data.sqnce_id})`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delete app profile
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.dltAppsFrmAppPrf = function (user, data, callback) {
    var fnm = "dltAppsFrmAppPrf"

    var QRY_TO_EXEC = `DELETE FROM app_prfle_app_rel_t WHERE app_prfle_id=${data} ;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : delete app profile
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.dltAppPrf = function (user, data, callback) {
    var fnm = "dltAppPrf"

    var QRY_TO_EXEC = `DELETE FROM app_prfle_lst_t WHERE app_prfle_id=${data}; DELETE FROM app_prfle_app_rel_t WHERE app_prfle_id=${data} ;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getting app names
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.assignAppPrfToUsrMdl = function (user, appPrflId, user_data, callback) {
    var fnm = "assignAppPrfToUsrMdl"

    var QRY_TO_EXEC = "UPDATE usr_lst_t SET app_prfle_id=" + appPrflId + " WHERE usr_id=" + user_data.usr_id + ";";

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function      : allDstPrfl_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allDstPrfl_getMdl = function (user, data, callback) {
    var fnm = "allDstPrfl_getMdl"
    if (data.tnt_id) {
        where = `where ap.clnt_id =` + data.clnt_id + ` and ap.tnt_id = ${data.tnt_id}`;
    } else {
        where = `where ap.clnt_id = ${data.clnt_id}`;
    }
    var QRY_TO_EXEC = `select ap.app_prfle_id,ap.app_prfle_nm
                        from app_prfle_lst_t as ap
                        ${where} order by ap.app_prfle_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getting app names
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getAppsMdl = function (user, data) {
    var fnm = "getAppsMdl"
    var QRY_TO_EXEC = `SELECT a.app_id,a.app_nm,a.clnt_id,a.tnt_id,a.mnu_prfle_id,a.cmpnt_id,c.cmpnt_nm 
    FROM app_lst_t a 
    JOIN cmpnt_lst_t c on a.cmpnt_id = c.cmpnt_id 
    where a.cmpnt_id=${data.cmpnt_id} and a.a_in=1
    ORDER BY a.app_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getting app names
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.addAppMdl = function (user, reqBody, data) {
    var fnm = "addAppMdl"
    var QRY_TO_EXEC = `INSERT INTO app_lst_t(app_nm,app_lgo_tx,app_url_tx,clnt_id,tnt_id,cmpnt_id,hdr_in,mnu_prfle_id,a_in,i_ts)VALUES('${data.app_nm}',${data.app_lgo_tx || null},${data.app_url_tx || null},${reqBody.clnt_id},${reqBody.tnt_id},${reqBody.cmpnt_id},${data.hdr_in || 0},${data.mnu_prfle_id || 0},${data.a_in}, current_timestamp());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getting users for App Profiles 
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.getAppPrflusrs = function (user, data) {
    var fnm = "getAppPrflusrs"

    var where = '';
    if (data.app_prfle_id) {
        where = ` and ap.app_prfle_id= ${data.app_prfle_id}`
    }

    if (data.cmpnt_id) {
        where = ` and a.cmpnt_id =${data.cmpnt_id} `
    }

    var QRY_TO_EXEC = `select DISTINCT ap.app_prfle_id,ap.app_prfle_nm,a.app_id, a.app_nm, a.app_lgo_tx,apr.app_prfle_app_rel_id,apr.prnt_app_id,pa.app_nm as prnt_app_nm,pa.app_lgo_tx as prnt_app_lgo_tx,  apr.dsble_in,apr.app_kywrd_id,apr.r_in, apr.u_in,apr.d_in,apr.c_in , apr.a_in,a.cmpnt_id
    from app_prfle_lst_t ap
    join app_prfle_app_rel_t apr on ap.app_prfle_id=apr.app_prfle_id
    join app_lst_t a on a.app_id=apr.app_id
    left join app_lst_t pa on pa.app_id=apr.prnt_app_id
    left join app_kywrd_lst_t ak on ak.app_kywrd_id=apr.app_kywrd_id
	where ap.clnt_id = ${data.clnt_id} and ap.tnt_id =${data.tnt_id} and ap.a_in =1 and apr.a_in =1 and a.a_in =1 ${where} order by apr.sqnce_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : userUrlAccess_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.userUrlAccess_getMdl = function (user, usrDt, callback) {
    var fnm = "userUrlAccess_getMdl"
    var QRY_TO_EXEC = `select a.app_url_tx,mi.mnu_itm_url_tx
                        from usr_clnt_tnt_rel_t u
                        join app_prfle_lst_t ap on ap.app_prfle_id= u.app_prfle_id
                        join app_prfle_app_rel_t app on app.app_prfle_id = ap.app_prfle_id
                        join app_lst_t a on a.app_id = app.app_id
                        join usr_mnu_prfle_rel_t um on um.usr_id = u.usr_id
                        join mnu_prfle_lst_t mp on mp.mnu_prfle_id = um.mnu_prfle_id and mp.app_id = a.app_id
                        join mnu_prfle_itm_rel_t mpi on mpi.mnu_prfle_id = mp.mnu_prfle_id
                        join mnu_itm_lst_t mi on mi.mnu_itm_id = mpi.mnu_itm_id
                        where u.usr_id = `+ usrDt.usrId + ` and u.clnt_id = ` + usrDt.clnt_id + ` and u.tnt_id = ` + usrDt.tnt_id + ` and mi.a_in <> 0 order by mi.app_id,mi.mnu_itm_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : allPrfl_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.allPrfl_getMdl = function (user, usrDt, callback) {
    var fnm = "allPrfl_getMdl"
    var QRY_TO_EXEC = `select ap.app_prfle_id,ap.app_prfle_nm,a.app_id,a.mnu_prfle_id, ap.admn_in
                        from app_prfle_lst_t ap 
                        left join app_prfle_app_rel_t apa on apa.app_prfle_id=ap.app_prfle_id 
                        left join app_lst_t a on apa.app_id=a.app_id 
                        where ap.clnt_id =`+ usrDt.clnt_id + ` and ap.tnt_id = ` + usrDt.tnt_id + ` order by ap.app_prfle_id,a.app_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : userappsLst_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.userappsLst_getMdl = function (user, usrDt, callback) {
    var fnm = "userappsLst_getMdl"
    if (usrDt.tnt_id.indexOf(",") > -1) {
        var where = ` where u.usr_id =` + usrDt.usrId + ` and u.clnt_id = ` + usrDt.clnt_id + ` and tnt.tnt_id in ( ` + usrDt.tnt_id + ` ) and a.a_in =1 and a.cmpnt_id =` + user.cmpnt_id + ` order by apr.sqnce_id;`;
    } else {
        var where = ` where u.usr_id =` + usrDt.usrId + ` and u.clnt_id = ` + usrDt.clnt_id + ` and tnt.tnt_id = ` + usrDt.tnt_id + `  and a.a_in =1 and a.cmpnt_id =` + user.cmpnt_id + ` order by apr.sqnce_id;`;
    }
    var QRY_TO_EXEC = `select DISTINCT ap.app_prfle_id,a.app_id, a.app_nm, a.app_url_tx, a.app_lgo_tx, a.hdr_in,apr.prnt_app_id,pa.app_nm as prnt_app_nm, apr.dsble_in,
                            apr.r_in, apr.u_in,apr.d_in,apr.c_in 
                        from usr_grp_rle_rel_t as gr
                            join rles_lst_t as r on r.rle_id = gr.rle_id
                            join rle_prfle_rel_t as rp on rp.rle_id = r.rle_id
                            join app_prfle_lst_t ap on ap.app_prfle_id = rp.app_prfle_id
                            join app_prfle_app_rel_t apr on ap.app_prfle_id=apr.app_prfle_id
                            join app_lst_t a on a.app_id=apr.app_id
                            left join app_lst_t pa on pa.app_id=apr.prnt_app_id
                            left join app_kywrd_lst_t ak on ak.app_kywrd_id=apr.app_kywrd_id `+ where;
    // console.log("userappsLst_getMdl");
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
