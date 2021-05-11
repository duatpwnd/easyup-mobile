<template>
  <div id="findByEmail" v-if="reload">
    <h2>비밀번호 재발급</h2>
    <form class="form">
      <legend>이메일로 비밀번호 임시 발급</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="pw1">비밀번호</label>
          <input type="password" id="pw1" v-model="pw1" />
        </div>
        <div class="row">
          <label class="dt" for="pw2">비밀번호 확인</label>
          <input type="password" id="pw2" v-model="pw2" />
        </div>
        <div class="row last_row">
          <span>변경까지 남은시간</span><span class="timer">{{ time }}</span>
        </div>
        <BlueBtn>
          <button type="button" slot="blue_btn" @click="pwChange()">
            비밀번호 변경
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: { BlueBtn },
  })
  export default class ReissuePw extends Vue {
    private pw1 = "";
    private pw2 = "";
    private time = "";
    private reload = true;
    private countdown(): void {
      let timeArray = this.time.split(":");
      let seconds = this.timeToSeconds(timeArray);
      if (typeof seconds === "string") {
        this.time = "00:00";
        this.tokenCheck();
        return;
      } else {
        seconds--;
        this.time = this.secondsToTime(seconds);
        let timeoutMyOswego = setTimeout(this.countdown, 1000);
      }
    }
    private timeToSeconds(timeArray: string[]): number | string {
      const minutes = ((timeArray[0] as unknown) as number) * 1;
      let seconds = (((minutes * 60 + timeArray[1]) as unknown) as number) * 1;
      return seconds;
    }
    private secondsToTime(secs: number): string {
      let hours: string | number = Math.floor(secs / (60 * 60));
      hours = hours < 10 ? "0" + hours : hours;
      const divisor_for_minutes = secs % (60 * 60);
      let minutes: string | number = Math.floor(divisor_for_minutes / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const divisor_for_seconds = divisor_for_minutes % 60;
      let seconds: string | number = Math.ceil(divisor_for_seconds);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    }
    private pwChange(): void {
      const data = {
        action: "reset_password",
        token: this.$route.query.token,
        new_password: this.pw1,
        new_password_confirm: this.pw2,
      };
      console.log(data);
      if (this.pw1.trim().length == 0) {
        this.$noticeMessage("비밀번호를 입력해주세요.");
      } else if (this.pw2.trim().length == 0) {
        this.$noticeMessage("비밀번호 확인을 입력해주세요.");
      } else if (this.pw1 != this.pw2) {
        this.$noticeMessage("비밀번호가 일치하지 않습니다.");
      } else {
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result: { [key: string]: any }) => {
            console.log("비밀번호 변경", result);
            this.$noticeMessage("비밀번호 변경이 완료 되었습니다.");
            this.$router.push("/");
          });
      }
    }
    private tokenCheck(): void {
      const data = {
        action: "reset_password_token_chk",
        token: this.$route.query.token,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          if (result.data.error) {
            this.$noticeMessage(result.data.message);
            this.$router.push("/lostPassword");
          } else {
            this.time = result.data.data.remain_time;
            this.countdown();
          }
        });
    }
    mounted() {
      this.tokenCheck();
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
        span {
          vertical-align: middle;
        }
        .timer {
          color: #114fff;
          margin-left: 5px;
        }
      }
    }
  }
</style>
