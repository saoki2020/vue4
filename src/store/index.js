import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
      }).then(async() => {
        const db = getFirestore();
        try {
          const userRef = await addDoc(collection(db, "users"), {
            UserName: userName,
            MailAddress: userMail,
            PassWord: userPass,
            Wallet: 0,
          });
          console.log("Document written with ID: ", userRef.id);
        } catch (e) {
          console.log(e)
        }
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
    async logout() {
      const auth = getAuth();
      await signOut(auth)
      .then(() => {
        console.log("Logout!!")
        router.push('Login')
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  modules: {
  }
})
