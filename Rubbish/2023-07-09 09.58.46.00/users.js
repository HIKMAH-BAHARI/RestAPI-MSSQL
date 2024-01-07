const getAllUsers = (req, res) => {
    res.json({
        message: "GET all users success",
    })
}


const createNewUser = (req, res) => {
    res.json({
        message: "Create new users succes",
    })
} 

module.exports = {
    getAllUsers,
    createNewUser

}