/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage';

// Reports with Native Cypress Dash Board or Mocha Awesome

describe('Test Login Functionality', () => {
  before('Go To Base Url', function() {
    cy.visit(Cypress.env('baseUrl'));
  });

  beforeEach('Import Data', function() {
    // Get data from fixtures and provide its instance to all of the following tests
    cy.fixture('example').then(data => {
      this.data = data;
    });

    // Reset the login form after each test
    const loginPage = new LoginPage();
    loginPage.getEmailInput().clear();
    loginPage.getPasswordInput().clear();
  });

  it('Negative Scenario (Invalid Email Format)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(
      this.data.emailInvalidFormat,
      this.data.passwdValid
    );
    cy.confirmAuthResults(this.data.errorEmailFrmtInv, Cypress.env('baseUrl'));
  });

  it('Negative Scenario (Invalid Email)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(this.data.emailInvalid, this.data.passwdValid);
    cy.confirmAuthResults(this.data.errorAuthDenied, Cypress.env('baseUrl'));
  });

  it('Negative Scenario (Invalid Password)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(this.data.emailValid, this.data.passwdInvalid);
    cy.confirmAuthResults(this.data.errorAuthDenied, Cypress.env('baseUrl'));
  });

  it('Positive Scenario', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(this.data.emailValid, this.data.passwdValid);
    cy.confirmAuthResults(
      this.data.myAccountName,
      this.data.loggedInUrl,
      false
    );
  });
});
