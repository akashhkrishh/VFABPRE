
const EncFileModel = require("../models/EncFile");
const Users = require("../models/User");
const FileModel = require("../models/File");
exports.myfiles = async (req, res) => {

    try {
        
        const myFiles = await EncFileModel.find().populate('owner',{name:true}).populate('sender',{name:true});
        const arrayData = []
        myFiles.map((items,index)=>{
            if( items.owner._id.toString()==items.sender._id.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);

    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }

};
exports.allowners = async (req, res) => {
    try {
        const ActiveOwnerList = await Users.find({status:{ $in: ['approved'] },role:"owner"},{name:true} )
        res.send(ActiveOwnerList)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.countFiles = async (req, res) => {
    try {
        let arrData = [];
        const ActiveOwnerList = await Users.find({status:{ $in: ['approved'] },role:"owner"},{_id:true});
        for(let i=0;i<ActiveOwnerList.length;i++){
            const myfile = await EncFileModel.find({owner:ActiveOwnerList[i]._id, sender:ActiveOwnerList[i]._id});
            arrData.push(myfile.length)
        }
        res.send(arrData);
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.countReshareFiles = async (req, res) => {
    try {
        let arrData = [];
        let userData = [];
        const FileData= await FileModel.find().populate("owner",{name:true});
        for(let i=0;i<FileData.length;i++){
            arrData.push(FileData[i].reshare)
            userData.push(FileData[i].owner.name+'-'+FileData[i].file_name)
        }
        
        res.send({arrData,userData});
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}