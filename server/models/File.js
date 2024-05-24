const mongoose = require('mongoose');

const filedataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    reshare: { type:Number, required: true, },

    file_name:{ type:String, required: true,},
    file_type:{ type:String, required: true,},
    file_size:{ type:String, required: true },
    file_path:{ type:String, required: true },
    access_policy:{ type:String,enum:["read","download"],default:"read", required: true },
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('original_files', filedataSchema);
module.exports = Filedata;