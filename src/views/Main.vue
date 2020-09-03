<template>
  <div>
    <Banner></Banner>
    <PopularLec></PopularLec>
    <PopularCourse></PopularCourse>
    <LatestLec></LatestLec>
    <TranslationLec></TranslationLec>
    <CategoryLec></CategoryLec>
  </div>
</template>
<script>
  import Banner from "@/components/main/banner.vue";
  import PopularLec from "@/components/main/popular_lec.vue";
  import PopularCourse from "@/components/main/popular_course.vue";
  import LatestLec from "@/components/main/latest_lec.vue";
  import TranslationLec from "@/components/main/translation_lec.vue";
  import CategoryLec from "@/components/main/category_lec.vue";
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
  .tablet {
    color: black;
  }
</style>
