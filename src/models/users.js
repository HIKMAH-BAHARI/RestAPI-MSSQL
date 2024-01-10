const dbPool = require('../config/databases');

const getAllUsers = (body) => {
  const SQLQuery = `SELECT * FROM TOFLMB where stsrec='A'`;

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
  const SQLQuery = `   SELECT TOFLMB.nokontrak, TOFLMB.acdrop, TOFLMB.nama, mCIF.alamat, TOFLMB.kdprd, TOflmb.kdaoh, TOFLMB.frekmdl,
		TOFLMB.mdlawal,TOFLMB.mgnawal, TOFLMB.angsmdl, TOFLMB.angsmgn, TOFLMB.osmdlc, TOFLMB.osmgnc, TOFLMB.colbaru,TOFLMB.kdcab
		FROM TOFLMB INNER JOIN mCif ON TOFLMB.nocif=mCif.nocif
		WHERE TOFLMB.nokontrak LIKE '%${body.nama}%'
        OR TOFLMB.nama LIKE '%${body.nama}%'   `;

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
