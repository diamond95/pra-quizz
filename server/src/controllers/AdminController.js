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

      var [q] = await db.query('select * from quiz where userID = ?', [IDUser])

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
        questions.forEach(element  => {
          questionss.push([element.question.description, q.insertId, element.question.time])
        });

        
        
        
       
        var inrtid = []
        var [insertQuestions] =  await db.query('INSERT INTO question(description, quizID, time) VALUES ?', [questionss])
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




}