<template>
  <form name="authFrmFrame" method="post" action="./kspay_wh_result.php">
    <select name="sndPaymethod" v-model="value">
      <option value="1000000000">카드결제(간편결제)</option>
      <option value="0100000000">무통장 입금</option>
      <option value="0000010000">휴대폰 결제</option>
    </select>
    <!-- 상점아이디 -->
    <input
      type="text"
      name="sndStoreid"
      size="10"
      maxlength="10"
      :value="sndStoreid"
    />
    <!-- 화폐단위 -->
    <input
      type="text"
      name="sndCurrencytype"
      size="30"
      maxlength="3"
      value="WON"
    />
    <!-- 주문번호 -->
    <input
      type="text"
      name="sndOrdernumber"
      size="30"
      maxlength="30"
      :value="info.order_id"
    />
    <!-- 주민번호 필수아님-->
    <input type="text" name="sndAllregid" size="30" maxlength="13" value="" />
    <!-- 할부개월수 -->
    <input
      type="text"
      name="sndInstallmenttype"
      size="30"
      maxlength="30"
      value="0:2:3:4:5:6:7:8:9:10:11:12"
    />
    <!-- 무이자 구분 -->
    <input
      type="text"
      name="sndInteresttype"
      size="30"
      maxlength="30"
      value="NONE"
    />
    <!-- 신용카드 표시 구분 -->
    <input type="text" name="sndShowcard" size="30" maxlength="30" value="C" />
    <!-- 상품명 -->
    <input
      type="text"
      name="sndGoodname"
      size="30"
      maxlength="30"
      :value="info.info.big_title"
    />
    <!-- 가격 -->
    <input
      type="text"
      name="sndAmount"
      size="30"
      maxlength="9"
      :value="info.info.calculate_price_info.sum_final"
    />
    <!-- 성명 -->
    <input
      type="text"
      name="sndOrdername"
      size="30"
      maxlength="20"
      :value="userStore_info.info.username"
    />
    <!-- 전자우편 -->
    <input
      type="text"
      name="sndEmail"
      size="30"
      maxlength="50"
      :value="userStore_info.info.email"
    />
    <!-- 이동전화 -->
    <input
      type="text"
      name="sndMobile"
      size="30"
      maxlength="12"
      :value="userStore_info.info.phone"
    />
    <!--  가맹점 CharSet 설정변수 -->
    <input type="hidden" name="sndCharSet" value="utf-8" />
    <input type="hidden" name="sndReply" value="" />
    <!--에스크로적용여부-- 0: 적용안함, 1: 적용함 -->
    <input type="hidden" name="sndEscrow" value="0" />
    <!-- 마감일시 -->
    <input type="hidden" name="sndVirExpDt" :value="sndVirExpDt" />
    <!-- 마감시간 -->
    <input type="hidden" name="sndVirExpTm" value="000000" />
    <!--회사명을 한글로 넣어주세요(최대20byte)-->
    <input type="hidden" name="sndStoreName" value="유니윌" />
    <!--회사명을 영어로 넣어주세요(최대20byte)-->
    <input type="hidden" name="sndStoreNameEng" value="uniwill" />
    <!-- 회사 도메인을 http://를 포함해서 넣어주세요-->
    <input type="hidden" name="sndStoreDomain" value="http://uniwill.co.kr/" />
    <!--실물(1) / 디지털(2) -->
    <input type="hidden" name="sndGoodType" value="2" />
    <!-- 포인트거래시 60 -->
    <input type="hidden" name="sndUseBonusPoint" value="" />
    <!-- 하이브리드APP 형태로 개발시 사용하는 변수 -->
    <input type="hidden" name="sndRtApp" value="" />
    <!--  카카오페이용 상점대표자명 -->
    <input type="hidden" name="sndStoreCeoName" value="조인형" />
    <!--  카카오페이 연락처 -->
    <input type="hidden" name="sndStorePhoneNo" value="0262558002" />
    <!--  카카오페이 주소 -->
    <input
      type="hidden"
      name="sndStoreAddress"
      value="서울시 강남구 테헤란로 124"
    />
    <!-- DB저장용 상품명 -->
    <!-- <input type="hidden" name="ECHA" :value="info.info.big_title_no_cut" /> -->
    <!-- 결과페이지 DB저장 시 필요 -->
    <input type="hidden" name="ECHB" :value="info.info.string" />
    <input type="hidden" name="ECHC" :value="info.user_info_string" />
    <input
      type="hidden"
      name="ECHD"
      :value="info.info.calculate_price_info.sum_final"
    />
    <input
      type="hidden"
      name="sum_original"
      :value="info.info.calculate_price_info.sum_original"
    />
    <input
      type="hidden"
      name="sum_discount"
      :value="info.info.calculate_price_info.sum_discount"
    />
    <input
      type="hidden"
      name="purchased_price"
      :value="info.info.calculate_price_info.purchased_price"
    />
  </form>
</template>
<script lang="ts">
  import { Vue, Prop, Component } from "vue-property-decorator";
  import { mapState } from "vuex";
  @Component({
    computed: {
      ...mapState("userStore", {
        userStore_info: "userinfo",
      }),
    },
  })
  export default class OrderForm extends Vue {
    $dateFormat!: Function;
    sndStoreid =
      process.env.NODE_ENV == "production" ? "2001106668" : "2999199999";
    sndVirExpDt!: String; //yyyymmdd
    // 결제수단
    @Prop(String) private value!: String;
    // 결제정보
    @Prop(Object) private info!: Object;
    created() {
      const date = new Date();
      const later3Day = new Date(date.setDate(date.getDate() + 3));
      const result = this.$dateFormat(later3Day).split("-");
      this.sndVirExpDt = result[0] + result[1] + result[2];
    }
  }
</script>
<style scoped lang="scss"></style>
