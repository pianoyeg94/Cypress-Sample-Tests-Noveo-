# Cypress-Sample-Tests
Instruction for launching the automated tests:
1) Install node.js globally;
2) Install npm globally;
3) Navigate to the root directory (where package.json is located);
4) Run command: npm install
5) Once all of the dependecies are installed you can run the tests.
  Commands to run tests from command line:
  a) npm run headlessMode 
  b) npm run headedMode

"headlessMode"  - will provide reports in the cypress dashboard 
with all the results, stats, video recordings and screenshots.
This dashboard is private to the project and my github account,
so you wan't have access to it.
For further info about the cypress dashboard please visit:  
https://www.cypress.io/dashboard/

"headedMode" -will be triggered either in the electron or chrome browsers.

1) Sample Automated Test Suite entry point in: 
    cypress/integration/testSamples/login_spec.js

All the necessary comments in the entry point module are provided, 
just follow them and you'll get a pretty good understanding of what's going on in the framework.

2) Sample Manual Tests in the doc extension file.
