const express = require('express');

const CustomerController = require('../controller/customers');

const router = express.Router();

//Read - POST
router.post('/', CustomerController.searchCostomers);

// READ - GET
router.get('/', CustomerController.getAllCustomers);

//GET - OS Pembiayaan
router.get('/os', CustomerController.ViewOs);

module.exports = router;
