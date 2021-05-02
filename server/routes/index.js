var express = require('express');
var router = express.Router();
const auth = require('../auth/auth');
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'test':'successfull'});
});
router.get("/getuser",auth.verifyUser,userController.getUserInfo);

module.exports = router;
