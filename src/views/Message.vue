<template>
  <div class="message_view">
    <div v-if="$route.name != 'newMessage' && $route.name != 'msgRead'">
      <router-link
        class="tab"
        :to="{
          path: '/msg/receivedList',
          query: {
            pageCurrent: 1,
            keyword: '',
            view: $route.query.view,
          },
        }"
        ><span class="active_bar"></span>수신
      </router-link>
      <router-link
        :class="[
          {
            'router-link-active': $route.path.indexOf('/msg/read') >= 0,
          },
          'tab',
        ]"
        :to="{
          path: '/msg/sentList',
          query: {
            pageCurrent: 1,
            keyword: '',
            view: $route.query.view,
          },
        }"
        ><span class="active_bar"></span>발신</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  export default class Msg extends Vue {}
</script>
<style scoped lang="scss">
  .message_view {
    padding-bottom: 65px;
    .tab {
      font-size: 2rem;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
      position: relative;
      .active_bar {
        background: #f8f8f8;
        height: 4px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
      }
    }
    .router-link-active {
      color: black;
      background: #ffffff;
      .active_bar {
        background: #114fff;
      }
    }
  }
</style>
