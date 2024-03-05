// Standard Inclusions
var df = require(appRoot + '/utils/dflower.utils');
var fu = require(appRoot + '/utils/file.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var fs = require('fs');
var os = require("os");

ds_fs_stats_temp={"0":"0","1":"0","2":"0","3":"0","4":"0","5":"0","6":"0","7":"0","8":"0","9":"0","10":"0","11":"0","12":"0","13":"0","14":"0","15":"0","16":"0","17":"0","18":"0","19":"0","20":"0","21":"0","22":"0","23":"0"}
ds_stats={};
ds_metrics=[];
ds_metric_dt=[];

getMetricsHrfileName = function(){
    var currentDate=new Date();
    var l_hr=currentDate.getHours();
    var dd=currentDate.getDate();
    var mm=currentDate.getMonth();
    var yy=currentDate.getFullYear(); 
    return appRoot + "/" +as.app.audit_dir+"/"+as.app.metrics_log+"_"+yy+"_"+mm+"_"+dd;
}

init_metric_per_day = function(metric) {
    var currentDate=new Date();
    var l_hr=currentDate.getHours();
    var dd=currentDate.getDate();
    var mm=currentDate.getMonth();
    var yy=currentDate.getFullYear();
    if(ds_metric_dt[metric]==undefined || ds_metric_dt[metric][dd+"-"+mm+"-"+yy]==undefined){
        if(ds_metric_dt[metric] === undefined) ds_metric_dt[metric]=[]
        ds_metric_dt[metric][dd+"-"+mm+"-"+yy]=ds_fs_stats_temp;
    }

}


//metric.printAllMetrics()

// metric.incriment('db_sql')
// metric.incriment('db_sql')
// metric.incriment('db_sql')
// metric.print_data('db_sql')
// metric.print_data('db_pool')
if (fu.isFile(getMetricsHrfileName())){
    //log.err("\n\n Metrics hourly file exits \n\n")
    lns=fu.readFileSync(getMetricsHrfileName()).split(/[\n\r]/);
    for (i=0;i<lns.length;i++){
        load_metric=lns[i].split("|")
        log.info(load_metric)
        metric_dt=load_metric[0]
        metric_nm=load_metric[1]
        metric_data=load_metric[2]
        //log.err(metric_nm)
        
        if(ds_metric_dt[metric_nm] === undefined) { 
            ds_metric_dt[metric_nm]=[]
            ds_metric_dt[metric_nm][metric_dt]=[]
        }
        // log.err(JSON.parse(metric_data))
        // if(ds_metric_dt[metric][metric_dt] === undefined) ds_metric_dt[metric][metric_dt]=[]
        ds_metric_dt[metric_nm][metric_dt]=ds_fs_stats_temp;
    }

}



exports.define = function(metric) {
    ds_metrics.push({id:ds_metrics.length+1,nm:metric,ts:Date()})
    init_metric_per_day(metric);
    
}

exports.initMetric = function(){
    // check if audit and temp directories exists. If not create them

    // Read this hour metrics and load them to memory


    audit/metrics
}
/*****************************************************************************
* Function      : writeMetricsLog
* Description   : Write a Metrics log to a file
* Arguments     : file name, metric name ,metrics date
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
var writeMetricsLog = function(filename,hr_metric_tx) {
	// fu.writeToFile(filename,hr_metric_tx, function (err) {
    //     if (err) throw err;
	// });
};
var appendMetricsLog = function(filename,hr_metric_tx) {
	fu.appentToFile(filename,hr_metric_tx, function (err) {
        if (err) throw err;
	});
};
exports.print = function() {
    log.info("metrics_log ::"+appRoot + "/" +as.app.audit_dir+"/"+as.app.metrics_log)
    metrics_dt= new Date();
    hr_metics=""
    for (i=0;i<ds_metrics.length;i++){
        hr_metics=hr_metics+moment(metrics_dt).format('MM-DD-YYYY')+"|"+metrics_dt.getHours()+"|"+ds_metrics[i].nm+"|"+ds_metrics[i].id+"|"+moment().format('MM-DD-YYYY h:mm:ss')+"\n";
        if(i==ds_metrics.length-1){
            writeMetricsLog(appRoot + "/" +as.app.audit_dir+"/"+as.app.metrics_log,hr_metics )
        }
        log.info(ds_metrics[i].nm+" "+ds_metrics[i].id, 0, cntxtDtls)
        var currentDate=new Date();
        var l_hr=currentDate.getHours();
        var dd=currentDate.getDate();
        var mm=currentDate.getMonth();
        var yy=currentDate.getFullYear();

        metric_nm=ds_metrics[i].nm;
        log.info(metric_nm+" ---> "+ds_metric_dt[metric_nm][dd+"-"+mm+"-"+yy][l_hr])
    }
}



print_data = function(metric) { 
    var currentDate=new Date();
    var l_hr=currentDate.getHours();
    var dd=currentDate.getDate();
    var mm=currentDate.getMonth();
    var yy=currentDate.getFullYear(); 
    // log.info(`Mertics data for :: ${metric}` ,0, cntxtDtls)
    fu.makeFileEmpty(getMetricsHrfileName())
    if(!(ds_metric_dt[metric] == undefined)){
        //console.log("   DATE   | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13  | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 ")
        dt_print=""
        for (ky in ds_metric_dt[metric]){
            dt_print=ky+'|'+metric
           // console.log(ds_metric_dt[metric][ky])
            // for(ky2 in ds_metric_dt[metric][ky]){
            //     dt_print=dt_print+'|'+ky2+":"+ds_metric_dt[metric][ky][ky2]
            // }
            dt_print=dt_print+'|'+JSON.stringify(ds_metric_dt[metric][ky])
            //   fu.appentToFile(getMetricsHrfileName(),dt_print+"\n")
              // console.log(dt_print)
        }
    }
    
}


exports.printAllMetrics = function() {
    log.info("metrics_log ::"+appRoot + "/" +as.app.audit_dir+"/"+as.app.metrics_log)
    metrics_dt= new Date();
    hr_metics=""
    for (i=0;i<ds_metrics.length;i++){
        print_data(ds_metrics[i].nm)
    }
}

exports.incriment = function(metric) {
    var currentDate=new Date();
    var l_hr=currentDate.getHours();
    var dd=currentDate.getDate();
    var mm=currentDate.getMonth();
    var yy=currentDate.getFullYear();
    if(ds_metric_dt[metric]==undefined || ds_metric_dt[metric][dd+"-"+mm+"-"+yy]==undefined){
        ds_metric_dt[metric]=[]
        ds_metric_dt[metric][dd+"-"+mm+"-"+yy]=ds_fs_stats_temp;
        ds_metric_dt[metric][dd+"-"+mm+"-"+yy][l_hr]+=1
    }else {
        ds_metric_dt[metric][dd+"-"+mm+"-"+yy][l_hr]+=1
    }
   // console.log(ds_metric_dt); 
}
