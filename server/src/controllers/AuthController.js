/**
 * @file Authentication Controller
 * @module AuthController
 * @category server/src/controllers
 */

const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')
//const util = require('util')

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
    expiresIn: ONE_DAY
  })
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
  /* eslint-disable */
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ovaj email se već koristi.'
      })
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

      const { email, password } = req.body

      var [[x8]] = await db.query('SELECT u.*, o.owner_name FROM user as u inner join owner as o on o.owner_id = u.owner_id WHERE user_email = ?', [email])

      if (!x8) {
        return res.status(403).send({
          error: 'Ovaj račun ne postoji.'
        })
      }
      const isPasswordValid = await bcrypt.compare(password, x8.user_password)

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

  

}