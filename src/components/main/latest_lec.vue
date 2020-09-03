<template>
  <div id="latest_lec">
    <h1>최신 강의</h1>
    <p>
      최근 트렌드를 반영한 강의 정보를 확인하세요
    </p>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <img
          src="@/assets/images/main/popular_lec1.png"
          alt="이지업"
          title="이지업"
      /></swiper-slide>
      <swiper-slide>
        <img
          src="@/assets/images/main/popular_lec2.png"
          alt="이지업"
          title="이지업"/></swiper-slide
      ><swiper-slide>
        <img
          src="@/assets/images/main/popular_lec3.png"
          alt="이지업"
          title="이지업"
      /></swiper-slide>
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
  #latest_lec {
    padding: 4.445%;
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
  }
  .swiper-slide {
    width: 46.6%;

    margin-right: 2.44%;
  }
  .swiper {
    margin-top: 20px;
  }
</style>
