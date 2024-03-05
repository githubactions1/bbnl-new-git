
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
output_dir = appRoot + "/client/output/"
//clientlib.generate_Folders(module_nm)
rtrDta = {
  "module_nm": module_nm
  , "dt": moment().format("DD/MM/YYYY")
  , tables: []
}
var create_client_files = function (ctrlDta, tble_nm) {

//Prompt user for custom data
  for (let i = 0; i < ctrlDta.bfld_dtls.length; i++) {
    ctrlDta.bfld_dtls[i]["CUSTOM_DATA"] = { route: null, input_key: null, key: '', label_key: '', label: '',table:'' };
    ctrlDta.bfld_dtls[i]["IS_CUSTOM"] = false;
  }
  genlib.writeJsonFile(ctrlDta.cmpDir + "/" + "fields.json", JSON.stringify(ctrlDta.bfld_dtls, 0, 4))
  prompt("Do you wnat to edit the component fields(fields.json)" + "? Hit 'Enter' to skip/continue");
  let fieldsData = fs.readFileSync(ctrlDta.cmpDir + "/" + "fields.json");
  ctrlDta.bfld_dtls = JSON.parse(fieldsData);

  create_processed_api_files(ctrlDta, tble_nm)



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
  process.exit(22);
}
var create_module_processed_files = function (rtrDta, tble_nm) {

  ejs.renderFile('./api/templates/router.ejs', rtrDta, {}, function (err, str) {
    if (err) {
      console.log(err)
    } else {
      console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating router file")
      genlib.writeFile(output_dir + module_nm + "Rtr.js", str)
    }
  });
  ejs.renderFile('./api/templates/swagger.ejs', rtrDta, {}, function (err, str) {
    if (err) {
      console.log(err)
    } else {
      console.log("[" + moment().format("DD/MM/YYYY HH:MM:SS") + "] - Generating Swagger file")
      genlib.writeFile(output_dir + "/swagger_" + module_nm + ".js", str)
    }
  });
}
//Read txt file from data folder
var array_lines = fs.readFileSync('./client/data/' + module_nm + '.txt').toString().split("\n");

for (i = 0; i < array_lines.length; i++) {
  (function (tble_nm, url, obj_nm, clnt_url, fileNmPrx, clntFleNmPrx, cmpDir) {
    table_array = array_lines[i].split("|") //Table Array
    tble_nm = table_array[0];               //Table Name
    url = table_array[1];                   //Server Url
    obj_nm = table_array[2];                //Name
    clnt_url = table_array[3];              //Client Url
    clntFleNmPrx = table_array[4];          //File Name
    //console.log("fileNmPrx===>"+JSON.stringify(table_array))
    db_dtls = {}
    db_fields_list_qry = 0
    dblib.conn_execSQL("SELECT `TABLE_NAME` as tble_nm,GROUP_CONCAT(`COLUMN_NAME`) as col_list,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_NAME` ELSE NULL END) as  pk,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_COMMENT` ELSE NULL END) as  pknm,GROUP_CONCAT(CASE WHEN EXTRA='auto_increment' THEN `COLUMN_NAME` ELSE NULL END) as  ak,GROUP_CONCAT(CASE WHEN IS_NULLABLE='NO' THEN `COLUMN_NAME` ELSE NULL END) as  notnull FROM `INFORMATION_SCHEMA`.`COLUMNS`  WHERE `TABLE_SCHEMA`=database() AND `TABLE_NAME`='" + tble_nm + "' AND COLUMN_NAME NOT IN('crte_usr_id','updte_usr_id','i_ts','u_ts','d_ts')", function (err, results) {
      if (err) { console.log(err) }
      //console.log("Processing for Table :: "+tble_nm)
      //console.log("Processing for url :: "+url)
      fileNmPrx = genlib.getFileNamePfx(tble_nm)
      cmpDir = output_dir + module_nm + "/" + genlib.getCompName(clntFleNmPrx)
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
  // console.log(rtrDta)
  db_fields_list_qry2 = 0
  for (i = 0; i < rtrDta.tables.length; i++) {
    (function (i) {
      // console.log("rtrDta.tables[i]")
      // console.log(rtrDta.tables[i]);
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
        console.log(rtrDta.tables[i].fld_dtls)

        create_client_files(rtrDta.tables[i], rtrDta.tables[i].tble_nm);
        if (array_lines.length - 1 == (db_fields_list_qry2)) {
          // create_module_processed_files(rtrDta,rtrDta.tables[i].tble_nm); 

        }
        else {
          db_fields_list_qry2++
        }


      });
    })(i)
  }
}