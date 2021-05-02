const Org = require('../models/org');
const Product = require('../models/product');

exports.getStores = async(req,res)=>{
    try{
        const stores =  await Org.find({category:req.query.category}).populate("supplies").select("-password");
        if(!stores){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(stores);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.getStore = async(req,res)=>{
    try{
        const store =  await Org.findOne({category:req.body.category,_id:req.params.id}).populate("supplies").select("-password");
        if(!store){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(store);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.updateData = async(req,res)=>{
    try{
        const store =  await Org.findOneAndUpdate(
            {category:req.body.category,_id:req.params.id},
            req.body,
            {new:true }
            );
        if(!store){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(store);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}

exports.addSupplies = async(req,res)=>{
    try{
        var supplies_id = [];
        const supplies = req.body;
        console.dir(req.body);
        //for(var i=0;i<supplies.length;i++){
            const product = await Product.create(supplies);
            if(!product){
                return res.status(400).json({'err':'Unable to create product'});
            }
            supplies_id.push(product._id);
       // }
        //console.dir(supplies_id);
        const store = await Org.findOneAndUpdate(
            {category:req.body.category,_id:req.params.id},{
                $push:{supplies:
                    // {$each:supplies_id}
                    product._id
                }
            },{new:true});
        if(!store){
            return res.status(404).json({'err':err.toString()});
        }
        res.json(store);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    }
}
exports.updateSupply = async(req,res)=>{
    try{
        const supply = await Product.findOneAndUpdate(
            {_id:req.params.pId},
            req.body,
            {new : true});
        if(!supply){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(supply);      
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}
exports.deleteSupply = async(req,res)=>{
    try{
        const supply = await Product.findOneAndRemove(
            {_id:req.params.pId});
        if(!supply){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({'msg':'Deleted successfully!'});      
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}