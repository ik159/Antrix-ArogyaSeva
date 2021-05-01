var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const volunteerController = require('../controllers/volunteerController');
const auth = require('../auth/auth');

/* GET users listing. */
router.get("/",userController.getUsers);
//router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.get("/logout",userController.logout);
router.post("/register",passport.authenticate('register',{session:false}),
async (req,res)=>{
    res.json({
        message:'Signed up successfully',
        user:req.user
    });
  }); 



module.exports = router;
