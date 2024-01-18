const dbPool = require('../config/databases');

const getAllCustomers = (body) => {
  const SQLQuery = `SELECT top 5 nocif, nama, nokontrak, kdprd, mdlawal FROM TOFLMB WHERE stsrec='A' ORDER BY nama`;

  return dbPool.query(SQLQuery);
};

const searchCostomers = (body) => {
  const SQLQuery = `    SELECT TOP 10
  TOFLMB.tglakad,
  TOFLMB.nokontrak,
  TOFLMB.acdrop,
  TOFLMB.nama,
  mCIF.alamat,
  mCIF.hp,
  TOFLMB.kdprd,
  TOFLMB.kdaoh,
  TOFLMB.frekmdl,
  TOFLMB.mdlawal,
  TOFLMB.mgnawal,
  TOFLMB.angsmdl,
  TOFLMB.angsmgn,
  SUM(angsmdl + angsmgn) as angsttl,
  TOFLMB.osmdlc,
  TOFLMB.osmgnc,
  TOFTABB.sahirrp,
  TOFLMB.colbaru,
  TOFLMB.kdcab
FROM
  TOFLMB
LEFT JOIN
  mCIF ON TOFLMB.nocif = mCIF.nocif
LEFT JOIN
  TOFTABB ON TOFLMB.acdrop = TOFTABB.notab
WHERE
  (TOFLMB.nama LIKE '%${body.nama}%' OR TOFLMB.nokontrak LIKE '${body.nama}') AND TOFLMB.stsrec = 'A'
GROUP BY
  TOFLMB.tglakad,
  TOFLMB.nokontrak,
  TOFLMB.acdrop,
  TOFLMB.nama,
  mCIF.alamat,
  mCIF.hp,
  TOFLMB.kdprd,
  TOFLMB.kdaoh,
  TOFLMB.frekmdl,
  TOFLMB.mdlawal,
  TOFLMB.mgnawal,
  TOFLMB.angsmdl,
  TOFLMB.angsmgn,
  TOFLMB.osmdlc,
  TOFLMB.osmgnc,
  TOFTABB.sahirrp,
  TOFLMB.colbaru,
  TOFLMB.kdcab
ORDER BY
  TOFLMB.tglakad DESC
`;

  return dbPool.query(SQLQuery).then((result) => result.recordset);
};

module.exports = {
  getAllCustomers,
  searchCostomers,
};
