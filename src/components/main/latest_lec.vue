<template>
  <div id="latest_lec">
    <h2>최신 강의</h2>
    <p>
      최근 트렌드를 반영한 강의 정보를 확인하세요
    </p>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide> <LecItem></LecItem></swiper-slide>
      <swiper-slide> <LecItem></LecItem></swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import mixin from "@/components/mixins/swiper.js";
  import LecItem from "@/components/common/LectureItem.vue";
  export default {
    components: {
      LecItem,
    },
    mixins: [mixin],
  };
</script>
<style scoped lang="scss">
  #latest_lec {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    p {
      margin-top: 5px;
      font-size: 1.125rem;
      color: #999999;
    }
  }

  .swiper {
    margin-top: 8px;
  }
</style>
