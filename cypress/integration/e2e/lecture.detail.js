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
    cy.location().then((loc) => {
      cy.request("POST", Cypress.env("VUE_APP_API_URL"), {
        action: "get_course_info",
        course_id: loc.search.split("id=")[1],
      }).then((result) => {
        console.log("결과물:", result);
        cy.get(".add_share .add").click();
      });
    });
  });
  // it("강의 상세페이지 데이터 가져오기", () => {

  // });
  // it("강의 보러가기", () => {
  //   console.log(cy.get(".subscribe_wrap"));
  // });
  // it("강의담기", () => {
  //   cy.get(".add_share");
  // });
});
