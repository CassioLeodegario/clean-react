import * as Helper from '../support/helpers';

// const montarTestId = (id: string): string => {
//   return `[data-testid="${id}"]`;
// };

describe('Private Routes', () => {
  it('Should logout if SurveyList has no token', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});