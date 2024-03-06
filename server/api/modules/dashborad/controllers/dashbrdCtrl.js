const dashbrdMdl = require(appRoot + '/server/api/modules/dashborad/models/dashbrdMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var request = require('request');

/**************************************************************************************
* Controller     : Get Cpe Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 04/12/2021    - Sravani Machina - Initial Function
***************************************************************************************/
exports.planWiseDataCtrl = (req, res) => {
    var fnm = "get_AllCpeCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.planWiseDataMdl(req.params.year,req.params.month, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Cpe Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 06/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllCpeCounts = (req, res) => {
    var fnm = "get_AllCpeCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllCpeCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Cpe Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 06/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllAgentsCounts = (req, res) => {
    var fnm = "get_AllAgentsCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllAgentsCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Cpe Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 06/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllCafCounts = (req, res) => {
    var fnm = "get_AllCafCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllCafCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Share Count
* Parameters     : None
* Description    : 
* Change History :
* 20/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllShareCountsCtrl = (req, res) => {
    var fnm = "get_AllShareCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllShareCountsMdl(req.params.year,req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Share Count
* Parameters     : None
* Description    : 
* Change History :
* 20/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllShareCtrl = (req, res) => {
    var fnm = "get_AllShareCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllShareMdl(req.params.year,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Share Count
* Parameters     : None
* Description    : 
* Change History :
* 20/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getShareDtlsCtrl = (req, res) => {
    var fnm = "getShareDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getShareDtlsMdl(req.params.year, req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Share Count
* Parameters     : None
* Description    : 
* Change History :
* 20/03/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getCafCntsCtrl = (req, res) => {
    var fnm = "getCafCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCafCntsMdl(req.params.year,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getCafLst7DayCntsCtrl
* Parameters     : None
* Description    : Get Last 7 days CAF operations count
* Change History :
* 14/04/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getCafLst7DayCntsCtrl = (req, res) => {
    var fnm = "getCafLst7DayCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCafLst7DayCntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getCafTdyCntsCtrl
* Parameters     : None
* Description    : Get today CAF operations count
* Change History :
* 14/04/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getCafTdyCntsCtrl = (req, res) => {
    var fnm = "getCafLst7DayCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCafTdyCntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getCrntPrvsMnthCntsCtrl
* Parameters     : None
* Description    : Get current/prevois total CAF/operations/voip counts
* Change History :
* 14/04/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getCrntPrvsMnthCntsCtrl = (req, res) => {
    var fnm = "getCafLst7DayCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCrntPrvsMnthCntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Lmo Caf Count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllLmoCafCountsCtrl = (req, res) => {
    var fnm = "get_AllLmoCafCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllLmoCafCountsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Lmo Caf Count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_getlmoprepaiddataCtrl = (req, res) => {
    var fnm = "get_getlmoprepaiddataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_getlmoprepaiddataMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Lmo Caf Count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.postlmoprepaiddataCtrl = (req, res) => {
    var fnm = "postlmoprepaiddataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    dashbrdMdl.postlmoprepaiddataMdl(req_body,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
var replaceQuotesFromStrng = (body) => {
    Object.keys(body).filter((k) => {
        if (body[k] && typeof body[k] == "string") {
            body[k] = `${body[k].replace(/["']/g, "")}`;
        }
        else if (body[k] == null) {
            body[k] = "";
        }
    })

    return body;
}

/**************************************************************************************
* Controller     : Get Lmo Cpe Count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllLmoCpeCountsCtrl = (req, res) => {
    var fnm = "get_AllLmoCpeCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllLmoCpeCountsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Lmo Caf Operations Count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getCafLst6MnthsCntsCtrl = (req, res) => {
    var fnm = "getCafLst6MnthsCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCafLst6MnthsCntsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Lmo Caf Operations Count current month
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getCafMnthCntsCtrl = (req, res) => {
    var fnm = "getCafMnthCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCafMnthCntsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OltCountsCtrl = (req, res) => {
    var fnm = "get_OltCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_OltCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OltHourlCountsCtrl = (req, res) => {
    var fnm = "get_OltHourlCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_OltHourlCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Ont Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OntCountsCtrl = (req, res) => {
    var fnm = "get_OntCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_OntCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Ont Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_OntHourlCountsCtrl = (req, res) => {
    var fnm = "get_OntHourlCountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_OntHourlCountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : LMO Cafs Status wise counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getLmoStsCntsCtrl = (req, res) => {
    var fnm = "getLmoStsCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getLmoStsCntsMdl(req.user)
        .then((results) => {
            if (results && results.length >0) {
                this.selectedParamskeys = Object.keys(results[0]).map(keys =>
                    ({ value: results[0][keys], hdr: keys }));
                console.log('this.selectedParamskeys ---------------');
                console.log(this.selectedParamskeys);
            df.formatSucessRes(req, res, this.selectedParamskeys, cntxtDtls, fnm, {});
            }
            else{
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});  
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : LMO VOIP Counts
* Parameters     : None
* Description    : 
* Change History :
* 22/06/2020    - 
***************************************************************************************/
exports.getLmoVoipDtlsCtrl = (req, res) => {
    var fnm = "getLmoVoipDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.params.id)
    dashbrdMdl.getLmoVoipDtlsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Cafs Status wise counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getStsCntsCtrl = (req, res) => {
    var fnm = "getStsCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getStsCntsMdl(req.user)
        .then((results) => {
            if (results && results.length > 0) {
                this.selectedParamskeys = Object.keys(results[0]).map(keys =>
                    ({ value: results[0][keys], hdr: keys }));
                df.formatSucessRes(req, res, this.selectedParamskeys, cntxtDtls, fnm, {});
            }
            else {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Live Tv Watch Count Latest
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_LiveTvWatchCntCtrl = (req, res) => {
    var fnm = "get_LiveTvWatchCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_LiveTvWatchCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Voip Call Count Current date
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipCallCntCtrl = (req, res) => {
    var fnm = "get_VoipCallCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipCallCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get disrtict wise olts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_distrctWseOltsCtrl = (req, res) => {
    var fnm = "get_distrctWseOltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_distrctWseOltsMdl(req.params.dstrctid,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : Get disrtict wise Nt Operational olts
* Parameters     : None
* Description    : 
* Change History :
* 02/09/2020    - Madhuri Nune - Initial Function
***************************************************************************************/
exports.get_distrctWseNtOperationalOltsCtrl = (req, res) => {
    var fnm = "get_distrctWseNtOperationalOltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_distrctWseNtOperationalOltsMdl(req.params.dstrctid,req.params.mandalid,req.params.oltid,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Iptv today Counts
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_IptvTdyCntsCtrl = (req, res) => {
    var fnm = "get_IptvTdyCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_IptvTdyCntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Iptv live status By date
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_IptvHourlyLiveStsCtrl = (req, res) => {
    var fnm = "get_IptvHourlyLiveStsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_IptvHourlyLiveStsMdl(req.params.date,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getLmoStsCntsDataCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getLmoStsCntsDataCtrl = function (req, res) {
    var fnm = "getLmoStsCntsDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    dashbrdMdl.getLmoStsCntsDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getStsCntsDataCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getStsCntsDataCtrl = function (req, res) {
    var fnm = "getStsCntsDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    dashbrdMdl.getStsCntsDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Iptv live status By month
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_IptvMnthStsCtrl = (req, res) => {
    var fnm = "get_IptvMnthStsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_IptvMnthStsMdl(req.params.mnth, req.params.year,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Addons count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AddonsCntsCtrl = (req, res) => {
    var fnm = "get_AddonsCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AddonsCntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : voip day wise 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipDayWiseDataCtrl = (req, res) => {
    var fnm = "get_VoipDayWiseDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipDayWiseDataMdl(req.params.year,req.params.mnth,req.user)
        .then((results) => {
            var new_each_day=[]
			if(results.length > 0){
				for (let index = 1; index <= 31; index++) {
					var type = index;
					let d = {
						"day": type,
						"prm_nm":results[0].prm_nm,
						"INCOMING CALLS": results[0][`day_${index}`] !=0 ? results[0][`day_${index}`]:null,
						"OUTGOING CALLS": results[1][`day_${index}`] !=0 ? results[1][`day_${index}`]:null,
						"IN NETWORK CALLS": results[2][`day_${index}`] !=0 ? results[2][`day_${index}`]:null,
						"LOCAL CALLS": results[3][`day_${index}`] !=0 ? results[3][`day_${index}`]:null,
						"STD CALLS": results[4][`day_${index}`] !=0 ? results[4][`day_${index}`]:null,
						"ISD CALLS": results[5][`day_${index}`] !=0 ? results[5][`day_${index}`]:null,

					};
					new_each_day.push(d)
				}
			}
            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch((error) => {
			console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : voip Hourly wise 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipHorlyWiseDataCtrl = (req, res) => {
    var fnm = "get_VoipHorlyWiseDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipHorlyWiseDataMdl(req.params.date,req.user)
        .then((results) => {
            var new_each_day=[]
			if(results.length > 0){
				for (let index = 1; index <= 24; index++) {
					var type = index;
					let d = {
						"hr": type == 24 ? 0 : type,
						"hrly_nm": type == 24 ? '00-01':'',
						"prm_nm":results[0].prm_nm,
						"INCOMING CALLS": results[0][`hr_${index}`],
						"OUTGOING CALLS": results[1][`hr_${index}`],
						"IN NETWORK CALLS": results[2][`hr_${index}`],
						"LOCAL CALLS": results[3][`hr_${index}`],
						"STD CALLS": results[4][`hr_${index}`],
						"ISD CALLS": results[5][`hr_${index}`]
						

					};
					new_each_day.push(d)
				}
			}
            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch((error) => {
			console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : voip Monthly Charges 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipMnthlyChrgesDataCtrl = (req, res) => {
    var fnm = "get_VoipMnthlyChrgesDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipMnthlyChrgesDataMdl(req.params.year,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : getMnthlyAgntOptnCntsCtrl
* Parameters     : None
* Description    : Get Monthly LMO wise opeartions counts
* Change History :
* 25/05/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getMnthlyAgntOptnCntsCtrl = (req, res) => {
    var fnm = "getMnthlyAgntOptnCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getMnthlyAgntOptnCntsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Hsi daywsie Usage 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsidayWiseUsgeCtrl = (req, res) => {
    var fnm = "get_HsidayWiseUsgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_HsidayWiseUsgeMdl(req.params.mnth,req.params.year,req.user)
        .then((results) => {
            let day_keys = Object.keys(results[0])
            let new_each_day = [];
            for (let index = 1; index <= 31; index++) {
                var type = index;
                let d = {
                    "day": type,
                    "upload": results[0][`day_${index}_U`],
                    "download": results[0][`day_${index}_D`],
                };
                new_each_day.push(d)
            }

            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Hsi Monthly Wise Usage 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsimnthWiseUsgeCtrl = (req, res) => {
    var fnm = "get_HsimnthWiseUsgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_HsimnthWiseUsgeMdl(req.params.year,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    }
 /***************************************************************************************/            
/* Controller     : getDstrtCrntPrvsMnthCntsCtrl
* Parameters     : None
* Description    : Get operations month wise
* Change History :
* 25/05/2020    - Srujana M - Initial Function
/***************************************************************************************/
exports.getDstrtCrntPrvsMnthCntsCtrl = (req, res) => {
    var fnm = "getDstrtCrntPrvsMnthCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getDstrtCrntMnthCntsMdl(req.body.data,req.user)
        .then((crntMnthRes) => {
            dashbrdMdl.getDstrtPrvsMnthCntsMdl(req.body.data,req.user)
            .then((prvMnthRes) => {
                df.formatSucessRes(req, res, {crntMnthRes,prvMnthRes}, cntxtDtls, fnm, {});
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getDstrtPrvsMnthShreCntsCtrl
* Parameters     : None
* Description    : Get operations month wise
* Change History :
* 25/05/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getDstrtPrvsMnthShreCntsCtrl = (req, res) => {
    var fnm = "getDstrtPrvsMnthShreCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getDstrtPrvsMnthIndvShreCntsMdl(req.user)
        .then((indvlRes) => {
            dashbrdMdl.getDstrtPrvsMnthEntShreCntsMdl(req.user)
            .then((entRes) => {
                df.formatSucessRes(req, res, {indvlRes,entRes}, cntxtDtls, fnm, {});
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : voip Monthly Charges 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipTotalCntCtrl = (req, res) => {
    var fnm = "get_VoipCrrntMnthCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipTotalCntMdl(req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : get_AllMnthlyRvnueShareCtrl
* Parameters     : None
* Description    : 
* Change History :
* 27/05/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.get_AllMnthlyRvnueShareCtrl = (req, res) => {
    var fnm = "get_AllMnthlyRvnueShareCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllMnthlyRvnueShareMdl(req.params.year,req.user)
        .then((results) => {
            var common_feilds = ['s_no','invce_yr','invce_mm','instl_dstrct_id','TOT_CAFS_INVOICED','INV_CAFS_INVOICED','dstrt_nm',
            'ENT_CAFS_INVOICED','NEW_CAFS_INVOICED','TOTAL_INVOICE_AMOUNT','INVOICE_AMOUNT','INVOICE_TAX','APSFL_SHARE',
            'LMO_SHARE','MSO_SHARE','BOX_INVOICED_ONLY_AMOUNT','BOX_ONLY_INVOICED_CAFS','PRORATED_BILL_CAFS','VOIP_INVOICED','ADDONS_INVOICED'];

            var arrFeilds = ['s_no','agnt_cd','agnt_nm','instl_dstrct_id','agnt_cd','agnt_nm','TOT_CAFS_INVOICED','INV_CAFS_INVOICED',
            'ENT_CAFS_INVOICED','NEW_CAFS_INVOICED','TOTAL_INVOICE_AMOUNT','INVOICE_AMOUNT','INVOICE_TAX','APSFL_SHARE',
            'LMO_SHARE','MSO_SHARE','BOX_INVOICED_ONLY_AMOUNT','BOX_ONLY_INVOICED_CAFS','PRORATED_BILL_CAFS','VOIP_INVOICED','ADDONS_INVOICED'];

            var arrName = 'lmoDtls';
            var groupByKey = 'invce_mm';
            var sortKey = 'agnt_id';
            var rvnuDtlsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, rvnuDtlsArray, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Hsi Current Month Uasge
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsiCrrntMnthCntCtrl = (req, res) => {
    var fnm = "get_HsiCrrntMnthCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_HsiCrrntMnthCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    }
    /**************************************************************************************
* Controller     : Hsi Current Month Uasge
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsitdyprvsDayCntCtrl = (req, res) => {
    var fnm = "get_HsitdyprvsDayCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_HsitdyprvsDayCntMdl(req.user)
        .then((results) => {
            console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    }
/**************************************************************************************
* Controller     : Hsi  Uasge cafs count
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_HsiMnthWiseUsgCafsCtrl = (req, res) => {
    var fnm = "get_HsiMnthWiseUsgCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_HsiMnthWiseUsgCafsMdl(req.params.year,req.user)
        .then((results) => {

            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    }
/**************************************************************************************
* Controller     : voip Current Month 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipCurrntMnthCntCtrl = (req, res) => {
    var fnm = "get_VoipCrrntMnthCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipCurrntMnthCntMdl(req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : voip Today calls count 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_VoipUsedPhneCntCtrl = (req, res) => {
    var fnm = "get_VoipUsedPhneCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_VoipUsedPhneCntMdl(req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : Get Enterprise caf summarycounts
* Parameters     : None
* Description    : 
* Change History :
* 08/06/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getEntCafSmryCntsCtrl = (req, res) => {
    var fnm = "getEntCafSmryCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntCafSmryCntsMdl(req.user)
        .then((cafresults) => {
            if(cafresults){
                dashbrdMdl.getEntCafTrmndCrtMnthCntsMdl(req.user)
                .then((cafTrmndresults) => {
                    df.formatSucessRes(req, res, {cafresults,cafTrmndresults}, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Enterprise caf top ten
* Parameters     : None
* Description    : 
* Change History :
* 08/06/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getEntTopTenCafDtlsCtrl = (req, res) => {
    var fnm = "getEntTopTenCafDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntTopTenCafDtlsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Enterprise caf top ten
* Parameters     : None
* Description    : 
* Change History :
* 08/06/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getEntCafsLast6MnthsPrvCtrl = (req, res) => {
    var fnm = "getEntCafsLast6MnthsPrvCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntCafsLast6MnthsPrvMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Cafs deatils By customer 
* Parameters     : None
* Description    : 
* Change History :
* 17/06/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafsCtrl = (req, res) => {
    var fnm = "get_CafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_CafsMdl(req.params.id,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : Get Cafs deatils By customer 
* Parameters     : None
* Description    : 
* Change History :
* 17/06/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafsHsiCtrl = (req, res) => {
    var fnm = "get_CafsHsiCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_CafsHsiMdl(req.params.id,req.user)
    .then((results) => {
        let new_each_day = [];
        for (let index = 1; index <= 31; index++) {
            var type = index;
            let d = {
                "day": type,
                "total":results[0].total,
                "ttl_dwn":results[0].TD,
                "ttl_up":results[0].TU,
                "upload": results[0][`day_${index}_TU`],
                "download": results[0][`day_${index}_TD`],
            };
            new_each_day.push(d)
        }
        df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : Get Cafs deatils By customer 
* Parameters     : None
* Description    : 
* Change History :
* 17/06/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafsPackgesCtrl = (req, res) => {
    var fnm = "get_CafsPackgesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_CafsPackgesMdl(req.params.id,req.user)
    .then((results) => {
        if (results.length) {
            var common_feilds = [];
            var arrFeilds = ['lnge_nm'];
            var arrName = 'chnlDtls';
            var groupByKey = 'cre_srvce_id';
            var sortKey = ''
            cstmrPckgsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            cstmrPckgsArray.forEach(Element => {
            var common_feilds = ['cre_srvce_id', 'srvcpk_nm', 'pckge_nm', 'caf_type_id', 'cre_srvce_nm', 'srvcpk_id', 'expry_dt','plan_exp','chrge_at','gst_at'];
            var arrFeilds = ['chnle_nm', 'lnge_nm','cre_srvce_id', 'chnle_cd', 'srvcpk_nm', 'cre_srvce_nm','pckge_nm' ];
            var arrName = 'opts';
            var groupByKey = 'lnge_id';
            var sortKey = ''
                Element.chnlDtls = jsonUtils.groupJsonByKey(Element.chnlDtls, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            })
        }
        df.formatSucessRes(req, res, cstmrPckgsArray, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : Get Cafs deatils By customer 
* Parameters     : None
* Description    : 
* Change History :
* 17/06/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafsVoipCtrl = (req, res) => {
    var fnm = "get_CafsVoipCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_CafsVoipMdl(req.params.id,req.params.year,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : Get Cafs deatils By customer 
* Parameters     : None
* Description    : 
* Change History :
* 26/06/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafsHSIlimitCtrl = (req, res) => {
    var fnm = "get_CafsHSIlimitCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_CafsHSIlimitMdl(req.params.id,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : Get Cafs count of ill connections
* Parameters     : None
* Description    : 
* Change History :
* 12/08/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_illConnctnsCntCtrl = (req, res) => {
    var fnm = "get_illConnctnsCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_illConnctnsCntMdl(req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
/**************************************************************************************
* Controller     : Get Cafs count of ill connections
* Parameters     : None
* Description    : 
* Change History :
* 12/08/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_AllillCafsCtrl = (req, res) => {
    var fnm = "get_AllillCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_AllillCafsMdl(req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : Get Cafs count of ill connections hsi uage
* Parameters     : None
* Description    : 
* Change History :
* 17/08/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_LeasdCafsHsiCtrl = function (req, res) {

    dashbrdMdl.get_LeasdCafsHsiMdl(req.params.id, req.user)
        .then(function (results) {
           var common_feilds = ['s_no', 'yr_ct', 'mnt_ct', 'TD', 'TU', 'total', 'mnth_usge_lmt_ct'];
            var arrFeilds = ['day_1_TU', 'day_1_TD', 'day_2_TU', 'day_2_TD', 'day_3_TU', 'day_3_TD', 'day_4_TU', 'day_4_TD', 'day_5_TU', 'day_5_TD', 'day_6_TU', 'day_6_TD', 'day_7_TU', 'day_7_TD', 'day_8_TU', 'day_8_TD', 'day_9_TU', 'day_9_TD', 'day_10_TU', 'day_10_TD', 'day_11_TU', 'day_11_TD', 'day_12_TU', 'day_12_TD', 'day_13_TU', 'day_13_TD', 'day_14_TU', 'day_14_TD', 'day_15_TU', 'day_15_TD', 'day_16_TU', 'day_16_TD', 'day_17_TU', 'day_17_TD', 'day_18_TU', 'day_18_TD', 'day_19_TU', 'day_19_TD', 'day_20_TU', 'day_20_TD', 'day_21_TU', 'day_21_TD', 'day_22_TU', 'day_22_TD', 'day_23_TU', 'day_23_TD', 'day_24_TU', 'day_24_TD', 'day_25_TU', 'day_25_TD', 'day_26_TU', 'day_26_TD', 'day_27_TU', 'day_27_TD', 'day_28_TU', 'day_28_TD', 'day_29_TU', 'day_29_TD', 'day_30_TU', 'day_30_TD', 'day_31_TU', 'day_31_TD'];
            var arrName = 'eachday';
            var groupBy = 'mnt_ct';
            var sortKey = 'mnt_ct';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : Get Cafs count of ill connections hsi uage
* Parameters     : None
* Description    : 
* Change History :
* 17/08/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_CafHsiDataCtrl = function (req, res) {

    dashbrdMdl.get_CafHsiDataMdl(req.params.mnth,req.params.year,req.params.id, req.user)
        .then(function (results) {
           var common_feilds = ['s_no', 'yr_ct', 'mnt_ct', 'TD', 'TU', 'total', 'mnth_usge_lmt_ct'];
            var arrFeilds = ['day_1_TU', 'day_1_TD', 'day_2_TU', 'day_2_TD', 'day_3_TU', 'day_3_TD', 'day_4_TU', 'day_4_TD', 'day_5_TU', 'day_5_TD', 'day_6_TU', 'day_6_TD', 'day_7_TU', 'day_7_TD', 'day_8_TU', 'day_8_TD', 'day_9_TU', 'day_9_TD', 'day_10_TU', 'day_10_TD', 'day_11_TU', 'day_11_TD', 'day_12_TU', 'day_12_TD', 'day_13_TU', 'day_13_TD', 'day_14_TU', 'day_14_TD', 'day_15_TU', 'day_15_TD', 'day_16_TU', 'day_16_TD', 'day_17_TU', 'day_17_TD', 'day_18_TU', 'day_18_TD', 'day_19_TU', 'day_19_TD', 'day_20_TU', 'day_20_TD', 'day_21_TU', 'day_21_TD', 'day_22_TU', 'day_22_TD', 'day_23_TU', 'day_23_TD', 'day_24_TU', 'day_24_TD', 'day_25_TU', 'day_25_TD', 'day_26_TU', 'day_26_TD', 'day_27_TU', 'day_27_TD', 'day_28_TU', 'day_28_TD', 'day_29_TU', 'day_29_TD', 'day_30_TU', 'day_30_TD', 'day_31_TU', 'day_31_TD'];
            var arrName = 'eachday';
            var groupBy = 'mnt_ct';
            var sortKey = 'mnt_ct';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : Get Cafs count of ill connections
* Parameters     : None
* Description    : 
* Change History :
* 17/08/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.get_LesdcstmrInvceCtrl = (req, res) => {
    var fnm = "get_AllillCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_LesdcstmrInvceMdl(req.params.year,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : Get Olts 
* Parameters     : None
* Description    : 
* Change History :
* 15/09/2020    - Madhuri Nune - Initial Function
***************************************************************************************/
exports.get_oltsCtrl = (req, res) => {
    var fnm = "get_oltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_oltsMdl(req.params.dstid,req.params.mndlid,req.user)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getEntpCstmroltcountsCtrl = (req, res) => {
    var fnm = "getEntpCstmroltcountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntpCstmroltcountsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Inactive Hourly Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/05/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getEntpCstmrHourloltcountsCtrl = (req, res) => {
    var fnm = "getEntpCstmrHourloltcountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntpCstmrHourloltcountsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getEntpCstmronucountsCtrl = (req, res) => {
    var fnm = "getEntpCstmronucountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntpCstmronucountsMdl(req.params,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getEntpCstmrHourlyonucountsCtrl = (req, res) => {
    var fnm = "getEntpCstmrHourlyonucountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntpCstmrHourlyonucountsMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getEntpCstmrBndWdthCtrl = (req, res) => {
    var fnm = "getEntpCstmrBndWdthCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getEntpCstmrBndWdthMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getBndWdthByCafWseCtrl = (req, res) => {
    var fnm = "getBndWdthByCafWseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getBndWdthByCafWseMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getBndWdthPrvsMnthCtrl = (req, res) => {
    var fnm = "getBndWdthPrvsMnthCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getBndWdthPrvsMnthCMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Olt Active and Inactive Counts
* Parameters     : None
* Description    : 
* Change History :
* 01/12/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getTdyBndWdthCtrl = (req, res) => {
    var fnm = "getTdyBndWdthCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getTdyBndWdthMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Hsi daywsie Usage 
* Parameters     : None
* Description    : 
* Change History :
* 29/04/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getCstmrhsiMnthWseCtrl = (req, res) => {
    var fnm = "getCstmrhsiMnthWseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getCstmrhsiMnthWseMdl(req.params.mnth,req.params.year,req.params.id,req.user)
        .then((results) => {
            let new_each_day = [];
            console.log("sravani")

            for (let index = 1; index <= 31; index++) {
                var type = index;
                let d = {
                    "day": type,
                    "upload": results[0][`day_${index}_U`],
                    "download": results[0][`day_${index}_D`],
                };
                new_each_day.push(d)
            }

            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getentcstmrdt
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getentcstmrdt = function (req, res) {
    dashbrdMdl.getEntCstmrdtMdl(req.params.id,req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });


}
/**************************************************************************************
* Controller     : getDstrctSmmryCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getDstrctSmmryCtrl = function (req, res) {
    dashbrdMdl.getDstrctSmmryMdl(req.params.id,req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });


}
/**************************************************************************************
* Controller     : getCafHsimnthWiseUsgeCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getCafHsimnthWiseUsgeCtrl = function (req, res) {
    var fnm = "getCafHsimnthWiseUsgeCtrl";
    dashbrdMdl.getcafhsiusagedataMdl(req.params.id, req.params.yr,req.params.mnth,req.user)
        .then(function (results) {
            let new_each_day = [];
            for (let index = 1; index <= 31; index++) {
                var type = index;
                let d = {
                    "day": type,
                    "total":results[0].total,
                    "ttl_dwn":results[0].TD,
                    "ttl_up":results[0].TU,
                    "upload": results[0][`day_${index}_TU`],
                    "download": results[0][`day_${index}_TD`],
                };
                new_each_day.push(d)
            }
            df.formatSucessRes(req, res, new_each_day, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });


}

/**************************************************************************************
* Controller     : Get Enterprise caf summarycounts
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.getbbnlEntCafSmryCntsCtrl = (req, res) => {
    var fnm = "getbbnlEntCafSmryCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getbbnlEntCafSmryCntsMdl(req.params.apsflBbnl,req.user)
        .then((cafresults) => {
            if(cafresults){
                dashbrdMdl.getbbnlEntCafTrmndCrtMnthCntsMdl(req.params.apsflBbnl,req.user)
                .then((cafTrmndresults) => {
                    df.formatSucessRes(req, res, {cafresults,cafTrmndresults}, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Enterprise caf top ten
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.getbbnlEntTopTenCafDtlsCtrl = (req, res) => {
    var fnm = "getbbnlEntTopTenCafDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getbbnlEntTopTenCafDtlsMdl(req.params.apsflBbnl,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Enterprise caf top ten
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.getbbnlEntCafsLast6MnthsPrvCtrl = (req, res) => {
    var fnm = "getbbnlEntCafsLast6MnthsPrvCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.getbbnlEntCafsLast6MnthsPrvMdl(req.params.apsflBbnl,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Cpe Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 07/08/2023    - Ramsh Patlola - Initial Function
***************************************************************************************/
exports.get_BbnlAllCafCounts = (req, res) => {
    var fnm = "get_BbnlAllCafCounts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.get_BbnlAllCafCountsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : dasanCreateOnuCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.dasanCreateOnuCtrl = (req, res) => {
    var fnm = "dasanCreateOnuCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/dasanCreateOnu",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("dasanCreateOnuCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("dasanCreateOnuCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : dasanCreateOnuHsiCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.dasanCreateOnuHsiCtrl = (req, res) => {
    var fnm = "dasanCreateOnuHsiCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/dasanCreateOnuHsi",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("dasanCreateOnuHsiCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("dasanCreateOnuHsiCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : dasanCreateOnuIptvCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.dasanCreateOnuIptvCtrl = (req, res) => {
    var fnm = "dasanCreateOnuIptvCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/dasanCreateOnuIptv",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("dasanCreateOnuIptvCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("dasanCreateOnuIptvCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : createHuaweiProfileCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.createHuaweiProfileCtrl = (req, res) => {
    var fnm = "createHuaweiProfileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv1/caf_operations/ext/wrapper/createHuaweiProfile",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("firstTimeaddnewservicepackCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("firstTimeaddnewservicepackCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : createNewSubscriberCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.createNewSubscriberCtrl = (req, res) => {
    var fnm = "createNewSubscriberCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/createNewSubscriber",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("firstTimeaddnewservicepackCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("firstTimeaddnewservicepackCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : firstTimeaddnewservicepackCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.firstTimeaddnewservicepackCtrl = (req, res) => {
    var fnm = "firstTimeaddnewservicepackCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/firstTimeaddnewservicepack",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("firstTimeaddnewservicepackCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("firstTimeaddnewservicepackCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : huaweiAAAviewCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.huaweiAAAviewCtrl = (req, res) => {
    var fnm = "huaweiAAAviewCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/bbnlgetAaaProfile",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("huaweiAAAviewCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("huaweiAAAviewCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : huaweiAAAdeleteCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.huaweiAAAdeleteCtrl = (req, res) => {
    var fnm = "huaweiAAAdeleteCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/deleteAaaProfile",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("huaweiAAAdeleteCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("huaweiAAAdeleteCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : updateHuaweiProfileCtrl
* Parameters     : None
* Description    : 
* Change History :
* 31/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.updateHuaweiProfileCtrl = (req, res) => {
    var fnm = "updateHuaweiProfileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/updateHuaweiProfile",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("updateHuaweiProfileCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("updateHuaweiProfileCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : HuaweiBngUpdateProfileCtrl
* Parameters     : None
* Description    : 
* Change History :
* 31/01/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.HuaweiBngUpdateProfileCtrl = (req, res) => {
    var fnm = "HuaweiBngUpdateProfileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/HuaweiRadiusIsu",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("HuaweiBngUpdateProfileCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("HuaweiBngUpdateProfileCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : dasanBoxchangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.dasanBoxchangeCtrl = (req, res) => {
    var fnm = "dasanBoxchangeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/managedelementmgrCtp",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("dasanBoxchangeCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("dasanBoxchangeCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : AAAdasanupdateBoxchangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.AAAdasanupdateBoxchangeCtrl = (req, res) => {
    var fnm = "AAAdasanupdateBoxchangeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv1/caf_operations/ext/wrapper/updategetAaaProfile",
		method : "post",
		json : true,
		body :  req.body
	}
	console.log("AAAdasanupdateBoxchangeCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("AAAdasanupdateBoxchangeCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : IPtvdasanBoxReplaceCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.IPtvdasanBoxReplaceCtrl = (req, res) => {
    var fnm = "IPtvdasanBoxReplaceCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/replaceDevice",
		method : "post",
		json : true,
		body :  req.body 
	}
	console.log("IPtvdasanBoxReplaceCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("IPtvdasanBoxReplaceCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : disconnectservicepackCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.disconnectservicepackCtrl = (req, res) => {
    var fnm = "disconnectservicepackCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data_view = {
		url : "http://202.53.92.35/apiv2/ext/wrapper/disconnectservicepack",
		method : "post",
		json : true,
		body :  req.body 
	}
	console.log("disconnectservicepackCtrl",data_view)
	request(data_view, function(err, resp, body ){ 
		console.log("disconnectservicepackCtrl",err,body) 
		df.formatChckIptvSucessRes(req, res, body, cntxtDtls, fnm, {});
	})
}
/**************************************************************************************
* Controller     : oltcountsMdl
* Parameters     : None
* Description    : 
* Change History :
* 15/02/2024    -  durga - Initial Function
***************************************************************************************/
exports.oltcountsCtrl = (req, res) => {
    var fnm = "oltcountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.oltcountsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : oltlistviewMdl
* Parameters     : None
* Description    : 
* Change History :
* 15/02/2024    -  durga - Initial Function
***************************************************************************************/
exports.oltlistviewCtrl = (req, res) => {
    var fnm = "oltcountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.oltlistviewMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : entlistviwesCtrl
* Parameters     : None
* Description    : 
* Change History :
* 15/02/2024    -  durga - Initial Function
***************************************************************************************/
exports.entlistviwesCtrl = (req, res) => {
    var fnm = "oltcountsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dashbrdMdl.entlistviwesMdl(req.user,req.body.data)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}