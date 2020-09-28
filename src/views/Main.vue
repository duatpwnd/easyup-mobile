<template>
  <div id="main">
    <Banner></Banner>
    <PopularLec></PopularLec>
    <PopularCourse></PopularCourse>
    <LatestLec></LatestLec>
    <TranslationLec></TranslationLec>
    <CategoryLec></CategoryLec>
  </div>
</template>
<script>
  import Banner from "@/components/main/Banner.vue";
  import PopularLec from "@/components/main/PopularLecture.vue";
  import PopularCourse from "@/components/main/PopularCourse.vue";
  import LatestLec from "@/components/main/LatestLecture.vue";
  import TranslationLec from "@/components/main/TranslationLecture.vue";
  import CategoryLec from "@/components/main/MainCategory.vue";
  export default {
    components: {
      CategoryLec,
      TranslationLec,
      LatestLec,
      PopularCourse,
      PopularLec,
      Banner,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  #main {
    position: relative;
  }
  .tablet {
    color: black;
  }
</style>
