const mongoose = require('mongoose');

const mskSchema = new mongoose.Schema({
    pp: {
        securityParameter: {
            type: String,
            required: true
        },
        attributeUniverse: [{
            type: mongoose.Schema.Types.Mixed,
            required: true
        }]
    },
    msk:{ type:String, required: true,},
    email:{ type:String, required: true, unique: true,},
    createdAt: { type: Date, default: Date.now }
});

const MSK =  mongoose.model('msk', mskSchema);
module.exports = MSK;