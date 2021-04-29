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
 
   },


   async getQuestion(req, res) {
 
    try {
      const { gameCode, questionNumber } = req.body

      var [[q]] = await db.query('SELECT q.description, q.difficulty, q.time, q.answered FROM question as q INNER JOIN quiz as qu on qu.IDQuiz = q.quizID where qu.pin = ? AND q.answered != 1 AND q.question_order = ? AND q.started = 1', [gameCode, questionNumber])

      if(!q) {
        return res.status(403).send({
          error: 'Looks like question is not started yet!'
        })
      }

      res.send({
        res: q
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },

   async getAnswers(req, res) {
 
    try {
      const { gameCode, questionNumber } = req.body

      var [a] = await db.query('SELECT a.IDAnswer, a.description FROM answer as a INNER JOIN question as q ON a.questionID = q.IDQuestion INNER JOIN quiz as qu ON qu.IDQuiz = q.quizID      WHERE qu.pin = ? AND a.questionID = ?', [gameCode, questionNumber])

      if(!a) {
        return res.status(403).send({
          error: 'Oops, something went wrong.'
        })
      }

      res.send({
        res: a
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },
 
   
 
 }