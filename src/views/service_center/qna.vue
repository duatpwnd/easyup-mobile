<template>
  <div class="qna">
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
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
          <select name="" id="">
            <option value="">강동원</option>
          </select>
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
          <label class="dt">휴대폰<span class="required">＊</span></label>
          <input type="tell" id="phone" />
        </div>

        <div class="row">
          <label class="dt">내용<span class="required">＊</span></label>
          <textarea
            name=""
            id=""
            rows="3"
            placeholder="서비스 이용약관"
          ></textarea>
        </div>
        <div class="row">
          <label class="dt">파일첨부</label>
          <input type="file" id="upload" />
          <label for="upload" class="file">파일 선택</label>
        </div>
        <BlueBtn>
          <button slot="blue_btn" @click="register()">문의하기</button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common//blue_btn.vue";
  import Search from "@/components/common/search.vue";
  import Notice from "@/components/common/notice.vue";
  export default {
    components: {
      BlueBtn,
      Notice,
      Search,
    },
    data() {
      return {};
    },
    methods: {
      goToPath() {
        this.$router.push("/help/read");
      },
    },
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
      margin-top: 2%;
      .row {
        margin-top: 2%;

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
          background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat
            90% center;
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
        input[type="file"] {
          display: none;
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
  }
</style>
