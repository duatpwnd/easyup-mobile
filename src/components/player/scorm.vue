<template>
  <div>
    <div class="btn_wrap">
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          강의평가
        </button>
      </BlueBorderBtn>
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          책갈피 +
        </button>
      </BlueBorderBtn>
      <BlueBorderBtn class="btn">
        <button slot="blue_border_btn">
          다음강의 보기
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
  .btn_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
    }
  }
</style>
