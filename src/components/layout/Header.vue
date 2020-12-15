<template>
  <div id="nav">
    <button class="easyup_menu_btn" @click.stop="menu_toggle()">
      <img src="@/assets/images/main/menu_btn.png" alt="메뉴" title="메뉴" />
    </button>
    <router-link to="/" class="easyup_logo">
      <img src="@/assets/images/main/logo.png" alt="이지업" title="이지업" />
    </router-link>

    <div class="right_menu">
      <!-- 학생인지 강사인지  -->
      <router-link
        :to="{
          path: '/cart',
        }"
        class="myclass"
        v-if="userStore_userinfo.access_token"
      >
        <img
          src="@/assets/images/common/cart_ico.png"
          alt="장바구니"
          title="장바구니"
        />
      </router-link>
      <router-link
        :to="{
          path: '/msg/receivedList',
          query: {
            pageCurrent: 1,
            keyword: '',
          },
        }"
        class="msg"
        v-if="userStore_userinfo.access_token"
      >
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
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
      ...mapState("toggleStore", {
        toggleStore_loginModal: "login_modal",
      }),
    },
    methods: {
      menu_toggle() {
        this.$store.commit("toggleStore/Toggle", {
          login_modal: !this.toggleStore_loginModal,
        });
      },
    },
  };
</script>
<style scoped lang="scss">
  #nav {
    position: relative;
    text-align: center;
    height: 50px;
    .back_btn {
      position: absolute;
      top: 0;
      left: 13.445%;
      bottom: 0;
      height: 30%;
      margin: auto;
    }
    .easyup_logo {
      height: 19px;
      width: 114px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      img {
        vertical-align: unset;
      }
    }
    .easyup_menu_btn {
      width: 24px;
      height: 19px;
      position: absolute;
      top: 0;
      left: 16px;
      bottom: 0;
      margin: auto;
    }
    .right_menu {
      .myclass {
        position: absolute;
        top: 0;
        right: 48px;
        bottom: 0;
        margin: auto;
        width: 24px;
        height: 19px;
        img {
          vertical-align: unset;
        }
      }
      .msg {
        position: absolute;
        top: 0;
        right: 16px;
        bottom: 0;
        margin: auto;
        width: 24px;
        height: 19px;
        img {
          vertical-align: unset;
        }
      }
    }
  }
</style>
