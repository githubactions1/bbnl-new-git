
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function      : get_TcktStsMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktStsMdl = (user, callback) => {
    var fnm = "get_TcktStsMdl"


    var QRY_TO_EXEC = `select tckt_sts_id as id,tckt_sts_nm as mnu_itm_nm,icn_tx as mnu_icn_tx,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr,a_in,i_ts,'STATUS' as indicator from sprt_tkt_sts_lst_t ORDER BY tckt_sts_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : get_TcktTypeMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktTypeMdl = (user, callback) => {
    var fnm = "get_TcktTypeMdl"


    var QRY_TO_EXEC = `SELECT tckt_type_id as id,tckt_type_nm as mnu_itm_nm,tckt_type_cd,icn_tx as mnu_icn_tx,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr,a_in,i_ts,'TYPE' as indicator FROM sprt_tckt_type_lst_t ORDER BY tckt_type_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : get_TcktCtgryMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktCtgryMdl = (user, callback) => {
    var fnm = "get_TcktCtgryMdl"


    var QRY_TO_EXEC = `select tckt_ctgry_id as id,tckt_ctgry_nm as mnu_itm_nm,tckt_ctgry_dscn_tx,icn_tx as mnu_icn_tx,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr,a_in,i_ts,'CATEGORY' as indicator from sprt_tckt_ctgry_lst_t ORDER BY tckt_ctgry_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : get_TcktDetailsMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktDetailsMdl = (data, user, callback) => {
    var fnm = "get_TcktDetailsMdl"
    console.log("TICKETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(data)
    console.log("TICKETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    var createbyme = ``;
    var assignbyme = ``;
    var createteam = ``;
    var assignteam = ``;
    var status = ``;
    var type = ``;
    var category = ``;
    var reqentry = ``;
    var subcategory = ``;
    var approval = ``;
    var myapproval = ``;
    var esclated = ``;
    if (data.STATUS) {
        if (data.STATUS.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var status = `and s.tckt_status_id in (`;
            for (var i = 0; i < data.STATUS.length; i++) {
                if (i + 1 == data.STATUS.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.STATUS[i].id} ${semicolumnORcomma}`;
            }

            status += concat + bracket;
        } else {
            status = ``
        }
    } else {
        status = ``
    }
    if (data.TYPE) {
        if (data.TYPE.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var type = `and s.tckt_type_id in (`;
            for (var i = 0; i < data.TYPE.length; i++) {
                if (i + 1 == data.TYPE.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.TYPE[i].id} ${semicolumnORcomma}`;
            }

            type += concat + bracket;
        } else {
            type = ``
        }
    } else {
        type = ``
    }
    if (data.CATEGORY) {
        if (data.CATEGORY.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var category = `and s.tckt_ctgry_id in (`;
            for (var i = 0; i < data.CATEGORY.length; i++) {
                if (i + 1 == data.CATEGORY.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.CATEGORY[i].id} ${semicolumnORcomma}`;
            }

            category += concat + bracket;
        } else {
            category = ``
        }
    } else {
        category = ``
    }

    if (data.PRIORITY) {
        if (data.PRIORITY.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var priority = `and s.prty_id in (`;
            for (var i = 0; i < data.PRIORITY.length; i++) {
                if (i + 1 == data.PRIORITY.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.PRIORITY[i].id} ${semicolumnORcomma}`;
            }

            priority += concat + bracket;
        } else {
            priority = ``
        }
    } else {
        priority = ``
    }

    console.log(status)
    console.log(priority)
    if (data.indicator == 'CREATEDBYME') {
        createbyme = `and s.tckt_crte_usr_id=${user.mrcht_usr_id} ${status} ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ASSIGNEDBYME') {
        assignbyme = `and s.sprt_usr_id=${user.mrcht_usr_id} ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'CREATEDBYTEAM') {
        createteam = `and s.crte_tm_id in (${data.id}) ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ASSIGNEDTOTEAM') {
        assignteam = `and s.sprt_tm_id in (${data.id}) ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'APPROVAL') {
        // approval = `and aprvl_rqrd_in= 1 and (s.aprvl_tm_id is null or  s.aprvl_tm_id<0) and (s.tckt_crte_usr_id=${user.mrcht_usr_id} or s.sprt_usr_id=${user.mrcht_usr_id} or s.crte_tm_id= ${data.id} or s.sprt_tm_id= ${data.id})`
        approval = `and s.aprvl_tm_id in (${data.id}) and s.aprvl_tm_in is null ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ESCALATED') {
        esclated = `and ( crte_tm_id in (${data.loginuserteamid}) or sprt_tm_id in (${data.loginuserteamid})) and s.clse_in =0 and s.escld_in= 1 ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'MYAPPROVAL') {
        myapproval = `and s.aprvl_tm_id in (${data.id}) and s.aprvl_usr_id=${user.mrcht_usr_id} and s.aprvl_tm_in=1  ${status}  ${type} ${category} ${priority}`
    }
    // if (data.indicator == 'STATUS') {
    //     status = `in( s.crte_tm_id = ${data.loginuserteamid} or s.sprt_tm_id =${data.loginuserteamid}) and s.tckt_status_id =${data.id} `
    // }
    // if (data.indicator == 'TYPE') {
    //     type = `in( s.crte_tm_id = ${data.loginuserteamid} or s.sprt_tm_id =${data.loginuserteamid}) and s.tckt_type_id =${data.id} `
    // }
    // if (data.indicator == 'CATEGORY') {
    //     category = `in( s.crte_tm_id = ${data.loginuserteamid} or s.sprt_tm_id =${data.loginuserteamid}) and s.tckt_ctgry_id= ${data.id}`
    // }
    // if (data.indicator == 'SUBCATEGORY') {
    //     subcategory = `in( s.crte_tm_id = ${data.loginuserteamid} or s.sprt_tm_id =${data.loginuserteamid}) and s.tckt_sb_ctgry_id= ${data.id}`
    // }
    if (data.indicator == 'ENTRYID') {
        reqentry = `and s.tckt_id= ${data.id}`
    }

    if (data.indicator == 'CAF') {
        myapproval = `and sct.caf_id=${data.id} and sct.a_in =1`
    }
    if (data.indicator == 'TicketID') {
        myapproval = `and s.tckt_id=${data.id} and s.a_in =1`
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY s.tckt_id DESC) as s_no,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as tckt_dt,s.shrt_dscn_tx as dscn_tx,s.lng_dscn_tx,s.clsng_nte_tx,a.agnt_cd,agnt_nm,s.tckt_status_id,sts.tckt_sts_nm,
    s.prty_id,sp.prty_nm,s.tckt_ctgry_id,tc.tckt_ctgry_nm,tsc.tckt_sb_ctgry_id,tsc.tckt_sb_ctgry_nm,sit.ise_type_nm,sit.ise_type_id,sii.ise_idnfr_nm,sii.ise_idnfr_id,s.tckt_type_id,stt.tckt_type_nm,stt.tckt_type_cd,s.tckt_qr_cd,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as tckt_dt,s.tkt_ownr_usr_id,      
    s.crte_tm_id,s.tckt_crte_usr_id,s.sprt_tm_id,s.sprt_usr_id,s.clse_in,s.clse_ts,s.clse_usr_id,mc.mrcht_usr_nm as 'createuser',ma.mrcht_usr_nm as 'assignuser',map.mrcht_usr_nm as 'approvalUser',mcs.mrcht_usr_nm as 'ClosedUser',
    stc.tm_nm as 'createTeam',sta.tm_id as 'assignteamid',sta.tm_nm as 'assignTeam',(case when s.aprvl_tm_in is null then null else stap.tm_nm end) as 'approvalTeam',DATEDIFF(CURDATE(),tckt_dt) as age,
    DATE_FORMAT(chtk.schdle_strt_ts,'%d/%m/%Y') as schdle_strt_ts,DATE_FORMAT(chtk.schdle_end_ts,'%d/%m/%Y') as schdle_end_ts,chtk.exptd_rslt_tx,chtk.rlse_nts_tx,chtk.sftwe_dtls_tx,chtk.hrdwe_dtl_tx,chtk.prpsd_chngs_tx,chtk.vndr_tkt_tx,chtk.vndr_id,chtk.elmnt_id,
    chtk.tls_nd,chtk.flrs_tx,chtk.flrs_rsltn_tx,vndr.vndr_nm,elmt.elmnt_nm,statr.aplcn_id,stat.aplcn_nm,s.aprvl_tm_id,s.aprvl_usr_id,s.aprvl_ts,aprvl_cmnt_tx,aprvl_rqrd_in,escld_in,escln_nte_tx,escln_tm_id,escld_ts,sct.caf_id,sitl.ise_type_id as caf_isu_typ_id,sitl.ise_type_nm as caf_isu_typ_nm,siil.ise_idnfr_id as caf_isu_idnfr_id,siil.ise_idnfr_nm as caf_isu_idnfr_nm
    from
    sprt_tckt_dtl_t as s
    JOIN sprt_tkt_sts_lst_t as sts on sts.tckt_sts_id = s.tckt_status_id   
    JOIN sprt_prty_lst_t as sp on sp.prty_id = s.prty_id
    LEFT JOIN sprt_tckt_ctgry_lst_t as tc on tc.tckt_ctgry_id = s.tckt_ctgry_id
    LEFT JOIN sprt_tckt_sb_ctgry_lst_t as tsc on tsc.tckt_sb_ctgry_id = s.tckt_sb_ctgry_id
    LEFT JOIN sprt_tckt_type_lst_t as stt on stt.tckt_type_id = s.tckt_type_id
    LEFT JOIN sprt_lmo_tkt_dtl_t as slt on slt.tckt_id = s.tckt_id
    LEFT JOIN agnt_lst_t as a on a.agnt_id = slt.agnt_id
    LEFT JOIN sprt_ise_type_lst_t as sit on sit.ise_type_id = slt.ise_type_id
    LEFT JOIN sprt_ise_idnfr_lst_t as sii on sii.ise_idnfr_id = slt.ise_idnfr_id
    LEFT JOIN sprt_caf_tkt_dtl_t as sct on sct.tckt_id = s.tckt_id
LEFT JOIN sprt_ise_type_lst_t as sitl on sitl.ise_type_id = sct.ise_type_id
    LEFT JOIN sprt_ise_idnfr_lst_t as siil on siil.ise_idnfr_id = sct.ise_idnfr_id
    LEFT JOIN caf_dtl_t as cd on cd.caf_id = sct.caf_id
    LEFT JOIN sprt_tkt_atcht_dtl_t as stad on stad.tckt_id = s.tckt_id     
    LEFT JOIN mrcht_usr_lst_t as mc on mc.mrcht_usr_id = s.tckt_crte_usr_id 
       LEFT JOIN mrcht_usr_lst_t as ma on ma.mrcht_usr_id = s.sprt_usr_id     
    LEFT JOIN mrcht_usr_lst_t as map on map.mrcht_usr_id = s.aprvl_usr_id  
    LEFT JOIN mrcht_usr_lst_t as mcs on mcs.mrcht_usr_id = s.clse_usr_id   
    LEFT JOIN sprt_tm_lst_t as stc on stc.tm_id = s.crte_tm_id
    LEFT JOIN sprt_tm_lst_t as sta on sta.tm_id = s.sprt_tm_id
    LEFT JOIN sprt_tm_lst_t as stap on stap.tm_id = s.aprvl_tm_id
    LEFT JOIN sprt_chge_tkt_dtl_t as chtk on chtk.tckt_id=s.tckt_id        
    LEFT JOIN sprt_vndr_lst_t as vndr on vndr.vndr_id=chtk.vndr_id
    LEFT JOIN sprt_elmnt_lst_t as elmt on elmt.elmnt_id=chtk.elmnt_id      
    LEFT JOIN sprt_tm_sprt_tckt_rel_t as stsr on stsr.tckt_type_id=s.tckt_type_id and stsr.tckt_ctgry_id=s.tckt_ctgry_id
    LEFT JOIN sprt_tckt_aplcn_tm_rel_t as statr on statr.tm_id = s.aprvl_tm_id
    left JOIN sprt_tckt_aplcn_lst_t as stat on stat.aplcn_id = statr.aplcn_id
    where s.a_in=1 ${createbyme} ${assignbyme}  ${reqentry} ${assignteam} ${createteam} ${approval} ${esclated} ${myapproval}
    GROUP BY s.tckt_id
    ORDER BY s.tckt_id desc;`

    console.log("TicketDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(QRY_TO_EXEC);
    console.log("TicketDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : teamCntDtaMdl
* Description   : get details of Team Tickets Count Data
* Arguments     : callback function
* Change History :
*
******************************************************************************/
exports.teamCntDtaMdl = (data, user, callback) => {
    var fnm = "teamCntDtaMdl"

    console.log("TICKETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(data)
    console.log("TICKETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    var createbyme = ``;
    var assignbyme = ``;
    var createteam = ``;
    var assignteam = ``;
    var status = ``;
    var type = ``;
    var category = ``;
    var reqentry = ``;
    var subcategory = ``;
    var approval = ``;
    var myapproval = ``;
    var esclated = ``;
    if (data.STATUS) {
        if (data.STATUS.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var status = `and tckt_status_id in (`;
            for (var i = 0; i < data.STATUS.length; i++) {
                if (i + 1 == data.STATUS.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.STATUS[i].id} ${semicolumnORcomma}`;
            }

            status += concat + bracket;
        } else {
            status = ``
        }
    } else {
        status = ``
    }
    if (data.TYPE) {
        if (data.TYPE.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var type = `and tckt_type_id in (`;
            for (var i = 0; i < data.TYPE.length; i++) {
                if (i + 1 == data.TYPE.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.TYPE[i].id} ${semicolumnORcomma}`;
            }

            type += concat + bracket;
        } else {
            type = ``
        }
    } else {
        type = ``
    }
    if (data.CATEGORY) {
        if (data.CATEGORY.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var category = `and tckt_ctgry_id in (`;
            for (var i = 0; i < data.CATEGORY.length; i++) {
                if (i + 1 == data.CATEGORY.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.CATEGORY[i].id} ${semicolumnORcomma}`;
            }

            category += concat + bracket;
        } else {
            category = ``
        }
    } else {
        category = ``
    }

    if (data.PRIORITY) {
        if (data.PRIORITY.length > 0) {
            let semicolumnORcomma = ' ,'
            let concat = ' '
            let bracket = ')'

            var priority = `and prty_id in (`;
            for (var i = 0; i < data.PRIORITY.length; i++) {
                if (i + 1 == data.PRIORITY.length) {
                    semicolumnORcomma = ' '
                }
                concat += `${data.PRIORITY[i].id} ${semicolumnORcomma}`;
            }

            priority += concat + bracket;
        } else {
            priority = ``
        }
    } else {
        priority = ``
    }

    console.log(status)
    console.log(priority)
    if (data.indicator == 'CREATEDBYME') {
        createbyme = `and tckt_crte_usr_id=${user.mrcht_usr_id} ${status} ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ASSIGNEDBYME') {
        assignbyme = `and sprt_usr_id=${user.mrcht_usr_id} ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'CREATEDBYTEAM') {
        createteam = `and crte_tm_id in (${data.id}) ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ASSIGNEDTOTEAM') {
        assignteam = `and sprt_tm_id in (${data.id}) ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'APPROVAL') {
        // approval = `and aprvl_rqrd_in= 1 and (s.aprvl_tm_id is null or  s.aprvl_tm_id<0) and (s.tckt_crte_usr_id=${user.mrcht_usr_id} or s.sprt_usr_id=${user.mrcht_usr_id} or s.crte_tm_id= ${data.id} or s.sprt_tm_id= ${data.id})`
        approval = `and aprvl_tm_id in (${data.id}) and aprvl_tm_in is null ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ESCALATED') {
        esclated = `and ( crte_tm_id in (${data.loginuserteamid}) or sprt_tm_id in (${data.loginuserteamid})) and clse_in =0 and escld_in= 1  ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'MYAPPROVAL') {
        myapproval = `and aprvl_tm_id in (${data.id}) and aprvl_usr_id=${user.mrcht_usr_id} and aprvl_tm_in=1 ${status}  ${type} ${category} ${priority}`
    }
    if (data.indicator == 'ENTRYID') {
        reqentry = `and tckt_id= ${data.id}`
    }
    var QRY_TO_EXEC = `SELECT count(tckt_id) as tickets_cnt,sum(CASE WHEN tckt_status_id =7 THEN 1 else 0 END) as wait_t_accpt,sum(CASE WHEN tckt_status_id =3 THEN 1 else 0 END) as in_prgss,
                        sum(CASE WHEN tckt_status_id =4 THEN 1 else 0 END) as on_hold,sum(CASE WHEN tckt_status_id =5 THEN 1 else 0 END) as closed,
                        sum(CASE WHEN tckt_dt = CURRENT_DATE() then 1 else 0 end) as toady_tckts
                        from sprt_tckt_dtl_t 
                        where a_in=1 ${createbyme} ${assignbyme} ${reqentry}${assignteam} ${createteam} ${approval} ${esclated} ${myapproval}`;

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
* Function      : get_TcktPrtyMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 18/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktPrtyMdl = (user, callback) => {
    var fnm = "get_TcktPrtyMdl"


    var QRY_TO_EXEC = `SELECT * from sprt_prty_lst_t order by prty_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : get_TcktTeamsMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 18/08/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.get_TcktTeamsMdl = (user, callback) => {
    var fnm = "get_TcktTeamsMdl"


    var QRY_TO_EXEC = `SELECT * from sprt_tm_lst_t order by tm_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insTcktDetailsMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 19/08/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.insTcktDetailsMdl = (tic_data, user, callback) => {
    var fnm = "insTcktDetailsMdl"
    var data = tic_data.req_data
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_req_enrty_dtl_t (req_entry_dt, tm_id, asgnd_usr_id, req_usr_nm, 
        req_usr_mbl, caf_id, tckt_sts_id,tckt_type_id, tckt_ctgry_id, prty_id, dscn_tx, 
        crte_usr_id, a_in,i_ts) 
        VALUES (CURRENT_DATE(),'${data.team}','${data.asgn_usr}','${data.cstmr_nm}','${data.req_usr_mbl}','${data.caf_id}',1,
        ${data.type},${data.ctgry},${data.prty},'${data.desc}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getUserTeamIdMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 19/08/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.getUserTeamIdMdl = (id, user, callback) => {
    var fnm  = "getUserTeamIdMdl"
    var QRY_TO_EXEC = `SELECT usr_id,usr_nm,a_in 
                        FROM sprt_tckt_usr_tm_rel_t 
                        WHERE a_in = 1 AND tm_id= ${id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getTicketHisIdMdl
* Description   : get Ticket details of single  Ticket
* Arguments     : callback function
* Change History :
* 21/08/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.getTicketHisIdMdl = (id, user, callback) => {
    var fnm = "getTicketHisIdMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY a.i_ts DESC) as s_no,a.* FROM
    (select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,tyP.tckt_type_nm as prvsname,tyC.tckt_type_nm as crntname,cmnt.cmnt_tx
        from sprt_tkt_stg_dtl_t as s
        join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
        JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
        join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
        left join sprt_tckt_type_lst_t as tyP on tyP.tckt_type_id = s.prvs_id and s.ky_id=1
        left join sprt_tckt_type_lst_t as tyC on tyC.tckt_type_id = s.crnt_id and s.ky_id=1
        where s.ky_id=1
        GROUP BY stg_id
        ORDER BY s.i_ts desc 
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,caP.tckt_ctgry_nm as prvsname,caC.tckt_ctgry_nm as crntname,cmnt.cmnt_tx
        from sprt_tkt_stg_dtl_t as s
        join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
        JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
        join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
        left join sprt_tckt_ctgry_lst_t as caP on caP.tckt_ctgry_id = s.prvs_id and s.ky_id=2
        left join sprt_tckt_ctgry_lst_t as caC on caC.tckt_ctgry_id = s.crnt_id and s.ky_id=2
        where s.ky_id=2
        GROUP BY stg_id
        ORDER BY s.i_ts desc 
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,scaP.tckt_sb_ctgry_nm as prvsname,scaC.tckt_sb_ctgry_nm as crntname,cmnt.cmnt_tx
        from sprt_tkt_stg_dtl_t as s
        join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
        JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
        join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
        left join sprt_tckt_sb_ctgry_lst_t as scaP on scaP.tckt_sb_ctgry_id = s.prvs_id and s.ky_id=3
        left join sprt_tckt_sb_ctgry_lst_t as scaC on scaC.tckt_sb_ctgry_id = s.crnt_id and s.ky_id=3
        where s.ky_id=3
        GROUP BY stg_id
        ORDER BY s.i_ts desc 
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,stsP.tckt_sts_nm as prvsname,stsC.tckt_sts_nm as crntname,cmnt.cmnt_tx
        from sprt_tkt_stg_dtl_t as s
        join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
        JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
        join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
        left join sprt_tkt_sts_lst_t as stsP on stsP.tckt_sts_id = s.prvs_id and s.ky_id=4
        left join sprt_tkt_sts_lst_t as stsC on stsC.tckt_sts_id = s.crnt_id and s.ky_id=4
        where s.ky_id=4
        GROUP BY stg_id
        ORDER BY s.i_ts desc 
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,istP.ise_type_nm as prvsname,istC.ise_type_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_ise_type_lst_t as istP on istP.ise_type_id = s.prvs_id and s.ky_id=5
    left join sprt_ise_type_lst_t as istC on istC.ise_type_id = s.crnt_id and s.ky_id=5
    where s.ky_id=5
    GROUP BY stg_id
    ORDER BY s.i_ts desc 
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,isiP.ise_idnfr_nm as prvsname,isiC.ise_idnfr_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_ise_idnfr_lst_t as isiP on isiP.ise_idnfr_id = s.prvs_id and s.ky_id=6
    left join sprt_ise_idnfr_lst_t as isiC on isiC.ise_idnfr_id = s.crnt_id and s.ky_id=6
    where s.ky_id=6
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,tmP.tm_nm as prvsname,tmC.tm_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_tm_lst_t as tmP on tmP.tm_id = s.prvs_id and s.ky_id=7
    left join sprt_tm_lst_t as tmC on tmC.tm_id = s.crnt_id and s.ky_id=7
    where s.ky_id=7
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,spP.prty_nm as prvsname,spC.prty_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_prty_lst_t as spP on spP.prty_id = s.prvs_id and s.ky_id=8
    left join sprt_prty_lst_t as spC on spC.prty_id = s.crnt_id and s.ky_id=8
    where s.ky_id=8
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,svP.vndr_nm as prvsname,svC.vndr_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_vndr_lst_t as svP on svP.vndr_id = s.prvs_id and s.ky_id=9
    left join sprt_vndr_lst_t as svC on svC.vndr_id = s.crnt_id and s.ky_id=9
    where s.ky_id=9
    GROUP BY stg_id
    ORDER BY s.i_ts desc
	UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,seP.elmnt_nm as prvsname,seC.elmnt_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_elmnt_lst_t as seP on seP.elmnt_id = s.prvs_id and s.ky_id=10
    left join sprt_elmnt_lst_t as seC on seC.elmnt_id = s.crnt_id and s.ky_id=10
    where s.ky_id=10
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,seP.elmnt_nm as prvsname,seC.elmnt_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    left join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_elmnt_lst_t as seP on seP.elmnt_id = s.prvs_id and s.ky_id=13
    left join sprt_elmnt_lst_t as seC on seC.elmnt_id = s.crnt_id and s.ky_id=13
    where s.ky_id=13
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,seaP.aplcn_nm as prvsname,seaC.aplcn_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_tckt_aplcn_lst_t as seaP on seaP.aplcn_id = s.prvs_id and s.ky_id=14
    left join sprt_tckt_aplcn_lst_t as seaC on seaC.aplcn_id = s.crnt_id and s.ky_id=14
    where s.ky_id=14
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,stP.tm_nm as prvsname,stC.tm_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_tm_lst_t as stP on stP.tm_id = s.prvs_id and s.ky_id=15
    left join sprt_tm_lst_t as stC on stC.tm_id = s.crnt_id and s.ky_id=15
    where s.ky_id=15
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,stP.tm_nm as prvsname,stC.tm_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join sprt_tm_lst_t as stP on stP.tm_id = s.prvs_id and s.ky_id=16
    left join sprt_tm_lst_t as stC on stC.tm_id = s.crnt_id and s.ky_id=16
    where s.ky_id=16
    GROUP BY stg_id
    ORDER BY s.i_ts desc
    UNION ALL
    select s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as chng_dt,s.prvs_id,s.crnt_id,s.ky_id,k.ky_nm,s.cmnt_id,s.crte_usr_id,m.mrcht_usr_nm,s.a_in,s.i_ts,stP.mrcht_usr_nm as prvsname,stC.mrcht_usr_nm as crntname,cmnt.cmnt_tx
    from sprt_tkt_stg_dtl_t as s
    join sprt_tckt_ky_lst_t as k on k.ky_id=s.ky_id
    JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
    join sprt_tkt_cmnt_dtl_t as cmnt on cmnt.cmnt_id=s.cmnt_id
    left join mrcht_usr_lst_t as stP on stP.mrcht_usr_id = s.prvs_id and s.ky_id=17
    left join mrcht_usr_lst_t as stC on stC.mrcht_usr_id = s.crnt_id and s.ky_id=17
    where s.ky_id=17
    GROUP BY stg_id
    ORDER BY s.i_ts desc) as a
    where a.tckt_id= ${id}
    ORDER BY a.i_ts DESC; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getTicketAttchIdMdl
* Description   : get details of single Ticket Attachments
* Arguments     : callback function
* Change History :
* 16/10/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.getTicketAttchIdMdl = (id, user, callback) => {
    var fnm = "getTicketAttchIdMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY s.i_ts DESC) as s_no,s.stg_id,s.tckt_id,DATE_FORMAT(s.i_ts,'%d-%m-%Y %H:%i') as upld_dt,s.atcht_url_tx,s.atcht_url_nm,s.crte_usr_id,m.mrcht_usr_nm as upld_nm,s.a_in,s.i_ts
                        from sprt_tkt_atcht_dtl_t as s
                        JOIN mrcht_usr_lst_t as m on m.mrcht_usr_id = s.crte_usr_id
                        where s.tckt_id=${id}
                        ORDER BY s.i_ts desc `;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : insrtTcktDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtTcktDetailsMdl = function (cmntid, data, user, callback) {
    var fnm = "insrtTcktDetailsMdl"
    let semicolumnORcomma = ' ,'
    let concat = ' '

    var QRY_TO_EXEC = `insert into sprt_tkt_stg_dtl_t(tckt_id,chng_dt,prvs_id,crnt_id,ky_id,cmnt_id,crte_usr_id,a_in,i_ts) values`;
    for (var i = 0; i < data.array.length; i++) {
        if (i + 1 == data.array.length) {
            semicolumnORcomma = ' ;'
        }
        concat += `(${data.ticket_Id},CURRENT_DATE(),${data.array[i].previousid},${data.array[i].changedid},${data.array[i].keyid},'${cmntid}',${user.mrcht_usr_id},1,current_timestamp()) ${semicolumnORcomma}`;
    }

    QRY_TO_EXEC += concat;


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
* Function       : updateTcktDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateTcktDetailsMdl = function (data, user, callback) {
    var fnm = "updateTcktDetailsMdl"
    var status = ``;
    var priority = ``;
    var category = ``;
    var team = ``;
    var approval = ``;
    var type = ``;
    var description = ``
    console.log(data.status)
    console.log(data.longdescription)
    if (data.status > 0) {
        status = `,tckt_status_id=${data.status}`
        // console.log("hhhhhh")
    } else {
        status = ''
    }
    if (data.prty_Id > 0) {
        priority = `,prty_id=${data.prty_Id}`
    } else {
        priority = ''
    }
    if (data.category_Id > 0) {
        category = `,tckt_ctgry_id=${data.category_Id}`
    } else {
        category = ''
    }
    if (data.subcategory_Id > 0) {
        sub_category = `,tckt_sb_ctgry_id=${data.subcategory_Id}`
    } else {
        sub_category = ''
    }
    if (data.sprtTeam_Id > 0) {
        team = `,sprt_tm_id=${data.sprtTeam_Id}`
    } else {
        team = ''
    }
    if (data.shouldapproveTeam_Id > 0) {
        approval = `,aprvl_tm_id=${data.shouldapproveTeam_Id}`
    } else {
        approval = ''
    }
    if (data.type_Id > 0) {
        type = `,tckt_type_id=${data.type_Id}`
    } else {
        type = ''
    }
    //  if (data.description != undefined) {
    //     description = `,asgnd_usr_id=${data.asgn_Id}`
    // }
    if (data.longdescription != 0) {
        description = `,lng_dscn_tx='${data.longdescription}'`
    } else {
        description = ''
    }

    var QRY_TO_EXEC = `Update sprt_tckt_dtl_t set u_ts=current_timestamp(),updte_usr_id=${user.mrcht_usr_id} ${status} ${priority} ${category} ${sub_category} ${team} ${type} ${description} where tckt_id=${data.ticket_Id}`
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
* Function       : updLmoissueDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updLmoissueDetailsMdl = function (data, user, callback) {
    var fnm = "updLmoissueDetailsMdl"
    var isue_type = ``;
    var issue_idfr = ``;

    if (data.issueType_Id > 0) {
        isue_type = `,ise_type_id=${data.issueType_Id}`
    }
    if (data.iisueIdentifier_Id > 0) {
        issue_idfr = `,ise_idnfr_id=${data.iisueIdentifier_Id}`
    }

    var QRY_TO_EXEC = [`Update sprt_lmo_tkt_dtl_t set u_ts=current_timestamp(),updte_usr_id=${user.mrcht_usr_id} ${isue_type} ${issue_idfr} where tckt_id=${data.ticket_Id}`,
    `Update sprt_caf_tkt_dtl_t set u_ts=current_timestamp(),updte_usr_id=${user.mrcht_usr_id} ${isue_type} ${issue_idfr} where tckt_id=${data.ticket_Id}`]
    // var QRY_TO_EXEC1 = `Update sprt_lmo_tkt_dtl_t set u_ts=current_timestamp(),updte_usr_id=${user.mrcht_usr_id} ${isue_type} ${issue_idfr} where tckt_id=${data.ticket_Id};`
    // var QRY_TO_EXEC2 = `Update sprt_caf_tkt_dtl_t set u_ts=current_timestamp(),updte_usr_id=${user.mrcht_usr_id} ${isue_type} ${issue_idfr} where tckt_id=${data.ticket_Id};`

    // var QRY_TO_EXEC = QRY_TO_EXEC1 + QRY_TO_EXEC2;

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : inscmntDetailsMdl
* Description   : Inserrt Comment Data
* Arguments     : callback function
* Change History :
* 08/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.inscmntDetailsMdl = (data, user, callback) => {
    var fnm = "inscmntDetailsMdl"

    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_cmnt_dtl_t (cmnt_tx, tckt_id, crte_usr_id, a_in,i_ts) 
        VALUES ('${data.comment}','${data.ticket_Id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`
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
* Function      : inscmntDetlsMdl
* Description   : Inserrt Comment Data
* Arguments     : callback function
* Change History :
* 08/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.inscmntDetlsMdl = (data, user, callback) => {
    var fnm = "inscmntDetlsMdl"

    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_cmnt_dtl_t (cmnt_tx, tckt_id, crte_usr_id, a_in,i_ts) 
        VALUES ('${data.aprovecomment}','${data.tckt_id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`
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
* Function      : getCreateTicketDtlsMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
*  03/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getCreateTicketDtlsMdl = (user, callback) => {
    var fnm = "getCreateTicketDtlsMdl"


    var QRY_TO_EXEC = `select tur.usr_id,tur.usr_nm,tur.tm_id,alr.tckt_type_id,alr.crte_tm_in,alr.sprt_tm_in,alr.escltn_tm_in,alr.aprvl_tm_in,alr.aprvl_rqrd_in,alr.a_in,typ.tckt_type_nm,typ.tckt_type_cd
    from sprt_tckt_usr_tm_rel_t as tur
    LEFT JOIN sprt_tm_sprt_tckt_rel_t as alr on alr.tm_id=tur.tm_id
    LEFT JOIN sprt_tckt_type_lst_t as typ on typ.tckt_type_id=alr.tckt_type_id
    where tur.usr_id=${user.mrcht_usr_id} and alr.tckt_ctgry_id is null 
    and alr.tckt_sb_ctgry_id is null and alr.ise_type_id is null and alr.ise_idnfr_id is null and alr.crte_tm_in =1 and typ.a_in=1 and alr.a_in=1
    GROUP BY alr.tckt_type_id
    ORDER BY alr.tckt_type_id;`;

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getVendorDetailsMdl
* Description   : get details of all Vendors
* Arguments     : callback function
* Change History :
*  17/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.getVendorDetailsMdl = (user, callback) => {
    var fnm = "getVendorDetailsMdl"

    var QRY_TO_EXEC = `select vndr_id,vndr_nm from sprt_vndr_lst_t order by vndr_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getElementForVendorMdl
* Description   : get details of all Vendors
* Arguments     : callback function
* Change History :
*  17/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.getElementForVendorMdl = (vendorid, user, callback) => {
    var fnm = "getElementForVendorMdl"

    var QRY_TO_EXEC = `select elmnt_id,elmnt_nm from sprt_elmnt_lst_t where vndr_id = ${vendorid} order by elmnt_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getCategoryForTypeMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getCategoryForTypeMdl = (typeid, user, callback) => {
    var fnm = "getCategoryForTypeMdl"
    var QRY_TO_EXEC = `select * from sprt_tckt_ctgry_lst_t where tckt_type_id=${typeid} and a_in=1`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getSubCategoryForCatgryMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getSubCategoryForCatgryMdl = (catgryid, user, callback) => {
    var fnm = "getSubCategoryForCatgryMdl"
    var QRY_TO_EXEC = `select * from sprt_tckt_sb_ctgry_lst_t where tckt_ctgry_id=${catgryid} and a_in=1`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getIssueTypeForCtsSubCatsMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getIssueTypeForCtsSubCatsMdl = (catgryid, subcatgryid, user, callback) => {
    var fnm = "getIssueTypeForCtsSubCatsMdl"
    var QRY_TO_EXEC = `select * from sprt_ise_type_lst_t where tckt_ctgry_id=${catgryid} and tckt_sb_ctgry_id=${subcatgryid} and a_in=1`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSubCatgryMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getSubCatgryMdl = (typeid, atgryid, user, callback) => {
    var fnm = "getSubCatgryMdl"
    var QRY_TO_EXEC = `select tm.tckt_sb_ctgry_id,tm.tckt_sb_ctgry_nm
                        from sprt_tm_sprt_tckt_rel_t as rl
                        left join sprt_tckt_sb_ctgry_lst_t as tm on tm.tckt_sb_ctgry_id = rl.tckt_sb_ctgry_id
                        where rl.tckt_type_id = ${typeid}  and rl.tckt_ctgry_id =${atgryid} and rl.a_in =1
                        group by rl.tckt_sb_ctgry_id
                        ORDER BY rl.tckt_sb_ctgry_id;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAssignUserMdl
* Description   : get details of single  Team Assign Users
* Arguments     : callback function
* Change History :
*
******************************************************************************/
exports.getAssignUserMdl = (teamid, user, callback) => {
    var fnm = "getAssignUserMdl"
    var QRY_TO_EXEC = `select usr_id,usr_nm,tm_id,a_in from sprt_tckt_usr_tm_rel_t where tm_id = ${teamid} and a_in=1`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getIssueIdentifrsForIssueTypMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getIssueIdentifrsForIssueTypMdl = (issuetypeid, user, callback) => {
    var fnm = "getIssueIdentifrsForIssueTypMdl"
    var QRY_TO_EXEC = `select * from sprt_ise_idnfr_lst_t where ise_type_id=${issuetypeid} and a_in=1`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getTeamDetailsMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.getTeamDetailsMdl = (data, user, callback) => {
    var fnm = "getTeamDetailsMdl"
    var sbcat = '';
    var isutyp = '';
    var isuIndfr = '';

    if (data.subcategory > 0) {
        sbcat = `and (tckt_sb_ctgry_id is null || tckt_sb_ctgry_id=${data.subcategory})`
    }
    if (data.issuetype > 0) {
        isutyp = `and (ise_type_id is null || ise_type_id=${data.issuetype})`
    }
    if (data.isseidentifier > 0) {
        isuIndfr = `and (ise_idnfr_id is null || ise_idnfr_id=${data.isseidentifier})`
    }


    var QRY_TO_EXEC = `select rl.tm_id,tm_nm
    from sprt_tm_sprt_tckt_rel_t as rl
    left join sprt_tm_lst_t as tm on tm.tm_id=rl.tm_id
    where (tckt_type_id=${data.type} and tckt_ctgry_id=${data.category}) ${sbcat} ${isutyp} ${isuIndfr}
    GROUP BY rl.tm_id 
    ORDER BY rl.tm_id`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : InsQRcdDetailsMdl
* Description   : Select Data
* Arguments     : callback function
* Change History :
* 11/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
// exports.InsQRcdDetailsMdl = (tckt_id, user, callback) => {

//     var QRY_TO_EXEC = `update sprt_tckt_dtl_t set tckt_qr_cd='${tckt_id}',updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP() where tckt_id=${tckt_id};`
//     console.log(QRY_TO_EXEC)
//     if (callback && typeof callback == "function")
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     else
//         return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// }



/*****************************************************************************
* Function      : InsTeamDetailsMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsTeamDetailsMdl = (tic_data, tckt_id, user, callback) => {
    var fnm = "InsTeamDetailsMdl"
    var data = tic_data
    console.log(data)
    if (data.longdescription != 0) {
        var lngdesc = data.longdescription
    } else {
        var lngdesc = ''
    }
    if (data.description != 0) {
        var desc = data.description
    } else {
        var desc = ''
    }
    if (data.type == 9) {
        var aprv_id = 29
    } else {
        aprv_id = ``
    }
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_dtl_t (tckt_id,tckt_qr_cd,tckt_dt, tkt_ownr_usr_id,shrt_dscn_tx,lng_dscn_tx,tckt_status_id,
        prty_id, tckt_ctgry_id, tckt_sb_ctgry_id, tckt_type_id, crte_tm_id, tckt_crte_usr_id, sprt_tm_id,aprvl_tm_id,
        crte_usr_id, a_in, i_ts)
        VALUES (${tckt_id},${tckt_id},CURRENT_DATE(),'${data.lmo_id}','${desc}','${lngdesc}','${data.status}','${data.priority}',
        ${data.category},${data.subcategory},${data.type},'${data.cre_tm_id}','${user.mrcht_usr_id}','${data.team}','${aprv_id}',
        '${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`
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
* Function      : InsNOCDetailsMdl
* Description   : Inserrt NOC Data
* Arguments     : callback function
* Change History :
* 17/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsNOCDetailsMdl = (tic_data, data, user, callback) => {
    var fnm = "InsNOCDetailsMdl"
    // var data = tic_data
    console.log("koti")
    console.log(data)
    console.log("koti")
    // console.log(data)
    // if (data.vendor_Id > 0) {
    //     vendorid=`,vndr_id=${data.vendor_Id}`
    // }else{
    //     vendorid = ''
    // }
    // if (data.element_Id > 0) {
    //     elementid= ${data.element_Id}
    // } else{
    //     elementid =''
    // }
    if (data.schedulestart != 0) {
        var schdlestrtts = data.schedulestart
    } else {
        var schdlestrtts = ''
    }
    if (data.scheduleend != 0) {
        var schdleendts = data.scheduleend
    } else {
        var schdleendts = ''
    }
    if (data.expectedresults != 0) {
        var experslts = data.expectedresults
    } else {
        var experslts = ''
    }
    if (data.releasenotes != 0) {
        var releasents = data.releasenotes
    } else {
        var releasents = ''
    }
    if (data.softwaredetails != 0) {
        var sftwredtls = data.softwaredetails
    } else {
        var sftwredtls = ''
    }
    if (data.hardwaredetails != 0) {
        var hrdwredtls = data.hardwaredetails
    } else {
        var hrdwredtls = ''
    }
    if (data.praposerchanges != 0) {
        var prpsechngs = data.praposerchanges
    } else {
        var prpsechngs = ''
    }
    if (data.vendorticket != 0) {
        var vndrtckts = data.vendorticket
    } else {
        var vndrtckts = ''
    }
    if (data.toolsneeded != 0) {
        var tlsneeded = data.toolsneeded
    } else {
        var tlsneeded = ''
    }
    if (data.failures != 0) {
        var failures = data.failures
    } else {
        var failures = ''
    }
    if (data.failurersolution != 0) {
        var failureresolutiontext = data.failurersolution
    } else {
        var failureresolutiontext = ''
    }
    var QRY_TO_EXEC = `INSERT INTO sprt_chge_tkt_dtl_t (tckt_id, schdle_strt_ts, schdle_end_ts, exptd_rslt_tx, 
        rlse_nts_tx, sftwe_dtls_tx, hrdwe_dtl_tx, prpsd_chngs_tx, vndr_tkt_tx, vndr_id, elmnt_id, tls_nd, flrs_tx, 
        flrs_rsltn_tx, crte_usr_id, a_in, i_ts) 
    VALUES (${tic_data},'${schdlestrtts}','${schdleendts}','${experslts}','${releasents}','${sftwredtls}','${hrdwredtls}','${prpsechngs}','${vndrtckts}',
        ${data.vendorid},${data.elementid},'${tlsneeded}','${failures}','${failureresolutiontext}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

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
* Function      : InsTeamStatusDetailsMdl
* Description   : Inserrt status Data
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsTeamStatusDetailsMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "InsTeamStatusDetailsMdl"
    var data = tic_data
    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_sts_rel_t (tckt_id, tckt_sts_id, efctve_dt, crte_usr_id, a_in, i_ts) 
    VALUES ('${tic_id}', '${data.status}', CURRENT_DATE(), '${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP());`

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
* Function      : VendorElmtsDetailsMdl
* Description   : Inserrt status Data
* Arguments     : callback function
* Change History :
* 22/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.VendorElmtsDetailsMdl = (tic_id, tic_data, user, callback) => {
    var fnm = 'VendorElmtsDetailsMdl'
    var data = tic_data
    var vendorid = ``;
    var elementid = ``;
    var schdlestrtts = ``;
    var schdleendts = ``;
    var experslts = ``;
    var releasents = ``;
    var sftwredtls = ``;
    var hrdwredtls = ``;
    var prpsechngs = ``;
    var vndrtckts = ``;
    var tlsneeded = ``;
    var failures = ``;
    var failureresolutiontext = ``;
    // console.log(data)
    if (data.vendor_Id != 0) {
        vendorid = `,vndr_id=${data.vendor_Id}`
    } else {
        vendorid = ''
    }
    if (data.element_Id != 0) {
        elementid = `,elmnt_id=${data.element_Id}`
    } else {
        elementid = ''
    }
    if (data.sechdulestart_Id != 0) {
        schdlestrtts = `,schdle_strt_ts='${data.sechdulestart_Id}'`
    } else {
        schdlestrtts = ''
    }
    if (data.sechduleend_Id != 0) {
        schdleendts = `,schdle_end_ts='${data.sechduleend_Id}'`
    } else {
        schdleendts = ''
    }
    if (data.expectedresults != 0) {
        experslts = `,exptd_rslt_tx='${data.expectedresults}'`
    } else {
        experslts = ''
    }
    if (data.releasenotes != 0) {
        releasents = `,rlse_nts_tx='${data.releasenotes}'`
    } else {
        releasents = ''
    }
    if (data.softwaredetails != 0) {
        sftwredtls = `,sftwe_dtls_tx='${data.softwaredetails}'`
    } else {
        sftwredtls = ''
    }
    if (data.hardwaredetails != 0) {
        hrdwredtls = `,hrdwe_dtl_tx='${data.hardwaredetails}'`
    } else {
        hrdwredtls = ''
    }
    // console.log(data.praposerchanges)
    if (data.praposerchanges != 0) {
        prpsechngs = `,prpsd_chngs_tx='${data.praposerchanges}'`
    } else {
        prpsechngs = ''
    }
    if (data.vendorticket != 0) {
        vndrtckts = `,vndr_tkt_tx='${data.vendorticket}'`
    } else {
        vndrtckts = ''
    }
    if (data.toolsneeded != 0) {
        tlsneeded = `,tls_nd='${data.toolsneeded}'`
    } else {
        tlsneeded = ''
    }
    if (data.failures != 0) {
        failures = `,flrs_tx='${data.failures}'`
    } else {
        failures = ''
    }
    if (data.failurersolution != 0) {
        failureresolutiontext = `,flrs_rsltn_tx='${data.failurersolution}'`
    } else {
        failureresolutiontext = ''
    }

    var QRY_TO_EXEC = `update sprt_chge_tkt_dtl_t set u_ts=CURRENT_TIMESTAMP(),updte_usr_id =${user.mrcht_usr_id}
    ${vendorid} ${elementid} ${schdlestrtts} ${schdleendts} ${experslts} ${releasents} ${sftwredtls} ${hrdwredtls} ${prpsechngs} 
    ${vndrtckts} ${tlsneeded} ${failures} ${failureresolutiontext}
     where tckt_id=${tic_id};`

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
* Function      : InsCAFDetailsMdl
* Description   : Inserrt CAF relation Data
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsCAFDetailsMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "InsCAFDetailsMdl"
    var data = tic_data
    var QRY_TO_EXEC = `INSERT INTO sprt_caf_tkt_dtl_t (tckt_id, caf_id, ise_type_id, ise_idnfr_id, crte_usr_id, a_in,  i_ts)
    VALUES ('${tic_id}', '${data.caf}', '${data.issuetype}', '${data.issueIdentifier}', '${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP());`


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : InsLMODetailsMdl
* Description   : Inserrt CAF relation Data
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
// exports.InsLMODetailsMdl = (tic_id, tic_data, user, callback) => {
//     var data = tic_data
//     var QRY_TO_EXEC = `INSERT INTO sprt_lmo_tkt_dtl_t (tckt_id, agnt_id, ise_type_id, ise_idnfr_id, lmo_in, crte_usr_id, a_in, i_ts) 
//     VALUES ('${tic_id}', '${data.lmo_id}', '${data.issuetype}', '${data.issueIdentifier}',1, '${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP());`


//     if (callback && typeof callback == "function")
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     else
//         return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// }

/*****************************************************************************
* Function      : insTcktDcmntDetailsMdl
* Description   : Inser Attachment Data 
* Arguments     : callback function
* Change History :
* 08/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.insTcktDcmntDetailsMdl = (dcmnt_data, url, req_id, user, callback) => {
    var fnm = "insTcktDcmntDetailsMdl"
    var data = dcmnt_data.attah_data
    // attachmentUtils.uploadToS3([data.base64], 'wetrackon/image_upload', (err, attChres) => {
    //     let url = attChres[0].Location
    // data.desc = data.desc.replace(/'/g, "''");
    // data.trmsCndtns = data.trmsCndtns.replace(/'/g, "''");
    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_atcht_dtl_t (atcht_url_tx, atcht_url_nm, tckt_id, crte_usr_id, a_in, i_ts)
         VALUES ('${url}','${data.file_name}',${req_id},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP());`;

    console.log(QRY_TO_EXEC)
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', (err, results) => {
    //     callback(err, results)
    // });
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

    // })

}


/*****************************************************************************
* Function      : getDetailsMdl
* Description   : get details
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTi  - Initial Function
*
******************************************************************************/
exports.getDetailsMdl = (user, callback) => {
    var fnm = "getDetailsMdl"
    var QRY_TO_EXEC = `SELECT su.usr_id,su.usr_nm,su.tm_id from mrcht_usr_lst_t as m
                        join sprt_tckt_usr_tm_rel_t as su on m.mrcht_usr_id = su.usr_id
                        where m.mrcht_usr_id ='${user.mrcht_usr_id}' and su.a_in =1;`
                        console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCallCenterMdl
* Description   : get details
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTi  - Initial Function
*
******************************************************************************/
exports.getCallCenterMdl = (data, user) => {
    var fnm = "getCallCenterMdl"
    var QRY_TO_EXEC = [`SELECT tckt_sts_id AS id,tckt_sts_nm as mnu_itm_nm,icn_tx as mnu_icn_tx,'STATUS' as indicator,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr from sprt_tkt_sts_lst_t where a_in =1 ORDER BY tckt_sts_nm`,
        `SELECT tckt_type_id as id,tckt_type_nm as mnu_itm_nm,'TYPE' as indicator,icn_tx as mnu_icn_tx,
                        icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr 
                        from sprt_tckt_type_lst_t where a_in =1
                        ORDER BY tckt_type_id`,
        `SELECT tckt_type_id,tckt_ctgry_id as id,tckt_ctgry_nm as mnu_itm_nm,'CATEGORY' as indicator,
                        icn_tx as mnu_icn_tx,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr 
                        from sprt_tckt_ctgry_lst_t 
                        ORDER BY tckt_ctgry_id`,
        `SELECT tckt_ctgry_id,tckt_sb_ctgry_id as id,tckt_sb_ctgry_nm as mnu_itm_nm,'SUBCATEGORY' as indicator,icn_tx as mnu_icn_tx,
                        icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr
                        from sprt_tckt_sb_ctgry_lst_t 
                        ORDER BY tckt_ctgry_id,tckt_sb_ctgry_id`,
        `SELECT prty_id AS id,prty_nm as mnu_itm_nm,'PRIORITY' as indicator,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr from sprt_prty_lst_t where a_in =1 ORDER BY prty_nm`]
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getOtherTeamMdl
* Description   : get details
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTi  - Initial Function
*
******************************************************************************/
exports.getOtherTeamMdl = (data, user) => {
    var fnm = "getOtherTeamMdl"
    var QRY_TO_EXEC = [`SELECT tckt_sts_id AS id,tckt_sts_nm as mnu_itm_nm,icn_tx as mnu_icn_tx,'STATUS' as indicator,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr from sprt_tkt_sts_lst_t where a_in =1 ORDER BY tckt_sts_nm`,
        `SELECT t.tm_id as teamid,stt.tckt_type_id as id,stt.tckt_type_nm as mnu_itm_nm,'TYPE' as indicator,stt.icn_tx as mnu_icn_tx,stt.icn_tx_bg_clr as mnu_icn_tx_bg,stt.icn_tx_clr as mnu_icn_tx_clr
                        from mrcht_usr_lst_t as m
                        JOIN sprt_tckt_usr_tm_rel_t as su on m.mrcht_usr_id = su.usr_id
                        JOIN sprt_tm_sprt_tckt_rel_t as st on st.tm_id = su.tm_id
                        LEFT JOIN sprt_tm_lst_t as t on t.tm_id = su.tm_id
                        LEFT JOIN sprt_tckt_type_lst_t as stt on stt.tckt_type_id = st.tckt_type_id
                        where m.mrcht_usr_id = '${user.mrcht_usr_id}' and st.a_in =1
                        GROUP BY stt.tckt_type_nm
                        ORDER BY stt.tckt_type_nm`,
        `SELECT t.tm_id as teamid,stt.tckt_type_id,stc.tckt_ctgry_id as id,stc.tckt_ctgry_nm as mnu_itm_nm,'CATEGORY' as indicator,stc.icn_tx as mnu_icn_tx,stc.icn_tx_bg_clr as mnu_icn_tx_bg,stc.icn_tx_clr as mnu_icn_tx_clr
                        from mrcht_usr_lst_t as m
                        JOIN sprt_tckt_usr_tm_rel_t as su on m.mrcht_usr_id = su.usr_id
                        JOIN sprt_tm_sprt_tckt_rel_t as st on st.tm_id = su.tm_id
                        LEFT JOIN sprt_tm_lst_t as t on t.tm_id = su.tm_id
                        LEFT JOIN sprt_tckt_type_lst_t as stt on stt.tckt_type_id = st.tckt_type_id
                        LEFT JOIN sprt_tckt_ctgry_lst_t as stc on stc.tckt_ctgry_id = st.tckt_ctgry_id
                        where m.mrcht_usr_id = '${user.mrcht_usr_id}' and st.a_in =1  and stc.tckt_ctgry_id is not NULL
                        GROUP BY stc.tckt_ctgry_nm
                        ORDER BY stc.tckt_ctgry_nm`,
        `SELECT t.tm_id as teamid,stt.tckt_type_id,stc.tckt_ctgry_id,sts.tckt_sb_ctgry_id as id,sts.tckt_sb_ctgry_nm as mnu_itm_nm,'SUBCATEGORY' as indicator,sts.icn_tx as mnu_icn_tx,
                        sts.icn_tx_bg_clr as mnu_icn_tx_bg,sts.icn_tx_clr as mnu_icn_tx_clr
                        from mrcht_usr_lst_t as m
                        JOIN sprt_tckt_usr_tm_rel_t as su on m.mrcht_usr_id = su.usr_id
                        JOIN sprt_tm_sprt_tckt_rel_t as st on st.tm_id = su.tm_id
                        LEFT JOIN sprt_tm_lst_t as t on t.tm_id = su.tm_id
                        LEFT JOIN sprt_tckt_type_lst_t as stt on stt.tckt_type_id = st.tckt_type_id
                        LEFT JOIN sprt_tckt_ctgry_lst_t as stc on stc.tckt_ctgry_id = st.tckt_ctgry_id
                        LEFT JOIN sprt_tckt_sb_ctgry_lst_t as sts on sts.tckt_sb_ctgry_id = st.tckt_sb_ctgry_id
                        where m.mrcht_usr_id = '${user.mrcht_usr_id}' and st.a_in =1
                        GROUP BY sts.tckt_sb_ctgry_nm
                        ORDER BY sts.tckt_sb_ctgry_nm`,
        `SELECT prty_id AS id,prty_nm as mnu_itm_nm,'PRIORITY' as indicator,icn_tx_bg_clr as mnu_icn_tx_bg,icn_tx_clr as mnu_icn_tx_clr from sprt_prty_lst_t where a_in =1 ORDER BY prty_nm`]

    console.log("QUERYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
    console.log(QRY_TO_EXEC);

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : acceptMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 08/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.acceptMdl = (data, user) => {
    var fnm = "acceptMdl"
    console.log(data)
    var QRY_TO_EXEC = [`update sprt_tckt_dtl_t set tckt_status_id=3,sprt_tm_id=${data.loginuserteamid},sprt_usr_id=${user.mrcht_usr_id},updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP() where tckt_id=${data.tckt_id}`,
    `insert into sprt_tkt_sts_rel_t(tckt_id,tckt_sts_id,efctve_dt,crte_usr_id,a_in,i_ts) values ('${data.tckt_id}','3',CURDATE(),'${user.mrcht_usr_id}','1',CURRENT_TIMESTAMP())`]
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}



/*****************************************************************************
* Function      : InsSprtTicketDetailMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsSprtTicketDetailMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "InsSprtTicketDetailMdl"
    var data = tic_data
    console.log(data)
    if (data.longdescription != 0) {
        var lngdesc = data.longdescription
    } else {
        var lngdesc = ''
    }
    if (data.description != 0) {
        var desc = data.description
    } else {
        var desc = ''
    }
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_dtl_t (tckt_id,tckt_qr_cd,tckt_dt,tkt_ownr_usr_id,shrt_dscn_tx,lng_dscn_tx,tckt_status_id,
        prty_id, tckt_ctgry_id, tckt_sb_ctgry_id, tckt_type_id,crte_tm_id,sprt_tm_id,tckt_crte_usr_id,crte_usr_id, a_in, i_ts)
        VALUES (${tic_id},${tic_id},CURRENT_DATE(),'${user.mrcht_usr_id}','${desc}','${lngdesc}','${data.status}','${data.priority}',
        ${data.category},${data.subcategory},${data.type},'${data.cre_tm_id}','${data.cre_tm_id}','${user.mrcht_usr_id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

    console.log("InsSprtTicketDetailMdl*****************************************InsSprtTicketDetailMdl")
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
* Function      : InsTicketTicketDtlsMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsTicketTicketDtlsMdl = (data, user) => {
    var fnm = "InsTicketTicketDtlsMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_tckt_rel_t(tckt_id,rel_tckt_id,crte_usr_id,a_in, i_ts)
                       VALUES (${data.bsrid},${data.chrid},'${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

    console.log("InsTicketTicketDtlsMdl")
    console.log(QRY_TO_EXEC);


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : EsclaTicketDtlsMdl
* Description   : get above 7 days Ticket details
* Arguments     : callback function
* Change History :
*  06/10/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.EsclaTicketDtlsMdl = (user, callback) => {
    var fnm = "EsclaTicketDtlsMdl"

    var QRY_TO_EXEC = `SELECT tckt_id,tckt_dt,tckt_crte_usr_id from sprt_tckt_dtl_t 
    where a_in=1 and clse_in =0 and escld_in= 0 and DATEDIFF(CURDATE(),date(tckt_dt)) > 6 ;`;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : updEsclaTicketDtlsMdl
* Description    : update escalation
* Arguments      : callback function
* Change History :
*  06/10/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.updEsclaTicketDtlsMdl = function (data, user, callback) {
    var fnm = "updEsclaTicketDtlsMdl"

    var QRY_TO_EXEC = [`UPDATE sprt_tckt_dtl_t SET escld_in=1, escln_tm_id=7,escld_ts= CURRENT_TIMESTAMP(),  updte_usr_id='${user.mrcht_usr_id}',u_ts=CURRENT_TIMESTAMP() WHERE tckt_id ='${data.tckt_id}'`,
    `INSERT INTO sprt_tkt_stg_dtl_t (tckt_id, chng_dt, prvs_id, crnt_id, ky_id, cmnt_id, crte_usr_id,a_in,i_ts) VALUES ('${data.tckt_id}', CURDATE(), 0, 0, 13, 0,'${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP())`];
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    //     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
};

/*****************************************************************************
* Function       : insAppStgDtlMdl
* Description    : insert Approve Stage Detail
* Arguments      : callback function
* Change History :
*  06/10/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.insAppStgDtlMdl = function (data, cmnt_id, user, callback) {
    var fnm = "insAppStgDtlMdl"

    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_stg_dtl_t (tckt_id, chng_dt, prvs_id, crnt_id, ky_id, cmnt_id, crte_usr_id,a_in,i_ts) VALUES ('${data.tckt_id}', CURDATE(), 0, 0, 15, '${cmnt_id}','${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : approveTicketMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 08/09/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.approveTicketMdl = (data, user) => {
    var fnm = "approveTicketMdl"
    var sprt_usr = ``;
    if (data.aproveuser != undefined) {
        sprt_usr = `${data.aproveuser}`
    } else {
        sprt_usr = ``
    }
    var QRY_TO_EXEC = `update sprt_tckt_dtl_t set aprvl_tm_in=1,aprvl_usr_id=${user.mrcht_usr_id},sprt_usr_id=${sprt_usr},aprvl_ts = CURRENT_TIMESTAMP(),aprvl_cmnt_tx='${data.aprovecomment}',u_ts = CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id} where tckt_id=${data.tckt_id}`
    console.log("APPROVALLLLLLL")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : applicationDtlsMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.applicationDtlsMdl = (user) => {
    var fnm = "applicationDtlsMdl"
    var QRY_TO_EXEC = `select * from sprt_tckt_aplcn_lst_t`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : approvalTeamByAplcnIdMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.approvalTeamByAplcnIdMdl = (id, user) => {
    var fnm = "approvalTeamByAplcnIdMdl"
    var QRY_TO_EXEC = `select ar.aplcn_id,ar.tm_id,t.tm_id as tmid,t.tm_nm,t.tm_dscn_tx from 
    sprt_tckt_aplcn_tm_rel_t as ar
    LEFT JOIN sprt_tm_lst_t as t on t.tm_id=ar.tm_id
    where aplcn_id=${id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : assignTeamDtlsMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
******************************************************************************/
exports.assignTeamDtlsMdl = (user) => {
    var fnm = "assignTeamDtlsMdl"
    var QRY_TO_EXEC = `select * from sprt_tm_lst_t`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : InsSprtTicketDetailForPrvlgeMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsSprtTicketDetailForPrvlgeMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "InsSprtTicketDetailForPrvlgeMdl"
    var data = tic_data
    console.log(data)
    if (data.longdescription != 0) {
        var lngdesc = data.longdescription
    } else {
        var lngdesc = ''
    }
    if (data.description != 0) {
        var desc = data.description
    } else {
        var desc = ''
    }
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_dtl_t (tckt_id,tckt_qr_cd,tckt_dt,tkt_ownr_usr_id,shrt_dscn_tx,lng_dscn_tx,tckt_status_id,
        prty_id, tckt_ctgry_id, tckt_sb_ctgry_id, tckt_type_id,crte_tm_id,sprt_tm_id,aprvl_tm_id,tckt_crte_usr_id,crte_usr_id, a_in, i_ts)
        VALUES (${tic_id},${tic_id},CURRENT_DATE(),'${user.mrcht_usr_id}','${desc}','${lngdesc}','${data.status}','${data.priority}',
        ${data.category},${data.subcategory},${data.type},'${data.cre_tm_id}','${data.assignTeam}','${data.shouldapproveTeam}','${user.mrcht_usr_id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

    console.log("InsSprtTicketDetailForPrvlgeMdl*****************************************privilege")
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
* Function      : InsSprtTicketDetailForOccRqstMdl
* Description   : Inserrt Data
* Arguments     : callback function
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.InsSprtTicketDetailForOccRqstMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "InsSprtTicketDetailForOccRqstMdl"
    var data = tic_data
    console.log(data)
    if (data.longdescription != 0) {
        var lngdesc = data.longdescription
    } else {
        var lngdesc = ''
    }
    if (data.description != 0) {
        var desc = data.description
    } else {
        var desc = ''
    }
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_dtl_t (tckt_id,tckt_qr_cd,tckt_dt,tkt_ownr_usr_id,shrt_dscn_tx,lng_dscn_tx,tckt_status_id,
        prty_id, tckt_ctgry_id, tckt_sb_ctgry_id, tckt_type_id,crte_tm_id,sprt_tm_id,tckt_crte_usr_id,crte_usr_id, a_in, i_ts)
        VALUES (${tic_id},${tic_id},CURRENT_DATE(),'${user.mrcht_usr_id}','${desc}','${lngdesc}','${data.status}','${data.priority}',
        ${data.category},'${data.subcategory}',${data.type},'${data.cre_tm_id}','${data.assignteam}','${user.mrcht_usr_id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`

    // console.log("InsSprtTicketDetailForPrvlgeMdl*****************************************privilege")
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
* Function      : insTcktLmoDtlsMdl
* Description   : Inserrt Lmo Details
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.insTcktLmoDtlsMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "insTcktLmoDtlsMdl"
    var data = tic_data
    var QRY_TO_EXEC = `INSERT INTO sprt_lmo_tkt_dtl_t (tckt_id,agnt_id,lmo_in, crte_usr_id, a_in, i_ts) 
    VALUES ('${tic_id}', '${data.lmo_id}',1, '${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP());`

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
* Function      : insTcktLmoCAfDtlsMdl
* Description   : Inserrt Lmo Details
* Arguments     : callback function
* Change History :
* 07/09/2020    -  KOTI  - Initial Function
*
******************************************************************************/
exports.insTcktLmoCAfDtlsMdl = (tic_id, tic_data, user, callback) => {
    var fnm = "insTcktLmoCAfDtlsMdl"
    var data = tic_data
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO sprt_lmo_tckt_caf_lst_t (caf_id,tckt_id,cmnt_tx, crte_usr_id, a_in, i_ts) 
    VALUES ( '${data.caf}','${tic_id}','${data.cmnt}', '${user.mrcht_usr_id}', 1, CURRENT_TIMESTAMP());`

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
* Function      : getCafTicketDetailsMdl
* Description   : get details of LMO CAF Data
* Arguments     : callback function
* Change History :
*
******************************************************************************/
exports.getCafTicketDetailsMdl = (id, user, callback) => {
    var fnm = "getCafTicketDetailsMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (order by s.i_ts DESC) as s_no,s.caf_id,tckt_id,cmnt_tx,s.crte_usr_id,map.mrcht_usr_nm ,DATE_FORMAT(s.i_ts,'%d-%m-%Y %h:%i') as inser_date
                        from sprt_lmo_tckt_caf_lst_t s
                        LEFT JOIN mrcht_usr_lst_t as map on map.mrcht_usr_id = s.crte_usr_id
                        where s.tckt_id = '${id}' and s.a_in =1
                        order by s.i_ts DESC`;

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
* Function      : LmoDtlsMdl
* Description   : get details of LMO Data
* Arguments     : callback function
* Change History :
*
******************************************************************************/
exports.LmoDtlsMdl = (data, user, callback) => {
    var fnm = "LmoDtlsMdl"


    var QRY_TO_EXEC = `SELECT * from agnt_lst_t where agnt_cd = '${data.agnt_cd}' and a_in =1`;

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
* Function      : LmoDtlsMdl
* Description   : get details of LMO Data
* Arguments     : callback function
* Change History :
*
******************************************************************************/
exports.getClntAppSprtDtlsMdl = (data, user, callback) => {
    var fnm = "getClntAppSprtDtlsMdl"


    var QRY_TO_EXEC = `select spt.*,date_format(spt.tckt_dt,'%d-%m-%Y') as date,sts.tckt_sts_nm,stc.tckt_ctgry_nm,stt.tckt_type_nm from sprt_tckt_dtl_t spt
    join sprt_tkt_sts_lst_t as sts on sts.tckt_sts_id = spt.tckt_status_id
    join sprt_tckt_ctgry_lst_t as stc on stc.tckt_ctgry_id = spt.tckt_ctgry_id
    join sprt_tckt_sb_ctgry_lst_t as stsc on stsc.tckt_sb_ctgry_id = spt.tckt_sb_ctgry_id and stsc.tckt_ctgry_id = spt.tckt_ctgry_id
    JOIN sprt_tckt_type_lst_t as stt on stt.tckt_type_id = spt.tckt_type_id 
    where tkt_ownr_usr_id=${user.usr_ctgry_ky}`;

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
