/// <reference types="cypress" />
context("메인 페이지", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL"));
  });
  it("로그인 처리", () => {
    cy.login("teacher");
  });
});
