/**
 * @file Authentication Controller
 * @module AuthController
 * @category server/src/controllers
 */

const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')
//const util = require('util')
const SALT = 10
var db = require('../models/index')
const ErrorHandling = require('../helpers/error_handling')
/**
 * 
 * @param {Object} user
 * @description creating JsonWebToken - Duration: 1 day
 * @returns {Object} User object with additional token prop
 */
function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24

  return jwt.sign(user, config.authentication.jwtSecret, {
   // expiresIn: ONE_DAY
  })
}

async function generateHash(pw) {
  const salt = bcrypt.genSaltSync(SALT);
  const hash = bcrypt.hashSync(pw, salt);
  return hash
}



module.exports = {

  /**
   * 
   * @description Function for user's registration
   * @param {Object} req 
   * @param {string} req.body.email
   * @param {string} req.body.name
   * @param {string} req.body.surname
   * @param {string} req.body.password
   * @param {Object} res
   * @param {string} res.message 
   * @returns {Object} User registration parameters 
   * @method POST
   */
  async register(req, res) {
    try {
      
      const { email, username, password } = req.body;

      var hashedPassword = await generateHash(password);      
      
      var [user] = await db.query('INSERT INTO users SET email = ?, username = ?, password = ?', [email, username, hashedPassword]);
      
      const userJson = { email, username }
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(400).send({
        error: `Korisničko ime/email se već koristi.`
      });
    }

  },


  /**
   * 
   * @description Function for user's login
   * @param {Object} req 
   * @param {string} req.body.email
   * @param {string} req.body.password
   * @param {Object} res
   * @param {string} res.message 
   * @returns {Object} User login parameters
   * @method POST
   */
  async login(req, res) {

    try {

      const { username, password } = req.body

      var [[x8]] = await db.query('SELECT * FROM users WHERE username = ?', [username])

      
      if (!x8) {
        return res.status(403).send({
          error: 'Ovaj račun ne postoji.'
        })
      }
     
      const isPasswordValid = await bcrypt.compare(password, x8.password)
      
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Uneseni podaci su neispravni!'
        })
      }

      const userJson = JSON.parse(JSON.stringify(x8))


      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },

  async joinGame(req, res) {

    try {
      const { game_pin } = req.body

      var [[pin]] = await db.query('SELECT title FROM quiz WHERE pin = ?', [game_pin])

      if(!pin) {
        return res.status(403).send({
          error: 'Igra ne postoji ili nije aktivna!'
        })
      }

      res.send({
        res: pin
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  }

  

}