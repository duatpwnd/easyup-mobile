/// <reference types="cypress" />
context("내 강의실", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL"));
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.login("teacher");
  });
  it("내강의실로 이동해서 프로필 등록", () => {
    cy.get(".easyup_menu_btn").click();
    cy.get(".lnb_menu .lnb")
      .eq(3)
      .click();
    cy.get(".report").click();
    cy.get(".profileModal .contents").type("test 입니다.");
    cy.get(".confirm_ok").click();
  });
});
