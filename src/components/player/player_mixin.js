import { __decorate } from "tslib";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
let PlayerCommon = class PlayerCommon extends Vue {
    // 강의 변경
    async switchItem(item_id, current_id) {
        if (item_id == current_id) {
            return;
        }
        let check_time;
        this.$store.commit("playerStore/playerState", {
            check_time: check_time
        });
        const data = {
            action: "switch_item",
            course_id: Number(this.$route.query.course_id),
            lp_id: Number(this.$route.query.lp_id),
            item_id: item_id
        };
        this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
            headers: {
                Authorization: this.$cookies.get("user_info")
                    ? "Bearer " + this.$cookies.get("user_info").access_token
                    : null
            }
        })
            .then((result) => {
            // 플레이어 정보 갱신
            console.log(result);
            this.$EventBus.$emit("switch_item", true);
        });
    }
};
PlayerCommon = __decorate([
    Component({
        computed: {
            ...mapState("toggleStore", {
                toggleStore_bookmark_modal: "bookmark_modal",
                toggleStore_bookmark_list_modal: "bookmark_list_info"
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
                playerStore_current_link: "current_link"
            })
        },
    })
], PlayerCommon);
export default PlayerCommon;
;
//# sourceMappingURL=player_mixin.js.map