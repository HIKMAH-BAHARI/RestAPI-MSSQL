require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require('express');

const usersRouters = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.static('public/images'));

app.use('/users', usersRouters );

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
})

