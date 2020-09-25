<template>
  <div class="scorm">
    <h2>3강. 이러지도 저러지도 못하는 초보 개발자의 파이썬 실전 100% 활용</h2>
    <span class="progress"><span class="progress_bar"></span></span>
    <div class="process">
      <span>진도율 :</span>
      <span> 2강/10강 (20%)</span>
      <div>
        <span>기간 :</span>
        <span> 무제한</span>
      </div>
    </div>
    <div class="btn_wrap">
      <BlueBtn class="btn">
        <button slot="blue_btn">
          강의평가
        </button>
      </BlueBtn>
      <BlueBtn class="btn bookmark">
        <button slot="blue_btn">
          책갈피 +
        </button>
      </BlueBtn>
      <BlueBtn class="btn next">
        <button slot="blue_btn">
          다음강의 보기
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .scorm {
    padding: 4.445%;
    padding-bottom: 3%;
    h2 {
      font-size: 1.6875rem;
      color: #333333;
    }
    .progress {
      width: 100%;
      background: #dbdbdb;
      height: 8px;
      border-radius: 10px;
      display: inline-block;
      margin: 4% 0;
      position: relative;
      .progress_bar {
        display: inline-block;
        border-radius: 10px;
        background: #114fff;
        width: 40%;
        height: 8px;
        position: absolute;
        top: 0;
      }
    }
    .process {
      span {
        font-size: 1.5rem;
        font-weight: 500;
        color: #333333;
      }
    }
    .btn_wrap {
      margin-top: 2%;
      &:after {
        display: block;
        content: "";
        clear: both;
      }

      .btn {
        float: left;
        width: 23.171%; /* 152px/656px */
        button {
          border: 1px solid #114fff;
          background: white;
          color: #114fff;
          height: 24px;
          line-height: 16px;
          font-size: 12px;
        }
      }
      .next {
        float: right;
        width: 28.354%; /* 186px/656px */
      }
      .bookmark {
        margin-left: 2%;
      }
    }
  }
</style>
