const dbPool = require('../config/databases');
const mssql = require('mssql');


const searchSertifs = (body) => {
  const SQLQuery = `
    SELECT TOP 3
        TOFLMB.tgleff,
        TOFLMB.nokontrak,
        TOFLMB.acdrop,
        TOFLMB.nama,
        mCIF.alamat,
        mCIF.kelurahan,
        mCIF.kecamatan,
        mCIF.kota,
        mCIF.hp,
        MCIFJOB.alamat AS alamatpt,
        MCIFJOB.kota AS kotapt,
        MCIFJOB.namapt,
        TOFLMB.kdprd,
        TOFLMB.kdaoh,
        TOFLMB.frekmdl,
        TOFLMB.mdlawal,
        TOFLMB.mgnawal,
        TOFRS.tagmgn,
        TOFRS.tagmdl,
        TOFRS.tagdnd,
        TOFRS.tgltagih,
        SUM(TOFRS.tagmgn + TOFRS.tagmdl + TOFRS.tagdnd) AS angsttl,
        TOFRS.os AS sisa_angsuran,
        TOFTABC.sahirrp,
        TOFTABC.saldoblok,
        TOFLMB.colbaru,
        TOFLMB.kdcab
    FROM
        TOFLMB
    LEFT JOIN
        mCIF ON TOFLMB.nocif = mCIF.nocif
    LEFT JOIN
        TOFTABC ON TOFLMB.acdrop = TOFTABC.notab
    LEFT JOIN
        MCIFJOB ON mCIF.nocif = MCIFJOB.nocif
    LEFT JOIN
        TOFRS ON TOFLMB.nokontrak = TOFRS.nokontrak
    WHERE
        (TOFLMB.nama LIKE '%' + @nama + '%' OR TOFLMB.nokontrak LIKE @nama)
        AND TOFLMB.stsrec = 'A'
        AND TOFRS.stsbyr = ''
        AND TOFLMB.kdprd in (11, 12, 13, 16, 21, 22, 23, 25)
    GROUP BY
        TOFLMB.tgleff,
        TOFLMB.nokontrak,
        TOFLMB.acdrop,
        TOFLMB.nama,
        mCIF.alamat,
        mCIF.kota,
        mCIF.kelurahan,
        mCIF.kecamatan,
        mCIF.hp,
        MCIFJOB.namapt,
        MCIFJOB.alamat,
        MCIFJOB.kota,
        TOFLMB.kdprd,
        TOFLMB.kdaoh,
        TOFLMB.frekmdl,
        TOFLMB.tglakad,
        TOFLMB.mdlawal,
        TOFLMB.mgnawal,
        TOFLMB.angsmdl,
        TOFLMB.angsmgn,
        TOFTABC.sahirrp,
        TOFTABC.saldoblok,
        TOFLMB.colbaru,
        TOFLMB.kdcab,
        TOFRS.tagmgn,
        TOFRS.tagmdl,
        TOFRS.tagdnd,
        TOFRS.tgltagih,
        TOFRS.os
    ORDER BY
        TOFLMB.tglakad DESC;
  `;

  const request = dbPool.request();
  request.input('nama', mssql.VarChar, `%${body.nama || ''}%`);
  request.input('date', body.date ? body.date : null);

  return request.query(SQLQuery).then((result) => result.recordset);
};

module.exports = { searchSertifs }