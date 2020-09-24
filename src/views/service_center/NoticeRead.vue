<template>
  <div class="read">
    <div class="head">
      <span>[서비스 중단 안내] 서비스 개선 작업에 의한 중단</span>
    </div>
    <div class="contents">
      <pre>



이지업을 사랑해주시는 고객 여러분께 감사의 말씀을 드립니다.<br> 더 나은 서비스를 제공하기 위하여 서비스 일시적 중단 작업에 들어갑니다.<br> 27일 오전 10시부터 11시까지 서비스가 중단됩니다.<br> 접속하지 마세요 경고합니다. 감사합니다..



</pre>
    </div>
    <div class="button_wrap">
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
  .read {
    padding: 4.445%;
    .head {
      margin-top: 5%;
      span {
        font-size: 1.375rem;
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
      }
      .last_btn {
        float: right;
      }
    }
  }
</style>
