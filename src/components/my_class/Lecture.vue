<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="강의명을 입력하세요"
        />
      </Search>
    </div>
    <div class="section">
      <LectureCourseList></LectureCourseList>
    </div>
    <div class="section2">
      <div class="compile_wrap">
        <span class="rate">진도율</span>
        <span class="progress">
          <span class="percent">60%</span>
          <span class="progress_bar"></span>
        </span>
        <span>6일 남음</span>
        <!-- <span class="btn">편집</span> -->
        <span class="date">2020.06.20</span>
      </div>
    </div>
    <div class="section section3">
      <LectureCourseList
        v-for="(list, index) in lec_course_list.list"
        :key="index"
      >
        <template slot="thumbnail">
          <img :src="list.thumbnail" class="thumb" alt="" />
          <img
            src="@/assets/images/common/playing_ico.png"
            class="playing_ico"
            alt=""
          />
        </template>
        <template slot="info">
          <span class="name">{{ list.teacher }}</span>
          <h2>
            {{ list.title }}
          </h2>
          <div class="list_right_bottom">
            <span class="ing_ico">진행중</span>
            <span class="star_cell"> </span>
            <span class="num">{{ list.ranking }}</span>
          </div>
        </template>
      </LectureCourseList>
    </div>
  </div>
</template>
<script>
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import Search from "@/components/common/Search.vue";
  export default {
    components: {
      Search,
      LectureCourseList,
    },
    data() {
      return {
        lec_course_list: "",
      };
    },
    methods: {
      getMyCourse(num, order, keyword) {
        const data = {
          action: "get_my_course",
          current: num == undefined ? 1 : num,
          search_status: order == undefined ? "all" : order,
          keyword: keyword == undefined ? "" : keyword,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            this.lec_course_list = result.data.data;
            // this.$router
            //   .push({
            //     query: {
            //       action: this.$route.query.action,
            //       pageCurrent: num,
            //       order: order,
            //       keyword: keyword,

            //       category_code: this.$route.query.category_code,
            //       tag: this.$route.query.tag,
            //     },
            //   })
            //   .catch(() => {});
            // this.order = order;
            // this.keyword = keyword;
            // this.current = num;
          });
      },
    },
    created() {
      this.getMyCourse(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .section,
  .search_area {
    padding: 4.445%;
    padding-bottom: 0;
  }
  .section2 {
    padding-top: 0;
    padding-bottom: 0;
    margin: 2% 0;
    .compile_wrap {
      padding: 0 4.445%;
      position: relative;
      background: #f8f8f8;
      box-sizing: border-box;
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 10px;
      }
      .progress {
        box-sizing: border-box;
        height: 20px;
        position: relative;
        width: 26.4%;
        line-height: 20px;
        border: 1px solid #cacaca;
        border-radius: 5px;
        margin: 4px 10px;
        overflow: hidden;
        .percent {
          font-size: 9px;
          position: absolute;
          width: 100%;
          color: #757575;
          text-align: center;
        }
        .progress_bar {
          height: 20px;
          background: #ecedee;
          width: 60%;
          vertical-align: unset;
        }
      }

      .date {
        color: #999999;
        font-size: 10px;
        position: absolute;
        top: 0;
        right: 4.445%;
        color: #999999;
        font-size: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 4.445%;
        height: 15px;
        margin: auto;
      }
    }
  }
  .section3 {
    padding-top: 0;
    padding-bottom: 20%;
    .list_wrap {
      margin-top: 10px;
    }
  }
</style>
