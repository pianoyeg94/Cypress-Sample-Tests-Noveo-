import LoginPage from './pageObjects/LoginPage';

// This custom command is supposed to provide user credentials and submit the login form
const loginPage = new LoginPage();

Cypress.Commands.add('provideAuthCredentials', (email, password) => {
  loginPage.getEmailInput().type(email);
  loginPage.getPasswordInput().type(password);

  loginPage.getLoginSubmitBtn().click();
});

// This custom command is supposed to validate login results
Cypress.Commands.add(
  'confirmAuthResults',
  (textConfirm, url, errorMode=true) => {
    const loginPage = new LoginPage();

    cy.url().should('eq', url);
    if (errorMode) {
      loginPage.getAlertDangerMsg().then($el => {
        const text = $el.text();
        expect(text).to.contain(textConfirm);
      });
    } else {
      loginPage.getUserAccountBadge().then($el => {
        const text = $el.text();
        expect(text).to.contain(textConfirm);
      });
    }
  }
);
