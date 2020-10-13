<template>
  <div class="menu_modal">
    <div class="profile">
      <span class="profile_ico">
        <img
          src="@/assets/images/common/profile.png"
          alt="프로필"
          title="프로필"
        />
      </span>
      <h2>강동원 강사님</h2>
      <h3>duatpwnd1@naver.com</h3>
    </div>

    <div class="lnb_menu">
      <button class="lnb" @click="goToLecture()">강의</button>
      <router-link
        class="lnb"
        :to="{
          path: '/course',
          query: {
            action: 'get_session_list',
            pageCurrent: 1,
            order: 'type_date',
            keyword: '',
          },
        }"
        >코스</router-link
      >
      <button
        class="lnb"
        @click="
          goToPath('/techBlog', {
            login_modal: !toggleStore_loginModal,
          })
        "
      >
        기술블로그
      </button>
      <button class="lnb">내강의실</button>
      <button
        class="lnb"
        @click="
          goToPath('/profileModify', {
            login_modal: !toggleStore_loginModal,
          })
        "
      >
        개인정보 확인/수정
      </button>
    </div>
    <div class="support">
      <router-link to="/">공지사항</router-link>
      <router-link to="/">FAQ</router-link>
      <router-link to="/">1:1문의</router-link>
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
      };
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_loginModal: "login_modal",
      }),
    },
    methods: {
      logout() {
        console.log("로그아웃호출");
        this.$cookies.remove("access_token");
        this.$store.commit("userStore/loginToken", null);
        this.$router.push("/").catch(() => {});
      },
      goToPath(url, obj) {
        this.$router.push(url).catch(() => {});
        this.$store.commit("toggleStore/Toggle", obj);
      },

      goToLecture() {
        this.$EventBus.$emit("GoToLecture", true);
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .blue_btn {
    ::v-deep button {
      font-size: 12px;
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
      a {
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
