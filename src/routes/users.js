const express = require('express');
const UserController = require('../controller/users');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();


//CREATE - POST
router.post('/', UserController.createNewUser);

//Read - POST
//router.post('/search', UserController.viewUserByName);

//LOGIN - POST
router.post('/login', UserController.loginUser);

// READ - GET
//router.get('/', UserController.getAllUsers);

// READ - GET by ID
// router.get('/:id', UserController.getUserById);

//UPDATE - PATCH
// router.patch('/:idUser', UserController.updateUser);

//DELETE - DELETE
// router.delete('/:idUser', UserController.deleteUser);

router.get('/protected-route', authenticateToken, UserController.protectedRoute);

module.exports = router;
