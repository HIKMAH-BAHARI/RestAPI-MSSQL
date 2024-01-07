const express = require('express');

const UserController = require('../controller/users');

const router = express.Router();

//CREATE - POST
router.get('/', UserController.getAllUsers);

router.post('/', UserController.createNewUser);

module.exports = router;