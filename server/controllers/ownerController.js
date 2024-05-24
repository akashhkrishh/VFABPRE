const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KeyGenration } = require("../utils/KeyGeneration");
const MSK = require('../models/MSK');
const FileModel = require("../models/File");
const EncFileModel = require("../models/EncFile");
const ShareFileModel = require("../models/ShareFile");
const { Encryption } = require('../utils/Encryption');
const fs = require('fs');



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
                role: 'owner',
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
        
        const OwnerUser = await User.findOne({ email });
        if (!OwnerUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
  
        const passwordMatch = await bcrypt.compare(password, OwnerUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.', key:"IV" });
        }
  
        if (OwnerUser.status == 'pending') {
            return res.status(401).json({ message: 'Waiting For Authority Verification.', key:"P" });
        }
  
        if (OwnerUser.status == 'rejected') {
            return res.status(401).json({ message: 'Account  Was Rejected', key:"R" }); 
        }
  
        const token = jwt.sign({ email:OwnerUser.email, role: OwnerUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.fileUpload = async (req, res) =>{

    try {

        const initialPath = req.file.path;
        const { accessPolicy } = req.body;
        const msk = await MSK.findOne({email:req.user.email});
        const attributeSet = [req.user.email,Date.now()]
        const { secretKey } = KeyGenration(msk.msk,attributeSet.toString());
        const fileData = new FileModel({
            owner: req.user,
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            file_path: initialPath,
            reshare:0,
        });
        const savedFile = await fileData.save();
        Encryption(savedFile,req, initialPath, secretKey, accessPolicy);
        res.send(savedFile);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.myfiles = async (req, res) => {

    try {
        
        const myFiles = await EncFileModel.find({owner:req.user, sender:req.user});
        res.send(myFiles);

    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }

};

exports.getRecipients = async (req, res) => {

    try {

        const getRecipientList = await User.find({role:'recipient',status:'approved'});
        res.send(getRecipientList);

    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }

};

exports.shareFiles = async (req, res) => {

    try {
        const { file_id, receiver } = req.body;
        const FileData = await EncFileModel.findById(file_id);
        const sender = req.user;

        const existData = await ShareFileModel.find({owner:req.user,file_data:file_id,sender:sender,receiver:receiver})
        if(existData.length !=0){
            return res.status(402).send({message:"Already File Shared"})
        }

        const shareFileData = new ShareFileModel({
            file_data: file_id,
            owner: req.user,
            sender: sender,
            receiver: receiver,
            original: FileData.original
        });

        const savedFile = await shareFileData.save();
        res.send(savedFile);
    
    } catch (err) {
        res.status(500).json({ message: 'File Sharing Failed.' });
    }

};

exports.myShareFiles = async (req, res) => {

    try {
        
        const FileData = await ShareFileModel.find({sender:req.user}).populate('file_data').populate('receiver',{password:false});
        res.send(FileData);
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
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
