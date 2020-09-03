<template>
  <div id="app">
    <div id="nav">
      <button class="easyup_menu_btn">
        7
        <img src="@/assets/images/main/menu_btn.png" alt="메뉴" title="메뉴" />
      </button>
      <router-link to="/" class="easyup_logo">
        <img src="@/assets/images/main/logo.png" alt="이지업" title="이지업" />
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import "@/assets/scss/common.scss";
  #app {
    border: 2px solid #ccc;
  }
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
    border: 0;
  }

  #nav {
    position: relative;
    height: 80px;
    text-align: center;
  }
  #app {
    max-width: 720px;
    margin: 0 auto;
  }
  @media all and (max-width: 600px) {
    html {
      font-size: 11px;
    }
  }
</style>
