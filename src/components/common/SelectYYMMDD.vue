<template>
  <div class="select-wrap">
    <select
      class="select"
      ref="select_year"
      v-model="birthYear"
      @change="lastDay"
    >
      <option value="null">년</option>
    </select>
    <select
      class="select"
      ref="select_month"
      v-model="birthMonth"
      @change="lastDay"
    >
      <option value="null">월</option>
    </select>
    <select
      class="select"
      ref="select_day"
      v-model="birthDays"
      @change="birthDaySet"
    >
      <option value="null">일</option>
    </select>
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  @Component
  export default class YYMMDD extends Vue {
    @Prop(String) private birthday!: String;
    $refs!: {
      select_year: HTMLSelectElement;
      select_month: HTMLSelectElement;
      select_day: HTMLSelectElement;
    };
    private birthYear: string | null = null;
    private birthMonth: string | null = null;
    private birthDays: string | null = null;
    private start_year = 1900;
    private today_year = new Date().getFullYear();
    private index = 1;
    private birthDaySet(): void {
      this.$emit("birthday", {
        birthYear: this.birthYear,
        birthMonth: this.birthMonth,
        birthDays: this.birthDays,
      });
    }
    private lastDay(): void {
      const Year = (this.birthYear as unknown) as number;
      const Month = (this.birthMonth as unknown) as number;
      const Day = new Date(
        new Date(Year, Month, 1).getTime() - 86400000
      ).getDate();
      const dayindex_len = this.$refs.select_day.length;
      if (Day > dayindex_len) {
        for (let i = dayindex_len + 1; i <= Day; i++) {
          this.$refs.select_day.options[i - 1] = new Option(
            (i as unknown) as string,
            (i as unknown) as string
          );
        }
      } else if (Day < dayindex_len) {
        for (let i = dayindex_len; i >= Day; i--) {
          this.$refs.select_day.remove(i);
        }
      }
    }
    private dateSet(): void {
      for (let y = this.start_year; y <= this.today_year; y++) {
        this.$refs.select_year.options[this.index] = new Option(
          (y as unknown) as string,
          (y as unknown) as string
        );
        this.index++;
      }
      this.index = 1;
      for (let m = 1; m <= 12; m++) {
        this.$refs.select_month.options[this.index] = new Option(
          (m as unknown) as string,
          (m as unknown) as string
        );
        this.index++;
      }
      this.lastDay();
    }
    mounted() {
      if (this.birthday != null) {
        console.log(this.birthday, "아니다");
        const birth = this.birthday.split("-");
        this.birthYear = birth[0];
        this.birthMonth = (parseFloat(birth[1]) as unknown) as string;
        this.birthDays = (parseFloat(birth[2]) as unknown) as string;
        this.birthDaySet();
      }
      this.dateSet();
    }
  }
</script>
<style scoped lang="scss">
  .select {
    border: 1px solid #ccc;
    padding: 5px 6px;
    height: 32px;
    line-height: 13px;
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    font-family: "NotoSansCJKkr-Regular";
    font-size: 14px;
    color: #333333;
    background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 92%
      center / 7px 5px;
  }
</style>
