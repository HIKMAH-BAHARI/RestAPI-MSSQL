
const UserModel = require ('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UserModel.getAllUsers();
        
        res.json({
            message: "GET all users success",
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewUser = async (req, res) => {
    console.log(req.body);
    const {body} = req;
    const existingUser  = await UserModel.findOne(data);

    try {
        await UserModel.createNewUser(body);
        res.json({
            message: "Create new users succes",
            data: body
        })
        
    if (existingUser) {
        return res.status(400).json({ error: 'Username sudah terdaftar.' });
    }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
    
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