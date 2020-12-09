<template>
  <div class="box">
    <section>
      <date-picker
        ref="date_picker"
        v-model="value1"
        type="date"
        range
        :clearable="false"
        @focus="blur()"
        placeholder="날짜를 선택해주세요."
      ></date-picker>
    </section>
  </div>
</template>
<script>
  import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  import "vue2-datepicker/locale/ko";
  export default {
    components: { DatePicker },
    data() {
      return {
        date_change: "",
        value1: [],
        value2: [],
      };
    },
    methods: {
      // 모바일에서 키보드 안나오게
      blur() {
        this.$refs.date_picker.$refs.input.blur();
      },

      getToday() {
        const date = new Date();
        const year = date.getFullYear();
        let month = new String(date.getMonth());
        let day = new String(date.getDate());
        // 한자리수일 경우 0을 채워준다.
        if (month.length == 1) {
          month = "0" + month;
        }
        if (day.length == 1) {
          day = "0" + day;
        }
        this.value1.push(new Date(Number(year), Number(month), Number(day)));
        this.value1.push(new Date(Number(year), Number(month), Number(day)));
      },
    },
    mounted() {
      this.getToday();
    },
  };
</script>
<style scoped lang="scss">
  .box {
    border: 1px solid #707070;
    margin-top: 5px;
    ::v-deep .mx-datepicker {
      width: 100%;
      .mx-input-wrapper {
        input {
          padding: 0;
          height: 40px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          outline: none;
          width: 90%;
          box-sizing: border-box;
          border: 0;
          border-right: 1px solid #707070;
          border-radius: unset;
        }
        .mx-icon-calendar {
          right: 0;
          width: 10%;
          text-align: center;
        }
      }
    }
  }
</style>
