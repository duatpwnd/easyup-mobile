<template>
  <footer>
    <h1>EASYUP</h1>
    <div class="lnb">
      <span>이용약관</span>
      <span class="bar">|</span>
      <span>개인정보취급방침</span>
      <span class="bar">|</span>
      <span>고객센터</span>
    </div>
    <address>
      (주)유니윌<br />
      대표이사:조인형 주소:서울시 강남구 테헤란로124<br />
      사업자 등록번호:220-86-20171 통신판매업신고:강남 제3339호
    </address>
    <h1 class="client_support">고객지원 1600-1111</h1>
    <span>영업시간 09:00 ~ 18:00 토,일 및 공휴일 휴무</span>
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
    .lnb {
      margin: 10px 0;
      span {
        color: #7a7a7a;
      }
    }
    .bar {
      margin: 0 15px;
    }
    address {
      font-style: normal;
      color: #7a7a7a;
    }
    .client_support {
      margin-top: 15px;
    }
    span {
      color: #7a7a7a;
    }
  }
</style>
