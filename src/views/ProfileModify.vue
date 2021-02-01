<template>
  <div id="profile_modify">
    <h2>프로필 편집</h2>
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
          <input
            type="tell"
            v-model="phone"
            id="phone"
            placeholder="ex) 01012345678"
          />
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
        <BlueBtn>
          <button slot="blue_btn" type="button" @click="editProfile()">
            변경
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { BlueBtn },
  computed: {
    ...mapState("userStore", {
      userStore_userinfo: "userinfo"
    })
  },
  data() {
    return {
      phone: "",
      current_password: "",
      new_password: "",
      new_password_confirm: "",
      file_obj: ""
    };
  },
  methods: {
    validationCheck() {
      return new Promise((resolve, reject) => {
        if (this.new_password != this.new_password_confirm) {
          this.$noticeMessage("비밀 번호가 서로 다릅니다.");
        } else {
          resolve("success");
        }
      });
    },
    fileSelect() {
      const selected_file = this.$refs.upload.files[0];
      this.file_obj = selected_file;
    },
    editProfile() {
      this.validationCheck().then(result => {
        if (result == "success") {
          const formData = new FormData();
          const data = {
            action: "edit_profile",
            phone: this.phone,
            password0: this.current_password,
            new_password: this.new_password,
            new_password_confirm: this.new_password_confirm,
            picture: this.file_obj
          };
          for (var key in data) {
            formData.append(key, data[key]);
          }

          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: this.$cookies.get("user_info")
                  ? "Bearer " + this.$cookies.get("user_info").access_token
                  : null
              }
            })
            .then(result => {
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
  },
  created() {
    console.log(this.userStore_userinfo.info);
    this.unijob_id = this.userStore_userinfo.info.unijob_id;
    this.phone = this.userStore_userinfo.info.phone;
  }
};
</script>
<style scoped lang="scss">
#profile_modify {
  padding: 4.445%;
  .blue_btn {
    margin-top: 5%;
  }
  .row {
    margin-top: 2%;
    clear: both;
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
      vertical-align: middle;
      font-size: 1.5rem;
      font-family: "NotoSansCJKkr-Regular";
      width: calc(100% - 35%);
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      padding: 1%;
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
      font-size: 1.5rem;
      padding: 0.763% 5.946%;
    }
    .file_name {
      margin-left: 10px;
    }
  }
}
</style>
