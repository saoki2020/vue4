import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, query, getDocs, where, onSnapshot} from "firebase/firestore"
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    mailaddress: '',
    password: '',
    wallet: 0,
    users: [],
    walletWindow: false,
    sendWindow: false,
    pickedUserName: '',
    pickedUserWallet: '',
  },
  mutations: {
    setUserData(state, {userName, userMail, userPass}) {
      state.username = userName;
      state.mailaddress = userMail;
      state.password = userPass;
    },
    setUsers(state, {users}) {
      state.users = users;
    },
    setShowWalletWindow(state, payload) {
      state.walletWindow = payload;
    },
    setSendMoneyWindow(state, payload) {
      state.sendWindow = payload;
    },
    setPickedUserName(state, name) {
      state.pickedUserName = name;
    },
    setPickedUserWallet(state, wallet) {
      state.pickedUserWallet = wallet;
    },
    setMyWallet(state, wallet) {
      state.wallet = wallet;
    },
  },
  getters: {
    gettersUserName(state) {
      return state.username
    },
    gettersUserWallet(state) {
      return state.wallet
    },
    gettersUsers(state) {
      return state.users
    },
    gettersShowWalletOpen(state) {
      return state.walletWindow
    },
    gettersSendMoneyOpen(state) {
      return state.sendWindow
    },
    gettersPickedUserName(state) {
      return state.pickedUserName
    },
    gettersPickedUserWallet(state) {
      return state.pickedUserWallet
    },
    gettersMyWallet(state) {
      return state.wallet
    }
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
    async getUsers({commit, getters}) {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("UserName", "!=", getters.gettersUserName));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((user) => {
        users.push(user.data());
      });
      commit('setUsers', {users})
    },
    //モーダルウィンドの操作
    actionShowWalletWindow({commit}, payload) {
      commit('setShowWalletWindow', payload)
    },
    actionSendMoneyWindow({commit}, payload) {
      commit('setSendMoneyWindow', payload)
    },
    actionPickedUserName({commit}, name) {
      commit('setPickedUserName', name)
    },
    actionPickedUserWallet({commit}, wallet) {
      commit('setPickedUserWallet', wallet)
    },
    //自分のwalletをリアルタイムに取得する
    getMyWallet({commit, getters}) {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("UserName", "==", getters.gettersUserName));
      onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((user) => {
          users.push(user.data());
        });
        commit('setMyWallet', users[0].Wallet)
      })
    },
  },
  modules: {
  }
})
