const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const baseUrl: string = Cypress.config().baseUrl;

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

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testlocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)));
};
