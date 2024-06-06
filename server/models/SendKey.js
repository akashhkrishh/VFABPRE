const mongoose = require('mongoose');

const sendSchema = new mongoose.Schema({

    file_data: { type: mongoose.Types.ObjectId, ref: "encrypted_files", },
    users: { type: mongoose.Types.ObjectId, ref: "users", },
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

const sendKey =  mongoose.model('sendkeys', sendSchema);
module.exports = sendKey;