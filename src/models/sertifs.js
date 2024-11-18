const dbPoolLogin = require('../config/databaseUser');
const mssql = require('mssql');


const InputSertif = (body) => {
    const SQLQuery = `INSERT INTO sertif (nokontrak, nama, sahir, saldoblok, notab,
                        angsmdl, angsmgn, tgleff, tf_hik, tf_nsbh, sahiratm, tglinput, kdaoh, userinput)
                    VALUES (
            @nokontrak, @nama, @sahir, @saldoblok, @notab,
            @angsmdl, @angsmgn, @tgleff, @tf_hik, @tf_nsbh, 
            @sahiratm, @tglinput, @kdaoh, @userinput
        )`;

    const request = dbPoolLogin.request();
    request.input('nokontrak', mssql.VarChar, body.nokontrak);
    request.input('nama', mssql.VarChar, body.nama);
    request.input('sahir', mssql.Numeric, body.sahir);
    request.input('saldoblok', mssql.Numeric, body.saldoblok);
    request.input('notab', mssql.VarChar, body.notab);
    request.input('angsmdl', mssql.Numeric, body.angsmdl);
    request.input('angsmgn', mssql.Numeric, body.angsmgn);
    request.input('tgleff', mssql.VarChar, body.tgleff);
    request.input('tf_hik', mssql.Numeric, body.tf_hik);
    request.input('tf_nsbh', mssql.Numeric, body.tf_nasabah);
    request.input('sahiratm', mssql.Numeric, body.sahiratm);
    request.input('tglinput', mssql.VarChar, body.tglinput);
    request.input('kdaoh', mssql.VarChar, body.kdaoh);
    request.input('userinput', mssql.VarChar, body.userinput);    

    return request.query(SQLQuery);
}


module.exports = { InputSertif }