<template>
  <div>
    <div>
      <h1>ログイン画面</h1>
    </div>
    <form>
      <div>
        <label for="userName">ユーザー名</label>
        <input type="text" name="userName" id="userName" v-model="username">
      </div>
      <div>
        <label for="mailAddress">メールアドレス</label>
        <input type="text" name="mailAddress" id="mailAddress" v-model="mailaddress">
      </div>
      <div>
        <label for="passWord">パスワード</label>
        <input type="text" name="passWord" id="passWord" v-model="password">
      </div>
    </form>
    <div>
      <button @click="Login()">ログイン</button>
      <p><router-link :to="{name:'SignUp'}">新規登録</router-link>はこちらから</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      mailaddress: "",
      password: "",
    }
  },
  methods: {
    Login() {
      this.$store.dispatch('loginByMail',{
      userName: this.username,
      userMail: this.mailaddress,
      userPass: this.password
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  display: inline-block;
  width: 150px;
}

form {
  margin: 50px;
}

a {
  color: #42b983;
}
</style>
