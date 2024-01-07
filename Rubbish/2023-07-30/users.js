const dbPool = require('../config/databases');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) =>{
    const SQLQuery= `INSERT INTO users (name, address, email)
                    VALUES ('${body.name}', '${body.address}', '${body.email}')`;
        
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    createNewUser,
}