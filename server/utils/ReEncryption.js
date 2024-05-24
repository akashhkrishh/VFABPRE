const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const EncFileModel = require("../models/EncFile");
const ShareFileModel = require("../models/ShareFile");
const { HashValue } = require("../utils/HashValue");


const ReEncryption = async(req, fileData, rkey ) =>{

    const { file_id, receiver} = req.body;

    try {

        const existData = await ShareFileModel.find({owner:fileData.owner,original:fileData.original,sender:req.user,receiver:receiver})
      
        if(existData.length != 0)
            {
            console.log(existData.length)
            return true
        }

        
        const ciphertext = fs.readFileSync(fileData.file_path, 'utf8');
        const decipher = crypto.createDecipher('aes-256-cbc', fileData.secretkey);
        let recryptedMessage = decipher.update(ciphertext, 'hex', 'utf8');
        recryptedMessage += decipher.final('utf8');
        const parsedContent = JSON.parse(recryptedMessage);
        const accessPolicy = parsedContent.accessPolicy;
        const plaintext = parsedContent.plaintext;

        const newName = Date.now()+"_re_enc_" + fileData.originalname;
        const destPath = "files/re-encrypted/" + newName;
       
        const cipher = crypto.createCipher('aes-256-cbc', rkey);
        let encryptedData = cipher.update(JSON.stringify({plaintext,accessPolicy}), 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        fs.writeFileSync(destPath, encryptedData);
        const hashvalue = await HashValue(destPath);


        

        const file_Data = new EncFileModel({
            owner: fileData.owner,
            sender: req.user,
            original:fileData.original,
            name: newName,
            originalname: fileData.originalname,
            access_policy: accessPolicy,
            file_path: destPath,
            hashvalue: hashvalue,
            secretkey: rkey,
        });

        const data = await file_Data.save();
        console.log('Re Encryption completed ');
        const shareFileData = new ShareFileModel({
            original:data.original,
            file_data: data._id,
            owner: data.owner,
            sender: req.user,
            receiver: receiver,
            status:'approved'
        });

        const savedFile = await shareFileData.save();
        console.log('File Shared!');
        return false


    } catch (error) {
        console.error('An error occurred during encryption:', error);
    }

};

module.exports = { ReEncryption };