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
    BlueBtn
  },
  computed: {
    ...mapState("toggleStore", {
      toggleStore_noticeMessage: "notice_message"
    })
  },
  data() {
    return {};
  },
  methods: {
    ok() {
      this.$store.commit("toggleStore/Toggle", {
        notice_modal: false
      });
    }
  }
};
</script>
<style scoped lang="scss">
.mask {
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
