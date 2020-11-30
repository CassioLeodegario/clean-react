import faker from 'faker';
import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const path = /signup/
;export const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST');
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
export const mockInvalidData = (): void => Http.mockOk(path, 'POST', { invalid: faker.random.uuid() });
export const mockSucccess = (): void => Http.mockOk(path, 'POST', { accessToken: faker.random.uuid(), name: faker.name.findName() });

const populateField = (): void => {
  cy.get(montarTestId('name')).focus().type(faker.random.alphaNumeric(5));
  cy.get(montarTestId('email')).focus().type(faker.internet.email());
  const pass = faker.random.alphaNumeric(7);
  cy.get(montarTestId('password')).focus().type(pass);
  cy.get(montarTestId('passwordConfirmation')).focus().type(pass);
};

const simulateValidSubmit = (): void => {
  populateField();
  cy.get(montarTestId('submit')).click();
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('signup');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('name')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo Obrigatório');
    cy.get(montarTestId('email')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo Obrigatório');
    cy.get(montarTestId('password')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo Obrigatório');
    cy.get(montarTestId('passwordConfirmation')).should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Obrigatório');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.get(montarTestId('name')).focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('name', 'Valor inválido para o campo name');
    cy.get(montarTestId('email')).focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Valor inválido para o campo email');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Valor inválido para o campo password');
    cy.get(montarTestId('passwordConfirmation')).focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido para o campo passwordConfirmation');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.get(montarTestId('name')).focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('name');
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    const pass = faker.random.alphaNumeric(5);
    cy.get(montarTestId('password')).focus().type(pass);
    FormHelper.testInputStatus('password');
    cy.get(montarTestId('passwordConfirmation')).focus().type(pass);
    FormHelper.testInputStatus('passwordConfirmation');
    cy.get(montarTestId('submit')).should('not.have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present EmailInUse error on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Já existe um cadastro para o e-mail informado');
    Helper.testUrl('/signup');
  });

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Erro inesperado. Tente novamente mais tarde');
    Helper.testUrl('/signup');
  });

  it('Should save account if valid credentials are provided', () => {
    mockSucccess();
    simulateValidSubmit();
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
    Helper.testUrl('/');
    Helper.testlocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSucccess();
    populateField();
    cy.get(montarTestId('submit')).dblclick();
    cy.wait('@request');
    Helper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSucccess();
    cy.get(montarTestId('email')).focus().type(faker.internet.email()).type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});
