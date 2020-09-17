<template>
  <div id="lec_detail">
    <ThumbNail></ThumbNail>
    <Subscribe></Subscribe>
    <Intro></Intro>
    <LecEval></LecEval>
  </div>
</template>
<script>
  import ThumbNail from "@/components/lecture_detail/thumbnail";
  import Intro from "@/components/lecture_detail/intro";
  import Subscribe from "@/components/lecture_detail/subscribe";
  import LecEval from "@/components/lecture_detail/lec_evaluate";
  export default {
    components: {
      Subscribe,
      LecEval,
      Intro,
      ThumbNail,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss"></style>
