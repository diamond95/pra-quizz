import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { auth: false, isAdmin: false }
  },

  {
    path: '/app/play',
    name: 'PlayGame',
    component: () => import(/* webpackChunkName: "PlayGame" */ '../views/app/PlayGame.vue'),
    meta: { auth: true, isAdmin: false }
  },

  {
    path: '/app/play/:id',
    name: 'LiveQuizz',
    component: () => import(/* webpackChunkName: "LiveQuizz" */ '../views/app/PlayGame.vue'),
    meta: { auth: true, isAdmin: false }
  },

  {
    path: '/app/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "AdministrationBoard" */ '../views/app/Home.vue'),
    meta: { auth: true, isAdmin: true }
  },

  {
    path: '/app/create-quizz',
    name: 'CreateQuizz',
    component: () => import(/* webpackChunkName: "AdministrationBoard" */ '../views/app/CreateQuizz.vue'),
    meta: { auth: true, isAdmin: true }
  },

  {
    path: '/app/run-quizz/:id/:question',
    name: 'RunQuizz',
    component: () => import(/* webpackChunkName: "AdministrationBoard" */ '../views/app/RunQuizz.vue'),
    meta: { auth: true, isAdmin: true }
  },

  {
    path: '/new-password/:email',
    name: 'NewPassword',
    component: () => import('../views/NewPassword.vue')
  },

  

  {
    path: '*',
    redirect: { name: 'HomePage' }
  }

]


const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
