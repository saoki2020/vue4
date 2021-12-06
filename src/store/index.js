import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    mailaddress: '',
    password: ''
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
  },
  actions: {
    async createUser({commit, getters}, {userName, userMail, userPass}) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        commit('setUserData', {userName, userMail, userPass})
      }).then(() => {
        alert(`${getters.getUserName} is sign up!!`)
      }).catch(error => {
        alert(error.code, error.Message)
      })
    }
  },
  modules: {
  }
})
