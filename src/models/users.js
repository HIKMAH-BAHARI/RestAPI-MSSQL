const dbPool = require('../config/databases');

const getAllUsers = (body) => {
    const SQLQuery = `SELECT * FROM TOFDEP`;

    return dbPool.query(SQLQuery);
}

const getUserById = (userId) => {
    const SQLQuery = `SELECT * FROM TOFDEP WHERE nocif =${userId}`;
    return dbPool.query(SQLQuery, { userId: { type: dbPool.Int, val: userId } })
        .then(result => result.recordset); // Mengambil hanya bagian recordset
}

/* Data didapatkan dari request body */
const createNewUser = (body) =>{
    const SQLQuery= `   INSERT INTO users (name, address, email)
                    VALUES ('${body.name}', '${body.address}', '${body.email}')`;
        
    return dbPool.execute(SQLQuery);
}

// const viewUserByName = async (body) => {
//     try {
//         // Gunakan parameterized query untuk menghindari SQL injection
//         const SQLQuery = `SELECT * FROM TOFDEP WHERE nama =${}`;
        
//         // Lakukan eksekusi query dengan parameter menggunakan mssql
//         const result = await dbPool.request()
//             .input('search', body.search)
//             .query(SQLQuery);

//         // Manipulasi atau memproses hasil query sesuai kebutuhan
//         const users = result.recordset; // Misalnya, dapat memanipulasi hasil query untuk mendapatkan array pengguna

//         return {
//             success: true,
//             message: 'Pencarian berhasil',
//             data: users,
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             success: false,
//             message: 'Terjadi kesalahan dalam pencarian',
//             data: null,
//         };
//     }
// };
    
const updateUser = (body, idUser) => {
    const SQLQuery= `   UPDATE users
                        SET name='${body.name}', address='${body.address}', email='${body.email}'
                        WHERE id=${idUser}`;
        
    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery= `   DELETE FROM users WHERE id=${idUser}`;

    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
}