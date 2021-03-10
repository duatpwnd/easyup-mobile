<template>
  <div class="mask">
    <div class="lecture-info">
      <h2 class="title">
        <span v-if="$route.name == 'courseDetail'">코스</span
        ><span v-else>강의</span> 구매 신청
      </h2>
      <h3 class="lecture-title">{{ lecture_info.title }}</h3>
      <div class="row-wrap">
        <div class="row">
          <span class="dt" v-if="$route.name == 'courseDetail'">총 클래스</span
          ><span class="dt" v-else>수강 기간</span>
          <span class="dd" v-if="$route.name == 'courseDetail'">
            {{ lecture_info.course_list.length }}개
          </span>
          <span class="dd" v-else> {{ lecture_info.access_limit.basic }}</span>
        </div>
        <div class="row">
          <span class="dt">총 비용</span
          ><span class="dd total">{{ lecture_info.price.format_final }}원</span>
        </div>
      </div>
      <div class="btn-wrap">
        <BlueBtn>
          <button class="confirm-ok" slot="blue_btn" @click="confirmOk()">
            확인
          </button>
        </BlueBtn>
        <BlueBtn class="cancel">
          <button slot="blue_btn" @click="cancel()">취소</button>
        </BlueBtn>
      </div>
      <p class="notice-msg">
        *<span>{{ $route.meta.title }}</span> 구매 후 구매 취소 및 환불 정보는
        고객센터에 문의해주세요.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Prop, Component } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  @Component({
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirm_modal: "confirm_modal",
      }),
    },
  })
  export default class PurchaseApply extends Vue {
    @Prop({ required: true, type: Object }) private lecture_info!: Object;
    confirmOk() {
      this.$emit("goToOrder");
      this.cancel();
    }
    cancel() {
      this.$store.commit("toggleStore/Toggle", {
        purchase_apply: false,
      });
    }
  }
</script>
<style scoped lang="scss">
  .lecture-info {
    background: white;
    max-width: 720px;
    width: 80%;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 20px;
      text-align: center;
    }
    .lecture-title {
      color: #114fff;
      font-size: 16px;
      margin-top: 10px;
      border-bottom: 1px solid black;
      padding-bottom: 5px;
    }
    .row-wrap {
      .row {
        border-bottom: 1px solid black;
        padding: 5px 0;
        .dt,
        .dd {
          display: inline-block;
          font-size: 14px;
        }
        .dt {
          font-weight: bold;
          width: 30%;
        }
        .total {
          color: #114fff;
          font-weight: bold;
        }
      }
    }
    .btn-wrap {
      margin-top: 10px;
      .blue_btn {
        width: 50%;
        display: inline-block;
        .confirm-ok {
          width: 95%;
        }
      }
      .cancel {
        text-align: right;
        button {
          width: 95%;
          background: #ccc;
          border: 2px solid #ccc;
        }
      }
    }
    .notice-msg {
      letter-spacing: -1px;
      margin-top: 10px;
      color: #999999;
      font-size: 12px;
    }
  }
</style>
