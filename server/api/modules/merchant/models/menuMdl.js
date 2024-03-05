var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/*****************************************************************************
* Function      : merch_get_locM
* Description   : get merchant locations
******************************************************************************/
exports.get_mnuitms_Mdl = (user) => {
    var fnm = "get_mnuitms_Mdl"
    console.log(user)
    // var QRY_TO_EXEC = `select dsble_in,a.app_nm,mi.app_id,mi.mnu_itm_id,mi.mnu_itm_nm,mi.mnu_itm_icn_tx, mi.mnu_itm_url_tx,mpi.prnt_mnu_itm_id, pmi.mnu_itm_nm as prnt_mnu_itm_nm,pmi.mnu_itm_icn_tx as prnt_mnu_icn_tx,mpi.c_in, mpi.r_in, mpi.u_in, mpi.d_in, mi.hdr_in, mpi.sqnce_id, ak.kywrd_tx from mnu_prfle_lst_t mp
    //     join mnu_prfle_itm_rel_t mpi on mp.mnu_prfle_id=mpi.mnu_prfle_id and mpi.a_in =1
    //     join mnu_itm_lst_t mi on mpi.mnu_itm_id=mi.mnu_itm_id
    //     join mrcht_mnu_prfle_rel_t um on um.mnu_prfle_id = mp.mnu_prfle_id
    //     left join mnu_itm_lst_t pmi on mpi.prnt_mnu_itm_id=pmi.mnu_itm_id
    //     left join mnu_itm_kywrd_lst_t ak on ak.mnu_itm_kywrd_id=mpi.mnu_itm_kywrd_id
    //     left join app_lst_t a on a.app_id=mi.app_id and um.app_id=mp.app_id
    //     where um.mrcht_usr_id=${user.mrcht_usr_id} and mi.a_in =1 and mi.cmpnt_id=${user.cmpnt_id} order by mpi.sqnce_id`;

    var QRY_TO_EXEC = `SELECT  a.app_nm,a.app_id,a.mnu_itm_id,a.mnu_itm_nm,a.mnu_itm_icn_tx,a.mnu_itm_url_tx,a.prnt_mnu_itm_id,a.prnt_mnu_itm_nm,a.prnt_mnu_icn_tx,m.stp_in,a.c_in,a.r_in,a.d_in,a.u_in,a.kywrd_tx,m.sqnce_id,
                        (CASE WHEN m.enble_in is NULL THEN 0 ELSE  m.enble_in END) as enble_in,
                        (CASE WHEN m.dsble_in is NULL THEN 1 ELSE  m.dsble_in END) as dsble_in,
                        m.usr_id 
                        FROM (SELECT  ap.app_nm,m.app_id,m.mnu_itm_id,m.mnu_itm_icn_tx,m.mnu_itm_url_tx, m.mnu_itm_nm, p.mrcht_usr_id, f.prnt_mnu_itm_id, 
                                mi.mnu_itm_nm as prnt_mnu_itm_nm, mi.mnu_itm_icn_tx as prnt_mnu_icn_tx,m.hdr_in
                                FROM mrcht_mnu_prfle_rel_t p
                                        JOIN mnu_prfle_lst_t pr on pr.mnu_prfle_id = p.mnu_prfle_id
                                        JOIN mnu_prfle_itm_rel_t f on f.mnu_prfle_id = pr.mnu_prfle_id
                                        JOIN mnu_itm_lst_t m on m.mnu_itm_id = f.mnu_itm_id 
                                        left join mnu_itm_lst_t mi on f.prnt_mnu_itm_id = mi.mnu_itm_id    
                                        left join app_lst_t ap on ap.app_id=m.app_id and p.app_id=pr.app_id
                                WHERE p.mrcht_usr_id = ${user.mrcht_usr_id} and m.cmpnt_id = ${user.cmpnt_id}
                            ) a 
                    LEFT  JOIN mrcht_mnu_itm_rel_t m on m.usr_id = a.mrcht_usr_id AND m.mnu_itm_id = a.mnu_itm_id AND m.enble_in = 1 
                    order by a.mnu_itm_id`

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : actve_mnuitm_Mdl
* Description   : get merchant locations
******************************************************************************/
exports.actve_mnuitm_Mdl = (user, data) => {
    var fnm = "actve_mnuitm_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set enble_in = 1, dsble_in = 0, u_ts = current_timestamp() where mnu_itm_id = ${data.mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


exports.check_mnu = (user, data, callback) => {
    var fnm = "check_mnu"
    console.log(data)
    var QRY_TO_EXEC = `select * from mrcht_mnu_itm_rel_t where mnu_itm_id = ${data.mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;
    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        if (err) {
            callback(err, [])
        }
        else if (results.length == 0) {
            var QRY_TO_EXEC1 = `select * from mrcht_mnu_itm_rel_t where usr_id = ${user.mrcht_usr_id}`;
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm, (err, results1) => {
                if (err) {
                    callback(err, [])
                }
                else {
                    callback(err, results, results1)
                }
            })
        }
        else if (results.length > 0) {
            callback(err, results)
        }

    });
}

exports.insert_mnuitm_Mdl = (user, data) => {
    var fnm = "insert_mnuitm_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_mnu_itm_rel_t (usr_id,mnu_itm_id,crte_usr_id,enble_in,dsble_in,sqnce_id,a_in,i_ts) values(${user.mrcht_usr_id},${data.mnu_itm_id},${user.mrcht_usr_id},1,0,${data.sqnce_id},1,current_timestamp())`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.inactve_mnuitm_Mdl = (user, id) => {
    var fnm = "inactve_mnuitm_Mdl"
    var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set enble_in = 0, dsble_in = 1, u_ts = current_timestamp() where mnu_itm_id = ${id} and usr_id = ${user.mrcht_usr_id}`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
exports.updt_sqnce_mnu_mdl = (user, data, callback) => {
    var fnm = "updt_sqnce_mnu_mdl"
console.log("sravani")
console.log(data)
var count = 0;
for (var i = 0; i < data.length; i++) {
    if(!data[i].prnt_mnu_itm_id){
        var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set sqnce_id = ${data[i].sqnce_id}, u_ts = current_timestamp() where mnu_itm_id = ${data[i].mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;
    }
    else if(data[i].prnt_mnu_itm_id){
        for(var j=0; j < data[i].children.length; j++){
            console.log(data[i].children[j].mnu_itm_id)
            var QRY_TO_EXEC1 = `update mrcht_mnu_itm_rel_t set sqnce_id = ${data[i].sqnce_id}, u_ts = current_timestamp() where mnu_itm_id = ${data[i].children[j].mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;  
            console.log(QRY_TO_EXEC1)

            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm)
        }
    }
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        count++;
        console.log(count, data.length)
        if (count == data.length) {
            console.log("in last")
            callback(err, results)
        }

    });
}

}
/******************************************************************************/
exports.get_profilesMdl = () => {
    var fnm = "get_profilesMdl"
    var QRY_TO_EXEC = `select m.mnu_prfle_id,mp.mnu_itm_id,mp.mnu_itm_nm,m.mnu_prfle_nm from mnu_prfle_lst_t m
    join mnu_prfle_itm_rel_t as mn on mn.mnu_prfle_id = m.mnu_prfle_id
    join mnu_itm_lst_t as mp on mp.mnu_itm_id = mn.mnu_itm_id
    order by m.mnu_prfle_id,mp.mnu_itm_id;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm); 
}

/*****************************************************************************
* Function      : insrt_mrcht_usr_mnus
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrcht_usr_mnus = (id,data,callback) => {
    var fnm = "insrt_mrcht_usr_mnus"
    console.log(data)
    var QRY_TO_EXEC = `select mnu_itm_id from mnu_prfle_itm_rel_t where mnu_prfle_id = ${data.rle_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var count = 1;
            var count1 = 0
            console.log(results)
            for(var i=0; i<results.length; i++){
                var QRY_TO_EXEC1 = `insert into mrcht_mnu_itm_rel_t (usr_id,mnu_itm_id,crte_usr_id,enble_in,dsble_in,sqnce_id,a_in,i_ts) values(${id},${results[i].mnu_itm_id},${data.mrcht_id},1,0,${count++},1,current_timestamp())`;

                console.log(QRY_TO_EXEC1)
                 dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls,'',fnm,(err,results)=>{
                    count1++
                    console.log(count1,i)
                    if(count1==i){
                        console.log("in last mnu")
                        callback(err,results)
                    }
                })
            }

        }
    });
}

