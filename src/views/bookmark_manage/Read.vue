<template>
  <div v-if="info">
    <div class="head">
      <span class="title">[{{ info.course_name }}]</span>
      <span>{{ info.section_name }} {{ info.title }}</span>
    </div>
    <div class="contents_wrap">
      <BlueBtn>
        <template slot="blue_btn">
          <button
            @click="
              $router.push({
                path: 'play',
                query: {
                  course_id: info.c_id,
                  lp_id: inof.lp_id,
                  iid: '',
                  linkType: 'bookmark',
                  start: $Util.default.hms_to_s(check_point),
                },
              })
            "
            slot="blue_btn"
          >
            타임라인 {{ info.check_point }}
          </button>
          <span class="date">{{ info.created_at }}</span>
        </template>
      </BlueBtn>
      <div class="contents" v-html="info.contents"></div>
    </div>
    <div class="button_wrap">
      <BlueBtn class="btn">
        <button
          slot="blue_btn"
          @click="go_to_path('/bookmarkManage/add', info.id)"
        >
          수정
        </button>
      </BlueBtn>
      <BlueBtn class="btn last_btn">
        <button slot="blue_btn" @click="deleteBookmark()">
          삭제
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";

  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {
        info: "",
      };
    },

    methods: {
      go_to_path(url, id) {
        this.$router
          .push({
            path: url,
            query: {
              id: id,
              mode: "modify",
            },
          })
          .catch(() => {});
      },

      deleteBookmark() {
        const data = {
          action: "delete_bookmark",
          id: this.$route.query.id, //게시물ID
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
            console.log(result);
            if (result.data.data.result == 1) {
              this.$router.push({
                path: "/bookmarkManage",
                query: {
                  keyword: "",
                  pageCurrent: 1,
                  order: "course_name",
                },
              });
            }
          });
      },
      bookmarkRead() {
        const data = {
          action: "get_bookmark_info",
          id: this.$route.query.id, //게시물ID
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
            console.log(result.data);
            this.info = result.data.data.info;
            this.info.check_point = this.$Util.default.getTimeStringSeconds(
              this.info.check_point
            );
          });
      },
    },
    created() {
      this.bookmarkRead();
    },
  };
</script>
<style scoped lang="scss">
  .head {
    margin-top: 5%;
    span {
      font-size: 1.375rem;
    }
    .title {
      color: #114fff;
      margin-right: 2%;
      font-weight: 600;
    }
  }
  .contents_wrap {
    border-top: 2px solid #333333;
    border-bottom: 2px solid #333333;
    margin: 2% 0;
    padding: 2% 0;
    .blue_btn {
      position: relative;
      button {
        width: 40%;
        font-size: 10px;
        height: 20px;
        line-height: 18px;
        padding: 0;
      }
      .date {
        position: absolute;
        top: 0;
        right: 0;
        height: 14.5px;
        bottom: 0;
        margin: auto;
        font-size: 12px;
        color: #666666;
      }
    }
    .contents {
      white-space: pre-wrap;
      font-size: 1.25rem;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
      margin-top: 10px;
    }
  }
  .button_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
      width: 23.172%;
      button {
        border: 1px solid #114fff;
        background: white;
        color: #114fff;
        height: 24px;
        line-height: 16px;
        font-size: 12px;
      }
      &:not(:first-child) {
        margin-left: 2%;
      }
    }
    .last_btn {
      float: right;
    }
  }
</style>
