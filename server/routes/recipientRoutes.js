const router = require('express').Router();

const Controller = require("../controllers/recipientController"); 
const tokenVerify = require("../middleware/verifyToken");

router.get("/",tokenVerify.validRecipient,(req,res)=>{
    res.send(req.user.name);
});

router.post('/create',Controller.register); 
router.post('/login',Controller.login);
router.get('/osharedfiles',tokenVerify.validRecipient,Controller.osharedFiles);
router.get('/rsharedfiles',tokenVerify.validRecipient,Controller.rsharedFiles);
router.post('/getKey',tokenVerify.validRecipient,Controller.getKey);
router.post('/decrypt',tokenVerify.validRecipient,Controller.decrypt);
router.post('/reshare',tokenVerify.validRecipient,Controller.reShare);
router.post("/filecontent",tokenVerify.validRecipient,Controller.FileContents);
router.get("/allrecipients",tokenVerify.validRecipient,Controller.allrecipients);
router.get("/mysharefiles",tokenVerify.validRecipient,Controller.mysharefiles);

module.exports = router;