<template>
  <div class="box">
    <section>
      <date-picker
        ref="date_picker"
        v-model="value1"
        type="date"
        range
        :clearable="false"
        @change="set()"
        @focus="blur()"
        placeholder="날짜를 선택해주세요."
      ></date-picker>
    </section>
  </div>
</template>
<script>
  import "vue2-datepicker/index.css";
  import "vue2-datepicker/locale/ko";
  import DatePicker from "vue2-datepicker";
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
      set() {
        this.$emit("emitDatePick", this.value1);
      },
      // 모바일에서 키보드 안나오게
      blur() {
        this.$refs.date_picker.$refs.input.blur();
      },

      getToday() {
        let s_date = "";
        let e_date = "";
        this.value1 = [];
        this.value2 = [];
        if (this.$route.query.start_date == undefined) {
          s_date = this.$dateFormat().split("-");
          this.value1.push(
            new Date(
              Number(s_date[0]),
              Number(s_date[1] - 1),
              Number(s_date[2])
            )
          );
          this.value1.push(
            new Date(
              Number(s_date[0]),
              Number(s_date[1] - 1),
              Number(s_date[2])
            )
          );
        } else {
          s_date = this.$route.query.start_date.split("-");
          e_date = this.$route.query.end_date.split("-");
          this.value1.push(
            new Date(
              Number(s_date[0]),
              Number(s_date[1] - 1),
              Number(s_date[2])
            )
          );
          this.value1.push(
            new Date(
              Number(e_date[0]),
              Number(e_date[1] - 1),
              Number(e_date[2])
            )
          );
        }
      },
    },
    watch: {
      $route(to, from) {
        if (to.path != from.path) {
          this.getToday();
          console.log(to.path, from.path);
        }
      },
    },
    mounted() {
      this.getToday();
      // this.set();
    },
  };
</script>
<style scoped lang="scss">
  .box {
    border: 1px solid #707070;

    ::v-deep .mx-datepicker {
      width: 100%;
      .mx-input-wrapper {
        .mx-input {
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
