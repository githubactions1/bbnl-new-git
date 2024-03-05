
var fs = require('fs');
const prog = require('caporal');
let ejs = require('ejs');
var fs = require('fs');
const { readdir, stat } = require("fs").promises;
const { join } = require("path")
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
//     if (['support', 'base'].includes(opt) === false) {
//       throw new Error("You can only specify support/base as modules");
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

const directoryPath = path.join(__dirname, '../server/api/routes');

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

//console.log(getDirectoriesRecursive(directoryPath))


rtr_file=path.join(__dirname, '../server/api/routes/apiRoutes.js')

lineReader.eachLine(rtr_file, function(line) {
    console.log(line);
    if (line.includes('STOP')) {
        return false; // stop reading
    }
});

// prog.parse(process.argv);
module_nm="support"
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./api/data/'+module_nm+'.txt')
});
apilib.generate_Folders(module_nm)
rtrDta=  { 
  "module_nm":module_nm
  ,"dt":moment().format("DD/MM/YYYY")
  ,tables:[]
}
console.log(rtrDta);
lineReader.on('line', function (line) {
  tble_nm=line.split("|")[0];
  url=line.split("|")[1];
  obj_nm=line.split("|")[2];
  db_dtls={}
 console.log('Line from file:', tble_nm);
  //  dblib.conn_execSQL("SELECT `TABLE_NAME` as tble_nm,GROUP_CONCAT(`COLUMN_NAME`) as col_list,GROUP_CONCAT(CASE WHEN COLUMN_KEY='PRI' THEN `COLUMN_NAME` ELSE NULL END) as  pk,GROUP_CONCAT(CASE WHEN EXTRA='auto_increment' THEN `COLUMN_NAME` ELSE NULL END) as  ak,GROUP_CONCAT(CASE WHEN IS_NULLABLE='NO' THEN `COLUMN_NAME` ELSE NULL END) as  notnull FROM `INFORMATION_SCHEMA`.`COLUMNS`  WHERE `TABLE_SCHEMA`=database() AND `TABLE_NAME`='"+tble_nm+"' AND COLUMN_NAME NOT IN('crte_usr_id','updte_usr_id','i_ts','u_ts','d_ts')",function(err,results){
  //      if(err){console.log(err)}
  //      // console.log(results)
  //       db_dtls=results;
  //   })
    fileNmPrx=genlib.getFileNamePfx(tble_nm)
    ctrlDta=  { 
                "module_nm":module_nm
                ,"dt":moment().format("DD/MM/YYYY")
                ,"fileNmPrx":genlib.getFileNamePfx(tble_nm) 
                ,"tble_nm": tble_nm
                ,"url":url
                ,"obj_nm":obj_nm
                ,"flds":1
                ,"pk":1
                ,"nnull":1
              }
     rtrDta.tables.push({"fileNmPrx":genlib.getFileNamePfx(tble_nm) 
                            ,"tble_nm": tble_nm
                            ,"url":url
                            ,"obj_nm":obj_nm
                            ,"flds":1
                            ,"pk":1
                            ,"nnull":1
                        })  
      ejs.renderFile('./api/templates/controller.ejs', rtrDta, {}, function(err, str){
        console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Contollers"+genlib.getFileNamePfx(tble_nm)+"Ctrl.js")
        genlib.writeFile(appRoot+"/api/output/"+module_nm+"/controllers/"+genlib.getFileNamePfx(tble_nm)+"Ctrl.js",str)
        //console.log(str)
      });  
      ejs.renderFile('./api/templates/model.ejs', rtrDta, {}, function(err, str){
        console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Models"+genlib.getFileNamePfx(tble_nm)+"Mdl.js")
        genlib.writeFile(appRoot+"/api/output/"+module_nm+"/models/"+genlib.getFileNamePfx(tble_nm)+"Mdl.js",str)
        //console.log(str)
      }); 
      ejs.renderFile('./api/templates/schems.ejs', rtrDta, {}, function(err, str){
        console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating Schema"+genlib.getFileNamePfx(tble_nm)+"Sch.js")
        genlib.writeFile(appRoot+"/api/output/"+module_nm+"/schema/"+genlib.getFileNamePfx(tble_nm)+"Sch.js",str)
        //console.log(str)
      });      
      ejs.renderFile('./api/templates/router.ejs', rtrDta, {}, function(err, str){
        console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - Generating router file")
        genlib.writeFile(appRoot+"/api/output/"+module_nm+"Rtr.js",str)
        //console.log(str)
      });   
});
// console.log(rtrDta);
// console.log("["+moment().format("DD/MM/YYYY HH:MM:SS")+"] - ")
  