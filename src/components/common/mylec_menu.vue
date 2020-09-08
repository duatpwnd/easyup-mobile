<template>
  <div id="mylec_menu">
    <ul class="gnb">
      <li>
        <router-link to="/myclass"
          ><img
            src="@/assets/images/common/lec_course_ico.png"
            alt="내 강좌/코스"
            title="내 강좌/코스"
            class="ico_1"
          />
          <h3>내 강좌/코스</h3></router-link
        >
      </li>
      <li>
        <router-link to="/myclass/board"
          ><img
            src="@/assets/images/common/board_ico.png"
            alt="과제게시판"
            title="과제게시판"
            class="ico_2"
          />
          <h3>과제게시판</h3></router-link
        >
      </li>
      <li>
        <router-link to="/mylecture1/mycourse/notice"
          ><img
            src="@/assets/images/common/notice_ico.png"
            alt="공지사항"
            title="공지사항"
            class="ico_3"
          />
          <h3>공지사항</h3></router-link
        >
      </li>
      <li>
        <router-link to="/mylecture1/mycourse/share"
          ><img
            src="@/assets/images/common/share_ico.png"
            alt="자료공유"
            title="자료공유"
            class="ico_4"
          />
          <h3>자료공유</h3></router-link
        >
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
  #mylec_menu {
    background: white;
    position: fixed;
    bottom: 0;
    max-width: 720px;
    width: 100%;
    z-index: 2;
    .gnb {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      li {
        width: 25%;
        float: left;
        text-align: center;
        a {
          display: inline-block;
          width: 100%;
          .ico_1 {
            width: 17.78%;
          }
          .ico_2 {
            width: 18.34%;
          }
          .ico_3 {
            width: 15.56%;
          }
          .ico_4 {
            width: 18.34%;
          }
          h3 {
            color: #999999;
            font-size: 1.125rem;
            font-weight: 500;
            margin-top: 5%;
          }
        }
      }
    }
  }
</style>
