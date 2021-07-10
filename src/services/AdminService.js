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
 
    
 }