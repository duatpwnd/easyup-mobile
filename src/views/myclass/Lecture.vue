<template>
  <div>
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="">전체</option>
          <option value="ing">진행중</option>
          <option value="end">비활성</option>
        </select>
        <input
          slot="slot_input"
          class="search_contents"
          placeholder="강의명을 검색하세요."
          :value="keyword"
          v-on:input="keyword = $event.target.value"
        />
        <button
          slot="search_btn"
          class="search_btn"
          @click="getMyCourse('get_my_course', 1, order, keyword)"
        ></button>
      </Search>
    </div>

    <div class="section" v-if="lec_course_list.list">
      <p class="no_result" v-if="lec_course_list.list.length == 0">
        진행중인 강의가 없습니다.
      </p>
      <LectureCourseList
        v-else
        v-for="(list, index) in lec_course_list.list"
        :key="index"
      >
        <template slot="thumbnail">
          <img :src="list.thumbnail" class="thumb" alt="" />
          <img
            src="@/assets/images/common/playing_ico.png"
            class="playing_ico"
            @click="
              $router.push({
                path: '/play',
                query: {
                  lp_id: list.lp_id,
                  course_id: list.id,
                },
              })
            "
          />
        </template>
        <template slot="info">
          <span class="name">{{ list.teacher }}</span>
          <h2>
            {{ list.title }}
          </h2>
          <div class="list_right_bottom">
            <span class="ing_ico" v-if="list.status == 'ing'">진행중</span>
            <span class="ing_ico non_ing_ico" v-else>비활성</span>
            <span class="star_cell"> </span>
            <span class="num">{{ list.ranking }}</span>
          </div>
        </template>
        <template slot="list_info">
          <div class="progress">
            <div class="compile_wrap">
              <span class="rate">진도율</span>
              <ProgressBar :max="100" :value="Number(list.progress)">
                <span class="percent" slot="percent_txt">{{
                  list.progress + "%"
                }}</span>
              </ProgressBar>
              <span>{{ list.expired_on }}</span>
              <!-- <span class="btn">편집</span> -->
              <!-- <span class="date">2020.06.20</span> -->
            </div>
          </div>
        </template>
      </LectureCourseList>
      <Pagination>
        <template slot="paging">
          <li
            class="prev"
            @click="
              getMyCourse(
                'get_my_course',
                Number(current) - 1,
                order,
                $route.query.keyword
              )
            "
            v-if="current > 1"
          >
            이전페이지
          </li>
          <li
            class="next"
            v-if="
              lec_course_list.total_page != current &&
                lec_course_list.total_page > 1
            "
            @click="
              getMyCourse(
                'get_my_course',
                Number(current) + 1,
                order,
                $route.query.keyword
              )
            "
          >
            다음페이지
          </li>
        </template>
      </Pagination>
    </div>
  </div>
</template>
<script>
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import Search from "@/components/common/Search.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import mixin from "./mixin.js";
  export default {
    mixins: [mixin],
    components: {
      Pagination,
      ProgressBar,
      Search,
      LectureCourseList,
    },
    data() {
      return {};
    },
    methods: {},
    created() {
      this.getMyCourse(
        "get_my_course",
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
    padding-top: 0;
  }
  .section {
    margin-top: 15px;
    .list_wrap {
      &:not(:first-child) {
        margin-top: 15px;
      }
    }
    ::v-deep .progress_bar {
      border: 1px solid #cacaca;
    }
    .no_result {
      text-align: center;
      font-size: 16px;
      padding-bottom: 15px;
    }
  }
</style>
