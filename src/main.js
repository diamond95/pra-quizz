import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import Vuesax from 'vuesax' // check error 
import 'vuesax/dist/vuesax.css'

Vue.use(VueI18n)
Vue.use(Vuesax)

import { sync } from 'vuex-router-sync'
import AOS from 'aos'
import 'aos/dist/aos.css'
import vuetify from './plugins/vuetify';
import store from '@/store/store'
import defaultTranslation from '@/plugins/translation/default.js'

import 'vuesax/dist/vuesax.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios

/* vxe table  */
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
VXETable.setup({
  delayHover: 250,
})

Vue.use(VXETable)
/* vxe table  */

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
    Vuesax,
    i18n,
    render: h => h(App)
}).$mount('#app')