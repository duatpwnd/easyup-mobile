<template>
  <div class="faq">
    <ul class="faq_gnb">
      <li><span>전체</span></li>
      <li><span class="bar">｜</span></li>
      <li><span>회원 정보</span></li>
      <li><span class="bar">｜</span></li>
      <li><span>강의/코스등록</span></li>
      <li><span class="bar">｜</span></li>
      <li><span>강의/코스구독</span></li>
      <li><span class="bar">｜</span></li>
      <li><span>강의시청</span></li>
      <li><span class="bar">｜</span></li>
      <li><span>기타</span></li>
    </ul>
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
    <h2>총<span class="num">9</span>건</h2>
    <dl class="item_wrap">
      <dt>
        <img
          src="@/assets/images/common/question_ico.png"
          alt="질문"
          title="질문"
          class="que_ico"
        />
        [회훤정보] 회원 가입 시 반드시 이메일 주소로 가입해야 하나요?
      </dt>
      <dd>
        A. 회원의 고유 정보 확인은 물론 별도의 이메일 정보를 중복 등록하지
        않아도 되기에 이메일 주소를 사용하여 가입해주세요.
      </dd>
    </dl>
  </div>
</template>
<script>
  import Search from "@/components/common/search.vue";
  export default {
    components: {
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
  .faq {
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
    .faq_gnb {
      background: #f4f4f4;
      padding: 2%;
      border-radius: 30px;
      display: flex;
      justify-content: space-around;
      line-height: 1;
      li {
        span {
          font-size: 1.25rem;
          color: #999999;
          vertical-align: middle;
        }
        .bar {
          font-size: 1rem;
        }
      }
    }
    .item_wrap {
      dt {
        color: #333333;
        font-size: 1.375rem;
        font-family: "NotoSansCJKkr-Regular";
        font-weight: 600;
        margin-top: 4%;
        .que_ico {
          width: 5.2%;
        }
      }
      dd {
        margin-top: 2%;
        color: #666666;
        font-family: "NotoSansCJKkr-Regular";
        font-size: 1.25rem;
        background: #f8f8f8;
        padding: 1.5%;
        border-radius: 5px;
      }
    }
  }
</style>
