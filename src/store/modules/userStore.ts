import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
@Module({ namespaced: true, name: "UserStore" })
export default class UserStore extends VuexModule {
  userinfo = {
    access_token: null || "",
    info: {},
  };
  refererLink = "";
  get isToken() {
    return this.userinfo.access_token;
  }
  get status() {
    console.log(this.userinfo.info as { [key: string]: any }["status"]);
    return this.userinfo.info as { [key: string]: any }["status"];
  }
  @Mutation
  loginToken(param: { access_token: string; info: { [key: string]: any } }) {
    this.userinfo = param;
  }
  @Mutation
  referer(param: string) {
    if (param.indexOf("referer") <= 0) {
      if (param != "/") {
        console.log("마지막url:", param);
        this.refererLink = param;
      }
    }
  }
}
