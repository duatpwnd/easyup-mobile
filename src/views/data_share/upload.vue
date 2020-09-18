<template>
  <div class="qna">
    <h2>업로드</h2>
    <div class="row">
      <label class="dt">강의선택</label>
      <select name="" id="">
        <option value="">선택</option>
      </select>
    </div>

    <div class="row">
      <label class="dt">파일첨부</label>
      <input type="file" id="upload" />
      <label for="upload" class="file">파일 선택</label>
    </div>
    <BlueBtn>
      <button slot="blue_btn">업로드</button>
    </BlueBtn>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common//blue_btn.vue";

  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {};
    },
    methods: {
      goToPath() {
        this.$router.push("/help/read");
      },
    },
  };
</script>
<style scoped lang="scss">
  .qna {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    .blue_btn {
      margin-top: 5%;
      width: calc(100% - 35%);
      float: right;
      ::v-deep button {
        width: 70%;
      }
    }
    .row {
      margin-top: 2%;
      select {
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        width: calc(100% - 35%);
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        padding: 1%;
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
          center;
      }

      .dt {
        width: 35%;
        display: inline-block;
        font-size: 1.5rem;
        font-family: "NotoSansCJKkr-Regular";
        .required {
          color: #114fff;
        }
      }
      input[type="file"] {
        display: none;
      }
      .file {
        width: auto;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 1.5rem;
        padding: 0.763% 5.946%;
      }
    }
  }
</style>
