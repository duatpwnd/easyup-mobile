<template>
  <div id="signup">
    <h2>비밀번호 변경</h2>
    <form class="form">
      <legend>비밀번호 변경</legend>
      <fieldset>
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
        <div class="row last_row">
          <span>변경까지 남은 시간</span>
          <span class="timer">00 : 00</span>
        </div>
        <BlueBtn>
          <button type="button" slot="blue_btn">등록</button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/blue_btn.vue";

  export default {
    components: { BlueBtn },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  #signup {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
      color: #333333;
    }
    .form {
      margin-top: 4%;

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

        input {
          font-size: 1.5rem;
          font-family: "NotoSansCJKkr-Regular";
          width: calc(100% - 35%);
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          padding: 1%;
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
      }
      .last_row {
        width: calc(100% - 35%);
        position: relative;
        float: right;
        color: #333333;
        margin: 2% 0;
        font-size: 1.125rem;
        font-family: "NotoSansCJKkr-Regular";
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .timer {
          color: #114fff;
          margin-left: 5%;
          font-weight: 600;
        }
      }
    }
  }
</style>
