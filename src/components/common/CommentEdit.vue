<template>
  <div class="edit_wrap" v-if="active">
    <textarea
      placeholder="내용을 입력해주세요.(300자)"
      class="edit"
      name=""
      id=""
      v-on:input="contents = $event.target.value"
    ></textarea>
    <div class="btn_wrap">
      <BlueBtn class="left">
        <button slot="blue_btn" @click="reply_comment_add()">입력</button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn" @click="write_cancel()">취소</button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";

export default {
  props: ["active"],
  components: {
    BlueBtn
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.edit_wrap {
  .edit {
    border: 1px solid #dbdbdb;
    font-size: 1.375rem;
    width: 100%;
    resize: none;
    box-sizing: border-box;
    border-radius: 5px;
    height: 60px;
    padding: 10px;
    font-family: "NotoSansCJKkr-DemiLight";
    font-size: 11px;
    &::placeholder {
      color: #b5b5b5;
    }
  }
  .btn_wrap {
    margin-top: 10px;

    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .blue_btn {
      width: 48%;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
      button {
        background: white;
        color: #114fff;
      }
    }
  }
}
</style>
