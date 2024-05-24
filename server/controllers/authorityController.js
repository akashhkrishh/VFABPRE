const Authority = require('../models/Authority');
const User = require('../models/User');
const ShareFileModel = require("../models/ShareFile");
const EncFileModel = require("../models/EncFile");
const SendKeyModel = require("../models/SendKey");
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Msk = require('../models/MSK');
const Setup = require('../utils/MasterKeyGeneration'); 
const nodemailer = require('nodemailer');
const { SendMail } = require('../utils/SendMail');
const { KeyGenration } = require('../utils/KeyGeneration');
const { ReEncryption } = require('../utils/ReEncryption');
const { ReKeyGenration } = require('../utils/ReKeyGeneration');

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const authorityUser = await Authority.findOne({ email });

        if (authorityUser) {
            return res.status(400).json({ message: 'email is already taken.' });
        }

        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new Authority({ name, email, password:hashpassword, role: "authority" });
        const savedUser = await newUser.save();
        res.status(201).json({message:"Authority Registered Successful!"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const authorityUser = await Authority.findOne({ email });

        if (!authorityUser) {
            return res.status(400).json({ message: 'The email address not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, authorityUser.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid name or password.' });
        }

        const token = jwt.sign({ email: authorityUser.email, role: authorityUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.pendingownerlist = async(req, res) =>{
    try {

        const PendingOwnerList = await User.find({status:"pending",role:"owner"});
        res.send(PendingOwnerList);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.accessRequest = async(req, res) =>{
    try {

        const accessRequests = await ShareFileModel.find({status:"pending"}).populate('file_data').populate('receiver',{password:false});;
        const arrayData = []
        accessRequests.map((items,index)=>{
            if(items.owner.toString() == items.sender.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.pendingrecipientlist = async(req, res) =>{
    try {

        const pendingRecipientlist = await User.find({status:"pending",role:"recipient"});
        res.send(pendingRecipientlist);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.pendingshareRequest = async(req, res) =>{
    try {

        const accessRequests = await ShareFileModel.find({status:"pending"}).populate('file_data').populate('receiver',{password:false}).populate('sender',{password:false});;
        const arrayData = []
        accessRequests.map((items,index)=>{
            if(items.owner.toString() == items.sender._id.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.reShareRequest = async(req, res) =>{
    try {

        const accessRequests = await ShareFileModel.find({status:"pending"}).populate('file_data').populate('receiver',{password:false});
        const arrayData = []
        accessRequests.map((items,index)=>{
            if(items.owner.toString() != items.sender.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.allowners = async (req, res) => {
    try {
        const ActiveOwnerList = await User.find({status:{ $in: ['approved', 'rejected'] },role:"owner"} )
        res.send(ActiveOwnerList)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.allrecipients = async (req, res) => {
    try {
        const ActiveRecipientList = await User.find({status:{ $in: ['approved', 'rejected'] },role:"recipient"} )
        res.send(ActiveRecipientList)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.isapprove = async (req, res) => {
    try {
        const { value, email } = req.body;
        const data = await User.findOne({email:email});
        
        if(value == 'approved'){
          
            const mskData = await Msk.findOne({email:email});

            if(!mskData){
                const securityParameter = "128";
                const attributeUniverse = [data.email,data._id];
                const setupResult = Setup(securityParameter, attributeUniverse);
                const mskGeneration = new Msk({ email:email, pp: setupResult.PP , msk: setupResult.msk });
                await mskGeneration.save();
            }
          
        }
        const ActiveOwnerList = await User.findByIdAndUpdate(data._id,{status:value},{ new: true } )
        res.send(ActiveOwnerList);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.shareApprove = async (req, res) => {
    try {
        const { value, file_id } = req.body;
        const data = await ShareFileModel.findByIdAndUpdate(file_id,{status:value},{ new: true });
        res.send(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.reshareApprove = async (req, res) => {
    try {
        const { value, file_id } = req.body;
        const data = await ShareFileModel.findByIdAndUpdate(file_id,{status:value},{ new: true });
        const fileData = await EncFileModel.findById(data.file_data); 
        const { owner, originalname, file_path, secretkey, access_policy, } = fileData;
        const plaintext = fs.readFileSync(file_path, 'utf8');
        const sendData = await User.findById(data.receiver);
        const attributeSet = [sendData.name, sendData.email].toString();
        const ReEncryptionKey = ReKeyGenration(secretkey,attributeSet);
        ReEncryption(fileData,ReEncryptionKey);
        
        res.send(ReEncryptionKey);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendKey = async (req, res) => {
    try {
        
        const { value, id} = req.body;
        const data = await SendKeyModel.findById(id);
        const udata = await SendKeyModel.findByIdAndUpdate(id,{status:value},{ new: true });
        const userData = await User.findById(data.users);
        const userAttributes = [ userData.name, userData.email ] ;
   
        let fileKey,secretKey, originalname; 
    
            fileKey = await EncFileModel.findById(udata.file_data);
            secretKey = fileKey.secretkey;
            originalname = fileKey.originalname;
        

        const DecKey = KeyGenration(secretKey,userAttributes.toString());
        // console.log(DecKey.secretKey)
        if(value == 'approved') {
            if(!data.isSend){
                SendMail(userData.email,originalname, DecKey.secretKey, fileKey.hashvalue, data.expireTime);
                await SendKeyModel.findByIdAndUpdate(id,{isSend:true,sendTime:Date.now()},{ new: true });
                res.send("Message Send Successfully!");
            }else {
                res.send("Message Already Send!");
            }
        }
        else {
            res.send(`Message will be ${value}`);
        }
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.KeyReq = async (req, res) => {
    try {
        
        const data = await SendKeyModel.find({isSend:false, status:'pending'}).populate('file_data').populate('users');
        res.send(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



