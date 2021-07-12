/**
 * @file Admin Service
 * @module AdminService
 * @category src/services/
 */
 import Api from '@/services/api/Api'

 export default {
 
 
    getQuizzList (id) {
         return Api().post('getQuizzList', id)
    },
    deleteQuizz (id) {
         return Api().post('deleteQuizz', id)
    },
    runQuizz (id) {
         return Api().post('runQuizz', id)
    },
    getCurrentQuestion (data) {
         return Api().post('getCurrentQuestion', data)
    },
    questionFinished (id) {
         return Api().post('questionFinished', id)
    },
    quizzFinished (id) {
         return Api().post('quizzFinished', id)
    },
 
    
 }