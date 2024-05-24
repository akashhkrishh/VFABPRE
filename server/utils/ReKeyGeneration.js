const crypto = require('crypto');

const ReKeyGenration = (sk, attributeSet) => {
    try{
        const hmac =  crypto.createHmac('sha256',Buffer.from(sk));
        hmac.update(attributeSet);
        const rk = hmac.digest();
        return { attributeSet, rKey: rk.toString("hex") };
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { ReKeyGenration}