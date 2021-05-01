const Subscription = require('../models/subscription');
const webpush = require('web-push');
const user = require('../models/user');

exports.subscribe = async(req,res)=>{
    try{
        console.log(req.body);
        const subexists = await Subscription.findOne({endpoint:req.body.endpoint});
        if(subexists){
            return res.status(200).json({'msg':'Subscription already exists'});
        }
        // const isUser = await User.exists({_id:req.user._id});
        // if(isUser){
        //     req.body.user = req.user;
        // }
        // else{
        //     req.body.org = req.user;
        // }
        const subscriber = await Subscription.create(req.body);
        if(!subscriber){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(subscriber);
    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}

exports.broadcast = async(req,res)=>{
    try{
        const notification ={title:'Broadcast notification',body:'Body of notification'};
        const subscriptions = await Subscription.find({}).lean();
        if(!subscriptions){
            return res.status(400).json({'err':err.toString()}); 
        }
        const payload = JSON.stringify(notification);
        for(var i=0;i<subscriptions.length;i++){
            webpush.sendNotification(subscriptions[i],payload)
    .then(result => console.log("Result: "+result))
    .catch(e => console.log(e.stack))
        }
        res.status(200).json({success:true});
    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}

exports.notifyVolunteers = async(req,res)=>{
    try{
        const volunteers = await user.find({isVolunteer:true,help:req.body.help}).select("_id");
        console.dir(volunteers);
        const subscribers = await Subscription.find(
            {user:{
                $in:volunteers
            }});
        const help = req.body.help;
        const payload = JSON.stringify({title:`${help} needed!`});
        for(var i=0;i<subscribers.length;i++){
            webpush.sendNotification(subscribers[i],payload)
    .then(result => console.log("Result: "+result))
    .catch(e => console.log(e.stack))
        }
        res.status(200).json({success:true});
    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}