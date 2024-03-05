//var request = require('request');
var parser = require('ua-parser-js');
var fs = require('fs');
var os = require("os");

/*****************************************************************************
* Function      : auditRestarts
* Description   : sends an SMS to Indian Phone Number
* Arguments     : callback function
* History   
* 04/11/2016    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.auditRestarts = function() {
    var now = new Date();
    var logfile_name = appRoot + "/" + as.app.audit_dir+'/'+as.app.audit_restart_log+"_" + now.getFullYear() + "_"+ now.getMonth()+'.txt'
    fs.appendFile(logfile_name,"START::"+moment().format('MM-DD-YYYY h:mm:ss')+""+os.EOL, function (err) {
        if (err) throw err;
        //console.log('The "data to append" was appended to file!');
      });
}

/*****************************************************************************
* Function      : auditAllUrls
* Description   : sends an SMS to Indian Phone Number
* Arguments     : callback function
* History   
* 04/11/2016    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.auditAllUrls = function(req, res,audit_dir,app_name) {

    if (!fs.existsSync(audit_dir)){
        fs.mkdirSync(audit_dir);
    }

    var now = new Date();

    var logfile_name = audit_dir+'/'+app_name+"_" + now.getFullYear() + "_"+ now.getMonth() + "_" + now.getDay() +'_'+now.getHours()+'.txt'
    //console.log("logfile_name ::"+logfile_name);

    var ua = parser(req.headers['user-agent']);
    //console.log("ua ::"+JSON.stringify(ua));
    var device_id=(req.headers.dev_id===undefined?'':req.headers.dev_id);
    var host_nm=(req.headers.host===undefined?'':req.headers.host);
    var client_details={"b":'',"bv":'',"o":'',"ov":'',"d":'',"v":'',"m":'',"c":'',"i":''}
    /*
       b -- Blowser
       o -- Operationg System
       d -- Device
       v -- Device Vendor
       m -- Device Model
       c -- CPU Archatecture
       ov - OS Version
       bv - Browser Version
       i -- IP Address of Client
    */

    // Update Browser related 
    client_details.bv=ua.browser.version;
    if(ua.browser.name== 'Amaya'){
        client_details.b=1;
    }else if(ua.browser.name== 'Android Browser'){
        client_details.b=2;
    }else if(ua.browser.name== 'Arora'){
        client_details.b=3;
    }else if(ua.browser.name== 'Avant'){
        client_details.b=4;
    }else if(ua.browser.name== 'Baidu'){
        client_details.b=5;
    }else if(ua.browser.name== 'Blazer'){
        client_details.b=6;
    }else if(ua.browser.name== 'Bolt'){
        client_details.b=7;
    }else if(ua.browser.name== 'Camino'){
        client_details.b=8;
    }else if(ua.browser.name== 'Chimera'){
        client_details.b=9;
    }else if(ua.browser.name== 'Chrome'){
        client_details.b=10;
    }else if(ua.browser.name== 'Chromium'){
        client_details.b=11;
    }else if(ua.browser.name== 'Comodo Dragon'){
        client_details.b=12;
    }else if(ua.browser.name== 'Conkeror'){
        client_details.b=13;
    }else if(ua.browser.name== 'Dillo'){
        client_details.b=14;
    }else if(ua.browser.name== 'Dolphin'){
        client_details.b=15;
    }else if(ua.browser.name== 'Doris'){
        client_details.b=16;
    }else if(ua.browser.name== 'Edge'){
        client_details.b=17;
    }else if(ua.browser.name== 'Epiphany'){
        client_details.b=18;
    }else if(ua.browser.name== 'Fennec'){
        client_details.b=19;
    }else if(ua.browser.name== 'Firebird'){
        client_details.b=20;
    }else if(ua.browser.name== 'Firefox'){
        client_details.b=21;
    }else if(ua.browser.name== 'Flock'){
        client_details.b=22;
    }else if(ua.browser.name== 'GoBrowser'){
        client_details.b=23;
    }else if(ua.browser.name== 'iCab'){
        client_details.b=24;
    }else if(ua.browser.name== 'ICE Browser'){
        client_details.b=25;
    }else if(ua.browser.name== 'IceApe'){
        client_details.b=26;
    }else if(ua.browser.name== 'IceCat'){
        client_details.b=27;
    }else if(ua.browser.name== 'IceDragon'){
        client_details.b=28;
    }else if(ua.browser.name== 'Iceweasel'){
        client_details.b=29;
    }else if(ua.browser.name== 'IE [Mobile]'){
        client_details.b=30;
    }else if(ua.browser.name== 'Iron'){
        client_details.b=31;
    }else if(ua.browser.name== 'Jasmine'){
        client_details.b=32;
    }else if(ua.browser.name== 'K-Meleon'){
        client_details.b=33;
    }else if(ua.browser.name== 'Konqueror'){
        client_details.b=34;
    }else if(ua.browser.name== 'Kindle'){
        client_details.b=35;
    }else if(ua.browser.name== 'Links'){
        client_details.b=36;
    }else if(ua.browser.name== 'Lunascape'){
        client_details.b=37;
    }else if(ua.browser.name== 'Lynx'){
        client_details.b=38;
    }else if(ua.browser.name== 'Maemo'){
        client_details.b=39;
    }else if(ua.browser.name== 'Maxthon'){
        client_details.b=40;
    }else if(ua.browser.name== 'Midori'){
        client_details.b=41;
    }else if(ua.browser.name== 'Minimo'){
        client_details.b=42;
    }else if(ua.browser.name== 'MIUI Browser'){
        client_details.b=43;
    }else if(ua.browser.name== '[Mobile] Safari'){
        client_details.b=44;
    }else if(ua.browser.name== 'Mosaic'){
        client_details.b=45;
    }else if(ua.browser.name== 'Mozilla'){
        client_details.b=46;
    }else if(ua.browser.name== 'Netfront'){
        client_details.b=47;
    }else if(ua.browser.name== 'Netscape'){
        client_details.b=48;
    }else if(ua.browser.name== 'NetSurf'){
        client_details.b=49;
    }else if(ua.browser.name== 'Nokia'){
        client_details.b=50;
    }else if(ua.browser.name== 'OmniWeb'){
        client_details.b=51;
    }else if(ua.browser.name== 'Opera [Mini/Mobi/Tablet]'){
        client_details.b=52;
    }else if(ua.browser.name== 'PhantomJS'){
        client_details.b=53;
    }else if(ua.browser.name== 'Phoenix'){
        client_details.b=54;
    }else if(ua.browser.name== 'Polaris'){
        client_details.b=55;
    }else if(ua.browser.name== 'QQBrowser'){
        client_details.b=56;
    }else if(ua.browser.name== 'RockMelt'){
        client_details.b=57;
    }else if(ua.browser.name== 'Silk'){
        client_details.b=58;
    }else if(ua.browser.name== 'Skyfire'){
        client_details.b=59;
    }else if(ua.browser.name== 'SeaMonkey'){
        client_details.b=60;
    }else if(ua.browser.name== 'SlimBrowser'){
        client_details.b=61;
    }else if(ua.browser.name== 'Swiftfox'){
        client_details.b=62;
    }else if(ua.browser.name== 'Tizen'){
        client_details.b=63;
    }else if(ua.browser.name== 'UCBrowser'){
        client_details.b=64;
    }else if(ua.browser.name== 'Vivaldi'){
        client_details.b=65;
    }else if(ua.browser.name== 'w3m'){
        client_details.b=66;
    }else if(ua.browser.name== 'WeChat'){
        client_details.b=67;
    }else if(ua.browser.name== 'Yandex'){
        client_details.b=68;
    }
    // OS realted Info
    client_details.m=ua.device.model;
    client_details.ov=ua.os.version;
       if(ua.os.name== 'AIX'){
        client_details.o=1;
    }else if(ua.os.name== 'Amiga OS'){
        client_details.o=2;
    }else if(ua.os.name== 'Android'){
        client_details.o=3;
    }else if(ua.os.name== 'Arch'){
        client_details.o=4;
    }else if(ua.os.name== 'Bada'){
        client_details.o=5;
    }else if(ua.os.name== 'BeOS'){
        client_details.o=6;
    }else if(ua.os.name== 'BlackBerry'){
        client_details.o=7;
    }else if(ua.os.name== 'CentOS'){
        client_details.o=8;
    }else if(ua.os.name== 'Chromium OS'){
        client_details.o=9;
    }else if(ua.os.name== 'Contiki'){
        client_details.o=10;
    }else if(ua.os.name== 'Fedora'){
        client_details.o=11;
    }else if(ua.os.name== 'Firefox OS'){
        client_details.o=12;
    }else if(ua.os.name== 'FreeBSD'){
        client_details.o=13;
    }else if(ua.os.name== 'Debian'){
        client_details.o=15;
    }else if(ua.os.name== 'DragonFly'){
        client_details.o=16;
    }else if(ua.os.name== 'Gentoo'){
        client_details.o=17;
    }else if(ua.os.name== 'GNU'){
        client_details.o=18;
    }else if(ua.os.name== 'Haiku'){
        client_details.o=19;
    }else if(ua.os.name== 'Hurd'){
        client_details.o=20;
    }else if(ua.os.name== 'iOS'){
        client_details.o=21;
    }else if(ua.os.name== 'Joli'){
        client_details.o=22;
    }else if(ua.os.name== 'Linpus'){
        client_details.o=23;
    }else if(ua.os.name== 'Linux'){
        client_details.o=24;
    }else if(ua.os.name== 'Mac OS'){
        client_details.o=25;
    }else if(ua.os.name== 'Mageia'){
        client_details.o=26;
    }else if(ua.os.name== 'Mandriva'){
        client_details.o=27;
    }else if(ua.os.name== 'MeeGo'){
        client_details.o=28;
    }else if(ua.os.name== 'Minix'){
        client_details.o=29;
    }else if(ua.os.name== 'Mint'){
        client_details.o=30;
    }else if(ua.os.name== 'Morph OS'){
        client_details.o=31;
    }else if(ua.os.name== 'NetBSD'){
        client_details.o=32;
    }else if(ua.os.name== 'Nintendo'){
        client_details.o=33;
    }else if(ua.os.name== 'OpenBSD'){
        client_details.o=34;
    }else if(ua.os.name== 'OpenVMS'){
        client_details.o=35;
    }else if(ua.os.name== 'OS/2'){
        client_details.o=36;
    }else if(ua.os.name== 'Palm'){
        client_details.o=37;
    }else if(ua.os.name== 'PCLinuxOS'){
        client_details.o=38;
    }else if(ua.os.name== 'Plan9'){
        client_details.o=39;
    }else if(ua.os.name== 'Playstation'){
        client_details.o=40;
    }else if(ua.os.name== 'QNX'){
        client_details.o=41;
    }else if(ua.os.name== 'RedHat'){
        client_details.o=42;
    }else if(ua.os.name== 'RIM Tablet OS'){
        client_details.o=43;
    }else if(ua.os.name== 'RISC OS'){
        client_details.o=44;
    }else if(ua.os.name== 'Sailfish'){
        client_details.o=45;
    }else if(ua.os.name== 'Series40'){
        client_details.o=46;
    }else if(ua.os.name== 'Slackware'){
        client_details.o=47;
    }else if(ua.os.name== 'Solaris'){
        client_details.o=48;
    }else if(ua.os.name== 'SUSE'){
        client_details.o=49;
    }else if(ua.os.name== 'Symbian'){
        client_details.o=50;
    }else if(ua.os.name== 'Tizen'){
        client_details.o=51;
    }else if(ua.os.name== 'Ubuntu'){
        client_details.o=52;
    }else if(ua.os.name== 'UNIX'){
        client_details.o=53;
    }else if(ua.os.name== 'VectorLinux'){
        client_details.o=54;
    }else if(ua.os.name== 'WebOS'){
        client_details.o=55;
    }else if(ua.os.name== 'Windows [Phone/Mobile]'){
        client_details.o=56;
    }else if(ua.os.name== 'Zenwalk'){
        client_details.o=57;
    }
    //Device related Info
    if(ua.device.type== 'console'){
        client_details.d=1;
    }else if(ua.device.type== 'mobile'){
        client_details.d=2;
    }else if(ua.device.type== 'tablet'){
        client_details.d=3;
    }else if(ua.device.type== 'smarttv'){
        client_details.d=4;
    }else if(ua.device.type== 'wearable'){
        client_details.d=5;
    }else if(ua.device.type== 'embedded'){
        client_details.d=6;
    }
    // Device Vendor related
    if(ua.device.vendor== 'Acer'){
        client_details.v=1;
    }else if(ua.device.vendor== 'Alcatel'){
        client_details.v=2;
    }else if(ua.device.vendor== 'Amazon'){
        client_details.v=3;
    }else if(ua.device.vendor== 'Apple'){
        client_details.v=5;
    }else if(ua.device.vendor== 'Archos'){
        client_details.v=5;
    }else if(ua.device.vendor== 'Asus'){
        client_details.v=6;
    }else if(ua.device.vendor== 'BenQ'){
        client_details.v=7;
    }else if(ua.device.vendor== 'BlackBerry'){
        client_details.v=8;
    }else if(ua.device.vendor== 'Dell'){
        client_details.v=9;
    }else if(ua.device.vendor== 'GeeksPhone'){
        client_details.v=10;
    }else if(ua.device.vendor== 'Google'){
        client_details.v=11;
    }else if(ua.device.vendor== 'HP'){
        client_details.v=12;
    }else if(ua.device.vendor== 'HTC'){
        client_details.v=13;
    }else if(ua.device.vendor== 'Huawei'){
        client_details.v=14;
    }else if(ua.device.vendor== 'Jolla'){
        client_details.v=15;
    }else if(ua.device.vendor== 'Lenovo'){
        client_details.v=16;
    }else if(ua.device.vendor== 'LG'){
        client_details.v=17;
    }else if(ua.device.vendor== 'Meizu'){
        client_details.v=18;
    }else if(ua.device.vendor== 'Microsoft'){
        client_details.v=19;
    }else if(ua.device.vendor== 'Motorola'){
        client_details.v=20;
    }else if(ua.device.vendor== 'Nexian'){
        client_details.v=21;
    }else if(ua.device.vendor== 'Nintendo'){
        client_details.v=22;
    }else if(ua.device.vendor== 'Nokia'){
        client_details.v=23;
    }else if(ua.device.vendor== 'Nvidia'){
        client_details.v=24;
    }else if(ua.device.vendor== 'Ouya'){
        client_details.v=25;
    }else if(ua.device.vendor== 'Palm'){
        client_details.v=26;
    }else if(ua.device.vendor== 'Panasonic'){
        client_details.v=27;
    }else if(ua.device.vendor== 'Polytron'){
        client_details.v=28;
    }else if(ua.device.vendor== 'RIM'){
        client_details.v=29;
    }else if(ua.device.vendor== 'Samsung'){
        client_details.v=30;
    }else if(ua.device.vendor== 'Sharp'){
        client_details.v=31;
    }else if(ua.device.vendor== 'Siemens'){
        client_details.v=32;
    }else if(ua.device.vendor== 'Sony-Ericsson'){
        client_details.v=33;
    }else if(ua.device.vendor== 'Sprint'){
        client_details.v=34;
    }else if(ua.device.vendor== 'Xbox'){
        client_details.v=35;
    }else if(ua.device.vendor== 'ZTE'){
        client_details.v=36;
    }
    // CPU related
      if(ua.cpu.architecture== '68k'){
        client_details.c=1;
    }else if(ua.cpu.architecture== 'amd64'){
        client_details.c=2;
    }else if(ua.cpu.architecture== 'arm'){
        client_details.c=3;
    }else if(ua.cpu.architecture== 'arm64'){
        client_details.c=4;
    }else if(ua.cpu.architecture== 'avr'){
        client_details.c=5;
    }else if(ua.cpu.architecture== 'ia32'){
        client_details.c=6;
    }else if(ua.cpu.architecture== 'ia64'){
        client_details.c=7;
    }else if(ua.cpu.architecture== 'irix'){
        client_details.c=8;
    }else if(ua.cpu.architecture== 'irix64'){
        client_details.c=9;
    }else if(ua.cpu.architecture== 'mips'){
        client_details.c=10;
    } if(ua.cpu.architecture== 'mips64'){
        client_details.c=11;
    }else if(ua.cpu.architecture== 'pa-risc'){
        client_details.c=12;
    }else if(ua.cpu.architecture== 'ppc'){
        client_details.c=13;
    }else if(ua.cpu.architecture== 'sparc'){
        client_details.c=14;
    }else if(ua.cpu.architecture== 'sparc64'){
        client_details.c=15;
    }
    // IP related Info
   // console.log(device_id+"|"+host_nm+"|"+req.method+"|"+req.url+"|"+JSON.stringify(req.body)+"|"+JSON.stringify(req.query)+"|"+JSON.stringify(client_details));

        fs.appendFile(logfile_name, device_id+"|"+host_nm+"|"+req.method+"|"+req.url+"|"+JSON.stringify(req.body)+"|"+JSON.stringify(req.query)+"|"+JSON.stringify(client_details)+os.EOL, function (err) {
      if (err) throw err;
      //console.log('The "data to append" was appended to file!');

    });

    

}