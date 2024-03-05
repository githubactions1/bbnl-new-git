// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function      : getCafVoipCstmrDtlsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
* Change History :
* 09/11/2023    - Ramesh Patlola  - Initial Function
*
******************************************************************************/
exports.getCafVoipCstmrDtlsMdl = (data, user) => {
    var fnm = "getCafVoipCstmrDtlsMdl"


    var QRY_TO_EXEC = `SELECT
    date_format(cf.actvn_dt,'%Y-%m-%d') as actvn_dt, cf.caf_id, cf.caf_nu,REPLACE(vp.phne_nu, '-', '') as phne_nu, cf.mdlwe_sbscr_id,
    cu.frst_nm, cu.lst_nm,cf.iptv_mac_addr_tx,
    cf.mbl_nu, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cf.enty_sts_id,es.enty_sts_id,
    es.sts_nm,cf.caf_type_id, cf.crnt_pln_id, p.pckge_nm,  
	SUM((CASE WHEN adons.chrge_at is NOT NULL THEN adons.chrge_at  ELSE 0 END) + 
    (CASE WHEN adons.gst_at is NOT NULL THEN adons.gst_at  ELSE 0 END)) as ttl_bill_cst
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    left join voip_caf_phne_nmbrs_rel_t as vc on vc.caf_id=cf.caf_id and vc.a_in=1
    left join voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id=vc.phne_nmbr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN pckge_lst_t p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
	LEFT JOIN caf_pckge_prchse_dtl_t adons on adons.caf_id = cf.caf_id AND adons.a_in = 1
    WHERE cf.enty_sts_id = 6 AND cf.lmo_agnt_id = ${data.agntId}  and p.pckge_id = 79 
	AND cf.caf_id = ${data.caf_id} and cf.trmnd_rqst_in=0 AND cf.a_in = 1 AND spr.cre_srvce_id = 2  AND p.a_in = 1
    GROUP BY cf.caf_id;`;
    
   

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getAddOnVOIPPackagesMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getAddOnVOIPPackagesMdl = (data, user) => {
    var fnm = "getAddOnVOIPPackagesMdl"
    console.log(data)
    let page_size = 20;
    let page_nu = data.lmt_pstn * page_size;
    let chnl_srch_cnd = ' ';
    let limit_cnd = ` `;

    if(data.lmt_pstn == 0){
        limit_cnd = ``;
    } else {
        limit_cnd = `limit ${page_nu}, ${page_size}`;
    }

    if (data && data.srch_txt) {
        //limit_cnd = ' ';
        chnl_srch_cnd = ` AND p.pckge_nm like '%${data.srch_txt.replace(/['"]+/g, '')}%'`
    }

    var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id,
    1 as pkcge_idnty,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, h.prpry_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,vle_tx
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 3 ${chnl_srch_cnd}
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC ${limit_cnd};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getCafCstmrDtlsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getCafCstmrDtlsMdl = (data, user) => {
    var fnm = "getCafCstmrDtlsMdl"


    var QRY_TO_EXEC = `SELECT
    date_format(cf.actvn_dt,'%Y-%m-%d') as actvn_dt, cf.caf_id, cf.caf_nu, cf.mdlwe_sbscr_id,
    cu.frst_nm, cu.lst_nm,cf.iptv_mac_addr_tx,
    cf.mbl_nu, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cf.enty_sts_id,es.enty_sts_id,
    es.sts_nm,cf.caf_type_id, cf.crnt_pln_id, p.pckge_nm,  
	SUM((CASE WHEN adons.chrge_at is NOT NULL THEN adons.chrge_at  ELSE 0 END) + 
    (CASE WHEN adons.gst_at is NOT NULL THEN adons.gst_at  ELSE 0 END)) as ttl_bill_cst
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN pckge_lst_t p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
	LEFT JOIN caf_pckge_prchse_dtl_t adons on adons.caf_id = cf.caf_id AND adons.a_in = 1
    WHERE cf.enty_sts_id = 6 AND cf.lmo_agnt_id = ${data.agntId} 
	AND cf.caf_id = ${data.caf_id} and cf.trmnd_rqst_in=0 AND cf.a_in = 1 AND spr.cre_srvce_id = 2  AND p.a_in = 1
    GROUP BY cf.caf_id;`;
    
   

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getHsiCafCstmrDtlsMdl = (data, user) => {
    var fnm = "getHsiCafCstmrDtlsMdl"


    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,c.actvn_dt,c.caf_id,c.caf_nu,c.mdlwe_sbscr_id,c.aaa_cd,c.hsi_orgnl_prfle_tx,
    p.pckge_nm,cu.cstmr_nm as frst_nm, cu.lst_nm,c.iptv_mac_addr_tx,c.mbl_nu, REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    c.enty_sts_id,es.enty_sts_id,es.sts_nm,c.caf_type_id, c.crnt_pln_id,psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,SUM((CASE WHEN cpp.chrge_at is NOT NULL THEN cpp.chrge_at  ELSE 0 END) + 
    (CASE WHEN cpp.gst_at is NOT NULL THEN cpp.gst_at  ELSE 0 END)) as ttl_bill_cst,
    GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
    psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp
    from caf_dtl_t as c
    join cstmr_dtl_t as cu on  cu.cstmr_id=c.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = c.enty_sts_id
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    where c.enty_sts_id = 6 AND c.lmo_agnt_id = ${data.agntId} and c.caf_id = ${data.caf_id} AND c.a_in = 1 AND psr.cre_srvce_id = 1  AND p.a_in = 1  AND cpp.a_in=1
    GROUP BY c.caf_id;`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getWebCafCstmrDtls
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getWebCafCstmrDtls = (data, user) => {
    var fnm = "getWebCafCstmrDtls"
    if(data.agntId == 0){
        agntid=``
    }
    else if(data.agntId > 0){
        agntid=`AND cf.lmo_agnt_id = ${data.agntId}`
    }

    var QRY_TO_EXEC = `SELECT
    cf.actvn_dt, cf.caf_id, cf.caf_nu, cf.mdlwe_sbscr_id,cf.lmo_agnt_id,
    cu.frst_nm, cu.lst_nm,
    cf.mbl_nu, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cf.enty_sts_id,es.enty_sts_id,
    es.sts_nm,cf.caf_type_id, cf.crnt_pln_id, p.pckge_nm,  
	SUM((CASE WHEN adons.chrge_at is NOT NULL THEN adons.chrge_at  ELSE 0 END) + 
    (CASE WHEN adons.gst_at is NOT NULL THEN adons.gst_at  ELSE 0 END)) as ttl_bill_cst
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN pckge_lst_t p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
	LEFT JOIN caf_pckge_prchse_dtl_t adons on adons.caf_id = cf.caf_id AND adons.a_in = 1
    WHERE cf.enty_sts_id = 6 ${agntid} 
	AND cf.caf_id = ${data.caf_id} AND cf.a_in = 1 AND spr.cre_srvce_id = 2  AND p.a_in = 1
	GROUP BY cf.caf_id;`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/**************************************************************************************
* Controller     : chkcafpckgemdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.chkcafpckgemdl = function (data, user, callback) {
    var fnm = "chkcafpckgemdl"
    var QRY_TO_EXEC = `select crnt_pln_id from caf_dtl_t where caf_id=${data.caf_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}




/*****************************************************************************
* Function      : addCafPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.addCafPckgsMdl = (data, caf_id, user, calbk) => {
	var fnm = 'addCafPckgsMdl'
    console.log('addCafPckgsMdlllllllllllllllllllllllllllllllllllllllllllllllllll 0 \n');
    console.log(data);
    console.log(data.length);
    var count = 0;
	/*if (user.usr_ctgry_ky == 103000730){
		for(var i=0; i<data.length; i++){
		console.log('data[i] \n', data[i]);

		  var QRY_TO_EXEC = ` select * from caf_pckge_prchse_dtl_t where caf_id=${data[i].caf_id} and pckge_id = ${data[i].pckge_id} and srvcpk_id = ${data[i].srvcpk_id} and aprvl_in = 1 and dscnt_in = 0 and a_in=1`;
	  
			console.log("____ addCaf package selecttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
			dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, (err, results)=>{
				if(++count == data.length){
					calbk(err, results);
				}
			});
		}
	} else {
		for(var i=0; i<data.length; i++){
			console.log('data[i] \n', data[i]);

		  
		  var QRY_TO_EXEC = ` select * from caf_pckge_prchse_dtl_t where caf_id=${data[i].caf_id} and pckge_id = ${data[i].pckge_id} and srvcpk_id = ${data[i].srvcpk_id} and aprvl_in = 1`;
	  
			console.log("____ addCaf package selecttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
			dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, (err, results)=>{
				if(++count == data.length){
					calbk(err, results);
				}
			});
		}
	}*/
    for(var i=0; i<data.length; i++){
    console.log('data[i] \n', data[i]);

      var QRY_TO_EXEC = ` select * from caf_pckge_prchse_dtl_t where caf_id=${caf_id} and pckge_id = ${data[i].pckge_id} and srvcpk_id = ${data[i].srvcpk_id} and aprvl_in = 1 and dscnt_in = 0 and a_in=1`;
  
        console.log("____ addCaf package selecttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, (err, results)=>{
            if(++count == data.length){
                calbk(err, results);
            }
        });
    }
}

exports.addCafInsrtPckgsMdl = (data, user) => {
	var fnm = 'addCafInsrtPckgsMdl'
var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,
        sbscrptn_req_in, rjct_in,rjct_ts,rjct_usr_id,aprvl_in,aprvl_ts, aprvl_usr_id, src_id, cmnt_txt,a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
                ${k.caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                current_timestamp(),
                '${k.expry_dt}',
                ${k.chrge_at},
                ${k.gst_at},
                0,0,0,0,1,
                ${k.agent_id},0,0,null,null,1,current_timestamp(),${k.agent_id},2,'Approval From Concern LMO ${k.agent_id}',1, CURRENT_TIMESTAMP())  ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____ addCafInsrtPckgsMdl Insertttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function      : newvodaddCafInsrtPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.newvodaddCafInsrtPckgsMdl = (data, pckgeprice, user) => {
	var fnm = 'newvodaddCafInsrtPckgsMdl'
	console.log("newvodaddCafInsrtPckgsMdl data",data)
var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        cycle_strt_dt,
        cycle_end_dt,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,
        sbscrptn_req_in, rjct_in,rjct_ts,rjct_usr_id,aprvl_in,aprvl_ts, aprvl_usr_id, src_id, cmnt_txt,a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (pckgeprice && pckgeprice.length > 0) {
        var counter = 0;
        pckgeprice.filter((k) => {
            if (pckgeprice.length == ++counter) {
                dlmtr = ' ; '
            }
			//if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			//|| k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
			if(k.vod_pack == 1){
                end_date=`curdate()+INTERVAL 1 day`
            } else {
                end_date=`curdate()+INTERVAL 29 day`
            }
            valQry += `(
                ${data.caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                curdate(),
                ${end_date},
                ${k.chrge_at},
                ${k.gst_at},
                curdate(),
                ${end_date},
                0,0,0,0,1,
                ${data.agntId},0,0,null,null,1,current_timestamp(),${data.agntId},2,'Approval From Concern LMO ${data.agntId}',1, CURRENT_TIMESTAMP())  ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____ addCafInsrtPckgsMdl Insertttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : newaddCafInsrtPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.newaddCafInsrtPckgsMdl = (data, user) => {
	var fnm = 'newaddCafInsrtPckgsMdl'
	console.log("newaddCafInsrtPckgsMdl data",data)
var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        cycle_strt_dt,
        cycle_end_dt,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,
        sbscrptn_req_in, rjct_in,rjct_ts,rjct_usr_id,aprvl_in,aprvl_ts, aprvl_usr_id, src_id, cmnt_txt,a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
			if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			|| k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
                end_date=`curdate()+INTERVAL 1 day`
            } else {
                end_date=`curdate()+INTERVAL 29 day`
            }
            valQry += `(
                ${data.caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                curdate(),
                ${end_date},
                ${k.chrge_at},
                ${k.gst_at},
                curdate(),
                ${end_date},
                0,0,0,0,1,
                ${data.agntId},0,0,null,null,1,current_timestamp(),${data.agntId},2,'Approval From Concern LMO ${data.agntId}',1, CURRENT_TIMESTAMP())  ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____ addCafInsrtPckgsMdl Insertttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : addHsiCafPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.addHsiCafPckgsMdl = (data, user) => {
    var fnm = "addHsiCafPckgsMdl"

    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,	
        a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
                ${data.caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                CURDATE(),
                CURDATE()+INTERVAL 3 MONTH,
                ${k.chrge_at},
                ${k.gst_at},
                0,0,0,0,1,
                ${data.agntId},
                1, CURRENT_TIMESTAMP()) ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : newaddHsiCafPckgsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.newaddHsiCafPckgsMdl = (data, user) => {
    var fnm = "newaddHsiCafPckgsMdl"

    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,
        cycle_strt_dt,
        cycle_end_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,	
        a_in,	
        i_ts) `;

    var dlmtr = ', ';
    var valQry = ' VALUES ';

    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(
                ${data.caf_id}, 
                ${k.pckge_id}, 
                ${k.srvcpk_id},
                CURDATE(),
                CURDATE()+INTERVAL 3 MONTH,
                CURDATE(),
                CURDATE()+INTERVAL 3 MONTH,
                ${k.chrge_at},
                ${k.gst_at},
                0,0,0,0,1,
                ${data.agntId},
                1, CURRENT_TIMESTAMP()) ${dlmtr} `
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : removeAddonsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.removeAddonsMdl = (data, user) => {
    var fnm = "removeAddonsMdl"
    var QRY_TO_EXEC = `UPDATE caf_pckge_prchse_dtl_t set expry_dt = CURRENT_DATE(), a_in = 0, sbscrptn_req_in = 0, dscnt_in = 1, expry_dt = CURDATE(), dscnt_ts = CURRENT_TIMESTAMP(), dscnt_srce_id = 2, updte_usr_id=${data.agntId},
    u_ts = CURRENT_TIMESTAMP() WHERE caf_id=${data.caf_id} and a_in=1 and pckge_id in (`;
    var dlmtr = ', ';
    var valQry = '  ';
    var lsrQry = ') '
    if (data && data.pckg_lst.length > 0) {
        var counter = 0;
        data.pckg_lst.filter((k) => {
            if (data.pckg_lst.length == ++counter) {
                dlmtr = '  '
            }
            valQry += ` ${k.pckge_id}${dlmtr}`;

        })
    }
    console.log(valQry);
    QRY_TO_EXEC = QRY_TO_EXEC + valQry + lsrQry ;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function       : getAddOnPackagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAddOnPackagesMdl = function (data,user) {
    var fnm = "getAddOnPackagesMdl"
    console.log(data)
    let page_size = 20;
    let page_nu = data.lmt_pstn * page_size;
    let chnl_srch_cnd = ' ';
    let limit_cnd = ` `;
    //if(data.lmt_pstn == 1){
       // limit_cnd = ``;
    //} else {
        limit_cnd = `limit ${page_nu}, ${page_size}`;
    //}
    if (data && data.srch_txt) {
        //limit_cnd = ' ';
        chnl_srch_cnd = ` AND chl.chnle_nm like ${sqldb.MySQLConPool.escape("%" + data.srch_txt + "%")} `
    }

    var QRY_TO_EXEC = ` SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id, 
    sum(CASE WHEN chl.chnle_id is NOT NULL THEN 1 ELSE 0 END) as chnls_cnt,
    1 as pkcge_idnty,
    p.pckge_nm, p1.chrge_at, p1.gst_at, 
    FORMAT(p1.chrge_at,2) AS tot_chrge,FORMAT(p1.gst_at,2) AS tot_gst_at,
    ((CASE WHEN FORMAT(p1.chrge_at,2) is NOT NULL THEN p1.chrge_at  ELSE 0 END) +
    (CASE WHEN FORMAT(p1.gst_at,2) is NOT NULL THEN p1.gst_at  ELSE 0 END)) as ttl_cst,p.vod_pack,
    spl.srvcpk_id, 
    spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm, 
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt, 
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,l.lnge_nm
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id 
    JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
    join pckge_chrge_dtl_t as p1 on p1.pckge_srvcpk_rel_id=spr.pckge_srvcpk_rel_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt 
    AND p.a_in = 1 AND spl.a_in = 1  ${chnl_srch_cnd} 
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC ${limit_cnd};`;
    console.log('getAddOnPackagesMdl ----------------- ');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};





/*****************************************************************************
* Function       : getAddOnLocalChnlPackagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAddOnLocalChnlPackagesMdl = function (data,user) {
    var fnm = "getAddOnLocalChnlPackagesMdl"
    console.log(data)
    let page_size = 20;
    let page_nu = data.lmt_pstn * page_size;
    let chnl_srch_cnd = ' ';
    let limit_cnd = `  limit ${page_nu}, ${page_size} `;
    if (data && data.srch_txt) {
        //limit_cnd = ' ';
        chnl_srch_cnd = ` AND chl.chnle_nm like ${sqldb.MySQLConPool.escape("%" + data.srch_txt + "%")} `
    }

    var QRY_TO_EXEC = `  SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id,
    sum(CASE WHEN chl.chnle_id is NOT NULL THEN 1 ELSE 0 END) as chnls_cnt,
    2 as pkcge_idnty,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt
    FROM pckge_agrmt_prtnrs_rel_t pg 
	JOIN pckge_lst_t p on p.pckge_id = pg.pckge_id
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt
    AND p.a_in = 1 AND spl.a_in = 1 AND pg.a_in = 1 and pckge_nm like 'MSO%' AND pg.agnt_id = ${data.agntId} ${chnl_srch_cnd}
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getWebAddOnLocalChnlPackagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getWebAddOnLocalChnlPackagesMdl = function (data) {
    var fnm = "getWebAddOnLocalChnlPackagesMdl"
    console.log(data)
    let chnl_srch_cnd = ' ';
    let agnt_id = ''

    if (data && data.srch_txt) {
        chnl_srch_cnd = ` AND chl.chnle_nm like ${sqldb.MySQLConPool.escape("%" + data.srch_txt + "%")} `
    }
    if (data && data.agntId) {
        agnt_id = `AND pg.agnt_id = ${data.agntId}`
    }

    var QRY_TO_EXEC = `  SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id,
    sum(CASE WHEN chl.chnle_id is NOT NULL THEN 1 ELSE 0 END) as chnls_cnt,
    2 as pkcge_idnty,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt
    FROM pckge_agrmt_prtnrs_rel_t pg 
	JOIN pckge_lst_t p on p.pckge_id = pg.pckge_id
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 2 AND CURRENT_DATE() <= p.expry_dt
    AND p.a_in = 1 AND spl.a_in = 1 AND pg.a_in = 1   ${agnt_id} ${chnl_srch_cnd}
    GROUP BY  p.pckge_id
    ORDER BY p.pckge_id DESC; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
};



/*****************************************************************************
* Function      : getAddOnHSIPackagesMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getAddOnHSIPackagesMdl = (data, user) => {
    var fnm = "getAddOnHSIPackagesMdl"
    console.log(data)
    let page_size = 20;
    let page_nu = data.lmt_pstn * page_size;
    let chnl_srch_cnd = ' ';
    let limit_cnd = ` `;

    if(data.lmt_pstn == 0){
        limit_cnd = ``;
    } else {
        limit_cnd = `limit ${page_nu}, ${page_size}`;
    }

    if (data && data.srch_txt) {
        //limit_cnd = ' ';
        chnl_srch_cnd = ` AND p.pckge_nm like '%${data.srch_txt}%'`
    }

    var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id,
    1 as pkcge_idnty,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, h.prpry_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,vle_tx
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 1 ${chnl_srch_cnd}
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC ${limit_cnd};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}





/*****************************************************************************
* Function       : getAddonsFromCAFMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAddonsFromCAFMdl = function (caf_id,user) {
    var fnm = "getAddonsFromCAFMdl"
    var QRY_TO_EXEC = ` SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, 
    cp.pkge_prche_id,
    p.pckge_id,
    1 as pkcge_idnty, p.pckge_type_id,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt
    FROM caf_pckge_prchse_dtl_t cp
	JOIN pckge_lst_t p on p.pckge_id = cp.pckge_id
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
    WHERE cp.caf_id = ${caf_id} AND spr.cre_srvce_id = 2 AND cp.a_in = 1 
	#AND  p.a_in = 1 
	AND spl.a_in = 1
    ORDER BY p.pckge_type_id; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getChannelsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getChannelsMdl = function (srvc_pck_id,user) {
    var fnm = "getChannelsMdl"
    var QRY_TO_EXEC = ` SELECT chl.chnle_id, chl.chnle_nm, sp.srvcpk_id  FROM pckge_iptv_chnle_lst_t chl
    JOIN  pckge_iptv_chnle_srvcpk_rel_t sp on sp.chnle_id = chl.chnle_id
    WHERE sp.srvcpk_id = ${srvc_pck_id} AND chl.a_in = 1 ORDER BY chl.chnle_nm; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getCAFSelectdPackageMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCAFSelectdPackageMdl = function (caf_id,user) {
    var fnm = "getCAFSelectdPackageMdl"
    var QRY_TO_EXEC = ` SELECT p.pckge_id,p.pck_in_sts,p.pckge_nm,p.efcte_dt,p.expry_dt,s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at
    FROM caf_dtl_t c
	JOIN pckge_lst_t p on p.pckge_id = c.crnt_pln_id
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    where c.caf_id = ${caf_id} and cd.a_in=1
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtPckgeInCafMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtPckgeInCafMdl = function (data,user) {
    var fnm = "updtPckgeInCafMdl"
    var QRY_TO_EXEC = ` UPDATE caf_dtl_t SET crnt_pln_id = ${data.new_pckge_id}, u_ts = CURRENT_TIMESTAMP()
    WHERE caf_id = ${data.caf_id}; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtCafPrchaseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtCafPrchaseMdl = function (data,user) {
    var fnm = "updtCafPrchaseMdl"
    var QRY_TO_EXEC = ` UPDATE caf_pckge_prchse_dtl_t SET expry_dt = CURRENT_DATE(), a_in = 0,
    updte_usr_id = ${data.agntId}, u_ts = CURRENT_TIMESTAMP()  WHERE caf_id = ${data.caf_id} and pckge_id = ${data.old_pckge_id} and a_in=1; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insrtCafPrchaseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtCafPrchaseMdl = function (data,user) {
    var fnm = "insrtCafPrchaseMdl"
    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,	
        a_in,	
        i_ts)VALUES(${data.caf_id}, ${data.new_pckge_id}, 0, '${data.efcte_dt}', '${data.expry_dt}',
        '${data.chrg_at}', '${data.gst_at}',
        0,0,0,0,1,
        ${data.agntId},
        1, CURRENT_TIMESTAMP()) `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : validatePackagePlanMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.validatePackagePlanMdl = function (data,user) {
    var fnm = "validatePackagePlanMdl"
    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,	
        a_in,	
        i_ts)VALUES(${data.caf_id}, ${data.new_pckge_id}, 0, '${data.efcte_dt}', '${data.expry_dt}',
        '${data.chrg_at}', '${data.gst_at}',
        0,0,0,0,1,
        ${data.agntId},
        1, CURRENT_TIMESTAMP()) `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCstmrMnthlyHsiPckgeDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCstmrMnthlyHsiPckgeDtlsMdl = function (caf_id,user) {
    var fnm = "getCstmrMnthlyHsiPckgeDtlsMdl"
    var QRY_TO_EXEC = ` SELECT * FROM
    BSS_BATCH.hsi_mnthly_usge_dtl_t
    WHERE
    caf_id=${caf_id}
    AND
    mnt_ct=MONTH(CURDATE())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : addCafHsiMnthPckgsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addCafHsiMnthPckgsMdl = function (data,user) {
    var fnm = "addCafHsiMnthPckgsMdl"
    var QRY_TO_EXEC = ` UPDATE BSS_BATCH.hsi_mnthly_usge_dtl_t
    SET mnth_usge_lmt_ct=${data.nw_hsi_pckge}
    WHERE caf_id=${data.caf_id} AND mnt_ct=MONTH(CURDATE());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : addHsiToThrldMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.addHsiToThrldMdl = function (data,user) {
    var fnm = "addHsiToThrldMdl"
    var QRY_TO_EXEC = ` INSERT INTO BSS_BATCH.thrttld_cafs_dtl_t(caf_id,caf_type_id,pln_id,aaa_cd,frm_prfle_tx,mnth_ct,yr_ct,bstr_in,dt,i_ts)
    VALUES(${data.caf_id},${data.caf_type_id},${data.crnt_pln_id},'${data.aaa_cd}','${data.aaa_prfl_nm}',MONTH(CURDATE()),YEAR(CURDATE()),1,CURDATE(),CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getAgntAddOnHSIPackagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntAddOnHSIPackagesMdl = function (data,user) {
    var fnm = "getAgntAddOnHSIPackagesMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,a.agnt_id,a.agnt_nm,p.pckge_id,p.pckge_nm, DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt, 
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt, s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at,
    ((CASE WHEN FORMAT(p.chrge_at,2) is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN FORMAT(p.gst_at,2) is NOT NULL THEN p.gst_at  ELSE 0 END)) as ttl_cst,vle_tx
    FROM 
    agnt_lst_t as a
    JOIN pckge_agrmt_prtnrs_rel_t as ar on ar.agnt_id=a.agnt_id
    JOIN pckge_lst_t as p on p.pckge_id= ar.pckge_id
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = ps.srvcpk_id
	JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    where a.agnt_id=${data.agnt_id} and p.oprtn_in=1 and p.caf_type_id=1 AND p.pckge_type_id=2 
	ANd p.efcte_dt <current_date() ANd p.expry_dt >CURRENT_DATE() 
	AND cd.efcte_dt <current_date() ANd cd.expry_dt >CURRENT_DATE() and cd.a_in=1
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : insrtCafStgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
// exports.getCafDtaMdl = (caf_id, user) => {
//     var QRY_TO_EXEC = `select caf_id,caf_type_id, aaa_cd,crnt_pln_id,hsi_orgnl_prfle_tx,
//     LOWER(CONCAT(SUBSTR(REPLACE(onu_mac_addr_tx,":",""),1,4),".",SUBSTR(REPLACE(onu_mac_addr_tx,":",""),5,4),".",SUBSTR(REPLACE(onu_mac_addr_tx,":",""),9,4))) as 'accessId'
//     From caf_dtl_t where caf_id=${caf_id};`

//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// }


exports.getCafDtaMdl = (id, user, callback) => {
    var fnm = "getCafDtaMdl"

    var QRY_TO_EXEC = `SELECT c.caf_id, c.caf_nu,c.mbl_nu,c.actvn_dt,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.iptv_srl_nu,c.iptv_mac_addr_tx,cst.cstmr_nm as frst_nm,cst.lst_nm,cst.cstmr_id,cst.cstmr_nm,c.instl_lcly_tx,cs.sts_nm,cs.sts_clr_cd_tx,c.enty_sts_id,DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') as spnd_ts,
    DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_ts,DATE_FORMAT(c.trmnd_ts,'%d-%m-%Y') as trmnd_ts,fr.frqncy_nm,
    ct.caf_type_nm, md.mdle_nm as onu_mdl_nm,md1.mdle_nm as iptv_mdl_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.adhr_nu as full_adhr_nu,c.mdlwe_sbscr_id,
    c.olt_prt_nm,c.olt_crd_nu,c.olt_prt_splt_tx,group_concat(vps.phne_nu) as phne_nu,count(vps.phne_nu) as phne_nu_cnt,c.caf_type_id,
    '' as pswrd_txt,md.emi_at,pl.pckge_nm,pl.pckge_id,
    c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    v.vlge_nm,m.mndl_nm,d.dstrt_nm, c.instl_ste_id, c.instl_std_cd, cst.loc_eml1_tx as email, cst.loc_std_cd,alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,c.aghra_cd,c.aaa_cd, LOWER(CONCAT(SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),1,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),5,4),".",SUBSTR(REPLACE(c.onu_mac_addr_tx,":",""),9,4))) as 'accessId',
    c.olt_id,c.pop_id,c.olt_ip_addr_tx,c.olt_srl_nu,c.olt_prt_nm,c.olt_prt_splt_tx,
    c.olt_ip_addr_tx ,ol.olt_srl_nu ,ol.olt_nm,ol.pop_id,ol.sbstn_unq_cd,ol.olt_srl_nu,ol.sbstn_nm,
    DATE_FORMAT(ol.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as  oprnl_sts_chnge_ts,DATE_FORMAT(ol.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts
    ,DATE_FORMAT(ol.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,oste.ste_nm,ast.sts_nm as ahgra_sts_nm,
    cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    left JOIN inv_stpbx_lst_t as i on i.caf_id=c.caf_id AND i.prdct_id =1
    left JOIN inv_stpbx_lst_t as i1 on i1.caf_id=c.caf_id AND i1.prdct_id =2
    left JOIN inv_prdct_mdle_lst_t as md on md.mdle_id=i.mdle_id
    left JOIN inv_prdct_mdle_lst_t as md1 on md1.mdle_id=i1.mdle_id
    left JOIN vlge_lst_t v ON v.vlge_nu = cst.loc_vlge_id and v.mndl_id = cst.loc_mndl_id AND v.dstrt_id = cst.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where c.caf_id= ${id} AND c.a_in= 1
    GROUP BY c.caf_id`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getCafPckageMdl = function (id, user) {
    var fnm = "getCafPckageMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,
    p.pckge_nm,
    psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,
    GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
    psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${id}
    GROUP BY p.pckge_id
    ORDER BY t.srvcpk_type_nm desc;`;
    console.log('getCafPckageMdl ______________________')

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : updateBatchCafDtlTable
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateBatchCafDtlTable = function (data,aaaData,user) {
    var fnm = "updateBatchCafDtlTable"
    var QRY_TO_EXEC = ` UPDATE caf_dtl_t set 
                        hsi_thrtd_in=0,
                        hsi_thrtd_ts=CURRENT_TIMESTAMP(),
                        hsi_crnt_prfle_tx="${aaaData.sa}"
                        where caf_id='${data.caf_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updateOnlineCafDtlTable
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateOnlineCafDtlTable = function (data,aaaData,user) {
    var fnm = "updateOnlineCafDtlTable"
    var QRY_TO_EXEC = ` UPDATE caf_dtl_t set 
                        hsi_thrtd_in=0,
                        hsi_thrtd_ts=CURRENT_TIMESTAMP(),
                        hsi_crnt_prfle_tx="${aaaData.sa}"
                        where caf_id='${data.caf_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : cafdatafrpln
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.cafdatafrpln = function (data, rmbalance, newblnce, result, user, callback) {
    var fnm = "cafdatafrpln"

    var QRY_TO_EXEC = `select * from caf_dtl_t where caf_id=${data.caf_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/******************************************************************************
* Function       : checkpckgsfrcstmr
* Description    : 
* Arguments      : callback function
*******************************************************************************/
exports.checkpckgsfrcstmr = function (data,cafadata, user) {
    var fnm = "checkpckgsfrcstmr"
    console.log("data",data.pckg_lst)
    var packs = [] ;
    if(data.pckg_lst.length >1){
        for(i=0;i<data.pckg_lst.length;i++){
            packs.push(data.pckg_lst[i].pckge_id)
        }
    }else {
        packs.push(data.pckg_lst[0].pckge_id)
    }
    if(cafadata.crnt_pln_id == 3000106 ){
        var QRY_TO_EXEC = `SELECT group_concat(p.pckge_nm) as pack_nms FROM prepaid_base_pack_channels as up
        join pckge_lst_t as p on p.pckge_id=up.pckge_id and Home_Premium=1
        WHERE up.pckge_id in (${packs})`;
    } else if(cafadata.crnt_pln_id == 3000107){
        var QRY_TO_EXEC = `SELECT group_concat(p.pckge_nm) as pack_nms FROM prepaid_base_pack_channels as up
        join pckge_lst_t as p on p.pckge_id=up.pckge_id and Home_Essential=1
        WHERE up.pckge_id in (${packs})`;
    } else {
        var QRY_TO_EXEC =`select null as pack_nms`
    }

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : chkpckgsfrcafMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.chkpckgsfrcafMdl = function (data, user, callback) {
    var fnm = "chkpckgsfrcafMdl"
    console.log("Data mdl",data.pckg_lst[0])
    var packs =[];
    if(data.pckg_lst.length >1){
        for(i=0;i<data.pckg_lst.length;i++){
            packs.push(data.pckg_lst[i].pckge_id)
        }
    }else {
        packs.push(data.pckg_lst[0].pckge_id)
    }

    var QRY_TO_EXEC = `select group_concat(distinct(p.pckge_nm)) as pack_nm from caf_pckge_prchse_dtl_t as cp
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id
     where cp.caf_id=${data.caf_id} and cp.pckge_id in (${packs}) and cp.a_in=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : chklmoblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.chklmoblnceFaccountingMdl = function (data, user, callback) {
    var fnm = "chklmoblnceFaccountingMdl"

    var QRY_TO_EXEC = `select count(distinct(c.caf_id)) as caf_count,m.* from caf_dtl_t as c
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=c.lmo_agnt_id where c.enty_sts_id not in (8,45) and m.mrcht_usr_id=${user.mrcht_usr_id}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : updateagntbalMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updateagntbalMdl = function (data, rmbalance, newblnce, result, user, callback) {
    var fnm = "updateagntbalMdl"

    var QRY_TO_EXEC = `update mrcht_usr_lst_t set balance='${newblnce}' where mrcht_usr_id=${user.mrcht_usr_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : insrtblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.insrtblnceFaccountingMdl = function (data, rmbalance, newblnces, result, pckgeprice, reqbody, user, callback) {
    var fnm = "insrtblnceFaccountingMdl";
	console.log("pckgeprice",pckgeprice)
	console.log("pckgeprice",pckgeprice.length)
	console.log(pckgeprice && pckgeprice.length > 0)
	var mnth = 1;
	var days = mnth*30;
	var date = new Date(); // Now
	var milliseconds = date.getTime(); 
	milliseconds = "RCPT_ID_"+milliseconds
	var dates = moment(date).format('YYYY-MM-DD')
	date.setDate(date.getDate() + days -1); // Set now + no of days as the new date
	date = moment(date).format('YYYY-MM-DD')
    var QRY_TO_EXEC = `insert into prepaid_f_accounting (mnths,strt_date,end_date,pack_price,receipt_id,operation,admin_id,cust_id,stb_id,money_type,open_bal,amount,
        close_bal,remarks,ac_date,dateCreated,created_by)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
    var newblnce = result.balance;
    var blnce = result.balance;
    var cut = 0;
    if (pckgeprice && pckgeprice.length > 0) {
        var counter = 0;
        pckgeprice.filter((k) => {
            if (pckgeprice.length == ++counter) {
                dlmtr = ' ; '
            }
			//if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			// || k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
			if(k.vod_pack == 1){
                mnth = 0;
                days = 1;
                date = new Date();
                date.setDate(date.getDate() + 1);  // Set now + 1 no of days as the new date
	            date = moment(date).format('YYYY-MM-DD')
            }
			let pack_price = mnth * (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            newblnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

            cut = (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            valQry += `(${mnth},'${dates}','${date}','${pack_price}','${milliseconds}','add on',
					${user.mrcht_usr_id}, 
					${reqbody.caf_id}, 
					${k.pckge_id},
					'debit',
					'${blnce}',
					'${cut}',
					'${newblnce}',
					'${k.pckge_nm} ( ${days} days amount) (${dates} to ${date})',
					curdate(),
					CURRENT_TIMESTAMP(),${user.usr_ctgry_ky}) ${dlmtr} `;

            blnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/**************************************************************************************
* Controller     : insrtblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/12/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.webinsrtblnceFaccountingMdl = function (data, rmbalance, newblnces, result, pckgeprice, reqbody, user, callback) {
    var fnm = "webinsrtblnceFaccountingMdl";
	console.log("pckgeprice",pckgeprice)
	console.log("pckgeprice",pckgeprice.length)
	console.log(pckgeprice && pckgeprice.pckg_lst.length > 0)
	var mnth = 1;
	var days = mnth*30;
	var date = new Date(); // Now
	var milliseconds = date.getTime(); 
	milliseconds = "RCPT_ID_"+milliseconds
	var dates = moment(date).format('YYYY-MM-DD')
	date.setDate(date.getDate() + days -1); // Set now + no of days as the new date
	date = moment(date).format('YYYY-MM-DD')
    var QRY_TO_EXEC = `insert into prepaid_f_accounting (mnths,strt_date,end_date,pack_price,receipt_id,operation,admin_id,cust_id,stb_id,money_type,open_bal,amount,
        close_bal,remarks,ac_date,dateCreated,created_by)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
    var newblnce = result.balance;
    var blnce = result.balance;
    var cut = 0;
    if (pckgeprice.pckg_lst && pckgeprice.pckg_lst.length > 0) {
        var counter = 0;
        pckgeprice.pckg_lst.filter((k) => {
            if (pckgeprice.pckg_lst.length == ++counter) {
                dlmtr = ' ; '
            }
			//if(k.pckge_id == 12000000 || k.pckge_id == 13000000 || k.pckge_id == 13000001 || k.pckge_id == 13000002 || k.pckge_id == 13000003 || k.pckge_id == 13000004 
			// || k.pckge_id == 14000000 || k.pckge_id == 14000001 || k.pckge_id == 14000002 || k.pckge_id == 14000003 || k.pckge_id == 14000004  || k.pckge_id == 14000005 || k.pckge_id == 15000000 ){
			if(k.vod_pack == 1){
                mnth = 0;
                days = 1;
                date = new Date();
                date.setDate(date.getDate() + 1);  // Set now + 1 no of days as the new date
	            date = moment(date).format('YYYY-MM-DD')
            }
			let pack_price = mnth * (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            newblnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

            cut = (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));
            valQry += `(${mnth},'${dates}','${date}','${pack_price}','${milliseconds}','add on',
					${user.mrcht_usr_id}, 
					${reqbody.caf_id}, 
					${k.pckge_id},
					'debit',
					'${blnce}',
					'${cut}',
					'${newblnce}',
					'${k.pckge_nm} ( ${days} days amount) (${dates} to ${date})',
					curdate(),
					CURRENT_TIMESTAMP(),${user.usr_ctgry_ky}) ${dlmtr} `;

            blnce = blnce - (parseFloat(k.ttl_cst)-(parseFloat(k.ttl_cst)*parseFloat(k.lmo_share)/100).toFixed(2)-(parseFloat(k.ttl_cst)*parseFloat(k.mso_share)/100).toFixed(2));

        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/**************************************************************************************
* Controller     : hsiinsrtblnceFaccountingMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.hsiinsrtblnceFaccountingMdl = function (data, rmbalance, newblnces, result, reqbody, user, callback) {
    var fnm = "hsiinsrtblnceFaccountingMdl"
	var mnth = 3;
	var days = mnth*30;
	var date = new Date(); // Now
	var milliseconds = date.getTime(); 
	milliseconds = "RCPT_ID_"+milliseconds
	var dates = moment(date).format('YYYY-MM-DD')
	date.setDate(date.getDate() + days); // Set now + no of days as the new date
	date = moment(date).format('YYYY-MM-DD')
    var QRY_TO_EXEC = `insert into prepaid_f_accounting (mnths,strt_date,end_date,pack_price,receipt_id,operation,admin_id,cust_id,stb_id,money_type,open_bal,amount,
        close_bal,remarks,ac_date,dateCreated,created_by)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
    var newblnce = result.balance;
    var blnce = result.balance;
    var cut = 0;
    if (data && data.length > 0) {
        var counter = 0;
        data.filter((k) => {
            if (data.length == ++counter) {
                dlmtr = ' ; '
            }
			let pack_price = mnth * k.ttl_cst;
            newblnce = blnce - k.ttl_cst;

            cut = k.ttl_cst;
            valQry += `(1,'${dates}','${date}','${pack_price}','${milliseconds}','add on',
					${user.mrcht_usr_id}, 
					${reqbody.caf_id}, 
					${k.pckge_id},
					'debit',
					'${blnce}',
					'${cut}',
					'${newblnce}',
					'${k.pckge_nm} ( ${days} days amount) (${dates} to ${date})',
					curdate(),
					CURRENT_TIMESTAMP(),${user.usr_ctgry_ky}) ${dlmtr} `;

            blnce = blnce - k.ttl_cst;

        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function       : checkpckforremovesbscr
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.checkpckforremovesbscr = function (data,user) {
    var fnm = "checkpckforremovesbscr";
    var pckge_id = [];
    data.pckg_lst.filter((k)=>{
        pckge_id.push(k.pckge_id)
    })

    pckge_id=JSON.stringify(pckge_id)
    pckge_id = pckge_id.slice(1, -1);

    var QRY_TO_EXEC = `select group_concat(distinct(p.pckge_nm)) as pckge_nm from caf_pckge_prchse_dtl_t as cp
    join pckge_lst_t as p on p.pckge_id=cp.pckge_id
     where prpd_in=2 and caf_id=${data.caf_id} and cp.pckge_id in (${pckge_id}) and cp.a_in=1 order by pkge_prche_id desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : pckgedatapriceMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.pckgedatapriceMdl = function (pckge_id, user, callback) {
    var fnm = `pckgedatapriceMdl`
    var QRY_TO_EXEC = `select *,chrge_at+gst_at as ttl_cst from pckge_lst_t where pckge_id in (${pckge_id})`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello", user, fnm);
}