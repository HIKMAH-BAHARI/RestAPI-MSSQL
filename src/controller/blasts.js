const BlastsModel = require('../models/blasts');

const getBirthdays = async (req, res) => {
    try {
        const { recordset } = await BlastsModel.getBirthdays();

        res.json({
            data: recordset,
        });
    } catch (error) {
        res.status(500).json ({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
}

module.exports = {
    getBirthdays,
}