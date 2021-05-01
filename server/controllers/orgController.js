const mongoose = require('mongoose');
const Org = require('../models/org');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../auth/org_auth');


exports.signin = async(req,res,next)=>{
    passport.authenticate('signin',async(err,user,info)=>{
        try{
            if(err){
                return res.status(400).json({'err':err.toString()});
            }
            if(!user){
                return res.status(404).json({'err':'Org not found'});
            }
            req.login(user,{session:false},async(err)=>{
                if(err){
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

exports.logout = async(req,res)=>{
    try{
        req.logout();
        return res.json({'msg':'Logged out successfully'});
    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}

exports.getOrgs = async(req,res)=>{
    try{
        const users = await Org.find({});
        if(!users){
            res.status(400).json({'err':err.toString()});
        }   
        res.json(users);
      }
      catch(err){
        res.status(500).json({'err':err.toString()});
      }
}