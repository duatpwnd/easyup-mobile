<template>
  <div>
    <slot name="title"> </slot>
    <div class="row">
      <span class="left">강좌 선택</span>
      <select class="select" name="" id="">
        <option value="">전체</option>
      </select>
    </div>
    <div class="row">
      <span class="left">과제명</span>
      <input type="text" placeholder="30자 이내 작성해 주세요." />
    </div>
    <div class="row">
      <span class="left contents">내용</span>
      <CkEditor></CkEditor>
    </div>
    <div class="row">
      <span class="left"></span>
      <button class="save_btn">저장</button>
    </div>
  </div>
</template>
<script>
  import CkEditor from "@/components/common/ckeditor.vue";
  export default {
    components: {
      CkEditor,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .title {
    font-size: 2rem;
  }
  .row {
    display: table;
    width: 100%;
    margin-top: 2%;
    .select {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #dbdbdb;
      padding: 2.403% 4%;
      font-size: 1.5rem;
      background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
        center;
    }
    span {
      font-size: 1.5rem;
      display: table-cell;
      width: 25.5%;
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
</style>
