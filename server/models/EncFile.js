const mongoose = require('mongoose');

const encfiledataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    sender: {type: mongoose.Types.ObjectId, ref: "users", },
    name:{ type:String, required: true,},
    originalname:{ type:String, required: true,},
    file_path:{ type:String, required: true },
    original: {type: mongoose.Types.ObjectId, ref: "original_files",},
    secretkey:{ type:String, required: true },
    hashvalue:{ type:String, required: true },
    access_policy:{ type:String,enum:["read","download"],default:"read", required: true },
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('encrypted_files', encfiledataSchema);
module.exports = Filedata;