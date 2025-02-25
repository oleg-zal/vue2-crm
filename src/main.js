import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: "AIzaSyCCNYp_HSaMtrSU94DKKek4Fv-wsUdtvTo",
  authDomain: "vue-olegzal.firebaseapp.com",
  databaseURL: "https://vue-olegzal-default-rtdb.firebaseio.com",
  projectId: "vue-olegzal",
  storageBucket: "vue-olegzal.firebasestorage.app",
  messagingSenderId: "712443750305",
  appId: "1:712443750305:web:9c67b6897b8569c5edcde0"
}
const fr = initializeApp(firebaseConfig)
const auth = getAuth(fr);
let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
