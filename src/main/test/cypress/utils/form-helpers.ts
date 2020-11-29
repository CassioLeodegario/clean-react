const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

export const testInputStatus = (field: string, error?: string): void => {
  cy.get(montarTestId(`${field}-wrap`)).should('have.attr', 'data-status', error ? 'invalid' : 'valid');
  const attr = `${error ? '' : 'not.'}have.attr`;
  cy.get(montarTestId(field)).should(attr, 'title', error);
  cy.get(montarTestId(`${field}-label`)).should(attr, 'title', error);
};

export const testMainError = (error: string): void => {
  cy.get(montarTestId('spinner')).should('not.exist');
  cy.get(montarTestId('main-error')).should('contain.text', error);
};
