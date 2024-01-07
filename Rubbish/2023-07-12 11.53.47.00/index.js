const express = require('express');
const mysql = require('mysql2');

const usersRouters = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'express_mysql',
});

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRouters );

app.use('/', (req, res) => {
    dbPool.execute('SELECT * FROM users', (err, rows) => {
        if(err){
            res.json({
                message: 'connection failed'
            })
        }

        res.json({
            message: 'connection succes',
            data: rows[0],
        })
    })
})

app.listen(4000, () => {
    console.log('Server Running on Port 4000');
})