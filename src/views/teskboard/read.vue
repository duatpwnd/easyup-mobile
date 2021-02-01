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
      <BlueBtn class="left_btn">
        <button slot="blue_btn">
          이전글
        </button> </BlueBtn
      ><BlueBtn class="right_btn">
        <button slot="blue_btn">
          다음글
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
export default {
  components: {
    BlueBtn
  },
  methods: {}
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
    font-weight: 600;
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
  button {
    border: 1px solid #114fff;
    background: white;
    color: #114fff;
    height: 24px;
    line-height: 16px;
    font-size: 12px;
  }
  &:after {
    display: block;
    content: "";
    clear: both;
  }
  .left_btn {
    float: left;
    width: 23.172%;
  }
  .right_btn {
    float: right;
    width: 23.172%;
  }
}
</style>
