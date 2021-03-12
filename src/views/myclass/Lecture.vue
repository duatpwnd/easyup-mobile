<template>
  <div>
    <ConfirmModal
      @ok="lectureDelete()"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="">전체</option>
          <option value="active" v-if="$route.query.view == 'teacher'"
            >활성</option
          >
          <option value="ing" v-if="$route.query.view == 'teacher'"
            >심사중</option
          >
          <option value="noiactive" v-if="$route.query.view == 'teacher'"
            >비활성</option
          >
          <option value="ing" v-if="$route.query.view == 'student'"
            >진행중</option
          >
          <option value="end" v-if="$route.query.view == 'student'"
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
            v-if="list.status != 'end'"
            :src="list.thumbnail"
            class="thumb"
            :alt="list.title"
            :title="list.title"
            @click="
              if (list.approve_status != 'not approved') {
                $router.push({
                  path: '/play',
                  query: {
                    lp_id: list.lp_id,
                    course_id: list.id,
                  },
                });
              }
            "
          />
          <img v-else :src="list.thumbnail" class="thumb" alt="" />
          <img
            v-if="list.status != 'end' && list.approve_status != 'not approved'"
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
          <h2
            v-html="list.title"
            @click="
              $router.push({
                path: '/lecDetail',
                query: {
                  id: list.id,
                },
              })
            "
          ></h2>
          <div class="list_right_bottom">
            <span class="star_cell"> </span>
            <span class="num">{{ list.ranking }}</span>
          </div>
        </template>
        <template slot="list_info">
          <div class="statistics" v-if="$route.query.view == 'teacher'">
            <span class="date">{{ list.approve_date }}</span>
            <span class="count">{{ list.count_users }}명</span>
            <span class="price" v-if="list.price.is_free == false">
              <del
                class="ori_price"
                v-if="list.price.format_original != list.price.format_final"
                >{{ list.price.format_original }}</del
              >
              <span class="final_price">{{ list.price.format_final }}</span>
            </span>
            <span class="price" v-else>
              <span class="final_price">FREE</span>
            </span>
          </div>
          <div class="progress">
            <div class="compile_wrap">
              <span class="ing_ico" v-if="list.status == 'ing'">진행중</span>
              <span class="ing_ico" v-else-if="list.approve_status == 'active'"
                >활성</span
              >
              <span
                class="ing_ico not_active_ico"
                v-else-if="
                  list.approve_status == 'not active' || list.status == 'end'
                "
                >비활성</span
              >
              <span
                class="ing_ico not_approved_ico"
                v-else-if="list.approve_status == 'not approved'"
                >심사중</span
              >
              <span
                @click="rejectToggle(index)"
                class="ing_ico reject_ico"
                v-else-if="list.approve_status == 'reject'"
                >반려</span
              >

              <ProgressBar
                v-if="$route.query.view == 'student'"
                :max="100"
                :value="Number(list.progress)"
              >
                <span class="percent" slot="percent_txt">{{
                  list.progress + "%"
                }}</span>
              </ProgressBar>
              <span>{{ list.expired_on }}</span>
              <router-link
                tag="span"
                :to="{
                  path: '/lecDetail',
                  query: {
                    id: list.id,
                  },
                }"
                class="ing_ico review"
                v-if="list.show_btn_review"
                >리뷰관리</router-link
              >
              <!-- 학생버전 삭제 -->
              <span
                @click="confirm(list.code)"
                class="ing_ico lecture_remove lecture-remove-student"
                v-if="
                  list.status == 'end' ||
                    (list.price.is_free && $route.query.view == 'student')
                "
                >삭제</span
              >
              <!-- 강사버전 삭제 -->
              <span
                @click="confirm(list.id)"
                class="ing_ico lecture_remove"
                v-if="list.show_btn_delete"
                >삭제</span
              >
              <div
                class="reason"
                v-if="
                  list.approve_status == 'reject' &&
                    reason_tab.indexOf(index) >= 0
                "
                v-html="list.reject_reason"
              ></div>
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
                $route.query.view == 'teacher'
                  ? 'get_my_course_teacher'
                  : 'get_my_course',
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
                $route.query.view == 'teacher'
                  ? 'get_my_course_teacher'
                  : 'get_my_course',
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
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import mixin from "./mixin.js";
  import { mapState } from "vuex";
  export default {
    mixins: [mixin],
    components: {
      ConfirmModal,
      Pagination,
      ProgressBar,
      Search,
      LectureCourseList,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    data() {
      return {
        reason_tab: [], // 거절 사유 탭
        delete_id: "", // 강의 삭제 아이디
      };
    },
    methods: {
      rejectToggle(index) {
        const currentNum = this.reason_tab.indexOf(index);
        if (currentNum >= 0) {
          // 현재 배열안에있음
          this.reason_tab.splice(currentNum, 1);
        } else {
          this.reason_tab.push(index);
        }
      },
      confirm(id) {
        this.delete_id = id;
        this.$confirmMessage("삭제하시겠습니까?");
      },
      // 강사 버전
      lectureDelete() {
        let obj;
        if (this.$route.query.view == "teacher") {
          // 강사
          obj = {
            action: "change_visibility",
            id: this.delete_id,
            type: "course",
          };
        } else {
          // 학생
          obj = {
            action: "delete_myclass_item",
            code: this.delete_id,
            type: "course",
          };
        }
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
          .then((result) => {
            console.log(result);
            this.getMyCourse(
              this.$route.query.view == "teacher"
                ? "get_my_course_teacher"
                : "get_my_course",
              this.$route.query.pageCurrent,
              this.$route.query.order,
              this.$route.query.keyword
            );
          });
      },
    },
    created() {
      // 강사버전, 학생버전 분기처리
      this.getMyCourse(
        this.$route.query.view == "teacher"
          ? "get_my_course_teacher"
          : "get_my_course",
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
        font-weight: bold;
        .final_price {
          margin-left: 5px;
          font-size: 18px;
          color: #114fff;
        }
        .ori_price {
          font-size: 14px;
          color: #bdbdbd;
        }
      }
    }
  }
</style>
