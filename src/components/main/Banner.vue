<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide><img src="@/assets/images/main/banner1.png"/></swiper-slide>
      <swiper-slide><img src="@/assets/images/main/banner1.png"/></swiper-slide>
      <swiper-slide><img src="@/assets/images/main/banner1.png"/></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: ".swiper-pagination",
          },
        },
      };
    },
  };
</script>
<style scoped lang="scss"></style>
