
// Resets a form of an arbitrary "length"
Cypress.Commands.add('resetForm', (...fields) => {
  for (const field of fields) {
    field().clear();
  }
});
