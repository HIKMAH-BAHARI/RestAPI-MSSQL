const CollModel = require('../models/colls');

const getAllColl = async (req, res) => {
  try {
    const { recordset } = await CollModel.getAllColl();

    res.json({
      message: 'GET all Nasabah Coll 2 success',
      data: recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getOsColl = async (req, res) => {
  try {
    const { recordset } = await CollModel.getOsColl();

    res.json({
      message: 'GET OS Coll 2 success',
      data: recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllColl,
  getOsColl,
};
