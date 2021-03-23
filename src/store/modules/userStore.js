import { __decorate } from "tslib";
import { Module, VuexModule, Mutation } from "vuex-module-decorators";
let UserStore = class UserStore extends VuexModule {
    constructor() {
        super(...arguments);
        this.userinfo = {
            access_token: null || "",
            info: {},
        };
        this.refererLink = "";
    }
    get isToken() {
        return this.userinfo.access_token;
    }
    get status() {
        console.log(this.userinfo.info);
        return this.userinfo.info;
    }
    loginToken(param) {
        this.userinfo = param;
    }
    referer(param) {
        if (param.indexOf("referer") <= 0) {
            if (param != "/") {
                console.log("마지막url:", param);
                this.refererLink = param;
            }
        }
    }
};
__decorate([
    Mutation
], UserStore.prototype, "loginToken", null);
__decorate([
    Mutation
], UserStore.prototype, "referer", null);
UserStore = __decorate([
    Module({ namespaced: true, name: "UserStore" })
], UserStore);
export default UserStore;
//# sourceMappingURL=userStore.js.map