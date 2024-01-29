require ('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

// const getAllUsers = async (req, res) => {
//   try {
//     const { recordset } = await UserModel.getAllUsers();

//     res.json({
//       data: recordset,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server Error',
//       serverMessage: error,
//     });
//   }
// };

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

const loginUser = async (req, res) => {
  secretKey = process.env.SECRET_KEY;
  const { email, password } = req.body;

  try {
    const user = await UserModel.loginUser(email);

    // Tambahkan pernyataan log untuk memeriksa tipe data dan nilai
    console.log('Type of password:', typeof password);
    console.log('Value of password:', password);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Login gagal' });
    }

    // Tambahkan pernyataan log sebelum menggunakan bcrypt.compare
    console.log('Before bcrypt.compare');

    const passwordMatch = await bcrypt.compare(String(password), String(user.password));

    // Tambahkan pernyataan log setelah menggunakan bcrypt.compare
    console.log('After bcrypt.compare');

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1M' });
      return res.json({ success: true, message: 'Login berhasil', token });
    } else {
      return res.status(401).json({ success: false, message: 'Login gagal' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server Error', serverMessage: error.message });
  }
};

const createNewUser = async (req, res) => {
  const { email, password, nama } = req.body;

  if (!email || !password || !nama) {
    return res.status(400).json({
      message: 'Anda mengirimkan data tidak valid',
      data: null,
    });
  }

  try {
    const existingUser = await UserModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'Email Sudah Terdaftar',
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: hashedPassword,
      nama,
    };
    await UserModel.createNewUser(userData);
    res.status(201).json({
      message: 'Create new user success',
      data: userData,
    });
  } catch (error) {
    console.error('Error creating new user:', error.message);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

// * DIPINDAH KE CUSTOMERS
// const viewUserByName = async (req, res) => {
//   console.log(req.body);
//   const { body } = req;
//   const user = await UserModel.viewUserByName(body);

//   try {
//     await UserModel.viewUserByName(body);
//     res.status(201).json({
//       message: 'Pencarian data sukses',
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server Error',
//       serverMessage: error,protectedRoute
//     });
//   }
// };

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

const protectedRoute = (req, res) => {
  res.json({ success: true, message: 'This is a protected route.', user: req.user });
};

module.exports = {
  //getAllUsers,
  getUserById,
  loginUser,
  createNewUser,
  //viewUserByName,
  updateUser,
  deleteUser,
  protectedRoute,
};
