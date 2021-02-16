<template>
  <div id="gnb_bottom_menu">
    <div class="gnb_mask" v-if="gnb_mask" @click="removeMask()"></div>
    <ul class="more_view" v-if="toggleStore_more_view">
      <li v-for="(list, index) in top_menu" :key="index" @click="removeMask()">
        <router-link
          :to="{ path: list.path, query: list.query }"
          :class="[
            {
              'router-link-active':
                list.path.indexOf($route.path.split('/')[1]) >= 0 &&
                $route.path.indexOf(list.path) < 0,
            },
          ]"
        >
          <img
            v-if="list.path.indexOf($route.path.split('/')[1]) >= 0"
            :src="list.active"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <img
            v-else
            :src="list.name"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <h3 class="txt">
            {{ list.title }}
          </h3>
        </router-link>
      </li>
    </ul>
    <ul class="gnb">
      <li v-for="(list, index) in bottom_menu" :key="index">
        <span v-if="list.title == '학습관리'" @click="toggle()">
          <img
            :src="list.active"
            :alt="list.title"
            :title="list.title"
            v-if="toggleStore_more_view"
          />
          <img :src="list.name" :alt="list.title" :title="list.title" v-else />
          <h3 class="active_title" v-if="toggleStore_more_view">
            {{ list.title }}
          </h3>
          <h3 class="inactive_title" v-else>{{ list.title }}</h3>
        </span>
        <router-link
          @click.native="removeMask()"
          v-else
          :to="{ path: list.path, query: list.query }"
          :class="[
            {
              'router-link-active':
                list.path.indexOf($route.path.split('/')[1]) >= 0 &&
                $route.path.indexOf(list.path) < 0,
            },
          ]"
        >
          <img
            v-if="
              list.path.indexOf($route.path.split('/')[1]) >= 0 &&
                toggleStore_more_view == false
            "
            :src="list.active"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <img
            v-else
            :src="list.name"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <h3 class="txt" v-if="toggleStore_more_view == false">
            {{ list.title }}
          </h3>
          <h3 v-else>{{ list.title }}</h3></router-link
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  import { mapState } from "vuex";
  import { Component, Watch, Vue } from "vue-property-decorator";
  interface MenuType {
    title: string;
    path: string;
    name: string;
    active: string;
    status?: number;
    query?: {
      type?: string;
      keyword?: string;
      pageCurrent?: number;
      order?: string;
      start_date?: string;
      end_date?: string;
      view?: string;
    };
  }
  interface UserInfo {
    info: {
      status: number;
    };
  }
  @Component({
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
      ...mapState("toggleStore", {
        toggleStore_more_view: "more_view",
      }),
      detect_status() {
        return this.$store.getters["userStore/status"];
      },
    },
  })
  export default class GnbMenu extends Vue {
    @Watch("view")
    onPropertyChanged(newValue: string, oldValue: string) {
      // 다른페이지로 이동할떄
      console.log("Watch:", this.bottom_menu);
      if (newValue != oldValue && newValue != undefined) {
        this.bottom_menu.splice(2, 3);
        this.menuSet();
      }
    }
    $dateFormat!: Function;
    userStore_userinfo!: UserInfo;
    gnb_mask = false;
    view = "";
    top_menu: MenuType[] = [
      {
        title: "공지사항",
        path: "/notice/list",
        name: require("@/assets/images/common/notice_ico.png"),
        active: require("@/assets/images/common/notice_active_ico.png"),
        query: {
          keyword: "",
          pageCurrent: 1,
          order: "all",
        },
      },
      {
        title: "자료공유",
        path: "/dataShare/sent",
        name: require("@/assets/images/common/share_ico.png"),
        active: require("@/assets/images/common/share_active_ico.png"),
        query: {
          keyword: "",
          pageCurrent: 1,
          order: "all",
        },
      },
      {
        title: "과제게시판",
        path: "/dataShare/sent",
        name: require("@/assets/images/common/learning_ico.png"),
        active: require("@/assets/images/common/learning_active_ico.png"),
        query: {
          // keyword: "",
          // pageCurrent: 1,
          // order: "all",
        },
      },
    ];
    bottom_menu: MenuType[] = [
      {
        title: "내 강좌/코스",
        path: "/myClass/lecture",
        name: require("@/assets/images/common/lec_course_ico.png"),
        active: require("@/assets/images/common/lec_course_active_ico.png"),
        query: {
          keyword: "",
          pageCurrent: 1,
          order: "",
        },
      },
      {
        title: "학습관리",
        path: "/learning",
        name: require("@/assets/images/common/learning_ico.png"),
        active: require("@/assets/images/common/learning_active_ico.png"),
      },
      // {
      //   title: "쿠폰관리",
      //   path: "/couponManage/student",
      //   query: {
      //     type: "available",
      //     pageCurrent: 1,
      //     view: this.$route.query.view as string,
      //   },
      //   name: require("@/assets/images/common/coupon_ico.png"),
      //   active: require("@/assets/images/common/coupon_active_ico.png"),
      // },
    ];
    removeMask(): void {
      this.gnb_mask = false;
      this.$store.commit("toggleStore/Toggle", {
        more_view: false,
      });
    }
    toggle(): void {
      this.gnb_mask = true;
      this.$store.commit("toggleStore/Toggle", {
        more_view: true,
      });
    }
    menuSet(): void {
      (this.top_menu[0] as { [key: string]: any }).query.view = this.$route
        .query.view as string;
      (this.top_menu[1] as { [key: string]: any }).query.view = this.$route
        .query.view as string;
      (this.bottom_menu[0] as { [key: string]: any }).query.view = this.$route
        .query.view as string;
      // 학생
      if (this.$route.query.view == "student") {
        this.bottom_menu.push(
          {
            title: "쿠폰관리",
            path: "/couponManage/student",
            query: {
              type: "available",
              pageCurrent: 1,
              view: this.$route.query.view as string,
            },
            name: require("@/assets/images/common/coupon_ico.png"),
            active: require("@/assets/images/common/coupon_active_ico.png"),
          },
          {
            title: "구매내역",
            path: "/purchase/list",
            name: require("@/assets/images/common/purchase_ico.png"),
            active: require("@/assets/images/common/purchase_active_ico.png"),
            status: 5,
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "",
              view: this.$route.query.view as string,
            },
          },
          {
            title: "책갈피 관리",
            path: "/bookmarkManage/list",
            name: require("@/assets/images/common/bookmark_ico.png"),
            active: require("@/assets/images/common/bookmark_active_ico.png"),
            status: 5,
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "",
              view: this.$route.query.view as string,
            },
          }
        );
      } else {
        // 관리자
        this.bottom_menu.push(
          {
            title: "쿠폰관리",
            path: "/couponManageTeacher/list",
            query: {
              order: "",
              pageCurrent: 1,
              keyword: "",
              view: this.$route.query.view as string,
            },
            name: require("@/assets/images/common/coupon_ico.png"),
            active: require("@/assets/images/common/coupon_active_ico.png"),
          },
          {
            title: "정산/결제",
            path: "/settlementAndPayment/settleList",
            name: require("@/assets/images/common/payment_ico.png"),
            active: require("@/assets/images/common/payment_active_ico.png"),
            status: 1,
            query: {
              pageCurrent: 1,
              start_date: this.$dateFormat(),
              end_date: this.$dateFormat(),
              view: this.$route.query.view as string,
            },
          }
        );
      }
    }
    updated() {
      this.$nextTick(() => {
        this.view = this.$route.query.view as string;
      });
    }
    mounted() {
      // updated 호출후 다시 뒤로가기 버튼누르고 앞으로 가기버튼 누르면 쿼리값이 찍힘 그러나 updated는 호출안됨
      if (this.$route.query.view != undefined) {
        this.view = this.$route.query.view as string;
      }
    }
  }
</script>
<style scoped lang="scss">
  #gnb_bottom_menu {
    position: fixed;
    bottom: 0;
    max-width: 720px;
    width: 100%;
    z-index: 4;
    .gnb_mask {
      position: fixed;
      max-width: 720px;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    .more_view {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      li {
        width: 33.333%;
        float: left;
        text-align: center;
      }
    }
    .gnb,
    .more_view {
      background: white;
      display: flex;
      li {
        width: 100%;
        text-align: center;
        a,
        span {
          display: inline-block;
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
          img {
            height: 18px;
            width: 18px;
          }
          h3 {
            color: #999999;
            font-size: 11px;
            font-weight: 500;
            margin-top: 2.3px;
          }
          .active_title {
            color: #114fff;
          }
        }
        .router-link-active {
          img {
            color: #114fff;
          }
          .txt {
            color: #114fff;
          }
        }
      }
    }
    .gnb {
      border-top: 1px solid #ccc;
      z-index: 1;
      position: relative;
    }
    .more_view {
      width: 70%;
      margin: 0 auto;
      margin-bottom: 5px;
      border-radius: 15px;
      z-index: 1;
      position: relative;
      li {
        padding: 10px 0;
        a {
          padding: 0;
        }
        &:not(:last-child) {
          a {
            border-right: 1px solid #999999;
          }
        }
      }
    }
  }
</style>
