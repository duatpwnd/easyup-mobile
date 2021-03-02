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
    <h2 class="supply_number">고객지원 Support@easyupclass.com</h2>
  </footer>
</template>
<script lang="ts"></script>
<style scoped lang="scss">
  footer {
    padding: 14px;
    background: #333333;
    position: absolute;
    bottom: -145px;
    max-width: 720px;
    width: 100%;
    box-sizing: border-box;

    h1 {
      color: #dadada;
      font-size: 15px;
      font-weight: bold;
    }
    .gnb {
      margin: 3px 0;
      font-size: 12px;
      a {
        color: #7a7a7a;
      }
      .bar {
        color: #7a7a7a;
        margin: 0 15px;
      }
    }

    address {
      font-style: normal;
      color: #7a7a7a;
      pre {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 11px;
      }
    }
    .supply_number {
      color: #7a7a7a;
      font-size: 14px;
    }
  }
</style>
