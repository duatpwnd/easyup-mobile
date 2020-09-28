<template>
  <div class="bookmark_add">
    <div class="row">
      <span class="left contents">
        책갈피
      </span>
      <span class="right">
        <span class="unique">[파이썬 완벽 뽀개기]</span>섹션명을 넣어주세요.
        감사합니다.
      </span>
    </div>
    <div class="row">
      <span class="left contents">
        타임라인
      </span>
      <BlueBtn>
        <button slot="blue_btn">01:11:11</button>
      </BlueBtn>
    </div>
    <div class="row">
      <span class="left contents">메모</span>
      <CkEditor></CkEditor>
    </div>

    <div class="row">
      <span class="left"></span>
      <button class="save_btn">등록</button>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import CkEditor from "@/components/common/CkEditor.vue";
  export default {
    components: {
      BlueBtn,
      CkEditor,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .bookmark_add {
    .row {
      display: table;
      width: 100%;
      margin-top: 2%;

      .left {
        font-size: 1.5rem;
        display: table-cell;
        width: 25.5%;
      }
      .right {
        @extend .left;
        width: 76.5%;
        .unique {
          color: #114fff;
        }
      }
      .blue_btn {
        width: 40%;
        button {
          line-height: 18px;
        }
      }
      .contents {
        vertical-align: top;
      }
      input {
        width: 100%;
        font-size: 1.5rem;
        color: black;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        padding: 2.403% 4%;
        box-sizing: border-box;
        &::placeholder {
          color: #dbdbdb;
        }
      }

      .save_btn {
        color: #ffffff;
        font-size: 1.75rem;
        background: #114fff;
        border-radius: 4px;
        width: 60%;
        padding: 1.5% 0;
        margin-top: 3%;
      }
    }
  }
</style>
