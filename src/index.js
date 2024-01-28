require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');

const usersRouters = require('./routes/users');
const collsRouters = require('./routes/colls');
const customersRouters = require('./routes/customers');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Sesuaikan dengan asal aplikasi frontend Anda
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization', // Tambahkan 'Authorization' ke daftar allowed headers
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Ganti '*' dengan asal yang diizinkan di lingkungan produksi
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use('/users', usersRouters);
app.use('/colls', collsRouters);
app.use('/customers', customersRouters);

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
