<template>
  <div class="mask1">
    <div class="notice_modal">
      <p class="contents" v-html="toggleStore_noticeMessage"></p>
      <BlueBtn>
        <button class="ok" slot="blue_btn" @click="ok()">확인</button>
      </BlueBtn>
    </div>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_noticeMessage: "notice_message",
      }),
    },
  })
  export default class NoticeModal extends Vue {
    ok(): void {
      this.$store.commit("toggleStore/Toggle", {
        notice_modal: false,
      });
    }
  }
</script>
<style scoped lang="scss">
  .mask1 {
    position: fixed;
    max-width: 720px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .notice_modal {
      background: white;
      max-width: 720px;
      width: 80%;
      padding: 10px;
      box-sizing: border-box;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
