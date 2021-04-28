/**
 * @file Configuration file for project
 * @module config
 * @category server/src/config
 */
module.exports = {
    port: 8080,
    db: {
        database: "quizz" || process.env.DB_NAME,
        user: 'root' || process.env.DB_USER,
        password: '' || process.env.DB_PASS,
        driver: "mysql",

        options: {
            dialect: 'mysql',
            host: 'localhost',
            port: 3306
        }
    },
    db2: {
        database: "test-db-mysql" || process.env.DB_NAME,
        user: 'root' || process.env.DB_USER,
        password: 'jXGWcN3Nqvuc4jJ' || process.env.DB_PASS,
        driver: "mysql",
     
        options: {
            dialect: 'mysql',
            host: '10.150.30.233',
            port: 33068
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
    default: {
        backendBaseURL: `http://localhost:8080`,
        frontendBaseURL: `http://localhost:8081`
    },
    email: {
        host: "smtp.quizz.hr",
        port: 587,
        secure: false,
        auth: {
            user: 'imiljanic',
            pass: 'tUmG9hQmZeyb'
        }
    },
    productionTip: false,
    silent: false,
    devtools: true
}