<template>
  <div>
    <div class="user_info">
      <span class="profile">
        <img
          src="@/assets/images/mylecture_room/profile.png"
          alt="프로필"
          title="프로필"
        />
      </span>
      <div class="info">
        <span class="name">강동원</span>
        <span class="class">강사님의 강의실</span>
        <p class="email">duatpwnd1@naver.com</p>
        <router-link to="/" class="report"><span>리포트</span></router-link>

        <router-link to="/" class="convert"><span>학생전환</span></router-link>
        <p class="update_date">2019년 8월 29일(업데이트일자:2019년 9월 1일)</p>
      </div>
    </div>
    <ul class="course_info">
      <li>
        <h3>진행중인 강의</h3>
        <span>5건</span>
      </li>
      <li>
        <h3>진행중인 코스</h3>
        <span>5건</span>
      </li>
      <li>
        <h3>비활성화 강의</h3>
        <span>5건</span>
      </li>
      <li>
        <h3>비활성화 코스</h3>
        <span>5건</span>
      </li>
    </ul>
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
  .user_info {
    background: #343536;
    display: table;
    width: 100%;
    padding: 4.167% 8.333%;
    box-sizing: border-box;
    .profile {
      width: 26.6%;
      display: table-cell;
      vertical-align: middle;
    }
    .info {
      display: table-cell;
      vertical-align: middle;
      padding-left: 10%;
      .name {
        color: #ffffff;
        font-weight: 500;
        font-size: 2rem;
      }
      .class {
        @extend .name;
        font-weight: 100;
        margin-left: 3%;
      }
      .email {
        color: #999999;
        font-size: 1.375rem;
        margin-bottom: 3%;
      }
      .report {
        font-size: 1.25rem;
        color: #114fff;
        border-radius: 4px;
        width: 40%;
        display: inline-block;
        padding: 1.376% 8%;
        box-sizing: border-box;
        background: url("~@/assets/images/mylecture_room/report_ico.png")
          no-repeat 80% center / 15.132%; /* 23px/152px */
        background-color: white;
        span {
          font-weight: 600;
        }
      }
      .convert {
        @extend .report;
        margin-left: 5%;
        padding-left: 5%;
        background: url("~@/assets/images/mylecture_room/convert_ico.png")
          no-repeat 90% center / 13.816%; /* 21px/152px */
        background-color: white;
      }
      .update_date {
        font-size: 1rem;
        color: #757677;
        margin-top: 3%;
      }
    }
  }
  .course_info {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    li {
      float: left;
      width: 25%;
      text-align: center;
      color: white;
      background-color: #29292a;
      padding: 11px;
      box-sizing: border-box;
      h3,
      span {
        font-size: 1.25rem;
        font-weight: 500;
        color: #dbdbdb;
      }
    }
  }
</style>
