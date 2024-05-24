const router = require('express').Router();

const Controller = require("../controllers/cloudController"); 
// const tokenVerify = require("../middleware/verifyToken");

// router.get("/",tokenVerify.validRecipient,(req,res)=>{
//     res.send(req.user.name);
// });

router.get('/allfiles',Controller.myfiles); 
router.get('/allowners',Controller.allowners); 
router.get('/countfiles',Controller.countFiles); 
router.get('/countresharefiles',Controller.countReshareFiles); 


module.exports = router;