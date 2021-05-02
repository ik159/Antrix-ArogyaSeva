const User = require('../models/user');

exports.getVolunteers = async(req,res)=>{
    try{
        const volunteers = await User.find({isVolunteer:true});
        if(!volunteers){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(volunteers);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getVolunteer = async(req,res)=>{
    try{
        const volunteer = await User.findOne({isVolunteer:true,_id:req.params.id});
        if(!volunteer){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(volunteer);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.updateInfo = async(req,res)=>{
    try{
        const volunteer = await User.findOneAndUpdate({isVolunteer:true,_id:req.params.id},req.body,{new:true});
        console.dir(req.body);
        if(!volunteer){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(volunteer);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}
