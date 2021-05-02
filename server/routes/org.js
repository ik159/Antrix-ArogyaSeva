var express = require('express');
var router = express.Router();
const orgController = require('../controllers/orgController');
const passport = require('passport');

router.get("/",orgController.getOrgs);
router.post("/signup",passport.authenticate('signup',{session:false}),
async (req,res)=>{
    await res.json({
        message:'Signed up successfully',
        user:req.user
    });
  }); 

router.post("/signin", orgController.signin);
router.get("/logout",orgController.logout);

module.exports = router;