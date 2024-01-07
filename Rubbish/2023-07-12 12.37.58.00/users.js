
const UserModel = require ('../models/users');

const getAllUsers = async (req, res) => {
    try {const [data] = await UserModel.getAllUsers();

        res.json({
            message: "GET all users success",
            data: data
        })
        }
    }



const createNewUser = (req, res) => {
    console.log(req.body);
    res.json({
        message: "Create new users succes",
        data: req.body
    })
} 
    
const updateUser = (req, res) => {
    const {idUser} = req.params;
    console.log('idUser:', idUser);
    res.json({
        message: 'UPDATE user success',
        data : req.body,
    })
}

const deleteUser = (req, res) => {
    const {idUser} = req.params;
    res.json({
        message: 'DELETE user success',
        data : {
            id: idUser,
            name: "Hendar",
            email: "bintang7@gmail.com",
            address: "Jakarta"
        }
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser

}