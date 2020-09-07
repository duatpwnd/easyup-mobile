<template>
  <div id="popular_course">
    <h2>인기 코스</h2>
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
  export default {
    data() {
      return {
        swiperOption: {
          spaceBetween: 20,
          slidesPerView: 1.1,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        },
      };
    },
  };
</script>
<style scoped lang="scss">
  #popular_course {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    p {
      margin-top: 10px;
      font-size: 1.125rem;
      color: #999999;
    }
    .swiper-slide {
      margin: 0 auto;
    }
    .swiper {
      margin-top: 20px;
    }
  }
</style>
