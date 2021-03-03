<template>
  <div id="category_lec">
    <div class="category_list">
      <router-link
        :to="{
          path: '/category',
          query: {
            title: '코딩베이비',
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
          src="@/assets/images/main/main_category_ico1.png"
          alt="코딩베이비"
          title="코딩베이비"
        />
        <h3>코딩베이비</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '코딩언어',
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
          src="@/assets/images/main/main_category_ico2.png"
          alt="코딩언어"
          title="코딩언어"
        />
        <h3>코딩언어</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '웹',
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
          src="@/assets/images/main/main_category_ico3.png"
          alt="웹"
          title="웹"
        />
        <h3>웹</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '모바일·게임',
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
          src="@/assets/images/main/main_category_ico4.png"
          alt="모바일·게임"
          title="모바일·게임"
        />
        <h3>모바일·게임</h3>
      </router-link>
    </div>
    <div class="category_list">
      <router-link
        :to="{
          path: '/category',
          query: {
            title: '데이터·AI',
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
          src="@/assets/images/main/main_category_ico5.png"
          alt="데이터·AI"
          title="데이터·AI"
        />
        <h3>데이터·AI</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '정보보안',
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
          src="@/assets/images/main/main_category_ico6.png"
          alt="정보보안"
          title="정보보안"
        />
        <h3>정보보안</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '기초학세미나',
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
          src="@/assets/images/main/main_category_ico7.png"
          alt="기초학세미나"
          title="기초학세미나"
        />
        <h3>기초학세미나</h3>
      </router-link>

      <router-link
        :to="{
          path: '/category',
          query: {
            title: '커리어부스터',
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
          src="@/assets/images/main/main_category_ico8.png"
          alt="커리어부스터"
          title="커리어부스터"
        />
        <h3>커리어부스터</h3>
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
        width: 25%;
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
</style>
