<template>
  <div id="profile_modify">
    <h2>프로필 편집</h2>
    <form>
      <legend>프로필 편집</legend>
      <fieldset>
        <div class="row">
          <label for="last_name">성</label>
          <input type="text" id="last_name" readonly value="윤" />
        </div>
        <div class="row">
          <label for="first_name">이름</label>
          <input type="text" id="first_name" readonly value="계상" />
        </div>
        <div class="row">
          <label for="email">이메일</label>
          <input type="text" id="email" readonly value="duatpwnd1@naver.com" />
        </div>
        <div class="row">
          <label>연락처</label>
          <input type="tell" id="phone" placeholder="01022223333" />
        </div>
        <div class="row">
          <label>이미지 추가</label>
          <input type="file" id="upload" />
          <label for="upload" class="file">파일 선택</label>
          <div class="noti">
            * JPG , PNG 파일로 만 등록 가능하며 파일 용량을 3MB 미만으로 설정해
            주세요.
          </div>
        </div>
        <div class="row">
          <label for="pw">새 비밀번호</label>
          <input type="password" id="pw" autocomplete="true" />
        </div>
        <div class="row">
          <label for="re_pw">비밀번호 확인</label>
          <input type="password" id="re_pw" autocomplete="true" />
        </div>
        <BlueBtn>
          <button slot="blue_btn">변경</button>
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
  #profile_modify {
    padding: 4.445%;
    .blue_btn {
      margin-top: 5%;
    }
    .row {
      margin-top: 2%;
      clear: both;
      input[type="text"] {
        border: 0;
        outline: none;
      }
      input[type="file"] {
        display: none;
      }
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
    }
  }
</style>
