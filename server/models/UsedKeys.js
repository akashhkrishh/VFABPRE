const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    key:{ type:String, required: true,},
    users: { type: mongoose.Types.ObjectId, ref: "users", },
    time: { type:String, required: true,},
    isUsed : { type:Boolean, default:false,},
    sendTime : {type: Date, default:Date.now()},
    expireTime : {type: Number, default:3},
    createdAt: { type: Date, default: Date.now }
});

const Key =  mongoose.model('keys', keySchema);
module.exports = Key;