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
    path: '/app/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "AdministrationBoard" */ '../views/app/Home.vue'),
    meta: { auth: false, isAdmin: false }
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
