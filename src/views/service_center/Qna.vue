<template>
  <div class="qna">
    <Notice>
      <template slot="list">
        <li>
          <p>
            · 강좌에 필요한 자료를 공유하거나, 과제를 제출받는 통합공유
            게시판입니다.
          </p>
        </li>
        <li>
          <p>
            · 해당 강좌를 정확히 확인하시어 다른 강좌에 등록되거나 공유되지
            않도록 주의 해주세요.
          </p>
        </li>
      </template>
    </Notice>
    <form class="form">
      <legend>회원가입</legend>
      <fieldset>
        <div class="row">
          <label class="dt">질문선택<span class="required">＊</span></label>
          <select>
            <option value="all">전체</option>
            <option value="info">회원정보</option>
            <option value="regist">강의/코스 등록</option>
            <option value="subscribe">강의/코스 구독</option>
            <option value="player">강의시청</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div class="row">
          <label class="dt" for="first_name"
            >이름<span class="required">＊</span></label
          >
          <input type="text" v-model="name" id="first_name" />
        </div>
        <div class="row">
          <label class="dt" for="email"
            >이메일<span class="required">＊</span></label
          >
          <input type="text" v-model="email" id="email" />
        </div>

        <div class="row">
          <label class="dt">휴대폰<span class="required">＊</span></label>
          <input type="tell" v-model="phone" id="phone" />
        </div>

        <div class="row">
          <label class="dt">내용<span class="required">＊</span></label>
          <textarea rows="3" v-model="contents"></textarea>
        </div>
        <div class="row">
          <label class="dt">파일첨부</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            id="upload"
            ref="upload"
            @change="fileSelect()"
          />
          <label for="upload" class="file">파일 선택</label>
          <div class="file_name">{{ file_obj.name }}</div>
        </div>
        <BlueBtn>
          <button type="button" slot="blue_btn" @click="register()">
            문의하기
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
import Notice from "@/components/common/notice.vue";
export default {
  components: {
    BlueBtn,
    Notice
  },
  data() {
    return {
      file_obj: "",
      name: "",
      category: "",
      email: "",
      phone: "",
      contents: ""
    };
  },
  methods: {
    fileSelect() {
      const selected_file = this.$refs.upload.files[0];
      this.file_obj = selected_file;
    },
    goToPath() {
      this.$router.push("/help/read");
    },
    validationCheck() {
      return new Promise((resolve, reject) => {
        if (this.name.trim().length == 0) {
          this.$noticeMessage("이름을 입력하세요");
        } else if (this.email.trim().length == 0) {
          this.$noticeMessage("이메일을 입력하세요");
        } else {
          resolve("success");
        }
      });
    },
    register() {
      this.validationCheck().then(result => {
        console.log(result);
        if (result == "success") {
          // const formData = new FormData();
          // formData.append("action", "send_qna");
          // formData.append("add_file", this.file_obj);
          // formData.append("name", this.name);
          // formData.append("email", this.email);
          // formData.append("phone", this.phone);
          // formData.append("contents", this.contents);
          // formData.append("category", "all");
          // console.log(formData);
          const data = {
            action: "send_qna",
            category: "all",
            name: this.name,
            email: this.email,
            phone: this.phone,
            contents: this.contents,
            add_file: this.file_obj
          };
          console.log(data);
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, data, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(result => {
              console.log(result);
              this.$noticeMessage(result.data.data[0]);
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.qna {
  padding: 4.445%;

  h2 {
    font-size: 1.375rem;
    margin-top: 2.5%;
    padding-bottom: 2%;
    border-bottom: 2px solid #333333;
    .num {
      color: #114fff;
    }
  }
  .blue_btn {
    margin-top: 5%;
    width: calc(100% - 35%);
    float: right;
    ::v-deep button {
      width: 70%;
    }
  }
  .search {
    margin-top: 0;
  }
  .form {
    margin-top: 10px;
    .row {
      margin-top: 5px;

      input,
      textarea,
      select {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 12px;
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
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 95%
          center / 7px 5px;
      }
      textarea {
        vertical-align: top;
        resize: none;
        font-size: 9px;
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
      input[type="file"] {
        display: none;
      }
      .file {
        height: 24px;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 11px;
        width: 76px;
        display: inline-block;
        text-align: center;
        line-height: 24px;
      }
      .file_name {
        margin-left: 35%;
      }
    }
  }
}
</style>
