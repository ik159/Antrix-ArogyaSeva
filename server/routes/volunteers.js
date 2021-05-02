var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const volunteerController = require('../controllers/volunteerController');
const bloodDonorController = require('../controllers/bloodDonorController');
const auth = require('../auth/auth');

router.get("/donors/plasma",bloodDonorController.getPlasmaDonors);
router.get("/donors/blood",bloodDonorController.getBloodDonors);
router.get("/donors",bloodDonorController.getDonors);
router.post("/donors",auth.verifyUser,bloodDonorController.createDonor);
router.get("/donors/:id",bloodDonorController.getDonor);
router.put("/donors/:id",auth.verifyUser,auth.isDonor,bloodDonorController.updateDonorDetails);
router.delete("/donors/:id",auth.verifyUser,auth.isDonor,bloodDonorController.deleteDonor);


router.get("/",volunteerController.getVolunteers);
router.get("/:id",volunteerController.getVolunteer);
router.put("/:id",auth.verifyUser,volunteerController.updateInfo);



module.exports = router;