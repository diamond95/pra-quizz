/**
 * @file Quizz Controller
 * @module QuizzController
 * @category server/src/controllers
 */

 var db = require('../models/index')
 const ErrorHandling = require('../helpers/error_handling')

 
 
 module.exports = {
 
 
   async getQuizzInformation(req, res) {
 
     try {
       const { game_pin } = req.body
 
       var [[q]] = await db.query('select q.title, q.active, u.username, COUNT(ques.IDQuestion) as questions_sum, SUM(ques.time) as total_time from quiz as q INNER JOIN users as u on u.IDUser = q.userID INNER JOIN question as ques on ques.quizID = q.IDQuiz where pin = ?', [game_pin])
 
       if(!q) {
         return res.status(403).send({
           error: 'Podaci se ne mogu dohvatiti za QUIZZ!'
         })
       }
 
       res.send({
         res: q
       })
 
     } catch (error) {
       ErrorHandling.status500(res, error)
     }
 
   }
 
   
 
 }