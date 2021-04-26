import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


import { sync } from 'vuex-router-sync'
import AOS from 'aos'
import 'aos/dist/aos.css'
import vuetify from './plugins/vuetify';
//import '@babel/polyfill'
import store from '@/store/store'

import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios

sync(store, router)


new Vue({
    data: {
      site: window.location.pathname,
      currentTheme: 'customTema', 
      isParticles: false
    },

  
    methods: {
      
    },

    created() {
    
      AOS.init()
    },

    store,
    router,
    
    vuetify,
    
    
    render: h => h(App)
}).$mount('#app')