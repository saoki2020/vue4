<template>
  <div class="modal">
    <div class="modal_box">
      <span class="modal_message">あなたの残高：{{myWallet}}</span>
      <span class="modal_message">送る金額</span>
      <input type="text" v-model="money">
      <div class="modal_action">
        <button class="modal_btn" @click="sendMoney()">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendMoney",
  data() {
    return {
      money: "",
    }
  },
  computed: {
    myWallet() {
      return this.$store.getters.gettersMyWallet
    }
  },
  methods: {
    checkMoney() {
      const regexp = /^\d*$/
      if (!this.money || !regexp.test(this.money)) {
        return false
      } else {
        return true
      }
    },
    sendMoney() {
      if (!this.checkMoney()) {
        this.$store.dispatch('actionSendMoneyWindow', false)
        console.log('Error')
      } else {
        this.$store.dispatch('actionSendMoneyWindow', false)
        this.$store.dispatch('updateWallet', this.money)
      }
    },
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.modal {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal_box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 200px;
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  transform: translate(-50%, -50%);
}

.modal_message {
  font-size: 20px;
}

.modal_action {
  display: flex;
  justify-content: flex-end;
}

.modal_btn {
  width: 130px;
  margin-left: 16px;
  padding: 8px;
  line-height: 1.5;
  font-weight: bold;
  border: 1px solid rgb(196, 196, 196);
  cursor: pointer;
}

</style>
