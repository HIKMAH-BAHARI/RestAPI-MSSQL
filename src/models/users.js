const dbPool = require('../config/databases');
const dbPoolLogin = require('../config/databaseUser');
const mssql = require('mssql');

const getAllUsers = (body) => {
  const SQLQuery = `SELECT TOP 1000 * FROM TOFLMB where stsrec='A' ORDER BY nocif`;

  return dbPool.query(SQLQuery);
};

const getUserById = (userId) => {
  const SQLQuery = `SELECT * FROM TOFDEP WHERE nodep =${userId}`;
  return dbPool
    .query(SQLQuery, { userId: { type: dbPool.Int, val: userId } })
    .then((result) => result.recordset); // Mengambil hanya bagian recordset
};

const getUserByEmail = async (email) => {
  const SQLQuery = `SELECT email FROM tb_user WHERE email = @email`;

  const request = dbPoolLogin.request();
  request.input('email', mssql.VarChar, email);

  const result = await request.query(SQLQuery);

  // Mengembalikan data pengguna jika ditemukan, atau null jika tidak ditemukan
  return result.recordset.length > 0 ? result.recordset[0] : null;
};

/* Data didapatkan dari request body */
const createNewUser = (body) => {
  const SQLQuery = `
    INSERT INTO tb_user (email, password, nama)
    VALUES (@email, @password, @nama)`;

  const request = dbPoolLogin.request();
  request.input('email', mssql.VarChar, body.email); // Menggunakan body.email
  request.input('password', mssql.VarChar, body.password); // Menggunakan body.password
  request.input('nama', mssql.VarChar, body.nama); // Menggunakan body.nama

  return request.query(SQLQuery);
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
  TOFLMB.kdprd,
  TOFLMB.kdaoh,
  TOFLMB.frekmdl,
  TOFLMB.mdlawal,
  TOFLMB.mgnawal,
  TOFLMB.angsmdl,
  TOFLMB.angsmgn,
  TOFLMB.osmdlc,
  TOFLMB.osmgnc,
  TOFLMB.colbaru,
  TOFLMB.kdcab
FROM
  TOFLMB
LEFT JOIN
  mCIF ON TOFLMB.nocif = mCIF.nocif
RIGHT JOIN
  TOFRS ON TOFLMB.nokontrak = TOFRS.nokontrak
WHERE
  (TOFLMB.nama LIKE '%${body.nama}%' OR TOFLMB.nokontrak LIKE '%${body.nama}%') AND TOFLMB.stsrec = 'A' AND TOFRS.stsbyr = ''
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
  getUserByEmail,
  createNewUser,
  viewUserByName,
  updateUser,
  deleteUser,
};
