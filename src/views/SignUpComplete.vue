<template>
  <div class="complete_msg">
    <h2 class="big_title">회원 가입 완료</h2>
    <div class="row2">
      <h2><span class="name">윤계상</span> 님,</h2>
      <h2>회원 가입이 정상적으로 완료되었습니다.</h2>
    </div>
    <p class="row3">
      회원님의 무한한 가능성을 한층 업그레이드할 수 있도록 최선을 다하겠습니다.
      지금 바로 EASYUP 강좌를 시작해보세요!
    </p>
    <BlueBtn>
      <button slot="blue_btn">로그인 하기</button>
    </BlueBtn>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";

  export default {
    components: { BlueBtn },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .complete_msg {
    text-align: center;
    padding: 8%;
    padding-top: 4.445%;
    .big_title {
      font-size: 2rem;
    }
    .name {
      color: #114fff;
    }
    .row2 {
      margin: 3% 0;
      margin-top: 5%;
    }
    .row3 {
      margin-bottom: 5%;
      font-family: "NotoSansCJKkr-Regular";
      font-size: 1.5rem;
    }
    .blue_btn {
      ::v-deep button {
        width: 70%;
      }
    }
  }
</style>
