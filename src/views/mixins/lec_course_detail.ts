import { Component, Watch, Vue } from "vue-property-decorator";
@Component({
  computed: {
    detect_token() {
      return this.$store.getters["userStore/isToken"];
    },
  }
})
export default class GroupMixin extends Vue {
  public isPossibleReview:boolean = false
  public is_subscribe:boolean= false
  public subscribe_btn:boolean= false
  public detail = {
    description:[],
    coupon:{
      discount_price:Number,
      quantity:Number,
      coupon_id:Number,
      discount_type:String
    },
    price:{
      original:Number,
      final:Number
    },
    curriculum_list:{
      count:Number,
      count_detail:Number,
      items:[],
      type:String
    },
    teacher_introduce:[]
  };
  public score_info:string = "" // 각 별점의 개수
  public url:string= window.document.location.href // 클립보드 현재 url
   @Watch("detect_token")
    onPropertyChanged(value: string, oldValue: string) {
      this.isSubscribe();
    }
    // 구독하기
    subscribe() {
      const data = {};
      if (this.$route.name == "lecDetail") {
        data["action"] = "subscribe_course";
        data["course_id"] = this.$route.query.id;
      } else {
        data["action"] = "subscribe_session";
        data["session_id"] = this.$route.query.id;
      }
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log("구독하기 성공 실패?", result);
          this.isSubscribe();
        });
    }
    // 구독 여부 조회
    async isSubscribe() {
      const data = {};
      if (this.$route.name == "lecDetail") {
        data["action"] = "check_subscribe_course";
        data["course_id"] = this.$route.query.id;
      } else {
        data["action"] = "check_subscribe_session";
        data["session_id"] = this.$route.query.id;
      }
      console.log(data);
      await this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log("구독여부", result);
          if (result.data.error != true) {
            this.is_subscribe = result.data.data.isSubscribe;
            this.isPossibleReview = result.data.data.isPossibleReview;
          }
        });
    }
    scoreCount(result) {
      console.log(result);
      this.score_info = result;
    }
    subscribe_btn_toggle() {
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
    share() {
      this.$noticeMessage("현재 페이지 주소가 복사되었습니다.");
    }
    // 강의바구니
    cartAdd() {
      const data = {
        action: "add_cart",
        type: this.$route.name == "lecDetail" ? "course" : "session",
        id: this.$route.query.id,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log(result);
          this.$noticeMessage("강의바구니에 담았습니다.");
        });
    }
  
  created() {
    window.onscroll = () => {
      this.subscribe_btn_toggle();
    };
  }
};

