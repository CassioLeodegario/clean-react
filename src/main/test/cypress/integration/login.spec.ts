
import faker from 'faker';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

describe('Login', () => {
  it('should load with correct initial state', () => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('email')).should('have.attr', 'readOnly');
    cy.get(montarTestId('email-status'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴');
    cy.get(montarTestId('password')).should('have.attr', 'readOnly');
    cy.get(montarTestId('password-status'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.get(montarTestId('email')).focus().type(faker.random.word());
    cy.get(montarTestId('email-status'))
      .should('have.attr', 'title', 'Valor inválido para o campo email')
      .should('contain.text', '🔴');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(3));
    cy.get(montarTestId('password-status'))
      .should('have.attr', 'title', 'Valor inválido para o campo password')
      .should('contain.text', '🔴');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });
});
