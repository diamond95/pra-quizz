import Vue from 'vue';
import Vuetify from 'vuetify';
import hr from './translation/hr';
//import store from '@/store/store'
Vue.use(Vuetify);



// function languageIdentifier() {
//   const lang = store.state.getUiConfiguration

//   var filtered = lang.filter(function(one) {
//     return one.parameter_name == "DEFAULT_LANGUAGE"
//   })

//   var current = 'en'
//   switch (filtered[0].parameter_value) {
//     case 1:
//       current = 'en'
//       break;
//     case 2:
//       current = 'hr'
//       break;
//     default:
//       current = 'en'
//       break;
//   }
//   // eslint-disable-next-line no-console
//   console.log(current)
//   return current
// }


export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#66E9AE',
        secondary: '#323657',
        accent: '#8c9eff',
        error: '#b71c1c',
        greyColor: '#c8cfdb',
        indigo: '#205a8a',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: { hr },
    current: 'hr'
  }
});
