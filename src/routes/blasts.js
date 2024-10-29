const express = require('express');
const BlastController = require('../controller/blasts');
const router = express.Router();

router.get('/birthdays', BlastController.getBirthdays);

module.exports = router;
