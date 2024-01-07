const express = require('express');

const usersRouters = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRouters );

app.use('/', (req, res) => {
   
})

app.listen(4000, () => {
    console.log('Server Running on Port 4000');
})