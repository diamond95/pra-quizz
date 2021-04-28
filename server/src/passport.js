const passport = require('passport')
const db = require('./models/index')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
   
      const user = await db.query('SELECT * FROM Users WHERE IDUser = ?', [jwtPayload.IDUser])
  
      if (!user) {
       // console.error("tu je puko!!")
        return done(new Error(), false)
      }
      return done(null, user[0][0])
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null