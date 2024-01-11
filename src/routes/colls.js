const express = require('express');

const CollController = require('../controller/colls');

const router = express.Router();

//Read - GET Nasabah Coll 2
router.get('/', CollController.getAllColl);

//Read - GET OS Total Coll
router.get('/os', CollController.getOsColl);

module.exports = router;
