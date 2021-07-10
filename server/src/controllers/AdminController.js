/**
 * @file Quizz Controller
 * @module QuizzController
 * @category server/src/controllers
 */

 var db = require('../models/index')
 const ErrorHandling = require('../helpers/error_handling')

 
 
 module.exports = {
 
 
   async getQuizzList(req, res) {
 
     try {
       const { IDUser } = req.body
 
       var [q] = await db.query('select * from quiz where userID = ?', [IDUser])
 
       if(!q) {
         return res.status(403).send({
           error: 'err!'
         })
       }
 
       res.send({
         res: q
       })
 
     } catch (error) {
       ErrorHandling.status500(res, error)
     }
 
   },

 
   
 
 }