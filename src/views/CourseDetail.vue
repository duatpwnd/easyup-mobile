<template>
  <div id="lec_detail">
    <ThumbNail>
      <template slot="title_wrap">
        <h3 class="sub_title">프로그래밍</h3>
        <h2 class="title">파이썬 코딩 기본편 -6시간 뒤면 여러분도 개발자!</h2>
      </template>
    </ThumbNail>
    <Subscribe></Subscribe>
    <div class="course_info">
      <h2 class="course_list">
        코스 별 강좌 안내 <span class="all_lecture_num">총4강</span>
      </h2>
      <div class="ol_list">
        <h2 class="title">1강.</h2>
        <CourseIem></CourseIem>
        <div class="btn_wrap">
          <BlueBtn>
            <button slot="blue_btn">
              선행과정 필수
            </button>
          </BlueBtn>
          <BlueBtn class="right_btn">
            <button slot="blue_btn">
              강의정보 확인
            </button>
          </BlueBtn>
        </div>
      </div>
      <div class="ol_list">
        <h2 class="title">2강.</h2>
        <CourseIem></CourseIem>
        <div class="btn_wrap">
          <BlueBtn>
            <button slot="blue_btn">
              선행과정 필수
            </button>
          </BlueBtn>
          <BlueBtn class="right_btn">
            <button slot="blue_btn">
              강의정보 확인
            </button>
          </BlueBtn>
        </div>
      </div>
      <LecEval></LecEval>
    </div>
  </div>
</template>
<script>
  import Subscribe from "@/components/lecture_detail/subscribe";
  import ThumbNail from "@/components/lecture_detail/thumbnail";
  import LecEval from "@/components/lecture_detail/lec_evaluate";
  import CourseIem from "@/components/common/LectureItem.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  export default {
    components: {
      BlueBtn,
      Subscribe,
      CourseIem,
      LecEval,
      ThumbNail,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .course_info {
    padding: 4.445%;
    .course_list {
      font-size: 2rem;
      position: relative;
      .all_lecture_num {
        font-size: 10px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 15px;
        margin: auto;
      }
    }
    .ol_list {
      // width: 48.782%;
      margin-top: 5%;
      .title {
        font-size: 1.6875rem;
      }
      .item {
        ::v-deep .lec_list {
          img {
            width: 48.782%;
          }
        }
        ::v-deep .star {
          width: 3.7%;
        }
        ::v-deep .score {
          width: 7.3%;
        }
      }
      .btn_wrap {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
          float: left;
        }
        .right_btn {
          float: right;
          ::v-deep button {
            background: white;
            color: #114fff;
          }
        }
      }
    }
  }
</style>
