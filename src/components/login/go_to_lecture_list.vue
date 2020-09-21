<template>
  <div class="menu_modal">
    <h3 @click="back()"><button class="back"></button>이전 메뉴로 돌아가기</h3>
    <ul class="list">
      <li>
        <router-link to="/">강의명</router-link>
      </li>
      <li>
        <router-link to="/">강의명</router-link>
      </li>
      <li>
        <router-link to="/">강의명</router-link>
      </li>
      <li>
        <router-link to="/">강의명</router-link>
      </li>
      <li>
        <router-link to="/">강의명</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      back() {
        this.$EventBus.$emit("LoginProfile", true);
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .menu_modal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 72.222%;
    box-sizing: border-box;
    background: #f8f8f8;
    h3 {
      font-size: 12px;
      color: #999999;
      text-align: center;
      font-weight: 500;
      height: 32px;
      line-height: 32px;
      .back {
        width: 7px;
        height: 100%;
        margin-right: 12px;
        background: url("~@/assets/images/common/left_arrow.png") no-repeat
          center 8px / 7px 12.5px;
        vertical-align: middle;
        line-height: 0;
      }
    }

    .list {
      background: white;
      padding: 4.445%;

      li {
        &:not(:first-child) {
          margin-top: 10px;
        }
        a {
          font-size: 12px;
          display: block;
          background: url("~@/assets/images/common/right_arrow.png") no-repeat
            right center / 7px 12.5px;
        }
      }
    }
  }
</style>
