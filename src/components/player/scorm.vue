<template>
  <div>
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
<style scoped lang="scss"></style>
