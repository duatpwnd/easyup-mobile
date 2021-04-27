<template>
  <div id="findByEmail">
    <h2>이메일로 비밀번호 임시 발급</h2>
    <form class="form">
      <legend>이메일로 비밀번호 임시 발급</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="email">가입 이메일 주소</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="row last_row">
          <span
            >* 회원 가입 시 등록한 이메일 주소를 입력하시면 이메일로 비밀번호
            수정 페이지를 안내해드립니다.</span
          >
        </div>
        <BlueBtn>
          <button type="button" slot="blue_btn" @click="send()">
            메일 요청
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  @Component({
    components: { BlueBtn },
  })
  export default class FindPw extends Vue {
    private email = "";
    private send(): void {
      const data = {
        action: "reset_password_send_mail",
        email: this.email,
      };
      console.log(data);
      if (this.email.trim().length == 0) {
        this.$noticeMessage("이메일 주소를 입력해주세요.");
      } else {
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result: { [key: string]: any }) => {
            console.log("이메일", result);
            // this.$noticeMessage(result.data.data.msg);
            this.$router.push("/");
          });
      }
    }
  }
</script>
<style scoped lang="scss">
  #findByEmail {
    padding: 16px;
    padding-top: 0;
    margin-top: 13px;
    h2 {
      font-size: 18px;
      margin-bottom: 13px;
      color: #333333;
    }
    .form {
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
          font-size: 16px;
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
          font-size: 16px;
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
      }
    }
  }
  @media all and (max-width: 360px) {
    #findByEmail {
      .form {
        .row {
          .dt {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
