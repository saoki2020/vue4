<template>
  <div>
    <div class="header_container">
      <div class="header_item">
        <p>{{ UserName }}さんようこそ</p>
      </div>
      <div class="header_item">
        <p>残高：{{ UserWallet }}</p>
      </div>
      <div class="header_item">
        <button @click="Logout()">ログアウト</button>
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
        <tr v-for="(user, index) in UsersFromDb" v-bind:key="index">
          <td>{{user.UserName}}</td>
          <td><button @click="ShowWallet(user.UserName, UserWallet)">Walletを見る</button></td>
          <td><button @click="SendMoney()">送る</button></td>
        </tr>
      </tbody>
    </table>
    <Modal v-if="isOpen"/>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  name: "Dashboard",
  components: {
    Modal
  },
  computed: {
    UserName() {
      return this.$store.getters.gettersUserName
    },
    UserWallet() {
      return this.$store.getters.gettersUserWallet
    },
    UsersFromDb() {
      return this.$store.getters.gettersUsersFromDb
    },
    isOpen() {
      return this.$store.getters.gettersIsOpen
    },
  },
  methods: {
    Logout() {
      this.$store.dispatch('logout')
    },
    ShowWallet(name, wallet) {
      this.$store.dispatch('actionModal', true)
      this.$store.dispatch('actionPickedUserName', name)
      this.$store.dispatch('actionPickedUserWallet', wallet)
    },
  },
  mounted() {
    this.$store.dispatch('getUserInfo')
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
