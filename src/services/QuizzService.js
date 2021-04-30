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
    }
 
    
 }