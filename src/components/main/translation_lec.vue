<template>
  <div id="translation_lec">
    <h2>번역 강의</h2>
    <p>
      한글 자막이 제공되는 외국 우수 강의를 구독하세요
    </p>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <LecItem
          ><router-link class="lec_list" slot="router" to="/">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link> </LecItem
      ></swiper-slide>
      <swiper-slide> <LecItem></LecItem></swiper-slide>
      <swiper-slide> <LecItem></LecItem></swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import LecItem from "@/components/common/lecture_item.vue";
  import mixin from "./mixin/mixin.js";
  export default {
    components: {
      LecItem,
    },
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
