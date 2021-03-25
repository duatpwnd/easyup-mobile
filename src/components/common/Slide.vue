<template>
  <div class="slide">
    <swiper class="swiper" :options="swiper_option" ref="mySwiper">
      <slot name="list"> </slot>
    </swiper>
    <slot name="nav_btn"></slot>
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  @Component
  export default class Slide extends Vue {
    @Prop(Object) private swiper_option!: object;
    updated(): void {
      const mySwiper = this.$refs.mySwiper as { [key: string]: any };
      mySwiper.swiper.slideTo(0);
    }
  }
</script>
<style scoped lang="scss">
  .slide {
    position: relative;
    margin-top: 8px;
    .swiper-slide {
      margin: 0 auto;
    }
  }
</style>
