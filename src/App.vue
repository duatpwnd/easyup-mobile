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
<script lang="ts">
  import Header from "@/components/layout/Header.vue";
  import Footer from "@/components/layout/Footer.vue";
  import LoginModal from "@/components/login/LoginModal.vue";
  import LoginLnb from "@/components/login/LoginLnb.vue";
  import GnbBottomMenu from "@/components/layout/GnbBottomMenu.vue";
  // import ProfileMsgTab from "@/components/layout/ProfileMsgTab.vue";
  import NoticeModal from "@/components/common/NoticeModal.vue";
  import { mapState } from "vuex";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
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
  })
  export default class App extends Vue {
   private noticePopup():void{
      // 2021.05.28 자정까지만 팝업 띄우기 :: S
      if (
        new Date() >= new Date("05/27/2021 13:00:00") && // 언제부터
        new Date() < new Date("05/28/2021 00:00:00") // 언제까지 실행하기
      ) {
        this.$noticeMessage(
          `[공지_사이트 접속 장애 발생 건]<br><br>안녕하세요. 이지업입니다.<br><br>금일 인스타그램 클론코딩 강의 오픈과 맞물려 사이트 접속에 장애가 있었습니다. 해당 이슈는 서버 DB 용량 확장 과정에서 생긴 것으로, 현재 모든 조치가 완료된 상황입니다.<br><br>이지업을 찾아주신 여러분들께 서버 문제로 불편을 드리게 되어 진심으로 죄송합니다.<br><br>금일(27일) 자정까지 이지업에서 인스타그램 클론코딩 강의를 구매하시는 모든 분들께 선착순에 관계없이 해당 강의를  30,000원에 제공드리고자 합니다. 아울러 이번 이슈로 불편을 겪으신 강의 구매 수강생분들께는 사죄의 의미로 스타벅스 아메리카노 쿠폰을 전송드리겠습니다.<br><br>앞으로는 이런 일이 없도록 만전을 기하여, 더욱 발전된 서비스로 찾아뵙겠습니다.<br><br>다시한번 사과의 말씀 드립니다.`
        );
      }
      // 2021.05.28 자정까지만 팝업 띄우기 :: E
    }
    private removeMask():void {
      this.$store.commit("toggleStore/Toggle", {
        mask: false,
        more_view: false,
        login_modal: false,
      });
    }
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
    }
  }
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
