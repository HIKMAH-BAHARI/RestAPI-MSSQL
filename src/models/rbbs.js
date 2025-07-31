const dbPool = require('../config/databaseUser');
const mssql = require('mssql');

const getAllRbb = () => {
    const SQLQuery = `select keterangan, rbb from tb_lapm`;
  
    return dbPool.query(SQLQuery);
  };

module.exports = {
    getAllRbb
}