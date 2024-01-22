const express = require('express');
const authLogin= require('../middleware/authLogin');
const UserController = require('../controller/users');

const router = express.Router();

//CREATE - POST
router.post('/', UserController.createNewUser);

//Read - POST
//router.post('/search', UserController.viewUserByName);

//LOGIN - POST
router.post('/login', UserController.loginUser);
// router.get('/protected', authLogin, async (req, res) => {
//     try {
//       const users = await User.getAll();
//       res.json({ success: true, message: 'Rute terlindungi', data: users });
//     } catch (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send('Server error');
//     }
//   });


// READ - GET
//router.get('/', UserController.getAllUsers);

// READ - GET by ID
router.get('/:id', UserController.getUserById);

//UPDATE - PATCH
router.patch('/:idUser', UserController.updateUser);

//DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;
