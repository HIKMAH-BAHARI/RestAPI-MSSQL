const express = require('express');
const CustomerController = require('../controller/customers');
const router = express.Router();
const authenticateToken =require('../middleware/authenticateToken')
const cors = require('cors')

router.use(cors());
//router.use(authenticateToken); // untuk mengaktifkan semua authenticateToken

//GET - OS Pembiayaan
router.get('/os', authenticateToken, CustomerController.ViewOs);
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
