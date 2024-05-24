const router = require('express').Router();
const Controller = require("../controllers/ownerController");
const multer  = require('multer');
const path = require('path');
const tokenVerify = require("../middleware/verifyToken");

router.get("/",tokenVerify.validOwner,(req,res)=>{
    res.send(req.user.name);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/original/') 
    },
    filename: function (req, file, cb) {
      cb(null, path.basename(file.originalname)) 
    }
  });
  const upload = multer({ storage: storage });

router.post('/create',Controller.register);
router.post('/login',Controller.login);
router.post("/fileupload",tokenVerify.validOwner,upload.single('file'),Controller.fileUpload);
router.get("/myfiles",tokenVerify.validOwner,Controller.myfiles);
router.get("/recipients",tokenVerify.validOwner,Controller.getRecipients);
router.post("/sharefile",tokenVerify.validOwner,Controller.shareFiles);
router.get("/mysharefiles",tokenVerify.validOwner,Controller.myShareFiles);
router.post("/filecontent",tokenVerify.validOwner,Controller.FileContents);


module.exports = router;