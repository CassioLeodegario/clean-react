/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
  }
}
