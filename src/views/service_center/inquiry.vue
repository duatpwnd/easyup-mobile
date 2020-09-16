<template>
  <div class="inquiry">
    <Notice></Notice>
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
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
  import Search from "@/components/common/search.vue";
  import Notice from "@/components/common/notice.vue";
  export default {
    components: {
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
  .inquiry {
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
    .search {
      margin-top: 4%;
    }
  }
</style>
