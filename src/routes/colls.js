const express = require('express');
const authenticateToken = require('../middleware/authenticateToken')

const CollController = require('../controller/colls');

const router = express.Router();

router.use(authenticateToken);

//Read - GET Nasabah Coll 2
router.get('/', CollController.getAllColl);

//Read - GET OS Total Coll
router.get('/os', CollController.getOsColl);

//Read - GET NPF
router.get('/npf', CollController.getNpf);

module.exports = router;
