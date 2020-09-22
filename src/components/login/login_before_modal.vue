<template>
  <div class="menu_modal">
    <form class="login_form">
      <fieldset>
        <legend>로그인정보</legend>
        <input
          type="text"
          class="user_id"
          v-model="userid"
          placeholder="사용자명"
        />
        <input
          type="password"
          class="user_pw"
          v-model="userpw"
          placeholder="패스워드"
          autocomplete="true"
        />
        <BlueBtn>
          <button slot="blue_btn" @click="login()">로그인</button>
        </BlueBtn>
      </fieldset>
    </form>
    <div class="user_find">
      <span @click="goToPath('/signup')">회원가입</span>
      <span class="forget" @click="goToPath('/findByEmail')"
        >비밀번호 분실</span
      >
    </div>
    <div class="lec_course">
      <button class="lec">강의</button>
      <button class="course">코스</button>
    </div>
    <div class="support">
      <span>공지사항</span>
      <span>FAQ</span>
      <span>1:1문의</span>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/blue_btn.vue";
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
      goToPath(url) {
        this.$router.push(url).catch(() => {});
        this.$store.commit("toggleStore/Toggle", {
          login_modal: !this.toggleStore_loginModal,
        });
      },
      login() {
        //post
        this.$store.commit("toggleStore/Toggle", {
          before_login: false,
        });
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .blue_btn {
    ::v-deep button {
      height: 28px;
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
    .login_form {
      background: white;
      padding: 4.445%;
      input {
        width: 100%;
        height: 28px;
        box-sizing: border-box;
        border: 2px solid #dbdbdb;
        border-radius: 4px;
        background: white;
        font-size: 12px;
        padding: 5px 10px;
      }

      .user_pw {
        margin: 10px 0;
      }
    }
    .lec_course {
      background: white;
      margin-top: 2%;
      padding: 4.445%;
      .lec {
        text-align: left;
        width: 100%;
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        background: url("~@/assets/images/common/right_arrow.png") no-repeat
          right center / 3%;
      }
      .course {
        @extend .lec;
        margin-top: 4%;
      }
    }
    .support {
      padding-bottom: 0;
      background: white;
      margin-top: 2%;
      padding: 4.445%;
      span {
        font-size: 1.5rem;
        display: inline-block;
        width: 33.333%;
        text-align: center;
      }
    }
    .user_find {
      padding-bottom: 0;
      background: white;
      padding: 4.445%;
      span {
        font-size: 1.5rem;
        display: block;
      }
      .forget {
        margin-top: 4%;
      }
    }
  }
</style>
