const CollModel = require('../models/colls');

const getAllColl = async (req, res) => {
  try {
    const generateColl = req.query.kdcoll;
    const coll = await CollModel.getAllColl(generateColl);

    if (!coll.length === 0) {
      return res.status(404).json({
        message: 'Tanggal tidak valid',
      });
    }

    res.json({
      message: 'GET all Nasabah Coll 2 success',
      data: coll,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
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

const getNpf = async (req, res) => {
  try {
    const { recordset } = await CollModel.getNpf()

    res.json({
      message: 'Get NPF success',
      data: recordset, 
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    })
  }
}

module.exports = {
  getAllColl,
  getOsColl,
  getNpf,
};
