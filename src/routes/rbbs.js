const express = require('express');
const RbbController = require('../controller/rbbs');
const router = express.Router();
const authenticateToken =require('../middleware/authenticateToken')

router.use(authenticateToken);

router.get('/', RbbController.getAllRbb);

module.exports = router;