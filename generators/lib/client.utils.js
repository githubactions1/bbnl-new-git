var fs = require('fs');
var shell = require('shelljs');

var api_dir = appRoot+"/client/output";
var temp_dir = appRoot+"/temp";


exports.generate_Folders= function(module_nm) {

    if (!fs.existsSync(api_dir+"/"+module_nm+"/controllers")){
        shell.mkdir('-p', api_dir+"/"+module_nm+"/controllers");
    }
    if (!fs.existsSync(api_dir+"/"+module_nm+"/models")){
        shell.mkdir('-p', api_dir+"/"+module_nm+"/models");
    }
    if (!fs.existsSync(api_dir+"/"+module_nm+"/schema")){
        shell.mkdir('-p', api_dir+"/"+module_nm+"/schema");
    }
};

exports.generate_client_Folders= function(module_nm,compArray) {
    if (!fs.existsSync(temp_dir)){
        shell.mkdir('-p', temp_dir);
    }
    compArray.forEach((item, index) => {
            if (!fs.existsSync(api_dir+"/"+module_nm+"/"+item)){
                shell.mkdir('-p', api_dir+"/"+module_nm+"/"+item);
            }
      })
    
};


exports.create_compdir= function(comp_dir) {

            if (!fs.existsSync(comp_dir)){
                shell.mkdir('-p', comp_dir);
            }
    
};