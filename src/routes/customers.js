const express = require('express');
const CustomerController = require('../controller/customers');
const router = express.Router();
const authenticateToken =require('../middleware/authenticateToken')
<<<<<<< HEAD
=======
// const cors = require('cors')
>>>>>>> f9eb113b0e325c2d03d84c61cc4e120fc5cbe58e

// router.use(cors());
router.use(authenticateToken); // untuk mengaktifkan semua authenticateToken

//GET - OS Pembiayaan
router.get('/os', CustomerController.ViewOs);
//Read - POST
router.post('/', CustomerController.searchCostomers);

// READ - GET
router.get('/', CustomerController.getAllCustomers);

//GET - OS Pembiayaan Percabang
router.get('/os/:kdlocId', CustomerController.ViewOsByKdloc);

//GET - Tunggakan Harian
router.get('/arrears', CustomerController.getAllArrears);

//GET - Tunggakan Harian
router.get('/realisasi', CustomerController.getAllRealisasi);

module.exports = router;
