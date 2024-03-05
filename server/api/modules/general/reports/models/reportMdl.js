var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : ctgrylstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.ctgrylstMdl = (user) => {
    var fnm = "ctgrylstMdl"
    var QRY_TO_EXEC = `SELECT * from rpt_ctgry_lst_t WHERE a_in = 1`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)
};

/*****************************************************************************
* Function      : rprtlstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.rprtlstMdl = (userData) => {
    var fnm = "rprtlstMdl"
    //console.log(userData)
    var QRY_TO_EXEC = ` SELECT  r.rpt_id, r.rpt_nm, r.rpt_desc_txt, r.cmplt_in, CONCAT('admin', r.rpt_url_txt) as rpt_url_txt, r.rpt_typ_id, r.qry_id,
                                rp.grp_id, g.grp_nm,c.rpt_ctgry_id,ct.rpt_ctgry_nm,sqnce_id
                        from rpt_lst_t r
                                left JOIN rpt_grp_rel_t as rp on r.rpt_id = rp.rpt_id
                                left join rpt_grp_lst_t as g on rp.grp_id = g.grp_id
                                left join rpt_ctgry_rel_t as c on r.rpt_id = c.rpt_id
                                left join rpt_ctgry_lst_t as ct on c.rpt_ctgry_id=ct.rpt_ctgry_id 
                                join rpt_prfle_rel_t as rt on rt.rpt_id = r.rpt_id
                        WHERE r.a_in=1 AND rt.a_in=1 and rt.mnu_prfle_id = ${userData.rpt_prfle_id}
                        GROUP BY g.grp_id,r.rpt_id,r.cmplt_in
                        ORDER BY g.sqnce_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, userData,fnm)
};



/*****************************************************************************
* Function      : rprtlstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

// exports.ctgryrptlstMdl = function (data, callback) {

//     var QRY_TO_EXEC = ` SELECT r.*,c.rpt_ctgry_id,ct.rpt_ctgry_nm from rpt_lst_t r
//     join rpt_ctgry_rel_t as c on r.rpt_id = c.rpt_id
//     join rpt_ctgry_lst_t as ct on c.rpt_ctgry_id=ct.rpt_ctgry_id 
//     where c.rpt_ctgry_id =${data.rpt_ctgry_id}`;

//     
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };


/*****************************************************************************
* Function      : prfleidMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.prfleidMdl = function (id, callback) {
    var fnm = "prfleidMdl"
    // var QRY_TO_EXEC = `select mnu_prfle_id from mrcht_mnu_prfle_rel_t where mrcht_usr_id = ${id};`;

    var QRY_TO_EXEC = `select rpt_prfle_id from mrcht_rpt_prfle_rel_t where mrcht_usr_id = ${id};`;


    console.log("*****************************************************************");
    console.log(QRY_TO_EXEC);



    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : getrptprflstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getrptprflstMdl = function (user) {
    var fnm = "getrptprflstMdl"
    // var condition = ``;
    // var query = ``;
    // var condition1;
    // if (user.admn_in == 1) {
    //     condition = ` AND mpl.mrcht_id=${user.mrcht_id}`;
    //     query = ``
    //     condition1 = ``;
    // } else {
    //     condition = ` AND m.mrcht_usr_id=${user.user_id}`;
    //     query = `JOIN mrcht_rpt_prfle_rel_t p ON p.rpt_prfle_id=mp.mnu_prfle_id `
    //     condition1 = `,p.a_in`;
    // }
    // var QRY_TO_EXEC = `SELECT r.mnu_prfle_id as rpt_prfle_id,m.prfle_nm as rpt_prfle_nm,r.rpt_id,rp.rpt_nm,rg.grp_id as rpt_grp_id,rl.grp_nm as rpt_grp_nm
    //                 ,r.a_in,m.crte_usr_id,mu.fst_nm as ctr_usr_nm,
    //                 DATE_FORMAT(m.i_ts,'%d-%m-%Y %H:%i') as crt_tmstp,
    //                 m.upde_usr_id,mul.fst_nm as upd_usr_nm,
    //                 DATE_FORMAT(m.u_ts,'%d-%m-%Y %H:%i') as upd_tmpstmp from rpt_prfle_rel_t r
    //                 join prfle_lst_t as m on m.prfle_id = r.mnu_prfle_id
    //                 ${query}
    //                 join mrcht_usr_lst_t as mu on mu.mrcht_usr_id = m.crte_usr_id
    //                 LEFT join mrcht_usr_lst_t as mul on mul.mrcht_usr_id = m.upde_usr_id
    //                 join rpt_lst_t as rp on rp.rpt_id = r.rpt_id
    //                 JOIN rpt_grp_rel_t as rg on rg.rpt_id = rp.rpt_id
    //                 join rpt_grp_lst_t as rl on rl.grp_id = rg.grp_id
    //                 WHERE m.prfle_ctgry_cd ='RPTP' and rp.a_in =1 AND m.a_in=1 ${condition}
    //                 order by r.mnu_prfle_id;`;
    var QRY_TO_EXEC = `SELECT mpl.prfle_id as rpt_prfle_id,mpl.prfle_nm AS rpt_prfle_nm,mpl.prfle_dscrn_tx,rg.grp_id as rpt_grp_id,s.grp_nm as rpt_grp_nm,so.rpt_id,so.rpt_nm,mp.a_in,
                        m.mrcht_usr_nm as ctr_usr_nm,DATE_FORMAT(mpl.i_ts,'%d-%m-%Y %H:%i') as crt_tmstp,
                        m1.mrcht_usr_nm as upd_usr_nm,DATE_FORMAT(mpl.u_ts,'%d-%m-%Y %H:%i') as upd_tmpstmp
                        from prfle_lst_t  mpl
                        left JOIN rpt_prfle_rel_t as mp on mp.mnu_prfle_id =mpl.prfle_id
                        left join rpt_lst_t as so on so.rpt_id = mp.rpt_id
                        LEFT JOIN rpt_grp_rel_t as rg on rg.rpt_id = mp.rpt_id
                        left join rpt_grp_lst_t as s on s.grp_id = rg.grp_id
                        LEFT JOIN mrcht_usr_lst_t m ON m.mrcht_usr_id = mpl.crte_usr_id
                        LEFT JOIN mrcht_usr_lst_t m1 ON m1.mrcht_usr_id = mpl.updte_usr_id
                        WHERE mpl.prfle_ctgry_cd='RPTP' AND mpl.a_in = 1 
                        ORDER BY mp.mnu_prfle_id;`;
    // AND mpl.mrcht_id = ${user.mrcht_id}
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : asgnReprtProfileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnReprtProfileMdl = function (data, user) {
    var fnm = "asgnReprtProfileMdl"
    let dtls = data.data;
    var QRY_TO_EXEC = `INSERT INTO prfle_lst_t (prfle_nm,prfle_ctgry_cd,mrcht_id,crte_usr_id, a_in,i_ts) VALUES ('${dtls.prfl_nm}','RPTP','${user.mrcht_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : asgnReprtPrfleItmMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnReprtPrfleItmMdl = function (mnu_prf_id, data, user) {
    var fnm = "asgnReprtPrfleItmMdl"
    if (data) {
        var QRY_TO_EXEC = ` INSERT into rpt_prfle_rel_t(mnu_prfle_id,rpt_id,a_in,i_ts)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var mnu_prf_id = mnu_prf_id
        data.rptOpts.filter((k) => {
            if (++counter == data.rptOpts.length) {
                dlmtr = `; `
            }
            valus_qry += ` (${mnu_prf_id},${k.rpt_id},1,CURRENT_TIMESTAMP()) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;

        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }
};

/*****************************************************************************
* Function       : updreportprofileNameMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updreportprofileNameMdl = function (data, user) {
    var fnm = "updreportprofileNameMdl"

    var QRY_TO_EXEC = `UPDATE prfle_lst_t SET prfle_nm ='${data.prfl_nm}' ,upde_usr_id =${user.user_id}, u_ts=CURRENT_TIMESTAMP() WHERE prfle_id =${data.rpt_prfle_id};`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updreportprofileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updreportprofileMdl = function (data, user) {
    var fnm = "updreportprofileMdl"
    var condition = ``;
    if (data.slctdOpt == true) {
        condition = `a_in =1`
    } else if (data.slctdOpt == false) {
        condition = `a_in =0`
    }
    var QRY_TO_EXEC1 = `UPDATE rpt_prfle_rel_t SET ${condition}, u_ts=CURRENT_TIMESTAMP() WHERE mnu_prfle_id =${data.rpt_prfle_id} and rpt_id= ${data.rpt_id};`;
    var QRY_TO_EXEC2 = `UPDATE prfle_lst_t SET  upde_usr_id = ${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id =${data.rpt_prfle_id};`;
    var QRY_TO_EXEC = QRY_TO_EXEC1 + QRY_TO_EXEC2;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getReportoptionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getReportoptionsMdl = function (user) {
    var fnm = "getReportoptionsMdl"
    // var QRY_TO_EXEC = `SELECT r.rpt_id,rpt_nm,rpt_desc_txt,r.a_in,rg.grp_id as rpt_grp_id,g.grp_nm as rpt_grp_nm from rpt_lst_t r
    //                     JOIN rpt_prfle_rel_t as rp on rp.rpt_id = r.rpt_id
    //                     JOIN prfle_lst_t as p on p.prfle_id = rp.mnu_prfle_id
    //                     JOIN rpt_grp_rel_t as rg on rg.rpt_id = r.rpt_id
    //                     JOIN rpt_grp_lst_t as g on g.grp_id = rg.grp_id
    //                     WHERE r.a_in =1 and p.prfle_ctgry_cd='RPTP' and p.mrcht_id =${user.mrcht_id}
    //                     GROUP BY r.rpt_id;`;
    var QRY_TO_EXEC = ` SELECT r.rpt_id,rpt_nm,rpt_desc_txt,rpt_url_txt,rg.grp_id as rpt_grp_id,g.grp_nm as rpt_grp_nm,r.a_in
                        from rpt_lst_t r
                        JOIN rpt_grp_rel_t as rg on rg.rpt_id = r.rpt_id
                        JOIN rpt_grp_lst_t as g on g.grp_id = rg.grp_id
                        WHERE r.a_in =1
                        GROUP BY r.rpt_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : delRptProfileMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delRptProfileMdl = function (prfle_id, user) {
    var fnm = "delRptProfileMdl"
    var QRY_TO_EXEC = `UPDATE prfle_lst_t SET a_in=0,d_in=1 upde_usr_id=${user.user_id},u_ts=CURRENT_TIMESTAMP() WHERE prfle_id=${prfle_id};`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getReportPrflMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getReportPrflMdl = function (data, user) {
    var fnm = "getReportPrflMdl"
    var QRY_TO_EXEC = `SELECT prfle_id,prfle_nm FROM prfle_lst_t 
                        where prfle_ctgry_cd ='RPTP' AND a_in=1 AND prfle_nm = '${data.prfl_nm}' AND mrcht_id =${user.mrcht_id};`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : checkRptOptsExistMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.checkRptOptsExistMdl = function (data, user) {
    var fnm = "checkRptOptsExistMdl"
    var QRY_TO_EXEC = ` SELECT * FROM
                        rpt_prfle_rel_t
                        WHERE rpt_id = ${data.rpt_id} AND mnu_prfle_id=${data.rpt_prfle_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : selectReportserMdl
* Description    : select user if already present for assigning Report profile
* Arguments      : callback function
******************************************************************************/
exports.selectReportserMdl = function (data) {
    var fnm = 'selectReportserMdl'
    var QRY_TO_EXEC = `SELECT * from mrcht_rpt_prfle_rel_t m
                        join prfle_lst_t as p on p.prfle_id = m.rpt_prfle_id
                        WHERE m.mrcht_usr_id = ${data.mrcht_usr_id} and p.prfle_ctgry_cd ='RPTP'`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : updreportPrfleMdl
* Description    : update user menu profile
* Arguments      : callback function
******************************************************************************/
exports.updreportPrfleMdl = function (rpt_prfle_id, data, user) {
    var fnm = "updreportPrfleMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_rpt_prfle_rel_t SET rpt_prfle_id = ${rpt_prfle_id},upde_usr_id ='${user.user_id}',u_ts=CURRENT_TIMESTAMP() WHERE mrcht_usr_id= ${data.mrcht_usr_id};`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : asgnReportPrfleMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.asgnReportPrfleMdl = function (rpt_prfle_id, data, user) {
    var fnm = "asgnReportPrfleMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_rpt_prfle_rel_t (mrcht_usr_id, rpt_prfle_id,crte_usr_id,a_in,i_ts) VALUES ('${data.mrcht_usr_id}','${rpt_prfle_id}','${user.user_id}',1,CURRENT_TIMESTAMP());`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};