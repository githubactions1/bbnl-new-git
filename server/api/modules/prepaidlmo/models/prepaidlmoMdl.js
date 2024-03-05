var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function       : prpdpayulmowalletchcklmoatomtxnretrackMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prpdpayulmowalletchcklmoatomtxnretrackMdl = function (data) {
	var fnm = 'prpdpayulmowalletchcklmoatomtxnretrackMdl'
    var QRY_TO_EXEC = `select * from prepaid_f_accounting where trns_mrchant_id='${data.txnid}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.basepacksAllcountMdl = function (data, user, callback) {
    var fnm = 'basepacksAllcountMdl'
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select format(COUNT(c.crnt_pln_id), 'NO') AS 'Total_CAF_count',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 79 THEN 1
        ELSE NULL
    END), 'NO') AS 'homebasiccafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (80,3000110) THEN 1
        ELSE NULL
    END), 'NO') AS 'homeminicafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =3000107 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeessentialcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =3000106 THEN 1
        ELSE NULL
    END), 'NO') AS 'homepremiumcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id=8000000 THEN 1
        ELSE NULL
    END), 'NO') AS 'homelifecafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =8000001 THEN 1
        ELSE NULL
    END), 'NO') AS 'homegoldcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =8000002 THEN 1
        ELSE NULL
    END), 'NO') AS 'homegoldpluscafs',
	format(COUNT(CASE
        WHEN c.crnt_pln_id =8000003 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeplatinumcafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000004 THEN 1
        ELSE NULL
    END), 'NO') AS 'ootminicafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000005 THEN 1
        ELSE NULL
    END), 'NO') AS 'ottmaxicafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000006 THEN 1
        ELSE NULL
    END), 'NO') AS 'ootprimecafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 9000000 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeultracafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 9000001 THEN 1
        ELSE NULL
    END), 'NO') AS 'homepiecafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (3000148,4000000) THEN 1
        ELSE NULL
    END), 'NO') AS 'testhsi60',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 3000149 THEN 1
        ELSE NULL
    END), 'NO') AS 'testhsi100',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 82 THEN 1
        ELSE NULL
    END), 'NO') AS 'homestandard',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (3000119,2000002) THEN 1
        ELSE NULL
    END), 'NO') AS 'testpack' from caf_dtl_t  as c
    left join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
    join agnt_lst_t as a on c.lmo_agnt_id = a.agnt_id
    join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id 
    where c.caf_type_id=1 and c.enty_sts_id = 6 ${whr}; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.basepackslistviewMdl = function (data, user, callback) {
    var fnm = 'basepackslistviewMdl'
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY c.caf_id DESC) as sno,c.caf_id,p.pckge_nm,a.agnt_cd,a.agnt_nm,d.dstrt_nm,c.mbl_nu,cs.cstmr_nm from caf_dtl_t  as c
    left join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
    join agnt_lst_t as a on c.lmo_agnt_id = a.agnt_id
    join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id 
    where c.caf_type_id=1 and c.enty_sts_id = 6 ${whr} and c.crnt_pln_id in (${data.plan_id}); `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/06/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.reportCreditlistdataMdl = function (data, user, callback) {
    var fnm = 'reportCreditlistdataMdl'
    var date = new Date();
    var whr = ``
    if (data.frmdate != '' && data.todate != '') {
        var frmdate = `'${data.frmdate}'`;
        var todate = `'${data.todate}'`;
    } else {
        var frmdate = `curdate()`;
        var todate = `curdate()`;
    }

    if (user.usr_ctgry_id == 1) {
        if (data.wallet_type != '' && data.wallet_type != null && data.wallet_type != "") {
            whr = ` and m.mrcht_usr_nm ='${data.wallet_type}'`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and m.usr_ctgry_ky='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and a.prnt_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select p.bank_txn as txnid,p.trns_mrchant_id as txnNo,d.dstrt_nm,p.gateway as pgateway,f.*,date_format(f.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created,m.mrcht_usr_nm,m.balance,m.fst_nm,m.mbl_nu from prepaid_f_accounting as f
     join mrcht_usr_lst_t as m  on m.mrcht_usr_id=f.admin_id
     left join prepaid_lmo_amount_transaction as p on p.trns_mrchant_id=f.trns_mrchant_id and
     p.descr in ('APPROVED OR COMPLETED SUCCESSFULLY','SUCCESS','captured','success','TRANSACTION IS SUCCESSFUL','TRANSACTION IS SUCCESSFUL.','payment.captured')
     join agnt_lst_t as a on a.agnt_id=m.usr_ctgry_ky
	left join dstrt_lst_t as d on d.dstrt_id= a.ofce_dstrt_id 	 
	 where f.ac_date between ${frmdate} and ${todate} ${whr} and money_type like '%credit%' order by f.dateCreated DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : cafcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.cafcountMdl = function (data, user, callback) {
	var fnm ='cafcountMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`; 
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    console.log("came into models")

    var QRY_TO_EXEC = `select count(*) as 'total_cafs' from caf_dtl_t where caf_type_id=1 ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user,fnm);
}

/**************************************************************************************
* Controller     : allcafcountdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allcafcountdataMdl = function (data, user, callback) {
	var fnm='allcafcountdataMdl'
    var whr = ``;
    var whrcnd= ``;
    
    var date = new Date();
    var year = new Date().getFullYear();
    var month = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `where lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `where mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `where instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if (user.usr_ctgry_id == 1) {
        whrcnd = ``;
    } else if (user.usr_ctgry_id == 8) {
        whrcnd = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whrcnd = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whrcnd = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    console.log("came into models")

    var QRY_TO_EXEC = `select count(*) as 'total_cafs' from caf_dtl_t ${whr};
    select count(*) as active from caf_dtl_t as c where c.enty_sts_id=6 ${whrcnd};
    select count(*) as suspend from caf_dtl_t as c where c.enty_sts_id=7 ${whrcnd};
    select count(*) as terminate from caf_dtl_t as c where c.enty_sts_id=8 ${whrcnd};
    select count(*) as 'termination_pending' from caf_dtl_t as c  where c.enty_sts_id=45 ${whrcnd};
    select count(*) as 'suspend_pending' from caf_dtl_t as c where c.enty_sts_id=84 ${whrcnd};
    select count(*) as 'resume_pending' from caf_dtl_t as c  where c.enty_sts_id=85 ${whrcnd};
    select count(*) as 'pending_activation' from caf_dtl_t as c  where c.enty_sts_id=1 ${whrcnd};
    select count(*) as 'Box change' from caf_dtl_t as c  where c.enty_sts_id=10 ${whrcnd};
    select count(*) as 'pon change' from caf_dtl_t as c  where c.enty_sts_id=11 ${whrcnd};
    select ifnull(sum(amount),0) as tdyamt from prepaid_f_accounting where money_type='Debit' and ac_date=curdate() ;
    select ifnull(sum(amount),0) as mnthamt from prepaid_f_accounting where money_type='Debit' and ac_date between '${year}-${month}-01' and curdate();
    select count(distinct(c.caf_id)) as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
        join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
        join caf_dtl_t as c on c.caf_id=cp.caf_id where cp.a_in=1 and p.pckge_type_id=1 ${whrcnd} and cp.cycle_end_dt=curdate();
	select count(*) as 'tdy_renwd_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where  p.pckge_type_id=1 ${whr} and  f.ac_date = curdate();
    select ifnull(sum(case when chrge_at is not null then chrge_at ELSE 0 END) + sum(case when gst_at is not null then gst_at ELSE 0 END),0) as sum_ammount from caf_pckge_prchse_dtl_t as cp 
        where cp.prpd_in=1 and cp.a_in=1 and cp.cycle_strt_dt between '${year}-${month}-01' and curdate();
    select count(distinct(c.caf_id)) as 'mntly_rnwed_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where cp.a_in=1 and p.pckge_type_id=1 ${whr} and f.ac_date between
     '${currntYear}-${currntMnth}-01' and curdate();
    select ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*mso_share/100)+round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_clctn' from caf_pckge_prchse_dtl_t as cp 
         join prepaid_f_accounting as f on f.cust_id=cp.caf_id
         join pckge_lst_t as p on f.stb_id=p.pckge_id
         join caf_dtl_t as c on c.caf_id=cp.caf_id
         join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
         join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
         left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
         where f.ac_date = curdate() ${whrcnd};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user,fnm);
}


/**************************************************************************************
* Controller     : activecafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.activecafMdl = function (data, user, callback) {
	var fnm ='activecafMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select count(*) as active from caf_dtl_t where enty_sts_id=6 and caf_type_id=1 ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : suspendMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.suspendMdl = function (data, user, callback) {
	var fnm='suspendMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }


    var QRY_TO_EXEC = `select count(*) as suspend from caf_dtl_t where enty_sts_id=7 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : terminateMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.terminateMdl = function (data, user, callback) {
	var fnm='terminateMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as terminate from caf_dtl_t where enty_sts_id=8 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : terminationpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.terminationpendingMdl = function (data, user, callback) {
	var fnm='terminationpendingMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as 'termination_pending' from caf_dtl_t  where enty_sts_id=45 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : suspendpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.suspendpendingMdl = function (data, user, callback) {
	var fnm='suspendpendingMdl'

    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select count(*) as 'suspend_pending' from caf_dtl_t where enty_sts_id=84 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : resumependingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.resumependingMdl = function (data, user, callback) {
	var fnm='resumependingMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as 'resume_pending' from caf_dtl_t  where enty_sts_id=85 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : pendingactivationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.pendingactivationMdl = function (data, user, callback) {
	var fnm='pendingactivationMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as 'pending_activation' from caf_dtl_t  where enty_sts_id=1 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : boxchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.boxchangeMdl = function (data, user, callback) {
	var fnm='boxchangeMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as 'Box change' from caf_dtl_t  where enty_sts_id=10 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : ponchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.ponchangeMdl = function (data, user, callback) {
	var fnm='ponchangeMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as 'pon change' from caf_dtl_t  where enty_sts_id=11 and caf_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : faccountingledgerdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingledgerdataMdl = function (data, user, callback) {
	var fnm='faccountingledgerdataMdl'
    console.log("came into models")
    var whr = ``;
	var d_type = ``;
	var dateperm = ``;
    if (data.frmdate != '' && data.todate != '') {
        dateperm = `where f.ac_date between '${data.frmdate}' and '${data.todate}'`
    } else {
        dateperm = `where f.ac_date = curdate()`
    }
    if (user.usr_ctgry_id == 1) {
        if (data.ledger_type && data.ledger_type != '') {
            whr = `and mu.mrcht_usr_nm='${data.ledger_type}'`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and mu.usr_ctgry_ky='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mu.usr_ctgry_ky='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }
	if(data.type){
        if(data.type != '' &&  data.type != null && data.type != undefined){
            if(data.type==1){
                d_type = ` and f.money_type = 'Credit'`
            } else if(data.type == 2) {
                d_type = ` and f.money_type = 'Debit'`
            }  
        }
    }
	if(data.cafid){
        if (data.cafid != '' && data.cafid != null && data.cafid != undefined) {
            dateperm = `where f.cust_id=${data.cafid}`
        }
    }
    var QRY_TO_EXEC = `select f.*,date_format(c.actvn_dt,'%Y-%m-%d %H:%i:%S') as caf_actvn_dt,date_format(f.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created
	,date_format(f.strt_date,'%Y-%m-%d %H:%i:%S') as startdate,date_format(f.end_date,'%Y-%m-%d %H:%i:%S') as enddate,'N/A' as 'gateway',mu.mrcht_usr_nm,cs.cstmr_nm
	,case when p.pckge_type_id=1 then p.bse_pck_price+59 else ifnull(p.chrge_at+p.gst_at,0) end as pack_amount,c.mbl_nu,p.pckge_type_id,
     case when c.mdlwe_sbscr_id is null then 'N/A' else c.mdlwe_sbscr_id end as sbscr_code from prepaid_f_accounting as f 
    join mrcht_usr_lst_t as mu on mu.mrcht_usr_id=f.admin_id
	#join agnt_lst_t as a on a.agnt_id=mu.usr_ctgry_ky
    left join caf_dtl_t as c on c.caf_id=f.cust_id
    left join cstmr_dtl_t as cs on c.cstmr_id=cs.cstmr_id 
	#left join prepaid_lmo_amount_transaction as pt on mu.mrcht_usr_id= pt.mrcht_usr_id
	left join pckge_lst_t as p on p.pckge_id=f.stb_id
    ${dateperm} ${whr} ${d_type} group by f_ac_id order by f_ac_id DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : faccountingwebledgerdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingwebledgerdataMdl = function (data, user, callback) {
	var fnm='faccountingwebledgerdataMdl'
    console.log("came into models")
    var whr = ``;
	var d_type = ``;
	var dateperm = ``;
    if (data.frmdate != '' && data.todate != '') {
        dateperm = `where f.ac_date between '${data.frmdate}' and '${data.todate}'`
    } else {
        dateperm = `where f.ac_date = curdate()`
    }
    if (user.usr_ctgry_id == 1) {
        if (data.ledger_type && data.ledger_type != '') {
            whr = `and mu.mrcht_usr_nm='${data.ledger_type}'`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and mu.usr_ctgry_ky='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mu.usr_ctgry_ky='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }
	if(data.type){
        if(data.type != '' &&  data.type != null && data.type != undefined){
            if(data.type==1){
                d_type = ` and f.money_type = 'Credit'`
            } else if(data.type == 2) {
                d_type = ` and f.money_type = 'Debit'`
            }  
        }
    }
	if(data.cafid){
        if (data.cafid != '' && data.cafid != null && data.cafid != undefined) {
            dateperm = `where f.cust_id=${data.cafid}`
        }
    }
    var QRY_TO_EXEC = `select f.*,date_format(c.actvn_dt,'%Y-%m-%d %H:%i:%S') as caf_actvn_dt,date_format(f.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created
	,date_format(f.strt_date,'%Y-%m-%d %H:%i:%S') as startdate,date_format(f.end_date,'%Y-%m-%d %H:%i:%S') as enddate,'N/A' as 'gateway',mu.mrcht_usr_nm,cs.cstmr_nm
	,case when p.pckge_type_id=1 then p.bse_pck_price+59 else ifnull(p.chrge_at+p.gst_at,0) end as pack_amount,c.mbl_nu,p.pckge_type_id,
     case when c.mdlwe_sbscr_id is null then 'N/A' else c.mdlwe_sbscr_id end as sbscr_code from prepaid_f_accounting as f 
    join mrcht_usr_lst_t as mu on mu.mrcht_usr_id=f.admin_id
	#join agnt_lst_t as a on a.agnt_id=mu.usr_ctgry_ky
    join caf_dtl_t as c on c.caf_id=f.cust_id
    join cstmr_dtl_t as cs on c.cstmr_id=cs.cstmr_id 
	#left join prepaid_lmo_amount_transaction as pt on mu.mrcht_usr_id= pt.mrcht_usr_id
	left join pckge_lst_t as p on p.pckge_id=f.stb_id
    ${dateperm} ${whr} ${d_type} group by f_ac_id order by f_ac_id DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/*****************************************************************************
* Function       : checkinsertprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.checkinsertprpdlmoamtdtlsMdl = function (data, user, callback) {
	var fnm='checkinsertprpdlmoamtdtlsMdl'

    var QRY_TO_EXEC = `select * from prepaid_lmo_amount_transaction where trns_mrchant_id='${data.trns_mrchant_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,"hello", cntxtDtls,user,fnm);
};

/**************************************************************************************
* Controller     : chklmoblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chklmoblnceFaccountingMdl = function (data, user, callback) {
	var fnm='chklmoblnceFaccountingMdl'

    var QRY_TO_EXEC = `select count(app.caf_id) as 'count', m.balance,m.mrcht_usr_id,m.pswrd_encrd_tx as pwd  from mrcht_usr_lst_t as m
    left join app_psh_ntfy_dtl_t as app on app.lmo_agnt_id=m.usr_ctgry_ky and seen=0 where m.mrcht_usr_id=${user.mrcht_usr_id} group by mrcht_usr_id `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : insrtblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insrtblnceFaccountingMdl = function (data, newblnce, result, user, callback) {
	var fnm='insrtblnceFaccountingMdl'

    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance=${newblnce} where mrcht_usr_id=${user.mrcht_usr_id};
    insert into prepaid_f_accounting set trns_mrchant_id='${data.trns_mrchant_id}',admin_id=${user.mrcht_usr_id},money_type='Credit',ac_date=curdate(),dateCreated=current_timestamp(),created_by=${user.usr_ctgry_ky},remarks='${user.frst_nm}',open_bal='${result.balance}',amount='${data.balance}',close_bal='${newblnce}'`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : tdayblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.tdayblnceFaccountingMdl = function (data, user, callback) {
	var fnm='tdayblnceFaccountingMdl'
    var QRY_TO_EXEC = `select ifnull(sum(amount)*-1,0) as tdyamt from prepaid_f_accounting where money_type='Debit' and ac_date=curdate() ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : mnthblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.mnthblnceFaccountingMdl = function (data, user, callback) {
	var fnm='mnthblnceFaccountingMdl'
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var QRY_TO_EXEC = `select ifnull(sum(amount)*-1,0) as mnthamt from prepaid_f_accounting where money_type='Debit' and ac_date between '${year}-${month}-01' and curdate()`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : expiredcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.expirtedcafMdl = function (data, user, callback) {
	var fnm='expirtedcafMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
	join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id	where p.pckge_type_id=1 and cp.a_in=1 ${whr} and cp.cycle_end_dt=curdate() and c.enty_sts_id not in (8,45,7) and a.prpd_flag=1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : paymentapprovalMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.paymentapprovalsMdl = function (data, user, callback) {
	var fnm='paymentapprovalsMdl'
    var QRY_TO_EXEC = `;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : monthly renewd caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.monthlyrenewdcafMdl = function (data, user, callback) {
	var fnm='monthlyrenewdcafMdl'
    var whr = ``
    var date = new Date();
    var currntMnth = date.getMonth()+1;
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as 'mntly_rnwed_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 ${whr} and cp.caf_date between
     '${currntYear}-${currntMnth}-01' and curdate() and operation='Resume';`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}


/**************************************************************************************
* Controller     : allcafcountdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allcafamtdataMdl = function (data, user, callback) {
	var fnm='allcafamtdataMdl'

    var date = new Date();
    var whr = ``;
    var whre = ``;
    var wher=``;
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;
    if (user.usr_ctgry_id == 1) {
        join = `ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_rvnue'`
        whre = ``;
    } else if (user.usr_ctgry_id == 8) {
        join = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        whre = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        join = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        whre = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
		join = `ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_rvnue'`
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if (user.usr_ctgry_id == 1) {
        jon = `round(ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0)) as 'ttl_apsfl_mnth_rvnue'`
        wher = ``;
    } else if (user.usr_ctgry_id == 8) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        wher = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        wher = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
		join = `ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_rvnue'`
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC =`select ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_mnth_clctn' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() ${whr};
    select ${jon} from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() ${wher};
    select ${join} from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date = curdate() ${whre};`

    console.log("came into models");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user,fnm);
}


/**************************************************************************************
* Controller     : today renewd caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todayrenewdcafMdl = function (data, user, callback) {
	var fnm='todayrenewdcafMdl'
    var whr = ``
    var currntMnth = new Date().getMonth()
    var currntYear = new Date().getFullYear();
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    // var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as 'tdy_renwd_caf' from caf_pckge_prchse_dtl_t as cp 
	// join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    // join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    // join caf_dtl_t as c on c.caf_id=cp.caf_id where  p.pckge_type_id=1 ${whr} and  cp.caf_date = curdate() and operation='Resume';`
	var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as 'tdy_renwd_caf' from caf_pckge_prchse_dtl_t as cp 
	 join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
     join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id 
	where  p.pckge_type_id=1 ${whr} and cp.a_in=1 and DATE_FORMAT(f.ac_date,'%Y-%m-%d') = curdate()`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : today revenue caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todayrevenueMdl = function (data, user, callback) {
	var fnm='todayrevenueMdl'
    var date = new Date();
    var whr = ``;
    var jon = ``;
    if (user.usr_ctgry_id == 1) {
        jon = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) + ifnull(round(sum(bse_pck_price*mso_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        jon = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) + ifnull(round(sum(bse_pck_price*mso_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        jon = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) + ifnull(round(sum(bse_pck_price*mso_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        jon = `ifnull(round(sum(bse_pck_price*lmo_share/100)),0) + ifnull(round(sum(bse_pck_price*mso_share/100)),0) as 'ttl_apsfl_tdy_rvnue'`
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ${jon} from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    where f.ac_date = curdate() ${whr} and p.pckge_type_id=1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : mmonthly revenue caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.monthlyrevenueMdl = function (data, user, callback) {
	var fnm='monthlyrevenueMdl'
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var jon = ``;
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) + round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) + round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) + round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        jon = `round(ifnull(sum(bse_pck_price*lmo_share/100),0)) + round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_mnth_rvnue'`
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ${jon} from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id 
    where f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() ${whr} and p.pckge_type_id=1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todaycollectionMdl = function (data, user, callback) {
	var fnm='todaycollectionMdl'
    var date = new Date();
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_clctn' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id  and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id 
    where f.ac_date = curdate()  and p.pckge_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*  changes durga  - remove c.apsfl_bbnl=4 condition removed
***************************************************************************************/
exports.monthlycollectionMdl = function (data, user, callback) {
	var fnm='monthlycollectionMdl'
    var date = new Date();
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ifnull(sum(round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_mnth_clctn' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id 
    where f.ac_date between '${crntYear}-${crntMnth}-01' and curdate()  and p.pckge_type_id=1 ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : today collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionMdl = function (data, user, callback) {
	var fnm='onlinecollectionMdl'
	var whr = ``;
	if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    var QRY_TO_EXEC = `select IFNULL(cast(SUM(amt) as decimal(10,2)),0) as sum_ammount from sub_alacarte_transaction as s
    join caf_dtl_t as c on c.caf_id=s.caf_id
     where f_code='Ok' ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : online collection list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinelistdataMdl = function (data, user, callback) {
	var fnm='onlinelistdataMdl'

    var date = new Date();
    var currntMnth = date.getMonth()
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where  cp.prpd_in=1 and cp.a_in=1 ${whr} and cp.cycle_strt_dt between '${currntYear}-${currntMnth}-01' and curdate();`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.reportlistdataMdl = function (data, user, callback) {
	var fnm='reportlistdataMdl'
    var date = new Date();
    var whr = ``
    if (data.frmdate != '' && data.todate != '') {
        var frmdate = `'${data.frmdate}'`;
        var todate = `'${data.todate}'`;
    } else {
        var frmdate = `curdate()`;
        var todate = `curdate()`;
    }

    if (user.usr_ctgry_id == 1) {
        if (data.wallet_type != '') {
            whr = ` and a.agnt_cd ='${data.wallet_type}'`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and a.agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and a.prnt_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }

    /*var QRY_TO_EXEC = `select case when f.money_type='Credit' then p.bank_txn else f.receipt_id end as txnid,case when f.money_type='Credit' then p.gateway else f.operation end as pgateway,f.*,date_format(f.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created,m.mrcht_usr_nm,m.balance,m.fst_nm,m.mbl_nu from prepaid_f_accounting as f
     join mrcht_usr_lst_t as m  on m.mrcht_usr_id=f.admin_id
	 left join prepaid_lmo_amount_transaction as p on p.trns_mrchant_id=f.trns_mrchant_id and
     p.descr in ('APPROVED OR COMPLETED SUCCESSFULLY','SUCCESS','captured','success','TRANSACTION IS SUCCESSFUL','TRANSACTION IS SUCCESSFUL.')
     join agnt_lst_t as a on a.agnt_id=m.usr_ctgry_ky  where f.ac_date between ${frmdate} and ${todate} ${whr} order by f.dateCreated asc;`; */
	var QRY_TO_EXEC = `select pf.receipt_id  as txnid,pf.operation as pgateway,d.dstrt_nm,pf.*,date_format(pf.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created,agnt_cd as mrcht_usr_nm,
	ofce_cntct_nm as fst_nm,ofce_mbl_nu as mbl_nu  
	from prepaid_f_accounting as pf
	#join caf_pckge_prchse_dtl_t as cp on cp.caf_id=pf.cust_id and cp.pckge_id=pf.stb_id 
	#and date_format(cp.i_ts,'%Y-%m-%d') between ${frmdate} and ${todate}
	#join pckge_lst_t as p on pf.stb_id=p.pckge_id
	#join caf_dtl_t as c on c.caf_id=cp.caf_id  
	#join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
	  #join mrcht_usr_lst_t as m  on m.mrcht_usr_id=pf.admin_id 
	  join agnt_lst_t as a on a.agnt_id=pf.created_by ${whr}
     left join dstrt_lst_t as d on d.dstrt_id= a.ofce_dstrt_id
	  where pf.ac_date between ${frmdate} and ${todate}
	  and pf.cust_id <> 0 #and pf.stb_id <> 0
	  order by pf.dateCreated asc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}
/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.sharingreportdataMdl = function (data, user, callback) {
	var fnm='sharingreportdataMdl'
    var date = new Date();
    var whr = ``
    var cp_date = ``
    var pf_date = ``
    if (data.frmdate != '' && data.todate != '') {
		if( data.frmdate == data.todate ){
			cp_date = ` and date(cp.i_ts) = '${data.frmdate}'`
			pf_date = ` pf.ac_date = '${data.frmdate}'`
		} else {
			cp_date = ` and date(cp.i_ts) between ${data.frmdate} and ${data.todate} `
			pf_date = ` pf.ac_date between ${data.frmdate} and ${data.todate} `
		}
        var frmdate = `'${data.frmdate}'`;
        var todate = `'${data.todate}'`;
    } else {
		cp_date = ` and date(cp.i_ts) = '${data.frmdate}'`
		pf_date = ` pf.ac_date = '${data.frmdate}'`
    }

    if (user.usr_ctgry_id == 1) {
        if (data.apsflsharing_type != '') {
            whr = ` and a.agnt_cd ='${data.apsflsharing_type}'`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select cu.frst_nm,c.caf_id as cust_id,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as date_created,a.agnt_cd as LMO_CODE,'' as MSO_CODE,
     p.pckge_nm,
     round(pf.amount,2) as 'APSFL_share',
      round(bse_pck_price*lmo_share/100)  as 'LMO_share',
     round(bse_pck_price*mso_share/100)  as 'MSO_share',
     (case when p.pckge_type_id=1 then cpe_rental else 0 end) as cpe_rental,
     (case when p.pckge_type_id=1 then round(cpe_rental*tax/100) else 0 end) as 'tax'
     ,(case when pf.operation not in  ('Plan Change') then round(bse_pck_price+round(cpe_rental*tax/100,2)+cpe_rental,2) else pf.amount end) as 'bse_pck_price'
     ,round(pf.amount,2) as 'ttl_apsfl'
     from prepaid_f_accounting as pf
	join caf_pckge_prchse_dtl_t as cp on cp.caf_id=pf.cust_id and cp.pckge_id=pf.stb_id ${cp_date}
	#and date(cp.i_ts) between ${frmdate} and ${todate}
	join pckge_lst_t as p on pf.stb_id=p.pckge_id
	join caf_dtl_t as c on c.caf_id=cp.caf_id  
	join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
	join agnt_lst_t as a on a.agnt_id=pf.created_by ${whr}
	#join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
	where ${pf_date}
	#pf.ac_date between ${frmdate} and ${todate}
	and pf.cust_id <> 0 and pf.stb_id <> 0;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : walletamountfrlmoMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.walletamountfrlmoMdl = function (user, callback) {
	var fnm='walletamountfrlmoMdl'
    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t where mrcht_usr_id=${user.mrcht_usr_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}


/*****************************************************************************
* Function       : getpackgedataremvlfrapp
* Description    : 
* Arguments      : callback function
* Change History :
* 18/04/2022   - Ramesh - Initial Function
******************************************************************************/
exports.getpackgedatafrbsscafremvlfrapp = function (callback) {
	var fnm='getpackgedatafrbsscafremvlfrapp'
    var QRY_TO_EXEC = `select cp.caf_id,GROUP_CONCAT(cp.pckge_id) as package_ids,GROUP_CONCAT(cp.pkge_prche_id) as pkge_prche_id,c.mdlwe_sbscr_id as mdlw_sbscr_id,c.enty_sts_id FROM caf_pckge_prchse_dtl_t as cp
    join caf_dtl_t as c on c.caf_id=cp.caf_id where (cp.prpd_in = 1 or cp.prpd_in is null or cp.prpd_in =0) and cp.a_in=1 and cp.cycle_end_dt =  curdate()-1 GROUP BY cp.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : removeAddonsfrspndMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 10/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.removeAddonsfrspndMdl = (data, user) => {
	var fnm='removeAddonsfrspndMdl'
    var QRY_TO_EXEC = `UPDATE caf_pckge_prchse_dtl_t set expry_dt = CURRENT_DATE(), a_in = 0, sbscrptn_req_in = 0, dscnt_in = 1, expry_dt = CURDATE(), dscnt_ts = CURRENT_TIMESTAMP(), dscnt_srce_id = 2, updte_usr_id='123456',
    u_ts = CURRENT_TIMESTAMP() WHERE pkge_prche_id in (${data.pkge_prche_id}) and a_in=1 and prpd_in =1 and caf_id = ${data.caf_id}`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : getpackgedatafrremvlfrmMWapp
* Description    : 
* Arguments      : callback function
* Change History :
* 10/01/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getpackgedatafrremvlfrmMWapp = function (data) {
	var fnm='getpackgedatafrremvlfrmMWapp'

    var QRY_TO_EXEC = `select p.*,DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expiry_dt,DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efect_dt,
    ps.srvcpk_id,p1.chrge_at,p1.gst_at from pckge_lst_t as p
     join pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id where p.pckge_id in (${data.package_ids}) and p.a_in=1 AND ps.cre_srvce_id = 2;`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
    };

/*****************************************************************************
* Function       : removeAddonsfrcafMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 18/04/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.removeAddonsfrcafMdl = (data, user, caf) => {
	var fnm='removeAddonsfrcafMdl'
    var QRY_TO_EXEC = `UPDATE caf_pckge_prchse_dtl_t set expry_dt = CURRENT_DATE(), a_in = 0, sbscrptn_req_in = 0, dscnt_in = 1, expry_dt = CURDATE(), dscnt_ts = CURRENT_TIMESTAMP(), dscnt_srce_id = 2, updte_usr_id='123456',
    u_ts = CURRENT_TIMESTAMP() WHERE pckge_id in (${data.package_ids}) and a_in=1 and caf_id = ${caf}`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function       : addCaffailedInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedInsrtPckgsMdl = function(str,id,cat_id,data, body, ext_json, api_response, user,callback){
	var fnm='addCaffailedInsrtPckgsMdl'
    console.log("success",data,user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (service_type,package_ids,cat_ids, ext_json, trns_mrchant_id, mdlw_sbscr_id, caf_id, status, status_code, err_msg, i_ts) VALUES ('${str}','${id}','${cat_id}','${JSON.stringify(ext_json)}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}',0,'${api_response.statusCode}','${api_response.statusMessage}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : threemnths_spndMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.threemnths_spndMdl = function(data, ct, user,callback){
	var fnm='threemnths_spndMdl'
    var QRY_TO_EXEC = `SELECT c.caf_id,c.crnt_pln_id,c.mbl_nu,c.onu_srl_nu,c.iptv_srl_nu,cst.cstmr_nm as frst_nm,c.lmo_agnt_id, cst.cstmr_id,c.enty_sts_id ,DATE_FORMAT(c.spnd_ts,'%Y-%m-%d') as spnd_ts,DATE_FORMAT(c.actvn_ts,'%Y-%m-%d') as actvn_ts, alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,d.dstrt_nm,c.mso_agnt_id,
    (case when c.onu_own_in=0 then 177
        when c.onu_own_in is null then 177
        when c.onu_own_in=1 then 0 end) as 'cpe_charge'
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    LEFT JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where c.caf_id in (select caf_id from caf_dtl_t as c where c.spnd_ts < (now() - interval 90 day) and c.enty_sts_id in (7,84) order by c.spnd_ts asc) AND c.a_in= 1 limit ${ct};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updatecafdtlthreemnths_spndMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.updatecafdtlthreemnths_spndMdl = function(data,  user,callback){
	var fnm='updatecafdtlthreemnths_spndMdl'

    var QRY_TO_EXEC = `update caf_dtl_t set trmnd_rqst_in=1,actve_in=0,spnd_in=0 where caf_id in (select c.caf_id from caf_dtl_t as c where c.spnd_ts < (now() - interval 90 day) and c.enty_sts_id in (7,84) order by c.spnd_ts asc)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insrtcafthreemnths_spndMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.insrtcafthreemnths_spndMdl = function(data,  user,callback){
	var fnm='insrtcafthreemnths_spndMdl'
    var cpe = 177;
    if(data.onu_own_in == 1){
        cpe = 0
    }
    var QRY_TO_EXEC = `insert into prepaid_caf_termination_dtl_t (caf_id, DISTRICT, caf_nm, caf_mble_no, caf_enty_sts, pckge_id, spnd_ts, lmo_agnt_id,agnt_cd, lmo_mble_no,cpe_charge, onu_srl_nm,iptv_srl_nm,mso_agnt_id, netwrk_cntct_nm, netwrk_mbl_nu, sales_cntct_nm, sales_mbl_nu, a_in, i_ts)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
    if (data && data.length > 0) {
        var counter = 0;
        data.filter((k) => {
            if (data.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
					'${k.caf_id}',
                    '${k.dstrt_nm}', 
					'${k.frst_nm}', 
					'${k.mbl_nu}',
					'${k.enty_sts_id}',
					'${k.crnt_pln_id}',
					'${k.spnd_ts}',
                    '${k.lmo_agnt_id}',
                    '${k.agnt_cd}',
                    '${k.ofce_mbl_nu}',
                    '${k.cpe_charge}',
                    '${k.onu_srl_nu}',
                    '${k.iptv_srl_nu}',
                    '${k.mso_agnt_id}',
                    '${k.netwrk_cntct_nm}',
                    '${k.netwrk_mbl_nu}',
					'${k.sales_cntct_nm}',
					'${k.sales_mbl_nu}',
                    1,
					CURRENT_TIMESTAMP()) ${dlmtr} `;
       })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getlistresumependingcafsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.getlistresumependingcafsMdl = function( user,callback){
	var fnm='getlistresumependingcafsMdl'
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = ` select c.*,cs.lmo_agnt_cd as mrcht_usr_nm,p.pckge_nm,cs.cstmr_nm,'Retrack' as 'Retrack' from caf_dtl_t as c
    join cstmr_dtl_t as cs on c.cstmr_id=cs.cstmr_id 
    join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id where c.enty_sts_id=85 and c.prpd_rsme_in=1 ${whr}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getlistsuspendpendingdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.getlistsuspendpendingdataMdl = function( user,callback){
	var fnm='getlistsuspendpendingdataMdl'
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = ` select c.*,cs.lmo_agnt_cd as mrcht_usr_nm,p.pckge_nm,cs.cstmr_nm,'Retrack' as 'Retrack' from caf_dtl_t as c
    join cstmr_dtl_t as cs on c.cstmr_id=cs.cstmr_id 
    join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id where c.enty_sts_id=84 ${whr}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insertprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.insertprpdlmoamtdtlsMdl = function(data, user,callback){
	var fnm='insertprpdlmoamtdtlsMdl';
	var gateway = 'old app'
	var order_id = 'N/A'
	var amt = data.amt;
	if(data.gateway){
		gateway = data.gateway;
	}
	if (data.order_id) {
		order_id = `${data.order_id}`;
    }
	//if(data.gateway == 'Razorpay') {
        //amt = parseFloat(data.amt)/100 
    //}

    var QRY_TO_EXEC = `INSERT INTO prepaid_lmo_amount_transaction (usr_ctgry_ky,mrcht_usr_id,lmo_code,gateway,order_id, amt,trns_mrchant_id,i_ts) VALUES ('${data.usr_ctgry_ky}','${data.mrcht_usr_id}','${data.lmo_code}','${gateway}','${order_id}','${amt}','${data.trns_mrchant_id}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : insertwebprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.insertwebprpdlmoamtdtlsMdl = function(data, user,callback){
	var fnm='insertwebprpdlmoamtdtlsMdl'

    var QRY_TO_EXEC = `INSERT INTO prepaid_lmo_amount_transaction (usr_ctgry_ky,mrcht_usr_id,lmo_code, amt,trns_mrchant_id,i_ts) VALUES ('${data.udf3}','${data.udf1}','${data.udf4}','${data.amt}','${data.transid}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updtprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.updtprpdlmoamtdtlsMdl = function(data, user,callback){
	var fnm='updtprpdlmoamtdtlsMdl'
    date = ``;
    CardNumber = ``;
    surcharge = ``;
    clientcode = ``;
    udf15 = ``;
    udf14 = ``;
    signature = ``;
    udf13 = ``;
    udf12 = ``;
    udf11 = ``;
    amt = ``;
    udf10 = ``;
    merchant_id = ``;
    mer_txn = ``;
    f_code = ``;
    bank_txn = ``;
    udf9 = ``;
    ipg_txn_id = ``;
    bank_name = ``;
    prod = ``;
    mmp_txn = ``;
    udf5 = ``;
    udf6 = ``;
    udf3 = ``;
    udf4 = ``;
    udf2 = ``;
    udf1 = ``;
    discriminator = ``;
    auth_code = ``;
    desc = ``; 
    var descamnt = data.desc +' Amount : ' +data.amt;
    console.log("descamnt",descamnt)

    if (data.date != null && data.date != '' && data.date != undefined) {
        date = `,date ='${data.date}'`
    }
    if (data.CardNumber != null && data.CardNumber != '' && data.CardNumber != undefined) {
        CardNumber = `,CardNumber ='${data.CardNumber}'`
    }
    if (data.surcharge != null && data.surcharge != '' && data.surcharge != undefined) {
        surcharge = `,surcharge ='${data.surcharge}'`
    }
    if (data.clientcode != null && data.clientcode != '' && data.clientcode != undefined) {
        clientcode = `,clientcode ='${data.clientcode}'`
    }
    if (data.udf15 != null && data.udf15 != '' && data.udf15 != undefined) {
        udf15 = `,udf15 ='${data.udf15}'`
    }
    if (data.udf14 != null && data.udf14 != '' && data.udf14 != undefined) {
        udf14 = `,udf14 ='${data.udf14}'`
    }
    if (data.signature != null && data.signature != '' && data.signature != undefined) {
        signature = `,signature ='${data.signature}'`
    }
    if (data.udf13 != null && data.udf13 != '' && data.udf13 != undefined) {
        udf13 = `,udf13 ='${data.udf13}'`
    }
    if (data.udf12 != null && data.udf12 != '' && data.udf12 != undefined) {
        udf12 = `,udf12 ='${data.udf12}'`
    }
    if (data.udf11 != null && data.udf11 != '' && data.udf11 != undefined) {
        udf11 = `,udf11 ='${data.udf11}'`
    }
    if (data.amt != null && data.amt != '' && data.amt != undefined) {
        amt = `,amt ='${data.amt}'`
    }
    if (data.udf10 != null && data.udf10 != '' && data.udf10 != undefined) {
        udf10 = `,udf10 ='${data.udf10}'`
    }
    if (data.merchant_id != null && data.merchant_id != '' && data.merchant_id != undefined) {
        merchant_id = `,merchant_id ='${data.merchant_id}'`
    }
    if (data.mer_txn != null && data.mer_txn != '' && data.mer_txn != undefined) {
        mer_txn = `,mer_txn ='${data.mer_txn}'`
    }
    if (data.f_code != null && data.f_code != '' && data.f_code != undefined) {
        f_code = `,f_code ='${data.f_code}'`
    }
    if (data.bank_txn != null && data.bank_txn != '' && data.bank_txn != undefined) {
        bank_txn = `,bank_txn ='${data.bank_txn}'`
    }
    if (data.udf9 != null && data.udf9 != '' && data.udf9 != undefined) {
        udf9 = `,udf9 ='${data.udf9}'`
    }
    if (data.ipg_txn_id != null && data.ipg_txn_id != '' && data.ipg_txn_id != undefined) {
        ipg_txn_id = `,ipg_txn_id ='${data.ipg_txn_id}'`
    }
    if (data.bank_name != null && data.bank_name != '' && data.bank_name != undefined) {
        bank_name = `,bank_name ='${data.bank_name}'`
    }
    if (data.prod != null && data.prod != '' && data.prod != undefined) {
        prod = `,prod ='${data.prod}'`
    }
    if (data.mmp_txn != null && data.mmp_txn != '' && data.mmp_txn != undefined) {
        mmp_txn = `,mmp_txn ='${data.mmp_txn}'`
    }
    if (data.udf5 != null && data.udf5 != '' && data.udf5 != undefined) {
        udf5 = `,udf5 ='${data.udf5}'`
    }
    if (data.udf6 != null && data.udf6 != '' && data.udf6 != undefined) {
        udf6 = `,udf6 ='${data.udf6}'`
    }
    if (data.udf3 != null && data.udf3 != '' && data.udf3 != undefined) {
        udf3 = `,udf3 ='${data.udf3}'`
    }
    if (data.udf4 != null && data.udf4 != '' && data.udf4 != undefined) {
        udf4 = `,udf4 ='${data.udf4}'`
    }
    if (data.udf1 != null && data.udf1 != '' && data.udf1 != undefined) {
        udf1 = `,udf1 ='${data.udf1}'`
    }
    if (data.udf2 != null && data.udf2 != '' && data.udf2 != undefined) {
        udf2 = `,udf2 ='${data.udf2}'`
    }
    if (data.discriminator != null && data.discriminator != '' && data.discriminator != undefined) {
        discriminator = `,discriminator ='${data.discriminator}'`
    }
    if (data.auth_code != null && data.auth_code != '' && data.auth_code != undefined) {
        auth_code = `,auth_code ='${data.auth_code}'`
    }

    var QRY_TO_EXEC = `update prepaid_lmo_amount_transaction set descr ='${data.desc}' ${date} ${CardNumber} ${surcharge} ${clientcode} ${udf15} ${udf14} ${signature} ${udf13} ${udf12}
     ${udf11} ${udf10} ${amt} ${merchant_id} ${mer_txn} ${f_code} ${bank_txn} ${bank_txn} ${udf9} ${ipg_txn_id}
     ${bank_name} ${prod} ${mmp_txn} ${udf5} ${udf6} ${udf3} ${udf4} ${udf1} ${udf2} ${discriminator} ${auth_code} ,u_ts=CURRENT_TIMESTAMP() where trns_mrchant_id='${data.trns_mrchant_id}' ;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : webupdtprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.webupdtprpdlmoamtdtlsMdl = function(data,callback){
	var fnm='webupdtprpdlmoamtdtlsMdl'
    date = ``;
    CardNumber = ``;
    surcharge = ``;
    clientcode = ``;
    udf15 = ``;
    udf14 = ``;
    signature = ``;
    udf13 = ``;
    udf12 = ``;
    udf11 = ``;
    amt = ``;
    udf10 = ``;
    merchant_id = ``;
    mer_txn = ``;
    f_code = ``;
    bank_txn = ``;
    udf9 = ``;
    ipg_txn_id = ``;
    bank_name = ``;
    prod = ``;
    mmp_txn = ``;
    udf5 = ``;
    udf6 = ``;
    udf3 = ``;
    udf4 = ``;
    udf2 = ``;
    udf1 = ``;
    discriminator = ``;
    auth_code = ``;
    desc = ``; 
    var descamnt = data.desc +' Amount : ' +data.amt;
    console.log("descamnt",descamnt)

    if (data.date != null && data.date != '' && data.date != undefined) {
        date = `,date ='${data.date}'`
    }
    if (data.CardNumber != null && data.CardNumber != '' && data.CardNumber != undefined) {
        CardNumber = `,CardNumber ='${data.CardNumber}'`
    }
    if (data.surcharge != null && data.surcharge != '' && data.surcharge != undefined) {
        surcharge = `,surcharge ='${data.surcharge}'`
    }
    if (data.clientcode != null && data.clientcode != '' && data.clientcode != undefined) {
        clientcode = `,clientcode ='${data.clientcode}'`
    }
    if (data.udf15 != null && data.udf15 != '' && data.udf15 != undefined) {
        udf15 = `,udf15 ='${data.udf15}'`
    }
    if (data.udf14 != null && data.udf14 != '' && data.udf14 != undefined) {
        udf14 = `,udf14 ='${data.udf14}'`
    }
    if (data.signature != null && data.signature != '' && data.signature != undefined) {
        signature = `,signature ='${data.signature}'`
    }
    if (data.udf13 != null && data.udf13 != '' && data.udf13 != undefined) {
        udf13 = `,udf13 ='${data.udf13}'`
    }
    if (data.udf12 != null && data.udf12 != '' && data.udf12 != undefined) {
        udf12 = `,udf12 ='${data.udf12}'`
    }
    if (data.udf11 != null && data.udf11 != '' && data.udf11 != undefined) {
        udf11 = `,udf11 ='${data.udf11}'`
    }
    if (data.amt != null && data.amt != '' && data.amt != undefined) {
        amt = `,amt ='${data.amt}'`
    }
    if (data.udf10 != null && data.udf10 != '' && data.udf10 != undefined) {
        udf10 = `,udf10 ='${data.udf10}'`
    }
    if (data.merchant_id != null && data.merchant_id != '' && data.merchant_id != undefined) {
        merchant_id = `,merchant_id ='${data.merchant_id}'`
    }
    if (data.mer_txn != null && data.mer_txn != '' && data.mer_txn != undefined) {
        mer_txn = `,mer_txn ='${data.mer_txn}'`
    }
    if (data.f_code != null && data.f_code != '' && data.f_code != undefined) {
        f_code = `,f_code ='${data.f_code}'`
    }
    if (data.bank_txn != null && data.bank_txn != '' && data.bank_txn != undefined) {
        bank_txn = `,bank_txn ='${data.bank_txn}'`
    }
    if (data.udf9 != null && data.udf9 != '' && data.udf9 != undefined) {
        udf9 = `,udf9 ='${data.udf9}'`
    }
    if (data.ipg_txn_id != null && data.ipg_txn_id != '' && data.ipg_txn_id != undefined) {
        ipg_txn_id = `,ipg_txn_id ='${data.ipg_txn_id}'`
    }
    if (data.bank_name != null && data.bank_name != '' && data.bank_name != undefined) {
        bank_name = `,bank_name ='${data.bank_name}'`
    }
    if (data.prod != null && data.prod != '' && data.prod != undefined) {
        prod = `,prod ='${data.prod}'`
    }
    if (data.mmp_txn != null && data.mmp_txn != '' && data.mmp_txn != undefined) {
        mmp_txn = `,mmp_txn ='${data.mmp_txn}'`
    }
    if (data.udf5 != null && data.udf5 != '' && data.udf5 != undefined) {
        udf5 = `,udf5 ='${data.udf5}'`
    }
    if (data.udf6 != null && data.udf6 != '' && data.udf6 != undefined) {
        udf6 = `,udf6 ='${data.udf6}'`
    }
    if (data.udf3 != null && data.udf3 != '' && data.udf3 != undefined) {
        udf3 = `,udf3 ='${data.udf3}'`
    }
    if (data.udf4 != null && data.udf4 != '' && data.udf4 != undefined) {
        udf4 = `,udf4 ='${data.udf4}'`
    }
    if (data.udf1 != null && data.udf1 != '' && data.udf1 != undefined) {
        udf1 = `,udf1 ='${data.udf1}'`
    }
    if (data.udf2 != null && data.udf2 != '' && data.udf2 != undefined) {
        udf2 = `,udf2 ='${data.udf2}'`
    }
    if (data.discriminator != null && data.discriminator != '' && data.discriminator != undefined) {
        discriminator = `,discriminator ='${data.discriminator}'`
    }
    if (data.auth_code != null && data.auth_code != '' && data.auth_code != undefined) {
        auth_code = `,auth_code ='${data.auth_code}'`
    }

    var QRY_TO_EXEC = `update prepaid_lmo_amount_transaction set descr ='${data.desc}' ${date} ${CardNumber} ${surcharge} ${clientcode} ${udf15} ${udf14} ${signature} ${udf13} ${udf12}
     ${udf11} ${udf10} ${amt} ${merchant_id} ${mer_txn} ${f_code} ${bank_txn} ${bank_txn} ${udf9} ${ipg_txn_id}
     ${bank_name} ${prod} ${mmp_txn} ${udf5} ${udf6} ${udf3} ${udf4} ${udf1} ${udf2} ${discriminator} ${auth_code} ,u_ts=CURRENT_TIMESTAMP() where trns_mrchant_id='${data.mer_txn}' ;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getwalletprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - Ramesh - Initial Function
******************************************************************************/
exports.getwalletprpdlmoamtdtlsMdl = function(data, user,callback){
	var fnm='getwalletprpdlmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t where mrcht_usr_id=${data.mrcht_usr_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getwebwalletprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 06/06/2022   - Ramesh - Initial Function
******************************************************************************/
exports.getwebwalletprpdlmoamtdtlsMdl = function(data, user,callback){
	var fnm='getwebwalletprpdlmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t where mrcht_usr_id=${data.udf1}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : prpdlmowalletchcklmoatomtxnretrackMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prpdlmowalletchcklmoatomtxnretrackMdl = function (data) {
    var QRY_TO_EXEC = `select * from prepaid_f_accounting where trns_mrchant_id='${data.trns_mrchant_id}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updtwalletprpdfaccntinglmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - Ramesh - Initial Function
******************************************************************************/
exports.updtwalletprpdfaccntinglmoamtdtlsMdl = function(data, walbal,result, user,callback){
	var fnm='updtwalletprpdfaccntinglmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `insert into prepaid_f_accounting set trns_mrchant_id='${data.trns_mrchant_id}',admin_id=${user.mrcht_usr_id},money_type='Credit',ac_date=curdate(),dateCreated=current_timestamp(),created_by=${user.usr_ctgry_ky},operation='added_from_atom',remarks='${user.frst_nm}',open_bal='${result.balance}',amount='${data.amt}',close_bal='${walbal}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updtwebwalletprpdfaccntinglmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - Ramesh - Initial Function
******************************************************************************/
exports.updtwebwalletprpdfaccntinglmoamtdtlsMdl = function(data, walbal,result, user,callback){
	var fnm='updtwebwalletprpdfaccntinglmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `insert into prepaid_f_accounting set trns_mrchant_id='${data.trns_mrchant_id}',admin_id=${data.udf1},money_type='Credit',ac_date=curdate(),dateCreated=current_timestamp(),created_by=${data.udf1},operation='added_from_atom',remarks='${data.udf2}',open_bal='${result.balance}',amount='${data.amt}',close_bal='${walbal}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updtwalletprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - Ramesh - Initial Function
******************************************************************************/
exports.updtwalletprpdlmoamtdtlsMdl = function(data, walbal, user,callback){
	var fnm='updtwalletprpdlmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance=${walbal} where mrcht_usr_id=${data.mrcht_usr_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updtwalletprpdlmoamtdtlsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 06/06/2022   - Ramesh - Initial Function
******************************************************************************/
exports.updtwebwalletprpdlmoamtdtlsMdl = function(data, walbal, user,callback){
	var fnm='updtwebwalletprpdlmoamtdtlsMdl'
    //console.log("success",data,user);

    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance=${walbal} where mrcht_usr_id=${data.udf1}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : kyclistviewMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 28/12/2021   - Ramesh - Initial Function
******************************************************************************/
exports.kyclistviewMdl = function( user,callback){
	var fnm='kyclistviewMdl'
    console.log("success",user);

    var QRY_TO_EXEC = ` select pkyc.*,a.agnt_cd,d.dstrt_nm,m.mndl_nm,v.vlge_nm from prepaid_agnt_kyc_dcmnt_lst_t as pkyc
    join agnt_lst_t as a on a.agnt_id=pkyc.agnt_id
    join dstrt_lst_t as d on d.dstrt_id=pkyc.district
    join mndl_lst_t as m on (m.mndl_id=pkyc.mandal or m.mndl_nu=pkyc.mandal) and m.dstrt_id=pkyc.district
    join vlge_lst_t as v on (v.vlge_id=pkyc.village or v.vlge_nu=pkyc.village) and v.mndl_id=pkyc.mandal  and v.dstrt_id=pkyc.district;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
	

/*****************************************************************************
* Function       : testdeletecmnddbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.testdeletecmnddbMdl = function (data) {
	var fnm='testdeletecmnddbMdl'

    var QRY_TO_EXEC = `select * from caf_upgarde_reqst_t_delete limit 1;
	delete from caf_upgarde_reqst_t_delete limit 1`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
    };

/*****************************************************************************
* Function       : testdeletecmndothrdbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.testdeletecmndothrdbMdl = function (data) {
	var fnm='testdeletecmndothrdbMdl'

    var QRY_TO_EXEC = `delete from inv_stpbx_lst_s limit 1`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : testdeletecmndothrdbMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.insrtdataMdl = (data,kycAttchmnt, user) => {
	var fnm='insrtdataMdl'

    if(data.gst_nu == '' || data.gst_nu == undefined || data.gst_nu == null ){
        var gst='N/A';
    }else{
        var gst=data.gst_nu ;
    }
    var QRY_TO_EXEC = `INSERT INTO test_agnt_kyc_dcmnt_lst_t (dcmnt_url_tx,bank_acnt_nu,mbl_nu,gst_nu,pan_nu,bank_acnt_nm,ifsc_nu,i_ts) VALUES ('${kycAttchmnt}','${data.bnk_acnt_nu}','${data.mbl_nu}','${gst}','${data.pan_nu}','${data.bnk_acnt_nm}','${data.bnk_ifsc_nm}',current_timestamp());`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : getinsrtdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 23/05/2022   - Ramesh P - Initial Function
******************************************************************************/
exports.getinsrtdataMdl = function (data) {
	var fnm='getinsrtdataMdl'

    var QRY_TO_EXEC = `select * from test_agnt_kyc_dcmnt_lst_t`;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : renewcafdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.renewcafdataMdl = function(data, user,callback){
	var fnm='renewcafdataMdl'
    var QRY_TO_EXEC = ` select * from caf_dtl_t as c where c.caf_id=${data}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : renewcafdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.renewcafprchsedataMdl = function(data, user,callback){
	var fnm='renewcafprchsedataMdl'
    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id
    where cp.a_in=1 and (cp.prpd_in = 1 or cp.prpd_in = 0 or cp.prpd_in is null) and cp.pckge_id not in (3000007,3000008,13000001,13000000,13000002,13000003,13000004,12000000) and cp.caf_id=${data} order by cp.cycle_end_dt desc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : renewcafpckgsfrdataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.renewcafpckgsfrdataMdl = function(data, user,callback){
	var fnm='renewcafpckgsfrdataMdl'
    var QRY_TO_EXEC = ` select p.pckge_id as package_id,p.lckn_dys_ct,p.pckge_nm as package_name,p.chrge_at as cust_price,p.chrge_at as lco_price,
    p.gst_at as pack_tax,(p.chrge_at+p.gst_at) as ttl_cst9,p.i_ts as created_at,p.pck_in_sts as cpe_charge,p.pckge_dscn_tx ,
     (CASE WHEN p.pckge_type_id =1 THEN p.chrge_at ELSE FORMAT(p1.chrge_at,2) END) AS tot_chrge9,
     (CASE WHEN p.pckge_type_id =1 THEN p.gst_at ELSE FORMAT(p1.gst_at,2) END) AS tot_gst_at9,
     (CASE WHEN p.pckge_type_id =1 THEN (p.chrge_at+p.gst_at) ELSE FORMAT(p1.chrge_at+p1.gst_at,2) END) AS ttl_cst
    from pckge_lst_t p 
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    where p.pckge_type_id=1 and p.caf_type_id=1 and p.oprtn_in=1 and p.a_in=1 and p.glbl_in=1
     group by p.pckge_nm;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : hphedatachnllst
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.hphedatachnllst = function(data, user,callback){
	var fnm='hphedatachnllst'
    var QRY_TO_EXEC = `select * from prepaid_base_pack_channels where a_in=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : renewcafalacartedataMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.renewcafalacartedataMdl = function(data, user,callback){
	var fnm='renewcafalacartedataMdl'
    if (data == null || data == '' || data == undefined){
        newch = 0
    } else {
		var str = data.slice(-1);;
		console.log("str",str);
		var newch = "";
		if(str == ','){
			newch = data.slice(0, data.length - 1)
			console.log("str in ",newch)
		} else {
			newch = data;
		}
		//str = str.substring((0, str.length()-1));
		console.log(data)
		console.log("str",newch)
	}
    var QRY_TO_EXEC = ` SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,p.pckge_id as package_id,
    2 as cat_id,
    p.pckge_nm as package_name, p1.chrge_at as cust_price,p1.chrge_at as lco_price, p1.gst_at as pack_tax, 
    ((CASE WHEN FORMAT(p1.chrge_at,2) is NOT NULL THEN p1.chrge_at  ELSE 0 END) +
    (CASE WHEN FORMAT(p1.gst_at,2) is NOT NULL THEN p1.gst_at  ELSE 0 END)) as ttl_cst
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id 
    JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt 
    AND p.a_in = 1 AND spl.a_in = 1 and p.pckge_id in (${newch})
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/**************************************************************************************
* Controller     : pckgewisedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/07/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.pckgewisedataMdl = function (caf_id,pack_id,user) {
	var fnm='pckgewisedataMdl'
    var whr = ``;
    if(pack_id == 79 || pack_id == 80){
        whr = `and HBasic_HMini=1`
    } else if (pack_id == 3000107){
        whr = `and Home_Essential=1`
    } else if(pack_id == 3000106){
        whr = `and Home_Premium=1`
    }

    var QRY_TO_EXEC = `select p.pckge_nm,cp.* from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.a_in=1
    where cp.expry_dt between (now()-interval 1 month) and now() and (cp.prpd_in = 1 or cp.prpd_in = 0 or cp.prpd_in is null) 
    and cp.pckge_id not in (select pckge_id from prepaid_base_pack_channels where a_in=1  ${whr})
    and cp.pckge_id not in (3000007,3000008) and cp.caf_id=${caf_id}
	and p.vod_pack=0
	group by p.pckge_id
    order by p.pckge_type_id asc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,  "hello",user,fnm);
}

/**************************************************************************************
* Controller     : expcafsumMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.expcafsumMdl = function (id,user) {
	var fnm='expcafsumMdl'
    
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select 'MTD Online Collection' as sum,ifnull(sum(case when p.chrge_at is not null then p.chrge_at ELSE 0 END) + sum(case when p.gst_at is not null then p.gst_at ELSE 0 END),0) as sum_ammount 
	from caf_pckge_prchse_dtl_t as cp 
	join pckge_lst_t as p on f.stb_id=p.pckge_id 
	join caf_dtl_t as c on c.caf_id=cp.caf_id
	where cp.prpd_in=1 and cp.a_in=1 and cp.cycle_strt_dt between '${crntYear}-${crntMnth}-01' and curdate() ${whr} UNION ALL	
	select 'Today Online Collection' as caf,ifnull(sum(case when p.chrge_at is not null then p.chrge_at ELSE 0 END) + sum(case when p.gst_at is not null then p.gst_at ELSE 0 END),0) as 'sum_amount' from caf_pckge_prchse_dtl_t as cp 
	join pckge_lst_t as p on f.stb_id=p.pckge_id 
	join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 and cp.cycle_end_dt=curdate() ${whr};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : mnthtdyrenewcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.mnthtdyrenewcafMdl = function (id,user) {
    var fnm='mnthtdyrenewcafMdl'
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select 'Today Renewed Cafs' as tdy,count(distinct(c.caf_id)) as 'tdy_renwd_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
	join caf_dtl_t as c on c.caf_id=cp.caf_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 and  f.ac_date = curdate() and p.pckge_type_id=1 and operation in ('Resume') ${whr} UNION ALL 
	select 'MTD Renewed Cafs' as mnth,count(distinct(c.caf_id)) as 'mntly_rnwed_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
	join caf_dtl_t as c on c.caf_id=cp.caf_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 and f.ac_date between
	 '${crntYear}-${crntMnth}-01' and curdate() and p.pckge_type_id=1 and operation in ('Resume') ${whr};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : apsflmnthtdyclctndataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.apsflmnthtdyclctndataMdl = function (id,user) {
    var fnm='apsflmnthtdyclctndataMdl'
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select 'Today Online' as tdy,ifnull(cast(SUM(amt) as decimal(10,2)),0) as tdyamt from sub_alacarte_transaction as s
		join caf_dtl_t as c on c.caf_id=s.caf_id where c.apsfl_bbnl in (3,5) and f_code='Ok' and date(s.i_ts)=curdate() ${whr}
		UNION ALL select 'MTD Online' as mnth,ifnull(cast(SUM(amt) as decimal(10,2)),0) as mnthamt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id where c.apsfl_bbnl in (3,5) and f_code='Ok' and date(s.i_ts) between '${crntYear}-${crntMnth}-01' and curdate() ${whr};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : apsflmnthtdyrevMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.apsflmnthtdyrevMdl = function (id,user) {
    var fnm='apsflmnthtdyrevMdl'
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select 'MTD Revenue' as month,round(ifnull(sum(bse_pck_price*lmo_share/100),0))+ round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_mnth_rvnue','MTD collection' as mnth
,ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*apsfl_share/100)+round(bse_pck_price*mso_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_mnth_clctn' from caf_pckge_prchse_dtl_t as cp
  join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
   join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
  join caf_dtl_t as c on c.caf_id=cp.caf_id
  where c.apsfl_bbnl in (3,5) and f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() ${whr} UNION ALL select 'Today Revenue' as tday,round(ifnull(sum(bse_pck_price*lmo_share/100),0)) + round(ifnull(sum(bse_pck_price*mso_share/100),0)) as 'ttl_apsfl_tdy_rvnue',
  'Today collection' as today,ifnull(sum(round(bse_pck_price*lmo_share/100)+round(bse_pck_price*mso_share/100)+round(bse_pck_price*apsfl_share/100)+round(cpe_rental*tax/100)+cpe_rental),0) as 'ttl_apsfl_tdy_clctn' from caf_pckge_prchse_dtl_t as cp
  join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
   join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
  join caf_dtl_t as c on c.caf_id=cp.caf_id
  where c.apsfl_bbnl in (3,5) and f.ac_date = curdate() ${whr};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : allcafcountindataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.allcafcountindataMdl = function (id,user) {
	var fnm='allcafcountindataMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC =  `select e.sts_nm as 'Status_name',COUNT(c.caf_id) AS CAF_COUNT from caf_dtl_t as c join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.apsfl_bbnl in (3,5) and c.enty_sts_id in (1,6,7,8,45,84,85,10,11) ${whr} group by c.enty_sts_id  UNION ALL select 'Total' as 'Toatl',COUNT(c.caf_id) AS CAF_COUNT from caf_dtl_t as c join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.apsfl_bbnl in (3,5) and c.enty_sts_id in (1,6,7,8,45,84,85,10,11) ${whr} ORDER BY
    'Status_name';`
    console.log(QRY_TO_EXEC) 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : expcafsumMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.expcafsumthreendfivedayMdl = function (id, user) {
	var fnm='expcafsumthreendfivedayMdl'
    var whr = ``;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select " < 3 Days Expiry Cafs" as sum,count(distinct(c.caf_id)) as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 ${whr} 
    and cp.cycle_end_dt between curdate() and curdate()+interval 3 day and c.enty_sts_id not in (8,45)  UNION all
 select "Expiry in 5 Days" as sum,count(distinct(c.caf_id)) as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 ${whr} 
    and cp.cycle_end_dt between (curdate()+interval 4 day) and (curdate()+interval 5 day) and c.enty_sts_id not in (8,45) ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : expcafsumthreedayMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.expcafsumthreedayMdl = function (id, user) {
	var fnm='expcafsumthreedayMdl'
    var whr = ``;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 and cp.a_in=1 ${whr} 
    and cp.cycle_end_dt between curdate() and curdate()+interval 3 day and c.enty_sts_id not in (8,45)`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : expcafsumfivedayMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.expcafsumfivedayMdl = function (id, user) {
	var fnm='expcafsumfivedayMdl'
    var whr = ``;

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select * from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 and cp.a_in=1 ${whr} 
    and cp.cycle_end_dt between (curdate()+interval 4 day) and (curdate()+interval 5 day) and c.enty_sts_id not in (8,45) ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, 'hello',user,fnm);
}

/**************************************************************************************
* Controller     : listcafcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listcafcountMdl = function (data, user, callback) {
	var fnm='listcafcountMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `where c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `where c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `where c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    console.log("came into models")

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
    ${whr} group by c.caf_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : listactivecafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listactivecafMdl = function (data, user, callback) {
	var fnm='listactivecafMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.enty_sts_id=6 ${whr} group by c.caf_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listsuspendMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listsuspendMdl = function (data, user, callback) {
	var fnm='listsuspendMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }


    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.enty_sts_id=7 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listterminateMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listterminateMdl = function (data, user, callback) {
	var fnm='listterminateMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.enty_sts_id=8 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}


/**************************************************************************************
* Controller     : listterminationpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listterminationpendingMdl = function (data, user, callback) {
	var fnm='listterminationpendingMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=45 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listsuspendpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listsuspendpendingMdl = function (data, user, callback) {
	var fnm='listsuspendpendingMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cs.cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
        join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
        where c.enty_sts_id=84 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listresumependingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listresumependingMdl = function (data, user, callback) {
	var fnm='listresumependingMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select c.rsme_ts,TIMESTAMPADD(MINUTE,15,rsme_ts) as actl_ts,CURRENT_TIMESTAMP() as curnt_tm,
    ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm
    from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
    where c.enty_sts_id=85 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listpendingactivationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listpendingactivationMdl = function (data, user, callback) {
	var fnm='listpendingactivationMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=1 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listboxchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listboxchangeMdl = function (data, user, callback) {
	var fnm='listboxchangeMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,d.districtname,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
	join districts as d on d.districtuid=c.instl_dstrct_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=10 and a.prpd_flag=1  ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listponchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listponchangeMdl = function (data, user, callback) {
	var fnm='listponchangeMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=11 ${whr} group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listexpirtedcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listexpirtedcafMdl = function (data, user, callback) {
	var fnm='listexpirtedcafMdl'
    var whr = ``
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y') as dt
			,d.districtname as dist,c.olt_prt_nm as Pon_Number,p.pckge_nm as curnt_pak,a.agnt_cd as lmo_cd,DATE_FORMAT(cp.cycle_strt_dt,'%d-%m-%Y') as start_dt
			from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
	join districts as d on d.districtuid=c.instl_dstrct_id
    where p.pckge_type_id=1 ${whr} and c.enty_sts_id not in (8,45,7) and a.prpd_flag=1 and cp.cycle_end_dt=curdate() and cp.a_in=1 group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listmonthlyrenewdcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyrenewdcafMdl = function (data, user, callback) {
	var fnm='listmonthlyrenewdcafMdl'
    var whr = ``
    var date = new Date();
    var currntMnth = date.getMonth()+1
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY cp.caf_id
        ) sno,a.agnt_cd as agnt_nm,f.receipt_id,c.caf_id,d.districtname as district_Name,cs.cstmr_nm,c.mbl_nu,p.pckge_nm,case when cp.cycle_strt_dt is not null then date_format(MAX(cp.cycle_strt_dt),'%Y-%m-%d') else '0000-00-00' end as strt_date
			,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date
,date_format(cp.caf_date,'%Y-%m-%d') as Advance_Renewal_Date			from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
	join districts as d on d.districtuid = c.instl_dstrct_id	where  p.pckge_type_id=1 ${whr} and cp.caf_date between
     '${currntYear}-${currntMnth}-01' and curdate() and operation='Resume' group by cp.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listtodayrenewdcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayrenewdcafMdl = function (data, user, callback) {
	var fnm='listtodayrenewdcafMdl'
    var whr = ``
    var currntMnth = new Date().getMonth()
    var currntYear = new Date().getFullYear();
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd as agnt_nm,f.receipt_id,p.pckge_nm,c.caf_id,cs.cstmr_nm,d.districtname as district_name,c.mbl_nu,date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as 'createdDate',date_format(cp.caf_date,'%Y-%m-%d') as Advance_Renewal_Date from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
	join districts as d on d.districtuid = c.instl_dstrct_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where  p.pckge_type_id=1 ${whr} and cp.a_in=1 and DATE_FORMAT(f.ac_date,'%Y-%m-%d') = curdate() group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listonlinecollectionMdl = function (data, user, callback) {
	var fnm='listonlinecollectionMdl'

    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY agnt_id
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
join caf_dtl_t as c on c.caf_id=s.caf_id
join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
 where f_code='Ok' ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listtodayonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayonlinecollectionMdl = function (data, user, callback) {
	var fnm='listtodayonlinecollectionMdl'

    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY agnt_id
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
join caf_dtl_t as c on c.caf_id=s.caf_id
join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
 where f_code='Ok' and date(s.i_ts) = curdate() ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listmonthlyonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyonlinecollectionMdl = function (data, user, callback) {
	var fnm='listmonthlyonlinecollectionMdl'

    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY agnt_id
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
join caf_dtl_t as c on c.caf_id=s.caf_id
join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
 where f_code='Ok' and date(s.i_ts) between '${crntYear}-${crntMnth}-01' and curdate() ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listtodayrevenueMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayrevenueMdl = function (data, user, callback) {
	var fnm='listtodayrevenueMdl'
    var date = new Date();
    var whr = ``;
    var jon = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,f.*,d.dstrt_nm as district_name,date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as 'createdDate',
        round(bse_pck_price*lmo_share/100,0)+round(bse_pck_price*mso_share/100,0) as amnt_ct from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on cp.pckge_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
	JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date = curdate() and p.pckge_type_id=1 and cp.a_in=1  ${whr} group by c.caf_id,cp.pckge_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listmonthlyrevenueMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyrevenueMdl = function (data, user, callback) {
	var fnm='listmonthlyrevenueMdl'
    var date = new Date();
    var whr = ``;
    var crntYear = new Date().getFullYear();
    var jon = ``;
    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,c.mbl_nu,a.agnt_nm,d.dstrt_nm as dist,f.remarks,f.close_bal,
		ifnull(round(bse_pck_price*lmo_share/100,0)+round(bse_pck_price*mso_share/100,0),0) as amount,f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on cp.pckge_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
	JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where p.pckge_type_id=1 and f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() and cp.a_in=1 ${whr} group by c.caf_id,cp.pckge_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : listmonthlycollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlycollectionMdl = function (data, user, callback) {
	var fnm='listmonthlycollectionMdl'
    var date = new Date();
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,c.mbl_nu,a.agnt_nm,d.dstrt_nm as district_name,f.close_bal,f.amount,f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on cp.pckge_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
	JOIN dstrt_lst_t d on c.instl_dstrct_id =d.dstrt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() and p.pckge_type_id=1 and cp.a_in=1 ${whr} group by c.caf_id,cp.pckge_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodaycollectionMdl = function (data, user, callback) {
	var fnm='listtodaycollectionMdl'
    var date = new Date();
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,c.mbl_nu,a.agnt_nm,f.close_bal,f.amount,f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
    join pckge_lst_t as p on cp.pckge_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where f.ac_date = curdate() and p.pckge_type_id=1 and cp.a_in=1 ${whr} group by cp.caf_id,cp.pckge_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistcafcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistcafcountMdl = function (data, user, callback) {
	var fnm='postlistcafcountMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    console.log("came into models")

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
    ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} and c.apsfl_bbnl in (3,5)  group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : postlistactivecafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistactivecafMdl = function (data, user, callback) {
	var fnm='postlistactivecafMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.apsfl_bbnl in (3,5) and c.enty_sts_id=6 and cp.pckge_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistsuspendMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistsuspendMdl = function (data, user, callback) {
	var fnm='postlistsuspendMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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


    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.apsfl_bbnl in (3,5) and c.enty_sts_id=7 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistterminateMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistterminateMdl = function (data, user, callback) {
	var fnm='postlistterminateMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id where c.apsfl_bbnl in (3,5) and c.enty_sts_id=8 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistterminationpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistterminationpendingMdl = function (data, user, callback) {
	var fnm='postlistterminationpendingMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.apsfl_bbnl in (3,5) and c.enty_sts_id=45 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistsuspendpendingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistsuspendpendingMdl = function (data, user, callback) {
	var fnm='postlistsuspendpendingMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cs.cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
        join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
        join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
        where c.apsfl_bbnl in (3,5) and c.enty_sts_id=84 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistresumependingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistresumependingMdl = function (data, user, callback) {
	var fnm='postlistresumependingMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select c.rsme_ts,TIMESTAMPADD(MINUTE,15,rsme_ts) as actl_ts,CURRENT_TIMESTAMP() as curnt_tm,
    ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm
    from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
    where c.apsfl_bbnl in (3,5) and c.enty_sts_id=85 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistpendingactivationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistpendingactivationMdl = function (data, user, callback) {
	var fnm='postlistpendingactivationMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=1 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistboxchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistboxchangeMdl = function (data, user, callback) {
	var fnm='postlistboxchangeMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=10 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistponchangeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistponchangeMdl = function (data, user, callback) {
	var fnm='postlistponchangeMdl'
    let pge_nu = data.lmt_pstn * 20;
    var whr = ``
    let where_cnd = ` `;
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
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date,c.caf_id,agnt_nm,cstmr_nm,mbl_nu,sts_nm,c.actvn_dt,c.mdlwe_sbscr_id,c.adhr_nu,c.caf_type_id,e.sts_clr_cd_tx,c.onu_srl_nu,c.iptv_srl_nu,c.cstmr_id,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id  where c.enty_sts_id=11 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlyrenewdcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyrenewdcafMdl = function (data, user, callback) {
	var fnm='postlistmonthlyrenewdcafMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var date = new Date();
    var currntMnth = date.getMonth()+1
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY cp.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,p.pckge_nm,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where c.apsfl_bbnl in (3,5) and cp.a_in=1 and p.pckge_type_id=1 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} and f.ac_date between
     '${currntYear}-${currntMnth}-01' and curdate() and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) group by cp.caf_id order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlisttodayrenewdcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayrenewdcafMdl = function (data, user, callback) {
	var fnm='postlisttodayrenewdcafMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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
    var currntMnth = new Date().getMonth()
    var currntYear = new Date().getFullYear();

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,p.pckge_nm,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where c.apsfl_bbnl in (3,5) and  p.pckge_type_id=1 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} and
	f.ac_date = curdate() and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) group by c.caf_id order by c.caf_id desc  limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlisttodayrevenueMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayrevenueMdl = function (data, user, callback) {
	var fnm='postlisttodayrevenueMdl'
    let pge_nu = data.lmt_pstn * 20;

    let where_cnd = ` `;
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
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,a.agnt_id,c.mbl_nu,a.agnt_nm,f.remarks,f.close_bal,
		case when f.operation='Provision' then 0 else ifnull(round(bse_pck_price*lmo_share/100,0)+round(bse_pck_price*mso_share/100,0),0) end as amount,
        f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from
         caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where c.apsfl_bbnl in (3,5) and f.ac_date = curdate() ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlyrevenueMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyrevenueMdl = function (data, user, callback) {
	var fnm='postlistmonthlyrevenueMdl'
    let pge_nu = data.lmt_pstn * 20;
	let where_cnd = ` `;
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
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var date = new Date();
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;


    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,a.agnt_id,c.mbl_nu,a.agnt_nm,f.remarks,f.close_bal,
        case when f.operation='Provision' then 0 else ifnull(round(bse_pck_price*lmo_share/100,0)+round(bse_pck_price*mso_share/100,0),0) end as amount,
        f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from 
        caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where c.apsfl_bbnl in (3,5) and f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlycollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlycollectionMdl = function (data, user, callback) {
	var fnm='postlistmonthlycollectionMdl'
    let pge_nu = data.lmt_pstn * 20;
	let where_cnd = ` `;
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
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var date = new Date();
    var crntYear = new Date().getFullYear();
    var crntMnth = date.getMonth() + 1;

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,a.agnt_id,c.caf_id,cu.cstmr_nm,c.mbl_nu,a.agnt_nm,f.close_bal,f.amount,f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where c.apsfl_bbnl in (3,5) and f.ac_date between '${crntYear}-${crntMnth}-01' and curdate() and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlisttodaycollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodaycollectionMdl = function (data, user, callback) {
	var fnm='postlisttodaycollectionMdl'
    let pge_nu = data.lmt_pstn * 20;
let where_cnd = ` `;
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
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cu.cstmr_nm,c.mbl_nu,a.agnt_nm,f.close_bal,f.amount,f.open_bal,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on f.stb_id=p.pckge_id
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cu on cu.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join mrcht_usr_lst_t as m on m.usr_ctgry_ky=a.prnt_agnt_id
    where c.apsfl_bbnl in (3,5) and f.ac_date = curdate() ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} and f.stb_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlisttodayonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayonlinecollectionMdl = function (data, user, callback) {
	var fnm='postlisttodayonlinecollectionMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where c.apsfl_bbnl in (3,5) and f_code='Ok' and date(s.i_ts) = curdate() ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlyonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyonlinecollectionMdl = function (data, user, callback) {
	var fnm='postlistmonthlyonlinecollectionMdl'
    let pge_nu = data.lmt_pstn * 20;
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;
	let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where c.apsfl_bbnl in (3,5) and f_code='Ok' and date(s.i_ts) between '${crntYear}-${crntMnth}-01' and curdate() ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} group by c.caf_id  order by c.caf_id desc limit ${pge_nu}, 20`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postexpcafsumthreedayMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.postexpcafsumthreedayMdl = function (data, user, callback) {
	var fnm='postexpcafsumthreedayMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y') as dt from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} 
    and cp.cycle_end_dt between curdate() and curdate()+interval 3 day and cp.pckge_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) and c.enty_sts_id not in (8,45) group by cp.caf_id  order by cp.caf_id desc limit ${pge_nu}, 20`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : postexpcafsumfivedayMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 2/7/2022   -  ramesh  - Initial Function
*
**************************************************************************************/

exports.postexpcafsumfivedayMdl = function (data, user, callback) {
	var fnm='postexpcafsumfivedayMdl'
    let pge_nu = data.lmt_pstn * 20;
    let where_cnd = ` `;
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

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,DATE_FORMAT(cp.cycle_end_dt,'%d-%m-%Y') as dt from caf_pckge_prchse_dtl_t as cp 
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where c.apsfl_bbnl in (3,5) and p.pckge_type_id=1 and cp.a_in=1 ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} 
    and cp.cycle_end_dt between (curdate()+interval 4 day) and (curdate()+interval 5 day) and cp.pckge_id in (79,80,3000106,3000107,3000110,8000000,8000001,8000002,8000003,8000004,82,8000005,8000006,9000000,9000001) and c.enty_sts_id not in (8,45) group by cp.caf_id  order by cp.caf_id desc limit ${pge_nu}, 20;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : activenotify flag
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.activeagntflagdataMdl = function ( data,user,callback) {
    var fnm = "activeagntflagdataMdl"
   
    console.log("success",data,user)

   var QRY_TO_EXEC = `select *,date_format(i_ts,'%d-%m-%Y %H:%i:%S') as i_ts from IVR_OCC_Incoming_Call_status  where notification_flag =1 and agentId = '${data.agentId}' ;`

   console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",'',fnm);
}

/**************************************************************************************
* Controller     : activenotify flag
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 3/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatedflagnotifydataMdl = function ( data,user,callback) {
    var fnm = "updatedflagnotifydataMdl"
    console.log("success", data, user)
    
   var QRY_TO_EXEC = `update IVR_OCC_Incoming_Call_status set notification_flag =0 where agentId='${data.ID}';`

   console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",'', fnm);
}
/*****************************************************************************
* Function       : renewalcafpending
* Description    : 
* Arguments      : callback function
* Change History :
* 16/9/2022   - durga - Initial Function
******************************************************************************/
exports.advancerenewalcafCtrlMdl = function (data, user, callback) {
	var fnm = "advancerenewalcafCtrlMdl"
    console.log("success",data,user)
	var date = new Date();
    var crntYear = new Date().getFullYear();
	var whr = ``;
    var crntMnth = date.getMonth() + 1;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY cp.caf_id
        ) sno,cp.caf_id,date_format(cp.cycle_strt_dt ,'%Y-%m-%d') as cycle_start_dt, date_format(cp.cycle_end_dt,'%Y-%m-%d') as cycle_end_dt,p.pckge_nm as crnt_pckge_name,m.mrcht_usr_nm,d.districtname as district_Name from caf_pckge_prchse_dtl_t as cp
    join pckge_lst_t as p on p.pckge_id = cp.pckge_id 
    join caf_dtl_t as c on c.caf_id = cp.caf_id 
    join districts as d on d.districtuid = c.instl_dstrct_id
	join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky = c.lmo_agnt_id where a.prpd_flag=1 and cp.caf_date between '${crntYear}-${crntMnth}-01' and curdate() and advance_recharge=1  and p.pckge_type_id=1 and cp.a_in=1 ${whr} group by c.caf_id ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
};
/*****************************************************************************
* Function       : totalprepaidlmo
* Description    : 
* Arguments      : callback function
* Change History :
* 16/9/2022   - durga - Initial Function
******************************************************************************/
exports.totalprepaidlmocountCtrlMdl = function (data, user, callback) {
	var fnm = "totalprepaidlmocountCtrlMdl"
    console.log("success",data,user)
	var whr = ``;
    // if (user.usr_ctgry_id == 1) {
        // if(data.dstrt_fltr == true){
            // whr = `and ofce_dstrt_id=${data.dstrt}`;
        // } else {
            // whr = ``;
        // }
    // } else if (user.usr_ctgry_id == 8) {
        // whr = `and agnt_id='${user.usr_ctgry_ky}'`;
    // } else if (user.usr_ctgry_id == 7) {
        // whr = `and prnt_agnt_id='${user.usr_ctgry_ky}'`;
    // } else if (user.usr_ctgry_id == 2) {
        // whr = `and ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    // }

    // var QRY_TO_EXEC = `select count(*) as count from agnt_lst_t where prpd_flag=1 and a_in=1 and onbrd_in=1 and agnt_cd like 'LMO%' ${whr}; `
	
	
	
	 if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and a.ofce_dstrt_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and a.agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and a.prnt_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and a.ofce_dstrt_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `SELECT COUNT(*) AS count
FROM (
    SELECT lmo_agnt_id
    FROM agnt_lst_t a
    JOIN caf_dtl_t AS c ON lmo_agnt_id = a.agnt_id
    JOIN districts AS d ON d.districtuid = c.instl_dstrct_id
    WHERE a.prpd_flag = 1 ${whr}
    AND a.a_in = 1 AND a.onbrd_in = 1
    GROUP BY lmo_agnt_id
) AS subquery ; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
};
/*****************************************************************************
* Function       : totalprepaidlmolist
* Description    : 
* Arguments      : callback function
* Change History :
* 17/9/2022   - durga - Initial Function
******************************************************************************/
exports.totalprepaidlmoCtrlMdl = function (data, user, callback) {
	var fnm = "totalprepaidlmoCtrlMdl"
    console.log("success",data,user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and a.ofce_dstrt_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    }  else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select   ROW_NUMBER() OVER (
        ORDER BY a.agnt_cd
        ) sno,format(COUNT(c.enty_sts_id), 'NO') AS 'Total CAF count',
    format(COUNT(CASE
        WHEN c.enty_sts_id = 6 THEN 1
        ELSE NULL
    END), 'NO') AS 'Active',
    format(COUNT(CASE
        WHEN c.enty_sts_id in (1,10,11,8,45) THEN 1
        ELSE NULL
    END), 'NO') AS 'remaining',
    format(COUNT(CASE
        WHEN c.enty_sts_id = 7 THEN 1
        ELSE NULL
    END), 'NO') AS 'Suspended',agnt_cd as Lmo_code,c.mbl_nu,agnt_nm as Lmo_name,d.districtname as district_Name,date_format(a.agnt_prpd_date,'%Y-%m-%d %H:%i:%S') as Activation_Date  from agnt_lst_t as a
join caf_dtl_t as c on lmo_agnt_id = a.agnt_id
join districts as d on d.districtuid = c.instl_dstrct_id where a.prpd_flag=1  AND a.a_in = 1 
    AND a.onbrd_in = 1 ${whr} group by lmo_agnt_id ; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
};
/*****************************************************************************
* Function       : totalprepaidlmo
* Description    : 
* Arguments      : callback function
* Change History :
* 16/9/2022   - durga - Initial Function
******************************************************************************/
exports.advancerenewalcafcountCtrlMdl = function (data, user, callback) {
	var fnm = "advancerenewalcafcountCtrlMdl"
    console.log("success",data,user)

    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    var QRY_TO_EXEC = `select count(distinct(c.caf_id) ) as count from caf_pckge_prchse_dtl_t as cp
    join caf_dtl_t as c on c.caf_id = cp.caf_id 
	join pckge_lst_t as p on p.pckge_id = cp.pckge_id 
	    join districts as d on d.districtuid = c.instl_dstrct_id
	join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky = c.lmo_agnt_id 
     where advance_recharge=1 and cp.caf_date between '${crntYear}-${crntMnth}-01' and curdate() and p.pckge_type_id=1 and cp.a_in=1 ${whr}; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
};
/*****************************************************************************
* Function       : totalprepaidlmo
* Description    : 
* Arguments      : callback function
* Change History :
* 16/9/2022   - durga - Initial Function
******************************************************************************/
exports.totalprepaidcafCtrlMdl = function (user, callback) {
	var fnm = "totalprepaidcafCtrlMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
 var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 ${whr}; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
};
/*****************************************************************************
* Function       : suspended caf count
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.suspendcafcountCtrlMdl = function (user, callback) {
	var fnm = "suspendcafcountCtrlMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 7 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       : suspended caf count
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.activecafcountCtrlMdl = function (user, callback) {
	var fnm = "activecafcountCtrlMdl"

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 6 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       : suspended caf count
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.terminatedcafcountCtrlMdl = function (user, callback) {
	var fnm = "terminatedcafcountCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 8 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       : suspended caf count
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.terminatedpendingcafcountCtrlMdl = function (user, callback) {
	var fnm = "terminatedpendingcafcountCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 45 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       : suspended caf count
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.suspenededpendingcafcountCtrlMdl = function (user, callback) {
	var fnm = "suspenededpendingcafcountCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 84 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :resumepending
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.resumependingcafcountCtrlMdl = function (user, callback) {
	var fnm = "resumependingcafcountCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 85 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :pending activation 
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.pendingactivationcountCtrlMdl = function (user, callback) {
	var fnm = "pendingactivationcountCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 1 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :boxchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.boxchangeCtrlMdl = function (user, callback) {
	var fnm = "boxchangeCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 10 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
 /*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 21/9/2022   - durga - Initial Function
******************************************************************************/
exports.ponchangeCtrlMdl = function (user, callback) {
	var fnm = "ponchangeCtrlMdl"
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
       join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.enty_sts_id = 11 ${whr}; `
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };

/*****************************************************************************
* Function       : updtprpdlmoamounttdata
* Description    : 
* Arguments      : callback function
* Change History :
* 3/09/2022   - ramesh - Initial Function
******************************************************************************/
exports.updatelmoamountdataMdl = function (datas, user, callback) {
    var fnm = "updatelmoamountdataMdl"
    console.log("success", datas)
    var data = datas.payuResponse.replace('\\', '');
    data = JSON.parse(data);
	console.log("only data after replace", data.unmappedstatus)
    date = ``;
    CardNumber = ``;
    surcharge = ``;
    clientcode = ``;
    udf15 = ``;
    udf14 = ``;
    signature = ``;
    udf13 = ``;
    udf12 = ``;
    udf11 = ``;
    amt = ``;
    udf10 = ``;
    merchant_id = ``;
    mer_txn = ``;
    f_code = ``;
    bank_txn = ``;
    udf9 = ``;
    ipg_txn_id = ``;
    bank_name = ``;
    prod = ``;
    mmp_txn = ``;
    udf5 = ``;
    udf6 = ``;
    udf3 = ``;
    udf4 = ``;
    udf2 = ``;
    udf1 = ``;
    discriminator = ``;
    var descamnt = data.unmappedstatus + ' Amount : ' + data.amount ;
    console.log("descamnt", descamnt)
    var payures = datas.merchantResponse
    console.log("payures", payures)

    if (data.addedon != null && data.addedon != '' && data.addedon != undefined) {
        date = `,date ='${data.addedon}'`
    }
    if (data.card_no != null && data.card_no != '' && data.card_no != undefined) {
        CardNumber = `,CardNumber ='${data.card_no}'`
    }
    if (data.transaction_fee != null && data.transaction_fee != '' && data.transaction_fee != undefined) {
        surcharge = `,surcharge ='${data.transaction_fee}'`
    }
    if (data.firstname != null && data.firstname != '' && data.firstname != undefined) {
        clientcode = `,clientcode ='${data.firstname}'`
    }
    if (data.hash != null && data.hash != '' && data.hash != undefined) {
        signature = `,signature ='${data.hash}'`
    }
    if (data.email != null && data.email != '' && data.email != undefined) {
        udf13 = `,udf13 ='${data.email}'`
    }
    if (data.firstname != null && data.firstname != '' && data.firstname != undefined) {
        udf12 = `,udf12 ='${data.firstname}'`
    }
    if (data.field9 != null && data.field9 != '' && data.field9 != undefined) {
        udf11 = `,udf11 ='${data.field9}'`
    }
    if (data.amount != null && data.amount != '' && data.amount != undefined) {
        amt = `,amt ='${data.amount}'`
    }
    if (data.field8 != null && data.field8 != '' && data.field8 != undefined) {
        udf10 = `,udf10 ='${data.field8}'`
    }
    if (data.key != null && data.key != '' && data.key != undefined) {
        merchant_id = `,merchant_id ='${data.key}'`
    }
    if (data.txnid != null && data.txnid != '' && data.txnid != undefined) {
        mer_txn = `,mer_txn ='${data.txnid}'`
    }
    if (data.status != null && data.status != '' && data.status != undefined) {
        f_code = `,f_code ='${data.status}'`
    }
    if (data.bank_ref_no != null && data.bank_ref_no != '' && data.bank_ref_no != undefined) {
        bank_txn = `,bank_txn ='${data.bank_ref_no}'`
    }
    if (data.field7 != null && data.field7 != '' && data.field7 != undefined) {
        udf9 = `,udf9 ='${data.field7}'`
    }
    
    if (data.PG_TYPE != null && data.PG_TYPE != '' && data.PG_TYPE != undefined) {
        bank_name = `,bank_name ='${data.PG_TYPE}'`
    }
    if (data.APSFL != null && data.APSFL != '' && data.APSFL != undefined) {
        prod = `,prod ='${data.APSFL}'`
    }
    if (data.field5 != null && data.field5 != '' && data.field5 != undefined) {
        mmp_txn = `,mmp_txn ='${data.field5}'`
    }
    if (data.field5 != null && data.field5 != '' && data.field5 != undefined) {
        udf5 = `,udf5 ='${data.field5}'`
    }
    if (data.field6 != null && data.field6 != '' && data.field6 != undefined) {
        udf6 = `,udf6 ='${data.field6}'`
    }
    if (data.field3 != null && data.field3 != '' && data.field3 != undefined) {
        udf3 = `,udf3 ='${data.field3}'`
    }
    if (data.field4 != null && data.field4 != '' && data.field4 != undefined) {
        udf4 = `,udf4 ='${data.field4}'`
    }
    if (data.field1 != null && data.field1 != '' && data.field1 != undefined) {
        udf1 = `,udf1 ='${data.field1}'`
    }
    if (data.field2 != null && data.field2 != '' && data.field2 != undefined) {
        udf2 = `,udf2 ='${data.field2}'`
    }
    if (data.mode != null && data.mode != '' && data.mode != undefined) {
        discriminator = `,discriminator ='${data.mode}'`
    }
    //if (data.auth_code != null && data.auth_code != '' && data.auth_code != undefined) {
       // auth_code = `,auth_code ='${data.auth_code}'`
    //}
    //if (data.field3 != null && data.field3 != '' && data.field3 != undefined) {
      //  mrcht_usr_id= `, mrcht_usr_id='${data.field3}'`
    //}

    var QRY_TO_EXEC = `update prepaid_lmo_amount_transaction set descr ='${data.unmappedstatus}',payu_res ='${payures}' ${date} ${CardNumber} ${surcharge} ${clientcode} ${udf15} ${udf14} ${signature} ${udf13} ${udf12}
     ${udf11} ${udf10} ${amt} ${merchant_id} ${mer_txn} ${f_code} ${bank_txn} ${bank_txn} ${udf9} ${ipg_txn_id}
     ${bank_name} ${prod} ${mmp_txn} ${udf5} ${udf6} ${udf3} ${udf4} ${udf1} ${udf2} ${discriminator} ,u_ts=CURRENT_TIMESTAMP() where trns_mrchant_id='${data.txnid}' ;`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/**************************************************************************************
* Controller     : getlmowalletblnceupdatedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getlmowalletblnceupdatedataMdl = function ( data,user,callback) {
    var fnm = "getlmowalletblnceupdatedataMdl"
   var QRY_TO_EXEC = `select * from mrcht_usr_lst_t  where mrcht_usr_id = ${data.mrcht_usr_id} ;`

   console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",'',fnm);
}

/**************************************************************************************
* Controller     : updatelmowalletblncedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatelmowalletblncedataMdl = function ( data,newblnce,callback) {
    var fnm = "updatelmowalletblncedataMdl"
   var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance=${newblnce} where mrcht_usr_id = ${data.mrcht_usr_id};`

   console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",'',fnm);
}

/*****************************************************************************
 * Function       : updatelmofaccntingblncedataMdl
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updatelmofaccntingblncedataMdl = (data, lmoblncedata, newblnce, user) => {
    var fnm = 'updatelmofaccntingblncedataMdl';
	var payuResponse = data.payuResponse.replace('\\', '');
	console.log("data",data);
	payuResponse = JSON.parse(payuResponse);
            var QRY_TO_EXEC = `INSERT INTO prepaid_f_accounting(admin_id, trns_mrchant_id, cust_id, stb_id, open_bal, amount, close_bal, cpe_chrge, operation, remarks, ac_date, dateCreated, created_by, money_type)VALUES(
                                ${data.mrcht_usr_id},'${payuResponse.txnid}',0,0,'${lmoblncedata.balance}','${payuResponse.amount}','${newblnce}',0,'added from pay_u','${payuResponse.firstname}',curdate(), CURRENT_TIMESTAMP(), ${data.usr_ctgry_ky},'Credit');`;

                                console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
* Function       : gettrmndcaflmodtls
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.gettrmndcaflmodtls = function (data, user, callback) {

    var QRY_TO_EXEC = `select *,DATE_FORMAT(spnd_ts,'%d-%m-%Y') as suspended from prepaid_caf_termination_dtl_t where a_in=1;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};  

/*****************************************************************************
* Function       : threemnthscafspndcountMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.threemnthscafspndcountMdl = function (data, user, callback) {

    var QRY_TO_EXEC = `select count(*) from prepaid_caf_termination_dtl_t where a_in=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}; 
   
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
******************************************************************************/
exports.totalprepaidlistdataMdl = function (data, user, callback) {
	var fnm = "totalprepaidlistdataMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,d.districtname as district_Name,c.caf_id,a.agnt_cd,c.mbl_nu,a.agnt_nm ,e.sts_nm as status,m.fst_nm,
	date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as Cycle_Start_Date,date_format(cp.cycle_end_dt,'%Y-%m-%d %H:%i:%S') as Cycle_End_Date		from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
	  join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id and cp.a_in=1
	 join districts as d on d.districtuid = c.instl_dstrct_id
    where a.prpd_flag=1 ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
******************************************************************************/
exports.suspendedcaflistCtrlMdl = function (data, user, callback) {
	var fnm = "suspendedcaflistCtrlMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status, date_format(c.spnd_ts,'%Y-%m-%d %H:%i:%S') as Suspended_Date from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
   // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 7 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`

 var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
         ORDER BY c.caf_id
         ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status, date_format(c.spnd_ts,'%Y-%m-%d %H:%i:%S') as Suspended_Date from caf_dtl_t as c
     join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
  join districts as d on d.districtuid = c.instl_dstrct_id
   join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id  and cp.a_in=1
  where a.prpd_flag=1 and c.enty_sts_id = 7 ${whr}`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
******************************************************************************/
exports.activecaflistCtrlMdl = function (data, user, callback) {
	var fnm = "activecaflistCtrlMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,p.pckge_nm as Pckge_Name,date_format(c.actvn_ts,'%Y-%m-%d %H:%i:%S') as Activation_Date,
		// date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as Caf_Renewed_Date,date_format(cp.cycle_end_dt,'%Y-%m-%d %H:%i:%S') as Caf_end_Date,date_format(cp.caf_date,'%Y-%m-%d') as Advance_Renewal_Date from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id and cp.a_in=1
  // join pckge_lst_t as p on p.pckge_id = cp.pckge_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 6 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 
 var QRY_TO_EXEC=`select ROW_NUMBER() OVER (
         ORDER BY c.caf_id
         ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,p.pckge_nm as Pckge_Name,date_format(c.actvn_ts,'%Y-%m-%d %H:%i:%S') as Activation_Date,
		 date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as Caf_Renewed_Date,date_format(cp.cycle_end_dt,'%Y-%m-%d %H:%i:%S') as Caf_end_Date,date_format(cp.caf_date,'%Y-%m-%d') as Advance_Renewal_Date from caf_dtl_t as c
     join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id and cp.a_in=1
   join pckge_lst_t as p on p.pckge_id = cp.pckge_id
  join districts as d on d.districtuid = c.instl_dstrct_id
  where a.prpd_flag=1 and c.enty_sts_id = 6  ${whr};`;
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };

/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
 * 16/2/2024   - durga - query changed (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.terminatedcaflistMdl = function (data, user, callback) {
	var fnm = "terminatedcaflistMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 8 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
         ORDER BY c.caf_id
         ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
     join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
  join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
  join districts as d on d.districtuid = c.instl_dstrct_id
    join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id  and cp.a_in=1
  where a.prpd_flag=1 and c.enty_sts_id = 8  ${whr};`;
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.terminatedpendingcaflistMdl = function (data, user, callback) {
	var fnm = "terminatedpendingcaflistMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 45 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 
 var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
         ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
  join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
  join districts as d on d.districtuid = c.instl_dstrct_id
  where a.prpd_flag=1 and c.enty_sts_id = 45  ${whr}`;
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed bss prepaid dashboard web (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.suspendpendingcaflist = function (data, user, callback) {
	var fnm = "suspendpendingcaflist"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 84 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
         ORDER BY c.caf_id
         ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
     join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
  join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
  join districts as d on d.districtuid = c.instl_dstrct_id
  where a.prpd_flag=1 and c.enty_sts_id = 84  ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed bss prepaid dashboard web (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.resumependingcaflistMdl = function (data, user, callback) {
	var fnm = "resumependingcaflistMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 85 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 
 var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 join districts as d on d.districtuid = c.instl_dstrct_id
 where a.prpd_flag=1 and c.enty_sts_id = 85  ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed bss prepaid dashboard web (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.pendingactivationcaflistMdl = function (data, user, callback) {
    
	var fnm = "pendingactivationcaflistMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY c.caf_id
        // ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,c.actvn_dt,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 1 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 
 
  var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,c.actvn_dt,a.agnt_nm,c.mbl_nu,e.sts_nm as status from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 join districts as d on d.districtuid = c.instl_dstrct_id
 where a.prpd_flag=1 and c.enty_sts_id = 1 ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed bss prepaid dashboard web (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.boxchangelistMdl = function (data, user, callback) {
	var fnm = "boxchangelistMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY a.agnt_cd
        // ) sno,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,d.districtname as district_name from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 10 and c.caf_type_id=1 ${whr};`
 
 
  var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
         ORDER BY a.agnt_cd
         ) sno,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,d.districtname as district_name from caf_dtl_t as c
     join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
     join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
  join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
  join districts as d on d.districtuid = c.instl_dstrct_id
  where a.prpd_flag=1 and c.enty_sts_id = 10  ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
/*****************************************************************************
* Function       :ponchange count 
* Description    : 
* Arguments      : callback function
* Change History :
* 22/9/2022   - durga - Initial Function
16/2/2024   - durga - query changed bss prepaid dashboard web (remove condition (and c.caf_type_id=1 and c.apsfl_bbnl=4))
******************************************************************************/
exports.ponchangelistCtrlMdl = function (data, user, callback) {
	var fnm = "ponchangelistCtrlMdl"
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c. mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    // var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        // ORDER BY a.agnt_cd
        // ) sno,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,c.actvn_dt,d.districtname as district_name from caf_dtl_t as c
    // join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    // join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 // join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 // join districts as d on d.districtuid = c.instl_dstrct_id
 // where a.prpd_flag=1 and c.enty_sts_id = 11 and c.caf_type_id=1 and c.apsfl_bbnl=4 ${whr};`
 
 
 
  var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY a.agnt_cd
        ) sno,a.agnt_cd,c.caf_id,a.agnt_nm,c.mbl_nu,e.sts_nm as status,c.actvn_dt,d.districtname as district_name from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
 join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
 join districts as d on d.districtuid = c.instl_dstrct_id
 where a.prpd_flag=1 and c.enty_sts_id = 11  ${whr};`
   
       console.log(QRY_TO_EXEC);
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'', fnm);
   };
   
/*****************************************************************************
 * Function       : vrfyTrnsnStlmentMdl
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
exports.vrfyTrnsnStlmentMdl = (txnid, user) => {
	var fnm = 'vrfyTrnsnStlmentMdl'
    var QRY_TO_EXEC = ` SELECT * FROM prepaid_lmo_amount_transaction p WHERE p.trns_mrchant_id = '${txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : vrfySbscrTrnsnStlmentMdl
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.vrfySbscrTrnsnStlmentMdl = (txnid, user) => {
    var fnm = 'vrfySbscrTrnsnStlmentMdl'
    var QRY_TO_EXEC = ` SELECT * FROM sub_alacarte_transaction WHERE trns_mrchant_id = '${txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : updateInvoicePymntDtls
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updateInvoicePymntDtls = (data, dtls, paid_in) => {
    var fnm = 'updateInvoicePymntDtls'

    var QRY_TO_EXEC = `update prepaid_lmo_amount_transaction set descr = '${dtls.status}',ipg_txn_id = '${dtls.bank_ref_num}',
    mmp_txn = '${dtls.mihpayid}',surcharge= '${dtls.additional_charges}',prod='${dtls.productinfo}', auth_code='${dtls.error_code}'
    , discriminator='${dtls.mode}' WHERE trns_mrchant_id = '${dtls.txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : getupdatedInvoicePymntDtls
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.getupdatedInvoicePymntDtls = (data, dtls, paid_in) => {
    var fnm = 'getupdatedInvoicePymntDtls'

    var QRY_TO_EXEC = `select * from prepaid_lmo_amount_transaction WHERE trns_mrchant_id = '${dtls.txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : getlmoblncedata
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.getlmoblncedata = (data, user) => {
    var fnm = 'getlmoblncedata'
    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t where mrcht_usr_id=${data.mrcht_usr_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : insrtTrnsDtlsMdl
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.insrtUPITrnsDtlsMdl = (data, datas, upi_res_jsn_txt, trns_res, lmoblncedata, newblnce, user) => {
    var fnm = 'insrtUPITrnsDtlsMdl'
	console.log("data",data)
            var QRY_TO_EXEC = `INSERT INTO prepaid_f_accounting(admin_id, trns_mrchant_id,cust_id, stb_id, open_bal, amount, close_bal, cpe_chrge, operation, remarks, ac_date, dateCreated, created_by, money_type)VALUES(
                                ${trns_res.mrcht_usr_id},'${datas.txnid}',0,0,'${lmoblncedata.balance}','${trns_res.amt}','${newblnce}',0,'retrack from pay_u','${lmoblncedata.fst_nm}',curdate(), CURRENT_TIMESTAMP(), ${trns_res.usr_ctgry_ky},'Credit');`;

                                console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : updtwltlmoblncechngMdl
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updtwltlmoblncechngMdl = (newblnce, data, user) => {
    var fnm = 'updtwltlmoblncechngMdl'
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance='${newblnce}' where mrcht_usr_id=${data.mrcht_usr_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
 * Function       : updatefailInvoicePymntDtls
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updatefailInvoicePymntDtls = (txnid, data, paid_in) => {
    var fnm = 'updatefailInvoicePymntDtls'
    var QRY_TO_EXEC = `update prepaid_lmo_amount_transaction set descr = '${data}' WHERE trns_mrchant_id = '${txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
* Function       : enterprise call
* Description    : 
* Arguments      : callback function
* Change History :
* 13/10/2022   - durga - Initial Function
******************************************************************************/
exports.enterpricecallcntrCtrlMdl = function (user, callback) {
    var fnm = "enterpricecallcntrCtrlMdl"

    console.log("success", user);


    var QRY_TO_EXEC = `select  ROW_NUMBER() OVER (
        ORDER BY pc.complaint_id desc) as sno,co.complaint_owner_name as tkt_rse_by,pc.created_by,c.caf_id,m.mrcht_usr_nm as agnt_cd,d.dstrt_nm as dstrct,date_format(pc.created_date,'%Y-%m-%d') as Timestamp,CASE WHEN comp_status=1 then 'Open' 
        WHEN comp_status=2 then 'Resolved' when comp_status=3 then 'Close' when comp_status=4 then 'Auto_Resolution' end as ticket_status,
        pc.comp_ticket_type as concern_team,cd.loc_lcly_tx as organization_Name,pp.category as Issue_type,pc.comp_remarks as rmrks,
        c.mbl_nu as cll_mbl,m.eml_tx as email_add,'INCOMING' as cll_typ
        ,CASE WHEN comp_status=1 then time_format(timediff(current_timestamp(),pc.created_date),'%H:%i:%s') 
    WHEN comp_status in (2,3,4) then time_format(timediff(pc.edited_on, pc.created_date),'%H:%i:%s') 
    end as datediff,DATE_FORMAT(pc.edited_on,'%d-%m-%Y %H:%i:%S') as closedatetime,
    DATE_FORMAT(pc.created_date,'%d-%m-%Y %H:%i:%S') as dateCreated,DATE_FORMAT(pc.created_date,'%d-%m-%Y') as createdDate,
    DATE_FORMAT(pc.edited_on,'%d-%m-%Y') as closedate from prepaid_create_complaint as pc 
    left join caf_dtl_t as c on pc.caf_id = c.caf_id 
join mrcht_usr_lst_t as m on m.usr_ctgry_ky = c.lmo_agnt_id
left join new_dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id
left join complaint_sub_employees as cs on cs.complaint_sub_emp_id = pc.call_attend_by
left join complaint_owners as co on cs.complaint_owner_id=co.complaint_owner_id
 left join prepaid_complaint_prefer as pp on pp.id=pc.comp_cat
  left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
  where c.caf_type_id=2  order by complaint_id desc limit 20000;`;

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function       : enterprise call
* Description    : 
* Arguments      : callback function
* Change History :
* 13/10/2022   - durga - Initial Function
******************************************************************************/
exports.grievancelistCtrlMdl = function (user, callback) {
    var fnm = "grievancelistCtrlMdl"

    console.log("success", user);


    var QRY_TO_EXEC = `select  ROW_NUMBER() OVER (
        ORDER BY g.gen_enq_id desc) sno,m.mrcht_usr_nm as agnt_cd,d.dstrt_nm as dstrct,g.mobile_no as cll_mbl,g.email_id as email_add,
        date_format(g.i_ts,'%Y-%m-%d') as Timestamp,g.first_name as operator_name,
        g.manager  as Employee_name,g.description as rmrks,'INCOMMING' as cll_typ,
		'caller' as help_desk,'Grievance' as custmer_Help_Desk,'N/A' as suprt_dcm
from general_enquiries as g
join mrcht_usr_lst_t as m on g.created_by=m.mrcht_usr_id
left join dstrt_lst_t as d on d.dstrt_id = g.district
order by g.gen_enq_id desc limit 20000;`

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function       : updatesbscrInvoicePymntDtls
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updatesbscrInvoicePymntDtls = (data, dtls, paid_in) => {
    var fnm = 'updatesbscrInvoicePymntDtls'

    var QRY_TO_EXEC = `update sub_alacarte_transaction set descr = '${dtls.status}',ipg_txn_id = '${dtls.bank_ref_num}',
    mmp_txn = '${dtls.mihpayid}',surcharge= '${dtls.additional_charges}',prod='${dtls.productinfo}', auth_code='${dtls.error_code}'
    , discriminator='${dtls.mode}' WHERE trns_mrchant_id = '${dtls.txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/*****************************************************************************
* Function       : addCaffailedInsrtPckgsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 31/12/2021   - ramesh - Initial Function
******************************************************************************/
exports.addCaffailedInsrtPckgsMdl = function (str, id, cat_id, data, body, ext_json, api_response, user, callback) {
	var fnm = 'addCaffailedInsrtPckgsMdl'
    console.log("success", data, user)
    var QRY_TO_EXEC = `INSERT INTO subscriber_app_retrack_pckgs (service_type,package_ids,cat_ids, ext_json, trns_mrchant_id, mdlw_sbscr_id, caf_id, status, status_code, err_msg, i_ts) VALUES ('${str}','${id}','${cat_id}','${JSON.stringify(ext_json)}','${body.trns_mrchant_id}','${body.mdlw_sbscr_id}','${body.caf_id}',0,'${api_response.statusCode}','${api_response.statusMessage}',CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
};

/*****************************************************************************
 * Function       : updatesbscrfailInvoicePymntDtls
 * Arguments      : 
 * Change History :
 *
 ******************************************************************************/
 exports.updatesbscrfailInvoicePymntDtls = (txnid, data, paid_in) => {
    var fnm = 'updatesbscrfailInvoicePymntDtls'
    var QRY_TO_EXEC = `update sub_alacarte_transaction set descr = '${data}' WHERE trns_mrchant_id = '${txnid}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
}

/**************************************************************************************
* Controller     : faccountingsbscrledgerdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingsbscrledgerdataMdl = function (data, user, callback) {
    var fnm = 'faccountingsbscrledgerdataMdl'
    console.log("came into models")
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var QRY_TO_EXEC = `select f.*,p.pckge_nm,date_format(f.dateCreated,'%Y-%m-%d %H:%i:%S') as date_created,pt.gateway,mu.mrcht_usr_nm,cs.cstmr_nm
	,case when f.stb_id =0 then f.amount
     when f.stb_id=79 then 350
     when f.stb_id=80 then 350
     when f.stb_id=3000106 then 599
     when f.stb_id=3000107 then 499
     when f.stb_id=3000110 then 350 else f.amount end as pack_amount from prepaid_f_accounting as f 
    left join mrcht_usr_lst_t as mu on mu.mrcht_usr_id=f.admin_id
	join agnt_lst_t as a on a.agnt_id=mu.usr_ctgry_ky
    left join caf_dtl_t as c on c.caf_id=f.cust_id
	left join pckge_lst_t as p on p.pckge_id=f.stb_id
    left join cstmr_dtl_t as cs on c.cstmr_id=cs.cstmr_id 
	join prepaid_lmo_amount_transaction as pt on mu.mrcht_usr_id= pt.mrcht_usr_id
    where f.ac_date between '${year}-${month}-01' and curdate() and f.cust_id=${data.caf_id}
    group by f_ac_id order by f_ac_id DESC;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function       : prvsdaysuspndcafcount
* Description    : 
* Arguments      : 
* Change History :
* 10/11/2022   - durga - Initial Function
******************************************************************************/
exports.prvsdaysuspndcafcountCtrlMdl = function (data, user, callback) {
    var fnm = "prvsdaysuspndcafcountCtrlMdl"
    console.log("success", data, user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1  ${whr} and c.enty_sts_id = 7 and  date(spnd_ts) = curdate() ;
`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : prvsdaysuspndcaf
* Description    : 
* Arguments      : 
* Change History :
* 10/11/2022   - durga - Initial Function
******************************************************************************/
exports.prvsdaysuspndcafCtrlMdl = function (data, user, callback) {
    var fnm = "prvsdaysuspndcafCtrlMdl"
    console.log("success", data, user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,d.districtname as district_name,a.agnt_cd,c.caf_id,p.pckge_nm,a.agnt_nm,c.mbl_nu,e.sts_nm as status,date_format(c.spnd_ts,'%Y-%m-%d %H:%i:%S') as Suspended_Date from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
    join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
   join mrcht_usr_lst_t as m on m.usr_ctgry_ky =a.agnt_id
   join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
 join districts as d on d.districtuid = c.instl_dstrct_id
 where a.prpd_flag=1 and c.enty_sts_id = 7 and c.caf_type_id=1 and  date(spnd_ts) = curdate() - INTERVAL 1 DAY ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : tdyadvancerenwedcaf
* Description    : 
* Arguments      : 
* Change History :
* 10/11/2022   - durga - Initial Function
******************************************************************************/
exports.tdyadvancerenwedcafCtrlMdl = function (data, user, callback) {
    var fnm = "tdyadvancerenwedcafCtrlMdl"
    console.log("success", data, user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,a.agnt_cd as agnt_nm,p.pckge_nm,c.caf_id,cs.cstmr_nm,d.districtname as district_name,c.mbl_nu,date_format(cp.caf_date,'%Y-%m-%d') as 'Advance_Renewal_Date',
date_format(f.ac_date,'%Y-%m-%d') as 'Renewal_date',date_format(cp.cycle_strt_dt,'%Y-%m-%d %H:%i:%S') as 'createdDate' from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
	join districts as d on d.districtuid = c.instl_dstrct_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where  p.pckge_type_id=1 and cp.advance_recharge=1 ${whr} and cp.caf_date = curdate() group by c.caf_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : tdyadvancerenwedcafcount
* Description    : 
* Arguments      : 
* Change History :
* 10/11/2022   - durga - Initial Function
******************************************************************************/
exports.tdyadvancerenwedcafcountCtrlMdl = function (data, user, callback) {
    var fnm = "tdyadvancerenwedcafcountCtrlMdl"
    console.log("success", data, user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as 'tdy_renwd_caf' from caf_pckge_prchse_dtl_t as cp 
	join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id where  p.pckge_type_id=1 ${whr} and cp.caf_date = curdate() and cp.advance_recharge=1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : postlistmonthlyonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebcountMdl = function (data, user, callback) {
    var fnm = 'onlinecollectionwebcountMdl'
    var whr = ``

    console.log("success", user)
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    
    var QRY_TO_EXEC = ` select  ifnull(cast(SUM(amt) as decimal(10,2)),0) as 'online collection tdy' 
    from sub_alacarte_transaction as s
       join caf_dtl_t as c on c.caf_id=s.caf_id
     join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
     join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
     where f_code='Ok' and date(s.i_ts)=curdate() ${whr};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlyonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionweblisttdyMdl = function (data, user, callback) {
    var fnm = 'onlinecollectionweblisttdyMdl'
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    console.log("success",  user)
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
      var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where f_code='Ok' and date(s.i_ts) between '${crntYear}-${crntMnth}-01' and curdate() ${whr};`

    /*var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where f_code='Ok' and date_format(s.i_ts,'%Y-%m-%d') = curdate() ${whr} group by s.caf_id ,s.trns_mrchant_id  ; `*/

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : onlinecollectionwebmtdcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebmtdcountMdl = function (data, user, callback) {
    var fnm = 'onlinecollectionwebmtdcountMdl'
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    console.log("success", user)
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    

    var QRY_TO_EXEC = ` select  ifnull(cast(SUM(amt) as decimal(10,2)),0) as 'online collection tdy' 
    from sub_alacarte_transaction as s
       join caf_dtl_t as c on c.caf_id=s.caf_id
     join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
     join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
     where f_code='Ok' and date(s.i_ts) between '${crntYear}-${crntMnth}-01' and curdate()  ${whr};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : postlistmonthlyonlinecollectionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebmtdlistMdl = function (data, user, callback) {
    var fnm = 'onlinecollectionwebmtdlistMdl'
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    console.log("success", user)
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
        var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where f_code='Ok' and date(s.i_ts) = curdate() ${whr} group by s.caf_id ,s.trns_mrchant_id  ; `

    /*var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where f_code='Ok' and date_format(s.i_ts,'%Y-%m-%d') between '${crntYear}-${crntMnth}-01' and curdate() ${whr};`*/

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : todaysuspendedlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysuspendedlistMdl = function ( user, callback) {
    var fnm = 'todaysuspendedlistMdl'
    var whr = ``
    
    console.log("success", user) 

    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id desc
        ) sno,agnt_cd,c.caf_id,agnt_nm,mbl_nu,amt,DATE_FORMAT(DATE(s.i_ts),'%d-%m-%Y') as dt from sub_alacarte_transaction as s
        join caf_dtl_t as c on c.caf_id=s.caf_id
		join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
        join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id 
        where f_code='Ok' and date(s.i_ts)=curdate() ${whr};`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/*****************************************************************************
* Function       : prvsdaysuspndcaf
* Description    : 
* Arguments      : 
* Change History :
* 10/11/2022   - durga - Initial Function
******************************************************************************/
exports.todaysuspendedcountMdl = function ( user, callback) {
    var fnm = "todaysuspendedcountMdl"
    console.log("success", user)
    
    if (user.usr_ctgry_id == 1) {
        whr = ``;
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as count  from caf_dtl_t as c
    join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.caf_type_id=1  and c.enty_sts_id = 7 and  date(spnd_ts) = curdate() ${whr};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : prepaidcafdstrtcountMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/9/2022   - Ramesh - Initial Function
******************************************************************************/
exports.prepaidcafdstrtcountMdl = function (data, user, callback) {
    var fnm = "prepaidcafdstrtcountMdl"
    console.log("success", data.dstrt_fltr, user)
	var whr = ``;
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }

    // var QRY_TO_EXEC = `select format(COUNT(c.enty_sts_id), 'NO') AS 'Total_CAF_count',
    // format(COUNT(CASE
        // WHEN c.enty_sts_id = 6 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Active',
    // format(COUNT(CASE
        // WHEN c.enty_sts_id =1 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Pending_Activation',
        // format(COUNT(CASE
        // WHEN c.enty_sts_id =10 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Box_Change_Initiated',
        // format(COUNT(CASE
        // WHEN c.enty_sts_id =11 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Pon_Change_Initiated',
        // format(COUNT(CASE
        // WHEN c.enty_sts_id=8 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Terminated',
        // format(COUNT(CASE
        // WHEN c.enty_sts_id =45 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Termination_Pending',
        // format(COUNT(CASE
        // WHEN c.enty_sts_id =84 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Suspend_Pending',
	// format(COUNT(CASE
        // WHEN c.enty_sts_id =85 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Resume_Pending',
    // format(COUNT(CASE
        // WHEN c.enty_sts_id = 7 THEN 1
        // ELSE NULL
    // END), 'NO') AS 'Suspended' from caf_dtl_t  as c
// join agnt_lst_t as a on lmo_agnt_id = a.agnt_id
// join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id 
// where a.prpd_flag=1 and c.caf_type_id=1 and c.apsfl_bbnl = 4 ${whr} ; `
 var QRY_TO_EXEC = `select format(COUNT(c.enty_sts_id), 'NO') AS 'Total_CAF_count',
    format(COUNT(CASE
        WHEN c.enty_sts_id = 6 THEN 1
        ELSE NULL
    END), 'NO') AS 'Active',
    format(COUNT(CASE
        WHEN c.enty_sts_id =1 THEN 1
        ELSE NULL
    END), 'NO') AS 'Pending_Activation',
        format(COUNT(CASE
        WHEN c.enty_sts_id =10 THEN 1
        ELSE NULL
    END), 'NO') AS 'Box_Change_Initiated',
        format(COUNT(CASE
        WHEN c.enty_sts_id =11 THEN 1
        ELSE NULL
    END), 'NO') AS 'Pon_Change_Initiated',
        format(COUNT(CASE
        WHEN c.enty_sts_id=8 THEN 1
        ELSE NULL
    END), 'NO') AS 'Terminated',
        format(COUNT(CASE
        WHEN c.enty_sts_id =45 THEN 1
        ELSE NULL
    END), 'NO') AS 'Termination_Pending',
        format(COUNT(CASE
        WHEN c.enty_sts_id =84 THEN 1
        ELSE NULL
    END), 'NO') AS 'Suspend_Pending',
	format(COUNT(CASE
        WHEN c.enty_sts_id =85 THEN 1
        ELSE NULL
    END), 'NO') AS 'Resume_Pending',
    format(COUNT(CASE
        WHEN c.enty_sts_id = 7 THEN 1
        ELSE NULL
    END), 'NO') AS 'Suspended' from caf_dtl_t  as c
join agnt_lst_t as a on lmo_agnt_id = a.agnt_id
join caf_pckge_prchse_dtl_t as cp on cp.caf_id =c.caf_id and c.crnt_pln_id=cp.pckge_id  and cp.a_in=1
join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id 
where a.prpd_flag=1  ${whr} ; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function       : versionchckforPrepaidMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 17/9/2022   - Ramesh - Initial Function
******************************************************************************/
exports.versionchckforPrepaidMdl = function (data, user, callback) {
    var fnm = "versionchckforPrepaidMdl"

    var QRY_TO_EXEC = `select lmo_app_prpd_vrsn,app_version,gateways from prepaid_business_information; `

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function      : getNotificationDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getnotificationdataMdl = function (data, user) {
    var fnm ="getnotificationdataMdl"

    var QRY_TO_EXEC = ` SELECT *, date_format(i_ts,'%Y-%m-%d %H:%i:%S') as date_time  FROM app_psh_ntfy_dtl_t WHERE lmo_agnt_id  = ${data.lmo_agnt_id} AND a_in = 1 order by i_ts desc; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
/*****************************************************************************
* Function       : toggleButtonResMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 08/12/2021   - Ramesh P - Initial Function
******************************************************************************/
exports.updatenotificationdataMdl = function (data, user, callback) {
    var fnm = 'updatenotificationdataMdl';
	

	var QRY_TO_EXEC = `update app_psh_ntfy_dtl_t set u_ts=current_timestamp(),seen=${data.seen} where ntfy_id=${data.ntfy_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allbasepackscountMdl = function (data, user, callback) {
    var fnm = 'allbasepackscountMdl'
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select format(COUNT(c.crnt_pln_id), 'NO') AS 'Total_CAF_count',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 79 THEN 1
        ELSE NULL
    END), 'NO') AS 'homebasiccafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (80,3000110) THEN 1
        ELSE NULL
    END), 'NO') AS 'homeminicafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =3000107 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeessentialcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =3000106 THEN 1
        ELSE NULL
    END), 'NO') AS 'homepremiumcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id=8000000 THEN 1
        ELSE NULL
    END), 'NO') AS 'homelifecafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =8000001 THEN 1
        ELSE NULL
    END), 'NO') AS 'homegoldcafs',
        format(COUNT(CASE
        WHEN c.crnt_pln_id =8000002 THEN 1
        ELSE NULL
    END), 'NO') AS 'homegoldpluscafs',
	format(COUNT(CASE
        WHEN c.crnt_pln_id =8000003 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeplatinumcafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000004 THEN 1
        ELSE NULL
    END), 'NO') AS 'ootminicafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000005 THEN 1
        ELSE NULL
    END), 'NO') AS 'ottmaxicafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 8000006 THEN 1
        ELSE NULL
    END), 'NO') AS 'ootprimecafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 9000000 THEN 1
        ELSE NULL
    END), 'NO') AS 'homeultracafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 9000001 THEN 1
        ELSE NULL
    END), 'NO') AS 'homepiecafs',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (3000148,4000000) THEN 1
        ELSE NULL
    END), 'NO') AS 'testhsi60',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 3000149 THEN 1
        ELSE NULL
    END), 'NO') AS 'testhsi100',
    format(COUNT(CASE
        WHEN c.crnt_pln_id = 82 THEN 1
        ELSE NULL
    END), 'NO') AS 'homestandard',
    format(COUNT(CASE
        WHEN c.crnt_pln_id in (3000119,2000002) THEN 1
        ELSE NULL
    END), 'NO') AS 'testpack' from caf_dtl_t  as c
    join agnt_lst_t as a on lmo_agnt_id = a.agnt_id 
    join dstrt_lst_t as d on d.dstrt_id = c.instl_dstrct_id 
    where a.prpd_flag=1 and c.caf_type_id=1 and c.enty_sts_id not in (8,45) ${whr}; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allbasepackslistMdl = function (data, user, callback) {
    var fnm = 'allbasepackslistMdl'
    var date = new Date();
    var whr = ``
    var date = new Date();
    var crntYear = new Date().getFullYear();

    var crntMnth = date.getMonth() + 1;

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select * from caf_dtl_t where enty_sts_id not in (8,45) and caf_type_id=1 ${whr}; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : mmonthly collection caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allalacartepackscountMdl = function (data, user, callback) {
    var fnm = 'allalacartepackscountMdl'
    var whr = ``

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var QRY_TO_EXEC = `select count(*) as count from caf_pckge_prchse_dtl_t as cp
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=2
    where cp.a_in=1  ${whr}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : monthly renewd caf Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.alcartecountMdl = function (id, data, user, callback) {
    var fnm = 'alcartecountMdl'
    var whr = ``;
    var idmdl = ``;
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select ifnull(sum(f.amount),0) as count from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=2
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where 1=1 ${whr} ${idmdl} `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}
/**************************************************************************************
* Controller     : alcartelistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.alcartelistMdl = function (id, data, user, callback) {
    var fnm = 'alcartelistMdl'
    //let pge_nu = data.lmt_pstn * 20;
    var whr = ``
    var idmdl = ``
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY cp.caf_id desc
        ) sno,a.agnt_cd,c.caf_id,cs.cstmr_nm,c.mbl_nu,a.agnt_nm,p.pckge_nm,case when cp.cycle_end_dt is not null then date_format(MAX(cp.cycle_end_dt),'%Y-%m-%d') else '0000-00-00' end as end_date from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and f.stb_id=cp.pckge_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=2
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where 1=1 ${whr} ${idmdl} group by cp.caf_id order by c.caf_id desc`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}
/**************************************************************************************
* Controller     : planchangecountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.planchangecountMdl = function (id, data, user, callback) {
    var fnm = 'planchangecountMdl'
    var whr = ``
    var idmdl = ``
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();

    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select ifnull(sum(f.amount),0) as count from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where f.operation='Plan Change' ${whr} ${idmdl} `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}
/**************************************************************************************
* Controller     : planchangelistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.planchangelistMdl = function (id, data, user, callback) {
    var fnm = 'planchangelistMdl'
    //let pge_nu = data.lmt_pstn * 20;
    var whr = ``
    var idmdl =``
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (
        ORDER BY c.caf_id
        ) sno,f.* from caf_pckge_prchse_dtl_t as cp 
    join prepaid_f_accounting as f on f.cust_id=cp.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    join caf_dtl_t as c on c.caf_id=cp.caf_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where f.operation='Plan Change' ${whr} ${idmdl} group by c.caf_id order by c.caf_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}
/**************************************************************************************
* Controller     : terminateinitiatcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.terminateinitiatcountMdl = function (id, data, user, callback) {
    var fnm = 'terminateinitiatcountMdl'
    var whr = ``
    var idmdl = ``
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select ifnull(sum(f.amount),0) as count from prepaid_f_accounting as f
    join caf_dtl_t as c on c.caf_id=f.cust_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=f.created_by where f.operation='30_days_Suspended_caf' ${whr} ${idmdl};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}
/**************************************************************************************
* Controller     : terminateinitiatlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.terminateinitiatlistMdl = function (id, data, user, callback) {
    var fnm = 'terminateinitiatlistMdl'
    //let pge_nu = data.lmt_pstn * 20;
    var whr = ``
    var idmdl=``
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var currntYear = new Date().getFullYear();
    if (user.usr_ctgry_id == 1) {
        if(data.dstrt_fltr == true){
            whr = `and c.instl_dstrct_id=${data.dstrt}`;
        } else {
            whr = ``;
        }
    } else if (user.usr_ctgry_id == 8) {
        whr = `and c.lmo_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 7) {
        whr = `and c.mso_agnt_id='${user.usr_ctgry_ky}'`;
    } else if (user.usr_ctgry_id == 2) {
        whr = `and c.instl_dstrct_id='${user.hyrchy_grp_id}'`;
    }
    if(id == 1){
        idmdl = `and f.ac_date between
        '${currntYear}-${currntMnth}-01' and curdate() `
    } else {
        idmdl = `and f.ac_date = curdate() `
    }
    var QRY_TO_EXEC = `select c.caf_id,m.mrcht_usr_nm,cs.cstmr_nm from prepaid_f_accounting as f
    join caf_dtl_t as c on c.caf_id=f.cust_id
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=f.created_by where f.operation='30_days_Suspended_caf' ${whr} ${idmdl} order by c.caf_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}

/**************************************************************************************
* Controller     : cafCountInsrtMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.cafCountInsrtMdl = function (data, user, callback) {
    var fnm = 'cafCountInsrtMdl'

    var QRY_TO_EXEC = `insert into count_caf_dtl_t ( actve_cnt, spnd_cnt, trmnte_cnt, tomorrow_spnd_cnt, tday_spnd_cnt, a_in, i_ts) 
    select sum(case when c.enty_sts_id in (6,85,10,11,1) then 1 else 0 end) as actve_cnt,sum(case when c.enty_sts_id in (7,84) then 1 else 0 end) as spnd_cnt
    ,sum(case when c.enty_sts_id in (8,45) then 1 else 0 end) as trmnte_cnt,(select count(distinct(c.caf_id)) as 'expired_caf' from caf_pckge_prchse_dtl_t as cp 
        join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
        join caf_dtl_t as c on c.caf_id=cp.caf_id where p.pckge_type_id=1 and cp.a_in=1 and c.caf_type_id=1 and c.enty_sts_id not in (8,45,7) and cp.cycle_end_dt=curdate())  as 'tomorrow_spnd_cnt',
    (select count(*) as count  from caf_dtl_t as c
        join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id where a.prpd_flag=1 and c.caf_type_id=1 and c.enty_sts_id = 7 and  date(spnd_ts) = curdate() - INTERVAL 1 DAY) as 'tday_spnd_cnt'
        ,1 as 'a_in',curdate() - interval 1 day as 'i_ts' from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id and a.prpd_flag=1 and c.caf_type_id=1;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", '', fnm);
}

/*****************************************************************************
* Function       : lmotxnidsMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 21/10/2023   - Ramesh Patlola - Initial Function
******************************************************************************/
exports.lmotxnidsMdl = function(data, user,callback){
	var fnm='lmotxnidsMdl'

    var QRY_TO_EXEC = `select 300000 as diff_time,descr,amt,gateway,usr_ctgry_ky,mrcht_usr_id,lmo_code,trns_mrchant_id,date_format(i_ts,'%Y-%m-%d %H:%i:%s') as i_ts,date_format(u_ts,'%Y-%m-%d %H:%i:%s') as u_ts from prepaid_lmo_amount_transaction where i_ts between (now() - INTERVAL 240 MINUTE) and (now() - INTERVAL 5 MINUTE) and (descr not in ('APPROVED OR COMPLETED SUCCESSFULLY','captured','SUCCESS','TRANSACTION IS SUCCESSFUL','TRANSACTION IS SUCCESSFUL.','payment.captured','filed','FAILED','failure','Not Found','NODATA') or descr is null) 
	and usr_ctgry_ky =${user.usr_ctgry_ky} and gateway <> 'Razorpay' order by i_ts asc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};