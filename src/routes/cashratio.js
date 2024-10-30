const express = require('express')
const cashRatiollController = require('../controller/cashratios')
const authenticateToken = require('../middleware/authenticateToken');


const router = express.Router();
router.use(authenticateToken);

router.get('/:hari/:bulan/:tahun', cashRatiollController.cashRatio)


module.exports = router