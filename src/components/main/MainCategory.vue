<template>
  <div id="category_lec">
    <h2>카테고리별 강의</h2>
    <p>관심 있는 분야의 강의를 한눈에 확인하세요</p>

    <div class="category_list">
      <router-link
        :to="{
          path: '/category',
          query: {
            title: '프로그래밍',
            category_code: 'PROGRAMMING',
            action: 'get_course_list',
            keyword: '',
            pageCurrent: 1,
            order: 'type_date',
          },
        }"
      >
        <img
          style="height:15px;"
          class="lec1_ico"
          src="@/assets/images/main/category_lec1_ico.png"
          alt="프로그래밍"
          title="프로그래밍"
        />
        <h3>프로그래밍</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '머신러닝/딥러닝',
            category_code: 'AI',
            action: 'get_course_list',
            keyword: '',
            pageCurrent: 1,
            order: 'type_date',
          },
        }"
      >
        <img
          style="height:16.5px;"
          class="lec2_ico"
          src="@/assets/images/main/category_lec2_ico.png"
          alt="머신러닝/딥러닝"
          title="머신러닝/딥러닝"
        />
        <h3>머신러닝/딥러닝</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '전산이론',
            category_code: 'BASIC',
            action: 'get_course_list',
            pageCurrent: 1,
            keyword: '',
            order: 'type_date',
          },
        }"
      >
        <img
          style="height:17px;"
          class="lec3_ico"
          src="@/assets/images/main/category_lec5_ico.png"
          alt="전산이론"
          title="전산이론"
        />
        <h3>전산이론</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '알고리즘',
            category_code: 'ALGORITHM',
            action: 'get_course_list',
            keyword: '',
            pageCurrent: 1,
            order: 'type_date',
          },
        }"
      >
        <img
          style="height:15px;"
          class="lec4_ico"
          src="@/assets/images/main/category_lec6_ico.png"
          alt="알고리즘"
          title="알고리즘"
        />
        <h3>알고리즘</h3>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
  };
</script>
<style scoped lang="scss">
  #category_lec {
    margin-top: 24px;
    h2 {
      font-size: 2rem;
      position: relative;
    }
    h3 {
      font-size: 10px;
      color: #333333;
      white-space: pre-wrap;
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      margin: auto;
      letter-spacing: -1px;
    }
    p {
      margin-top: 5px;
      font-size: 1.125rem;
      color: #999999;
    }
    .category_list {
      margin-top: 8px;

      a {
        border: 1px solid #666666;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        width: 23.17%;
        height: 60px;
        position: relative;
        box-sizing: border-box;
        &:not(:last-child) {
          margin-right: 2%;
        }

        img {
          position: absolute;
          width: unset;
          top: 15px;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }
</style>
