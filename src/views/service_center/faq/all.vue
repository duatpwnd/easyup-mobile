<template>
  <div>
    <h2>총<span class="num">9</span>건</h2>
    <dl class="item_wrap">
      <dt>
        <img
          src="@/assets/images/common/question_ico.png"
          alt="질문"
          title="질문"
          class="que_ico"
        />
        [회훤정보] 회원 가입 시 반드시 이메일 주소로 가입해야 하나요?
      </dt>
      <dd>
        A. 회원의 고유 정보 확인은 물론 별도의 이메일 정보를 중복 등록하지
        않아도 되기에 이메일 주소를 사용하여 가입해주세요.
      </dd>
    </dl>
  </div>
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
  .item_wrap {
    dt {
      color: #333333;
      font-size: 1.375rem;
      font-family: "NotoSansCJKkr-Regular";
      font-weight: 600;
      margin-top: 4%;
      .que_ico {
        width: 5.2%;
      }
    }
    dd {
      margin-top: 2%;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
      font-size: 1.25rem;
      background: #f8f8f8;
      padding: 1.5%;
      border-radius: 5px;
    }
  }
</style>
