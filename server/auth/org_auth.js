const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const Org = require('../models/org');

passport.use('signup', new localStrategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    async(req,email,password,done)=>{
        try{
            const orgExists = await Org.findOne({email});
            //console.dir(userExists);
            if(orgExists){
                return done(null,false,{'message':'Org already exists'});
            }
            const name = req.body.name;
            const contactno = req.body.contactno;
            const location = req.body.location;
            const category = req.body.category;
            const user = await Org.create({email,password,name,contactno,location,category});
            return done(null,user);
        }
        catch(err){
            return done(err);
        }
    }
));

passport.use('signin', new localStrategy({
    usernameField:'email',
    passwordField:'password'
},
    async(email,password,done)=>{
        try{
            const user = await Org.findOne({email});
            if(!user){
                return done(null,false,{'message':'User not found'});
            }
            const validate = await user.isValidPassword(password);
            if(!validate){
                return done(null,false,{'message':'Wrong password'});
            }
            return done(null,user,{'message':'Logged in successfully'});
        }
        catch(err){
            return done(err);
        }
    }
));


passport.use(new JwtStrategy({
    secretOrKey:process.env.AUTH_SECRET,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
},
    async(token,done)=>{
        try{
            return done(null,token.user);
        }
        catch(err){
            return done(err);
        }
    }
));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyToken = async(token)=>{
    try{
        const decoded = await jwt.verify(token,process.env.AUTH_SECRET);
        //console.dir(decoded);
        if(!decoded){
            return null;
        }
        //console.dir(decoded.user._id);
        return decoded.user._id;
    }
    catch(err){
        return null;
    }
}

exports.isOrg = async(req,res,next)=>{
    if(req.params.id != req.user._id){
        return res.status(400).json({error: 'You are not authorized!'});
    }
    next();
}