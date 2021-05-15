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

      var [[q]] = await db.query('SELECT q.IDQuestion, q.description, q.difficulty, q.time, q.answered FROM question as q INNER JOIN quiz as qu on qu.IDQuiz = q.quizID where qu.pin = ? AND q.answered != 1 AND q.question_order = ? AND q.started = 1', [gameCode, questionNumber])

      if(!q) {
        return res.status(403).send({
          error: 'Question is not active!',
          errorCode: 379
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

   async isActiveQuizz(req, res) {
 
    try {
      const { gameCode } = req.body

      var [[ac]] = await db.query('SELECT active FROM quiz WHERE pin = ?', [gameCode])

      if(!ac) {
        return res.status(403).send({
          error: 'Oops, something went wrong.'
        })
      }

      res.send({
        res: ac
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },

   async getAnswersCorrectInfo(req, res) {
 
    try {
      const { gameCode, questionNumber } = req.body

      var [ac] = await db.query('SELECT a.IDAnswer, a.description, a.is_correct FROM answer as a INNER JOIN question as q ON a.questionID = q.IDQuestion INNER JOIN quiz as qu ON qu.IDQuiz = q.quizID      WHERE qu.pin = ? AND a.questionID = ?', [gameCode, questionNumber])

      if(!ac) {
        return res.status(403).send({
          error: 'Oops, something went wrong.'
        })
      }

      res.send({
        res: ac
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },


   async markQuestionAnswered(req, res) {
 
    try {
      const { questionID, gameCode } = req.body
  
      var [sn] = await db.query('update question SET answered = 1 WHERE IDQuestion = ?', [questionID])
      
      /* get next question status */
      var [[tp]] = await db.query('SELECT q.IDQuestion, q.question_order, q.started FROM question as q INNER JOIN quiz as qu ON qu.IDQuiz = q.quizID WHERE q.question_order > ? AND qu.pin = ? ORDER BY IDQuestion LIMIT 1', [questionID, gameCode])
      
      if(tp) {
        var [kp] = await db.query('UPDATE question AS q INNER JOIN quiz as qu ON qu.IDQuiz = q.quizID SET q.started = 1 WHERE q.IDQuestion = ?', [tp.IDQuestion])
        var ready = true
      }
      
      if(!sn) {
        return res.status(403).send({
          error: 'Oops, something went wrong.'
        })
      }

      res.send({
        res: sn.affectedRows == 1 ? true : false,
        next: ready || false
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },
 
   
 
 }