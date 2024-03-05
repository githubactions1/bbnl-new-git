var nconf 	     =  require('nconf')
	fs           =  require('fs'),
    path         =  require('path');

const os = require('os');
var moment = require('moment');

var host_dtls = {
                    hst_nm:null,
                    arch_type_nm:null,
                    total_mem_ct:null,
                    free_mem_ct:null,
                    ip_addr:null,
                    up_tm:null,
                    os_type_tx:null
};


host_dtls.hst_nm        =   os.hostname();
host_dtls.arch_type_nm  =   os.arch();
host_dtls.total_mem_ct  =   os.totalmem()/(1024*1024*1024);
host_dtls.free_mem_ct   =   os.freemem()/(1024*1024);
host_dtls.up_tm         =   os.uptime();
host_dtls.os_type_tx    =   os.type();

var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
                    if ('IPv4' !== iface.family || iface.internal !== false) {
                        return;
                    }
                    if (alias >= 1) {
                        host_dtls.ip_addr=iface.address;
                    } else {
                        host_dtls.ip_addr=iface.address;
                    }
                    ++alias;
        });
});

exports.registerApp =() =>{
    console.log("Hostname Details Send For Registration:: "+JSON.stringify(host_dtls));  
}


