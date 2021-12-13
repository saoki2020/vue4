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
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    UserName() {
      return this.$store.getters.getUserName
    },
    UserWallet() {
      return this.$store.getters.getUserWallet
    }
  },
  methods: {
    Logout() {
      this.$store.dispatch('logout')
    }
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
