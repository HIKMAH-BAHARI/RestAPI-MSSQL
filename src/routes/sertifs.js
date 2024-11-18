const express = require('express');
const SertifController =  require('../controller/sertifs');
const authenticateToken = require('../middleware/authenticateToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const cors = require('cors');

router.post('/', SertifController.InputSertif);


module.exports =  router;