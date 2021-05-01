var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const volunteerController = require('../controllers/volunteerController');
const auth = require('../auth/auth');

router.get("/",volunteerController.getVolunteers);
router.get("/:id",volunteerController.getVolunteer);
router.put("/:id",auth.verifyUser,auth.canUpdateAndDelete,volunteerController.updateInfo);

module.exports = router;