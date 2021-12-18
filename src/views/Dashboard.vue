<template>
  <div>
    <div class="header_container">
      <div class="header_item">
        <p>{{ userName }}さんようこそ</p>
      </div>
      <div class="header_item">
        <p>残高：{{ userWallet }}</p>
      </div>
      <div class="header_item">
        <button @click="logout()">ログアウト</button>
      </div>
    </div>
    <h1>ユーザ一覧</h1>
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" v-bind:key="index">
          <td>{{user.userName}}</td>
          <td><button @click="showWalletWindow(user.userName, user.wallet)">Walletを見る</button></td>
          <td><button @click="sendMoneyWindow(user.userName)">送る</button></td>
        </tr>
      </tbody>
    </table>
    <ShowWallet v-if="showWalletOpen"/>
    <SendMoney v-if="sendMoneyOpen"/>
  </div>
</template>

<script>
import ShowWallet from '../components/ShowWallet.vue'
import SendMoney from '../components/SendMoney.vue'

export default {
  name: "Dashboard",
  components: {
    ShowWallet,
    SendMoney
  },
  computed: {
    userName() {
      return this.$store.getters.gettersUserName
    },
    userWallet() {
      return this.$store.getters.gettersUserWallet
    },
    users() {
      return this.$store.getters.gettersUsers
    },
    showWalletOpen() {
      return this.$store.getters.gettersShowWalletOpen
    },
    sendMoneyOpen() {
      return this.$store.getters.gettersSendMoneyOpen
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    showWalletWindow(name, wallet) {
      this.$store.dispatch('actionShowWalletWindow', true)
      this.$store.dispatch('actionPickedUserName', name)
      this.$store.dispatch('actionPickedUserWallet', wallet)
    },
    sendMoneyWindow(name) {
      this.$store.dispatch('actionSendMoneyWindow', true)
      this.$store.dispatch('actionPickedUserName', name)
    },
  },
  mounted() {
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getMyWallet');
  }
}
</script>

<style scoped>
.header_container {
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.header_item:nth-child(1) {
  flex-grow: 2;
}
.header_item:nth-child(2) {
  flex-grow: 1;
}

</style>
