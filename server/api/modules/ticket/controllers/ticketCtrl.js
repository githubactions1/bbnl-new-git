var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var ticketMdl = require('../models/ticketMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var mailUtls = require(appRoot + '/utils/communication.utils');


/**************************************************************************************
* Controller     : get_TcktStsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktStsCtrl = function (req, res) {

    ticketMdl.get_TcktStsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : get_TcktTypeCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktTypeCtrl = function (req, res) {

    ticketMdl.get_TcktTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_TcktCtgryCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 17/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktCtgryCtrl = function (req, res) {

    ticketMdl.get_TcktCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_TcktDetailsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 18/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktDetailsCtrl = function (req, res) {

    ticketMdl.get_TcktDetailsMdl(req.body.data, req.user)
        .then(function (results) {
            if (results) {
                ticketMdl.teamCntDtaMdl(req.body.data, req.user)
                    .then(function (countresults) {
                        var rslts = {
                            'count': countresults,
                            'dtarslts': results
                        }
                        df.formatSucessRes(req, res, rslts, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : get_TcktPrtyCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 19/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktPrtyCtrl = function (req, res) {

    ticketMdl.get_TcktPrtyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : get_TcktTeamsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 20/08/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.get_TcktTeamsCtrl = function (req, res) {

    ticketMdl.get_TcktTeamsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : insTcktDetailsCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 19/08/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.insTcktDetailsCtrl = function (req, res) {
    var data = req.body.data
    ticketMdl.insTcktDetailsMdl(req.body.data, req.user)
        .then(function (results) {
            if (results) {
                // if (data.req_data.app_icon.length > 0) {
                //     var data1 = req.body.data.attah_data
                //     attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                //         let url = attChres[0].Location
                //         if (!err) {
                //             ticketMdl.insTcktDcmntDetailsMdl(data, url, results.insertId, req.user)
                //                 .then(function (results) {
                //                     df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                //                 }).catch(function (error) {
                //                     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                //                 });
                //         } else {
                //           
                //         }
                //     })
                // } else {
                //     df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                // }
            }
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getUserTeamIdCtrl
* Parameters     : req,res()
* Description    : get details of single Team
* Change History :
* 19/08/2020    -   KOTI  - Initial Function
*
***************************************************************************************/
exports.getUserTeamIdCtrl = function (req, res) {

    ticketMdl.getUserTeamIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getTicketHisIdCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 21/08/2020    -   KOTI  - Initial Function
*
***************************************************************************************/
exports.getTicketHisIdCtrl = function (req, res) {

    ticketMdl.getTicketHisIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getTicketAttchIdCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket Attachments
* Change History :
* 16/10/2020    -   KOTI  - Initial Function
*
***************************************************************************************/
exports.getTicketAttchIdCtrl = function (req, res) {

    ticketMdl.getTicketAttchIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrtUpdate_TcktDtlsCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 10/09/2020    -  Madhuri  - Initial Function
*
***************************************************************************************/
exports.insrtUpdate_TcktDtlsCtrl = function (req, res) {
    console.log(req.body.data.array.length)
    ticketMdl.inscmntDetailsMdl(req.body.data, req.user)
        .then(function (cmntTbleresults) {
            if (req.body.data.array.length > 0) {
                ticketMdl.insrtTcktDetailsMdl(cmntTbleresults.insertId, req.body.data, req.user)
                    .then(function (insrtresults) {
                        ticketMdl.updateTcktDetailsMdl(req.body.data, req.user)
                            .then(function (updateresults) {
                                if (req.body.data.vendor_Id > 0) {
                                    ticketMdl.VendorElmtsDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                        .then(function (vndrelmntsResults) {
                                            if (req.body.data.status > 0) {
                                                ticketMdl.InsTeamStatusDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                                    .then(function (statusResults) {
                                                        console.log(req.body.data.issueType_Id)
                                                        if (req.body.data.issueType_Id > 0) {
                                                            ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                                .then(function (updatelmoresults) {
                                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                                        var data1 = req.body.data.attah_data
                                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                                            let url = attChres[0].Location
                                                                            if (!err) {
                                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                                    .then(function (results) {
                                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                                    }).catch(function (error) {
                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                                    });
                                                                            } else {
                                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                                console.log(err)
                                                                            }
                                                                        })
                                                                    } else {
                                                                        df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                                    }
                                                                    // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                                }).catch(function (error) {
                                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                });
                                                        } else {
                                                            df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                                        }
                                                    }).catch(function (error) {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                    });
                                            }
                                            else {
                                                if (req.body.data.issueType_Id > 0) {
                                                    ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                        .then(function (updatelmoresults) {
                                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                                var data1 = req.body.data.attah_data
                                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                                    let url = attChres[0].Location
                                                                    if (!err) {
                                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                            .then(function (results) {
                                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                            }).catch(function (error) {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                            });
                                                                    } else {
                                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                        console.log(err)
                                                                    }
                                                                })
                                                            } else {
                                                                df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                            }
                                                            // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                } else {
                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                        var data1 = req.body.data.attah_data
                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                            let url = attChres[0].Location
                                                            if (!err) {
                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                    .then(function (results) {
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    });
                                                            } else {
                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                console.log(err)
                                                            }
                                                        })
                                                    } else {
                                                        df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                                    }
                                                    // df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                                }
                                            }
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                } else {
                                    if (req.body.data.status > 0) {
                                        ticketMdl.InsTeamStatusDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                            .then(function (statusResults) {
                                                console.log(req.body.data.issueType_Id)
                                                if (req.body.data.issueType_Id > 0) {
                                                    ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                        .then(function (updatelmoresults) {
                                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                                var data1 = req.body.data.attah_data
                                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                                    let url = attChres[0].Location
                                                                    if (!err) {
                                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                            .then(function (results) {
                                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                            }).catch(function (error) {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                            });
                                                                    } else {
                                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                        console.log(err)
                                                                    }
                                                                })
                                                            } else {
                                                                df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                            }
                                                            // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                } else {
                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                        var data1 = req.body.data.attah_data
                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                            let url = attChres[0].Location
                                                            if (!err) {
                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                    .then(function (results) {
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    });
                                                            } else {
                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                console.log(err)
                                                            }
                                                        })
                                                    } else {
                                                        df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                                    }
                                                    // df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                                }
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    }
                                    else {
                                        if (req.body.data.issueType_Id > 0) {
                                            ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                .then(function (updatelmoresults) {
                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                        var data1 = req.body.data.attah_data
                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                            let url = attChres[0].Location
                                                            if (!err) {
                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                    .then(function (results) {
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    });
                                                            } else {
                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                console.log(err)
                                                            }
                                                        })
                                                    } else {
                                                        df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                    }
                                                    // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                        }
                                        else {
                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                var data1 = req.body.data.attah_data
                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                    let url = attChres[0].Location
                                                    if (!err) {
                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                            .then(function (results) {
                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            });
                                                    } else {
                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                        console.log(err)
                                                    }
                                                })
                                            } else {
                                                df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                            }
                                            // df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                        }
                                    }
                                }
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            } else {
                ticketMdl.updateTcktDetailsMdl(req.body.data, req.user)
                    .then(function (updateresults) {
                        if (req.body.data.vendor_Id > 0) {
                            ticketMdl.VendorElmtsDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                .then(function (vndrelmntsResults) {
                                    if (req.body.data.status > 0) {
                                        ticketMdl.InsTeamStatusDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                            .then(function (statusResults) {
                                                console.log(req.body.data.issueType_Id)
                                                if (req.body.data.issueType_Id > 0) {
                                                    ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                        .then(function (updatelmoresults) {
                                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                                var data1 = req.body.data.attah_data
                                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                                    let url = attChres[0].Location
                                                                    if (!err) {
                                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                            .then(function (results) {
                                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                            }).catch(function (error) {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                            });
                                                                    } else {
                                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                        console.log(err)
                                                                    }
                                                                })
                                                            } else {
                                                                df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                            }
                                                            // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                } else {
                                                    df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                                }
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    }
                                    else {
                                        if (req.body.data.issueType_Id > 0) {
                                            ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                .then(function (updatelmoresults) {
                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                        var data1 = req.body.data.attah_data
                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                            let url = attChres[0].Location
                                                            if (!err) {
                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                    .then(function (results) {
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    });
                                                            } else {
                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                console.log(err)
                                                            }
                                                        })
                                                    } else {
                                                        df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                    }
                                                    // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                        } else {
                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                var data1 = req.body.data.attah_data
                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                    let url = attChres[0].Location
                                                    if (!err) {
                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                            .then(function (results) {
                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            });
                                                    } else {
                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                        console.log(err)
                                                    }
                                                })
                                            } else {
                                                df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                            }
                                            // df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                        }
                                    }
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });
                        } else {
                            if (req.body.data.status > 0) {
                                ticketMdl.InsTeamStatusDetailsMdl(req.body.data.ticket_Id, req.body.data, req.user)
                                    .then(function (statusResults) {
                                        console.log(req.body.data.issueType_Id)
                                        if (req.body.data.issueType_Id > 0) {
                                            ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                                .then(function (updatelmoresults) {
                                                    if (req.body.data.attah_data.file_name.length > 0) {
                                                        var data1 = req.body.data.attah_data
                                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                            let url = attChres[0].Location
                                                            if (!err) {
                                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                                    .then(function (results) {
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    });
                                                            } else {
                                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                                console.log(err)
                                                            }
                                                        })
                                                    } else {
                                                        df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                    }
                                                    // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                        } else {
                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                var data1 = req.body.data.attah_data
                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                    let url = attChres[0].Location
                                                    if (!err) {
                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                            .then(function (results) {
                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            });
                                                    } else {
                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                        console.log(err)
                                                    }
                                                })
                                            } else {
                                                df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                            }
                                            // df.formatSucessRes(req, res, statusResults, cntxtDtls, '', {});
                                        }
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }
                            else {
                                if (req.body.data.issueType_Id > 0) {
                                    ticketMdl.updLmoissueDetailsMdl(req.body.data, req.user)
                                        .then(function (updatelmoresults) {
                                            if (req.body.data.attah_data.file_name.length > 0) {
                                                var data1 = req.body.data.attah_data
                                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                    let url = attChres[0].Location
                                                    if (!err) {
                                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                            .then(function (results) {
                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            });
                                                    } else {
                                                        console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                        console.log(err)
                                                    }
                                                })
                                            } else {
                                                df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                            }
                                            // df.formatSucessRes(req, res, updatelmoresults, cntxtDtls, '', {});
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                }
                                else {
                                    if (req.body.data.attah_data.file_name.length > 0) {
                                        var data1 = req.body.data.attah_data
                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                            let url = attChres[0].Location
                                            if (!err) {
                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, req.body.data.ticket_Id, req.user)
                                                    .then(function (results) {
                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                    }).catch(function (error) {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                    });
                                            } else {
                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                console.log(err)
                                            }
                                        })
                                    } else {
                                        df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                    }
                                    // df.formatSucessRes(req, res, updateresults, cntxtDtls, '', {});
                                }
                            }
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getCreateTicketDtlsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 03/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.getCreateTicketDtlsCtrl = function (req, res) {

    ticketMdl.getCreateTicketDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getVendorDetailsCtrl
* Parameters     : req,res()
* Description    : get details of all Vendor
* Change History :
* 17/09/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.getVendorDetailsCtrl = function (req, res) {

    ticketMdl.getVendorDetailsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getElementForVendorCtrl
* Parameters     : req,res()
* Description    : get element details of single Vendor
* Change History :
* 17/09/2020    -   KOTI  - Initial Function
*
***************************************************************************************/
exports.getElementForVendorCtrl = function (req, res) {
    ticketMdl.getElementForVendorMdl(req.params.vendorid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getCategoryForTypeCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 04/09/2020    -   MadhuriNune  - Initial Function
*
***************************************************************************************/
exports.getCategoryForTypeCtrl = function (req, res) {
    ticketMdl.getCategoryForTypeMdl(req.params.typeid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getSubCategoryForCatgryCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 04/09/2020    -   MadhuriNune  - Initial Function
*
***************************************************************************************/
exports.getSubCategoryForCatgryCtrl = function (req, res) {
    ticketMdl.getSubCategoryForCatgryMdl(req.params.catgryid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : getIssueTypeForCtsSubCatsCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 04/09/2020    -   MadhuriNune  - Initial Function
*
***************************************************************************************/
exports.getIssueTypeForCtsSubCatsCtrl = function (req, res) {
    ticketMdl.getIssueTypeForCtsSubCatsMdl(req.params.catgryid, req.params.subcatgryid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getSubCatgryCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 04/09/2020    -   Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getSubCatgryCtrl = function (req, res) {
    ticketMdl.getSubCatgryMdl(req.params.typeid, req.params.catgryid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAssignUserCtrl
* Parameters     : req,res()
* Description    : get Users Of Change Request
* Change History :
* 04/09/2020    -   Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getAssignUserCtrl = function (req, res) {
    ticketMdl.getAssignUserMdl(req.params.teamid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getIssueIdentifrsForIssueTypCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 04/09/2020    -   MadhuriNune  - Initial Function
*
***************************************************************************************/
exports.getIssueIdentifrsForIssueTypCtrl = function (req, res) {
    ticketMdl.getIssueIdentifrsForIssueTypMdl(req.params.issuetypeid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getTeamDetailsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 04/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.getTeamDetailsCtrl = function (req, res) {

    ticketMdl.getTeamDetailsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : InsTeamDetailsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.InsTeamDetailsCtrl = function (req, res) {
    console.log("req.body")
    console.log(req.body)
    console.log("req.body")
    dbutil.getNxtKey('tckt_id').then(function (tckt_id) {
        console.log(tckt_id)
        ticketMdl.InsTeamDetailsMdl(req.body.data, tckt_id, req.user)
            .then(function (results) {
                // var tkt_id = results.insertId
                if (results) {
                    // ticketMdl.InsQRcdDetailsMdl(tkt_id, req.user)
                    //     .then(function (QRresults) {
                    //         if (QRresults) {
                    ticketMdl.InsTeamStatusDetailsMdl(tckt_id, req.body.data, req.user)
                        .then(function (statusresults) {
                            if (statusresults) {
                                if (req.body.data.cre_tm_id == 2) {
                                    ticketMdl.InsCAFDetailsMdl(tckt_id, req.body.data, req.user)
                                        .then(function (cafrelationresults) {
                                            if (cafrelationresults) {
                                                // ticketMdl.InsLMODetailsMdl(tkt_id, req.body.data, req.user)
                                                //     .then(function (lmorelationresults) {
                                                //         if (lmorelationresults) {
                                                if (req.body.data.attah_data.file_name.length > 0) {
                                                    var data1 = req.body.data.attah_data
                                                    attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                        let url = attChres[0].Location
                                                        if (!err) {
                                                            ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                                                .then(function (results) {
                                                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                }).catch(function (error) {
                                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                });
                                                        } else {
                                                            console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                            console.log(err)
                                                        }
                                                    })
                                                } else {
                                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                }
                                                // }
                                                // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                // }).catch(function (error) {
                                                //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                // });
                                            }
                                            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                } else if (req.body.data.cre_tm_id == 5) {
                                    // ticketMdl.InsCAFDetailsMdl(tkt_id, req.body.data, req.user)
                                    // .then(function (cafrelationresults) {
                                    //     if (cafrelationresults) {
                                    ticketMdl.InsNOCDetailsMdl(tckt_id, req.body.data, req.user)
                                        .then(function (lmorelationresults) {
                                            if (lmorelationresults) {
                                                if (req.body.data.attah_data.file_name.length > 0) {
                                                    var data1 = req.body.data.attah_data
                                                    attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                        let url = attChres[0].Location
                                                        if (!err) {
                                                            ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                                                .then(function (results) {
                                                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                                }).catch(function (error) {
                                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                });
                                                        } else {
                                                            console.log("ERRRRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRR222222222");
                                                            console.log(err);
                                                        }
                                                    })
                                                }
                                                else {
                                                    //         var payload =req.body
                                                    //         var count = 0;
                                                    //         var mail = "'kotimachana555@gmail.com'"
                                                    //         const mailOptions = {
                                                    //             // to: data[0].frntdata.data.officeAddress.ofce_email, // list of receivers
                                                    //             to: mail,
                                                    //             subject: 'NOC Ticket has been created and it is in Approval Process' // Subject line
                                                    //         };
                                                    //         // console.log(mailOptions);

                                                    //         // The user subscribed to the newsletter.
                                                    //         mailOptions.html = `<table cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td align="center" valign="top" width="640" class="m_9089412924928323771bodywrap"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td><td width="600" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;text-align: center;padding: 20px 0 10px; border-bottom: 3px solid #3F51B5"> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="160" height="50" alt="APSFLs" border="0" class="CToWUd"></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Ticket has been created and it is waiting for approval process. </span> </p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h3 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your ticket has been created..</h3></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains Ticketid.</p><p> Please note:</p><ul></ul><p> <strong>Ticket ID: </strong> <a target="_blank">${tckt_id}</a> <strong>Description: </strong> <a target="_blank">${req.body.data.desc}</a><strong>Created By: </strong> <a target="_blank">${req.user.mrcht_usr_id}</a><strong>Created On: </strong> <a target="_blank">CURRENT_TIMESTAMP()</a><br> 
                                                    //        </p><p> Go to the sign-in page, <a href="http://bss.apsfl.co.in" style="color:#0044cc" target="_blank" data-saferedirecturl="http://bss.apsfl.co.in">http://bss.apsfl.co.in</a></p><p> Thank you for using APSFL.</p><p> Sincerely, <br>The APSFL Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:20px 0"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td><td width="460" colspan="2" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> This message was sent from an unmonitored e-mail address. Please do not reply to this message.<a href="" title="" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl=""></a><br> <a href="" title="Privacy" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Privacy</a> | <a href="" title="Legal" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Legal</a></p></td><td width="40" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0" class="m_9089412924928323771mobileHidden">&nbsp;</td><td width="100" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="100" height="22" alt="Smart Cards" border="0" class="CToWUd"></p></td><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`;
                                                    //         // mailOptions.html = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your username and password. </span> </p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h1 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h1></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains username and password.</p><p> Please note:</p><ul></ul><p> <strong>User Name: </strong> <a target="_blank">${data[0].frntdata.data.agnt_Cd}</a> <br> <strong>Password: </strong> <a style="color:#000;text-decoration:none">${data[0].frntdata.data.officeAddress.ofce_mble_Nu}</a></p><p> Once you have successfully signed in with your username and password, you can change your password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://localhost:4901/login#/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://localhost:4901/login#/">http://localhost:4901/login#/</a></p><p> Thank you for using APSFL.</p><p> Sincerely, <br>The APSFL Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table>`;

                                                    //         mailUtls.sendMail(mailOptions, function (err, response) {
                                                    //             count++;
                                                    //             if (count == payload.length) {
                                                    //                 // console.log(response);
                                                    //                 // return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    //                 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                    //             }
                                                    //             // console.log('err');
                                                    //             // if (err) {
                                                    //             //     console.log(err);
                                                    //             // } else if (response) {
                                                    //             //     console.log(response);
                                                    //             //     return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    //             // }
                                                    //             // console.log('response');
                                                    //         })
                                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                }
                                            }

                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                } else {
                                    if (req.body.data.attah_data.file_name.length > 0) {
                                        var data1 = req.body.data.attah_data
                                        attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                            let url = attChres[0].Location
                                            if (!err) {
                                                ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                                    .then(function (results) {
                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                    }).catch(function (error) {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                    });
                                            } else {
                                                console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR11111111");
                                                console.log(err)
                                            }
                                        })
                                    } else {
                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                    }
                                }
                                // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                // }).catch(function (error) {
                                //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                // });
                                // }
                            }
                            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                    //     }

                    // }).catch(function (error) {
                    //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    // });
                }
                // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }).catch(function (error) {
        // console.log(error)
    });

}

/**************************************************************************************
* Controller     : getDetailsCtrl
* Parameters     : req,res()
* Description    : Get details 
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.getDetailsCtrl = function (req, res) {

    ticketMdl.getDetailsMdl(req.user)
        .then(function (result) {
            console.log("Results000000000000000000000000000000000000000000000000000000000000000000000000000");
            console.log(result[0])
            if (result[0].tm_id == 1) {
                console.log("IFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
                ticketMdl.getCallCenterMdl(req.body.data, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, [results, result], cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            } else {
                console.log("Elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                ticketMdl.getOtherTeamMdl(req.body.data, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, [results, result], cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getDetailsCtrl
* Parameters     : req,res()
* Description    : Get details 
* Change History :
* 05/09/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.getClntAppDetailsCtrl = function (req, res) {

    ticketMdl.getClntAppSprtDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : acceptCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 08/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.acceptCtrl = function (req, res) {

    ticketMdl.acceptMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : InstBasicSeviceTicketDetailsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 29/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.InstBasicSeviceTicketDetailsCtrl = function (req, res) {
    dbutil.getNxtKey('tckt_id')
        .then((tckt_id) => {
            console.log("TICKETiDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
            console.log(tckt_id);
            ticketMdl.InsSprtTicketDetailMdl(tckt_id, req.body.data, req.user)
                .then(function (results) {
                    ticketMdl.InsTeamStatusDetailsMdl(tckt_id, req.body.data, req.user)
                        .then(function (statusresults) {
                            if (req.body.data.attah_data.file_name.length > 0) {
                                var data1 = req.body.data.attah_data
                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                    let url = attChres[0].Location
                                    if (!err) {
                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                            .then(function (results) {
                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    } else {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    }
                                })
                            } else {
                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                            }
                        })
                })
        })

}

/**************************************************************************************
* Controller     : InsTicketTicketDtlsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 30/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.InsTicketTicketDtlsCtrl = function (req, res) {
    ticketMdl.InsTicketTicketDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        })
}

/**************************************************************************************
* Controller     : EsclaTicketDtlsCtrl
* Parameters     : req,res()
* Description    : Get Escalation Ticket Details
* Change History :
* 06/10/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.EsclaTicketDtlsCtrl = function (req, res) {

    ticketMdl.EsclaTicketDtlsMdl(req.user)
        .then(function (results) {
            if (results.length > 0) {
                x = 0;
                function esclationfun(data, user) {
                    ticketMdl.updEsclaTicketDtlsMdl(data, user)
                        .then(function (updresults) {
                            x++;
                            if (x < results.length) {
                                esclationfun(results[x], req.user);
                            }
                            if (x == results.length) {
                                df.formatSucessRes(req, res, updresults, cntxtDtls, '', {});
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }

                esclationfun(results[x], req.user);
            } else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : approveTicketCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 06/10/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.approveTicketCtrl = function (req, res) {
    var x = 0;
    console.log(req.body.data)
    function myFirstrecursiveFnc(data, user) {
        ticketMdl.approveTicketMdl(data, user)
            .then(function (apprvresults) {
                if (apprvresults) {
                    ticketMdl.inscmntDetlsMdl(data, user)
                        .then(function (cmntresults) {
                            if (cmntresults) {
                                ticketMdl.insAppStgDtlMdl(data, cmntresults.insertId, user)
                                    .then(function (results) {
                                        x++;
                                        if (x < req.body.data.length) {
                                            myFirstrecursiveFnc(req.body.data[x], req.user);
                                        }
                                        if (x == req.body.data.length) {
                                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                        }

                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }

    myFirstrecursiveFnc(req.body.data[x], req.user);
}


/**************************************************************************************
* Controller     : applicationDtlsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.applicationDtlsCtrl = function (req, res) {
    ticketMdl.applicationDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        })
}



/**************************************************************************************
* Controller     : approvalTeamByAplcnIdCtrl
* Parameters     : req,res()
* Description    : get ticket details of single Ticket
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.approvalTeamByAplcnIdCtrl = function (req, res) {
    ticketMdl.approvalTeamByAplcnIdMdl(req.params.aplcnId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : assignTeamDtlsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 09/10/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.assignTeamDtlsCtrl = function (req, res) {
    ticketMdl.assignTeamDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        })
}




/**************************************************************************************
* Controller     : InstprivilegeTicketDetailsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 29/09/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.InstprivilegeTicketDetailsCtrl = function (req, res) {
    dbutil.getNxtKey('tckt_id')
        .then((tckt_id) => {
            console.log("TICKETiDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
            console.log(tckt_id);
            ticketMdl.InsSprtTicketDetailForPrvlgeMdl(tckt_id, req.body.data, req.user)
                .then(function (results) {
                    ticketMdl.InsTeamStatusDetailsMdl(tckt_id, req.body.data, req.user)
                        .then(function (statusresults) {
                            if (req.body.data.attah_data.file_name.length > 0) {
                                var data1 = req.body.data.attah_data
                                attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                    let url = attChres[0].Location
                                    if (!err) {
                                        ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                            .then(function (results) {
                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    } else {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    }
                                })
                            } else {
                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                            }
                        })
                })
        })

}

/**************************************************************************************
* Controller     : InstoccTicketDetailsCtrl
* Parameters     : req,res()
* Description    : Insert details of Ticket
* Change History :
* 29/09/2020    -  Koti  - Initial Function
*
***************************************************************************************/
exports.InstoccTicketDetailsCtrl = function (req, res) {
    console.log(req.body.data)
    // return
    dbutil.getNxtKey('tckt_id')
        .then((tckt_id) => {
            console.log("TICKETiD");
            console.log(tckt_id);

            ticketMdl.InsSprtTicketDetailForOccRqstMdl(tckt_id, req.body.data, req.user)
                .then(function (results) {
                    ticketMdl.InsTeamStatusDetailsMdl(tckt_id, req.body.data, req.user)
                        .then(function (statusresults) {
                            if (statusresults) {
                                ticketMdl.insTcktLmoDtlsMdl(tckt_id, req.body.data, req.user)
                                    .then(function (lmoresults) {

                                        if (req.body.data.attah_data.file_name.length > 0) {
                                            var data1 = req.body.data.attah_data
                                            attachmentUtils.uploadToS3([data1.base64], 'wetrackon/image_upload', (err, attChres) => {
                                                let url = attChres[0].Location
                                                if (!err) {
                                                    ticketMdl.insTcktDcmntDetailsMdl(req.body.data, url, tckt_id, req.user)
                                                        .then(function (attachresults) {
                                                            if (req.body.data.caf_data.length > 0) {
                                                                x = 0;
                                                                function cafaddfun(tckt_id, data, user) {
                                                                    ticketMdl.insTcktLmoCAfDtlsMdl(data, user)
                                                                        .then(function (lmocafresults) {
                                                                            x++;
                                                                            if (x < req.body.data.length) {
                                                                                cafaddfun(tckt_id, req.body.data.caf_data[x], req.user);
                                                                            }
                                                                            if (x == req.body.data.caf_data.length) {
                                                                                df.formatSucessRes(req, res, lmocafresults, cntxtDtls, '', {});
                                                                            }

                                                                        }).catch(function (error) {
                                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                        });
                                                                }
                                                                cafaddfun(tckt_id, req.body.data.caf_data[x], req.user);
                                                            } else {
                                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                            }
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                } else {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                }
                                            })
                                        } else {
                                            if (req.body.data.caf_data.length > 0) {
                                                x = 0;
                                                function cafaddfun(tckt_id, data, user) {
                                                    ticketMdl.insTcktLmoCAfDtlsMdl(tckt_id, data, user)
                                                        .then(function (lmocafresults) {
                                                            x++;
                                                            if (x < req.body.data.caf_data.length) {
                                                                cafaddfun(tckt_id, req.body.data.caf_data[x], req.user);
                                                            }
                                                            if (x == req.body.data.caf_data.length) {
                                                                df.formatSucessRes(req, res, lmocafresults, cntxtDtls, '', {});
                                                            }

                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                }
                                                cafaddfun(tckt_id, req.body.data.caf_data[x], req.user);
                                            } else {
                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            }
                                            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                        }

                                    })
                            }
                        })
                })
        })

}

/**************************************************************************************
* Controller     : getCafTicketDetailsCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 18/08/2020    -  KOTI  - Initial Function
*
***************************************************************************************/
exports.getCafTicketDetailsCtrl = function (req, res) {

    ticketMdl.getCafTicketDetailsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : LmoDtlsCtrl
* Parameters     : req,res()
* Description    : get details of LMO
* Change History :
* 01/12/2020    -  Koti  - Initial Function
*
***************************************************************************************/
exports.LmoDtlsCtrl = function (req, res) {

    ticketMdl.LmoDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            console.log("resultttttttttttttttttttttttttttttttttttttttttttttt")
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
