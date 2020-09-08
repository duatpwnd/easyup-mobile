<template>
  <div id="nav">
    <button class="easyup_menu_btn" @click="menu_toggle()">
      <img src="@/assets/images/main/menu_btn.png" alt="메뉴" title="메뉴" />
    </button>
    <router-link to="/" class="easyup_logo">
      <img src="@/assets/images/main/logo.png" alt="이지업" title="이지업" />
    </router-link>
    <div class="right_menu">
      <router-link to="/mylecture1" class="myclass">
        <img
          src="@/assets/images/common/myclass_ico.png"
          alt="내강의실"
          title="내강의실"
        />
      </router-link>
      <router-link to="/" class="msg">
        <img
          src="@/assets/images/common/message_ico.png"
          alt="메세지 수신함"
          title="메세지 수신함"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      menu_toggle() {
        this.$store.commit("HeaderMenuToggle");
      },
    },
  };
</script>
<style scoped lang="scss">
  #nav {
    position: relative;
    /* height: 80px; */
    text-align: center;
    padding: 5.556% 0px;
    .easyup_logo {
      width: 24.445%;
      height: 37.5%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .easyup_menu_btn {
      width: 5.556%;
      position: absolute;
      top: 0;
      left: 4.445%;
      bottom: 0;
      margin: auto;
    }
    .right_menu {
      .myclass {
        position: absolute;
        top: 0;
        right: 15%;
        bottom: 0;
        margin: auto;
        height: 37.5%;
        width: 5.417%;
      }
      .msg {
        width: 4.584%;
        position: absolute;
        top: 0;
        right: 4.445%;
        bottom: 0;
        margin: auto;
        height: 40%;
      }
    }
  }
</style>
