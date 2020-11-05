<template>
  <div class="wrap">
    <Search>
      <input
        v-model="keyword"
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
      <button
        slot="search_btn"
        class="search_btn"
        @click="getList($route.name, 1, keyword)"
      ></button>
    </Search>

    <BlueBtn class="left" v-if="list.buttonType == 'notice'">
      <button
        slot="blue_btn"
        @click="
          $router.push({
            path: '/uniJob/register',
            query: {
              type: $route.name,
              is_notice: true,
            },
          })
        "
      >
        공지사항 등록
      </button>
    </BlueBtn>
    <BlueBtn class="left" v-else-if="list.buttonType == 'normal'">
      <button
        slot="blue_btn"
        @click="
          $router.push({
            path: '/uniJob/register',
            query: {
              type: $route.name,
              is_notice: false,
            },
          })
        "
      >
        협력기업 등록
      </button>
    </BlueBtn>
    <BlueBtn
      class="left"
      v-if="list.buttonType == 'upload' && $route.name == 'resume'"
    >
      <button slot="blue_btn" @click="$router.push('/uniJob/register')">
        이력서 등록
      </button>
    </BlueBtn>

    <h2 class="total">
      총<span class="num">{{ list.total_count }}</span
      >건
    </h2>
    <BoardTitle>
      <template slot="header">
        <span>제목</span>
        <span>등록일시</span>
      </template>
    </BoardTitle>
    <ul class="item_wrap">
      <li
        v-for="(li, index) in list.list"
        :key="index"
        @click="goToPath(li.id, li.is_possible)"
      >
        <span class="left is_delete" v-if="li.is_delete == 'yes'">{{
          li.title
        }}</span>
        <span class="left" v-else
          ><span class="is_notice" v-if="li.is_notice == 'yes'">[공지]</span
          ><span
            v-html="
              li.title.replace(
                /re:/gi,
                '<span class=re style=color:#999999;>re:</span>'
              )
            "
            v-if="li.is_reple == 'yes'"
          ></span
          ><span v-else>{{ li.title }}</span></span
        >

        <span class="right">{{ li.created_at }}</span>
      </li>
    </ul>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList($route.name, Number(current) - 1, keyword)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList($route.name, Number(current) + 1, keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Pagination from "@/components/common/Pagination.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";

  import BoardTitle from "@/components/common/BoardTitle.vue";
  import Search from "@/components/common/Search.vue";

  export default {
    components: { BoardTitle, Search, Pagination, BlueBtn },

    data() {
      return {
        list: "",
        keyword: "",
        current: "",
      };
    },
    methods: {
      getList(type, num, keyword) {
        const data = {
          action: "get_unijob_list", //필수
          current: num, //필수
          type: type,
          keyword: keyword, //옵션
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log("유니잡", result);
            this.$router
              .push({
                query: {
                  pageCurrent: num,
                  keyword: keyword,
                },
              })
              .catch(() => {});
            this.list = result.data.data;
            this.keyword = keyword;
            this.current = num;
          });
      },
      goToPath(id, is_possible) {
        console.log(is_possible);
        if (is_possible == "normal") {
          this.$router
            .push({
              path: "/uniJob/read",
              query: {
                type: this.$route.name,
                id: id,
              },
            })
            .catch(() => {});
        } else {
          this.$Util.default.noticeMessage("해당 글을 조회 할 수 없습니다.");
        }
      },
    },
    watch: {
      $route(to, from) {
        this.getList(
          to.name,
          this.$route.query.pageCurrent,
          this.$route.query.keyword
        );
      },
    },
    created() {
      console.log(
        this.$route.name,
        this.$route.query.pageCurrent,
        this.$route.query.keyword
      );
      this.getList(
        this.$route.name,
        this.$route.query.pageCurrent,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .wrap {
    padding: 4.445%;
    padding-top: 0;

    .search {
      margin: 2% 0;
      .search_contents {
        width: 100%;
        margin-left: 0;
      }
    }

    .title_wrap {
      span {
        text-align: right;
      }
    }
    .total {
      font-size: 1.375rem;
      margin-top: 2.5%;
      .num {
        color: #114fff;
      }
    }
    .item_wrap {
      li {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        padding: 2%;

        span {
          color: #333333;
          font-size: 1.25rem;
        }

        .left {
          float: left;
          width: 55%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .is_notice {
            color: #114fff;
            font-weight: bold;
          }
        }
        .right {
          float: right;
        }
        .is_delete {
          color: #999999;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
