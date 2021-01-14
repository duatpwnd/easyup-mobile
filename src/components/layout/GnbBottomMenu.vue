<template>
  <div id="gnb_bottom_menu">
    <ul class="more_view" v-if="toggleStore_more_view">
      <li v-for="(list, index) in top_menu" :key="index" @click="removeMask()">
        <router-link
          :to="{ path: list.path, query: list.query }"
          :class="[
            {
              'router-link-active':
                list.path.indexOf($route.path.split('/')[1]) >= 0 &&
                $route.path.indexOf(list.path) < 0
            }
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
                $route.path.indexOf(list.path) < 0
            }
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
<script>
import { mapState, mapMutations } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState("userStore", {
      userStore_userinfo: "userinfo"
    }),
    ...mapState("toggleStore", {
      toggleStore_more_view: "more_view"
    }),
    detect_status() {
      return this.$store.getters["userStore/status"];
    }
  },
  data() {
    return {
      top_menu: [
        {
          title: "공지사항",
          path: "/notice/list",
          name: require("@/assets/images/common/notice_ico.png"),
          active: require("@/assets/images/common/notice_active_ico.png"),
          query: {
            keyword: "",
            pageCurrent: 1,
            order: "all"
          }
        },
        {
          title: "자료공유",
          path: "/dataShare/sent",
          name: require("@/assets/images/common/share_ico.png"),
          active: require("@/assets/images/common/share_active_ico.png"),
          query: {
            keyword: "",
            pageCurrent: 1,
            order: "all"
          }
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
          }
        }
      ],
      bottom_menu: [
        {
          title: "내 강좌/코스",
          path: "/myClass/lecture",
          name: require("@/assets/images/common/lec_course_ico.png"),
          active: require("@/assets/images/common/lec_course_active_ico.png"),
          query: {
            keyword: "",
            pageCurrent: 1,
            order: ""
          }
        },
        {
          title: "학습관리",
          path: "/learning",
          name: require("@/assets/images/common/learning_ico.png"),
          active: require("@/assets/images/common/learning_active_ico.png")
        },
        {
          title: "쿠폰관리",
          path: "/couponManage/student",
          query: {
            type: "available",
            pageCurrent: 1
          },
          name: require("@/assets/images/common/coupon_ico.png"),
          active: require("@/assets/images/common/coupon_active_ico.png")
        }
      ]
    };
  },
  watch: {
    detect_status(a, b) {
      console.log(a, b);
      if (a != b) {
        this.bottom_menu.splice(3, 3);
        this.menuSet();
      }
    }
  },
  methods: {
    removeMask() {
      this.$store.commit("toggleStore/Toggle", {
        mask: false,
        more_view: false
      });
    },
    toggle() {
      this.$store.commit("toggleStore/Toggle", {
        mask: true,
        more_view: true
      });
    },
    menuSet() {
      if (this.userStore_userinfo.info.status == 5) {
        this.bottom_menu.push(
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
              start_date: this.$dateFormat(),
              end_date: this.$dateFormat()
            }
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
              order: ""
            }
          }
        );
      } else {
        this.bottom_menu[2].path = "/couponManageTeacher/list";
        this.bottom_menu[2].query = {
          order: "",
          pageCurrent: 1,
          keyword: ""
        };
        this.bottom_menu.push({
          title: "정산/결제",
          path: "/settlementAndPayment/settleList",
          name: require("@/assets/images/common/payment_ico.png"),
          active: require("@/assets/images/common/payment_active_ico.png"),
          status: 1,
          query: {
            pageCurrent: 1,
            start_date: this.$dateFormat(),
            end_date: this.$dateFormat()
          }
        });
      }
    }
  },
  mounted() {},
  created() {
    this.menuSet();
  }
};
</script>
<style scoped lang="scss">
#gnb_bottom_menu {
  position: fixed;
  bottom: 0;
  max-width: 720px;
  width: 100%;
  z-index: 6;
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
  .more_view {
    width: 70%;
    margin: 0 auto;
    margin-bottom: 5px;
    border-radius: 15px;
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
