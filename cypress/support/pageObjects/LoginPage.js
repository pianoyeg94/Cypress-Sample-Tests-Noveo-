
class LoginPage {
  
  getEmailInput() {
    return cy.get('#email');
  }
  
  getPasswordInput() {
    return cy.get('#passwd');
  }

  getLoginSubmitBtn() {
    return cy.get('#SubmitLogin');
  }

  getAlertDangerMsg() {
    return cy.get('.alert-danger li:nth-child(1)')
  }

  getUserAccountBadge() {
    return cy.get('.header_user_info span')
  }

}

export default LoginPage;