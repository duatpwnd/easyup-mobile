<template>
  <div>
    <dl class="item_wrap">
      <dt>
        <img
          src="@/assets/images/common/question_ico.png"
          alt="질문"
          title="질문"
          class="que_ico"
        />
        <slot name="category"> <span> </span></slot>
      </dt>
      <slot name="dd">
        <dd>ddd</dd>
      </slot>
    </dl>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
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
  .active {
    display: block;
  }
}
</style>
