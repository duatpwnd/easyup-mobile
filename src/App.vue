<template>
  <div id="app" :class="$mq">
    <div class="mask" v-if="toggleStore_mask" @click="removeMask()"></div>
    <NoticeModal v-if="toggleStore_noticeModal"></NoticeModal>
    <Header @click.native="$loginModalClose()"></Header>
    <transition name="fade" mode="out-in">
      <div class="router-view">
        <div v-if="toggleStore_loginModal">
          <LoginLnb v-if="userStore_userinfo.access_token"></LoginLnb>
          <LoginModal v-else></LoginModal>
        </div>
        <router-view @click.native="$loginModalClose()" />
      </div>
    </transition>
    <GnbBottomMenu
      @click.native="$loginModalClose()"
      v-if="toggleStore_gnbBottomMenu"
    ></GnbBottomMenu>
    <Footer
      @click.native="$loginModalClose()"
      v-if="toggleStore_isFooter"
    ></Footer>
    <!-- <ProfileMsgTab
      @click.native="$loginModalClose()"
      v-if="toggleStore_profileMsgTab"
    ></ProfileMsgTab> -->
  </div>
</template>
<script>
  import Header from "@/components/layout/Header.vue";
  import Footer from "@/components/layout/Footer.vue";
  import LoginModal from "@/components/login/LoginModal.vue";
  import LoginLnb from "@/components/login/LoginLnb.vue";
  import GnbBottomMenu from "@/components/layout/GnbBottomMenu.vue";
  // import ProfileMsgTab from "@/components/layout/ProfileMsgTab.vue";
  import NoticeModal from "@/components/common/NoticeModal.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      NoticeModal,
      // ProfileMsgTab,
      GnbBottomMenu,
      LoginModal,
      LoginLnb,
      Header,
      Footer,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_mask: "mask",
        toggleStore_isFooter: "isFooter",
        toggleStore_profileMsgTab: "ProfileMsgTab",
        toggleStore_gnbBottomMenu: "GnbBottomMenu",
        toggleStore_loginModal: "login_modal",
        toggleStore_noticeModal: "notice_modal",
      }),
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    data() {
      return {};
    },
    methods: {
      removeMask() {
        this.$store.commit("toggleStore/Toggle", {
          mask: false,
          more_view: false,
          login_modal: false,
        });
      },
    },
    mounted() {
      // 가로모드 세로모드 감지
      window.addEventListener("resize", function() {
        if (window.matchMedia("(orientation: portrait)").matches) {
          // Portrait 모드일 때 실행할 스크립트
          // 폭과 높이가 같으면 Portrait 모드로 인식돼요
        } else {
          // Landscape 모드일 때 실행할 스크립트
        }
      });
    },
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
    position: relative;
    min-height: 100%;
    .mask {
      position: fixed;
      max-width: 720px;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 5;
    }
  }
  .router-view {
    position: relative;
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
      font-size: 12px;
    }
  }
  // 갤럭시 s9+ (세로:412,가로:798),
  // 아이폰8 (세로: 320) 아이폰은 플러스계열만 가로모드 지원
  @media all and (max-width: 420px) {
    html {
      font-size: 12px;
    }
  }
  @media all and (max-width: 360px) {
    html {
      font-size: 10px;
    }
  }
</style>
