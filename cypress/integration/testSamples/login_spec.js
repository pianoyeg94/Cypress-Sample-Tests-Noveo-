/// <reference types="Cypress" />

import LoginPage from '../../support/pageObjects/LoginPage';

const loginPage = new LoginPage();

describe('Test Login Functionality', () => {

  // Once before the whole suite
  // Cypress.env('baseUrl') from the cypress.json file in root
  before('Navigate To Login Url', () => {
    cy.fixture('loginData').then(data => {
      cy.visit(`${Cypress.env('baseUrl')}${data.relativeUrls.loginUrl}`);
    });
  });


  // Once before each test
  beforeEach('Import Data and Handle Common Steps', function() {
    // Get data from fixtures and provide its instance to all of the following tests.
    // Relative path to fixtures: ../fixtures
    cy.fixture('loginData').then(data => {
      this.data = data;
    });

    this.baseUrl = Cypress.env('baseUrl');

    // Reset the login form before each test 
    // (custom command used: "relative path to commands(utils)"=../support/commands)
    cy.resetForm(
      loginPage.getEmailInput, 
      loginPage.getPasswordInput
    );
  });


  // Test Case #1
  it('Negative Scenario (Invalid Email Format)', function() {
    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.provideAuthCredentials(
      this.data.email.invalidFormat,
      this.data.password.valid
    );

    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.confirmAuthResults(
      this.data.errors.invalidEmailFormat,
      `${Cypress.env('baseUrl')}${this.data.relativeUrls.loginUrl}`
    );
  });


  // Test Case #2
  it('Negative Scenario (Invalid Email)', function() {
    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.provideAuthCredentials(
      this.data.email.invalid, 
      this.data.password.valid
    );  

    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.confirmAuthResults(
      this.data.errors.authDenied,
      `${Cypress.env('baseUrl')}${this.data.relativeUrls.loginUrl}`
    );
  });


  // Test Case #3
  it('Negative Scenario (Invalid Password)', function() {
    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.provideAuthCredentials(
      this.data.email.valid, 
      this.data.password.invalid
    );  

    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.confirmAuthResults(
      this.data.errors.authDenied,
      `${Cypress.env('baseUrl')}${this.data.relativeUrls.loginUrl}`
    );
  });


  // Test Case #4
  it('Positive Scenario (Successfull Login)', function() {
    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.provideAuthCredentials(
      this.data.email.valid, 
      this.data.password.valid
    );  

    // Method from the POM used.
    // Please check out the pageObjects directory("relative path"=../support/pageObjects/LoginPage)
    loginPage.confirmAuthResults(
      this.data.textFromTheDOM.forComparison.accountName,
      `${Cypress.env('baseUrl')}${this.data.relativeUrls.loggedInUrl}`,
      false
    );
  });
});
