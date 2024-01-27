const express = require('express');

const CustomerController = require('../controller/customers');

const router = express.Router();

//Read - POST
router.post('/', CustomerController.searchCostomers);

// READ - GET
router.get('/', CustomerController.getAllCustomers);

//GET - OS Pembiayaan
router.get('/os', CustomerController.ViewOs);

//GET - OS Pembiayaan Percabang
router.get('/os/:kdlocId', CustomerController.ViewOsByKdloc);

//GET - Tunggakan Harian
router.get('/arrears', CustomerController.getAllArrears);

module.exports = router;
