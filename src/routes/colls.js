const express = require('express');

const CollController = require('../controller/colls');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.use(authenticateToken);

//Read - GET Nasabah Coll 2
router.get('/', CollController.getAllColl);

//Read - GET OS Total Coll
router.get('/os', CollController.getOsColl);

//Read - GET NPF
router.get('/npf', CollController.getNpf);

module.exports = router;
