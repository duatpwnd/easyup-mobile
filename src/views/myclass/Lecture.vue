<template>
  <div>
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="">전체</option>
          <option value="active" v-if="userStore_userinfo.info.status == 1"
            >활성</option
          >
          <option value="ing" v-if="userStore_userinfo.info.status == 1"
            >심사중</option
          >
          <option value="noiactive" v-if="userStore_userinfo.info.status == 1"
            >비활성</option
          >
          <option value="ing" v-if="userStore_userinfo.info.status == 5"
            >진행중</option
          >
          <option value="end" v-if="userStore_userinfo.info.status == 5"
            >비활성</option
          >
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
          <img
            :src="list.thumbnail"
            class="thumb"
            alt=""
            @click="
              $router.push({
                path: '/play',
                query: {
                  lp_id: list.lp_id,
                  course_id: list.id
                }
              })
            "
          />
          <img
            src="@/assets/images/common/playing_ico.png"
            class="playing_ico"
            @click="
              $router.push({
                path: '/play',
                query: {
                  lp_id: list.lp_id,
                  course_id: list.id
                }
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
            <span class="star_cell"> </span>
            <span class="num">{{ list.ranking }}</span>
          </div>
        </template>
        <template slot="list_info">
          <div class="statistics" v-if="userStore_userinfo.info.status == 1">
            <span class="date">{{ list.approve_date.split(" ")[0] }}</span>
            <span class="count">{{ list.count_users }}명</span>
            <span class="price">
              <del class="final_price">{{
                list.price.final
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</del>
              <span class="ori_price">{{
                list.price.original
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span>
            </span>
          </div>
          <div class="progress">
            <div class="compile_wrap">
              <span class="ing_ico" v-if="list.status == 'ing'">진행중</span>
              <ProgressBar
                v-if="userStore_userinfo.info.status == 5"
                :max="100"
                :value="Number(list.progress)"
              >
                <span class="percent" slot="percent_txt">{{
                  list.progress + "%"
                }}</span>
              </ProgressBar>
              <span class="ing_ico" v-else-if="list.approve_status == 'active'"
                >활성</span
              >
              <span
                class="ing_ico not_active_ico"
                v-else-if="list.approve_status == 'not active'"
                >비활성</span
              >
              <span
                class="ing_ico not_approved_ico"
                v-else-if="list.approve_status == 'not approved'"
                >심사중</span
              >
              <span
                class="ing_ico reject_ico"
                v-else-if="list.approve_status == 'reject'"
                >반려</span
              >
              <span>{{ list.expired_on }}</span>
              <router-link
                tag="span"
                :to="{
                  path: '/lecDetail',
                  query: {
                    id: list.id
                  }
                }"
                class="ing_ico review"
                v-if="list.show_btn_review"
                >리뷰관리</router-link
              >
              <span
                @click="lectureDelete(list.id)"
                class="ing_ico lecture_remove"
                v-if="list.show_btn_delete"
                >강의삭제</span
              >
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
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [mixin],
  components: {
    Pagination,
    ProgressBar,
    Search,
    LectureCourseList
  },
  computed: {
    ...mapState("userStore", {
      userStore_userinfo: "userinfo"
    })
  },
  data() {
    return {};
  },
  methods: {
    lectureDelete(id) {
      const obj = {
        action: "change_visibility",
        id: id,
        type: "course"
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
        .then(result => {
          console.log(result);
          this.getMyCourse(
            this.userStore_userinfo.info.status == 1
              ? "get_my_course_teacher"
              : "get_my_course",
            this.$route.query.pageCurrent,
            this.$route.query.order,
            this.$route.query.keyword
          );
        });
    }
  },
  created() {
    // 강사버전, 학생버전 분기처리
    this.getMyCourse(
      this.userStore_userinfo.info.status == 1
        ? "get_my_course_teacher"
        : "get_my_course",
      this.$route.query.pageCurrent,
      this.$route.query.order,
      this.$route.query.keyword
    );
  }
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
  .statistics {
    display: flex;
    .date {
      background: url("~@/assets/images/my_lecture_course/date_ico.png")
        no-repeat center left/ 18px 18px;
      // display: inline-block;
      width: 30%;
      padding-left: 6%;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 27px;
    }
    .count {
      background: url("~@/assets/images/my_lecture_course/person_count_ico.png")
        no-repeat center left/ 18px 18px;
      // display: inline-block;
      width: 25%;
      padding-left: 6%;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 27px;
    }
    .price {
      width: 50%;
      text-align: right;
      .final_price {
        font-size: 14px;
        color: #bdbdbd;
        margin-left: 4px;
      }
      .ori_price {
        font-weight: bold;
        margin-left: 5px;
        font-size: 18px;
        color: #114fff;
      }
    }
  }
}
</style>
