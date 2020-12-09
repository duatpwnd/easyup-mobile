<template>
  <div>
    <span
      class="tab"
      v-for="(tab, index) in types"
      :class="{ active: index == isActive }"
      :key="index"
      @click="toggle(tab.target, index)"
      ><span class="active_bar"></span>{{ tab.name }}</span
    >
    <Date></Date>
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script>
  import Tab1 from "@/components/SettlementAndPayment/Settlement.vue";
  import Tab2 from "@/components/SettlementAndPayment/Payment.vue";
  import Date from "@/components/common/DatePicker.vue";
  export default {
    components: { Tab1, Tab2, Date },
    data() {
      return {
        isActive: this.$route.query.type == "Tab1" ? 0 : 1,
        type: this.$route.query.type == "Tab1" ? Tab1 : Tab2,
        types: [
          { name: "정산", target: "Tab1" },
          { name: "결제", target: "Tab2" },
        ],
      };
    },
    methods: {
      toggle(type, index) {
        this.type = type;
        this.isActive = index;
        this.$router
          .push({
            query: {
              type: type,
            },
          })
          .catch(() => {});
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .tab {
    font-size: 2rem;
    font-weight: 600;
    width: 50%;
    display: inline-block;
    text-align: center;
    background: #f8f8f8;
    padding: 2% 0;
    position: relative;
    .active_bar {
      background: #f8f8f8;
      height: 4px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .active {
    background: #ffffff;
    .active_bar {
      background: #114fff;
    }
  }
</style>
