
const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

describe('Login', () => {
  it('should load with correct initial state', () => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('email-status')).should('have.attr', 'title', 'Campo Obrigatório');
    cy.get(montarTestId('password-status')).should('have.attr', 'title', 'Campo Obrigatório');
  });
});
