// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : chckPrmsnsMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.chckPrmsnsMdl = function (user, data, callback) {
    var fnm = "chckPrmsnsMdl"

    var QRY_TO_EXEC = `select 1 as slct_in,1 as crte_in,1 as updt_in,1 as dlte_in,1 aso1_in,1 as o2_in from dual`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : getRolesMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesMdl = function (user,callback) {
    var fnm = "getRolesMdl"

    var QRY_TO_EXEC = `select r.*, DATE_FORMAT(r.i_ts, '%d/%m/%Y') as dt_frmt ,
    (CASE WHEN m.lst_nm is NOT NULL THEN CONCAT(m.fst_nm, " " ,m.lst_nm) ELSE m.fst_nm END  ) as name,  ROW_NUMBER() OVER ( ORDER BY r.rle_id) sno,
    SUM(CASE WHEN u.mrcht_usr_id is NOT NULL THEN 1 ELSE 0 end ) as ttl_usr_cnt
    from rle_lst_t as r
    left join mrcht_usr_lst_t m on m.mrcht_usr_id=r.crte_usr_id 
    LEFT JOIN rle_mrcht_usr_rel_t u on u.rle_id = r.rle_id
    where r.a_in =1
    GROUP BY r.rle_id
    ORDER BY r.rle_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : getRolesPermByIdMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesPermByIdMdl = function (user,id,callback) {
    var fnm = "getRolesPermByIdMdl"

    var QRY_TO_EXEC = `SELECT ra.objct_nm,rm.rle_nm, r.*, ra.objct_id, CASE WHEN r.rle_id is null then ${id} else r.rle_id end as rle_id
    FROM rle_objct_lst_t ra
    left JOIN rle_objct_rel_t r on r.objct_id = ra.objct_id  AND r.rle_id = ${id}
    left join rle_lst_t rm on  rm.rle_id = r.rle_id
    where ra.spcl_prmsns_in!=1
    order by ra.objct_id`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : instRolesPermByIdCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.instRolesPermByIdMdl = function (user,data,callback) {
    var fnm = "instRolesPermByIdMdl"

let dlmtr = ' , ';
let counter = 0;
let lft_pnths = ' ( ';
let rght_pnths = ' ) ';


let btch_qry = ' ';
if (data) {
    data.filter((k) => {
        if (++counter == data.length) {
            dlmtr = ` ON DUPLICATE KEY UPDATE  slct_in= VALUES(slct_in),insrt_in=VALUES(insrt_in),updt_in=VALUES(updt_in),dlte_in=VALUES(dlte_in),exprt_in=VALUES(exprt_in), u_ts = CURRENT_TIMESTAMP(), a_in = 1 `;
        }
        btch_qry += ` ( ${k.rle_id}, ${k.objct_id}, ${k.slct_in}, ${k.insrt_in}, ${k.updt_in}, ${k.dlte_in}, ${k.exprt_in}, 1, CURRENT_TIMESTAMP() ) ${dlmtr} `
    })
}
var QRY_TO_EXEC = ` insert into rle_objct_rel_t (rle_id,objct_id,slct_in,insrt_in,updt_in,dlte_in,exprt_in,a_in,i_ts) values ${btch_qry} `;

log.info(QRY_TO_EXEC, 0, cntxtDtls);
return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)
}

/**************************************************************************************
* Controller     : getRolesMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.instRolesMdll = function (user,data,callback) {
    var fnm = "instRolesMdll"

    var QRY_TO_EXEC = `insert into rle_lst_t (rle_nm,rle_dscn_nm,crte_usr_id,i_ts,a_in) VALUES('${data.rle_nm}','${data.rle_dscn_nm}',${data.crte_usr_id},CURRENT_TIMESTAMP,1);`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : UpdtRolesMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.UpdtRolesMdl = function (user,id,data,callback) {
    var fnm = "UpdtRolesMdl"

    var QRY_TO_EXEC = `update rle_lst_t set rle_nm='${data.rle_nm}',rle_dscn_nm='${data.rle_dscn_nm}',updte_usr_id=${data.updte_usr_id}, u_ts = CURRENT_TIMESTAMP where rle_id=${id};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : DeletRolesMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.DeletRolesMdl = function (user,id,callback) {
    var fnm = "DeletRolesMdl"

    var QRY_TO_EXEC = `update rle_lst_t set a_in=0 , updte_usr_id=${user.user_id}, d_ts = CURRENT_TIMESTAMP where rle_id=${id};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : getRolesSpclPermByIdMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesSpclPermByIdMdl = function (user,id,callback) {
    var fnm = "getRolesSpclPermByIdMdl"

    var QRY_TO_EXEC = `SELECT ra.objct_nm, rp.objct_id, rs.spcl_prmsns_id, rs.spcl_prmsns_in, CASE WHEN rs.rle_id is null then ${id} else rs.rle_id end as rle_id FROM rle_objct_lst_t ra LEFT JOIN rle_spcl_prmsns_lst_t rp on rp.objct_id = ra.objct_id LEFT JOIN rle_spcl_prmsns_rel_t rs on rs.spcl_prmsns_id = rp.spcl_prmsns_id and rs.rle_id = ${id} WHERE ra.spcl_prmsns_in = 1 `;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : instRolesPclPermByIdMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.instRolesPclPermByIdMdl = function (user,data,callback) {
    var fnm = "instRolesPclPermByIdMdl"

    let dlmtr = ' , ';
    let counter = 0;
    let lft_pnths = ' ( ';
    let rght_pnths = ' ) ';
    
    
    let btch_qry = ' ';
    if (data) {
        data.filter((k) => {
            if (++counter == data.length) {
                dlmtr = ` ON DUPLICATE KEY UPDATE  spcl_prmsns_in= VALUES(spcl_prmsns_in), updte_usr_id=${user.user_id}, u_ts = CURRENT_TIMESTAMP(), a_in = 1 `;
            }
            btch_qry += ` ( ${k.rle_id}, ${k.objct_id}, ${k.spcl_prmsns_in},${user.user_id},1, CURRENT_TIMESTAMP() ) ${dlmtr} `
        })
    }
    var QRY_TO_EXEC = ` insert into rle_spcl_prmsns_rel_t (rle_id,spcl_prmsns_id,spcl_prmsns_in,crte_usr_id,a_in,i_ts) values ${btch_qry} `;
    
    log.info(QRY_TO_EXEC, 0, cntxtDtls);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)
    }
/**************************************************************************************
* Controller     : instRolesPclPermByIdMdl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 04/01/2020    -  sravani M  - Initial Function
*
***************************************************************************************/
exports.emailtemplate = function (data,callback) {
    var fnm = 'emailtemplate'
    var QRY_TO_EXEC = `insert into tmplt_lst_t (tmplt_lst_nm,tmplt_lst_desc,rndr_ejs_html,tmplt_ctgry_id) values("invoice_bill","invoice bill by system generated",'${data}',1)`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
