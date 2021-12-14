import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, query, getDocs, where } from "firebase/firestore"
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    mailaddress: '',
    password: '',
    wallet: 0,
    users: [],
    modal: false,
    pickedUserName: '',
    pickedUserWallet: '',
  },
  mutations: {
    setUserData(state, {userName, userMail, userPass}) {
      state.username = userName;
      state.mailaddress = userMail;
      state.password = userPass;
    },
    setUserInfo(state, {UsersFromDb}) {
      state.users = UsersFromDb;
    },
    setModal(state, payload) {
      state.modal = payload;
    },
    setPickedUserName(state, name) {
      state.pickedUserName = name;
    },
    setPickedUserWallet(state, wallet) {
      state.pickedUserWallet = wallet;
    },
  },
  getters: {
    gettersUserName(state) {
      return state.username
    },
    gettersUserWallet(state) {
      return state.wallet
    },
    gettersUsersFromDb(state) {
      return state.users
    },
    gettersIsOpen(state) {
      return state.modal
    },
    gettersPickedUserName(state) {
      return state.pickedUserName
    },
    gettersPickedUserWallet(state) {
      return state.pickedUserWallet
    },
  },
  actions: {
    //新規登録
    async createUser({commit, getters}, {userName, userMail, userPass}) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        commit('setUserData', {userName, userMail, userPass})
    //firestoreにユーザ情報を保存
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
        console.log(`${getters.gettersUserName} is sign up!!`)
      }).catch(error => {
        console.log(error.code, error.Message)
      })
    },
    //ログイン&ダッシュボード画面へ遷移
    async loginByMail({commit, getters}, {userName, userMail, userPass}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        commit('setUserData', {userName, userMail, userPass})
      }).then(() => {
        console.log(`${getters.gettersUserName} is Login!!`)
        router.push('Dashboard')
      }).catch(error => {
        console.log(error.code, error.Message)
      })
    },
    //ログアウト&ログイン画面へ遷移
    async logout() {
      const auth = getAuth();
      await signOut(auth)
      .then(() => {
        console.log("Logout!!")
    //NavigationDuplicated:が出るので修正
        router.push('Login', () => {})
      }).catch((error) => {
        console.log(error)
      })
    },
    //BDから自分以外のユーザ情報を取得
    async getUserInfo({commit, getters} ) {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("UserName", "!=", getters.gettersUserName));
      const querySnapshot = await getDocs(q);
      const UsersFromDb = [];
      querySnapshot.forEach((user) => {
        UsersFromDb.push(user.data());
      });
      commit('setUserInfo', {UsersFromDb})
    },
    //モーダルウィンドの操作
    actionModal({commit}, payload) {
      commit('setModal', payload)
    },
    actionPickedUserName({commit}, name) {
      commit('setPickedUserName', name)
    },
    actionPickedUserWallet({commit}, wallet) {
      commit('setPickedUserWallet', wallet)
    },
  },
  modules: {
  }
})
