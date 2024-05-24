const Authority = require('../models/Authority');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

const validAuthority = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        
        if(data.role != "authority"){
            return res.send({role:"authority"},403);
        }
        
        const user = await Authority.findOne({email:data.email})
        req.user = user;
        // console.log(req.user.name);
        next();
    })
    
}
const validOwner = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        // console.log(data.role);
        if(data.role != "owner"){
            return res.status(403).send({role:"recipient"});
        }
        
        const user = await User.findOne({email:data.email})
        req.user = user;
        // console.log(req.user.name);
        next();
    })
    
}

const validRecipient = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        // console.log(data.role);
        if(data.role != "recipient"){
            return res.status(403).send({role:"owner"});
        }
        
        const user = await User.findOne({email:data.email})
        req.user = user;
        // console.log(req.user.name);
        next();
    })
    
}

module.exports  = {
    validOwner,
    validRecipient,
    validAuthority,
}