const dbPool = require('../config/databases');
const mssql = require('mssql');


const searchSertifs = (body) => {
  const SQLQuery = `
    WITH RankedTOFRS AS (
    SELECT
        nokontrak,
        tagmgn,
        tagmdl,
        tagdnd,
        tgltagih,
        os,
        ROW_NUMBER() OVER (PARTITION BY nokontrak ORDER BY tgltagih ASC) AS row_num
    FROM
        TOFRS
    WHERE
        stsbyr = ''
)
SELECT
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
    R.tagmgn,
    R.tagmdl,
    R.tagdnd,
    R.tgltagih,
    R.os AS sisa_angsuran,
    SUM(R.tagmgn + R.tagmdl + R.tagdnd) AS angsttl,
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
    RankedTOFRS R ON TOFLMB.nokontrak = R.nokontrak AND R.row_num = 1
WHERE
    (TOFLMB.nama LIKE '%' + @nama + '%' OR TOFLMB.nokontrak LIKE @nama)
    AND TOFLMB.stsrec = 'A'
    AND TOFLMB.kdprd IN (11, 12, 13, 16, 21, 22, 23, 25)
GROUP BY
    TOFLMB.tgleff,
    TOFLMB.nokontrak,
    TOFLMB.acdrop,
    TOFLMB.nama,
    mCIF.alamat,
    mCIF.kelurahan,
    mCIF.kecamatan,
    mCIF.kota,
    mCIF.hp,
    MCIFJOB.namapt,
    MCIFJOB.alamat,
    MCIFJOB.kota,
    TOFLMB.kdprd,
    TOFLMB.kdaoh,
    TOFLMB.frekmdl,
    TOFLMB.mdlawal,
    TOFLMB.mgnawal,
    R.tagmgn,
    R.tagmdl,
    R.tagdnd,
    R.tgltagih,
    R.os,
    TOFTABC.sahirrp,
    TOFTABC.saldoblok,
    TOFLMB.colbaru,
    TOFLMB.kdcab,
    TOFLMB.tglakad
ORDER BY
    TOFLMB.tglakad DESC;
  `;

  const request = dbPool.request();
  request.input('nama', mssql.VarChar, `%${body.nama || ''}%`);
  request.input('date', body.date ? body.date : null);

  return request.query(SQLQuery).then((result) => result.recordset);
};

module.exports = { searchSertifs }