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
          <input type="text" id="last_name" />
        </div>
        <div class="row">
          <label class="dt" for="first_name"
            >이름<span class="required">＊</span></label
          >
          <input type="text" id="first_name" />
        </div>
        <div class="row">
          <label class="dt" for="email"
            >이메일<span class="required">＊</span></label
          >
          <input type="text" id="email" />
        </div>
        <div class="row">
          <label class="dt" for="pw"
            >비밀번호<span class="required">＊</span></label
          >
          <input type="password" id="pw" autocomplete="true" />
        </div>
        <div class="row">
          <label class="dt" for="re_pw"
            >비밀번호 확인<span class="required">＊</span></label
          >
          <input type="password" id="re_pw" autocomplete="true" />
        </div>
        <div class="row">
          <label class="dt">연락처</label>
          <input type="tell" id="phone" />
        </div>
        <div class="row">
          <label class="dt">언어</label>
          <select name="" id="">
            <option value="">korea</option>
          </select>
        </div>
        <div class="row">
          <label class="dt">서비스 이용약관</label>
          <textarea
            name=""
            id=""
            rows="3"
            placeholder="서비스 이용약관"
          ></textarea>
        </div>
        <div class="row agree">
          <CheckBox>
            <input type="checkbox" checked id="check" slot="check" />
          </CheckBox>
          <label for="check">약관 내용을 모두 확인하였으며 동의합니다.</label>
        </div>
        <BlueBtn>
          <button slot="blue_btn" @click="register()">등록</button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/blue_btn.vue";
  import CheckBox from "@/components/common/checkbox.vue";
  export default {
    components: { CheckBox, BlueBtn },
    data() {
      return {};
    },
    methods: {
      register() {
        this.$router.push("/signup/complete").catch(() => {});
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
      margin: 2% 0;
    }
    .blue_btn {
      margin-top: 5%;
      width: calc(100% - 35%);
      float: right;
      ::v-deep button {
        width: 70%;
      }
    }
    .row {
      margin-top: 2%;
      clear: both;

      input,
      textarea,
      select {
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        width: calc(100% - 35%);
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        padding: 1%;
      }
      select {
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
          center;
      }
      textarea {
        vertical-align: top;
        resize: none;
        font-size: 1.125rem;
        &::placeholder {
          color: #666666;
          font-size: 1.125rem;
        }
      }

      .dt {
        width: 35%;
        display: inline-block;
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        .required {
          color: #114fff;
        }
      }
      .file {
        width: auto;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 1.5rem;
        padding: 0.763% 5.946%;
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
