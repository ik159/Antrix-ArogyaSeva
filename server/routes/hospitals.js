var express = require('express');
var router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const auth = require('../auth/org_auth');

router.get("/",hospitalController.getHospitals);
router.get("/:id",hospitalController.getHospital);
router.put("/:id",auth.verifyUser,auth.isOrg,hospitalController.updateData);

module.exports = router;