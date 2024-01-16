require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');

const usersRouters = require('./routes/users');
const collsRouters = require('./routes/colls');

const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Mengizinkan akses dari semua domain. Ganti '*' dengan domain Anda jika diperlukan.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));

app.use('/users', usersRouters);
app.use('/colls', collsRouters);
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: 'Upload berhasil',
  });
});

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
