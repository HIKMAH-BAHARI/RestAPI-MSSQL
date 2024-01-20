const CustomerModel = require('../models/customers');

const getAllCustomers = async (req, res) => {
  try {
    const { recordset } = await CustomerModel.getAllCustomers();

    res.json({
      data: recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const ViewOs = async (req, res) => {
  try {
    const { recordset } = await CustomerModel.ViewOs();

    res.json({
      data: recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const searchCostomers = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const customer = await CustomerModel.searchCostomers(body);

  try {
    await CustomerModel.searchCostomers(body);
    res.status(201).json({
      message: 'Pencarian data sukses',
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllCustomers,
  searchCostomers,
  ViewOs,
};
