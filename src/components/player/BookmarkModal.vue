<template>
  <div class="bookmark-add-wrap">
    <div class="clearfix">
      <span class="pull-right" @click="bookmarkModalClose()"></span>
    </div>
    <div class="bookmark-add">
      <p class="add-txt">생성하실 책갈피의 이름을 입력해주세요.</p>
      <input
        type="text"
        v-model="title"
        class="form-control"
        maxlength="20"
        placeholder="20자 이내 입력"
      />
    </div>
    <div class="bookmark-btn-box">
      <BlueBtn class="left">
        <button slot="blue_btn" @click="bookmarkAdd()">확인</button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn" @click="bookmarkModalClose()">취소</button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    current_id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState("playerStore", {
      playerStore_stopTime: "stop_time",
      playerStore_video: "video_stop_time",
      playerStore_custom_type: "custom_type",
      playerStore_lp_type: "lp_type"
    })
  },
  components: {
    BlueBtn
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    // 즐겨찾기 추가
    bookmarkAdd() {
      const data = {
        action: "add_bookmark",
        course_id: this.$route.query.course_id,
        lp_id: this.$route.query.lp_id,
        current_id: this.current_id,
        check_time:
          this.playerStore_lp_type == "document" &&
          this.playerStore_custom_type == "video"
            ? Math.floor(this.playerStore_video.currentTime())
            : Math.floor(this.playerStore_stopTime()),
        title: this.title
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log("책갈피 정보", result);
          this.$noticeMessage(result.data.data.msg);
          this.bookmarkModalClose();
          this.$emit("bookmark_add");
        });
    },

    bookmarkModalClose() {
      // 즐겨찾기 추가 모달
      this.$store.commit("toggleStore/Toggle", {
        bookmark_modal: false
      });
    }
  }
};
</script>
<style scoped lang="scss">
.bookmark-add-wrap {
  position: fixed;
  max-width: 720px;
  width: 70%;
  height: 140px;
  background: #ffffff;
  border: 1px solid #707070;
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;
  .clearfix {
    text-align: right;
    .pull-right {
      background: url("http://develop.hell0world.net/main/img/x_pop.png")
        no-repeat center / 16px 16px;
      width: 16px;
      height: 16px;
      display: inline-block;
    }
  }
  .bookmark-add {
    .add-txt {
      font-size: 14px;
      text-align: center;
      margin: 14px 0 10px 0;
    }
    .form-control {
      border: 1px solid #dbdbdb;
      border-radius: 5px;
      padding: 5px 20px;
      box-shadow: none;
      height: 32px;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .bookmark-btn-box {
    margin-top: 10px;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .blue_btn {
      width: 48%;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
      button {
        background: white;
        color: #114fff;
      }
    }
  }
}
</style>
