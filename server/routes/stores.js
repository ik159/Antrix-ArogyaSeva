var express = require('express');
var router = express.Router();
const storesController = require('../controllers/storesController');
const auth = require('../auth/org_auth');

router.get("/",storesController.getStores);
router.get("/:id",storesController.getStore);
router.put("/:id",auth.verifyUser,auth.isOrg,storesController.updateData);
router.post("/:id",auth.verifyUser,auth.isOrg,storesController.addSupplies);
router.put("/:id/product/:pId",auth.verifyUser,auth.isOrg,storesController.updateSupply);
router.delete("/:id/product/:pId",auth.verifyUser,auth.isOrg,storesController.deleteSupply)

module.exports = router;