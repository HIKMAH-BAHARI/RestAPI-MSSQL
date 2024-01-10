const express = require('express');

const UserController = require('../controller/users');

const router = express.Router();

//CREATE - POST
router.post('/', UserController.createNewUser);

//Read - POST
router.post('/search', UserController.viewUserByName);

// READ - GET
router.get('/', UserController.getAllUsers);

// READ - GET by ID
router.get('/:id', UserController.getUserById);

//UPDATE - PATCH
router.patch('/:idUser', UserController.updateUser);

//DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;
