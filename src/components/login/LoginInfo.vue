<template>
  <div class="menu_modal">
    <div class="profile">
      <span class="profile_ico">
        <img
          :src="userStore_userinfo.info.profile_image"
          alt="프로필"
          title="프로필"
        />
      </span>
      <h2>{{ userStore_userinfo.info.username }}</h2>
      <h3>{{ userStore_userinfo.info.email }}</h3>
    </div>

    <div class="lnb_menu">
      <button class="lnb" @click="goToLecture()">강의</button>
      <button
        class="lnb"
        @click="
          $router
            .push({
              path: '/course',
              query: {
                action: 'get_session_list',
                pageCurrent: 1,
                order: 'type_date',
                keyword: '',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        코스
      </button>
      <button
        v-if="env == 'development'"
        class="lnb"
        @click="
          $router
            .push({
              path: '/techBlog',
              query: {
                pageCurrent: 1,
                keyword: '',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        이지타임
      </button>
      <button
        @click="
          $router
            .push({
              path: '/studentClassRoom',
              query: {
                view:
                  userStore_userinfo.info.status === 1 ? 'student' : 'teacher',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
        class="lnb"
        tag="button"
      >
        내강의실
      </button>
      <button
        v-if="userStore_userinfo.info.is_unijob_possible"
        @click="
          $router
            .push({
              path: '/uniJob',
              query: {
                pageCurrent: 1,
                keyword: '',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
        class="lnb"
      >
        이지잡
      </button>
      <button
        class="lnb"
        @click="
          $router
            .push({
              path: '/profileModify',
              query: {
                view:
                  userStore_userinfo.info.status === 1 ? 'student' : 'teacher',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        개인정보 확인/수정
      </button>
    </div>
    <div class="support">
      <button
        @click="
          $router
            .push({
              path: '/help/notice',
              query: {
                pageCurrent: 1,
                keyword: '',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        공지사항
      </button>
      <button
        class="faq_btn"
        @click="
          $router
            .push({
              name: 'helpFaq',
              query: {
                category: 'all',
                current: 1,
                keyword: '',
              },
            })
            .catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        FAQ
      </button>
      <button
        @click="
          $router.push('/help/qna').catch(() => {});
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
            mask: false,
          });
        "
      >
        1:1문의
      </button>
    </div>
    <div class="logout">
      <BlueBtn>
        <button slot="blue_btn" @click="logout()">
          로그아웃
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  @Component({
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
  })
  export default class LoginInfo extends Vue {
    userid = "";
    userpw = "";
    env = "";
    logout(): void {
      this.$logOut();
    }
    goToPath(url: string, obj: object): void {
      this.$router.push(url).catch(() => {});
      this.$store.commit("toggleStore/Toggle", obj);
    }
    goToLecture(): void {
      this.$EventBus.$emit("GoToLecture", true);
    }
    mounted() {
      this.env = String(process.env.NODE_ENV);
    }
  }
</script>
<style scoped lang="scss">
  .blue_btn {
    ::v-deep button {
      font-size: 1.5rem;
      height: 40px;
      line-height: 32px;
    }
  }
  .menu_modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 72.222%;
    max-width: 720px;
    box-sizing: border-box;
    background: #f8f8f8;
    height: 100%;
    .profile {
      padding: 4.445%;
      background: white;
      text-align: center;
      .profile_ico {
        width: 33.773%;
        display: inline-block;
        border-radius: 100%;
        overflow: hidden;
      }
      h2 {
        margin-top: 6%;
        font-size: 2rem;
      }
      h3 {
        font-size: 1.25rem;
        color: #999999;
      }
    }
    .lnb_menu {
      background: white;
      margin-top: 2%;
      padding: 4.445%;
      .lnb {
        text-align: left;
        width: 100%;
        margin-top: 5px;
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        background: url("~@/assets/images/common/right_arrow.png") no-repeat
          right center / 3%;
      }
      .last_lnb {
        @extend .lnb;
        margin-top: 4%;
      }
    }
    .support {
      padding-bottom: 0;
      background: white;
      margin-top: 2%;
      padding: 4.445%;
      button {
        width: 100%;
        text-align: left;
        font-size: 1.5rem;
        display: block;
        background: url("~@/assets/images/common/right_arrow.png") no-repeat
          right center / 3%;
      }
      .faq_btn {
        margin: 4% 0;
      }
    }
    .logout {
      background: white;
      padding: 4.445%;
      padding-top: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
