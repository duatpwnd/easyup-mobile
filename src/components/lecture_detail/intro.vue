<template>
  <div id="intro">
    <h2 class="title">이 강의는</h2>
    <p>
      파이썬은 문법 구조가 쉽기 때문에 프로그래밍을 처음 접하는 초보자 도 쉽게
      이해할 수 있습니다. 파이썬은 그 어떤 프로그래밍 언어보다 확 장성이 월등히
      높은 언어지요. 데이터분석가도, 웹개발자도, 머신러닝 연구자도, 대학원생도
      파이썬을 사용합니다. 당신이 어떤업무를 맡더 라도 파이썬만 알아두면 척척
      대응하기 쉬워질 거에요. 당연히 비전공자도 다룰 수 있습니다. 프로그래밍
      언어는 만국공통어 에요. 만약 C, Java 등의 언어를 접해봤다면 더욱 쉽게
      파이썬을 익힐 수 있겠죠. 파이썬의 기본부터 심화까지 차근차근 따라해보세요.
    </p>
    <h2 class="title title2">이런 분들께 권합니다.</h2>
    <ul class="recommand_list">
      <li>
        <span
          ><img
            class="check_ico"
            src="@/assets/images/lec_detail/check.png"
            alt=""
          />코딩에 관심이 있지만, 어떻게 시작해야 할 지 혼란스러운 분</span
        >
      </li>
      <li>
        <span
          ><img
            class="check_ico"
            src="@/assets/images/lec_detail/check.png"
            alt=""
          />아무리 해도 어려운사람</span
        >
      </li>
      <li>
        <span
          ><img
            class="check_ico"
            src="@/assets/images/lec_detail/check.png"
            alt=""
          />코딩이라는게 뭔지 일단 맛보고 싶은분</span
        >
      </li>
      <li>
        <span
          ><img
            class="check_ico"
            src="@/assets/images/lec_detail/check.png"
            alt=""
          />자신의 세계관을 넓히고 싶으신 분</span
        >
      </li>
      <li>
        <span
          ><img
            class="check_ico"
            src="@/assets/images/lec_detail/check.png"
            alt=""
          />더 공부를 이어나가기 전에, 파이썬 기초를 복습하고 싶으신 분</span
        >
      </li>
    </ul>
    <div class="example">
      <h2>강의 예시 및 소개</h2>
      <img src="@/assets/images/lec_detail/thumbnail2.png" alt="" />
      <p>
        다양한 주제의 파이썬 계산기 실전 프로젝트를 이용해서 단 100분동 안
        파이썬의 핵심요소 10 가지를 배울 수 있는 좋은 강의입니다. 향후에
        사물인터넷(IoT), 딥러닝, 데이터 분석 등 관련 프로젝트를 해 도 쉽게
        적용하실 수 있을 겁니다.
      </p>
    </div>
    <div class="curriculum">
      <div class="curriculum_header">
        <h2 class="curriculum_title">커리큘럼</h2>
        <button class="subscribe_btn">강의 구독</button>
        <span class="total_lec">총 13강</span>
      </div>
      <ul class="curriculum_list">
        <li>
          <span class="lec_title">
            1강 Introduction
          </span>
          <span class="lec_num">
            4강
          </span>
        </li>
        <li>
          <span class="lec_title">
            1강 Introduction
          </span>
          <span class="lec_num">
            4강
          </span>
        </li>
        <li>
          <span class="lec_title">
            1강 Introduction
          </span>
          <span class="lec_num">
            4강
          </span>
        </li>
      </ul>
    </div>
    <div class="teacher_intro">
      <h2 class="intro">강사소개</h2>
      <h3 class="name">강동원 강사님</h3>
      <h3 class="career">현:아이티윌 전임 강사</h3>
      <h3 class="career">전:EBS 1타 강사</h3>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  #intro {
    padding: 4.445%;
    padding-top: 0;
    h2 {
      font-size: 2rem;
    }
    .title {
      display: inline-block;
      border-bottom: 10px solid #5ef4ff;
    }
    .title2 {
      margin-top: 50px;
    }
    p {
      margin-top: 10px;
      color: #666666;
      font-size: 1.5rem;
      text-align: justify;
    }
    .recommand_list {
      margin-top: 20px;
      li {
        span {
          display: block;
          font-size: 1.5rem;
          .check_ico {
            width: unset;
            margin-right: 2%;
            vertical-align: -1px;
          }
        }
      }
    }
    .example {
      margin-top: 50px;

      img {
        margin-top: 20px;
      }
    }
    .curriculum {
      margin-top: 50px;
      .curriculum_header {
        position: relative;
        .curriculum_title {
          display: inline-block;
          vertical-align: middle;
        }
        .subscribe_btn {
          border-radius: 5px;
          margin-left: 3%;
          width: 54px;
          height: 16px;
          vertical-align: middle;
          font-family: inherit;
          font-size: 9px;
          color: #114fff;
          border: 1px solid #114fff;
        }
        .total_lec {
          font-size: 1.25rem;
          color: #333333;
          line-height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 50%;
        }
      }
      .curriculum_list {
        li {
          margin-top: 2%;
          .lec_title,
          .lec_num {
            font-size: 1.25rem;
            color: #333333;
            background: #f8f8f8;
            padding: 1% 2%;
            box-sizing: border-box;
            border-radius: 12px;
          }
          .lec_title {
            display: inline-block;
            width: 85%;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .lec_num {
            width: 13%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: 2%;
            display: inline-block;
            text-align: center;
          }
        }
      }
    }
    .teacher_intro {
      .intro {
        font-size: 2rem;
        margin-top: 7.6%;
      }
      .name {
        font-size: 1.5rem;
        margin: 2.287% 0;
      }
      .career {
        color: #999999;
        font-size: 1.25rem;
      }
    }
  }
</style>
