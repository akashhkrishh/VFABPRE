const fs = require('fs');
const crypto = require('crypto');

const Decryption = (filepath, key) => {
    try {
        const ciphertext = fs.readFileSync(filepath, 'utf8');
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decryptedMessage = decipher.update(ciphertext, 'hex', 'utf8');
        decryptedMessage += decipher.final('utf8');
        const parsedContent = JSON.parse(decryptedMessage);
        const accessPolicy = parsedContent.accessPolicy;
        const plaintext = parsedContent.plaintext;
        return({accessPolicy,plaintext});
    } catch (error) {
        console.error('An error occurred during redecryption:', error);
        return null;
    }
};


module.exports = { Decryption };