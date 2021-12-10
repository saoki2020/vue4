import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    mailaddress: '',
    password: '',
    wallet: 0,
  },
  mutations: {
    setUserData(state, {userName, userMail, userPass}) {
      state.username = userName;
      state.mailaddress = userMail;
      state.password = userPass;
    }
  },
  getters: {
    getUserName(state) {
      return state.username
    },
    getUserWallet(state) {
      return state.wallet
    },
  },
  actions: {
    async createUser({commit, getters}, {userName, userMail, userPass}) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        commit('setUserData', {userName, userMail, userPass})
      }).then(() => {
        console.log(`${getters.getUserName} is sign up!!`)
      }).catch(error => {
        console.log(error.code, error.Message)
      })
    },
    async loginByMail({commit, getters}, {userName, userMail, userPass}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        commit('setUserData', {userName, userMail, userPass})
      }).then(() => {
        console.log(`${getters.getUserName} is Login!!`)
        router.push('Dashboard')
      }).catch(error => {
        console.log(error.code, error.Message)
      })
    },
  },
  modules: {
  }
})
