var ticketRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var modRoot = appRoot + '/server/api/modules/ticket/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
const ticketCtrl = require(modRoot + 'controllers/ticketCtrl');

//get details of all Status
ticketRtr.get('/Status',   checkUser.hasToken, ticketCtrl.get_TcktStsCtrl);

//get details of all Type
ticketRtr.get('/Type', checkUser.hasToken, ticketCtrl.get_TcktTypeCtrl);

//get details of all Category
ticketRtr.get('/Category',   checkUser.hasToken, ticketCtrl.get_TcktCtgryCtrl);

//get details of all Prorities
ticketRtr.get('/Priorities',   checkUser.hasToken, ticketCtrl.get_TcktPrtyCtrl);

//get details of all Prorities
ticketRtr.get('/teams',   checkUser.hasToken, ticketCtrl.get_TcktTeamsCtrl);

//get Ticket details
ticketRtr.post('/get_TicketDetails',   checkUser.hasToken, ticketCtrl.get_TcktDetailsCtrl);

//Insert Ticket Data
ticketRtr.post('/TicketDetails',   checkUser.hasToken, ticketCtrl.insTcktDetailsCtrl);

//get details of single TEAM
ticketRtr.get('/user/:id',   checkUser.hasToken, ticketCtrl.getUserTeamIdCtrl);

//get details of single Ticket History
ticketRtr.get('/ticket/history/:id',   checkUser.hasToken, ticketCtrl.getTicketHisIdCtrl);

//get details of single Ticket Attachments
ticketRtr.get('/ticket/attach/:id',   checkUser.hasToken, ticketCtrl.getTicketAttchIdCtrl);

ticketRtr.post('/updateTicket/actions',   checkUser.hasToken, ticketCtrl.insrtUpdate_TcktDtlsCtrl);

//Insert Ticket Data
ticketRtr.get('/creation',   checkUser.hasToken, ticketCtrl.getCreateTicketDtlsCtrl);

ticketRtr.get('/getCategories/:typeid',   checkUser.hasToken, ticketCtrl.getCategoryForTypeCtrl);
ticketRtr.get('/getSubCategories/:catgryid',   checkUser.hasToken, ticketCtrl.getSubCategoryForCatgryCtrl);
ticketRtr.get('/getissueTypes/:catgryid/:subcatgryid',   checkUser.hasToken, ticketCtrl.getIssueTypeForCtsSubCatsCtrl);
ticketRtr.get('/getissueIdentifiers/:issuetypeid',   checkUser.hasToken, ticketCtrl.getIssueIdentifrsForIssueTypCtrl);
ticketRtr.get('/getVendors',   checkUser.hasToken, ticketCtrl.getVendorDetailsCtrl);
ticketRtr.get('/getElements/:vendorid',   checkUser.hasToken, ticketCtrl.getElementForVendorCtrl);

ticketRtr.get('/getSubCategory/:typeid/:catgryid',   checkUser.hasToken, ticketCtrl.getSubCatgryCtrl);

ticketRtr.get('/getAssignUsers/:teamid',   checkUser.hasToken, ticketCtrl.getAssignUserCtrl);

ticketRtr.post('/getTeams',   checkUser.hasToken, ticketCtrl.getTeamDetailsCtrl);

ticketRtr.post('/insert/ticketDetails',   checkUser.hasToken, ticketCtrl.InsTeamDetailsCtrl);
ticketRtr.post('/insert/basicServiceRequest/ticketDetails',   checkUser.hasToken, ticketCtrl.InstBasicSeviceTicketDetailsCtrl);

ticketRtr.get('/getDetails',   checkUser.hasToken, ticketCtrl.getDetailsCtrl);
ticketRtr.get('/clntAppgetDetails',   checkUser.hasToken, ticketCtrl.getClntAppDetailsCtrl);


ticketRtr.post('/accept',   checkUser.hasToken, ticketCtrl.acceptCtrl);

ticketRtr.post('/ticket/relation',   checkUser.hasToken, ticketCtrl.InsTicketTicketDtlsCtrl);

ticketRtr.get('/esclation',   checkUser.hasToken, ticketCtrl.EsclaTicketDtlsCtrl);

ticketRtr.post('/approving',   checkUser.hasToken, ticketCtrl.approveTicketCtrl);

ticketRtr.get('/getapplication',   checkUser.hasToken, ticketCtrl.applicationDtlsCtrl);
ticketRtr.get('/getapprovalTeam/:aplcnId',   checkUser.hasToken, ticketCtrl.approvalTeamByAplcnIdCtrl);

ticketRtr.get('/getassignTeams',   checkUser.hasToken, ticketCtrl.assignTeamDtlsCtrl);

ticketRtr.post('/insert/privilegeRequest/ticketDetails',   checkUser.hasToken, ticketCtrl.InstprivilegeTicketDetailsCtrl);

ticketRtr.post('/insert/occRequest/ticketDetails',   checkUser.hasToken, ticketCtrl.InstoccTicketDetailsCtrl);

ticketRtr.get('/ticket/getCafs/:id',   checkUser.hasToken, ticketCtrl.getCafTicketDetailsCtrl);

ticketRtr.post('/getlmoDta',   checkUser.hasToken, ticketCtrl.LmoDtlsCtrl);

// ticketRtr.post('/getTeamTcktCntDta',   checkUser.hasToken, ticketCtrl.teamCntDtaCtrl);


module.exports = ticketRtr;