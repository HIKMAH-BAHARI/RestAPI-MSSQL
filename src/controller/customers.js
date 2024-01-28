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

const ViewOsByKdloc = async (req, res) => {
  try {
    const kdlocId = req.params.kdlocId;
    const kdloc = await CustomerModel.ViewOsByKdloc(kdlocId);
    
    res.json({
      message: 'GET kdloc success',
      data: kdloc
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    })
  }

}

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

const getAllArrears = async (req, res) => {
  try {
    const dateId = req.query.tanggal;
    const date = await CustomerModel.getAllArrears(dateId);
    
    
    if (!date === 0) {
      return res.status(404).json({
        message: 'Tanggal tidak valid',
      });
    }

    res.json({
      message: 'GET data success',
      data: date,
    });
  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
}

const getAllRealisasi = async (req, res) => {
  try {
    const dateStart = req.query.datestart;
    const dateEnd = req.query.dateend;
    const dated = await CustomerModel.getAllRealisasi(dateStart, dateEnd);
    
    if (!dateStart || !dateEnd ) {
      return res.status(404).json({
        message: 'Tanggal tidak valid',
      });
    }

    res.json({
      message: 'GET data success',
      data: dated,
    });
  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
}

module.exports = {
  getAllCustomers,
  searchCostomers,
  ViewOs,
  getAllArrears,
  ViewOsByKdloc,
  getAllRealisasi,
};
