const cRModel = require('../models/cashratios')

const cashRatio = async (req, res) => {
    const hari = parseInt(req.params.hari, 10)
    const bulan = parseInt(req.params.bulan, 10)
    const tahun = parseInt(req.params.tahun, 10)

    if (hari < 1 || hari > 31) {
        return res.status(400).send("Parameter hari tidak valid") 
    }
    if (bulan <1 || bulan > 12) {
        return res.status(400).send("Parameter bulan tidak valid")
    }
    if (tahun <1 || tahun > 9999 ) {
        return res.status(400).send("Parameter tahun tidak valid")
    }

    try {
        const Crdata = await cRModel.cashRatio(hari, bulan, tahun)
        res.json({
            messagge: 'GET data success',
            data: Crdata,
        }) 
    } catch (error) {
        res.status(500).send("Terjadi kesalahan saat mengambil data")
    }
}


module.exports = { cashRatio }