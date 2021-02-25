<template>
  <div>
    <div v-if="$route.name != 'uniJobRegister'">
      <router-link
        :class="[
          {
            'router-link-active': $route.query.type == 'resume',
          },
          'tab',
        ]"
        :to="{
          path: '/uniJob/resume',
          query: {
            pageCurrent: 1,
            keyword: '',
          },
        }"
        ><span class="active_bar"></span>이력서컨설팅
      </router-link>
      <router-link
        :class="[
          {
            'router-link-active': $route.query.type == 'jobmatching',
          },
          'tab',
        ]"
        :to="{
          path: '/uniJob/jobmatching',
          query: {
            pageCurrent: 1,
            keyword: '',
          },
        }"
        ><span class="active_bar"></span>협력기업채용</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component({})
  export default class Unijob extends Vue {}
</script>
<style scoped lang="scss">
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
</style>
