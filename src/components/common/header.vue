<template>
  <div id="nav">
    <button class="easyup_menu_btn">
      <img src="@/assets/images/main/menu_btn.png" alt="메뉴" title="메뉴" />
    </button>
    <router-link to="/" class="easyup_logo">
      <img src="@/assets/images/main/logo.png" alt="이지업" title="이지업" />
    </router-link>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  #nav {
    position: relative;
    height: 80px;
    text-align: center;
    .easyup_logo {
      display: inline-block;
      width: 24.445%;
      height: 100%;
      position: relative;
      img {
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .easyup_menu_btn {
      width: 5.556%;
      position: absolute;
      top: 0;
      left: 4.445%;
      bottom: 0;
      margin: auto;
    }
  }
</style>
