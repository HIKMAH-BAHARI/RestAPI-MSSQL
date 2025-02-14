const RbbModel = require('../models/rbbs');

const getAllRbb = async (req, res) => {
  try {
    const { recordset } = await RbbModel.getAllRbb();

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

module.exports = {
    getAllRbb
}