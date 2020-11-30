import { mapState, mapMutations } from "vuex";

let player_common = {
  data() {
    return {};
  },
  computed: {
    ...mapState("toggleStore", {
      toggleStore_bookmark_modal: "bookmark_modal",
      toggleStore_bookmark_list_modal: "bookmark_list_info",
    }),
    ...mapState("playerStore", {
      playerStore_list: "list",
      playerStore_current_item_id: "current_item_id",
      playerStore_custom_type: "custom_type",
      playerStore_lp_type: "lp_type",
      playerStore_nextBtn: "nextBtn",
      playerStore_nextItem: "nextItem",
      playerStore_stopTime: "stop_time",
      playerStore_checkTime: "check_time",
      playerStore_current_link: "current_link",
    }),
  },
  methods: {
    // 강의 변경
    async switchItem(item_id, current_id) {
      if (item_id == current_id) {
        return;
      }
      this.$store.commit("playerStore/playerState", {
        check_time: "",
      });
      const data = {
        action: "switch_item",
        course_id: this.$route.query.course_id,
        lp_id: this.$route.query.lp_id,
        item_id: item_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
          // 플레이어 정보 갱신
          this.$EventBus.$emit("switch_item", true);
        });
    },
    // 다음강의 아이디
    // isNextLecture() {
    //   console.log(this.playerStore_list);
    //   const list = this.playerStore_list;
    //   return new Promise((resolve, reject) => {
    //     const item = list.not_parents.find((el, index) => {
    //       return el.id == this.playerStore_current_item_id;
    //     });
    //     const index = list.not_parents.indexOf(item);
    //     if (list.not_parents[index + 1] == undefined) {
    //       resolve(false);
    //     } else {
    //       resolve(list.not_parents[index + 1].id);
    //     }
    //   });
    // },
  },
  mounted() {},
  created() {},
};
export default player_common;
