<template>
  <div class="menu_modal">
    <!-- <div class="sns-login">
      <span class="login-title">SNS 로그인</span>
      <span class="sns-login-btn">
        <img
          src="@/assets/images/main/icon_kakao.png"
          alt="카카오로그인"
          title="카카오로그인"
        />
        <img
          src="@/assets/images/main/icon_naver.png"
          alt="네이버로그인"
          title="네이버로그인"
        />
        <img
          src="@/assets/images/main/icon_google.png"
          alt="구글로그인"
          title="구글로그인"
        />
      </span>
    </div> -->
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
          <button slot="blue_btn" type="button" @click="login()">로그인</button>
        </BlueBtn>
      </fieldset>
    </form>
    <div class="user_find">
      <span @click="goToPath('/signup')">회원가입</span>
      <span class="forget" @click="goToPath('/lostPassword')"
        >비밀번호 분실</span
      >
    </div>
    <div class="lec_course">
      <button class="lec arrow" @click="goToLecture()">
        강의
      </button>
      <button
        class="course arrow"
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
            mask: false,
          });
        "
      >
        코스
      </button>
      <button
        class="blog"
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
        이지채널
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
            mask: false,
          });
        "
      >
        공지사항
      </button>
      <button
        class="faq_btn"
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
            mask: false,
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
            mask: false,
          });
        "
      >
        1:1문의
      </button>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  @Component({
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("userStore", {
        userStore_referer: "refererLink",
      }),
    },
  })
  export default class LoginForm extends Vue {
    private userid = "";
    private userpw = "";
    private userStore_referer!: string;
    private goToLecture(): void {
      this.$EventBus.$emit("GoToLecture", true);
    }
    private goToPath(url: string): void {
      this.$router.push(url).catch(() => {});
      this.$store.commit("toggleStore/Toggle", {
        login_modal: false,
        mask: false,
      });
    }
    private login(): void {
      const data = {
        action: "login",
        userid: this.userid,
        userpw: this.userpw,
      };

      if (this.userid.trim().length == 0 || this.userpw.trim().length == 0) {
        this.$noticeMessage("아이디 또는 비밀번호를 입력해주세요");
      } else {
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then(
            (result: {
              data: { error: boolean; message: string; data: object[] };
            }) => {
              if (result.data.error) {
                this.$noticeMessage(result.data.message);
              } else {
                this.$cookies.set("user_info", result.data.data[0]);
                this.$store.commit("userStore/loginToken", result.data.data[0]);

                // 마지막 로그아웃 시점url이 있을경우
                if (this.userStore_referer != "") {
                  this.$router.push(this.userStore_referer).catch(() => {});
                }
              }
            }
          );
      }
    }
    created() {
      this.$EventBus.$on(
        "login from signUpComplete",
        (result: { email: string; password: string }) => {
          this.userid = result.email;
          this.userpw = result.password;
          this.login();
        }
      );
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
    height: 100%;
    box-sizing: border-box;
    background: #f8f8f8;
    .sns-login {
      background: white;
      padding: 4.445%;
      padding-bottom: 0;
      .login-title {
        vertical-align: middle;
        font-size: 1.5rem;
        display: inline-block;
        width: 40%;
      }
      .sns-login-btn {
        width: 60%;
        display: inline-block;
        text-align: right;
        img {
          &:not(:last-child) {
            margin-right: 15px;
          }
          width: 20.87%;
        }
      }
    }
    .login_form {
      background: white;
      padding: 4.445%;
      input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border: 2px solid #dbdbdb;
        border-radius: 4px;
        background: white;
        font-size: 1.5rem;
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
      }
      .course {
        @extend .lec;
        margin-top: 4%;
      }
      .arrow {
        background: url("~@/assets/images/common/right_arrow.png") no-repeat
          right center / 3%;
      }
      .blog {
        @extend .course;
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
      }
      .faq_btn {
        margin: 4% 0;
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
