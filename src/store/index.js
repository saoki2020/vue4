import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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
      }).catch(error => {
        console.log(error.code, error.Message)
      })
    },
  },
  modules: {
  }
})
