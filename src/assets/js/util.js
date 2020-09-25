class App {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  static test1() {
    console.log("정적메소드");
  }
  test() {
    console.log("test");
  }
}
class newApp extends App {
  constructor(c, d) {
    super(c, d);
  }
  test1() {
    console.log("test1", this.a);
    super.test();
    return "success";
  }
}
export { App, newApp };
