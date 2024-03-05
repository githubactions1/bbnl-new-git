// Standard Inclusions

var pdf = require('html-pdf');
var mail = require(appRoot + '/utils/communication.utils');
var json = require(appRoot + '/utils/json.utils');
let ejs = require('ejs');
const fs = require("fs")
var config = require(appRoot + '/config/bss.config.json');
const AgntPymntMdl = require(appRoot + '/server/api/modules/billing/models/AgntPymntsMdl');
var _ = require('lodash');
var options;
var zte_path = config.bssconf.ztc.zte.path;
var dsn_path = config.bssconf.ztc.dsn.path;
var zte_tmplt = config.bssconf.ztc.zte.tmplt;
var dsn_tmplt = config.bssconf.ztc.dsn.tmplt;
var dsnw_tmplt = config.bssconf.ztc.dsnw.tmplt;





// var tmplt_data = {
//     "CURRENT_DATE"        : dtutls.getDate()
//     ,"CURRENT_TIMESTAMP"  : dtutls.getTimestamp()
//     ,"CURRENT_MONTH"      : dtutls.getTimestamp()
//     ,"CURRENT_YEAR"       : dtutls.getTimestamp()
//     ,"CURRENT_USER"       : dtutls.getTimestamp()
//     ,"USER_DESINATION_ID" : dtutls.getTimestamp()
//     ,"USER_DESINATION_NM" : dtutls.getTimestamp()
//     ,"USER_DEPARTMENT_ID" : dtutls.getTimestamp()
//     ,"USER_DEPARTMENT_NM" : dtutls.getTimestamp()
//     ,"CLINT_ID"           : dtutls.getTimestamp()
//     ,"CLINT_NM"           : dtutls.getTimestamp()
//     ,"HYRARCHY_ID"        : dtutls.getTimestamp()
//     ,"HYRARCHY_NM"        : dtutls.getTimestamp()
//     ,"HYRARCHY_GRP_ID"    : dtutls.getTimestamp()
//     ,"HYRARCHY_GRP_NM"    : dtutls.getTimestamp()

// }












var x = 0;
var y = 0;

exports.sendPdf = function (results, invoicedata, callback) {
    var count = 0;
    invoicedata.forEach(element => {
        let invcdata = element
        rndrtmpt = ejs.render(results[0].rndr_ejs_html, { data: invcdata }, {});
        element['html'] = rndrtmpt;
        count++;
        if (count == invoicedata.length) {
            pdfCreate(invoicedata, (x) => {
                if (x == invoicedata.length) {
                    sendmail(invoicedata, (y) => {
                        callback({}, y)
                    })
                }

            })
        }
    });
}
options = {
    format: 'A4',
    orientation: "portrait",
    "border": {
        "top": "2px solid black",            // default is 0, units: mm, cm, in, px
        "right": "2px solid black",
        "bottom": "2px solid black",
        "left": "2px solid black"
    },

    paginationOffset: 1,
    "header": {
        "height": "40mm",
        "contents": `<table width="100%"><tr><td width="40%"><img width=80%" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3'/></td><td width="30%"><p style="font-size:14px;font-weight:700">Andhra Pradesh State FiberNet Ltd. <br>(A Govt. of A.P Enterprise)</p></td><td width="70%"><img width="90%" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAACvCAMAAADnobRfAAADAFBMVEUAAADxYTbxYTbxXTYHh8zxYTbxYTbxXzbxYTbxYDbyYDbxYTYJnN3xYTbxYTbxYTbyYDYMd77xYTYGktbxYTbxYTbxYTbxYTYKhMnxYTbxXTbxYTbxYTbyXzXxYTbxYTbxYTbwXDfxYTbxYTbxYTbxYTbxYTbxYTbxYTbxYTbxYTbxYTYJecAAre3xYTbxYTbxYTYFkNQSeLzyXjXxYTbxYTbxYTbxYTbxYTbyXTUFldkId78Gg8jxYTYDnd/xYTbxYTYGgsjxYTbxYTYGhcvxYTbwRDYHeL8IhsvxYTbxYTbxYTYJe8MGic4ElNgGi9AHgcgEmdwKd74FkdXxYTbxYTYGh83xYTYGjtPxYTbxYTbxYTYJe8IKdLwGk9buPTfxYTYFkNQLdb3yXzUKcrvxYTYLbbYGmtzxWDYEl9oJfcQMa7QNarMHdb3xYTbxYTbxYTYIp+YJdb4CneAEkdUGjNEHg8kKcLkEmdwMa7XxYTYNa7QGhs0FkNMKbbcEk9YHnd4El9v4TDEJfMPvQDcDrOwEpeYBpujxYTYJlNULbbZ3gIMDktYIf8UKeL8Ig8kIhMoMq+kFqOgNpeMUpOIii7wDmt0FrOsNa7QNabIKn98Wq+fwPzYCoeNBdKMCre2vhWYCpeYGjdIMbbbtOzcFmdwBrOvvOTY7jbH3QzJOmrH9Ri6CYnjuOTeVXW3tOTftNjf/TCxdZ4v0QDPuQDftNjdbb5Q+i6ydinPxYTYAr/AEktYGiM0Gis8ElNgFjdIFkdUJfMMJf8UIgcgFj9QGjNEHhswHg8kHhcoGkNQEldkKecELcroLdb0Dl9oCnd8Na7QKd78AdbwAcbgLb7gAbbUAecACmdwBjNAAhcsAgsgAfcPwSjcAouMAh9MBfsfxVDYAp+gBicX9WS/GdE3acD7lcDnuUDcAd8SrcF1GgJ/mZTr3UDL/bikZgbord6uaeGjyWjVYeJGNcW//ZC04f6F9bXzxcTT2ZzENlNEggbZleYfXX0XtXjftaTbHW07xd6RTAAAAuXRSTlMA/Y0DCkqYBd0oDOcW2ST4EA+TDsAYbz8E8xwK+hTSz8stIOVURDjt4dW2ZlT+xqODZx4H9/G6WTs1KhWtn5RzYeizakMx/vDTdlBNMuvAvrytrZV5VvfvraqIf3s6Ev7r6tKmj3xFOgj79t7Nw7CuXjAn+vX19fX06+m6lnleUyHs4N/Xyrqim4Vy+9LHuKONinpLRP7WwqmDcFxI+/rp59+5m46LaGXzlnpyW1kv5MvCubSwrquYk9pr4kMAAA9NSURBVHja7MGBAAAAAICg/akXqQIAAAAAAAAAAAAAAAAAAJg9uwtpKgwDOP6Yo/WFuYvREIy8qosRtUEio6CQKaLgTUSRHVpjSJs3QsVYrFi7yb5uMiYML9IQ8aPvYOQcbuAmOwfO4FApw8aZuulGMrVhodV7GhZEEMHeQ9jzg73scO7+5714znnRX1NoAMnB0AhIDpouFSA5ODsAyUFnwy0tD0cXIDk4eR0gGah4DyA5ePh2QDKw8A5AdLUCobAKTkBUVdQA0SFYccSjS9lbQVbdFcEMiCrvSyA8LGsBRJPySR9ZG1nWhF/x6BpitpP1LsueBUST/rFbD2BhOa4FEE19TC+AxsRxJpw8qGp1M30AWi4W6wFE0xDDVIGmLRaLaQHRoQFC72bclVAbi0br8FiLEkULEF6GeQ7QHI2O3VEAosKiBeIFY+yHxjHiHiAqFA5pT1cZjcYBuEpCB3GapsRi1ZG1l5T2qo6PBYMXawFR0WM1AOxwk9JV2lAwGLyM7y10GOw2UtprNMZdw80h4gYet9Dh5KXS/fF43DXYFAqFw/V4VkuHRypd7pZKv5oOhiOR+l2AKDDYeZsOakjorKt7+n14fBz3NB1anre2w0A8nsqmuqenIiMjWJoOM8/bLXAhlSKllwql8WWcBoWN5wUnPE2lEtlsfnIq4vc34TxNQ7tdEATzsCtBJOc/T4r+wKXDgIrPQkKzbYOurFR6bWFSHAkEbuIpIgUdUum6Z4lkLkF+yx9EMTDx8DqgojMLLMumu78mfeu5XHJtSRTfvT5/DVCxaRwskWbzmdXMei6ZnP8oihOjj/6PD9StanU5yEXVxhJcenE58yWT8SVLSGr/6O37sMmV7jl6cNv+Uzv3HtlSBoS6+qSkunLj/tYTktPFexIGUprjuDck9ezcXMa34ptf6Jx4e+wcbGYN+3w/NABxqPB/txoKygrXB5RQNDoT9106vZifmZ2dK1lZnbnV+enBPzToVZRtqPzN3tQrf1EKf3LG99M3du78N8oijAP4s91e23UPl90eu9tru13a7Yk9t6XSg8aW1rsUaUuDFqwnrSdeFQxR8AIEj6gxXtEY/wEd2265KhYTimhpC7GERImSgMQjXolx9p2377zvvMcu2kVj/PxgsgE28J15n3lm5q3lTsD8iJMFvGWIEw+w0Enj6/BvTp77/luc9R8//vj1+TO/PtEP/w5xFW4L4fbLc25MZJhMxSWluAaosyERe2hc0tciTjfwViNOLix00jjnT/E97cm93/1+/quvT/9y9mc8rbfeBVF16c6WZwshHKsJCRbL8jPokCJjnw9UJCOxVsB8iPAB4cqjs31Bkw7ljOH7w5M46+/Pf/v1z2fPnj7/3juXQPRc+uy+ZxsOsiVKe/7lAmMlUqMrcYASZwUiLKZ8I/+Npfw4WoHIJsNnhwV22Z0kZ86+k7P7zp3BE/v02bNfPf1k9KIuxJfCtS0Nl9XWXqIsFbCABYk0AWM9Umcyg4JtfMzrzXqwBupD2eozEWc18JrobF9Yl24Xgt6H7d8/O7v/t5+e/vb02Z/feD9aUffsawfY+cknnSOjo6PjYxMTe4ZvDbkn5LXXXtsaCvqWYiQWDww/0pBhBRkHmdA6L1B6X0pIrhN4lVEo0UTsdULOJOn9B2fn5g6eO/PDV6ejFfXyfY/0tjc0PBJyveBywWbAOphJWgYSCSakpQ5kOuivqHLloJCHrLDwUtft5fA5h64R8f3WyNzc3LkzT7/xYTTuBFKX7r//YGchaDEvRhIWD0h4ypEWixmUHwFdNmhIISW6GKKiR57zx9jI6NzcyAvvfbC8FxZaauGOne2gqRIxUkCiAGlrAkY6GblMPWiIoSU6GgpvU8oZC1XQsfEr3xqqiYXo086xAyTikbY+ENPr9SmIUwoEydts4CQww9tMGkhv6UDlhpgqA6jxtLXW+f193Ss8smE1hGSnk7OV6gLbah9XNLdIcv6Ez5lbq8Zx1mMTzzy5fBFcPA4jYpWAhJ12c1XVIbkFxZLlUA9Um8lk4r8xL4OTH0caPl1IogsIxyrSilsB9F67BREWvw8UJNXb0xAvbUOArVM6DLUBgHW9CWFmcufSopnzgQMHJvbceO27m+EiKUEyWdKRoCXcWAaEvlWHBHkuoFYjGQNguUxHUy2MaUAyau5ukBk0ITFLssKiutYK4CVboEogeq8RcqaFA6M579kz/VHR4+/eBRfBirDLWxwSDIBgAxKYEkCgNyFWvl5UfwaZo5BBWMYutV0gle1HrPVAVQuLaikiYoAXuwMHrZDzuJAzDjrkpV0XlHXqzY+ugQvkosHokMCrsptepljZK4Fqdqu0f/lkvy0MYSapA83xSKYexKoqkFyu7K+3DPoQoRP9Yg+Z0Go5D+OgiaKXXo24v659+MiRIy/DhYmhRxw2JGhVqS1tikHHAFWKZOIA85Aaa9JLS3SeH8nlWIFqRfPW5qxVWhYaSbqGLuGPu4Ba0qmV8/AwFzTx+nMRTuu3jzy15uEvCi+VW6SglzazxLJmJGgESp+B5lU4FRMdBComMzPDzZeMTE6WA7AmZgtTjyi33Va1oqnEqNQvdsynFxNIt6b7hEH3MptQE/372EFsU+fHSgvhxATOGZv8SKQoshO+B+8AqN34xcaNG6/g3BZyP9bZ2Xkfdi/nAeKeywFLKKaV1GUlix67XUtfpfhPyKIV3QASznLyhQkgUsI8EnU05roAH9k2uhizz43NAcSgjmmMqvmBIE+MJbG40cvsjRtGR1RzJkFTp56LoIDcfnsqtH9x+3WCpYIbBNfO28ycFsVJ2rhsxdUyHgRe+ihkssurwpp2i4nk4AQiQXhMElNAYGPHOaAjlb1K9nuy9ELto/JLDS6QWXPF8VFJzrRwBJmgi059+ebzEM5TRx5e9+DGuyFy2RWSfqJEcTXsUtoCNhuRoEC5X/QqnGgX64HwuBFR7FRYmXXNwEnKkJ9Nmd3CoTnzZKW1ukDRzRuPjY6TAs3kHAxOMjl/OX3rK+H/h4b45dVCuAB+utCYpWU3RqmP0xmASCp4CAkSk4CiDV6aB0TqmbbMi4h8B4gtkzYVXcKVDJWQT7+eLqpYRjOoKZw6OnNgRLYQBhWCnpwePrAEwom9DC5EPdO3tSHBBjrL8mgxbvKuXOmtSraZkMhKkDJYyL8bxBr5+sRsa9KyQSKF1jHMXK507NTIB80UNrzmqls3NTUbZAs0jvlQcJLNOTg8M9IPC8pDp2WmCzBnmsJmrxppGwCC7cdskhKdxz/vzLYmGZTPCX2icuwOgMQGErRT2vzkOUFD6p1TU8eCE6NsznzQtHBMHh4eGz2+FCLVe3cqhNVHa0KK7NzZx0z7yI/9BxTO833MkWi2m6RzCxt0mihFB/lgdyWJWUlRziEFKyETcXRxoGn555/j8jE8Lmo4cM7YJDuh752ZPXEFRCZ23RWfbglbrNt0iKCzz66wO7MhLSYPMJLySFYOEClliu16Zl/EDEhimaj1rsgxiuQYJTeNZjfth7SnNE56aubQGC3QoaAPi4Iuenzrrt39NZtr+ndGGnTPZ9t7tuxtB03piXQl9CSUcWwKq2EW0lDsAVYz3ZbLVt2A9PF3m4FRJe7XiyO41vHyg+EI25J9Hkp67JA058OH+aBf3/pujWj+Q2Ruugmgfe+Wa4ir513FuzyVmalppkRC2OLSPjXJiFTpbElAMUcP7EUAOWAjrDmk7CSoXMY30T+kpkCyqNZBOIVHj4aSHg1OiHMmQT/+3PO98FdsuRPgsr23NXCu5NzIeYyzCbBqC9KU5qQPs4rKFFBgV7ik8TEXBM1KzzsdVR09V1XjdpASnUg++SIImiQ9Mkxz5oJ+fFc//FXrPutZs31vYawKwMqyUBg+etagZFVjnB4UuEhWRslc7+ZnIdMudwBjpfhpqueHM15Jh2RRzYewHj12jEv6aHAY43O+9cUn70qFv652O75t7wEt3SicZNVrAfdae1eVE5TF0SrLnovoAsysZ4NOoE0fHY3qCHYCMRDW0hN80jNBvuE4fNUrNanwN60p1N6JmytQONsA+LdeeJaVKSHVAUM6qItRKdG0maN1fxtQJFpx57ae7l1U1dE6pa395AmS9NSJIJcznssQffpKFJadPptEPkTCLhxWUFXM2Wsbe3BM5FokFaaDtoRqrEbac2i75vh80scPBYM3vtMfCwsuVu3eW9sqB8lIYIMIOCqESUmxt1g2xYucwGJEX1KgbXQWU16c8lbSDuEMzR6fT3rs1qs29cLCW371lW+xbaHzIRSBOOZ4vx4ikKJQFPRZtJeQNshGUWqDfM7lAWm111WBiMFuNICgNcISvWRmZD7phqEaiIY1nZ0to/fR72YvqiuTJbrLmdVQVGOqIQI2hUHxWKQvmjnSaDlqBsJQxzTItI9eHKClonUVQhlJbCuZGy7nsRk+6Wc3LYLo2NFZA/33Xb2EF0t2U4JVTpBKlL7ckUA/5yVBBMja6c4GkTZm3uUiqty2ojk7ZbBPGGCbfD5UdJj1AODydZB9jt9KSzQt9eqGhvdwSd+/dDlETUsL/s8zeIeP2/TgIW5P6DBqvMxll76tYbawB6fanPwFnl7rIsDGZyy7fac5MwtxeX6xPStPmB0G6YhVgpbeaw8HQ0lf+eRmiKKdI0suWTJ+fQ3B7r3tenl3JnCbmavuyN8u69O8CMggn5VeI+iK4LXsTAPTDiaDhv4Xp6dx0s8M9UJU1baMjI5ftQioXDqBdD5g1UtXw3gkWAERqKO/V+UigL54ID+AzWkDCX0JktHFMCVa+53VV+6ZnJyefmZTLETboqEdQ+Kck/I1G7YURJVKrmsNoIq9ZnJ7FLYh8cysL2HfASnf5gCGvkuncb7iTAu3eFyy9Ut8lv/EJrjImMKRaAUZaxoS+MGDBIuTILxs2glTfqY1GKAvHsTRUc+xKY6kz29BgodWVysssgOgZvebp06d+od+7s1VGiPIBQVNMYJkMNMPBRCB9DhONohVx3FcQnaiz2Xeusp8U5Y/foVVdfC6B7LyjDmZ/nj2p+3McRwDqNhVVFT0xH/+x5Mjpy+DcFzWJLhQm5/AMe+G/0XZ7j/ZuYMaAGEgAIL1cB9M1ACuEFEBJSRN6IPgtCqurxkJK2C/OmROd/TaZiHb2X6ZN5jjjkK2eLtf5gbxXAUAAAAAAAAAAAAAAABgbRSMglEwCkbBKBgFo2DgAACUmRKg1mpWNwAAAABJRU5ErkJggg=='/></td></tr></table>`
    },
    "footer": {
        "height": "28mm",
        "contents": {

            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value

        }
    },
    "timeout": 10000
};

pdfCreate = (data, callback) => {
    if (!data[x].html) {

    }
    else {
     // console.log("ghyugyfgytfytfyt")
        pdf.create(data[x].html, options).toFile('./businesscard.pdf', function (err, res) {
            if (err) return
            if (res) {
             // console.log("res")
                if (!res.filename) {

                }
                else {
                    data[x]['pdf'] = res.filename;
                }
                data[x]['filename'] = data[x].invce_num + data[x].invce_num + '.pdf';
                data[x]['path'] = data[x].pdf
                x++
                if (x < data.length) {
                    pdfCreate(data, callback);
                }
                else if (x == data.length) {
                    callback(x)
                }

            }
        })
    }

}

sendmail = (data, callback) => {
    mail.sendMail(data[y], function (error, results) {
        if (error)
            if (results) {
                y++
                if (y < data.length) {
                    sendmail(data, callback);
                }
                else if (y == data.length) {
                    callback(results)
                }
            }
    })
}



exports.generatexmlf = function (caf) {
    var d = new Date();
    var n = ((d.getMonth() + 1) < 10 ) ?  '0'+(d.getMonth()+1) : d.getMonth()+1;
    var y = d.getFullYear();
    var dt = ((d.getDate()) < 10 ) ?  '0'+(d.getDate()) : d.getDate();
    var res = y.toString().concat(n.toString(), dt.toString());

    var count = 0;
    var finlres = []

    return new Promise(function (resolve, reject) {
        caf.filter(element => {
            if (element.srnlo === "DSN") {
                fs.mkdir(`/glits/web/scripts/admin/bin/ZTC/data/${res}`, function (e) {
                    if (!e || (e && e.code === 'EEXIST')) {
                    } else {
                     // console.log(e);
                    }
                })
                fs.readFile(dsn_tmplt, 'utf8', function (err, data) {
                    var finaldt = _.cloneDeep(json.prcs_tmplte_get_xml(data, element));
                    let var1 = element.cpeslno.slice(0,4).toUpperCase();
                    let var2 = element.cpeslno.slice(4,element.cpeslno.length).toLowerCase();
                    let file_nm = `${var1}${var2}`;
                    fs.writeFile(`/glits/web/scripts/admin/bin/ZTC/data/${res}/${file_nm}.xml`, finaldt, function (err, result) {
                        if (err) {
                         console.log(err)
                            reject(err)
                        } else {
                            // console.log("Xml file successfully updated.")
                            count++
                            finlres.push({ caf_id: element.caf_id, path:`${res}`,filnm:`${file_nm}.xml`,dsn_path: `${dsn_path}/${res}/${file_nm}.xml`, dsn_cnt: element.file_cnt, zte_cnt: 0, zte_path: "" })
                            if (count == caf.length) {
                                resolve(finlres)
                            }
                        }
                    })
                })
            }
            else {
                fs.mkdir(`/glits/web/scripts/admin/bin/ZTC/data/${res}`, function (e) {
                    if (!e || (e && e.code === 'EEXIST')) {
                    } else {
                     // console.log(e);
                    }
                })
                fs.readFile(zte_tmplt, 'utf8', function (err, data) {
                    var finaldt = _.cloneDeep(json.prcs_tmplte_get_xml(data, element));
                    let file_nm = "ztc_" + element.cpeslno;
                    fs.writeFile(`/glits/web/scripts/admin/bin/ZTC/data/${res}/${file_nm}`, finaldt, function (err, result) {
                        if (err) {
                         console.log(err)
                            reject(err)
                        } else {
                            // console.log("Yml file successfully updated.")
                            count++
                            finlres.push({ caf_id: element.caf_id, dsn_path: ``, dsn_cnt: 0, zte_cnt: element.file_cnt,path:`${res}`,filnm:`${file_nm}`, zte_path: `${zte_path}/${res}/${file_nm}` })
                            if (count == caf.length) {
                                resolve(finlres)
                            }

                        }
                    })
                })

            }
        })

    })

}

exports.generateHtml = function (results, invoicedata, callback) {
    var finaldt = _.cloneDeep(json.prcs_tmplte_get_xml(results[0].rndr_ejs_html, invoicedata[0]))
    rndrtmpt = ejs.render(finaldt, {}, {});
    fs.writeFile(`./invoice.html`, rndrtmpt, function (err, result) {
        if (err) {
         // console.log("err")
        } else {
         // console.log("Html file successfully updated.")
        }
    })
}
exports.generatePdf = function (results, invoicedata, callback) {
 console.log("generatePdf", invoicedata.length);
    var count = 0;
    function generate_invoice(data) {
        let rndrtmpt = ejs.render(results[0].rndr_ejs_html, {data:data}, {});
        pdf.create(rndrtmpt, options).toFile(`pdf_invoice/${data.cstmr_id}.pdf`, function (err, res) {
            console.log(count);
            if (err) {
                count++;
                invoicedata[count - 1]['pdfurl'] = null;
                invoicedata[count - 1]['status'] = 'fail';
                if (count < invoicedata.length) {
                    generate_invoice(invoicedata[count])
                }
                if (count == invoicedata.length) {
                    callback(null, invoicedata)
                }
            }
            if (res) {
                count++
                invoicedata[count - 1]['pdfurl'] = res.filename;
                invoicedata[count - 1]['status'] = 'success';
                if (count < invoicedata.length) {
                    generate_invoice(invoicedata[count])
                }
                if (count == invoicedata.length) {
                    callback(null, invoicedata)
                }
            }
        })
    }
    generate_invoice(invoicedata[0])


}







