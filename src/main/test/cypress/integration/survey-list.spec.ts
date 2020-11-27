import faker from 'faker';
import * as Helper from '../support/helpers';
import * as Http from '../support/survey-list-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

describe('Survey List', () => {
  beforeEach(() => {
    cy.server();
    Helper.setLocalStorageItem('account', { accessToken: faker.random.uuid(), name: faker.name.findName() });
  });

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.get(montarTestId('error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
  });

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });

  it('Should present correct username', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account');
    cy.get(montarTestId('username')).should('contain.text', name);
  });

  it('Should logout on link click', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.get(montarTestId('logout')).click();
    Helper.testUrl('/login');
  });
});
