import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import VueLocalStorage from 'vue-localstorage'
import VModal from 'vue-js-modal'
import 'vue-awesome/icons'

import Vue2TouchEvents from 'vue2-touch-events'
require('dotenv').config('.env')

import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';


Vue.use(VuejsDialog)

Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)
Vue.use(VModal)
Vue.use(Vue2TouchEvents)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
