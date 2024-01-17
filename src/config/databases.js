// const mysql = require('mysql2');
// const dbPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// module.exports = dbPool.promise();

const mssql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
  },
};

const dbPool = new mssql.ConnectionPool(config);

async function connectDB() {
  try {
    await dbPool.connect();
    console.log('Connected to database Main');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
}

connectDB();

module.exports = dbPool;
