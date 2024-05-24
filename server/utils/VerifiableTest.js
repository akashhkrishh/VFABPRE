const crypto = require('crypto');

const VerifiableTest = (encKey, key, attributeSet) => {
    try{
        const hmac =  crypto.createHmac('sha256',Buffer.from(key));
        hmac.update(attributeSet);
        const sk = hmac.digest();
        return(sk.toString("hex")==encKey);
        
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { VerifiableTest };
