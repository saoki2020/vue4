import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, query, getDocs, where, onSnapshot, doc, updateDoc, increment} from "firebase/firestore"
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
    myDocumentId: '',
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
    setMyDocumentId(state, id) {
      state.myDocumentId = id;
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
    },
    gettersMyDocumentId(state) {
      return state.myDocumentId
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
            userName: userName,
            mailAddress: userMail,
            passWord: userPass,
            wallet: 0,
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
    //DBから自分以外のユーザ情報を取得（リアルタイム）
    async getUsers({commit, getters}) {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("userName", "!=", getters.gettersUserName));
      onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((user) => {
          users.push(user.data());
        });
        commit('setUsers', {users})
      });
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
      const q = query(collection(db, "users"), where("userName", "==", getters.gettersUserName));
      onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((user) => {
          users.push(user.data());
          commit('setMyDocumentId', user.id)
        });
        commit('setMyWallet', users[0].wallet)
      })
    },
    //DBのwalletを更新
    async updateWallet({getters}, money) {
      //選択したuserのドキュメントidを取得する
      const db = getFirestore();
      const q = query(collection(db, "users"), where("userName", "==", getters.gettersPickedUserName));
      const querySnapshot = await getDocs(q);
      let documentId = "";
      querySnapshot.forEach((user) => {
        documentId = user.id
      });
      //walletに加算する
      const walletRef = doc(db, "users", documentId);
      await updateDoc(walletRef, {
        wallet: increment(money)
      });
      //自分のwalletを減らす
      const myDocumentId = getters.gettersMyDocumentId;
      const myWalletRef = doc(db, "users", myDocumentId);
      await updateDoc(myWalletRef, {
        wallet: increment(-money)
      });
    }
  },
  modules: {
  }
})
