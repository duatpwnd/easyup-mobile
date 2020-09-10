<template>
  <div class="menu_modal">
    <h3 @click="back()">이전 메뉴로 돌아가기</h3>
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
      font-size: 1.5rem;
      color: #999999;
      text-align: center;
      font-weight: 500;
      padding: 1.5% 0;
    }
    .list {
      background: white;
      padding: 4.445%;

      li {
        &:not(:first-child) {
          margin-top: 2%;
        }
        a {
          font-size: 1.5rem;
          display: block;
          background: url("~@/assets/images/common/right_arrow.png") no-repeat
            right center / 3%;
        }
      }
    }
  }
</style>
