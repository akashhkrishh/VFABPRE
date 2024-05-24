const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const EncFileModel = require("../models/EncFile");
const { HashValue } = require("../utils/HashValue");

const Encryption = async(original, req,filepath, secretKey, accessPolicy) =>{

    try {

        const newName = Date.now()+"enc" + path.basename(filepath);
        const destPath = "files/encrypted/" + newName;
        const plaintext = fs.readFileSync(filepath, 'utf8');
        const cipher = crypto.createCipher('aes-256-cbc', secretKey);
        let encryptedData = cipher.update(JSON.stringify({plaintext,accessPolicy}), 'utf8', 'hex');
        encryptedData += cipher.final('hex');
        fs.writeFileSync(destPath, encryptedData);
        
        const hashvalue = await HashValue(destPath);
        const fileData = new EncFileModel({
            owner: req.user,
            sender: req.user,
            original: original,
            name: newName,
            originalname: path.basename(filepath),
            access_policy: accessPolicy,
            file_path: destPath,
            hashvalue: hashvalue,
            secretkey: secretKey,
        });

        await fileData.save();
        console.log('Encryption completed');


    } catch (error) {
        console.error('An error occurred during encryption:', error);
    }

};

module.exports = { Encryption };