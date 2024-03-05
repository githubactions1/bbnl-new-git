var pdf = require('html-pdf');
let ejs = require('ejs');
const fs = require("fs");
var _ = require('lodash');
var options;


options = {
    format: 'A4',
    orientation: "portrait",
    // phantomPath: '/glits/web/code/nodejs/APSFLWEB/node_modules/phantomjs-prebuilt/bin/phantomjs',
    "border": {
        "top": "2px solid black",            // default is 0, units: mm, cm, in, px
        "right": "2px solid black",
        "bottom": "2px solid black",
        "left": "2px solid black"
    },

    paginationOffset: 1,
    "header": {
        "height": "33mm",
        "width": "216mm",
        "contents": `<table width="100%";><tr><td width="25%"><img class="imgclss"  src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3'/></td>
        <td width="40%"><p class="txt">Andhra Pradesh State FiberNet Ltd. <br>(A Govt. of A.P Enterprise)</p></td>
        <td width:"25%">
        						<img class="imgclss1" src="data:image/png;base64,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">
        </td>
        </tr></table>`
    },
    "footer": {
        "height": "28mm",
        "contents": {
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value

        }
    },
    "timeout": 50000

};


// exports.generatePdf = function (invoicedata, type, callback) {
//     // console.log("generatePdf")
//     var count = 0;
//     var ntgenpdf = []
//     var rndrtmpt;

//     var file_nm;

//     function generate_invoice(data) {

//         ejs.renderFile('server/app/templates/invoice_html.ejs', { data: data }, {}, function (err, str) {
//             if (err) {
//                 console.log(err)
//                 console.log(err)
//                 return callback(err, {})
//             } else {
//                 console.log("in else")
//                 console.log("sucess in ejs")
//                 rndrtmpt = str
//             }
//         });

//         if (data.entrpe_type_id == 1) {
//             file_nm = 'pdf_invoice/' + "" + type.year + type.month + '/EntGovt';
//         }
//         else if (data.entrpe_type_id == 2) {
//             file_nm = 'pdf_invoice/' + "" + type.year + type.month + '/EntPrivate';
//         }
//         else if (data.entrpe_type_id == 3 || !data.entrpe_type_id) {
//             file_nm = 'pdf_invoice/' + "" + type.year + type.month + '/Individual';
//         }

//         pdf.create(rndrtmpt, options).toFile(`${file_nm}/${data.customerid}.pdf`, function (err, res) {
//             if (err) {
//                 console.log(err)
//                 count++
//                 // console.log("err", data.customerid)
//                 // console.log(err)
//                 invoicedata[count - 1]['pdfurl'] = '';
//                 invoicedata[count - 1]['status'] = 'fail';
//                 ntgenpdf.push(invoicedata[count - 1])
//                 if (count < invoicedata.length) {
//                     generate_invoice(invoicedata[count])
//                 }
//                 if (count == invoicedata.length) {
//                     for (var i = 0; i < invoicedata.length; i++) {
//                         ntgenpdf.forEach(element1 => {
//                             let stToDelete = element1.customerid;
//                             _.remove(invoicedata, function (currentObject) {
//                                 return currentObject.customerid === stToDelete;
//                             });
//                         })
//                     }
//                     callback({}, invoicedata)
//                 }
//             }
//             if (res) {
//                 // console.log("res")
//                 count++
//                 // console.log(res, data.customerid)
//                 invoicedata[count - 1]['pdfurl'] = `${file_nm}/${data.customerid}.pdf`;
//                 invoicedata[count - 1]['status'] = 'success';
//                 if (count < invoicedata.length) {
//                     generate_invoice(invoicedata[count])
//                 }
//                 if (count == invoicedata.length) {
//                     // console.log("fnjhgfdyfd")
//                     for (var i = 0; i < invoicedata.length; i++) {
//                         ntgenpdf.forEach(element1 => {
//                             let stToDelete = element1.customerid;
//                             _.remove(invoicedata, function (currentObject) {
//                                 return currentObject.customerid === stToDelete;
//                             });
//                         })
//                     }
//                     callback({}, invoicedata)
//                 }
//             }
//         })
//     }
//     generate_invoice(invoicedata[0])


// }

exports.generatePdf = function (invoicedata, type, callback) {
    // console.log("generatePdf")
    var count = 0;
    var ntgenpdf = []
    var rndrtmpt;

    var file_nm;
   var data = invoicedata;

    ejs.renderFile('server/app/templates/invoice_html.ejs', { data: data }, {}, function (err, str) {
        if (err) {
            console.log(err)
            console.log(err)
            return callback(err, {})
        } else {
            console.log("in else")
            console.log("sucess in ejs")
            rndrtmpt = str
        }
    });

    if (data.entrpe_type_id == 1) {
        file_nm = 'pdf_invoice/' + "" + type.year + type.month + `/${data.dstrt_nm}/EntGovt`;
    }
    else if (data.entrpe_type_id == 2) {
        file_nm = 'pdf_invoice/' + "" + type.year + type.month + `/${data.dstrt_nm}/EntPrivate`;
    }
    else if (data.entrpe_type_id == 3 || !data.entrpe_type_id) {
        file_nm = 'pdf_invoice/' + "" + type.year + type.month + `/${data.dstrt_nm}/Individual`;
    }

    pdf.create(rndrtmpt, options).toFile(`${file_nm}/${data.customerid}.pdf`, function (err, res) {
        if (err) {
            console.log(err)
                callback(err,res)
        }
        if (res) {
            res['pdfurl']=`${file_nm}/${data.customerid}.pdf`;
            res['cst_invoiceid']=data.cst_invoiceid;
                callback(err,res)
        }
    })
  
  }



exports.generateinvcePdf = function (invoicedata,landlineChrge,cpe_chrge,lcl_chrge,isd_chrge,std_chrge,base_chrge,base_chrges,addon_chrge,addonchrge,addonchrgetx, type, callback) {
    console.log("generatePdf")
    var count = 0;
	let options = { format: 'A4' };
    var ntgenpdf = []
    var rndrtmpt;

    var file_nm = "invoice";
   var data = invoicedata;
   console.log("data[0]['cstmr_nm']",data[0]['cstmr_nm']);

    ejs.renderFile('server/app/templates/index.html', { data: data,cpe: cpe_chrge, lcl: lcl_chrge,isd: isd_chrge,std: std_chrge,base:base_chrge,bases:base_chrges,addon:addon_chrge,landlineChrge:landlineChrge,addonchrge:addonchrge,addonchrgetx:addonchrgetx }, {}, function (err, str) {
        if (err) {
            console.log(err)
            console.log(err)
            return callback(err, {})
        } else {
            console.log("in else")
            console.log("sucess in ejs")
            rndrtmpt = str
        }
    });

	callback(null, rndrtmpt);
  
  }