const dbPool = require('../config/databases');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
}