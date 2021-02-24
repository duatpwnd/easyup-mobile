/// <reference types="cypress" />
context("Actions", () => {
  context("Actions", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080");
    });
    it("로그인", () => {
      cy.get(".easyup_menu_btn").click();
      cy.get(".user_id").type("admin");
      cy.get(".user_pw").type("dnlwmvpdl#0119");
      cy.get(".login_form .blue_btn").click();
    });
  });
});
