<template>
  <div>
    <div class="head">
      <span class="title">[파이선 완벽 뽀개기]</span>
      <span>오늘 강의 과제입니다. 참고해 주세요.</span>
    </div>
    <div class="contents">
      <pre>
강동원 강사님<br><br>파이썬을 이제 막 시작한 여러분 안녕하세요.<br>첫번째 과제입니다.<br>공부 열심히 하세요. 첨부파일 꼭 읽어보시고 이번주 수요일까지 제출 부탁드립니다. 그럼 이만</pre>
    </div>
    <div class="button_wrap">
      <button class="btn left_btn">이전글</button>
      <button class="btn right_btn">다음글</button>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .head {
    margin-top: 5%;
    span {
      font-size: 1.375rem;
    }
    .title {
      color: #114fff;
      margin-right: 2%;
    }
  }
  .contents {
    border-top: 2px solid #333333;
    border-bottom: 2px solid #333333;
    padding: 2% 0;
    margin: 2% 0;
    pre {
      white-space: pre-wrap;
      font-size: 1.25rem;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
    }
  }
  .button_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      color: #114fff;
      border: 1px solid #114fff;
      border-radius: 5px;
      font-size: 1.5rem;
      font-family: "NotoSansCJKkr-Regular";
      padding: 0.763% 5.946%;
    }
    .left_btn {
      float: left;
    }
    .right_btn {
      float: right;
    }
  }
</style>
