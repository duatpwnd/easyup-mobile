import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $getTimeStringSeconds: Function;
    $hms_to_s: Function;
    $confirmMessage: Function;
    $noticeMessage: Function;
    $logOut: Function;
    $numberWithCommas: Function;
    $ApiUrl: { [key: string]: any };
    $router: { [key: string]: any };
    $route: { [key: string]: any };
    $axios: { [key: string]: any };
    $EventBus: { [key: string]: any };
    $cookies: { [key: string]: any };
  }
}
