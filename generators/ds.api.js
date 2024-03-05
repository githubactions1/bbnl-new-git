
var fs = require('fs');
const prog = require('caporal');
let ejs = require('ejs');
var fs = require('fs');

moment = require('moment');
path = require('path');

appRoot = __dirname;
var dblib = require('./lib/db.utils');
var genlib = require('./lib/gen.utils');
var apilib = require('./lib/api.utils');
// prog
//   .version('1.0.0')
//   .help('glits Code generator\n\nThis program generates model,controller and validation scripts for the api \nand\nAngular code for the clinet side CRUD operations') // here our custom help for the whole program
//   .command('generate api','Generate API files')
//   .argument('--d <database>', 'Database name')
//   .argument('--u <username>', 'Database user name')
//   .argument('--p <password>', 'Database Password')
//   .argument('--h <hostname>', 'Database host name')
//    .argument('--file <file_name>', 'File with list of tables')
//   .option('--module <module>', 'Name of the module. By default the file name is taken as module name.', function(opt) {
//     if (['appstore', 'base'].includes(opt) === false) {
//       throw new Error("You can only specify appstore/base as modules");
//     }
//     return opt;
//   })
//   .action(function(args, options) {
//       console.log("In action  "+args)
//   })
//   .command('generate angular','Generate Angular files')
//   .option('--table <table>', 'Name of the Table', /^margherita|hawaiian$/)
//   .action(function(args, options) {

//   });

// prog.parse(process.argv);
module_nm = process.argv.slice(2)

apilib.generate_Folders(module_nm)
rtrDta=  { 
   "module_nm":module_nm
  ,"dt":moment().format("DD/MM/YYYY")
  ,tables:[]
}
var create_processed_files = function(ctrlDta,tble_nm){
                ejs.renderFile('./api/templates/controller.ejs', ctrlDta, {}, function(err, str){
                  if(err){
                    console.log(err)
                  } else{
                    console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Contollers   "+appRoot+"/api/output/"+module_nm+"/controllers/"+genlib.getFileNamePfx(tble_nm)+"Ctrl.js")
                    genlib.writeFile(appRoot+"/api/output/"+module_nm+"/controllers/"+genlib.getFileNamePfx(tble_nm)+"Ctrl.js",str)
                  }

                  //console.log(str)
                });  
                ejs.renderFile('./api/templates/model.ejs', ctrlDta, {}, function(err, str){
                  if(err){
                    console.log(err)
                  } else{
                      console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Models       "+genlib.getFileNamePfx(tble_nm)+"Mdl.js")
                      genlib.writeFile(appRoot+"/api/output/"+module_nm+"/models/"+genlib.getFileNamePfx(tble_nm)+"Mdl.js",str)
                  }
                }); 
                ejs.renderFile('./api/templates/schema.ejs', ctrlDta, {}, function(err, str){
                  if(err){
                    console.log(err)
                  } else{
                      console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Schema       "+genlib.getFileNamePfx(tble_nm)+"Sch.js")
                      genlib.writeFile(appRoot+"/api/output/"+module_nm+"/schema/"+genlib.getFileNamePfx(tble_nm)+"Sch.js",str)
                  }
                });      
               
}
var create_module_processed_files = function(rtrDta,tble_nm){
        
                ejs.renderFile('./api/templates/router.ejs', rtrDta, {}, function(err, str){
                  if(err){
                    console.log(err)
                  } else{
                      console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating router file")
                      genlib.writeFile(appRoot+"/api/output/"+module_nm+"Rtr.js",str)
                  }
                }); 
                ejs.renderFile('./api/templates/swagger.ejs', rtrDta, {}, function(err, str){
                  if(err){
                    console.log(err)
                  } else{
                      console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Swagger file")
                      genlib.writeFile(appRoot+"/api/output/swagger_"+module_nm+".js",str)
                  }
                }); 
                process.exit(22);
}
var array_lines = fs.readFileSync('./api/data/'+module_nm+'.txt').toString().split("\n");

for (i=0;i<array_lines.length;i++){
  (function(tble_nm,url,obj_nm) {
    tble_nm=array_lines[i].split("|")[0];
    url=array_lines[i].split("|")[1];
    obj_nm=array_lines[i].split("|")[2];
    db_dtls={}
    db_fields_list_qry=0
   dblib.conn_execSQL("SELECT `TABLE_NAME` as tble_nm,GROUP_CONCAT(`COLUMN_NAME`) as col_list,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_NAME` ELSE NULL END) as  pk,GROUP_CONCAT(CASE WHEN EXTRA='auto_increment' THEN `COLUMN_NAME` ELSE NULL END) as  ak,GROUP_CONCAT(CASE WHEN IS_NULLABLE='NO' THEN `COLUMN_NAME` ELSE NULL END) as  notnull FROM `INFORMATION_SCHEMA`.`COLUMNS`  WHERE `TABLE_SCHEMA`=database() AND `TABLE_NAME`='"+tble_nm+"' AND COLUMN_NAME NOT IN('crte_usr_id','updte_usr_id','i_ts','u_ts','d_ts')",function(err,results){
              if(err){console.log(err)}
              //console.log("Processing for Table :: "+tble_nm)
              //console.log("Processing for url :: "+url)
              fileNmPrx=genlib.getFileNamePfx(tble_nm)
              //console.log("removeKeyFields(results[0].col_list,results[0].pk)"+genlib.removeKeyFields(results[0].col_list,results[0].pk))
              ctrlDta=  { 
                          "module_nm":module_nm
                          ,"dt":moment().format("DD/MM/YYYY")
                          ,"fileNmPrx":genlib.getFileNamePfx(tble_nm) 
                          ,"tble_nm": tble_nm
                          ,"url":url
                          ,"obj_nm":obj_nm
                          ,"flds":results[0].col_list
                          ,"pk":results[0].pk
                          ,"npk":genlib.removeKeyFields(results[0].col_list,results[0].pk)
                          ,"nnull":results[0].notnull
                        }
              rtrDta.tables.push({ 
                          "module_nm":module_nm
                          ,"dt":moment().format("DD/MM/YYYY")
                          ,"fileNmPrx":genlib.getFileNamePfx(tble_nm) 
                          ,"tble_nm": tble_nm
                          ,"url":url
                          ,"obj_nm":obj_nm
                          ,"flds":results[0].col_list
                          ,"pk":results[0].pk
                          ,"npk":genlib.removeKeyFields(results[0].col_list,results[0].pk)
                          ,"nnull":results[0].notnull
                          ,fld_dtls:[]
                          ,bfld_dtls:[]
                          ,insFields:""
                        }) 

             // create_processed_files(ctrlDta,tble_nm);  
              if(array_lines.length-1== (db_fields_list_qry)){
                // create_module_processed_files(rtrDta,tble_nm); 
                get_field_level_info(tble_nm)
              }
              else{
                db_fields_list_qry++
              }
            
          })
  })(i);





   
};


var get_field_level_info = function(tble_nm){
 // console.log(rtrDta)
 db_fields_list_qry2=0
  for (i=0;i<rtrDta.tables.length;i++){
        (function(i) {
            // console.log("rtrDta.tables[i]")
            // console.log(rtrDta.tables[i]);

             dblib.conn_execSQL("select COLUMN_NAME,COLUMN_KEY,COLUMN_COMMENT,COLUMN_TYPE,CASE(IS_NULLABLE) WHEN 'YES' THEN 'false' ELSE 'true' END as IS_REQUIRED,COLUMN_DEFAULT ,CHARACTER_MAXIMUM_LENGTH,CASE (DATA_TYPE) WHEN 'bigint' THEN 'number'  WHEN 'INT' THEN 'integer' WHEN 'decimal' THEN 'number' WHEN 'tinyint' then 'boolean' ELSE 'string' END as SWAGGER_DATA_TYPE FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`=database()  AND `TABLE_NAME`='"+rtrDta.tables[i].tble_nm+"'",function(err,results){
              if(err){console.log(err)}
              rtrDta.tables[i].fld_dtls=JSON.parse(JSON.stringify(results));
              rtrDta.tables[i].bfld_dtls=genlib.onlyBsnsFlds(JSON.parse(JSON.stringify(results)),rtrDta.tables[i].pk)
              rtrDta.tables[i].insFields=genlib.onlyBsnsFldsInsert(JSON.parse(JSON.stringify(results)),rtrDta.tables[i].pk)
             // console.log(rtrDta.tables[i])

              create_processed_files(rtrDta.tables[i],rtrDta.tables[i].tble_nm);  
              if(array_lines.length-1== (db_fields_list_qry2)){
                create_module_processed_files(rtrDta,rtrDta.tables[i].tble_nm); 
              }
              else{
                db_fields_list_qry2++
              }


             });
        })(i)
  }
}