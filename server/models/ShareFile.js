const mongoose = require('mongoose');

const sharefiledataSchema = new mongoose.Schema({
    file_data: { type: mongoose.Types.ObjectId, ref: "encrypted_files", },
    original: { type: mongoose.Types.ObjectId, ref: "original_files", },
    owner: { type: mongoose.Types.ObjectId, ref: "users", },
    sender: { type: mongoose.Types.ObjectId, ref: "users", },
    receiver: { type: mongoose.Types.ObjectId, ref: "users", },
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: "pending"
    },
    isSend: {
        type: Boolean,
        default: false 
    },
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('share_files', sharefiledataSchema);
module.exports = Filedata;