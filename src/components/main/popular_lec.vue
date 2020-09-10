<template>
  <div id="popular_lec">
    <h2 class="title">인기 강의</h2>
    <p>이지업의 가장 인기가 많은 강의를 확인해보세요</p>
    <div class="lec_list_wrap">
      <div class="li">
        <LecItem>
          <router-link class="lec_list" slot="router" to="/lecDetail">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link>
        </LecItem>
      </div>
      <div class="li">
        <LecItem>
          <router-link class="lec_list" slot="router" to="/lecDetail">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link>
        </LecItem>
      </div>
      <div class="li">
        <LecItem>
          <router-link class="lec_list" slot="router" to="/lecDetail">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link>
        </LecItem>
      </div>
      <div class="li">
        <LecItem>
          <router-link class="lec_list" slot="router" to="/lecDetail">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link>
        </LecItem>
      </div>
    </div>
  </div>
</template>
<script>
  import LecItem from "@/components/common/lecture_item.vue";
  export default {
    components: {
      LecItem,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style lang="scss" scoped>
  #popular_lec {
    padding: 4.445%;
    .title {
      font-size: 2rem;
    }

    p {
      margin-top: 2%;
      font-size: 1.125rem;
      color: #999999;
    }
    .lec_list_wrap {
      margin-top: 3%;
      &:after {
        display: block;
        clear: both;
        content: "";
      }
      .li {
        float: left;
        width: 48.782%;
        &:nth-child(odd) {
          margin-right: 2.436%;
        }
      }
    }
  }
</style>
