const BloodDonor  = require('../models/bloodDonor');

exports.getDonors = async(req,res)=>{
    try{
        const donors = await BloodDonor.find({}).populate("donor","-password");
        if(!donors){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(donors);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getDonor = async(req,res)=>{
    try{
        const donor = await BloodDonor.findOne({_id:req.params.id}).populate("donor","-password");
        if(!donor){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(donor);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.createDonor = async(req,res)=>{
    try{
        req.body.donor = req.user;
        console.log(req.body.donor);
        const donor = await BloodDonor.create(req.body);
        if(!donor){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(donor);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.updateDonorDetails = async(req,res)=>{
    try{
        const donor = await BloodDonor.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).populate("donor","-password");
        if(!donor){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({donor,'msg':'Updated successfully'});
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.deleteDonor = async(req,res)=>{
    try{
        const donor = await BloodDonor.findOneAndRemove({_id:req.params.id});
        if(!donor){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({'msg':'Deleted successfully'});
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getPlasmaDonors = async(req,res)=>{
    try{
        const donors = await BloodDonor.find({plasma:true}).populate("donor","-password");
        if(!donors){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(donors);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getBloodDonors = async(req,res)=>{
    try{
        const donors = await BloodDonor.find({plasma:false}).populate("donor","-password");
        if(!donors){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(donors);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}