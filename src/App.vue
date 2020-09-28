<template>
  <div id="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <div class="router-view">
          <div v-if="toggleStore_loginModal">
            <LoginModal v-if="toggleStore_beforeLogin"></LoginModal>
            <LoginLnb v-else></LoginLnb>
          </div>
          <router-view />
        </div>
      </keep-alive>
    </transition>
    <GnbBottomMenu v-if="toggleStore_gnbBottomMenu"></GnbBottomMenu>
    <Footer v-if="toggleStore_isFooter"></Footer>
    <ProfileMsgTab v-if="toggleStore_profileMsgTab"></ProfileMsgTab>
  </div>
</template>
<script>
  import Header from "@/components/layout/Header.vue";
  import Footer from "@/components/layout/Footer.vue";
  import LoginModal from "@/components/login/LoginModal.vue";
  import LoginLnb from "@/components/login/LoginLnb.vue";
  import GnbBottomMenu from "@/components/layout/GnbBottomMenu.vue";
  import ProfileMsgTab from "@/components/layout/ProfileMsgTab.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      ProfileMsgTab,
      GnbBottomMenu,
      LoginModal,
      LoginLnb,
      Header,
      Footer,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_isFooter: "isFooter",
        toggleStore_profileMsgTab: "ProfileMsgTab",
        toggleStore_gnbBottomMenu: "GnbBottomMenu",
        toggleStore_loginModal: "login_modal",
        toggleStore_beforeLogin: "before_login",
      }),
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {},
    // watch: {
    //   $route(to, from) {
    //     const toDepth = to.path.split("/").length;
    //     const fromDepth = from.path.split("/").length;
    //     console.log(toDepth, fromDepth);
    //     this.transitionName = toDepth < fromDepth ? "fade" : "slide-left";
    //   },
    // },
  };
</script>

<style lang="scss">
  @import "@/assets/scss/common.scss";
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(14em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-14em, 0);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  #app {
    max-width: 720px;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }
  .router-view {
    position: relative;
    padding-bottom: 50%;
    min-height: 100%;
  }
  @media all and (max-width: 700px) {
    html {
      font-size: 14px;
    }
  }
  @media all and (max-width: 650px) {
    html {
      font-size: 13px;
    }
  }
  @media all and (max-width: 600px) {
    html {
      font-size: 11px;
    }
  }
  // 갤럭시 s9+, 아이폰13 아이폰8
  @media all and (max-width: 420px) {
    html {
      font-size: 9px;
    }
  }
  @media all and (max-width: 360px) {
    html {
      font-size: 8px;
    }
  }
</style>
