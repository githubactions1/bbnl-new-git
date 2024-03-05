var fs           =  require('fs'),
    path         =  require('path');
const os 		 =  require('os');
exports.isDirectory = function(Directory) {
		return fs.existsSync(Directory)
};
exports.isFile = function(filename) {
	return fs.existsSync(filename)
};
exports.readFileSync = function(filename) {
	return fs.readFileSync(filename, 'utf8'); 
};

/*****************************************************************************
* Function      : writeToFile
* Description   : Write content to a file
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.createDirectory = function(Directories) {
	for (Directory in Directories)
	{
		if (!fs.existsSync(Directories[Directory])){
			fs.mkdirSync(Directories[Directory]);
		}
	}

};
/*****************************************************************************
* Function      : writeToFile
* Description   : Write content to a file
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.createDirectories = function(Directories) {	
	if (!fs.existsSync(Directory)){
		fs.mkdirSync(Directory);
	}
};
/*****************************************************************************
* Function      : writeToFile
* Description   : Write content to a file
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.filesInDir = function(directory) {
	    var filesLst=[];
	    var processed = 0;
		fs.readdir(directory, (err, files) => {
			  files.forEach(file => {
			        fs.stat(directory+file, function(err, stats) {
			            if(stats.isFile()){
			              filesLst.push(file);
			            }
			        });
	                if(++processed==files.length) return filesLst;
			  });
		});
};
/*****************************************************************************
* Function      : dirInDir
* Description   : Write content to a file
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.dirInDir = function(directory) {
		var d = moment.duration(os.uptime(), 'minutes');
		var days = Math.floor(d.asDays());
		var hours = Math.floor(d.asHours()) - days * 24;
		var mins = minutes % 60;
		return days+" days :: "+hours+" hours :: "+mins+" mins";
};
/*****************************************************************************
* Function      : writeToFile
* Description   : Write content to a file after cleaning previous content
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.writeFile = function(file, content) {
	const parts = path.parse(file);
	if (!fs.existsSync(parts.dir)) {
	  mkdirp.sync(parts.dir);
	}
	// TODO(joyeecheung): what if the file is a dir?
	fs.writeFileSync(file, content, 'utf8');
  };
exports.writeJson = function(file, obj) {
	exports.writeFile(file, JSON.stringify(obj, null, 2));
 };
 exports.readFile = function(file) {
	if (fs.existsSync(file)) {
	  return fs.readFileSync(file, 'utf8');
	}
	return '';
  };
  
  exports.readJson = function(file) {
	const content = exports.readFile(file);
	if (content) {
	  return JSON.parse(content);
	}
	return {};
  };
/*****************************************************************************
* Function      : appentToFile
* Description   : Append content to a file
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.appentToFile = function(filename,content) {
	const parts = path.parse(file);
	if (!fs.existsSync(parts.dir)) {
	  mkdirp.sync(parts.dir);
	}
	// TODO(joyeecheung): what if the file is a dir?
	fs.appendFileSync(filename, content, 'utf8');
};
/*****************************************************************************
* Function      : makeFileEmpty
* Description   : clean all the content and emplty a file
* Arguments     : file name
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.makeFileEmpty = function(filename) {
	fs.writeFile(filename,"", function (err) {
        if (err) throw err;
	});
};