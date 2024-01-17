const mssql = require('mssql');
require('dotenv').config();

const configLogin = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME2,
  options: {
    encrypt: false,
  },
};

const dbPoolLogin = new mssql.ConnectionPool(configLogin);

async function connectDB() {
  try {
    await dbPoolLogin.connect();
    console.log('Connected to database Users');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
}

connectDB();

module.exports = dbPoolLogin;
