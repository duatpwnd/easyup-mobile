<template>
  <div>
    <ThumbNail></ThumbNail>
    <Intro></Intro>
    <LecEval></LecEval>
  </div>
</template>
<script>
  import ThumbNail from "@/components/lecture_detail/thumbnail";
  import Intro from "@/components/lecture_detail/intro";
  import LecEval from "@/components/lecture_detail/lec_evaluate";
  export default {
    components: {
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
