import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
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
})
export default class PlayerCommon extends Vue {
  // 강의 변경
  async switchItem(item_id: number, current_id: number) {
    if (item_id == current_id) {
      return;
    }
    let check_time!: number;
    this.$store.commit("playerStore/playerState", {
      check_time: check_time,
    });
    const data: {
      action: string;
      course_id: number;
      lp_id: number;
      item_id: number;
    } = {
      action: "switch_item",
      course_id: Number(this.$route.query.course_id),
      lp_id: Number(this.$route.query.lp_id),
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
      .then((result: object) => {
        // 플레이어 정보 갱신
        console.log(result);
        this.$EventBus.$emit("switch_item", true);
      });
  }
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
}
