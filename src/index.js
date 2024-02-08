require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');


const usersRouters = require('./routes/users');
const collsRouters = require('./routes/colls');
const customersRouters = require('./routes/customers');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./combined.pem')
};

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://ereport-hikba.vercel.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization', 
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ereport-hikba.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);  
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

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

