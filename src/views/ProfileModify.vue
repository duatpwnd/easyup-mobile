<template>
  <div id="profile_modify">
    <h2>프로필 편집</h2>
    <!-- 휴대폰 인증 모달 :: S -->
    <div class="phone-auth-modal" v-if="authModal">
      <h2>프로필 편집</h2>
      <div class="row">
        <label class="dt phone-title"
          >연락처<span class="required">＊</span></label
        >
        <div class="phone">
          <input v-model="phone" type="tell" id="phone" />
          <button
            ref="submit_btn"
            type="button"
            class="submit-btn"
            @click="start"
          >
            전송
          </button>
        </div>
        <p class="auth-phone-msg" v-if="isWait">
          1분 후에 인증번호를 발송할 수 있습니다.
        </p>
      </div>
      <div class="row">
        <label class="dt phone-title">인증번호</label>
        <div class="phone">
          <input v-model="auth" type="number" id="auth" />
          <button type="button" class="submit-btn">인증</button>
        </div>
        <div class="timer" v-if="isTimer">{{ prettyTime | prettify }}</div>
      </div>
      <div class="btn_wrap">
        <slot name="button_type">
          <BlueBtn>
            <slot name="btn1">
              <button class="confirm_ok" slot="blue_btn">
                확인
              </button>
            </slot>
          </BlueBtn>
          <BlueBtn>
            <button class="cancel" slot="blue_btn" @click="authModal = false">
              취소
            </button>
          </BlueBtn>
        </slot>
      </div>
    </div>
    <!-- 휴대폰 인증 모달 :: E -->
    <form>
      <legend>프로필 편집</legend>
      <fieldset>
        <div class="row">
          <label for="last_name">성</label>
          <input
            type="text"
            id="last_name"
            readonly
            class="readonly"
            :value="userStore_userinfo.info.lastname"
          />
        </div>
        <div class="row">
          <label for="first_name">이름</label>
          <input
            type="text"
            id="first_name"
            readonly
            class="readonly"
            :value="userStore_userinfo.info.firstname"
          />
        </div>
        <div class="row">
          <label for="email">이메일</label>
          <span class="email_column">{{ userStore_userinfo.info.email }}</span>
          <!-- <input
            type="text"
            id="email"
            class="readonly"
            readonly
            :value="userStore_userinfo.info.email"
          /> -->
        </div>
        <div class="row">
          <label>연락처</label>
          <div class="phone">
            <input type="tell" v-model="phone" id="phone" disabled />
            <button type="button" class="submit-btn" @click="authModal = true">
              재인증
            </button>
          </div>
        </div>

        <div class="row">
          <label>이미지 추가</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            id="upload"
            ref="upload"
            @change="fileSelect()"
          />
          <label for="upload" class="file">파일 선택</label>
          <span class="file_name">{{ file_obj.name }}</span>

          <div class="noti">
            * JPG , PNG 파일로 만 등록 가능하며 파일 용량을 3MB 미만으로 설정해
            주세요.
          </div>
        </div>
        <div class="row">
          <label for="current_pw">현재 비밀번호</label>
          <input type="password" v-model="current_password" id="current_pw" />
        </div>
        <div class="row">
          <label for="pw">새 비밀번호</label>
          <input type="password" v-model="new_password" id="pw" />
        </div>
        <div class="row">
          <label for="re_pw">비밀번호 확인</label>
          <input type="password" v-model="new_password_confirm" id="re_pw" />
        </div>
        <div class="row">
          <label class="dt address">주소</label>
          <Search>
            <input
              type="text"
              v-model="address"
              slot="slot_input"
              class="search_contents"
            />
            <button
              slot="search_btn"
              class="search_btn"
              @click="isOpen = true"
              type="button"
            ></button>
          </Search>
          <div class="address-search" v-if="isOpen" @click="isOpen = false">
            <vue-daum-postcode @complete="onComplete" />
          </div>
        </div>
        <div class="row">
          <label class="dt">상세주소</label>
          <input v-model="detailAddress" type="text" />
        </div>
        <div class="row">
          <label class="dt">생년월일</label>
          <SelectYYMMDD @birthday="birthdaySet"></SelectYYMMDD>
        </div>
        <BlueBtn>
          <button slot="blue_btn" type="button" @click="editProfile()">
            변경
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { mapState } from "vuex";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import SelectYYMMDD from "@/components/common/SelectYYMMDD.vue";
  import Search from "@/components/common/Search.vue";

  @Component({
    components: {
      SelectYYMMDD,
      BlueBtn,
      Search,
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
  })
  export default class ProfileModify extends Vue {
    $refs!: {
      upload: HTMLFormElement;
      submit_btn: HTMLButtonElement;
    };
    private authModal = false;
    private detailAddress = ""; // 상세주소
    private address = ""; // 주소
    private birthYear = "";
    private birthMonth = "";
    private birthDays = "";
    private isOpen = false; // 주소찾기모달창
    private userStore_userinfo!: { [key: string]: any };
    private phone = "";
    private current_password = "";
    private new_password = "";
    private new_password_confirm = "";
    private file_obj: { [key: string]: any } = {};
    private time = 0;
    private timer = 1;
    private isWait = false; //인증번호 안내 메시지
    private isTimer = false;

    private start(): void {
      this.$refs.submit_btn.innerText = "재전송";
      if (this.time > 0) {
        console.log("재전송이다");
        this.isWait = true;
      } else {
        console.log("전송이다");
        this.time = 180;
        this.isTimer = true;
        this.timer = window.setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            clearInterval(this.timer);
            this.stop();
          }
        }, 1000);
      }
    }
    private stop(): void {
      clearInterval(this.timer);
      this.$noticeMessage(
        "인증번호 입력 시간이 만료 되었습니다.<br>인증번호를 재 발송 후 입력해 주세요."
      );
      this.time = 0;
      this.isTimer = false;
    }
    // 주소 검색 완료후 이벤트
    private onComplete(result: { [key: string]: any }): void {
      console.log(result);
      this.address = "(" + result.zonecode + ") " + result.address;
      this.isOpen = false;
    }
    private birthdaySet(day: { [key: string]: string }): void {
      console.log(day);
      this.birthYear = day.birthYear;
      this.birthMonth = day.birthMonth;
      this.birthDays = day.birthDays;
    }
    private validationCheck(): Promise<string> {
      return new Promise((resolve, reject) => {
        if (this.new_password != this.new_password_confirm) {
          this.$noticeMessage("비밀 번호가 서로 다릅니다.");
        } else {
          resolve("success");
        }
      });
    }
    private fileSelect(): void {
      const selected_file = this.$refs.upload.files[0];
      this.file_obj = selected_file;
    }
    private editProfile(): void {
      this.validationCheck().then((result) => {
        if (result == "success") {
          const formData = new FormData();
          const data = {
            action: "edit_profile",
            phone: this.phone,
            password0: this.current_password,
            new_password: this.new_password,
            new_password_confirm: this.new_password_confirm,
            picture: this.file_obj,
            addr1: this.address + this.detailAddress,
            birth_year: this.birthYear,
            birth_month: this.birthMonth,
            birth_day: this.birthDays,
          };
          console.log(data);
          for (let key in data) {
            formData.append(key, data[key as never]);
          }
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, formData)
            .then((result: { [key: string]: any }) => {
              console.log(result);
              if (result.data.error) {
                this.$noticeMessage(result.data.message);
              } else {
                // this.$cookies.set("user_info", result.data.data[0]);
                // this.$store.commit(
                //   "userStore/loginToken",
                //   result.data.data[0]
                // );
                this.$noticeMessage("새 프로필이 저장되었습니다.");
              }
            });
        }
      });
    }
    created() {
      this.phone = this.userStore_userinfo.info.phone;
    }
  }
</script>
<style scoped lang="scss">
  #profile_modify {
    padding: 4.445%;
    padding-bottom: 65px;
    .phone-auth-modal {
      background: white;
      max-width: 720px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      .btn_wrap {
        .blue_btn {
          text-align: center;
          width: 50%;
          display: inline-block;
          .confirm_ok,
          .cancel {
            width: 90%;
          }
          .cancel {
            background: #ccc;
            border: 2px solid #ccc;
          }
        }
      }
    }
    .blue_btn {
      margin-top: 5%;
    }
    .address-search {
      position: fixed;
      max-width: 720px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 6;
      .vue-daum-postcode {
        overflow: auto;
        height: 100%;
      }
    }
    .row {
      margin-top: 2%;
      clear: both;
      .phone {
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        width: calc(100% - 35%);
        border: 1px solid #ccc;
        border-right: 0;

        border-radius: 5px;
        box-sizing: border-box;
        position: relative;
        #phone,
        #auth {
          border: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          width: 80%;
          padding: 5px 6px 5px 6px;
          height: 30px;
        }
        .submit-btn {
          height: 32px;
          font-weight: bold;
          width: 20%;
          vertical-align: middle;
          border-radius: 4px;
          border: 1px solid #114fff;
          color: #114fff;
          position: absolute;
          top: -1px;
          right: 0;
        }
      }
      .readonly {
        border: 0;
        outline: none;
      }
      .email_column {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 1.5rem;
        white-space: pre-wrap;
        display: inline-block;
        width: 65%;
        word-break: break-all;
        vertical-align: middle;
      }
      input[type="file"] {
        display: none;
      }
      input {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 14px;
        width: calc(100% - 35%);
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        padding: 5px 6px;
        height: 32px;
        line-height: 13px;
        box-sizing: border-box;
      }
      input[type="tell"]:disabled {
        background: #dbdbdb;
        box-shadow: 0px 0px 1px 1px #dbdbdb;
      }
      .noti {
        float: right;
        width: calc(100% - 35%);
        color: #666666;
        margin: 2% 0;
        font-size: 1.125rem;
        font-family: "NotoSansCJKkr-Regular";
      }

      label {
        width: 35%;
        vertical-align: middle;
        display: inline-block;
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
      }
      .file {
        width: auto;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 14px;
        padding: 0% 5.946%;
        height: 24px;
        line-height: 24px;
      }
      .file_name {
        margin-left: 10px;
      }
      .search,
      .select-wrap {
        margin-top: 0;
        width: calc(100% - 35%);
        display: inline-block;
        vertical-align: middle;
        .search_contents {
          margin-left: 0;
          width: 100%;
        }
      }
      ::v-deep .select-wrap {
        .select {
          width: 31.333%;
          &:not(:last-child) {
            margin-right: 3%;
          }
        }
      }
    }
  }
</style>
