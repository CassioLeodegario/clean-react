import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const path = /surveys/;
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result');

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.get(montarTestId('error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
  });

  it('Should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.get(montarTestId('error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
    mockSuccess();
    cy.get(montarTestId('reload')).click();
    cy.get(montarTestId('question')).should('exist');
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/surveys/any_id');
    Helper.testUrl('/login');
  });
});
