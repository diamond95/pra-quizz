const mysql = require('mysql2')
const config = require('../config/config')

const pool = mysql.createPool({
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    host: config.db.options.host,
    port: config.db.options.port
    
})

module.exports = pool.promise()
