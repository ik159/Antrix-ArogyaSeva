const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const notificationController = require('../controllers/notificationController');

router.post("/subscribe",notificationController.subscribe);
router.get("/broadcast",notificationController.broadcast);
router.get("/volunteers",notificationController.notifyVolunteers);

module.exports = router;