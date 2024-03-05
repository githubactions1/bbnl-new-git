const dataMigrationMdl = require(appRoot + '/server/api/modules/dataMigration/models/dataMigrationMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var user = {};
/**************************************************************************************
* Controller     : get_oltPortSlotSplitMigration
* Parameters     : req,res()
* Description    : 
* Change History :
***************************************************************************************/
exports.get_oltPortSlotSplitMigration = function (req, res) {

    dataMigrationMdl.getOltPortDtls(req.user)
        .then(function (oltPortDtls) {
            // Add Port
            p_ct = 0;
            function portInsertProcess(portDtls) {
                console.log("\nAdding Port: "+portDtls.olt_srl_nu+":"+portDtls.olt_prt_nm);
                dataMigrationMdl.addOltPort(portDtls,req.user, function (err, portInsertRes) {
                    p_ct++;
                    if (err) { console.log(err); return }
                    var port_id = portInsertRes.insertId;
                    if (portDtls.l1slots != null) {
                        var slots = portDtls.l1slots.split(',');

                        //Add Slots to Port
                        s_ct = 0
                        function slotInserProcess(port_id, slot) {
                            console.log("Adding Slot & Splits: "+slot);
                            dataMigrationMdl.addSlot(port_id, slot,req.user, function (err, slotInsertRes) {
                                s_ct++;
                                if (err) { console.log(err); return }
                                var slot_id = slotInsertRes.insertId;
                                //Add Splits
                                dataMigrationMdl.addSplits(slot_id, slot, s_ct,req.user ,oltPortDtls[0],function (err, splitInsertRes) {
                                    if (err) { console.log(err); return }
                                    if (s_ct < slots.length) {
                                        slotInserProcess(port_id, slots[s_ct]);
                                    }
                                    else if (p_ct < oltPortDtls.length) {
                                        portInsertProcess(oltPortDtls[p_ct]);
                                    }
                                    else {
                                        console.log("Done");
                                    }
                                })
                            })
                        } //Slot Added End
                        slotInserProcess(port_id, slots[s_ct]);
                    } else {
                        console.log("portDtls.l1slots Is null");
                        if (p_ct < oltPortDtls.length) {
                            portInsertProcess(oltPortDtls[p_ct]);
                        }
                        else {
                            console.log("Done");
                            df.formatSucessRes(req,res, [], cntxtDtls, '', {});
                        }
                    }

                })
            } //Port Added End
            portInsertProcess(oltPortDtls[p_ct]);
            //df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}