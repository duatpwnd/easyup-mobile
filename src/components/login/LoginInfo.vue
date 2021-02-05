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
          $router.push({
            path: '/course',
            query: {
              action: 'get_session_list',
              pageCurrent: 1,
              order: 'type_date',
              keyword: '',
            },
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
      >
        코스
      </button>
      <button
        v-if="env == 'development'"
        class="lnb"
        @click="
          $router.push({
            path: '/techBlog',
            query: {
              pageCurrent: 1,
              keyword: '',
            },
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
      >
        이지타임
      </button>
      <button
        @click="
          $router.push('/studentClaasRoom');
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
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
          $router.push({
            path: '/uniJob',
            query: {
              pageCurrent: 1,
              keyword: '',
            },
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
        class="lnb"
      >
        이지잡
      </button>
      <button
        class="lnb"
        @click="
          $router.push({
            path: '/profileModify',
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
      >
        개인정보 확인/수정
      </button>
    </div>
    <div class="support">
      <button
        @click="
          $router.push({
            path: '/help/notice',
            query: {
              pageCurrent: 1,
              keyword: '',
            },
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
      >
        공지사항
      </button>
      <button
        @click="
          $router.push({
            name: 'helpFaq',
            query: {
              category: 'all',
              current: 1,
              keyword: '',
            },
          });
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
          });
        "
      >
        FAQ
      </button>
      <button
        @click="
          $router.push('/help/qna');
          $store.commit('toggleStore/Toggle', {
            login_modal: false,
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
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {
        userid: "",
        userpw: "",
        env: "",
      };
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_loginModal: "login_modal",
      }),
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    methods: {
      logout() {
        console.log("로그아웃호출");
        this.$logOut();
      },
      goToPath(url, obj) {
        this.$router.push(url).catch(() => {});
        this.$store.commit("toggleStore/Toggle", obj);
      },

      goToLecture() {
        this.$EventBus.$emit("GoToLecture", true);
      },
    },
    mounted() {
      this.env = process.env.NODE_ENV;
    },
  };
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
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 72.222%;
    box-sizing: border-box;
    background: #f8f8f8;
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
        font-size: 1.5rem;
        display: inline-block;
        width: 33.333%;
        text-align: center;
      }
    }
    .logout {
      background: white;
      padding: 4.445%;
      padding-top: 0;
    }
  }
</style>
