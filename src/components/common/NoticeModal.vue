<template>
  <div class="mask">
    <div class="notice_modal">
      <p class="contents">
        {{ toggleStore_noticeMessage }}
      </p>
      <BlueBtn>
        <button class="ok" slot="blue_btn" @click="ok()">확인</button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState, mapMutations } from "vuex";

  export default {
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_noticeMessage: "notice_message",
      }),
    },
    data() {
      return {};
    },
    methods: {
      ok() {
        this.$store.commit("toggleStore/Toggle", {
          notice_modal: false,
        });
      },
    },
  };
</script>
<style scoped lang="scss">
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 5;
    .notice_modal {
      background: white;
      max-width: 720px;
      width: 80%;
      margin: 0 auto;
      padding: 10px;
      box-sizing: border-box;
      height: 92px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .contents {
        font-size: 16px;
        text-align: center;
        margin-bottom: 20px;
      }

      .blue_btn {
        text-align: center;
        .ok {
          width: 50%;
        }
      }
    }
  }
</style>
