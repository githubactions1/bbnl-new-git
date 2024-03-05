var express = require('express');
var router = express.Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

var batchCoreCtrl = require(appRoot + '/server/api/modules/general/batch/controllers/batchCoreCtrl');
var jobsCtrl = require(appRoot + '/server/api/modules/general/batch/controllers/jobsCtrl');

//**** Execute Job ****//
router.post("/executeJob", batchCoreCtrl.executeJob);
router.post("/testpost", batchCoreCtrl.testPost);
router.post("/testpost2", batchCoreCtrl.testPost2);

router.get("/jobsLst", jobsCtrl.getJbsLtstLstCntrl);
router.get("/jobHistory/:jb_id", jobsCtrl.getJbHstryCntrl);
router.get("/jobscheduleLst/:jb_id", jobsCtrl.getJbScheduleLstCntrl);
router.get("/jobschedule/:jb_id/:sche_id",checkUser.hasToken, jobsCtrl.getJobScheduleCntrl);
router.delete("/jobschedule/:sche_id/:jb_id",checkUser.hasToken, jobsCtrl.delJbScheduleCntrl);
router.get("/jobtasks/:jb_id",checkUser.hasToken, jobsCtrl.getJobTasksCntrl);
router.post("/jobschedule", checkUser.hasToken, jobsCtrl.getJbScheduleCntrl);
router.get("/joblog/:jb_adt_id", jobsCtrl.getJbLogCntrl);
router.post("/jobHistory", jobsCtrl.getJobHistoryCntrl);

module.exports = router;

