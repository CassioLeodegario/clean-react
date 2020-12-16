import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const path = /surveys/;
const mockLoadSuccess = (): void => Http.mockOk(path, 'GET', 'fx:load-survey-result');

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');

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
      mockLoadSuccess();
      cy.get(montarTestId('reload')).click();
      cy.get(montarTestId('question')).should('exist');
    });

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError();
      cy.visit('/surveys/any_id');
      Helper.testUrl('/login');
    });

    it('Should present survey result', () => {
      mockLoadSuccess();
      cy.visit('/surveys/any_id');
      cy.get(montarTestId('question')).should('have.text', 'Question 1');
      cy.get(montarTestId('day')).should('have.text', '03');
      cy.get(montarTestId('month')).should('have.text', 'fev');
      cy.get(montarTestId('year')).should('have.text', '2018');

      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer');
        assert.equal(li.find('[data-testid="percent"]').text(), '70%');
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
      });
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2');
        assert.equal(li.find('[data-testid="percent"]').text(), '30%');
        assert.notExists(li.find('[data-testid="image"]'));
      });
    });

    it('Should go to surveyList on back button click', () => {
      cy.visit('');
      mockLoadSuccess();
      cy.visit('/surveys/any_id');
      cy.get(montarTestId('back-button')).click();
      Helper.testUrl('/');
    });
  });

  describe('save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT');
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'PUT');
    const mockSaveSuccess = (): void => Http.mockOk(path, 'PUT', 'fx:save-survey-result');

    beforeEach(() => {
      cy.server();
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account);
      });
      mockLoadSuccess();
      cy.visit('/surveys/any_id');
    });

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError();
      cy.get('li:nth-child(2)').click();
      cy.get(montarTestId('error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
    });

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError();
      cy.get('li:nth-child(2)').click();
      Helper.testUrl('/login');
    });

    it('Should present survey result', () => {
      mockSaveSuccess();
      cy.get('li:nth-child(2)').click();
      cy.get(montarTestId('question')).should('have.text', 'Other Question');
      cy.get(montarTestId('day')).should('have.text', '23');
      cy.get(montarTestId('month')).should('have.text', 'mar');
      cy.get(montarTestId('year')).should('have.text', '2020');

      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer');
        assert.equal(li.find('[data-testid="percent"]').text(), '50%');
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'other_image');
      });
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer_2');
        assert.equal(li.find('[data-testid="percent"]').text(), '50%');
        assert.notExists(li.find('[data-testid="image"]'));
      });
    });
  });
});
