import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const path = /surveys/;
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');

describe('Survey List', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.get(montarTestId('error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });

  it('Should present correct username', () => {
    mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account');
    cy.get(montarTestId('username')).should('contain.text', name);
  });

  it('Should logout on link click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.get(montarTestId('logout')).click();
    Helper.testUrl('/login');
  });
});
