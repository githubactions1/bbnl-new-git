var agentRtr = require('express').Router();
var modRoot = appRoot + '/server/api/modules/agent/'
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');


const agntCtgryCtrl=require(modRoot+'controllers/agntCtgryCtrl');
const agentCtrl = require(modRoot + 'controllers/agntCtrl');



agentRtr.get('/agntctgry', agntCtgryCtrl.agnt_ctgry_get);
agentRtr.post('/agent', agentCtrl.newAgentCtrl);
agentRtr.get('/mso', checkUser.hasToken,checkUser.vldSelect('mso_lst'),agentCtrl.getMsoCtrl);
agentRtr.get('/mso/lmo/:id', agentCtrl.getMsoLmoDtlsCtrl);
agentRtr.get('/lmo', checkUser.hasToken,checkUser.vldSelect('lmo_lst'),agentCtrl.getLmoCtrl);
agentRtr.get('/agents/:id', agentCtrl.getAgentByIdCtrl);
agentRtr.get('/agentsmso/:id', agentCtrl.getAgentByMsoCtrl);
agentRtr.get('/cafcountbymso/:id', agentCtrl.getcafcountbymsoCtrl);
agentRtr.get('/CrntPrvsMnthCnt/:id', agentCtrl.getCrntPrvsMnthCntsCtrl);
agentRtr.get('/LmoCpeCnt/:id', agentCtrl.getCpeCnttrl);

agentRtr.post('/update/agent/:agntid',checkUser.hasToken, agentCtrl.updateAgentCtrl);
agentRtr.delete('/delete/agent/:agntid',checkUser.hasToken, agentCtrl.delAgentCtrl);
agentRtr.delete('/reject/agent/:agntid',checkUser.hasToken, agentCtrl.rejAgentCtrl);
agentRtr.get('/unreject/agent/:agntid',checkUser.hasToken, agentCtrl.unrejAgentCtrl);
agentRtr.get('/organization/types', agentCtrl.getAgentOrgnTypeCtrl);

agentRtr.post('/lmo/mso/details/adhr_nu/mbl_nu', agentCtrl.getMsoDtlsByAdhrMblCtrl); // get agent details if already exists

agentRtr.post('/otp/update/agent/registration', agentCtrl.updateAgntDtlsByRegCtrl); // update agent table after otp validation

// add role permissions on creation of user of a agent
agentRtr.post('/add/user/rle/premissions', agentCtrl.insrtUsrRlePermsCtrl); 
//********************agent docs********************************//
agentRtr.get('/document/types', agentCtrl.getDocTypsCtrl);

//********************agent info********************************//
agentRtr.get('/enrollments', checkUser.hasToken,checkUser.vldSelect('enrollment_lst'),agentCtrl.getAllEnrldAgntsCtrl);
agentRtr.get('/enrollments/reject', agentCtrl.getAllEnrlRejectCtrl);
agentRtr.get('/getAgentBySearch/:value', agentCtrl.getAllAgents);
agentRtr.get('/getAgentBySearchCtgr/:ctgryId/:value', agentCtrl.getAllAgentsByCtgry);
agentRtr.get('/agnt_dtls/:agntid', checkUser.hasToken, agentCtrl.getAgntDtls);
agentRtr.get('/agntdtls/:agntid', checkUser.hasToken, agentCtrl.getAgntDtlsCnts);
agentRtr.get('/agnt_port_ass/:agntid', checkUser.hasToken, agentCtrl.getAgntPorts);
agentRtr.get('/agnt_packge_aggrmnt/:agntid', checkUser.hasToken, agentCtrl.getPackAggrmnt);
agentRtr.get('/agnt_prt_conn_slts/:agntid', checkUser.hasToken, agentCtrl.getPortConnslots);



agentRtr.get('/agent/:id/payments', checkUser.hasToken, agentCtrl.getAgentByIdCtrl);
agentRtr.get('/agent/:id/collection', agentCtrl.getAgentByIdCtrl);
agentRtr.get('/agent/:id/ports', agentCtrl.getAgentByIdCtrl);
agentRtr.get('/agent/:id/packageagg', agentCtrl.getAgentByIdCtrl);


//***************SubStation Mapping*********************************//
agentRtr.get('/dstrctList', agentCtrl.get_districts);
agentRtr.get('/substationList/:dstID', checkUser.hasToken, agentCtrl.get_substations);
agentRtr.get('/mandalVillagesList/:substnId', checkUser.hasToken, agentCtrl.get_mandals_villages);
agentRtr.post('/insrt_substations', checkUser.hasToken, agentCtrl.insert_substationsCtrl);
agentRtr.get('/substations/agent/:id', agentCtrl.getSbStnsLstByAgntIdCtrl);
agentRtr.get('/get_olts_ports/:agntID', checkUser.hasToken, agentCtrl.get_olts_portsCtrl);

agentRtr.get('/agnt_dstrctList', checkUser.hasToken,agentCtrl.get_agent_districts);

//***************Port Allocation**********************************//
agentRtr.get('/mandalList/:distrctID', checkUser.hasToken, agentCtrl.get_mandalsLst);
agentRtr.get('/oltWiseDetails/:distrctID/:mandalID', checkUser.hasToken, checkUser.vldSelect('port_allocation'),agentCtrl.get_oltDetails);
agentRtr.post('/portsInformationForOlts', checkUser.hasToken, agentCtrl.get_portWiseOltDetails);
agentRtr.post('/insert_PortToAgent', checkUser.hasToken, agentCtrl.insert_portToAgent);

agentRtr.get('/agnt_mandalList/:distrctID', checkUser.hasToken, agentCtrl.get_agnet_mandalsLst);
agentRtr.get('/agnt_vlgeList/:mndl_id/:dstrct_id', checkUser.hasToken, agentCtrl.get_agnt_vlgeList)


//***************Agent enrollment**********************************//
agentRtr.post('/enrollment', checkUser.hasToken, agentCtrl.postAgntEnrlmntDtlsCtrl);



// Collection APP MSO ROutes

agentRtr.post('/mnthlyCollections', checkUser.hasToken, agentCtrl.getMnthlyMSOCollectionsCtrl);

module.exports = agentRtr;