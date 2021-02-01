declare module "*.vue" {
  declare module "vue/types/vue" {
    interface Vue {
      $numberWithCommas, $confirmMessage, $noticeMessage:GlobalPlugin;
      $router: VueRouter;
      $route: Route;
      $axios: Axios;
      $ApiUrl: Apiurl;
      $EventBus: EventBus;
      $cookies:VueCookies;
    }
  }
}

