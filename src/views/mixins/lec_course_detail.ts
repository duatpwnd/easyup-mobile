import { Component, Watch, Vue } from "vue-property-decorator";
import { ResultData } from "@/assets/js/util.ts";

interface Data {
  action: string;
  course_id: number;
  session_id: number;
}
type OptionalData = Partial<Data>;
@Component({
  computed: {
    detect_token() {
      return this.$store.getters["userStore/isToken"];
    },
  },
})
export default class GroupMixin extends Vue {
  public isPossibleReview = false;
  public is_subscribe = false;
  public subscribe_btn = false;
  public detail = {};
  public score_info = {}; // 각 별점의 개수
  public url = window.document.location.href; // 클립보드 현재 url
  @Watch("detect_token")
  onPropertyChanged(value: string, oldValue: string) {
    this.isSubscribe();
  }
  // 구독하기
  subscribe(): void {
    let data: OptionalData = {
      action:
        this.$route.name == "lecDetail"
          ? "subscribe_course"
          : "subscribe_session",
    };
    if (this.$route.name == "lecDetail") {
      data.course_id = Number(this.$route.query.id);
    } else {
      data.session_id = Number(this.$route.query.id);
    }
    console.log("data", data);

    this.$axios
      .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
      .then((result: ResultData) => {
        console.log("구독하기 성공 실패?", result);
        this.isSubscribe();
      });
  }
  // 구독 여부 조회
  async isSubscribe(): Promise<void> {
    let data: OptionalData = {
      action:
        this.$route.name == "lecDetail"
          ? "check_subscribe_course"
          : "check_subscribe_session",
    };
    if (this.$route.name == "lecDetail") {
      data.course_id = Number(this.$route.query.id);
    } else {
      data.session_id = Number(this.$route.query.id);
    }
    await this.$axios
      .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
      .then((result: ResultData) => {
        console.log("구독여부", result);
        if (result.data.error != true) {
          this.is_subscribe = result.data.data.isSubscribe;
          this.isPossibleReview = result.data.data.isPossibleReview;
        }
      });
  }
  scoreCount(result: object): void {
    this.score_info = result;
  }
  subscribe_btn_toggle(): void {
    if (this.$refs.subs_btn != undefined) {
      const el = this.$refs.subs_btn as HTMLElement;
      const btn_offset_top = el.offsetTop;
      const btn_h = el.clientHeight;
      const scroll_top = window.scrollY;
      if (scroll_top > btn_offset_top + btn_h) {
        this.subscribe_btn = true;
      } else {
        this.subscribe_btn = false;
      }
    }
  }
  // url 복사
  share(): void {
    this.$noticeMessage("현재 페이지 주소가 복사되었습니다.");
  }
  // 강의바구니
  cartAdd(): void {
    const data = {
      action: "add_cart",
      type: this.$route.name == "lecDetail" ? "course" : "session",
      id: this.$route.query.id,
    };
    this.$axios
      .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
      .then((result: ResultData) => {
        this.$noticeMessage("강의바구니에 담았습니다.");
      });
  }

  created() {
    window.onscroll = () => {
      this.subscribe_btn_toggle();
    };
  }
}
