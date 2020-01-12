import LoginPage from './pageObjects/LoginPage';

const loginPage = new LoginPage();

// This custom command is supposed to provide user credentials and submit the login form.
// Could be more generic (to deal with all types of forms) like the resetForm() command down bellow, 
// but this one is just for demonstration purposes.
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
        const text = $el.text().toLowerCase();
        expect(text).to.contain(textConfirm);
      });
    } 
    
    loginPage.getAlertDangerMsg().then($el => {
      const text = $el.text().toLowerCase();
      expect(text).to.contain(textConfirm);
    });
  }
);

// Resets a form of an arbitrary "length"
Cypress.Commands.add('resetForm', (fields) => {
  for (const field of fields) {
    field().clear();
  }
});