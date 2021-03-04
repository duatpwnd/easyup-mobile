/// <reference types="cypress" />
context("강의 상세 페이지", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VUE_APP_BASE_URL"));
  });
  it("강의 상세페이지 접속", () => {
    cy.get(".swiper_section")
      .eq(0)
      .find(".swiper-slide")
      .eq(0)
      .click();
    // get url
    cy.location().then((loc) => {
      cy.request("POST", Cypress.env("VUE_APP_API_URL"), {
        action: "get_course_info",
        course_id: loc.search.split("id=")[1],
      }).then((result) => {
        cy.get(".add_share .add").click();
      });
    });
  });
});
