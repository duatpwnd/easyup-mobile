/// <reference types="cypress" />
context("강의 바구니 접속", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL") + "/lecDetail?id=126");
    cy.login("teacher");
    cy.get(".add_share .add").click();
    cy.get(".confirm_ok").click();
  });
  it("전체 체크", () => {
    // 해제
    cy.get(".btn_wrap .container-checkbox").click();
    // 체크
    cy.get(".btn_wrap .container-checkbox").click();
  });
  it("강의 바구니 여러개 순차적으로 삭제", () => {
    cy.get(".list_wrap").each(($el, index, $list) => {
      $el[0].children[3].click();
    });
  });
});
