<template>
  <div id="translation_lec">
    <h2>번역 강의</h2>
    <p>
      한글 자막이 제공되는 외국 우수 강의를 구독하세요
    </p>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <router-link to="/main/list">
          <img
            src="@/assets/images/main/popular_lec1.png"
            alt="이지업"
            title="이지업"/></router-link
      ></swiper-slide>
      <swiper-slide>
        <router-link to="/main/list">
          <img
            src="@/assets/images/main/popular_lec2.png"
            alt="이지업"
            title="이지업"/></router-link></swiper-slide
      ><swiper-slide>
        <router-link to="/main/list">
          <img
            src="@/assets/images/main/popular_lec3.png"
            alt="이지업"
            title="이지업"/></router-link
      ></swiper-slide>
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
  #translation_lec {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    p {
      margin-top: 10px;
      font-size: 1.125rem;
      color: #999999;
    }
  }
  .swiper-slide {
    // width: 45.6%;
    // margin-right: 2.44%;
  }
  .swiper {
    margin-top: 20px;
  }
</style>
