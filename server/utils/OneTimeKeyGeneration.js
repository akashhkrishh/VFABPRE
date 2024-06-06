const crypto = require('crypto');

const OneTimeKeyGenration = (msk, attributeSet, Time) => {
    try{
        const hmac =  crypto.createHmac('sha256',Buffer.from(msk));
        hmac.update(attributeSet);
        hmac.update(Time);
        const sk = hmac.digest();
        return { Time, attributeSet, secretKey: sk.toString("hex") };
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { OneTimeKeyGenration }