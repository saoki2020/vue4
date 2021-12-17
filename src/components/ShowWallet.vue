<template>
  <div class="modal">
    <div class="modal_box">
      <span class="modal_message">{{pickedUserName}}さんの残高</span>
      <span class="modal_message">{{pickedUserWallet}}</span>
      <div class="modal_action">
        <button class="modal_btn" @click="closeWindow()">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowWallet",
  computed: {
    pickedUserName() {
      return this.$store.getters.gettersPickedUserName
    },
    pickedUserWallet() {
      return this.$store.getters.gettersPickedUserWallet
    },
  },
  methods: {
    closeWindow() {
      this.$store.dispatch('actionShowWalletWindow', false)
    }
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
