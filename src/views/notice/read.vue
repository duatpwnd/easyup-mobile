<template>
  <div>
    <div class="head">
      <span class="title">[파이선 완벽 뽀개기]</span>
      <span>전체 휴강 안내드립니다.</span>
    </div>
    <div class="contents">
      <pre>
강동원 강사님<br><br>제가 개인적인 사정으로 휴강하게 되었습니다<br>죄송합니다.</pre>
    </div>
    <div class="button_wrap">
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          수정
        </button>
      </BlueBorderBtn>
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          삭제
        </button>
      </BlueBorderBtn>
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          이전글
        </button>
      </BlueBorderBtn>
      <BlueBorderBtn class="btn last_btn">
        <button slot="blue_border_btn">
          다음글
        </button>
      </BlueBorderBtn>
    </div>
  </div>
</template>
<script>
  import BlueBorderBtn from "@/components/common/blue_border_btn.vue";
  export default {
    components: {
      BlueBorderBtn,
    },
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
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
      width: 23.172%;
      &:not(:first-child) {
        margin-left: 2%;
      }
    }
    .last_btn {
      float: right;
    }
  }
</style>
