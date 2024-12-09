const express = require('express');
const SertifController =  require('../controller/sertifs');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();
const cors = require('cors');

router.use(authenticateToken);

router.post('/', SertifController.searchSertifs);


module.exports =  router;