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
        gameTitle: null,
        gameCode: null,
        questionSum: null,
        quizInfo: null

    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation
        },
        setGameTitle(state, title) {
            state.gameTitle = title
        },
        setGameCode(state, code) {
            state.gameCode = code
        },
        setQuestionSum(state, total) {
            state.questionSum = total
        },
        setQuizInfo(state, f) {
            state.quizInfo = f
        },
        newUsername(state, username) {
            state.userInformation.user.username = username
            state.loggedUser = username
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
        setUserInformation({ commit }, userInformation) {
            commit('setUserInformation', userInformation)
        },
        loggedUser({ commit }, loggedUser) {
            commit('loggedUser', loggedUser)
        },
        setGameTitle({ commit }, title) {
            commit('setGameTitle', title)
        },
        setGameCode({ commit }, code) {
            commit('setGameCode', code)
        },
        setQuestionSum({ commit }, total) {
            commit('setQuestionSum', total)
        },
        setQuizInfo({ commit }, t) {
            commit('setQuizInfo', t)
        },
        newUsername({ commit }, un) {
            commit('newUsername', un)
        },
        logOut({ commit }) {
            commit("logOut")
        },



    }
})