/**
 * @file Vuex state managment pattern
 * @module Store
 * @category src/store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/**
 * @description Vuex store configuration 
 */
export default new Vuex.Store({


    //strict: true,
    plugins: [createPersistedState()],
    state: {
   
    },
    mutations: {
       


    },
    actions: {
    

    }
})