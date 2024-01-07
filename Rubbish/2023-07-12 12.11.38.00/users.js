const dbPool = require('../config/databases');

dbPool.execute('SELECT * FROM users', (err, rows) => {

}

