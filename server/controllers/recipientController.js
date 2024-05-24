const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ShareFileModel = require("../models/ShareFile");
const SendKeyModel = require("../models/SendKey");
const EncFileModel = require("../models/EncFile");
const { VerifiableTest } = require('../utils/VerifiableTest');
const { Decryption } = require('../utils/Decryption');
const fs = require('fs');
const crypto = require('crypto');
const Users = require('../models/User');
const { ReKeyGenration } = require('../utils/ReKeyGeneration');
const { ReEncryption } = require('../utils/ReEncryption');
const FileModel = require('../models/File');
const { TimeValidityTest } = require('../utils/TimeValidityTest');

exports.register = async (req, res) => {
    try {
        
        const { name, email, phone, city, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already taken.' });
        }
        
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new User(
            {
                name: name,
                email: email,
                phone: phone,
                city: city,
                role: 'recipient',
                password: hashpassword 
            }
        );
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        
        const RecipientUser = await User.findOne({ email });
        if (!RecipientUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
  
        const passwordMatch = await bcrypt.compare(password, RecipientUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.', key:"IV" });
        }
  
        if (RecipientUser.status == 'pending') {
            return res.status(401).json({ message: 'Waiting For Authority Verification.', key:"P" });
        }
  
        if (RecipientUser.status == 'rejected') {
            return res.status(401).json({ message: 'Account  Was Rejected', key:"R" }); 
        }
  
        const token = jwt.sign({ email:RecipientUser.email, role: RecipientUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.osharedFiles = async (req, res) => {
    try {

        const FileData = await ShareFileModel.find({receiver:req.user}).populate('file_data',{secretkey:false}).populate('sender',{password:false});
    
        const arrayData = []
        FileData.map((items,index)=>{
           
            if(items.status.toString() == 'approved' && items.owner.toString()==items.sender._id.toString()){
                
                arrayData.push(items);
            }
        });
        console.log(arrayData)
        res.send(arrayData);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.rsharedFiles = async (req, res) => {
    try {

        const FileData = await ShareFileModel.find({receiver:req.user}).populate('owner').populate('file_data',{secretkey:false}).populate('sender',{password:false});
        const arrayData = []
        FileData.map((items,index)=>{
            if(items.status.toString() == 'approved' && items.owner._id.toString()!=items.sender._id.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getKey = async (req, res) => {
    try {
        const { file_id, sid } = req.body;
        const ActiveOwnerList = await ShareFileModel.findByIdAndUpdate(sid,{isSend:true},{ new: true } )
        const data = new SendKeyModel({
            file_data: file_id,
            users: req.user,
        });

        const savedFiles = await data.save();
        
        res.send(savedFiles);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.allrecipients = async (req, res) => {
    try {
        const ActiveRecipientList = await Users.find({status:{ $in: ['approved', 'rejected'] },role:"recipient"} )
        const arrayData = []
        ActiveRecipientList.map((items,index)=>{
            if(items._id.toString() != req.user._id.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.mysharefiles = async (req, res) => {
    
    try {
        
        const FileData = await ShareFileModel.find({sender:req.user}).populate('file_data').populate('owner',{name:true,email:true}).populate('receiver',{password:false});
        res.send(FileData);
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
    }
}



exports.decrypt = async(req,res) => {

    try {

        const attributeSet = [req.user.name,req.user.email];
        const { file_id, secretkey, hashvalue} = req.body;
        const fileData = await EncFileModel.findById(file_id);
        const resTest = VerifiableTest(secretkey,fileData.secretkey,attributeSet.toString());

        const sendKeyData = await SendKeyModel.find({users:req.user._id,file_data:file_id})
        const timeDiffence = TimeValidityTest(Date.now(),sendKeyData[0].sendTime)
        if(!(timeDiffence <= sendKeyData[0].expireTime)){
            return  res.status(500).json({ message: 'Key Expired!' });
        }

        if(!resTest) {
            return  res.status(500).json({ message: 'Invalid Decryption Key!' });
        }

        if(hashvalue != fileData.hashvalue ){
            return res.status(500).json({ message: "Hash Value Not Match!"});
        }

        const DecData = Decryption(fileData.file_path,fileData.secretkey);

        res.send({
            filename:fileData.originalname,
            accessPolicy: DecData.accessPolicy,
            fileContent: DecData.plaintext,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
        
    }
};


exports.reShare = async (req, res) => {
    try {
        const { file_id, receiver} = req.body;
        const EncData = await EncFileModel.findById(file_id);
        
        const attributeSet = [req.user.email,Date.now()]
        const { rKey } = ReKeyGenration(EncData.secretkey,attributeSet.toString());
        const isTrue = await ReEncryption(req, EncData, rKey);
        if(isTrue)
            {
            return res.status(500).send({message:"Already File Shared"})
        }
        const FileData = await FileModel.findById(EncData.original);
        const newVal = FileData.reshare+1
        const savedFile = await FileModel.findByIdAndUpdate(EncData.original,{reshare:newVal},{ new: true });
        res.send("Reshared Approved!");

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
        console.log(error)
    }
};


exports.FileContents = async (req, res) => {

    try {
        
        const { file_path } = req.body;
    
        const plaintext = fs.readFileSync(file_path, 'utf8');
        res.send(plaintext);
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
    }

};
