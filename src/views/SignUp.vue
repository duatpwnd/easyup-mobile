<template>
  <div id="signup">
    <h2>회원가입 : 학생</h2>
    <p class="noti">강사로 등록 희망하시는 분은 고객센터로 연락 주세요.</p>
    <form>
      <legend>회원가입</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="last_name"
            >성<span class="required">＊</span></label
          >
          <input v-model="lastname" type="text" id="last_name" />
        </div>
        <div class="row">
          <label class="dt" for="first_name"
            >이름<span class="required">＊</span></label
          >
          <input v-model="firstname" type="text" id="first_name" />
        </div>
        <div class="row">
          <label class="dt" for="email"
            >이메일<span class="required">＊</span></label
          >
          <input v-model="email" type="text" id="email" />
        </div>
        <div class="row">
          <label class="dt" for="pw"
            >비밀번호<span class="required">＊</span></label
          >
          <input v-model="pw1" type="password" id="pw" />
        </div>
        <div class="row">
          <label class="dt" for="re_pw"
            >비밀번호 확인<span class="required">＊</span></label
          >
          <input v-model="pw2" type="password" id="re_pw" />
        </div>
        <div class="row">
          <label class="dt">연락처</label>
          <input v-model="phone" type="tell" id="phone" />
        </div>
        <div class="row">
          <label class="dt">유니잡ID</label>
          <input v-model="unijob_id" type="text" />
        </div>
        <div class="row">
          <label class="dt">서비스 이용약관</label>
          <textarea
            name=""
            readonly
            disabled
            rows="3"
            placeholder="서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관"
          ></textarea>
        </div>
        <div class="row agree">
          <CheckBox>
            <input
              v-model="agree"
              type="checkbox"
              checked
              id="check"
              slot="check"
            />
          </CheckBox>
          <label for="check">약관 내용을 모두 확인하였으며 동의합니다.</label>
        </div>
        <BlueBtn>
          <button slot="blue_btn" type="button" @click="register()">
            등록
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  export default {
    components: { CheckBox, BlueBtn },
    data() {
      return {
        lastname: "",
        firstname: "",
        email: "",
        pw1: "",
        pw2: "",
        phone: "",
        unijob_id: "",
        agree: "",
      };
    },
    methods: {
      register() {
        if (this.agree == false) {
          this.$Util.default.noticeMessage("약관 내용에 동의 해주세요.");
        } else {
          const data = {
            action: "join",
            firstname: this.firstname, //필수
            lastname: this.lastname, //필수
            email: this.email, //필수, 이메일 형식체크, 이미 사용중인 계정인지는 백단에서 체크하고 있음
            password: this.pw1, //필수
            password_confirm: this.pw2, //필수, 비밀번호란과 동일여부 체크
            phone: this.phone, //옵션, 입력할 경우 숫자만 입력
            unijob_id: this.unijob_id, // 아는사람만
          };
          this.$axios
            .post(this.$ApiUrl.main_list, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              if (result.data.error) {
                this.$Util.default.noticeMessage(result.data.message);
              } else {
                this.$router.push("/signupComplete").catch(() => {});
              }
            })
            .catch((err) => {});
        }
      },
    },
  };
</script>
<style scoped lang="scss">
  #signup {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
      color: #333333;
    }
    .noti {
      color: #999999;
      font-size: 1.25rem;
      margin: 4px 0 15px 0;
    }
    .blue_btn {
      margin-top: 20px;
      width: calc(100% - 35%);
      float: right;
      ::v-deep button {
        width: 70%;
      }
    }
    .row {
      margin-top: 5px;
      clear: both;

      input,
      textarea,
      select {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 9px;
        width: calc(100% - 35%);
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        padding: 5px 6px;
        height: 28px;
        line-height: 13px;
        box-sizing: border-box;
      }
      select {
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
          center / 7px 5px;
      }
      textarea {
        vertical-align: top;
        resize: none;

        height: 60px;
        &::placeholder {
          color: #666666;
          font-size: 9px;
        }
      }

      .dt {
        width: 35%;
        display: inline-block;
        font-size: 12px;
        font-family: "NotoSansCJKkr-Regular";
        .required {
          color: #114fff;
        }
      }
    }
    .agree {
      width: calc(100% - 35%);
      position: relative;
      float: right;
      color: #666666;
      margin: 2% 0;
      font-size: 1.125rem;
      font-family: "NotoSansCJKkr-Regular";
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .container-checkbox {
        width: 7.7%;
      }
      label[for="check"] {
        margin-left: 10%;
      }
    }
  }
</style>
