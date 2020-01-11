/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage';

const loginPage = new LoginPage();

describe('Test Login Functionality', () => {
  before('Navigate To Login Url', () => {
    cy.fixture('loginData').then(data => {
      cy.visit(`${Cypress.env('baseUrl')}${data.relLoginUrl}`);
    });
  });

  beforeEach('Import Data and Handle Common Steps', function() {
    // Get data from fixtures and provide its instance to all of the following tests
    cy.fixture('loginData').then(data => {
      this.data = data;
    });
    this.baseUrl = Cypress.env('baseUrl');

    // Reset the login form after each test (custom command used)
    cy.resetForm([
      loginPage.getEmailInput,
      loginPage.getPasswordInput
    ]);
  });

  it('Negative Scenario (Invalid Email Format)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(
      this.data.emailInvalidFormat,
      this.data.passwdValid
    );
    cy.confirmAuthResults(
      this.data.errorEmailFrmtInv,
      `${Cypress.env('baseUrl')}${this.data.relLoginUrl}`
    );
  });

  it('Negative Scenario (Invalid Email)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(
      this.data.emailInvalid, 
      this.data.passwdValid
    );

    cy.confirmAuthResults(
      this.data.errorAuthDenied,
      `${Cypress.env('baseUrl')}${this.data.relLoginUrl}`
    );
  });

  it('Negative Scenario (Invalid Password)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(
      this.data.emailValid, 
      this.data.passwdInvalid
    );  

    cy.confirmAuthResults(
      this.data.errorAuthDenied,
      `${Cypress.env('baseUrl')}${this.data.relLoginUrl}`
    );
  });

  it('Positive Scenario (Successfull Login)', function() {
    // Custom commands used, for further details please check out the support/commands module
    cy.provideAuthCredentials(
      this.data.emailValid, 
      this.data.passwdValid
    );  

    cy.confirmAuthResults(
      this.data.myAccountName,
      `${Cypress.env('baseUrl')}${this.data.relLoggedInUrl}`,
      false
    );
  });
});
