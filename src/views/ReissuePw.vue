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
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";

  export default {
    components: { BlueBtn },
    data() {
      return {
        pw1: "",
        pw2: "",
        time: "",
        reload: true,
      };
    },
    methods: {
      countdown() {
        let timeArray = this.time.split(":");
        let seconds = this.timeToSeconds(timeArray);
        if (seconds == "") {
          this.time = "00:00";
          this.tokenCheck();
          return;
        } else {
          seconds--;
          this.time = this.secondsToTime(seconds);
          let timeoutMyOswego = setTimeout(this.countdown, 1000);
        }
      },
      timeToSeconds(timeArray) {
        const minutes = timeArray[0] * 1;
        let seconds = minutes * 60 + timeArray[1] * 1;
        return seconds;
      },
      secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));
        hours = hours < 10 ? "0" + hours : hours;
        const divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
      },
      pwChange() {
        const data = {
          action: "reset_password",
          token: this.$route.query.token,
          new_password: this.pw1,
          new_password_confirm: this.pw2,
        };
        console.log(data);
        if (this.pw1.trim().length == 0) {
          this.$Util.default.noticeMessage("비밀번호를 입력해주세요.");
        } else if (this.pw2.trim().length == 0) {
          this.$Util.default.noticeMessage("비밀번호 확인을 입력해주세요.");
        } else if (this.pw1 != this.pw2) {
          this.$Util.default.noticeMessage("비밀번호가 일치하지 않습니다.");
        } else {
          this.$axios
            .post(this.$ApiUrl.main_list, JSON.stringify(data), {
              headers: {
                Authorization: this.$cookies.get("user_info")
                  ? "Bearer " + this.$cookies.get("user_info").access_token
                  : null,
              },
            })
            .then((result) => {
              console.log("비밀번호 변경", result);
              this.$Util.default.noticeMessage(
                "비밀번호 변경이 완료 되었습니다."
              );
              this.$router.push("/");
            });
        }
      },
      tokenCheck() {
        const data = {
          action: "reset_password_token_chk",
          token: this.$route.query.token,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log("토큰", result);
            if (result.data.error) {
              this.$Util.default.noticeMessage(result.data.message);
              this.$router.push("/lostPassword");
            } else {
              this.time = result.data.data.remain_time;
              this.countdown();
            }
          });
      },
    },
    mounted() {
      this.tokenCheck();
    },
  };
</script>
<style scoped lang="scss">
  #findByEmail {
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
