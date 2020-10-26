
import faker from 'faker';

const montarTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.get(montarTestId('email-wrap')).should('have.attr', 'data-status', 'invalid');
    cy.get(montarTestId('email'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('have.attr', 'readOnly');
    cy.get(montarTestId('email-label')).should('have.attr', 'title', 'Campo Obrigatório');
    cy.get(montarTestId('password-wrap')).should('have.attr', 'data-status', 'invalid');
    cy.get(montarTestId('password'))
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('have.attr', 'readOnly');
    cy.get(montarTestId('password-label')).should('have.attr', 'title', 'Campo Obrigatório');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.get(montarTestId('email')).focus().type(faker.random.word());
    cy.get(montarTestId('email-wrap')).should('have.attr', 'data-status', 'invalid');
    cy.get(montarTestId('email')).should('have.attr', 'title', 'Valor inválido para o campo email');
    cy.get(montarTestId('email-label')).should('have.attr', 'title', 'Valor inválido para o campo email');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(3));
    cy.get(montarTestId('password-wrap')).should('have.attr', 'data-status', 'invalid');
    cy.get(montarTestId('password')).should('have.attr', 'title', 'Valor inválido para o campo password');
    cy.get(montarTestId('password-label')).should('have.attr', 'title', 'Valor inválido para o campo password');
    cy.get(montarTestId('submit')).should('have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    cy.get(montarTestId('email-wrap')).should('have.attr', 'data-status', 'valid');
    cy.get(montarTestId('email')).should('not.have.attr', 'title');
    cy.get(montarTestId('email-label')).should('not.have.attr', 'title');
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5));
    cy.get(montarTestId('password-wrap')).should('have.attr', 'data-status', 'valid');
    cy.get(montarTestId('password')).should('not.have.attr', 'title');
    cy.get(montarTestId('password-label')).should('not.have.attr', 'title');
    cy.get(montarTestId('submit')).should('not.have.attr', 'disabled');
    cy.get(montarTestId('error-wrap')).should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    });
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5));
    cy.get(montarTestId('submit')).click();
    cy.get(montarTestId('spinner')).should('not.exist');
    cy.get(montarTestId('main-error')).should('contain.text', 'Credenciais Inválidas');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    });
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5));
    cy.get(montarTestId('submit')).click();
    cy.get(montarTestId('spinner')).should('not.exist');
    cy.get(montarTestId('main-error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid()
      }
    });
    cy.get(montarTestId('email')).focus().type(faker.internet.email());
    cy.get(montarTestId('password')).focus().type(faker.random.alphaNumeric(5)).type('{enter}');
    cy.get(montarTestId('spinner')).should('not.exist');
    cy.get(montarTestId('main-error')).should('contain.text', 'Erro inesperado. Tente novamente mais tarde');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    });
    cy.get(montarTestId('email')).focus().type('mango@gmail.com');
    cy.get(montarTestId('password')).focus().type('12345');
    cy.get(montarTestId('submit')).click();
    cy.get(montarTestId('main-error')).should('not.exist');
    cy.get(montarTestId('spinner')).should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')));
  });

  it('Should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request');
    cy.get(montarTestId('email')).focus().type('mango@gmail.com');
    cy.get(montarTestId('password')).focus().type('12345');
    cy.get(montarTestId('submit')).dblclick();
    cy.get('@request.all').should('have.length', 1);
  });

  it('Should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request');
    cy.get(montarTestId('email')).focus().type('mango@gmail.com').type('{enter}');
    cy.get('@request.all').should('have.length', 0);
  });
});
