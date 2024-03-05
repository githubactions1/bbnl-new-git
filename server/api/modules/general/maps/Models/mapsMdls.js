var mapsdb = require(appRoot + '/config/maps.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');



/*****************************************************************************
* Function       : get_groupsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_groupsMdl = function (user) {
    var fnm = "get_groupsMdl"
    var QRY_TO_EXEC = `select * from map_asrt_grp_lst_t order by asrt_grp_id`;
    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_categoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_categoryMdl = function (user) {
    var fnm = "get_categoryMdl"
    var QRY_TO_EXEC = `select * from map_asrt_cgry_lst_t order by asrt_ctgry_id`;
    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_statusMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_statusMdl = function (user) {
    var fnm = "get_statusMdl"
    var QRY_TO_EXEC = `select * from map_asrt_sts_lst_t order by asrt_sts_id`;
    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_typeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_typeMdl = function (user) {
    var fnm = "get_typeMdl"
    var QRY_TO_EXEC = `select * from map_asrt_type_lst_t order by asrt_type_id`;
    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_oltMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltMdl = function (user) {
    var fnm = "get_oltMdl"
    var QRY_TO_EXEC = [`select asrt_id,asrt_nm,asrt_srl_nu,lat,lng,a.asrt_ctgry_id,a.asrt_grp_id,a.asrt_sts_id,asrt_ctgry_nm,asrt_sts_nm,icon from 
    map_asrt_lst_t as a
    LEFT JOIN map_asrt_cgry_lst_t as c on c.asrt_ctgry_id=a.asrt_ctgry_id
    LEFT JOIN map_asrt_sts_lst_t as s on s.asrt_sts_id=a.asrt_sts_id
    where lat is not null and lng is not null
    ORDER BY asrt_id limit 1000`, `select count(asrt_id) as ct from map_asrt_lst_t where asrt_sts_id=1`, `select count(asrt_id) as ct from map_asrt_lst_t where asrt_sts_id=2`, `select count(asrt_id) as ct from map_asrt_lst_t where asrt_sts_id=3`, `select count(asrt_id) as ct from map_asrt_lst_t where asrt_sts_id=4`];

    return dbutil.execTrnsctnQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_olt_grpCtgMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olt_grpCtgMdl = function (grp, ctgry, dstrct, typ,mndl, user) {
    var fnm = "get_olt_grpCtgMdl"
    var group = ``;
    var category = ``;
    var type = ``;
    var district = ``;
    var mandal = ``;



    if (grp > 0) {
        group = `and a.asrt_grp_id=${grp}`
    }
    if (ctgry > 0) {
        category = `and a.asrt_ctgry_id=${ctgry}`
    }

    if (dstrct > 0) {
        district = `and o.dstrt_id=${dstrct}`
    }
    if (typ > 0) {
        type = `and a.asrt_type_id=${typ}`
    }
    if (mndl > 0) {
        mandal = `and o.mndl_id=${mndl}`
    }


    var QRY_TO_EXEC = `select asrt_id,asrt_nm,asrt_srl_nu,a.lat,a.lng,a.asrt_ctgry_id,a.asrt_grp_id,a.asrt_sts_id,asrt_ctgry_nm,asrt_sts_nm,icon from 
    map_asrt_lst_t as a
    LEFT JOIN map_asrt_cgry_lst_t as c on c.asrt_ctgry_id=a.asrt_ctgry_id
    LEFT JOIN map_asrt_sts_lst_t as s on s.asrt_sts_id=a.asrt_sts_id
    LEFT JOIN olt_ltrck_dtl_t as o on o.olt_id=a.asrt_id
    where a.lat is not null and a.lng is not null ${group} ${category} ${district} ${type} ${mandal}
    ORDER BY asrt_id limit 500`;

    console.log("OLTTTTTTTTTTTTTTTTTTTTTTTTTTMAPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : get_olt_stsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olt_stsMdl = function (stsid, user) {
    var fnm = "get_olt_stsMdl"

    var QRY_TO_EXEC = `select asrt_id,asrt_nm,asrt_srl_nu,lat,lng,a.asrt_ctgry_id,a.asrt_grp_id,a.asrt_sts_id,asrt_ctgry_nm,asrt_sts_nm,icon from 
    map_asrt_lst_t as a
    LEFT JOIN map_asrt_cgry_lst_t as c on c.asrt_ctgry_id=a.asrt_ctgry_id
    LEFT JOIN map_asrt_sts_lst_t as s on s.asrt_sts_id=a.asrt_sts_id
    where a.asrt_sts_id=${stsid}
    ORDER BY asrt_id`;


    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : get_olt_latlngMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olt_latlngMdl = function (lat, lng, user) {
    var fnm = "get_olt_latlngMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY m.asrt_id) as s_no,m.asrt_id,m.asrt_nm,m.asrt_srl_nu,m.asrt_type_id,m.asrt_ctgry_id,m.asrt_grp_id,m.asrt_sts_id,o.sbstn_nm,o.dstrt_id,o.mndl_id,d.dstrt_nm,c.asrt_ctgry_nm,s.asrt_sts_nm,g.asrt_grp_nm,
    t.asrt_type_nm,m.lat,m.lng
    from map_asrt_lst_t as m 
    LEFT JOIN olt_ltrck_dtl_t as o on o.olt_id=m.asrt_id
    LEFT JOIN dstrt_lst_t as d on d.dstrt_id=o.dstrt_id
    LEFT JOIN map_asrt_cgry_lst_t as c on c.asrt_ctgry_id=m.asrt_ctgry_id
    LEFT JOIN map_asrt_sts_lst_t as s on s.asrt_sts_id=m.asrt_sts_id
    LEFT JOIN map_asrt_grp_lst_t as g on g.asrt_grp_id=m.asrt_ctgry_id
    LEFT JOIN map_asrt_type_lst_t as t on t.asrt_type_id=m.asrt_type_id
    where m.lat=${lat} and m.lng=${lng}
    ORDER BY m.asrt_id`;
    return dbutil.execQuery(mapsdb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
