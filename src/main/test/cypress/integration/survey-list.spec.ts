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
});