const dbPool = require('../config/databases');

const getAllUsers = (body) => {
  const SQLQuery = `SELECT nocif, nama, nokontrak FROM TOFLMB WHERE stsrec='A' ORDER BY nama`;

  return dbPool.query(SQLQuery);
};

const getUserById = (userId) => {
  const SQLQuery = `SELECT * FROM TOFDEP WHERE nodep =${userId}`;
  return dbPool
    .query(SQLQuery, { userId: { type: dbPool.Int, val: userId } })
    .then((result) => result.recordset); // Mengambil hanya bagian recordset
};

/* Data didapatkan dari request body */
const createNewUser = (body) => {
  const SQLQuery = `   INSERT INTO users (name, address, email)
                    VALUES ('${body.name}', '${body.address}', '${body.email}')`;

  return dbPool.query(SQLQuery);
};

const viewUserByName = (body) => {
  const SQLQuery = `    SELECT
  TOP 1 TOFRS.stsbyr,
  TOFRS.tgltagih,
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
RIGHT JOIN
  TOFRS ON TOFLMB.nokontrak = TOFRS.nokontrak
LEFT JOIN
  TOFTABB ON TOFLMB.acdrop = TOFTABB.notab
WHERE
  (TOFLMB.nama LIKE '%${body.nama}%' OR TOFLMB.nokontrak LIKE '${body.nama}') AND TOFLMB.stsrec = 'A' AND TOFRS.stsbyr = ''
GROUP BY
  TOFRS.stsbyr,
  TOFRS.tgltagih,
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

const updateUser = (body, idUser) => {
  const SQLQuery = `   UPDATE TOFDEP
                        SET nama='${body.name}', nomawal='${body.nomawal}', nomrp='${body.nomrp}'
                        WHERE nodep=${idUser}`;

  return dbPool.query(SQLQuery);
};

const deleteUser = (idUser) => {
  const SQLQuery = `   DELETE FROM users WHERE id=${idUser}`;

  return dbPool.query(SQLQuery);
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  viewUserByName,
  updateUser,
  deleteUser,
};
