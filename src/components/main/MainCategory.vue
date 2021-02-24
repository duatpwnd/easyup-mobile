<template>
  <div id="category_lec">
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
          class="lec1_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec2_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec3_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec4_ico"
          src="@/assets/images/main/test_ico.png"
          alt="알고리즘"
          title="알고리즘"
        />
        <h3>알고리즘</h3>
      </router-link>
    </div>
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
          class="lec1_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec2_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec3_ico"
          src="@/assets/images/main/test_ico.png"
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
          class="lec4_ico"
          src="@/assets/images/main/test_ico.png"
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
    padding: 40px 0;
    h3 {
      font-size: 12px;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .category_list {
      &:last-child {
        padding-top: 25px;
      }
      a {
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        width: 23.5%;
        position: relative;
        box-sizing: border-box;
        &:not(:last-child) {
          margin-right: 2%;
        }

        img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
</style>
