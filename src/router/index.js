import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

/* change every meta for authorization, missing backend token and loggedIn user */
const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { auth: false, isAdmin: false }
  },

  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { auth: false, isAdmin: false }
  },

  {
    path: '/app/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Catalog" */ '../views/app/Home.vue'),
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
