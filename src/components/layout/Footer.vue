<template>
  <footer>
    <h1>EASYUP</h1>
    <div class="gnb">
      <router-link
        :to="{
          name: 'policy',
          query: {
            action: 'Terms',
            active: 0,
          },
        }"
        ><span>이용약관</span></router-link
      >
      <span class="bar">|</span>
      <router-link
        :to="{
          name: 'policy',
          query: {
            action: 'Privacy',
            active: 1,
          },
        }"
        ><span>개인정보취급방침</span></router-link
      >
      <span class="bar">|</span>
      <router-link
        :to="{
          path: '/help/notice',
          query: {
            pageCurrent: 1,
            keyword: '',
          },
        }"
        ><span>고객센터</span></router-link
      >
    </div>
    <address>
      <pre>(주)유니윌<br />대표이사:조인형   주소:서울시 강남구 테헤란로124<br />사업자 등록번호:220-86-20171    통신판매업신고:강남 제3339호</pre>
    </address>
  </footer>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  footer {
    padding: 4.445%;
    background: #333333;
    h1 {
      color: #dadada;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .gnb {
      margin: 10px 0;
      span {
        color: #7a7a7a;
        font-size: 1.125rem;
      }
      .bar {
        margin: 0 15px;
      }
    }

    address {
      font-style: normal;
      color: #7a7a7a;
      pre {
        font-family: "NotoSansCJKkr-Regular";
        line-height: 162%;
        font-size: 1rem;
      }
    }
  }
</style>
