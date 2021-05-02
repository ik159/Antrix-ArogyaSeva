const Org = require('../models/org');

exports.getHospitals = async(req,res)=>{
    try{
        const hospitals =  await Org.find({category:'Hospital'});
        if(!hospitals){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(hospitals);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getHospital = async(req,res)=>{
    try{
        const hospital =  await Org.findOne({category:'Hospital',_id:req.params.id});
        if(!hospital){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(hospital);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.updateData = async(req,res)=>{
    try{
        const hospital =  await Org.findOneAndUpdate(
            {category:'Hospital',_id:req.params.id},
            req.body,
            {new:true }
            );
        if(!hospital){
            return res.status(400).json({'err':err.toString()});
        }
        console.dir(hospital);
        res.json(hospital);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}