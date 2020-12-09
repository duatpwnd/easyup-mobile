<template>
  <div>
    <div class="user_info">
      <span class="profile">
        <img
          :src="userStore_userinfo.info.profile_image"
          alt="프로필"
          title="프로필"
        />
      </span>
      <div class="info">
        <slot name="user_name">
          <span class="name">강동원</span>
        </slot>
        <span class="class">님의 강의실</span>
        <slot name="user_email">
          <p class="email">duatpwnd1@naver.com</p>
        </slot>
        <slot name="convert"> </slot>
        <slot name="update_date">
          <p class="update_date">
            2019년 8월 29일(업데이트일자:2019년 9월 1일)
          </p>
        </slot>
      </div>
    </div>
    <ul class="course_info">
      <slot name="info">
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
      </slot>
    </ul>
  </div>
</template>
<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    components: {},
    data() {
      return {};
    },
    methods: {
      convert() {
        this.$router.push("/studentClaasRoom");
      },
    },
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
      border-radius: 50%;
      overflow: hidden;
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
        font-size: 12px;
        font-weight: 600;
        color: #114fff;
        border-radius: 4px;
        margin-right: 5%;
        width: 38%;
        padding: 0 10px;
        height: 25px;
        line-height: 27px;
        display: inline-block;
        box-sizing: border-box;
        background: url("~@/assets/images/common/profile_active_ico.png")
          no-repeat 100%-10 center/ 12px 12px;
        background-color: white;
        span {
          font-weight: 600;
        }
      }
      .convert {
        @extend .report;
        padding: 0 4.5px;
        background: url("~@/assets/images/mylecture_room/convert_ico.png")
          no-repeat 100%-4.5 center / 11.5px 9px;
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
        font-size: 10px;
        font-weight: 500;
        color: #dbdbdb;
      }
    }
  }
</style>
