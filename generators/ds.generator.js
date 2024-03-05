//Imports
var fs = require('fs');
const prog = require('caporal');
let ejs = require('ejs');
var fs = require('fs');
moment = require('moment');
path = require('path');
var prompt = require('prompt-sync')();
appRoot = __dirname;
var dblib = require('./lib/db.utils');
var genlib = require('./lib/gen.utils');
var apilib = require('./lib/api.utils');
var clientlib = require('./lib/client.utils');
module_nm = process.argv.slice(2)
client_output_dir = appRoot + "/client/output/"
api_output_dir = appRoot + "/api/output/"

//Module Name from Command line
module_nm = process.argv.slice(2)
apilib.generate_Folders(module_nm)
rtrDta = {
    "module_nm": module_nm
    , "dt": moment().format("DD/MM/YYYY")
    , tables: []
}

//Process Custom Data
var process_custom_field_data = function (ctrlDta, tble_nm) {
    //Prompt User for Custom Data
    for (let i = 0; i < ctrlDta.bfld_dtls.length; i++) {
        ctrlDta.bfld_dtls[i]["CUSTOM_DATA"] = { route: null, input_key: null, key: null, label_key: null, label: null, table: null };
        ctrlDta.bfld_dtls[i]["IS_CUSTOM"] = false;
    }
    genlib.writeJsonFile(appRoot + "/input/" + "fields.json", JSON.stringify(ctrlDta.bfld_dtls, 0, 4))
    prompt("Do you wnat to edit the component fields(fields.json)" + "? Hit 'Enter' to skip/continue");
    let fieldsData = fs.readFileSync(appRoot + "/input/" + "fields.json");
    ctrlDta.bfld_dtls = JSON.parse(fieldsData);
    let mnPk = genlib.getPrimaryKey(ctrlDta.bfld_dtls);
    let mnTbl = tble_nm;
    
    let isJoin = false;
    let reqField =''
    let joins= ''
    
    for(let i = 0;i < ctrlDta.bfld_dtls.length;i++){
         if(ctrlDta.bfld_dtls[i].IS_CUSTOM && ctrlDta.bfld_dtls[i].CUSTOM_DATA.table != null) {
            //ctrlDta.bfld_dtls[i].COLUMN_NAME =  ctrlDta.bfld_dtls[i].CUSTOM_DATA.label_key;
            isJoin = true
            let tbl = ctrlDta.bfld_dtls[i].CUSTOM_DATA.table;
            let key = ctrlDta.bfld_dtls[i].COLUMN_NAME;
            let fld = ctrlDta.bfld_dtls[i].CUSTOM_DATA.label_key;
            reqField = reqField + `, ${tbl}.${fld}`
            joins += ` JOIN ${tbl} On ${tbl}.${key} = ${mnTbl}.${key}`
         }
    }
    if(isJoin){
        let qry =`SELECT  ROW_NUMBER() OVER ( ORDER BY ${mnTbl}.${ctrlDta.pk}) sno${reqField},${mnTbl}.* FROM ${mnTbl} ${joins}`;
        qry = qry+` where ${mnTbl}.a_in = 1 ORDER BY ${mnTbl}.${ctrlDta.pk} ASC;`;
        console.log(qry)
        ctrlDta["sel_qry"] = qry
        create_processed_api_files(ctrlDta, tble_nm)
    }else{
        create_processed_api_files(ctrlDta, tble_nm)
    }
    
    // processFieldsData(ctrlDta.bfld_dtls).then((data) => {
    //     console.log(data)
    //     let mnTbl = tble_nm;
    //     let mnPk = genlib.getPrimaryKey(ctrlDta.bfld_dtls);
    //     let bsnsFlds = [];
    //     let newFields = [];
    //     let qry = `SELECT  ROW_NUMBER() OVER ( ORDER BY ${mnTbl}.${mnPk}) sno,* FROM ${mnTbl}`;
    //     if (data && data.length > 0) {
    //         for (let i = 0; i < data.length; i++) {
    //             let jnPk = genlib.getPrimaryKey(data[i].results);
    //             let jntbl = data[i].tblnm
    //             Array.prototype.push.apply(bsnsFlds, genlib.onlyNameFlds(JSON.parse(JSON.stringify(data[i].results)), jnPk));
    //             qry += ` JOIN ${jntbl} On ${jntbl}.${jnPk} = ${mnTbl}.${jnPk}`
    //         }

    //         for (let i = 0; i < bsnsFlds.length; i++) {
    //             let isRepeated = false;
    //             for (let j = 0; j < ctrlDta.bfld_dtls.length; j++) {
    //                 if (bsnsFlds[i].COLUMN_NAME == ctrlDta.bfld_dtls[j].COLUMN_NAME) {
    //                     isRepeated = true
    //                 }
    //             }
    //             if (!isRepeated) {
    //                 bsnsFlds[i]["CUSTOM_DATA"] = { route: null, input_key: null, key: '', label_key: '', label: '', table: null };
    //                 bsnsFlds[i]["IS_CUSTOM"] = false;
    //                 newFields.push(bsnsFlds[i])
    //             }
    //         }
    //         Array.prototype.push.apply(ctrlDta.bfld_dtls, newFields);
    //         ctrlDta["sel_qry"] = qry + ";"
    //         //  genlib.writeJsonFile(appRoot + "/input/" + "fields.json", JSON.stringify(ctrlDta, 0, 4))
    //         create_processed_api_files(ctrlDta, tble_nm)
    //     } else {
    //         create_processed_api_files(ctrlDta, tble_nm)
    //     }

    // })
}




// Api Files Genaertion
var create_processed_api_files = function (ctrlDta, tble_nm) {

    ejs.renderFile('./api/templates/controller.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Contollers   " + appRoot + "/api/output/" + module_nm + "/controllers/" + genlib.getFileNamePfx(tble_nm) + "Ctrl.js")
            genlib.writeFile(appRoot + "/api/output/" + module_nm + "/controllers/" + genlib.getFileNamePfx(tble_nm) + "Ctrl.js", str)
        }

        //console.log(str)
    });
    ejs.renderFile('./api/templates/model.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Models       " + genlib.getFileNamePfx(tble_nm) + "Mdl.js")
            genlib.writeFile(appRoot + "/api/output/" + module_nm + "/models/" + genlib.getFileNamePfx(tble_nm) + "Mdl.js", str)
        }
    });
    ejs.renderFile('./api/templates/schema.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Schema       " + genlib.getFileNamePfx(tble_nm) + "Sch.js")
            genlib.writeFile(appRoot + "/api/output/" + module_nm + "/schema/" + genlib.getFileNamePfx(tble_nm) + "Sch.js", str)
        }
    });
    create_processed_client_files(ctrlDta, tble_nm);

}





// Client Files Genaertion
var create_processed_client_files = function (ctrlDta, tble_nm) {

    ejs.renderFile('./client/templates/html.component.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating component html   " + ctrlDta.clntFleNmPrx + ".component.html")
            genlib.writeFile(ctrlDta.cmpDir + "/" + ctrlDta.clntFleNmPrx + ".component.html", str)
        }

        //console.log(str)
    });


    ejs.renderFile('./client/templates/ts.component.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating component ts       " + ctrlDta.clntFleNmPrx + ".component.ts")
            genlib.writeFile(ctrlDta.cmpDir + "/" + ctrlDta.clntFleNmPrx + ".component.ts", str)
        }
    });
    ejs.renderFile('./client/templates/ts.service.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating service       " + ctrlDta.clntFleNmPrx + ".service.ts")
            genlib.writeFile(ctrlDta.cmpDir + "/" + ctrlDta.clntFleNmPrx + ".service.ts", str)
        }
    });
    ejs.renderFile('./client/templates/scss.component.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating css       " + ctrlDta.clntFleNmPrx + ".component.scss")
            genlib.writeFile(ctrlDta.cmpDir + "/" + ctrlDta.clntFleNmPrx + ".component.scss", str)
        }
    });

    ejs.renderFile('./client/templates/ts.model.ejs', ctrlDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Model       " + ctrlDta.clntFleNmPrx + ".model.ts")
            genlib.writeFile(ctrlDta.cmpDir + "/" + ctrlDta.clntFleNmPrx + ".model.ts", str)
        }
    });
    //process.exit(22);
}



var create_module_processed_files = function (rtrDta, tble_nm) {

    ejs.renderFile('./api/templates/router.ejs', rtrDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating router file")
            genlib.writeFile(appRoot + "/api/output/" + module_nm + "Rtr.js", str)
        }
    });
    ejs.renderFile('./api/templates/swagger.ejs', rtrDta, {}, function (err, str) {
        if (err) {
            console.log(err)
        } else {
            console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Swagger file")
            genlib.writeFile(appRoot + "/api/output/swagger_" + module_nm + ".js", str)
        }
    });
    // process.exit(22);
}

var array_lines = fs.readFileSync('./input/' + module_nm + '.txt').toString().split("\n");


for (i = 0; i < array_lines.length; i++) {
    (function (tble_nm, url, obj_nm, clnt_url, fileNmPrx, clntFleNmPrx, cmpDir) {
        table_array = array_lines[i].split("|") //Table Array
        tble_nm = table_array[0];               //Table Name
        url = table_array[1];                   //Server Url
        obj_nm = table_array[2];                //Name
        clnt_url = table_array[3];              //Client Url
        clntFleNmPrx = table_array[4];          //File Name
        db_dtls = {}
        db_fields_list_qry = 0
        dblib.conn_execSQL("SELECT `TABLE_NAME` as tble_nm,GROUP_CONCAT(`COLUMN_NAME`) as col_list,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_NAME` ELSE NULL END) as  pk,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_COMMENT` ELSE NULL END) as  pknm,GROUP_CONCAT(CASE WHEN EXTRA='auto_increment' THEN `COLUMN_NAME` ELSE NULL END) as  ak,GROUP_CONCAT(CASE WHEN IS_NULLABLE='NO' THEN `COLUMN_NAME` ELSE NULL END) as  notnull FROM `INFORMATION_SCHEMA`.`COLUMNS`  WHERE `TABLE_SCHEMA`=database() AND `TABLE_NAME`='" + tble_nm + "' AND COLUMN_NAME NOT IN('crte_usr_id','updte_usr_id','i_ts','u_ts','d_ts')", function (err, results) {
            if (err) { console.log(err) }
            //console.log("Processing for Table :: "+tble_nm)
            //console.log("Processing for url :: "+url)
            fileNmPrx = genlib.getFileNamePfx(tble_nm)
            cmpDir = client_output_dir + module_nm + "/" + genlib.getCompName(clntFleNmPrx)
            clientlib.create_compdir(cmpDir)
            //console.log("removeKeyFields(results[0].col_list,results[0].pk)"+genlib.removeKeyFields(results[0].col_list,results[0].pk))
            ctrlDta = {
                "module_nm": module_nm
                , "dt": moment().format("DD/MM/YYYY")
                , "fileNmPrx": fileNmPrx
                , "tble_nm": tble_nm
                , "url": url
                , "obj_nm": obj_nm
                , "flds": results[0].col_list
                , "pk": results[0].pk
                , "pknm": results[0].pknm
                , "npk": genlib.removeKeyFields(results[0].col_list, results[0].pk)
                , "nnull": results[0].notnull
                , "clntFleNmPrx": clntFleNmPrx
                , "compName": genlib.getCompName(clntFleNmPrx)
                , "cmpDir": cmpDir
            }
            rtrDta.tables.push({
                "module_nm": module_nm
                , "dt": moment().format("DD/MM/YYYY")
                , "fileNmPrx": fileNmPrx
                , "tble_nm": tble_nm
                , "url": url
                , "obj_nm": obj_nm
                , "flds": results[0].col_list
                , "pk": results[0].pk
                , "pknm": results[0].pknm
                , "npk": genlib.removeKeyFields(results[0].col_list, results[0].pk)
                , "nnull": results[0].notnull
                , fld_dtls: []
                , bfld_dtls: []
                , insFields: ""
                , "clntFleNmPrx": clntFleNmPrx
                , "compName": genlib.getCompName(clntFleNmPrx)
                , "cmpDir": cmpDir
            })

            // create_client_files(ctrlDta,tble_nm);  
            if (array_lines.length - 1 == (db_fields_list_qry)) {
                // create_module_processed_files(rtrDta,tble_nm); 

                get_field_level_info(tble_nm)
            }
            else {
                db_fields_list_qry++
            }

        })
    })(i);

};

var get_field_level_info = function (tble_nm) {
    db_fields_list_qry2 = 0
    for (i = 0; i < rtrDta.tables.length; i++) {
        (function (i) {
            dblib.conn_execSQL(`select COLUMN_NAME,COLUMN_KEY,COLUMN_COMMENT,COLUMN_TYPE,CASE(IS_NULLABLE) WHEN 'YES' THEN 'true' ELSE 'false' END as IS_REQUIRED
               ,COLUMN_DEFAULT ,CHARACTER_MAXIMUM_LENGTH,CASE (DATA_TYPE) WHEN 'bigint' THEN 'number'  WHEN 'INT' THEN 'integer' WHEN 'decimal' THEN 'number' WHEN 'tinyint' then 'boolean' ELSE 'string' END as SWAGGER_DATA_TYPE
               ,CASE  WHEN COLUMN_KEY='PRI' THEN 'pk'
                    WHEN CHARACTER_MAXIMUM_LENGTH>150 THEN 'textarea'
                    WHEN CHARACTER_MAXIMUM_LENGTH>0 THEN 'text'
                    WHEN (COLUMN_NAME='a_in' OR COLUMN_NAME='i_ts' OR COLUMN_NAME='u_ts' OR COLUMN_NAME='d_ts'OR COLUMN_NAME='crte_usr_id' OR COLUMN_NAME='updte_usr_id') THEN 'infra'
                    WHEN COLUMN_NAME LIKE '%_in' THEN 'radio'
                    WHEN COLUMN_NAME LIKE '%_id' THEN 'dropdown'
                    ELSE 'text' END as COL_FLD_TYPE
               FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=database()  AND TABLE_NAME='${rtrDta.tables[i].tble_nm}'`, function (err, results) {
                if (err) { console.log(err) }
                rtrDta.tables[i].fld_dtls = JSON.parse(JSON.stringify(results));
                rtrDta.tables[i].bfld_dtls = genlib.onlyBsnsFlds(JSON.parse(JSON.stringify(results)), rtrDta.tables[i].pk)
                rtrDta.tables[i].insFields = genlib.onlyBsnsFldsInsert(JSON.parse(JSON.stringify(results)), rtrDta.tables[i].pk)
                process_custom_field_data(rtrDta.tables[i], rtrDta.tables[i].tble_nm);
                if (array_lines.length - 1 == (db_fields_list_qry2)) {
                    create_module_processed_files(rtrDta, rtrDta.tables[i].tble_nm);
                }
                else {
                    db_fields_list_qry2++
                }
            });
        })(i)
    }
}


var processFieldsData = function (fields) {
    return new Promise(function (resolve, reject) {
        let fieldCount = 0;
        let data = [];
        for (let i = 0; i < fields.length; i++) {
            (function (i) {
                if (fields[i].IS_CUSTOM && fields[i].CUSTOM_DATA.table != null) {
                    console.log("In If", fields.length)
                    let tblnm = fields[i].CUSTOM_DATA.table;
                    dblib.conn_execSQL(`select COLUMN_NAME,COLUMN_KEY,COLUMN_COMMENT,COLUMN_TYPE,CASE(IS_NULLABLE) WHEN 'YES' THEN 'true' ELSE 'false' END as IS_REQUIRED
                   ,COLUMN_DEFAULT ,CHARACTER_MAXIMUM_LENGTH,CASE (DATA_TYPE) WHEN 'bigint' THEN 'number'  WHEN 'INT' THEN 'integer' WHEN 'decimal' THEN 'number' WHEN 'tinyint' then 'boolean' ELSE 'string' END as SWAGGER_DATA_TYPE
                   ,CASE  WHEN COLUMN_KEY='PRI' THEN 'pk'
                        WHEN CHARACTER_MAXIMUM_LENGTH>150 THEN 'textarea'
                        WHEN CHARACTER_MAXIMUM_LENGTH>0 THEN 'text'
                        WHEN (COLUMN_NAME='a_in' OR COLUMN_NAME='i_ts' OR COLUMN_NAME='u_ts' OR COLUMN_NAME='d_ts'OR COLUMN_NAME='crte_usr_id' OR COLUMN_NAME='updte_usr_id') THEN 'infra'
                        WHEN COLUMN_NAME LIKE '%_in' THEN 'radio'
                        WHEN COLUMN_NAME LIKE '%_id' THEN 'dropdown'
                        ELSE 'text' END as COL_FLD_TYPE
                   FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=database()  AND TABLE_NAME='${fields[i].CUSTOM_DATA.table}'`, function (err, results) {
                        fieldCount++;
                        data.push({ results: results, tblnm: tblnm })
                        if (fields.length == fieldCount) {
                            resolve(data)
                        }
                    })

                } else {
                    fieldCount++;
                    if (fields.length == fieldCount) {
                        resolve({})
                    }
                }
            })(i)
        }
    });

}


