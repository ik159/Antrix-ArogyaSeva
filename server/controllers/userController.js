const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const Org = require('../models/org');


exports.login = async(req,res,next)=>{
    passport.authenticate('login',async(err,user,info)=>{
        try{
            if(err){
                console.log(err.toString());
                return res.status(400).json({'err':err.toString()});
            }
            if(!user){
                console.log('User not found');
                return res.status(404).json({'err':'User not found'});
            }
            req.login(user,{session:false},async(err)=>{
                if(err){
                    console.log(err.toString());
                    return res.status(400).json({'err':err.toString()});
                }
                const body = {_id:user._id.toString(),email:user.email.toString()};
                const token = jwt.sign({user:body},process.env.AUTH_SECRET);
                return res.json({token});
            })
        }
        catch(err){
            return res.status(500).json({'err':err.toString()});
        }
    })(req,res);
}

// exports.signup =
//     passport.authenticate('signup',{session:false}),
// async (req,res)=>{
//     console.log('signup');
//     res.json({
//         message:'Signed up successfully',
//         user:req.user
//     });
// };  
    

exports.logout = async(req,res)=>{
    try{
        req.logout();
        return res.json({'msg':'Logged out successfully'});
    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}

exports.getUsers = async(req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            res.status(400).json({'err':err.toString()});
        }   
        res.json(users);
      }
      catch(err){
        res.status(500).json({'err':err.toString()});
      }
}

exports.getUserInfo = async(req,res)=>{
    try{ 
        const id = req.user._id
        //console.log(id);
        var user = await User.findById(id);
        //console.dir(user);
        if(user){
            return res.json(user);
        }
        user = await Org.findById(id).populate("supplies");
        if(user){
          return res.json(user);
        }
        
        return res.status(404).json({'err':'User not found'});
      }
      catch(err){
        res.status(500).json({'err':err.toString()});
      }
}