// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getUserStpPrfle
* Description   : 
* Arguments     : callback function
* Change History :
* 23/07/2019    -  Srujana Mulagada - Initial Function
* 13/02/2020    -  Sunil Mulagada - Changed the qiery to get the setup profile from session
******************************************************************************/
exports.getUserStpPrfle = function (user, callback) {

    var fnm = "getUserStpPrfle"
    // console.log("getUserStpPrfle")
    var QRY_TO_EXEC = ` SELECT sg.sqnc_id, sg.stp_grp_id,sg.stp_grp_nm,so.stp_opt_id,so.stp_opt_nm,so.stp_opt_icn_tx,so.stp_opt_url_tx 
                        from stp_prfle_opt_rel_t as sr 
                        JOIN stp_opt_lst_t as so on so.stp_opt_id=sr.stp_opt_id AND sr.stp_prfle_id=${user.stp_prfle_id}
                        JOIN stp_grp_rel_t as s on s.stp_opt_id=sr.stp_opt_id
                        JOIN stp_grp_lst_t as sg on sg.stp_grp_id=s.stp_grp_id
                        WHERE sr.a_in=1 and sg.a_in=1 ORDER BY sr.stp_opt_id`
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
* Function       : chnageLogIndMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.chnageLogIndMdl = function (data, user, callback) {
    var fnm = "chnageLogIndMdl"
    // console.log(data)
    var QRY_TO_EXEC = ` UPDATE mrcht_usr_lst_t set chng_lg_ind = ${data.chng_lg_ind} WHERE mrcht_usr_id = ${data.mrcht_usr_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : ltstChngdLgDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.ltstChngdLgDataMdl = function (user) {
    var fnm = "ltstChngdLgDataMdl"

    var QRY_TO_EXEC = `SELECT  DATE_FORMAT(chng_lg_dt,'%d-%b-%Y') as chng_lg_dt,chng_lg_txt FROM chng_lg_dtl_t WHERE chng_lg_ind = 1 ORDER BY chng_lg_dt DESC ;`;
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : allChngdLgDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.allChngdLgDataMdl = function (cmpnt_id, user) {
    var fnm = "allChngdLgDataMdl"
    var condition = ``;
    if (cmpnt_id != 0) {
        condition = `AND c.cmpnt_id = ${cmpnt_id}`
    } else {
        condition = ``;
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY vrsn_nu  desc)as sno, DATE_FORMAT(c.chng_lg_dt,'%d/%m/%Y') as chng_lg_dt,
    c.chng_lg_txt, c.chng_lg_id,c.vrsn_nu ,c.ctgry_id,c.cmpnt_id, cm.cmpnt_nm,cl.ctgry_nm FROM chng_lg_dtl_t as c
    join chng_lg_ctgry_dtl_t cl on cl.ctgry_id =  c.ctgry_id 
    join cmpnt_lst_t cm on cm.cmpnt_id =  c.cmpnt_id 
    WHERE c.a_in=1  ${condition}
    ORDER BY   vrsn_nu desc `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : chngeLgCtgryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.chngeLgCtgryMdl = function (user) {
    var fnm = "chngeLgCtgryMdl"
    // console.log(ste_nm,user)
    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY ctgry_id)as sno,ctgry_id,ctgry_nm from chng_lg_ctgry_dtl_t where a_in=1`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : chngeLgCmpntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.chngeLgCmpntMdl = function (user) {
    var fnm = "chngeLgCmpntMdl"
    // console.log(ste_nm,user)
    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY cmpnt_id)as sno,cmpnt_id,cmpnt_nm from cmpnt_lst_t where a_in=1`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};





/*****************************************************************************
* Function       : inschngelogMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.inschngelogMdl = function (data, user, callback) {
    var fnm = "inschngelogMdl"
    // console.log(data);
    var count = 0;
    for (var i = 0; i < data.dsctn_txt.length; i++) {
        var QRY_TO_EXEC = "INSERT INTO chng_lg_dtl_t (chng_lg_dt,chng_lg_txt,vrsn_nu,ctgry_id, cmpnt_id, chng_lg_ind,a_in, i_ts) VALUES ('" + data.chng_lg_dt + "','" + data.dsctn_txt[i].descriptiontxt + "','" + data.vrsn_nu + "','" + data.ctgry_id + "','" + data.cmpnt_id + "',1,1,CURRENT_TIMESTAMP());";
        // console.log(QRY_TO_EXEC);

        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
        count++;
        // console.log(count,data.dsctn_txt.length)
        if (count == data.dsctn_txt.length) {
            return;
        }
    }
};



/*****************************************************************************
* Function       : delchngeloglMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delchngeloglMdl = function (chng_lg_id, user, callback) {
    var fnm = "delchngeloglMdl"
    // console.log(chng_lg_id)
    var QRY_TO_EXEC = `UPDATE chng_lg_dtl_t SET a_in =0, chng_lg_ind = 0, d_in=1, d_ts=CURRENT_TIMESTAMP() WHERE chng_lg_id= ${chng_lg_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updchangelogMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updchangelogMdl = function (data, user, callback) {
    var fnm = "updchangelogMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE chng_lg_dtl_t SET a_in =1, chng_lg_txt='${data.data.chng_lg_txt}',vrsn_nu ='${data.data.vrsn_nu}',ctgry_id='${data.data.ctgry_id}', u_ts=CURRENT_TIMESTAMP() WHERE chng_lg_id= ${data.data.chng_lg_id};`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function       : insdeprtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insdeprtMdl = function (data, user, callback) {
    var fnm = "insdeprtMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO mrcht_dprts_lst_t (dprt_nm,a_in, i_ts) VALUES ('" + data.data.dprt_nm + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : upddepMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.upddepMdl = function (data, user, callback) {
    var fnm = "upddepMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_dprts_lst_t SET dprt_nm='${data.data.dprt_nm}', u_ts=CURRENT_TIMESTAMP() WHERE dprt_id= ${data.data.dprt_id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : deldepMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deldepMdl = function (dprt_id, user, callback) {
    var fnm = "deldepMdl"
    // console.log(dprt_id)
    var QRY_TO_EXEC = `UPDATE mrcht_dprts_lst_t SET a_in = 0, d_ts=CURRENT_TIMESTAMP() WHERE dprt_id= ${dprt_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getdeprtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getdeprtMdl = function (user) {
    var fnm = "getdeprtMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY dprt_id) sno FROM mrcht_dprts_lst_t WHERE a_in =1`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insdesgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insdesgnMdl = function (data, user, callback) {
    var fnm = "insdesgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO mrcht_dsgn_lst_t (dsgn_nm,dprt_id, a_in, i_ts) VALUES ('" + data.data.dsgn_nm + "','" + data.data.dprt_id + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : upddesgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.upddesgnMdl = function (data, user, callback) {
    var fnm ="upddesgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_dsgn_lst_t SET dsgn_nm='${data.data.dsgn_nm}',dprt_id ='${data.data.dprt_id}', u_ts=CURRENT_TIMESTAMP() WHERE dsgn_id= ${data.data.dsgn_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : deldesgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deldesgnMdl = function (dsgn_id, user, callback) {
    var fnm = "deldesgnMdl"
    // console.log(dsgn_id)
    var QRY_TO_EXEC = `UPDATE mrcht_dsgn_lst_t SET a_in =0,d_in=1, d_ts=CURRENT_TIMESTAMP() WHERE dsgn_id= ${dsgn_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getdesgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getdesgnMdl = function (user) {
    var fnm = "getdesgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY dsgn_id) sno,m.*,md.dprt_nm FROM mrcht_dsgn_lst_t m
                        LEFT join mrcht_dprts_lst_t as md on md.dprt_id = m.dprt_id
                        WHERE m.a_in=1;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function       : inslctnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.inslctnMdl = function (data, user, callback) {
    var fnm = "inslctnMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO lctn_lst_t (lctn_nm, lat, lng, a_in, i_ts) VALUES ('" + data.data.lctn_nm + "','" + data.data.lat + "','" + data.data.lng + "',1,CURRENT_TIMESTAMP());";
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updlctnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updlctnMdl = function (data, user, callback) {
    var fnm = "updlctnMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE lctn_lst_t SET lctn_nm='${data.data.lctn_nm}',lat='${data.data.lat}',lng='${data.data.lng}', u_ts=CURRENT_TIMESTAMP() WHERE lctn_id= ${data.data.lctn_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : dellctnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.dellctnMdl = function (lctn_id, user, callback) {
    var fnm= "dellctnMdl"
    // console.log(lctn_id)
    var QRY_TO_EXEC = `UPDATE lctn_lst_t SET a_in =0,d_in=1, d_ts=CURRENT_TIMESTAMP() WHERE lctn_id= ${lctn_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getlctnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getlctnMdl = function (user) {
    // console.log(data)
    var fnm = "getlctnMdl"
    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY lctn_id) sno FROM lctn_lst_t WHERE a_in =1 `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insemplyMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insemplyMdl = function (data, user) {
    var fnm = "insemplyMdl"
    // console.log(data)
    // console.log(user)
    var QRY_TO_EXEC = "INSERT INTO mrcht_emp_dtl_t (mrcht_emp_nm, mbl_nu, eml_tx,addrs_tx,dprts_id,dob_dt,adhr_nu,dsgn_id,crte_usr_id,gndr_id, dstrt_id, mndl_id, svm_id, a_in, i_ts) VALUES ('" + data.data.mrcht_emp_nm + "','" + data.data.mbl_nu + "','" + data.data.eml_tx + "','" + data.data.addrs_tx + "','" + data.data.dprts_id + "','" + data.data.dob_dt + "','" + data.data.adhr_nu + "','" + data.data.dsgn_id + "','" + user.user_id + "','" + data.data.gndr_id + "','" + data.data.dstrt_id + "','" + data.data.mndl_id + "','" + data.data.svm_id + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updemplyMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updemplyMdl = function (data, user) {
    var fnm = "updemplyMdl"
    console.log(user)
    console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_emp_dtl_t SET mrcht_emp_nm ='${data.data.mrcht_emp_nm}', mbl_nu ='${data.data.mbl_nu}', eml_tx ='${data.data.eml_tx}',addrs_tx ='${data.data.addrs_tx}',dprts_id ='${data.data.dprts_id}',dob_dt ='${data.data.dob_dt}',adhr_nu ='${data.data.adhr_nu}',dsgn_id ='${data.data.dsgn_id}',updt_usr_id='${user.user_id}',gndr_id ='${data.data.gndr_id}',dstrt_id ='${data.data.dstrt_id}',mndl_id ='${data.data.mndl_id}',u_ts=CURRENT_TIMESTAMP() WHERE mrcht_emp_id= ${data.data.mrcht_emp_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : delemplyMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delemplyMdl = function (emply_id, user, callback) {
    var fnm = "delemplyMdl"
    console.log(emply_id)
    var QRY_TO_EXEC = `UPDATE mrcht_emp_dtl_t SET a_in =0 WHERE mrcht_emp_id= ${emply_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getemplyMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getemplyMdl = function (user) {
    var fnm = "getemplyMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY mrcht_emp_id) sno,e.*,ds.dsgn_nm,ds.dsgn_id,dp.dprt_nm,d.dstrt_nm,m.mndl_nm,g.gndr_nm,DATE_FORMAT(e.dob_dt,'%d-%m-%Y') as dob_date FROM mrcht_emp_dtl_t e
                            join mrcht_dsgn_lst_t as ds on e.dsgn_id = ds.dsgn_id
                            join mrcht_dprts_lst_t as dp on e.dprts_id = dp.dprt_id 
                            join dstrt_lst_t as d on d.dstrt_id = e.dstrt_id
                            join mndl_lst_t as m on m.mndl_id = e.mndl_id 
                            left join gndr_lst_t as g on g.gndr_id = e.gndr_id
                            WHERE e.a_in =1;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insorgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insorgnMdl = function (data, user, callback) {
    var fnm = "insorgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO orgn_lst_t (orgn_nm, wb_url_tx, addr1_tx, city_nm, cntct_nm, cntct_ph, a_in, i_ts) VALUES ('" + data.data.orgn_nm + "','" + data.data.wb_url_tx + "','" + data.data.addr1_tx + "','" + data.data.city_nm + "','" + data.data.cntct_nm + "','" + data.data.cntct_ph + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updorgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updorgnMdl = function (data, user, callback) {
    var fnm = "updorgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE orgn_lst_t SET orgn_nm ='${data.data.orgn_nm}', wb_url_tx ='${data.data.wb_url_tx}', addr1_tx ='${data.data.addr1_tx}',city_nm ='${data.data.city_nm}',cntct_nm ='${data.data.cntct_nm}',cntct_ph ='${data.data.cntct_ph}', u_ts=CURRENT_TIMESTAMP() WHERE orgn_id= ${data.data.orgn_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : delorgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delorgnMdl = function (orgn_id, user, callback) {
    var fnm = "delorgnMdl"
    // console.log(orgn_id)
    var QRY_TO_EXEC = `UPDATE orgn_lst_t SET a_in =0, d_ts=CURRENT_TIMESTAMP() WHERE orgn_id= ${orgn_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getorgnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getorgnMdl = function (user) {
    var fnm = "getorgnMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY orgn_id) sno FROM orgn_lst_t WHERE a_in =1; `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getMyMrchtDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMyMrchtDtlsMdl = function (user) {
    var fnm = "getMyMrchtDtlsMdl"
    var QRY_TO_EXEC = ` SELECT m.mrcht_id, mrcht_nm, mrcht_dsply_nm, mrcht_acnt_nu, imge_url_tx AS mrcht_imge_url_tx, m.eml_tx, m.mble_ph, m.addr1_tx, m.addr2_tx, 
                        m.ste_id,ste_nm, m.cty_id, cty_nm 
                        FROM mrcht_lst_t m
                        LEFT JOIN mrcht_usr_rel_t mu ON m.mrcht_id = mu.mrcht_id
                        LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = mu.mrcht_usr_id
                        LEFT JOIN ste_lst_t s ON s.ste_id = m.ste_id
                        LEFT JOIN cty_lst_t c ON c.cty_id = m.cty_id
                        WHERE mu.mrcht_usr_id=${user.mrcht_usr_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getoutletMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoutletMdl = function (user) {
    var fnm = "getoutletMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY otlt_id) sno,o.*,oc.otlt_ctgry_nm FROM mrcht_otlt_lst_t o
                    join mrcht_otlt_ctgry_lst_t as oc on oc.otlt_ctgry_id = o.otlt_ctgry_id
                    WHERE o.a_in =1; `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insoutletMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insoutletMdl = function (data, user) {
    var fnm = "insoutletMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO mrcht_otlt_lst_t ( otlt_nm, otlt_ctgry_id, mrcht_id, crte_usr_id, a_in, i_ts) VALUES ('" + data.data.otlt_nm + "','" + data.data.otlt_ctgry_id + "','" + user.mrcht_id + "','" + user.user_id + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updoutletMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updoutletMdl = function (data, user) {
    var fnm = "updoutletMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_lst_t SET  otlt_nm ='${data.data.otlt_nm}', otlt_ctgry_id ='${data.data.otlt_ctgry_id}',updte_usr_id ='${user.user_id}',u_ts=CURRENT_TIMESTAMP() WHERE otlt_id= ${data.data.otlt_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deloutletMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deloutletMdl = function (otlt_id, user) {
    var fnm = "deloutletMdl"
    // console.log(otlt_id)
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_lst_t SET a_in =0,updte_usr_id ='${user.user_id}', d_ts=CURRENT_TIMESTAMP() WHERE otlt_id= ${otlt_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getoutletcategryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoutletcategryMdl = function (user) {
    var fnm = "getoutletcategryMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY otlt_ctgry_id) sno FROM mrcht_otlt_ctgry_lst_t WHERE a_in =1; `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insoutletcategoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insoutletcategoryMdl = function (data, user) {
    var fnm = "insoutletcategoryMdl"
    // console.log(data)
    var QRY_TO_EXEC = "INSERT INTO mrcht_otlt_ctgry_lst_t ( otlt_ctgry_nm, crte_usr_id, a_in, i_ts) VALUES ('" + data.data.otlt_ctgry_nm + "','" + user.user_id + "',1,CURRENT_TIMESTAMP());";
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updoutletcategoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updoutletcategoryMdl = function (data, user) {
    var fnm = "updoutletcategoryMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_ctgry_lst_t SET  otlt_ctgry_nm ='${data.data.otlt_ctgry_nm}', updte_usr_id ='${user.user_id}',u_ts=CURRENT_TIMESTAMP() WHERE otlt_ctgry_id= ${data.data.otlt_ctgry_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : deloutletcategoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deloutletcategoryMdl = function (otlt_ctgry_id, user) {
    var fnm = "deloutletcategoryMdl"
    // console.log(otlt_ctgry_id)
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_ctgry_lst_t SET a_in=0,updte_usr_id ='${user.user_id}',d_ts=CURRENT_TIMESTAMP() WHERE otlt_ctgry_id= ${otlt_ctgry_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getgndrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getgndrMdl = function (user) {
    var fnm = "getgndrMdl"
    // console.log(data)
    var QRY_TO_EXEC = `SELECT * from gndr_lst_t WHERE a_in =1 order by gndr_id; `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : getMandalLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMandalLstMdl = (dstrt_id, user) => {
    var fnm = "getMandalLstMdl"

    var QRY_TO_EXEC = ` SELECT dstrt_id, mndl_id,mndl_nm, mndl_cd, mndl_cncs_id, gsvm_mndl_cd FROM mndl_lst_t where a_in = 1 and dstrt_id = ${dstrt_id} order by mndl_nm; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)
}
/*****************************************************************************
* Function      : getSvmLstMdl
* Description   : 
* Arguments     : callback function
********************************************************************************************************************************************* */
exports.getSvmLstMdl = (mndl_id, user) => {
    var fnm = "getSvmLstMdl"
    var QRY_TO_EXEC = `select * from svm_lst_t where mndl_id=${mndl_id} `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)
}



/*****************************************************************************
* Function       : getusrlstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getusrlstMdl = function (user) {
    var fnm = "getusrlstMdl"
    // console.log(user)
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY mu.mrcht_usr_id) sno, mu.mrcht_usr_id,mu.fst_nm,mu.lst_nm,mu.mbl_nu,mu.addrs_tx,mu.eml_tx,md.dsgn_nm,mu.prfle_usr_img_url_tx
                        ,mur.mrcht_id,dp.dprt_nm,mu.orgn_id,o.orgn_nm,mu.otlt_id,mo.otlt_nm,mu.mrcht_usr_nm,mu.dsgn_id,mu.dprts_id as dprt_id,mmp.mnu_prfle_id
                        ,CASE WHEN sp.prfle_ctgry_cd = 'STP' THEN sp.prfle_nm  ELSE '' END as stp_prfle_nm 
                        ,CASE WHEN mp.prfle_ctgry_cd = 'MNP' THEN mp.prfle_nm ELSE '' END as mnu_prfle_nm
                        ,CASE WHEN rp.prfle_ctgry_cd = 'RPTP' THEN rp.prfle_nm ELSE '' END as rpt_prfle_nm
                        ,msp.stp_prfle_id ,mrp.rpt_prfle_id,mu.usr_ctgry_id,usr_ctgry_nm
                        ,mp.prfle_ctgry_cd
                        FROM mrcht_usr_lst_t mu
                        LEFT join mrcht_usr_rel_t as mur on mur.mrcht_usr_id = mu.mrcht_usr_id
                        LEFT JOIN mrcht_mnu_prfle_rel_t as mmp on mmp.mrcht_usr_id = mur.mrcht_usr_id
                        LEFT JOIN mrcht_stp_prfle_rel_t as msp on msp.mrcht_usr_id = mur.mrcht_usr_id
                        LEFT JOIN mrcht_rpt_prfle_rel_t as mrp on mrp.mrcht_usr_id = mur.mrcht_usr_id
                        LEFT JOIN orgn_lst_t as o on o.orgn_id = mu.orgn_id
                        LEFT JOIN mrcht_otlt_lst_t as mo on mo.otlt_id = mu.otlt_id
                        left join prfle_lst_t as mp on mp.prfle_id = mmp.mnu_prfle_id
                        left join prfle_lst_t as sp on sp.prfle_id = msp.stp_prfle_id
                        left join prfle_lst_t as rp on rp.prfle_id = mrp.rpt_prfle_id
                        left join mrcht_lst_t as m on m.mrcht_id = mur.mrcht_id
                        LEFT JOIN mrcht_dsgn_lst_t as md on md.dsgn_id = mu.dsgn_id
                        left join mrcht_dprts_lst_t as dp on dp.dprt_id = mu.dprts_id
                        JOIN usr_ctgry_lst_t uc ON uc.usr_ctgry_id = mu.usr_ctgry_id
                        where mur.mrcht_id =${user.mrcht_id} and mur.a_in=1 and mu.a_in=1 GROUP BY mu.mrcht_usr_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getoptionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getoptionsMdl = function (cmpnt_id, user) {
    var fnm = "getoptionsMdl"
    // var QRY_TO_EXEC = `select m.mnu_itm_id,m.mnu_itm_nm,m.mnu_itm_icn_tx,m.mnu_itm_url_tx,m.a_in,DATE_FORMAT(m.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp
    //                     ,DATE_FORMAT(m.u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp,pc.prfle_ctgry_id FROM mnu_itm_lst_t m
    //                     JOIN mnu_prfle_itm_rel_t pi on pi.mnu_itm_id = m.mnu_itm_id
    //                     join prfle_lst_t as p on p.prfle_id = pi.mnu_prfle_id
    //                     JOIN prfle_ctgry_lst_t as pc on pc.prfle_ctgry_cd = p.prfle_ctgry_cd
    //                     WHERE m.a_in =1 and p.prfle_ctgry_cd='MNP' and p.mrcht_id =${user.mrcht_id}
    //                     GROUP BY m.mnu_itm_id`;
    // var condition =``
    // if(cmpnt_id ){
    //     condition = `AND cmpnt_id = ${cmpnt_id}`
    // } else {
    //     condition =``
    // }
    var QRY_TO_EXEC = `select mnu_itm_id,mnu_itm_nm,mnu_itm_icn_tx,mnu_itm_url_tx,a_in,DATE_FORMAT(i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp,mnu_dscn_tx
    ,DATE_FORMAT(u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp
    FROM mnu_itm_lst_t 
    WHERE a_in =1 AND cmpnt_id = ${cmpnt_id}
    ORDER BY mnu_itm_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCmpntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCmpntMdl = function (user) {
    var fnm = "getCmpntMdl"
    var QRY_TO_EXEC = `SELECT cmpnt_id,cmpnt_nm,a_in from cmpnt_lst_t WHERE a_in =1;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getprflstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getprflstMdl = function (user) {
    var fnm = "getprflstMdl"
    // console.log(user);
    // var condition = ``;
    // var condition1;
    // var query = ``;
    // if (user.admn_in == 1) {
    //     condition = `AND m.mrcht_id=${user.mrcht_id}`;
    //     condition1 = `AND p.mrcht_usr_id=${user.user_id}`;
    // } else {
    //     condition = `AND p.mrcht_usr_id=${user.user_id}`;
    //     condition1 = ``;
    // }
    // if (user.admn_in == 1) {
    //     condition = ` mpl.mrcht_id=${user.mrcht_id}`;
    //     query = ``
    //     condition1 = ``;
    // } else {
    //     condition = ` p.mrcht_usr_id=${user.user_id}`;
    //     query = `JOIN mrcht_mnu_prfle_rel_t p ON p.mnu_prfle_id=mp.mnu_prfle_id `
    //     condition1 = `,p.a_in`;
    // }
    // var QRY_TO_EXEC = `SELECT m.prfle_id as mnu_prfle_id,m.prfle_nm as mnu_prfle_nm,ml.mnu_itm_id,ml.mnu_itm_nm,mp.a_in FROM
    //                     prfle_lst_t m
    //                     left JOIN mrcht_mnu_prfle_rel_t p ON p.mnu_prfle_id=m.prfle_id  ${condition1}
    //                     left JOIN mrcht_usr_rel_t u ON u.mrcht_usr_id=p.mrcht_usr_id
    //                     left JOIN mnu_prfle_itm_rel_t mp ON mp.mnu_prfle_id=m.prfle_id
    //                     left JOIN mnu_itm_lst_t ml ON ml.mnu_itm_id=mp.mnu_itm_id
    //                     WHERE  m.a_in=1 AND ml.a_in=1 and m.prfle_ctgry_cd='MNP' ${condition}
    //                     ORDER BY m.prfle_id`;

    var QRY_TO_EXEC = ` SELECT mpl.prfle_id AS mnu_prfle_id,mpl.prfle_nm as mnu_prfle_nm,mpl.prfle_dscrn_tx,mp.mnu_itm_id,so.mnu_itm_nm,so.mnu_itm_icn_tx,prnt_mnu_itm_id,mp.a_in,cmp.cmpnt_nm,so.cmpnt_id,
                        m.mrcht_usr_nm as crtd_usr_nm,DATE_FORMAT(mpl.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp,
                        m1.mrcht_usr_nm as upd_usr_nm,DATE_FORMAT(mpl.u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp,
                        mst.mnu_itm_nm AS prnt_mnu_itm_nm
                        from prfle_lst_t as mpl                       
                        LEFT JOIN mnu_prfle_itm_rel_t AS mp on mpl.prfle_id = mp.mnu_prfle_id
                        LEFT join mnu_itm_lst_t as so on so.mnu_itm_id = mp.mnu_itm_id
                        LEFT join mnu_itm_lst_t as mst on mst.mnu_itm_id = mp.prnt_mnu_itm_id
                        left JOIN cmpnt_lst_t as cmp on cmp.cmpnt_id = so.cmpnt_id
                        LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mpl.crte_usr_id
                        LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mpl.updte_usr_id
                        WHERE mpl.prfle_ctgry_cd='MNP' AND mpl.a_in = 1 
                        ORDER BY mp.mnu_prfle_id`;
    console.log(":::::::::QRY_TO_EXEC:::::::::::");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

// /*****************************************************************************
// * Function       : getrptprflstMdl
// * Description    : 
// * Arguments      : callback function
// ******************************************************************************/
// exports.getrptprflstMdl = function (user) {
//     // console.log(user);
//     var condition = ``;
//     var query = ``;
//     var condition1;
//     if (user.admn_in == 1) {
//         condition = ` AND m.mrcht_id=${user.mrcht_id}`;
//         query = ``
//         condition1 = ``;
//     } else {
//         condition = ` AND p.mrcht_usr_id=${user.user_id}`;
//         query = `JOIN mrcht_mnu_prfle_rel_t p ON p.mnu_prfle_id=r.mnu_prfle_id `
//         condition1 = `,p.a_in`;
//     }
//     var QRY_TO_EXEC = `SELECT r.mnu_prfle_id,m.mnu_prfle_nm,r.rpt_id,rp.rpt_nm,rg.grp_id as rpt_grp_id,rl.grp_nm as rpt_grp_nm,r.a_in from rpt_prfle_rel_t r
//                     join mnu_prfle_lst_t as m on m.mnu_prfle_id = r.mnu_prfle_id
//                     ${query}
//                     join rpt_lst_t as rp on rp.rpt_id = r.rpt_id
//                     JOIN rpt_grp_rel_t as rg on rg.rpt_id = rp.rpt_id
//                     join rpt_grp_lst_t as rl on rl.grp_id = rg.grp_id
//                     WHERE rp.a_in =1 AND m.a_in=1 ${condition}
//                     order by r.mnu_prfle_id;`;
//     // console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

/*****************************************************************************
* Function       : insusrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insusrMdl = function (data, user) {
    var fnm = "insusrMdl"
    let dtls = data[0].frntdata.data;
    console.log(data);
    console.log(dtls);
    dtls.usercategory_ky = ``;
    if(dtls.onbrd_in == 1){
        dtls.userName = dtls.agnt_Cd;
        dtls.firstName = dtls.agnt_nm;
        dtls.lastName = '';
        dtls.password = dtls.password;
        dtls.usercategory = dtls.usr_ctgry;
        dtls.usercategory_ky = dtls.agent_id;
        dtls.mobileNumber = dtls.officeAddress.ofce_mble_Nu;
        dtls.organisation = '';
        dtls.branches = '';
        dtls.designation = '';
        dtls.address = dtls.officeAddress.ofce_ara_nm;
        dtls.email = dtls.officeAddress.ofce_email;
        dtls.department ='';
    } 
    
    // return;
    var QRY_TO_EXEC = ` INSERT INTO mrcht_usr_lst_t (balance,install_charges,caf_1_to_100,caf_100_to_250,caf_250_to_500,caf_500_to_1000,caf_above_1000,mrcht_usr_nm, fst_nm,lst_nm, pswrd_encrd_tx,usr_ctgry_id,usr_ctgry_ky,mrcht_usr_imge_url_tx, mbl_nu,crte_usr_id, orgn_id , otlt_id, dsgn_id,dprts_id, addrs_tx, eml_tx, hyrchy_id, hyrchy_grp_id, a_in,prfle_usr_img_url_tx,pwd_chngd_in,i_ts) 
                        VALUES (0,60,2000,3000,5000,10000,15000,'${dtls.userName}','${dtls.firstName}','${dtls.lastName}',sha1('${dtls.password}'),'${dtls.usercategory}','${dtls.usercategory_ky}','${data[0].imgs3}','${dtls.mobileNumber}',${user.user_id},'${dtls.organisation}','${dtls.branches}','${dtls.designation}','${dtls.department}','${dtls.address}','${dtls.email}',1,1,1,'${data[0].imgs3}',1,CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : usrMrchtRelMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.usrMrchtRelMdl = function (mrcht_usr_id, user) {
    var fnm = "usrMrchtRelMdl"
    // console.log(mrcht_usr_id)
    var QRY_TO_EXEC = `INSERT INTO mrcht_usr_rel_t (mrcht_usr_id, mrcht_id, a_in,i_ts) VALUES ('${mrcht_usr_id}',${user.mrcht_id},1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : selectMnuuserMdl
* Description    : select user if already present for assigning menu profile
* Arguments      : callback function
******************************************************************************/
exports.selectMnuuserMdl = function (data, user) {
    var fnm = "selectMnuuserMdl"
    var QRY_TO_EXEC = `SELECT * from mrcht_mnu_prfle_rel_t m
                        join prfle_lst_t as p on p.prfle_id = m.mnu_prfle_id
                        WHERE m.mrcht_usr_id = ${data.mrcht_usr_id} and p.prfle_ctgry_cd ='MNP'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updMnuPrfleMdl
* Description    : update user menu profile
* Arguments      : callback function
******************************************************************************/
exports.updMnuPrfleMdl = function (mnu_prfle_id, data, user) {
    var fnm = "updMnuPrfleMdl"
    // console.log("update")
    // console.log(data);
    // console.log("update")
    // return;
    var QRY_TO_EXEC = `UPDATE mrcht_mnu_prfle_rel_t SET mnu_prfle_id = ${mnu_prfle_id},upd_usr_id ='${user.user_id}',d_ts=CURRENT_TIMESTAMP() WHERE mrcht_usr_id= ${data.mrcht_usr_id};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insmnuprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insmnuprofileMdl = function (data, user) {
    var fnm = "insmnuprofileMdl"
    let dtls = data.data;
    // console.log(user);
    var QRY_TO_EXEC = `INSERT INTO prfle_lst_t (prfle_nm,prfle_ctgry_cd,prfle_dscrn_tx, prfle_dshbd_url_tx,mrcht_id,crte_usr_id, a_in,i_ts) VALUES ('${dtls.prfle_nm}','MNP','${dtls.prfle_dscrn_tx}','${dtls.prfle_dshbd_url_tx}','${user.mrcht_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;
    // console.log("*******************************************************");
    // console.log(QRY_TO_EXEC);
    // console.log("***********************************************************");
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insmnuprfitmMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insmnuprfitmMdl = function (mnu_prf_id, data, user) {
    var fnm = "insmnuprfitmMdl"
    // if (data) {
        var QRY_TO_EXEC = ` INSERT into mnu_prfle_itm_rel_t(mnu_prfle_id,mnu_itm_id,crte_usr_id,prnt_mnu_itm_id,a_in,i_ts) VALUES(${mnu_prf_id},${data.mnu_itm_id},${user.mrcht_usr_id},0,1,CURRENT_TIMESTAMP())`;
        // var dlmtr = ' , ';
        // var valus_qry = ` values `;
        // var counter = 0;
        // var mnu_prf_id = mnu_prf_id
        // data.mnuOpts.filter((k) => {
        //     if (++counter == data.mnuOpts.length) {
        //         dlmtr = `; `
        //     }
        //     valus_qry += ` (${mnu_prf_id},${k.mnu_itm_id},${user.mrcht_usr_id},0,1,CURRENT_TIMESTAMP()) ${dlmtr}`
        // })
        // QRY_TO_EXEC += valus_qry;
        console.log(QRY_TO_EXEC)
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    // }
};

/*****************************************************************************
* Function       : asgnrleusrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnrleusrMdl = function (mrchtusr, data, user) {
    var fnm = "asgnrleusrMdl"
    console.log(mrchtusr)
    // return;
    if (data) {
        var QRY_TO_EXEC = ` INSERT into rle_mrcht_usr_rel_t(rle_id,mrcht_usr_id,crte_usr_id,a_in,i_ts)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var mrchtusr = mrchtusr
        data.roles_data.filter((k) => {
            if (++counter == data.roles_data.length) {
                dlmtr = `; `
            }
            valus_qry += ` (${k},'${mrchtusr.mrcht_usr_id}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        console.log(QRY_TO_EXEC)
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }
};

/*****************************************************************************
* Function       : asgnMnuPrfleMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnMnuPrfleMdl = function (mnu_prfle_id, data, user) {
    var fnm = "asgnMnuPrfleMdl"
    // console.log("+++++++++++++++++++++++");
    // console.log(data);
    // console.log(user);
    // console.log("+++++++++++++++++++++++");
    // return;
    var QRY_TO_EXEC = `INSERT INTO mrcht_mnu_prfle_rel_t (mrcht_usr_id, mnu_prfle_id,crt_usr_id,a_in,i_ts) VALUES ('${data.mrcht_usr_id}','${mnu_prfle_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;
    // var dlmtr = ' , ';
    // var valus_qry = ` values `;
    // var counter = 0;
    // var mnu_prf_id = data.mnu_prf_id;
    // var crte_usr_id =user.user_id
    // console.log(data);
    // data.usersLst.filter((k) => {
    //     if (++counter == data.usersLst.length) {
    //         dlmtr = `; `
    //     }
    //     valus_qry += ` (${k.mrcht_usr_id},${mnu_prf_id},${crte_usr_id},1,CURRENT_TIMESTAMP()) ${dlmtr}`
    // })
    // QRY_TO_EXEC += valus_qry;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : asgnReportPrfleMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnReportPrfleMdl = function (rpt_prfle_id, data, user) {
    var fnm = "asgnReportPrfleMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_rpt_prfle_rel_t (mrcht_usr_id, rpt_prfle_id,crt_usr_id,a_in,i_ts) VALUES ('${data.mrcht_usr_id}','${rpt_prfle_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : selectSetupserMdl
* Description    : select user if already present for assigning menu profile
* Arguments      : callback function
******************************************************************************/
exports.selectSetupserMdl = function (data, user) {
    var fnm = "selectSetupserMdl"
    var QRY_TO_EXEC = `SELECT * from mrcht_stp_prfle_rel_t m
                        join prfle_lst_t as p on p.prfle_id = m.stp_prfle_id
                        WHERE m.mrcht_usr_id = ${data.mrcht_usr_id} and p.prfle_ctgry_cd ='STP'`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updSetupPrfleMdl
* Description    : update user menu profile
* Arguments      : callback function
******************************************************************************/
exports.updSetupPrfleMdl = function (stp_prfle_id, data, user) {
    var fnm = "updSetupPrfleMdl"
    // console.log("update")
    // console.log(data);
    // console.log("update")
    // return;
    var QRY_TO_EXEC = `UPDATE mrcht_stp_prfle_rel_t SET stp_prfle_id = ${stp_prfle_id},upd_usr_id ='${user.user_id}',u_ts=CURRENT_TIMESTAMP() WHERE mrcht_usr_id= ${data.mrcht_usr_id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : asgnSetupPrfleMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnSetupPrfleMdl = function (stp_prfle_id, data, user) {
    var fnm = "asgnSetupPrfleMdl"
    // console.log("+++++++++++++++++++++++");
    // console.log(data);
    // console.log(user);
    // console.log("+++++++++++++++++++++++");
    // return;
    var QRY_TO_EXEC = `INSERT INTO mrcht_stp_prfle_rel_t (mrcht_usr_id, stp_prfle_id,crte_usr_id,a_in,i_ts) VALUES ('${data.mrcht_usr_id}','${stp_prfle_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;
    // var dlmtr = ' , ';
    // var valus_qry = ` values `;
    // var counter = 0;
    // var mnu_prf_id = data.mnu_prf_id;
    // var crte_usr_id =user.user_id
    // console.log(data);
    // data.usersLst.filter((k) => {
    //     if (++counter == data.usersLst.length) {
    //         dlmtr = `; `
    //     }
    //     valus_qry += ` (${k.mrcht_usr_id},${mnu_prf_id},${crte_usr_id},1,CURRENT_TIMESTAMP()) ${dlmtr}`
    // })
    // QRY_TO_EXEC += valus_qry;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : updusrprfMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updusrprfMdl = function (data, user) {
    var fnm = "updusrprfMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_mnu_prfle_rel_t SET mnu_prfle_id ='${data.mnu_prf_id}',upd_usr_id ='${user.user_id}',u_ts=CURRENT_TIMESTAMP() WHERE mrcht_usr_id= ${data.mrcht_usr_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : selectProfileMdl
* Description    : select user if already present for assigning menu profile
* Arguments      : callback function
******************************************************************************/
exports.selectProfileMdl = function (data, mnu_itm, user) {
    var fnm = "selectProfileMdl"
    var QRY_TO_EXEC = `SELECT * from mnu_prfle_itm_rel_t 
                        WHERE mnu_prfle_id = ${data.mnu_prfle_id} and mnu_itm_id =${mnu_itm.mnu_itm_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updmnuprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updmnuprofileMdl = function (data, user) {
    var fnm ="updmnuprofileMdl"
    console.log(data)
    var condition = ``;
    if (data.slctdOpt == true) {
        condition = `a_in =1`
    } else if (data.slctdOpt == false) {
        condition = `a_in =0`
    }
    //var QRY_TO_EXEC1 = `UPDATE mnu_prfle_itm_rel_t SET ${condition}, updte_usr_id = ${user.mrcht_usr_id}, u_ts=CURRENT_TIMESTAMP() WHERE mnu_prfle_id =${data.mnu_prfle_id} and mnu_itm_id= ${data.mnu_itm_id};`;
    //var QRY_TO_EXEC2 = `UPDATE prfle_lst_t SET  updte_usr_id = ${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id =${data.mnu_prfle_id};`;
    //var QRY_TO_EXEC = QRY_TO_EXEC1 + QRY_TO_EXEC2;
	var QRY_TO_EXEC = `UPDATE mnu_prfle_itm_rel_t SET ${condition}, updte_usr_id = ${user.mrcht_usr_id}, u_ts=CURRENT_TIMESTAMP() WHERE mnu_prfle_id =${data.mnu_prfle_id} and mnu_itm_id= ${data.mnu_itm_id};
    UPDATE prfle_lst_t SET  updte_usr_id = ${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id =${data.mnu_prfle_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : delmnuprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delmnuprofileMdl = function (prfle_id, user) {
    var fnm = "delmnuprofileMdl"
    var QRY_TO_EXEC = `UPDATE prfle_lst_t SET a_in=0,updte_usr_id=${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id=${prfle_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : selectStpProfileMdl
* Description    : select Profile if already present for assigning setup profile
* Arguments      : callback function
******************************************************************************/
exports.selectStpProfileMdl = function (data, user) {
    var fnm = "selectStpProfileMdl"
    var QRY_TO_EXEC = `SELECT * from stp_prfle_opt_rel_t 
                        WHERE stp_prfle_id = ${data.stp_prfle_id} and stp_opt_id =${data.stp_opt_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updsetupprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updsetupprofileMdl = function (data, user) {
    var fnm = "updsetupprofileMdl"
    // console.log(data);
    var condition = ``;
    if (data.slctdOpt == true) {
        condition = `a_in =1`
    } else if (data.slctdOpt == false) {
        condition = `a_in =0`
    }
    var QRY_TO_EXEC1 = `UPDATE stp_prfle_opt_rel_t SET ${condition}, updte_usr_id = ${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE stp_prfle_id =${data.stp_prfle_id} and stp_grp_id = ${data.stp_grp_id} and stp_opt_id= ${data.stp_opt_id};`;
    var QRY_TO_EXEC2 = `UPDATE prfle_lst_t SET  upd_usr_id = ${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id =${data.stp_prfle_id};`;
    var QRY_TO_EXEC = QRY_TO_EXEC1 + QRY_TO_EXEC2;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

// /*****************************************************************************
// * Function       : updreportprofileMdl
// * Description    : 
// * Arguments      : callback function
// ******************************************************************************/
// exports.updreportprofileMdl = function (data) {
//     // console.log(data);
//     var condition = ``;
//     if (data.slctdOpt == true) {
//         condition = `a_in =1`
//     } else if (data.slctdOpt == false) {
//         condition = `a_in =0`
//     }
//     var QRY_TO_EXEC = `UPDATE rpt_prfle_rel_t SET ${condition}, u_ts=CURRENT_TIMESTAMP() WHERE mnu_prfle_id =${data.mnu_prfle_id} and rpt_id= ${data.rpt_id};`;
//     // console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

/*****************************************************************************
* Function       : insSteMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insSteMdl = function (ste_nm, user) {
    var fnm = "insSteMdl"
    // console.log(ste_nm, user)
    // let dtls = data.data
    var QRY_TO_EXEC = `INSERT INTO ste_lst_t (ste_nm,crte_usr_id,a_in,i_ts) VALUES ('${ste_nm.ste_nm}',${user.user_id},1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getstatesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getstatesMdl = function (data, user) {
    var fnm = "getstatesMdl"
    console.log(data);
    var condition;
    if (data == undefined) {
        condition = ``;
    } else {
        condition = `AND ste_nm = '${data.ste_nm}'`;
    }
    // let dtls = data.data
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER (ORDER BY ste_id)as sno,ste_id,ste_nm 
                        from ste_lst_t 
                        where a_in=1 ${condition}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateStateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateStateMdl = function (data, user) {
    var fnm = "updateStateMdl"
    // console.log(data,user);
    // let dtls = data.data
    var QRY_TO_EXEC = `UPDATE ste_lst_t SET ste_nm='${data.ste_nm}',u_ts= CURRENT_TIMESTAMP(),updte_usr_id=${user.user_id} where ste_id=${data.id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deleteStateMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deleteStateMdl = function (ste_id, user) {
    var fnm="deleteStateMdl"
    // console.log(ste_id,user);
    // let dtls = data.data
    var QRY_TO_EXEC = `UPDATE ste_lst_t SET a_in=0,d_ts= CURRENT_TIMESTAMP(),updte_usr_id=${user.user_id} where ste_id=${ste_id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getDstrctsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrctsMdl = function (id, user) {
    var fnm = "getDstrctsMdl"
    console.log(id);
    var condition
    if (id == 0) {
        condition = '';
    }
    else {
        condition = `and d.ste_id=${id}`
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY d.dstrt_id)as sno,d.ste_id,d.dstrt_id ,d.dstrt_nm,s.ste_nm
    from 
    dstrt_lst_t as d JOIN
    ste_lst_t as s on s.ste_id = d.ste_id 
    WHERE d.a_in=1 ${condition}
    ORDER BY d.dstrt_nm ASC;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insDstrctsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insDstrctsMdl = function (data, user) {
    var fnm = "insDstrctsMdl"
    var QRY_TO_EXEC = `INSERT into dstrt_lst_t (ste_id,mrcht_id,dstrt_nm,crte_usr_id,i_ts) VALUES (${data.ste_id},${user.mrcht_id},'${data.dstrct_nm}',${user.user_id},CURRENT_TIMESTAMP())`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateDstrctsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateDstrctsMdl = function (data, user) {
    var fnm = "updateDstrctsMdl"
    var QRY_TO_EXEC = `UPDATE dstrt_lst_t SET dstrt_nm='${data.dstrct_nm}',ste_id=${data.id} ,updte_usr_id=${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE dstrt_id=${data.dstrct_id}`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : delDstrctsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delDstrctsMdl = function (data, user) {
    var fnm = "delDstrctsMdl"
    var QRY_TO_EXEC = `UPDATE dstrt_lst_t SET updte_usr_id=${user.user_id},a_in=0,d_ts=CURRENT_TIMESTAMP() WHERE dstrt_id=${data}`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : upduserMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.upduserMdl = function (data, user, mrcht_usr_id, imgData) {
    var fnm = "upduserMdl"
    console.log(mrcht_usr_id);
    var condition = ''
    var dtls;
    dtls = data.data
    if (dtls.password.length == 0) {
        condition = ``
    } else {
        condition = `pswrd_encrd_tx = sha1('${dtls.password}'),`
    }
    if (imgData == null || imgData == undefined) {
        FrmImgData = ``;
    } else {
        FrmImgData = `,prfle_usr_img_url_tx = '${imgData}'`
    }

    var QRY_TO_EXEC = `UPDATE mrcht_usr_lst_t SET mrcht_usr_nm='${dtls.userName}', fst_nm= '${dtls.firstName}',lst_nm= '${dtls.lastName}', ${condition} dsgn_id = '${dtls.designation}',addrs_tx ='${dtls.address}',mbl_nu = '${dtls.mobileNumber}',updte_usr_id= '${user.user_id}',orgn_id = '${dtls.organisation}',otlt_id = '${dtls.branches}',usr_ctgry_id = '${dtls.usercategory}',eml_tx ='${dtls.email}', dprts_id = '${dtls.department}', u_ts=CURRENT_TIMESTAMP() ${FrmImgData} WHERE mrcht_usr_id =${mrcht_usr_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : loginfoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.loginfoMdl = function (data, user) {
    var fnm = "loginfoMdl"
    let usr_id = ''
    let dt_jn = ''

    // console.log(data)

    if (user.admn_in == 1) {
        usr_id = ' ';
    } else {
        usr_id = `AND mu.mrcht_usr_id =${user.mrcht_usr_id}`
    }

    if (data.frm_dt && data.to_dt) {
        dt_jn = ` AND DATE(lh.i_ts) BETWEEN '${data.frm_dt}' AND '${data.to_dt}' `;
    }

    var QRY_TO_EXEC = `SELECT lh.app_typ, lh.sts_cd, DATE_FORMAT(lh.i_ts, '%Y/%m/%d  %h:%i') as lst_lgn_ts, u.fst_nm, u.mbl_nu, u.mrcht_usr_id,
    u.mrcht_usr_nm
    FROM mrcht_usr_lst_t u
    LEFT JOIN mrcht_lgn_hstry_dtl_t lh on u.mrcht_usr_id = lh.mrcht_usr_id ${dt_jn}
    LEFT JOIN dstrt_lst_t d on d.dstrt_id = u.hyrchy_grp_id
        join mrcht_usr_rel_t as mu on mu.mrcht_usr_id = u.mrcht_usr_id
    WHERE mu.mrcht_usr_id = ${user.mrcht_usr_id} ${usr_id}
    ORDER BY lh.i_ts desc`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : deluserMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.deluserMdl = function (data, user) {
    var fnm = "deluserMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mrcht_usr_lst_t SET a_in=0, d_ts=CURRENT_TIMESTAMP() WHERE mrcht_usr_id =${data}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : delprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delprofileMdl = function (data, user) {
    var fnm = "delprofileMdl"
    // console.log(data)
    var QRY_TO_EXEC = `UPDATE mnu_prfle_lst_t SET a_in=0, d_ts=CURRENT_TIMESTAMP() WHERE mnu_prfle_id =${data}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insMndlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insMndlsMdl = function (data, user) {
    var fnm = "insMndlsMdl"
    // console.log(data, user)
    var QRY_TO_EXEC = `INSERT INTO mndl_lst_t (ste_id,dstrt_id,mrcht_id,mndl_nm,crte_usr_id,i_ts) VALUES (${data.state_id},${data.District_id},${user.mrcht_id},'${data.Mandl_nm}',${user.user_id},CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getMndlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMndlsMdl = function (id, user) {
    var fnm = "getMndlsMdl"
    var condition
    if (id == 0) {
        condition = '';
    }
    else {
        condition = `and m.dstrt_id=${id}`
    }
    // console.log(data,user)
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY m.mndl_id)as sno, m.mndl_id,m.mndl_nm,m.mndl_nu,d.dstrt_id,d.dstrt_nm,s.ste_id,s.ste_nm from mndl_lst_t as m
    JOIN dstrt_lst_t as d on m.dstrt_id=d.dstrt_id
    JOIN ste_lst_t as s on s.ste_id = d.ste_id where m.a_in=1 ${condition}  ORDER BY m.mndl_nm ASC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updateMndlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateMndlsMdl = function (data, user) {
    var fnm = "updateMndlsMdl"
    // console.log(data, user)
    var QRY_TO_EXEC = `UPDATE mndl_lst_t SET mndl_nm='${data.mndl_nm}',updte_usr_id=${user.user_id} ,u_ts=CURRENT_TIMESTAMP() WHERE mndl_id= ${data.mndl_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : delMndlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delMndlsMdl = function (id, user) {
    var fnm = "delMndlsMdl"
    // console.log(id, user)
    var QRY_TO_EXEC = `UPDATE mndl_lst_t SET a_in=0,updte_usr_id=${user.user_id} ,d_ts=CURRENT_TIMESTAMP() WHERE mndl_id= ${id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getvlgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getvlgsMdl = function (mndl_id, dsrtct_id, user) {
    var fnm = "getvlgsMdl"
    var condition = ``;
    if (mndl_id == 0) {
        condition = `and dstrt_id = ${dsrtct_id}`;
    }
    else {
        condition = `and mndl_id= ${mndl_id} and dstrt_id = ${dsrtct_id}`
    }
    // var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY v.vlge_id)as sno,v.vlge_id,v.vlge_nm,m.mndl_id,m.mndl_nm,d.dstrt_id,d.dstrt_nm,s.ste_id,s.ste_nm from vlge_lst_t as v 
    // join mndl_lst_t as m on m.mndl_nu = v.mndl_id
    // JOIN dstrt_lst_t as d on d.dstrt_id = m.dstrt_id
    // JOIN ste_lst_t as s on s.ste_id = d.ste_id  
    // WHERE v.a_in=1 ${condition} ORDER BY v.vlge_id`;
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER (ORDER BY vlge_id) as sno,vlge_id,vlge_nm,vlge_nu
                        from vlge_lst_t as v
                         WHERE a_in=1 ${condition} ORDER BY vlge_nm ASC`;
                         console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insvlgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insvlgsMdl = function (data, user) {
    var fnm = "insvlgsMdl"
    // console.log(data, user)
    var QRY_TO_EXEC = `INSERT into vlge_lst_t (mndl_id,ste_id,dstrt_id,mrcht_id,vlge_nm,crte_usr_id,i_ts) VALUES(${data.Mandl_id},${data.state_id},${data.District_id},${user.mrcht_id},'${data.vilage_nm}',${user.user_id},CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updatevlgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updatevlgsMdl = function (data, user) {
    var fnm = "updatevlgsMdl"
    // console.log(data, user)
    var QRY_TO_EXEC = `UPDATE vlge_lst_t SET vlge_nm ='${data.vlg_nm}' , updte_usr_id=${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE vlge_id=${data.vlg_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : delvlgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delvlgsMdl = function (id, user) {
    var fnm= "delvlgsMdl"
    // console.log(id, user)
    var QRY_TO_EXEC = `UPDATE vlge_lst_t SET a_in =0 , updte_usr_id=${user.user_id},d_ts=CURRENT_TIMESTAMP() WHERE vlge_id=${id} `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCitiesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCitiesMdl = function (user) {
    var fnm = "getCitiesMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY c.cty_id)as sno, c.cty_id,c.cty_nm,d.dstrt_id,d.dstrt_nm,s.ste_id,s.ste_nm FROM cty_lst_t as c 
    JOIN dstrt_lst_t as d on c.dstrt_id=d.dstrt_id
    JOIN ste_lst_t as s on c.ste_id=s.ste_id WHERE c.a_in=1`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : insCityMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insCityMdl = function (data, user) {
    var fnm = "insCityMdl"
    var QRY_TO_EXEC = `INSERT into cty_lst_t (ste_id,dstrt_id,cty_nm,crte_usr_id,i_ts) VALUES(${data.state_id},${data.District_id},'${data.cty_nm}',${user.user_id},CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : UpdateCityMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.UpdateCityMdl = function (data, user) {
    var fnm = "UpdateCityMdl"
    var QRY_TO_EXEC = `UPDATE cty_lst_t SET cty_nm='${data.cty_nm}' ,updte_usr_id=${user.user_id} ,u_ts=CURRENT_TIMESTAMP() WHERE cty_id=${data.cty_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : delCityMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delCityMdl = function (id, user) {
    var fnm = "delCityMdl"
    var QRY_TO_EXEC = `UPDATE cty_lst_t SET a_in=0 ,updte_usr_id=${user.user_id} ,d_ts=CURRENT_TIMESTAMP() WHERE cty_id=${id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getPrflMdl
* Description    : 
* Arguments      : callback function
 ******************************************************************************/
exports.getPrflMdl = function (reqData, ctgrycd, user) {
    var fnm = "getPrflMdl"
    var QRY_TO_EXEC = ` SELECT * FROM prfle_lst_t 
                        where prfle_ctgry_cd ='${ctgrycd}' AND a_in=1 AND prfle_nm = '${reqData.prfle_nm}' AND mrcht_id ='${user.mrcht_id}'`;
    log.info(QRY_TO_EXEC, 0, cntxtDtls);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : setupPrflCrteMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.setupPrflCrteMdl = function (userData, prflItmData) {
    // console.log(prflItmData);
    var fnm = "setupPrflCrteMdl"
    var QRY_TO_EXEC = `INSERT INTO prfle_lst_t (prfle_nm, prfle_ctgry_cd, mrcht_id, crt_usr_id, admn_in,a_in, i_ts) VALUES ('${prflItmData.prfle_nm}', 'STP', '${userData.mrcht_id}', '${userData.mrcht_usr_id}' , '${prflItmData.admn_in}', 1, CURRENT_TIMESTAMP());`;
    log.info(QRY_TO_EXEC, 0, cntxtDtls);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, userData,fnm);
};
/*****************************************************************************
* Function       : setMnuItmRlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.setMnuItmRlMdl = function (userData, prfl_id, prflItmData) {
    var fnm = "setMnuItmRlMdl"
    // var cnt = 0;
    // console.log("+++++++++++++++++++prflItmData++++++++++++++++++++")
    // console.log(prflItmData)
    // console.log(prflItmData.stp_grp_id)
    // console.log("++++++++++++++prflItmData++++++++++++++")
    // return;
    // var set_optn_data = prflItmData.set_optn_id.setupOpts
    // for (var i = 0; i < set_optn_data.length; i++) {
    var QRY_TO_EXEC = `INSERT INTO stp_prfle_opt_rel_t (stp_grp_id, stp_prfle_id, stp_opt_id, crte_usr_id, a_in, i_ts) VALUES ('${prflItmData.stp_grp_id}', '${prfl_id}', '${prflItmData.stp_opt_id}', '${userData.mrcht_usr_id}' , 1, CURRENT_TIMESTAMP());`;
    log.info(QRY_TO_EXEC, 0, cntxtDtls);
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, userData,fnm);
    // cnt++;
    //     if (cnt == set_optn_data.length) {
    //         return;
    //     }
    // }
};
/*****************************************************************************
* Function : getsetupMdl
* Description :
* Arguments : callback function
******************************************************************************/
exports.getsetupMdl = function (user) {
    var fnm = "getsetupMdl"
    // console.log(user);
    var condition = ``;
    var query = ``;
    // var condition1;
    // if (user.admn_in == 1) {
    //     condition = ` mpl.mrcht_id=${user.mrcht_id}`;
    //     query = ``
    //     condition1 = ``;
    // } else {
    //     condition = ` p.mrcht_usr_id=${user.user_id}`;
    //     query = `JOIN mrcht_stp_prfle_rel_t p ON p.stp_prfle_id=mp.stp_prfle_id `
    //     condition1 = `,p.a_in`;
    // }
    // var QRY_TO_EXEC = `SELECT mp.stp_prfle_id,mpl.prfle_nm,mp.stp_grp_id,s.stp_grp_nm,mp.stp_opt_id,so.stp_opt_nm,so.stp_opt_icn_tx,mp.a_in,m.mrcht_usr_nm as crtd_usr_nm,DATE_FORMAT(mp.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp,
    // m1.mrcht_usr_nm as upd_usr_nm,DATE_FORMAT(mp.u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp ${condition1}
    // from stp_prfle_opt_rel_t mp
    // ${query}
    // JOIN prfle_lst_t as mpl on mpl.prfle_id = mp.stp_prfle_id
    // join stp_grp_lst_t as s on s.stp_grp_id = mp.stp_grp_id
    // join stp_opt_lst_t as so on so.stp_opt_id = mp.stp_opt_id
    // LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mp.crt_usr_id
    // LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mp.upd_usr_id
    // WHERE mpl.prfle_ctgry_cd='STP' AND mpl.a_in = 1 and ${condition}
    // ORDER BY mp.stp_prfle_id;`;
    var QRY_TO_EXEC = `SELECT mpl.prfle_id as stp_prfle_id,mpl.prfle_nm,mpl.prfle_dscrn_tx,s.stp_grp_id,s.stp_grp_nm,mp.stp_opt_id,so.stp_opt_nm,so.stp_opt_icn_tx,mp.a_in,m.mrcht_usr_nm as crtd_usr_nm,DATE_FORMAT(mpl.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp,
                    m1.mrcht_usr_nm as upd_usr_nm,DATE_FORMAT(mpl.u_ts,'%d-%m-%Y %H:%i') as upd_tmstmp
                    from prfle_lst_t  mpl
                    left JOIN stp_prfle_opt_rel_t as mp on mp.stp_prfle_id =mpl.prfle_id
                    left join stp_opt_lst_t as so on so.stp_opt_id = mp.stp_opt_id
                    left JOIN stp_grp_rel_t as sg on sg.stp_opt_id = so.stp_opt_id
					left JOIN stp_grp_lst_t as s on s.stp_grp_id = sg.stp_grp_id
                    LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mpl.crte_usr_id
                    LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mpl.updte_usr_id
                    WHERE mpl.prfle_ctgry_cd='STP' AND mpl.a_in = 1
                    ORDER BY mp.stp_prfle_id;`
    // console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : dltstpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
// exports.dltstpMdl = function (id, user) {
//     // console.log(id, user)
//     var QRY_TO_EXEC = `UPDATE prfle_lst_t SET a_in = 0, upd_usr_id = ${user.user_id} ,d_ts = CURRENT_TIMESTAMP() WHERE prfle_id = ${id}`;
//     // console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

/*****************************************************************************
* Function       : stpPrflGrpsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.stpPrflGrpsMdl = function (user) {
    var fnm = "stpPrflGrpsMdl"
    // var QRY_TO_EXEC = `SELECT mp.stp_prfle_id,mpl.prfle_nm as stp_prfle_nm,mp.stp_grp_id,s.stp_grp_nm,mp.stp_opt_id,so.stp_opt_nm,mp.a_in
    // ,m.mrcht_usr_nm as crtd_usr_nm
    // ,DATE_FORMAT(mpl.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp
    // ,CASE WHEN MAX(mp.upd_usr_id) is NOT NULL THEN max(m1.mrcht_usr_nm) ELSE '' END  as udt_usr_nm
    // ,CASE WHEN max(mp.u_ts) is NOT NULL THEN DATE_FORMAT(max(mp.u_ts),'%d-%m-%Y %H:%i') else  '' END as upd_tmstmp
    // FROM prfle_lst_t mpl
    // JOIN stp_prfle_opt_rel_t  mp ON mp.stp_prfle_id = mpl.prfle_id 
    // JOIN stp_grp_lst_t as s on s.stp_grp_id = mp.stp_grp_id
    // JOIN stp_opt_lst_t as so on so.stp_opt_id = mp.stp_opt_id
    // LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mp.crt_usr_id
    // LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mp.upd_usr_id
    // WHERE mpl.prfle_ctgry_cd='STP' AND mpl.a_in = 1 AND mpl.mrcht_id = ${user.mrcht_id}
    // GROUP BY mp.stp_prfle_id
    // ORDER BY mp.stp_prfle_id;`;
    // var QRY_TO_EXEC = `SELECT mpl.prfle_id as stp_prfle_id,mpl.prfle_nm as stp_prfle_nm,sg.stp_grp_id,s.stp_grp_nm,mp.stp_opt_id,so.stp_opt_nm,mpl.a_in
    //                 ,m.mrcht_usr_nm as crtd_usr_nm
    //                 ,DATE_FORMAT(mpl.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp
    //                 ,CASE WHEN MAX(mp.updte_usr_id) is NOT NULL THEN max(m1.mrcht_usr_nm) ELSE '' END  as udt_usr_nm
    //                 ,CASE WHEN max(mp.u_ts) is NOT NULL THEN DATE_FORMAT(max(mp.u_ts),'%d-%m-%Y %H:%i') else  '' END as upd_tmstmp
    //                 FROM prfle_lst_t mpl
    //                 left JOIN stp_prfle_opt_rel_t  mp ON mp.stp_prfle_id = mpl.prfle_id 
    //                 left JOIN stp_grp_rel_t as sg on sg.stp_opt_id = mp.stp_opt_id
    //                 LEFT JOIN stp_grp_lst_t as s on s.stp_grp_id = sg.stp_grp_id
    //                 left JOIN stp_opt_lst_t as so on so.stp_opt_id = mp.stp_opt_id
    //                 LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mpl.crte_usr_id
    //                 LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mp.updte_usr_id
    //                 WHERE mpl.prfle_ctgry_cd='STP' AND mpl.a_in = 1 
    //                 GROUP BY mpl.prfle_id
    //                 ORDER BY mp.stp_prfle_id;`
                    // AND mpl.mrcht_id = ${user.mrcht_id}

    var QRY_TO_EXEC = ` SELECT mpl.prfle_id as stp_prfle_id,mpl.prfle_nm as stp_prfle_nm,mpl.a_in
                        FROM prfle_lst_t mpl
                        WHERE mpl.prfle_ctgry_cd='STP' AND mpl.a_in = 1 
                        GROUP BY mpl.prfle_id
                        ORDER BY mpl.prfle_id;`
                    console.log("++++++++++++++++++++++++++++++++++++++");
                    console.log(QRY_TO_EXEC);
                    console.log("++++++++++++++++++++++++++++++++++++++");
                    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getprfItmsLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getprfItmsLstMdl = function (user) {
    var fnm = "getprfItmsLstMdl"
    var QRY_TO_EXEC = `SELECT m.prfle_id as mnu_prfle_id,m.prfle_nm as mnu_prfle_nm,mp.a_in
    ,mu.mrcht_usr_nm as crtd_usr_nm
    ,DATE_FORMAT(m.i_ts,'%d-%m-%Y %H:%i') as crtd_tmstmp
    ,CASE WHEN MAX(p.upd_usr_id) is NOT NULL THEN max(m1.mrcht_usr_nm) ELSE '' END  as udt_usr_nm
    ,CASE WHEN max(p.u_ts) is NOT NULL THEN DATE_FORMAT(max(p.u_ts),'%d-%m-%Y %H:%i') else  '' END as upd_tmstmp
    FROM  prfle_lst_t m
    left JOIN mrcht_mnu_prfle_rel_t p ON p.mnu_prfle_id = m.prfle_id  
    left JOIN mrcht_usr_rel_t u ON u.mrcht_usr_id=p.mrcht_usr_id
    left JOIN mnu_prfle_itm_rel_t mp ON mp.mnu_prfle_id=m.prfle_id

    LEFT JOIN mrcht_usr_lst_t mu ON mu.mrcht_usr_id = m.crt_usr_id
    LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = p.upd_usr_id
    WHERE  m.a_in=1  and m.prfle_ctgry_cd='MNP' AND m.mrcht_id = ${user.mrcht_id}
    GROUP BY m.prfle_id
    ORDER BY m.prfle_id;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getSetupOptionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getSetupOptionsMdl = function (user) {
    var fnm = "getSetupOptionsMdl"
    // var QRY_TO_EXEC = `SELECT s.stp_opt_id, s.stp_opt_nm,spg.stp_grp_id,g.stp_grp_nm,s.a_in  FROM stp_opt_lst_t as s
    //                     join stp_prfle_opt_rel_t as spg on spg.stp_opt_id = s.stp_opt_id
    //                     join prfle_lst_t as p on p.prfle_id = spg.stp_prfle_id
    //                     JOIN prfle_ctgry_lst_t as pc on pc.prfle_ctgry_cd = p.prfle_ctgry_cd
    //                     JOIN stp_grp_lst_t as g on g.stp_grp_id = spg.stp_grp_id
    //                     WHERE s.a_in =1 and p.prfle_ctgry_cd='STP' and p.mrcht_id =${user.mrcht_id}
    //                     GROUP BY s.stp_opt_id`;
    var QRY_TO_EXEC = `SELECT s.stp_opt_id, s.stp_opt_nm,spg.stp_grp_id,g.stp_grp_nm,s.a_in,s.stp_opt_icn_tx  FROM stp_opt_lst_t as s
                        join stp_grp_rel_t as spg on spg.stp_opt_id = s.stp_opt_id
                        JOIN stp_grp_lst_t as g on g.stp_grp_id = spg.stp_grp_id
                        WHERE s.a_in =1 and spg.a_in=1 and g.a_in =1
                        GROUP BY s.stp_opt_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : updateMyMrchtDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateMyMrchtDtlsMdl = function (data, user, img) {
    var fnm = "updateMyMrchtDtlsMdl"
    var condition;
    if (img != null) {
        condition = `,imge_url_tx='${img}'`;
    } else {
        condition = ``;
    }

    var QRY_TO_EXEC = `UPDATE mrcht_lst_t
    SET mrcht_dsply_nm='${data.mrcht_dsply_nm}',eml_tx='${data.eml_tx}',mble_ph=${data.mble_ph},addr1_tx='${data.addr1_tx}',ste_id=${data.ste_id},
    cty_id=${data.cty_id},updte_usr_id=${user.user_id},u_ts=CURRENT_TIMESTAMP() ${condition}
    WHERE mrcht_id=${data.mrcht_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : bnk_acnt_typ_get
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.bnk_acnt_typ_get = function (user) {
    var fnm = "bnk_acnt_typ_get"
    var QRY_TO_EXEC = `SELECT bnk_acnt_typ_id,bnk_acnt_typ_nm from bnk_acnt_type_lst_t`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getusrlistMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getusrlistMdl = function (data, user) {
    var fnm = "getusrlistMdl"
    // console.log(data);
    let dtls = data[0].frntdata.data;
    console.log(dtls);
    var usr_nm;
    if(dtls.onbrd_in){
        usr_nm = dtls.agnt_Cd
    } else{
        usr_nm = dtls.userName
    }
    
    // console.log(user)
    var QRY_TO_EXEC = ` SELECT mrcht_usr_nm,eml_tx
                        FROM mrcht_usr_lst_t mu
                        JOIN mrcht_usr_rel_t u ON u.mrcht_usr_id = mu.mrcht_usr_id
                        where u.mrcht_id =1 and mu.a_in=1 AND mu.mrcht_usr_nm = '${usr_nm}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};