<template>
  <div id="subscribe">
    <div class="subscribe_wrap">
      <h2>무료</h2>
      <BlueBtn>
        <button ref="subs_btn" slot="blue_btn" @click="video()">
          구독하기
        </button>
      </BlueBtn>
      <div>
        <span class="total_lec">총<span class="color">11</span>강</span>
      </div>
      <div>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="score">5.0</span>
      </div>
      <span class="name">강동원 강사님</span>
    </div>
    <button class="fixed_subs_btn" v-if="subscribe_btn">구독하기</button>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/blue_btn.vue";
  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {
        subscribe_btn: false,
      };
    },
    methods: {
      video() {
        this.$router.push("/play");
      },
      subscribe_btn_toggle() {
        if (this.$refs.subs_btn != undefined) {
          const btn_offset_top = this.$refs.subs_btn.offsetTop;
          const btn_h = this.$refs.subs_btn.clientHeight;
          const scroll_top = window.scrollY;
          if (scroll_top > btn_offset_top + btn_h) {
            this.subscribe_btn = true;
          } else {
            this.subscribe_btn = false;
          }
        }
      },
    },
    created() {
      window.onscroll = () => {
        this.subscribe_btn_toggle();
      };
    },
  };
</script>
<style scoped lang="scss">
  .blue_btn {
    ::v-deep button {
      border-radius: 20px;
      margin: 10px 0;
      height: 40px;
      line-height: 32px;
    }
  }
  #subscribe {
    padding: 4.445%;
    .subscribe_wrap {
      .total_lec {
        font-size: 1.375rem;
        .color {
          color: #114fff;
        }
      }
      .name {
        font-size: 1.375rem;
        color: #666666;
      }
      .star_wrap {
        width: 2.593%;
        display: inline-block;
      }
      .score {
        font-size: 1.375rem;
        color: #333333;
        vertical-align: middle;
        margin-left: 2%;
      }
    }
    .fixed_subs_btn {
      position: fixed;
      bottom: 0;
      background: #114fff;
      color: #ffffff;
      font-family: "NotoSansCJKkr-Medium";
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      width: 100%;
      max-width: 720px;
      z-index: 2;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
