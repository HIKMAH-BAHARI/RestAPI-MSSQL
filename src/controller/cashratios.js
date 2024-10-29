const cRModel = require('../models/cashratios')

const cashRatio = async (req, res) => {
    const hari = parseInt(req.params.hari, 10)

    if (hari < 1 || hari > 31) {
        return res.status(400).send("Parameter hari tidak valid") 
    }

    try {
        const data = await cRModel.cashRatio(hari)
        res.json(data) 
    } catch (error) {
        res.status(500).send("Terjadi kesalahan saat mengambil data")
    }
}


module.exports = { cashRatio }