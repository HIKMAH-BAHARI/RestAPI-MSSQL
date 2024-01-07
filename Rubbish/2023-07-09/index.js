const express = require('express');

const usersRouters = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);

app.use('/users', usersRouters );

app.get("/", (req, res) => {
    res.json({
        nama: "Tri Yuli Yanto",
        email:"trijy7@gmail.com"
    });
});

app.post("/", (req, res) => {
    res.send('Hello Get Post');
});

app.listen(4000, () => {
    console.log('Server Running on Port 4000');
})