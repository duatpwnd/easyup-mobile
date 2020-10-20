<template>
  <swiper class="swiper" :options="swiper_option" ref="mySwiper">
    <slot name="list"> </slot>
  </swiper>
</template>
<script>
  export default {
    props: {
      swiper_option: {
        type: Object,
        required: true,
      },
    },
    components: {},
    data() {
      return {};
    },
    methods: {},
    updated() {
      this.$refs.mySwiper.swiper.slideTo(0);
    },
  };
</script>
<style scoped lang="scss">
  .swiper-slide {
    margin: 0 auto;
  }
  .swiper {
    margin-top: 8px;
  }
</style>
