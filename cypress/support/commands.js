// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// 로그인 처리
Cypress.Commands.add("login", (userType) => {
  const types = {
    teacher: {
      action: "login",
      userid: "admin",
      userpw: "dnlwmvpdl#0119",
    },
    student: {
      action: "login",
      userid: "jcyoum912@naver.com",
      userpw: "duadksk9!!",
    },
  };
  cy.get(".easyup_menu_btn").click();
  cy.get(".user_id").type(types[userType].userid);
  cy.get(".user_pw").type(types[userType].userpw);
  cy.get(".login_form .blue_btn").click();
  cy.request({
    url: Cypress.env("VUE_APP_API_URL"),
    method: "POST",
    body: types[userType],
  })
    .its("body")
    .then((body) => {
      cy.get(".mask").click();
      // 쿠키 설정
      cy.setCookie("user_info", JSON.stringify(body.data[0]));
    });
});
// 로그아웃 처리
Cypress.Commands.add("logout", () => {
  cy.get(".easyup_menu_btn").click();
  cy.get(".logout .blue_btn").click();
  // 쿠키 제거
  cy.clearCookie("user_info").should("be.null");
});
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
