import faker from 'faker';
import * as FormHelper from '../support/form-helpers';
import * as Helper from '../support/helpers';
import * as Http from '../support/login-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const simulateValidSubmit = (): void => {
  cy.get(montarTestId('email')).focus().type(faker.internet.email());
  cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5));
  cy.get(montarTestId('submit')).click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('email')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo Obrigatório');
    cy.get(montarTestId('password')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo Obrigatório');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.get(montarTestId('email')).focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Valor inválido para o campo email');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Valor inválido para o campo password');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');
    cy.get(montarTestId('submit')).should('not.have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Credenciais Inválidas');
    Helper.testUrl('/login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Erro inesperado. Tente novamente mais tarde');
    Helper.testUrl('/login');
  });

  it('Should save account if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
    Helper.testUrl('/');
    Helper.testlocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    Http.mockOk();
    cy.get(montarTestId('email')).focus().type('mango@gmail.com');
    cy.get(montarTestId('password')).focus().type('12345');
    cy.get(montarTestId('submit')).dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.get(montarTestId('email')).focus().type('mango@gmail.com').type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});
