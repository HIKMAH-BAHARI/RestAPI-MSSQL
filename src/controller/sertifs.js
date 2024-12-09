const SertifModel = require('../models/sertifs');

const searchSertifs = async (req, res) => {
  const { body } = req;
  const sertif = await SertifModel.searchSertifs(body);

  try {
    await SertifModel.searchSertifs(body);
    res.status(201).json({
      message: 'Pencarian data sukses',
      data: sertif,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};
module.exports = { searchSertifs }