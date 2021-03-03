/// <reference types="cypress" />
context("메인 페이지", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL"));
  });
  it("로그인 처리", () => {
    cy.get(".easyup_menu_btn").click();
    cy.get(".user_id").type("admin");
    cy.get(".user_pw").type("dnlwmvpdl#0119");
    cy.get(".login_form .blue_btn").click();
    cy.get(".mask").click();
  });
});
