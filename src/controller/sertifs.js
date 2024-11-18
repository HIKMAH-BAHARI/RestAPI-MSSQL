const SertifModel = require('../models/sertifs');

const InputSertif = async (req, res) => {
    try {
    const { nokontrak, nama, sahir, saldoblok, notab, angsmdl, angsmgn, tgleff,
        tf_hik, tf_nasabah, sahiratm, tglinput, kdaoh, userinput } = req.body;

    if (Object.values({
        nokontrak, nama, sahir, saldoblok, notab, angsmdl, angsmgn, tgleff,
        tf_hik, tf_nasabah, sahiratm, tglinput, kdaoh, userinput
    }).some(value => !value)) {
        return res.status(400).json({
            message: 'Data tidak boleh kosong',
            data: null,
        });
    }

    await SertifModel.InputSertif({
        nokontrak, nama, sahir, saldoblok, notab, angsmdl, angsmgn, tgleff,
        tf_hik, tf_nasabah, sahiratm, tglinput, kdaoh, userinput 
    });
    
    res.status(201).json({
        message: 'Input Sertif success',
        data: {
        nokontrak, nama, sahir, saldoblok, notab, angsmdl, angsmgn, tgleff,
        tf_hik, tf_nasabah, sahiratm, tglinput, kdaoh, userinput
        }
    });
    } catch (error) {
        console.error('Error during input sertif:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
}

module.exports = { InputSertif }