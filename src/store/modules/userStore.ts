import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
@Module({ namespaced: true, name: "UserStore" })
export default class UserStore extends VuexModule {
  userinfo = {
    access_token: null,
    info: "",
  };
  refererLink = "";
  get isToken() {
    return this.userinfo.access_token;
  }
  get status() {
    return this.userinfo.info["status"];
  }
  @Mutation
  loginToken(param) {
    this.userinfo = param;
  }
  @Mutation
  referer(param) {
    if (param.indexOf("referer") <= 0) {
      if (param != "/") {
        console.log("마지막url:", param);
        this.refererLink = param;
      }
    }
  }
}
