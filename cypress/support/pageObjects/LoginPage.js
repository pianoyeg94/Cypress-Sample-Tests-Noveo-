class LoginPage {
  //GET ELEMENTS FROM THE PAGE---------------

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
    return cy.get('.alert-danger li:nth-child(1)');
  }

  getUserAccountBadge() {
    return cy.get('.header_user_info span');
  }

  //CUSTOM METHODS RELATED TO THE CURRENT PAGE---------------

  // This method is supposed to provide user credentials and submit the login form.
  // Could be more generic and refactored as a custom command/"utililty method" to deal with all types of forms
  // like the resetForm() command in the commands module (relative path=../commands),
  // but this one is just for demonstration purposes.
  provideAuthCredentials(email, password) {
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);

    this.getLoginSubmitBtn().click();
  }


  confirmAuthResults(textConfirm, url, errorMode = true) {
    cy.url().should('eq', url);
    if (!errorMode) {
      return this.getUserAccountBadge().then($el => {
        const text = $el.text().toLowerCase();
        expect(text).to.contain(textConfirm);
      });
    }

    this.getAlertDangerMsg().then($el => {
      const text = $el.text().toLowerCase();
      expect(text).to.contain(textConfirm);
    });
  }
}

export default LoginPage;
