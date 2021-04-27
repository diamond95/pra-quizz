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
        token: null,
        user: null,
        isUserLoggedIn: false,
        isAdmin: false,
        userInformation: null,

    },
    mutations: {
       setToken(state, token) {
           state.token = token
           if(token) {
               state.isUserLoggedIn = true
           } else {
               state.isUserLoggedIn = false
           }
       },
       setUser(state, user) {
           state.token = user
       },
       setUserInformation(state, userInformation) {
           state.userInformation = userInformation
       },
       loggedUser(state, loggedUser) {
           state.loggedUser = loggedUser
       },
       logOut(state) {
           state.user = null
           state.token = null
           state.isUserLoggedIn = null
           state.userInformation = null
       }


    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        setUserInformation( {commit}, userInformation) {
            commit('setUserInformation', userInformation)
        },
        loggedUser( { commit }, loggedUser) {
            commit('loggedUser', loggedUser)
        },
        logOut({commit}) {
            commit("logOut")
        }


    }
})