<template>
  <div id="popular_course">
    <h1>인기 코스</h1>
    <p>
      초심자 과정부터 전문가 과정까지, 전 과정을 합리적인 가격에 마스터하세요
    </p>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide><img src="@/assets/images/main/course1.png"/></swiper-slide>
      <swiper-slide><img src="@/assets/images/main/course2.png"/></swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import mixin from "./mixin/mixin.js";
  export default {
    mixins: [mixin],
  };
</script>
<style scoped lang="scss">
  #popular_course {
    padding: 4.445%;
    h1 {
      font-family: "NotoSansCJKkrM";
    }
  }
  h1 {
    font-size: 2rem;
    font-family: "NotoSansCJKkr-Medium";
  }
  p {
    margin-top: 10px;
    font-size: 1.125rem;
    font-family: "NotoSansCJKkr-DemiLight";
    color: #999999;
  }
  .swiper-slide {
    width: 95%;

    margin-right: 2.44%;
  }
  .swiper {
    margin-top: 20px;
  }
</style>
