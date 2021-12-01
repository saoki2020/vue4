import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA89h3pMnsCV_TJ_NbYaqddnWOpygc3ySg",
  authDomain: "vuetask-e6983.firebaseapp.com",
  projectId: "vuetask-e6983",
  storageBucket: "vuetask-e6983.appspot.com",
  messagingSenderId: "1001156646271",
  appId: "1:1001156646271:web:1232c5fd2570c2d5a1764a",
  measurementId: "G-0DNL06BNCE"
};

initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
