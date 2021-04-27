import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import { sync } from 'vuex-router-sync'
import AOS from 'aos'
import 'aos/dist/aos.css'
import vuetify from './plugins/vuetify';
//import '@babel/polyfill'
import store from '@/store/store'
import defaultTranslation from '@/plugins/translation/default.js'
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios

sync(store, router)

const i18n = new VueI18n({
  locale: 'en', // default English
  messages: defaultTranslation
})

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
    
    i18n,
    render: h => h(App)
}).$mount('#app')