const dbPool = require('../config/databases');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM usersss';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
}