/**
 * @file Quizzzzzzzz Service
 * @module QuizzService
 * @category src/services/
 */
 import Api from '@/services/api/Api'

 export default {
 
 
    getQuizzInformation (game_pin) {
         return Api().post('getQuizzInformation', game_pin)
    },
    getQuestion(gameInformation) {
        return Api().post('getQuestion', gameInformation)
    },
    getAnswers(gameInformation) {
        return Api().post('getAnswers', gameInformation)
    },
    isActiveQuizz(gameInformation) {
        return Api().post('isActiveQuizz', gameInformation)
    },
    getAnswersCorrectInfo(gameInformation) {
        return Api().post('getAnswersCorrectInfo', gameInformation)
    },
    markQuestionAnswered(gameInformation) {
        return Api().post('markQuestionAnswered', gameInformation)
    },
    getCurrentGuests(quizID) {
        return Api().post('getCurrentGuests', quizID)
    },
    createQuizz(data) {
        return Api().post('createQuizz', data)
    }
 
    
 }