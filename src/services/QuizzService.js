/**
 * @file Quizzzzzzzz Service
 * @module QuizzService
 * @category src/services/
 */
 import Api from '@/services/api/Api'

 export default {
 
 
    getQuizzInformation (game_pin) {
         return Api().post('getQuizzInformation', game_pin)
     }
 
    
 }