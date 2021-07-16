/**
 * @file Quizz Controller
 * @module QuizzController
 * @category server/src/controllers
 */

var db = require('../models/index')
const ErrorHandling = require('../helpers/error_handling')
var moment = require('moment');



module.exports = {


  async getQuizzList(req, res) {

    try {
      const { IDUser } = req.body

      var [q] = await db.query('select q.*, COUNT(IDQuestion) AS total from quiz as q INNER JOIN question as qu ON qu.quizID = q.IDQuiz where userID = ? GROUP BY q.IDQuiz', [IDUser])
      if (!q) {
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

  async quizzFinished(req, res) {

    try {
      const { quizID } = req.body

      var [q] = await db.query('UPDATE quiz SET active = 0 WHERE IDQuiz = ?', [quizID])
      // eslint-disable-next-line no-unused-vars
      var [d] = await db.query('DELETE FROM quiz_guests WHERE quizID = ?', [quizID])

      // eslint-disable-next-line no-unused-vars
      var [qu] = await db.query('UPDATE question SET started = 0 WHERE quizID = ?', [quizID])
      if (!q) {
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

  async deleteQuizz(req, res) {

    try {
      const { id } = req.body
      var [s] = await db.query('select * from question WHERE quizID = ?', [id])
      
      var answers = []
      s.forEach( x => {
        answers.push([x.IDQuestion])
      })
      console.log(answers)
      var [aa] = await db.query('delete from answer where questionID IN (?)', [answers])
      var [qa] = await db.query('delete from question where quizID = ?', [id])
   
      var [q] = await db.query('delete from quiz where IDQuiz = ?', [id])

      if (!q || !qa || !aa) {
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

  async runQuizz(req, res) {

    try {
      const { id } = req.body

      var [q] = await db.query('UPDATE quiz SET active = 1 WHERE IDQuiz = ?', [id])
      // eslint-disable-next-line no-unused-vars
      var [question] = await db.query('UPDATE question SET started = 1 WHERE quizID = ? ORDER BY IDQuestion ASC LIMIT 1', [id])

      if (!q) {
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

  async getTopPlayers(req, res) {

    try {
      const { quizID } = req.body

      var [q] = await db.query('select questID, sum(correct) as correctNumber, g.nickname from guest_answers as ga INNER JOIN guests as g ON g.IDGuest = ga.questID WHERE ga.quizID = 4 GROUP BY ga.questID ORDER BY correctNumber DESC ;', [quizID])
     
      if (!q) {
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

  async createQuizz(req, res) {
    try {
      const { quizz, questions, userID } = req.body
      
      var created = moment().format('YYYY-MM-DD hh:mm:ss')
      var [q] = await db.query('INSERT INTO quiz SET title = ?, userID = ?, pin = ?, active = 0, created_at = ?', [quizz.title, userID, quizz.pin, created])

      
       var questionss = []
       var answers = []
       var ctnr = 1;
        questions.forEach(element  => {
          questionss.push([element.question.description, q.insertId, element.question.time, ctnr])
          ctnr++;
        });

        
        
        
       
        var inrtid = []
        var [insertQuestions] =  await db.query('INSERT INTO question(description, quizID, time, question_order) VALUES ?', [questionss])
        inrtid.push(insertQuestions.insertId)

        for (let index = 0; index < questions.length - 1; index++) {
          
          inrtid.push((inrtid[index] +1 ))
          
        }
        
        var counter = 0;
        questions.forEach((element, h) => {
            element.question.answers.forEach(e => {
              answers.push([inrtid[h], e.description, e.isCorrect])
              counter++;
            });
        });

        
        // eslint-disable-next-line no-unused-vars
        var [insertAnswers] =  await db.query('INSERT INTO answer(questionID, description, is_correct) VALUES ?', [answers])
        
        var successfullyCreated = false
        if(insertAnswers.affectedRows == counter) {
          successfullyCreated = true
        }
      
      
      if (!q) {
        return res.status(403).send({
          error: 'err!'
        })
      }

      res.send({
        res: successfullyCreated
      })

    } catch (error) {
      ErrorHandling.status500(res, error)
    }

  },

  async getCurrentQuestion(req, res) {
 
    try {
      const { quizID, question } = req.body
      // eslint-disable-next-line no-unused-vars
      var run = await db.query('UPDATE quiz SET active = 1 WHERE IDQuiz = ?', [quizID])
      var [[q]] = await db.query('SELECT q.IDQuestion, q.description, q.difficulty, q.time, q.answered FROM question as q INNER JOIN quiz as qu on qu.IDQuiz = q.quizID where qu.IDQuiz = ?  AND q.question_order = ?', [quizID, question])

      // eslint-disable-next-line no-unused-vars
      var update = await db.query('UPDATE question SET started = 1 WHERE question_order = ? AND quizID = ?', [question, quizID])

      
      if(!q) {
        return res.status(403).send({
          error: 'Cant get question!',
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




}