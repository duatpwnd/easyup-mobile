/// <reference types="cypress" />
context("강의 상세 페이지", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL") + "/lecDetail?id=126");
    cy.login("teacher");
  });
  it("강의 담기", () => {
    cy.location().then((loc) => {
      // 코스 정보 가져오기
      cy.request("POST", Cypress.env("VUE_APP_API_URL"), {
        action: "get_course_info",
        course_id: loc.search.split("id=")[1],
      }).then((result) => {
        cy.get(".add_share .add").click();
        cy.get(".confirm_ok").click();
      });
    });
  });
});
