
const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

describe('Login', () => {
  it('should load with correct initial state', () => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('email-status'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴');
    cy.get(montarTestId('password-status'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });
});
