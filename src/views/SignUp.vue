<template>
  <div>
    <div>
      <h1>新規登録画面</h1>
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
      <button @click="signUp()">新規登録</button>
      <p><router-link :to="{name:'Login'}">ログイン</router-link>はこちらから</p>
    </div>
  </div>
</template>

<script>
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default {
//   name: "SignUp",
//   data() {
//     return {
//       username: "",
//       mailaddress: "",
//       password: "",
//     }
//   },
//   methods: {
//     signUp() {
//       createUserWithEmailAndPassword(this.username, this.mailaddress, this.password)
//       .then(
//         alert("OKです")
//       )
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.Message;
//         alert(errorCode, errorMessage);
//         })
//     },
//   }
// }
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
