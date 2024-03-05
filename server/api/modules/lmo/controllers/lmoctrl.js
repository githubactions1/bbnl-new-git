const lmoMdl = require(appRoot + '/server/api/modules/lmo/models/lmomdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);





exports.get_lmos = function (req, res) {

    console.log(req.params)
    lmoMdl.get_lmosMdl(req.params,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


exports.get_trmsCndtnsCtrl = function (req, res) {

 
    lmoMdl.get_trmsCndtnsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : insrtLmo_mrchnt_roles
* Parameters     : req,res()
* Description    : To insert merchant roles
* Change History :
* 17/08/2023    - Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.insrtLmo_mrchnt_roles = function (req, res) {
    lmoMdl.getMrchtName(req.body.data,req.user, (err, results) => {
        console.log(err)
        console.log("results",results);
        console.log("results",results.length);
        console.log("results",results[0]);
        if(results.length > 0){
            console.log("results[0].enrlt_nu",results[0].enrlt_nu);
            console.log("results[0].enrlt_nu",'LMO'+results[0].enrlt_nu+'');
            let lmoCode = 'LMO'+results[0].enrlt_nu + '';
            lmoMdl.updateagnttable(req.body.data,lmoCode,req.user).then(()=>{
                lmoMdl.insrtnew_mrchnt_rolesM(req.body.data,lmoCode,req.user, (err, results) => {
                    if (err) {
                        console.log("err 1 ",err);
                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                    }
                    else if (results) {
                        let id = results.insertId
                        lmoMdl.insrt_mrchnt_usr_rel(id, req.body.data, req.user, (err, results) => {
                            if (err) {
                                console.log("err 2 ",err);
                                df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                            }
                            else if (results) {
                                lmoMdl.insrt_mrcht_usr_mnus(id, req.body.data,req.user, (err, results) => {
                                    if (err) {
                                        console.log("err 3 ",err);
                                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                                    }
                                    else if (results) {
                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                    }
        
                                })
                            }
                        })
                    }
                })
            }).catch((error) => {
                console.log("error",error);
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            })
            
        } else {
            let err = 'No LMO DATA'
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        
    })
}