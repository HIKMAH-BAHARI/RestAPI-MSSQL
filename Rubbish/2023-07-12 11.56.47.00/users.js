const dbPool = require('../config/databases');

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