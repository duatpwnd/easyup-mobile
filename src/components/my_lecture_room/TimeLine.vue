<template>
  <section class="timeLine">
    <h2 class="title">타임라인</h2>
    <Slide :swiper_option="slide_option.timeline">
      <swiper-slide
        slot="list"
        v-for="(list, index) in timeline_list.list"
        :key="index"
        ><h2>{{ list.login_date }}</h2>
        <img :src="list.course_image"/>
        <p class="timeline_txt" v-html="list.showTxt"></p></swiper-slide
    ></Slide>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getDashboardTimeline(Number(current) - 1)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="
            timeline_list.total_page != current && timeline_list.total_page > 1
          "
          @click="getDashboardTimeline(Number(current) + 1)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </section>
</template>
<script>
  import Pagination from "@/components/common/Pagination.vue";

  import Slide from "@/components/common/Slide.vue";
  export default {
    components: {
      Pagination,

      Slide,
    },
    data() {
      return {
        slide_option: {
          timeline: {
            pagination: {
              el: ".swiper-pagination",
            },
          },
        },
        timeline_list: "",
        current: "", //현재번호
      };
    },

    methods: {
      getDashboardTimeline(num) {
        const obj = {
          action: "get_dashboard_timeline",
          current: num,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(obj))
          .then((result) => {
            this.timeline_list = result.data.data;
            this.current = num;
          });
      },
    },
    created() {
      this.getDashboardTimeline(1);
    },
  };
</script>
<style scoped lang="scss">
  .timeLine {
    margin-top: 20px;
    .title {
      font-size: 2rem;
    }
    .timeline_txt {
      font-size: 15px;
      margin-top: 5px;
    }
    .table {
      display: table;
      width: 100%;
      margin-top: 1%;
      .td {
        display: table-cell;
        font-size: 1.5rem;
        color: #666666;
      }
      .td1 {
        width: 70%;
      }
      .td2 {
        width: 30%;
        font-weight: bold;
        text-align: right;
        color: #333333;
      }
    }
  }
</style>
