require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');


const usersRouters = require('./routes/users');
const collsRouters = require('./routes/colls');
const customersRouters = require('./routes/customers');
const blastsRouters =  require('./routes/blasts');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');
const crRouter = require('./routes/cashratio');
const sertifRouter = require('./routes/sertifs');
const rbbRouter = require('./routes/rbbs')

const app = express();
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./combined.pem')
};

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization', 
}));


app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use('/users', usersRouters);
app.use('/colls', collsRouters);
app.use('/customers', customersRouters);
app.use('/blasts', blastsRouters);
app.use('/cashratio', crRouter);
app.use('/sertifs', sertifRouter);
app.use('/rbb', rbbRouter)
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

// app.listen(PORT, () =>{
//  console.log(`Server listening on port ${PORT}`)
// })
