const crypto = require('crypto');

const KeyGenration = (msk, attributeSet) => {
    try{
        const hmac =  crypto.createHmac('sha256',Buffer.from(msk));
        hmac.update(attributeSet);
        const sk = hmac.digest();
        return { attributeSet, secretKey: sk.toString("hex") };
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { KeyGenration}