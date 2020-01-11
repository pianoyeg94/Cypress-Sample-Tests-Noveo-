import LoginPage from './pageObjects/LoginPage';

const loginPage = new LoginPage();

// This custom command is supposed to provide user credentials and submit the login form
Cypress.Commands.add('provideAuthCredentials', (email, password) => {
  loginPage.getEmailInput().type(email);
  loginPage.getPasswordInput().type(password);

  loginPage.getLoginSubmitBtn().click();
});

// This custom command is supposed to validate login results
Cypress.Commands.add(
  'confirmAuthResults',
  (textConfirm, url, errorMode=true) => {

    cy.url().should('eq', url);
    if (!errorMode) {
      return loginPage.getUserAccountBadge().then($el => {
        const text = $el.text();
        expect(text).to.contain(textConfirm);
      });
    } 
    
    loginPage.getAlertDangerMsg().then($el => {
      const text = $el.text();
      expect(text).to.contain(textConfirm);
    });
  }
);

// Resets the whole form of an arbitrary "length"
Cypress.Commands.add('resetForm', (fields) => {
  for (const field of fields) {
    field().clear();
  }
});