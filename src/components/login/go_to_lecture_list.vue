<template>
  <div class="menu_modal">
    <h3 @click="back()"><button class="back"></button>이전 메뉴로 돌아가기</h3>
    <ul class="list">
      <li>
        <span
          @click="
            $router.push({
              path: '/category',
              query: {
                title: '전체',
                category_code: 'ALL',
                action: 'get_course_list',
                keyword: '',
                pageCurrent: 1,
                order: 'type_date',
              },
            });
            $store.commit('toggleStore/Toggle', {
              login_modal: false,
              mask: false,
            });
          "
          >전체보기</span
        >
      </li>
      <li v-for="(list, index) in category_list" :key="index">
        <span
          @click="
            $router.push({
              path: '/category',
              query: {
                title: list,
                category_code: index,
                action: 'get_course_list',
                keyword: '',
                pageCurrent: 1,
                order: 'type_date',
              },
            });
            $store.commit('toggleStore/Toggle', {
              login_modal: false,
              mask: false,
            });
          "
          >{{ list }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class LectureList extends Vue {
    category_list = "";
    async getCategoryList() {
      const data = {
        action: "get_category_list",
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.category_list = result.data.data;
        });
    }
    back(): void {
      this.$EventBus.$emit("LoginInfo", true);
      this.$EventBus.$emit("LoginForm", true);
    }
    created() {
      this.getCategoryList();
    }
  }
</script>
<style scoped lang="scss">
  .menu_modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 72.222%;
    height: 100%;
    box-sizing: border-box;
    background: #f8f8f8;
    h3 {
      font-size: 1.5rem;
      padding: 10px 0;
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
        span {
          font-size: 1.5rem;
          display: block;
          background: url("~@/assets/images/common/right_arrow.png") no-repeat
            right center / 7px 12.5px;
        }
      }
    }
  }
</style>
