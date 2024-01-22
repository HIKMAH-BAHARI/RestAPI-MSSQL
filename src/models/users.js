const dbPoolLogin = require('../config/databaseUser');
const mssql = require('mssql');

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

const loginUser = async (email) => {
  try {
    const request = dbPoolLogin.request();
    const result = await request
      .input('email', mssql.NVarChar, email)
      .query('SELECT * FROM tb_user WHERE email = @email');

    // Tambahkan pernyataan log untuk memeriksa tipe data dan nilai
    console.log('Type of email:', typeof email);
    console.log('Value of email:', email);

    // Tambahkan pernyataan log sebelum mengembalikan data
    console.log('Before returning data from loginUser');

    // Mengembalikan data pengguna jika ditemukan, atau null jika tidak ditemukan
    const user = result.recordset.length > 0 ? result.recordset[0] : null;

    // Tambahkan pernyataan log setelah mengembalikan data
    console.log('After returning data from loginUser');

    return user;
  } catch (error) {
    console.error('Error executing login query:', error.message);
    throw error;
  }
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
  loginUser,
  getUserByEmail,
  createNewUser,
  //viewUserByName,
  updateUser,
  deleteUser,
};
