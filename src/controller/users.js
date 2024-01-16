const UserModel = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const { recordset } = await UserModel.getAllUsers();

    res.json({
      data: recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Mendapatkan nilai ID dari parameter rute
    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json({
      message: 'GET user by ID success',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  console.log(req.body);
  const { body } = req;

  if (!body.email || !body.name || !body.address) {
    return res.status(400).json({
      message: 'Anda mengirimkan data tidak valdi',
      data: null,
    });
  }

  try {
    await UserModel.createNewUser(body);
    res.status(201).json({
      message: 'Create new users succes',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const viewUserByName = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const user = await UserModel.viewUserByName(body);

  try {
    await UserModel.viewUserByName(body);
    res.status(201).json({
      message: 'Pencarian data sukses',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;
  const { body } = req;
  try {
    await UserModel.updateUser(body, idUser);
    res.json({
      message: 'UPDATE user success',
      data: {
        id: idUser,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await UserModel.deleteUser(idUser);
    res.json({
      message: 'DELETE user success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  viewUserByName,
  updateUser,
  deleteUser,
};
