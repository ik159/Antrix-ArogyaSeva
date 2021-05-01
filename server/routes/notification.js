const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const notificationController = require('../controllers/notificationController');

router.post("/subscribe",notificationController.subscribe);
router.get("/broadcast",auth.verifyUser,notificationController.broadcast);
router.get("/volunteers",auth.verifyUser,notificationController.notifyVolunteers);

module.exports = router;