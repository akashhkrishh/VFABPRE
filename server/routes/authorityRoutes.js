const router = require('express').Router();

const Controller = require("../controllers/authorityController") 
const tokenVerify = require("../middleware/verifyToken");

router.get("/",(req,res)=>{
    res.send("Authority");
});

router.post('/create',Controller.register); 
router.post('/login',Controller.login);
router.get('/pendingownerlist',tokenVerify.validAuthority,Controller.pendingownerlist);
router.get('/pendingrecipientlist',tokenVerify.validAuthority,Controller.pendingrecipientlist);
router.get('/allowners',tokenVerify.validAuthority,Controller.allowners);
router.get('/allrecipients',tokenVerify.validAuthority,Controller.allrecipients);
router.get('/pendingsharerequest',tokenVerify.validAuthority,Controller.pendingshareRequest);
router.get('/resharedfilelist',tokenVerify.validAuthority,Controller.reShareRequest);
router.put('/isApprove',tokenVerify.validAuthority,Controller.isapprove);
router.put('/shareApprove',tokenVerify.validAuthority,Controller.shareApprove);
router.put('/reshareApprove',tokenVerify.validAuthority,Controller.reshareApprove);
router.put('/sendKey',tokenVerify.validAuthority,Controller.sendKey);
router.get('/keyReq',tokenVerify.validAuthority,Controller.KeyReq);

module.exports = router;